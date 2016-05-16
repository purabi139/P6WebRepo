define([
    "jquery", "underscore",
    "pgbu-backbone",
    "i18n!nls/localeStrings",
    "workflows/workflowEnums"
], function ($, _, PgbuBackbone, locale, WorkflowEnums) {
    "use strict";

    return PgbuBackbone.BaseClass.extend({

        initialize: function () {
            this._eventBus = this.options.eventBus;
            this._dataModel = this.options.dataModel;
        },

        prepareDialog: function (){
            this._initWidgets();
            this._setDisabledWidgets();
            this._registerEvents();
        },

        openTaskDialog: function (stepId, taskIndex, taskType) {
            // check task type -- currently support Form Type only

            this._taskType = taskType;
            this._stepId = stepId;
            this._taskIndex = taskIndex;
            this._stepDataModel = this._dataModel.GetStep(this._stepId);

            this._clearDialogData();

            if (taskIndex == null) {
                // new-task mode
                this._dialogMode = "new";
                this._taskDataModel = JSON.parse(WorkflowEnums.DataStructures.DefaultTask);

            }
            else {
                // update-task mode
                this._dialogMode = "update";
                this._taskDataModel = this._stepDataModel.GetTask(this._taskIndex);
                this._setTaskData();
            }

            this._displayTaskDialog();
        },

        //endregion


        //region private methods


        /*$: function(selector) {
         return $("#taskContext");
         },*/

        //region API methods

        _hideTaskDialog: function () {
            $(".taskDialogFrame").modal("hide");
        },

        _displayTaskDialog: function () {
            $(".taskDialogFrame").modal("show");
        },

        _setDisabledWidgets: function () {
            this._taskFormTabPicker.picker("disable", "true");
        },

        _updatePicker: function (element, selected) {
            element.attr("value", selected[0].name);

            // handle _taskFormPicker selected
            if (element.selector === "#taskForm") {
                this._taskFormPickerFormSelected(element, selected);
            }
        },

        _taskFormPickerFormSelected: function (element, selected) {
            this._taskFormTabPicker.picker("disable", "");

            var self = this;
            var formTabs = selected[0].tabs;
            this._taskFormTabPicker.attr("value", "");
            this._taskFormTabPicker.picker("destroy");
            this._taskFormTabPicker = $("#taskFormTab").picker({
                style: "outside",
                locale: {
                    title: "Select Tab"//locale.select_form
                },
                rootId: "0",
                multiSelect: false,
                fluid: true,
                storeFns: {
                    load: function () {
                        return formTabs;
                    },
                    submit: function (selected) {
                        self._updatePicker(self._taskFormTabPicker, selected);
                    }
                }
            });
        },

        _registerEvents: function () {
            var self = this;

            $(".okButton").on("click", function (e) {
                self._saveData();
            });
        },

        _saveData: function () {
            var self = this;
            var elements = $(".taskDialogFrame .main-control");

            if (this._dialogMode === "new") {
                this._taskDataModel = this._stepDataModel.AddTask(this._taskDataModel);
                this._taskDataModel.get_Link().Type = WorkflowEnums.LinkType.FORM;
            }

            _.each(elements, function (element) {
                var $elem = $(element);
                var modelField = $elem.attr("modelField");
                if (modelField != null) {
                    var value = $elem.val();
                    self._taskDataModel["set_" + modelField](value);
                }
            });

            self._taskDataModel.get_Scope().ObjectID = $("#taskContext").picker("getSelected").length > 0 ? $("#taskContext").picker("getSelected")[0] : null;
            self._taskDataModel.get_Manager().ID = $("#taskPerformer").picker("getSelected").length > 0 ? $("#taskPerformer").picker("getSelected")[0] : null;
            self._taskDataModel.get_Link().FormID = $("#taskForm").picker("getSelected").length > 0 ? $("#taskForm").picker("getSelected")[0] : null;
            self._taskDataModel.get_Link().TabID = $("#taskFormTab").picker("getSelected").length > 0 ? $("#taskFormTab").picker("getSelected")[0] : null;

            this._eventBus.trigger(WorkflowEnums.Events.DATA_UPDATED);
            this._eventBus.trigger(WorkflowEnums.Events.STEP_TASKS_UPDATED, {
                StepID: self._dataModel.get_SelectedStep()
            });

            this._hideTaskDialog();
        },


        _setTaskData: function () {
            var self = this;
            var elements = $(".taskDialogFrame .main-control");

            _.each(elements, function (element) {
                var $elem = $(element);
                var modelField = $elem.attr("modelField");
                if (modelField != null) {
                    //set data
                    var value = self._taskDataModel["get_" + modelField]();
                    $elem.val(value);
                }
            });

            $("#taskContext").picker("select", self._taskDataModel.get_Scope().ObjectID);
            $("#taskPerformer").picker("select", self._taskDataModel.get_Manager().ID);
            $("#taskForm").picker("select", self._taskDataModel.get_Link().FormID);
            $("#taskFormTab").picker("select", self._taskDataModel.get_Link().TabID);
        },

        _clearDialogData: function () {
            var self = this;
            var elements = $(".taskDialogFrame .main-control");

            _.each(elements, function (element) {
                var $elem = $(element);
                var modelField = $elem.attr("modelField");
                if (modelField != null) {
                    $elem.val("");
                }
            });

            $("#taskContext").val("");
            $("#taskPerformer").val("");
            $("#taskForm").val("");
            $("#taskFormTab").val("");
        },

        _initPickerWidget: function (pickerElement, loadUrl, loadChildrenUrl) {
            var self = this;
            var pickerObject = pickerElement.picker({
                style: "outside",
                locale: {
                    title: "Select Context" //locale.select_context
                },
                rootId: "0",
                multiSelect: false,
                fluid: true,
                storeFns: {
                    load: function () {
                        return $.ajax({
                            url: loadUrl,
                            type: "GET",
                            dataType: "json"
                        });
                    },
                    loadChildren: loadChildrenUrl == null ? null : function (id) {
                        return $.ajax({
                            url: loadChildrenUrl + id,
                            type: "GET",
                            dataType: "json"
                        });
                    },
                    submit: function (selected) {
                        self._updatePicker(pickerObject, selected);
                    }
                }
            });

            return pickerObject;
        },

        _initWidgets: function () {
            this._taskContextPicker = this._initPickerWidget($("#taskContext"), "rest/projects/childnodes/0", "rest/projects/childnodes/");
            this._taskFormPicker = this._initPickerWidget($("#taskForm"), "rest/forms/childnodes/0", null);
            this._taskFormTabPicker = this._initPickerWidget($("#taskFormTab"), null, null);
            this._taskPerformerPicker = this._initPickerWidget($("#taskPerformer"), "rest/users/0", null);
        }

        //endregion
    });
});