define([
    "jquery", "underscore", "backbone",
    "i18n!nls/localeStrings",
    "utilities/toolbar",
    "workflows/workflowEnums",
    "common/widgetView",
    "text!workflows/editor/propertiesTemplate.html"
], function ($, _, Backbone, locale, Toolbar, WorkflowEnums, WidgetView, PropertiesTemplate) {
    "use strict";

    return WidgetView.extend({

        events: {
            "click .addTask": Toolbar.ToolbarItemCallback(function (e) {
                this._taskDialog.openTaskDialog(this._dataModel.get_SelectedStep(), null, "TaskType");
            }),

            "click .editTask": Toolbar.ToolbarItemCallback(function (e) {
                this._taskDialog.openTaskDialog(this._dataModel.get_SelectedStep(), this._selectedTaskID, "TaskType");
            }),

            "click .deleteTask": Toolbar.ToolbarItemCallback(function (e) {
                var selectedStepID = this._dataModel.get_SelectedStep();
                this._dataModel.GetStep(selectedStepID).DeleteTask(this._selectedTaskID);
                this._eventBus.trigger(WorkflowEnums.Events.STEP_TASKS_UPDATED, {
                    StepID: selectedStepID
                });
            })
        },

        initializeWidget: function () {
            this._eventBus = this.options.eventBus;
            this._dataModel = this.options.dataModel;
            this._taskDialog = this.options.taskDialog;
            this._registerListeners();

        },

        getContentMarkup: function () {
            var compiledTemplate = _.template(PropertiesTemplate);
            return compiledTemplate({
                locale: locale.label.workflows,
                enums: WorkflowEnums
            });
        },


        render: function (renderTo) {
            var self = this;
            this.setElement(renderTo);
            this._createContentMarkup();

            this._renderWorkflowTab();
            this._renderStepTab();
            this._renderTaskTab();


            ///#region events

            //Switch tab
            this.$("a[data-target=\".stepTab\"]").on("shown", function (e) {
                self.setStepData();
            });

            this.$("a[data-target=\".taskTab\"]").on("shown", function (e) {
                self.setTaskData();
            });

            ///#endregion events
            return this;
        },

        _renderWorkflowTab: function () {
            var self = this;

            var getModelFunction = function () {
                return self._dataModel;
            };

            this._renderDuration("wfDuration", getModelFunction);

            ///#region Render Workflow tab
            /*           this.$("#wfAmount").number({
             type : "number",
             style : "outside",
             min : "1",
             numsAfterDecimal: 0,
             spinner: true
             });
             */
            this._renderContextPicker("wfContext", getModelFunction);
            this._renderManagerPicker("wfManager", getModelFunction);

            //set onchange event handlers
            _.each(this.$(".workflowTab .main-control"), function (elem) {
                self._setChangeEventHandler(elem, getModelFunction);
            });

            //set some specific handlers
            this.$("#wfName").on("change", function (e) {
                self._eventBus.trigger(WorkflowEnums.Events.WORKFLOW_NAME_UPDATED, {
                    Name: e.target.value
                });
            });

        },

        _renderStepTab: function () {
            /*            this.$("#stepAmount").number({
                        type : "number",
                        style : "outside",
                        min : "1",
                        numsAfterDecimal: 0,
                        spinner: true
                        });
                        */
            var self = this;
            var getModelFunction = function () {
                var selectedStepID = self._dataModel.get_SelectedStep();
                return self._dataModel.GetStep(selectedStepID);
            };

            this._renderDuration("stepDuration", getModelFunction);
            this._renderContextPicker("stepContext", getModelFunction);
            this._renderManagerPicker("stepManager", getModelFunction);

            //set onchange event handlers
            _.each(this.$(".stepTab .main-control"), function (elem) {
                self._setChangeEventHandler(elem, getModelFunction);
            });

            //set some specific handlers
            this.$("#stepName").on("change", function (e) {
                self._eventBus.trigger(WorkflowEnums.Events.STEP_NAME_UPDATED, {
                    StepID: self._dataModel.get_SelectedStep()
                });
            });
        },

        _renderTaskTab: function () {
            var self = this;

            this.$(".taskButtons").append(Toolbar.Toolbar({
                toolbarItems: [
                    Toolbar.Button({
                        recognizedAs: "addTask",
                        label: locale.label.workflows.properties.add_button,
                        tooltip: locale.label.workflows.properties.add_button_tooltip
                    }),

                    Toolbar.Button({
                        recognizedAs: "editTask",
                        label: locale.label.workflows.properties.edit_button,
                        tooltip: locale.label.workflows.properties.edit_button_tooltip
                    }),

                    Toolbar.Button({
                        recognizedAs: "copyTask",
                        label: locale.label.workflows.properties.copy_button,
                        tooltip: locale.label.workflows.properties.copy_button_tooltip
                    }),

                    Toolbar.Button({
                        recognizedAs: "pasteTask",
                        label: locale.label.workflows.properties.paste_button,
                        tooltip: locale.label.workflows.properties.paste_button_tooltip
                    }),

                    Toolbar.Button({
                        recognizedAs: "deleteTask",
                        label: locale.label.workflows.properties.delete_button,
                        tooltip: locale.label.workflows.properties.delete_button_tooltip
                    })
                ]
            }));

            this._tasksGridWidget = this.$("#taskGrid").grid({
                layout: {
                    height: "300px",
                    width: "100%",
                    waffers: [
                        {
                            id: "foo",
                            type: "flex"
                        }
                    ],
                    selector: "true"
                },
                rows: {
                    id: "id"
                },
                borders: {
                    size: 2
                },
                selectionMode: "default",
                columns: {
                    groups: [
                        {
                            id: "bar",
                            type: "flex",
                            columns: [
                                {
                                    title: "Task",
                                    dataIndex: "name",
                                    width: "150px",
                                    readOnly: "false"
                                },
                                {
                                    title: "Type",
                                    dataIndex: "type",
                                    width: "150px"
                                }

                            ]
                        }
                    ]
                }
            });

            this._tasksGridWidget.bind("grid-rows-selected", function (event, selectedRows) {
                self.$("#taskDetails").val(selectedRows[0].description);
                self._selectedTaskID = selectedRows[0].id;
            });

        },


        setData: function () {
            var self = this;
            var elems = this.$(".workflowTab .main-control");

            _.each(elems, function (elem) {
                var $elem = self.$(elem);
                var modelField = $elem.attr("modelField");
                if (modelField != null) {
                    var modelField1 = $elem.attr("modelField1");
                    //set data
                    var value = self._dataModel["get_" + modelField]();
                    if (modelField1 != null) {
                        value = value[modelField1];
                    }
                    $elem.val(value);
                }
            });

            var isEnabled = self._dataModel.get_IsEnabled();
            var rbEnabled = this.$("#wfEnabled");
            rbEnabled.attr("checked", isEnabled);
            rbEnabled.on("click", function (e) {
                self._updateDataField(self._dataModel, "IsEnabled", true);
            });
            var rbDisabled = this.$("#wfDisabled");
            rbDisabled.attr("checked", !isEnabled);
            rbDisabled.on("click", function (e) {
                self._updateDataField(self._dataModel, "IsEnabled", false);
            });

            this.$("#wfContext").picker("select", self._dataModel.get_Scope().ObjectID);
            this.$("#wfManager").picker("select", self._dataModel.get_Manager().ID);

        },

        setStepData: function () {
            var self = this;
            var dataModel = this._dataModel;
            if (!dataModel.get_AnyStepSelected()) {
                //TODO: somehow disable the tab
                return;
            }
            var selectedStepID = dataModel.get_SelectedStep();
            var stepDataModel = dataModel.GetStep(selectedStepID);

            var elems = this.$(".stepTab .main-control");

            _.each(elems, function (elem) {
                var $elem = self.$(elem);
                var modelField = $elem.attr("modelField");
                if (modelField != null) {
                    var modelField1 = $elem.attr("modelField1");
                    var value = stepDataModel["get_" + modelField]();
                    if (modelField1 != null) {
                        value = value[modelField1];
                    }
                    $elem.val(value);
                }
            });

            //Temporary: clean the context & manager fields
            this.$("#stepContext").val("");
            this.$("#stepManager").val("");
            //

            this.$("#stepContext").picker("select", stepDataModel.get_Scope().ObjectID);
            this.$("#stepManager").picker("select", stepDataModel.get_Manager().ID);
        },

        setTaskData: function () {
            var selectedStepID = this._dataModel.get_SelectedStep();
            if (selectedStepID == null) {
                //TODO empty task controls
                return;
            }
            var wfPropertiesLocale = locale.label.workflows.properties;
            var store = [];
            var stepDataModel = this._dataModel.GetStep(selectedStepID);
            var numberOfTasks = stepDataModel.GetNumberOfTasks();
            if (numberOfTasks > 0) {
                for (var i = 0; i < numberOfTasks; i++) {
                    var taskModel = stepDataModel.GetTask(i);
                    var description = wfPropertiesLocale.details_name + " " + taskModel.get_Name();
                    store.push({
                        id: i,
                        name: taskModel.get_Name(),
                        type: "Form",
                        description: description
                    });
                }
            }

            this._tasksGridWidget.grid("setStore", store);
            this._tasksGridWidget.grid("selectRows", [0], false, null);

        },

        _setChangeEventHandler: function (elem, getModelFunction) {
            var self = this;
            var $elem = this.$(elem);
            var modelField = $elem.attr("modelField");
            if (_.isUndefined(modelField)) {
                return;
            }

            var modelField1 = $elem.attr("modelField1");

            if (modelField1 == null) {
                $elem.on("change", function (e) {
                    var model = getModelFunction();
                    self._updateDataField(model, modelField, e.target.value);
                });
            }
            else {
                $elem.on("change", function (e) {
                    var model = getModelFunction();
                    var updateObject = model["get_" + modelField]();
                    updateObject[modelField1] = e.target.value;
                    self._updateDataField(model, modelField, updateObject);
                });
            }
        },

        _renderContextPicker: function (elementId, getModelFunction) {
            var self = this;
            this.$("#" + elementId).picker({
                style: "outside",
                locale: {
                    title: "Select Context"
                },
                rootId: "0",
                multiSelect: false,
                fluid: true,
                storeFns: {
                    load: function () {
                        return $.ajax({
                            url: "rest/projects/childnodes/0",
                            type: "GET",
                            dataType: "json"
                        });
                    },
                    loadChildren: function (id) {
                        return $.ajax({
                            url: "rest/projects/childnodes/" + id,
                            type: "GET",
                            dataType: "json"
                        });
                    },
                    submit: function (selected) {
                        self._updatePicker(elementId, selected);
                        var model = getModelFunction();
                        self._updateDataField(model, "Scope", { ObjectID: selected[0].id, Type: WorkflowEnums.Workflow.ScopeType.SPECIFIC });
                    }
                }
            });
        },

        _renderManagerPicker: function (elementId, getModelFunction) {
            var self = this;
            this.$("#" + elementId).picker({
                style: "outside",
                locale: {
                    title: "Select Manager"
                },
                rootId: "0",
                multiSelect: false,
                fluid: true,
                storeFns: {
                    load: function () {
                        return $.ajax({
                            url: "rest/users/0",
                            type: "GET",
                            dataType: "json"
                        });
                    },
                    submit: function (selected) {
                        self._updatePicker(elementId, selected);
                        var model = getModelFunction();
                        self._updateDataField(model, "Manager", { ID: selected[0].id, Type: WorkflowEnums.UserRoleType.USER });
                    }
                }
            });
        },

        _updatePicker: function (elementId, selected) {
            this.$("#" + elementId).val(selected[0].name);
        },

        _renderDuration: function (targetElementId, getModelFunction) {
            var self = this;
            var workflowLocale = locale.label.workflows.properties;

            var amountId = targetElementId + "Amount";
            var unitId = targetElementId + "Unit";
            var $target = this.$("#" + targetElementId);
            var markup = $("<div class=\"bordered-fieldset\">" +
                "<fieldset>" +
                    "<legend class=\"small\" title=\"" + workflowLocale.duration + "\">" + workflowLocale.duration + "</legend>" +
                    "<div class=\"fieldset-content\">" +
                        "<div class=\"row-fluid\">" +
                            "<div class=\"span6  control-group\">" +
                                "<label class=\"control-label\" for=\"" + amountId + "\">" + workflowLocale.amount + "</label>" +
                                "<div class=\"controls\">" +
                                    "<input class=\"main-control\" type=\"text\" id=\"" + amountId + "\" modelfield=\"Duration\" modelfield1=\"Amount\" />" +
                                "</div>" +
                            "</div>" +
                            "<div class=\"span6  control-group\">" +
                                "<label class=\"control-label\" for=\"" + unitId + "\">" + workflowLocale.unit + "</label>" +
                                "<div class=\"controls\">" +
                                   "<select class=\"main-control\" type=\"text\" value=\"\" id=\"" + unitId + "\" modelfield=\"Duration\" modelfield1=\"Unit\">" +
                                        "<option value=\"" + WorkflowEnums.Workflow.DurationUnitType.DAYS + "\">" + workflowLocale.duration_units.days + "</option>" +
                                        "<option value=\"" + WorkflowEnums.Workflow.DurationUnitType.WEEKS + "\">" + workflowLocale.duration_units.weeks + "</option>" +
                                        "<option value=\"" + WorkflowEnums.Workflow.DurationUnitType.MONTHS + "\">" + workflowLocale.duration_units.months + "</option>" +
                                    "</select>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</fieldset>" +
            "</div>"
            );

            $target.append(markup);
        },

        _updateDataField: function (model, field, value) {
            model["set_" + field](value);
            this._eventBus.trigger(WorkflowEnums.Events.DATA_UPDATED);
        },

        _registerListeners: function () {
            this._eventBus.on(WorkflowEnums.Events.STEP_CLICKED, function () {
                this.$("a[data-target=\".stepTab\"]").tab("show");
                this.setStepData();
            }, this);

            this._eventBus.on(WorkflowEnums.Events.CANVAS_CLICKED, function () {
                this.$("a[data-target=\".workflowTab\"]").tab("show");
            }, this);

            this._eventBus.on(WorkflowEnums.Events.STEP_TASKS_UPDATED, function () {
                this.setTaskData();
            }, this);

        }
    });
});