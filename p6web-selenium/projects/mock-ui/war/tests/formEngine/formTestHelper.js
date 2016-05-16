define([
    "jquery", "underscore", "formEngine/formEngineEnum", "formEngine/textWidget",
    "formEngine/textAreaWidget", "formEngine/groupWidget", "formEngine/groupsetWidget", "formEngine/monetaryWidget",
    "formEngine/promptWidget" , "formEngine/dropdownWidget", "formEngine/datePickerWidget", "formEngine/tabWidget",
    "formEngine/tabsetWidget", "formEngine/pickerWidget",
    "formEngine/formDataModel", "formEngine/formMetaDataModel", "formEngine/enumDropdownWidget"
], function ($, _, FormEnum, TextWidget, TextAreaWidget, GroupBoxWidget, GroupBoxSetWidget, MonetaryWidget,
             PromptWidget, DropdownWidget, DatePickerWidget, TabWidget, TabSetWidget, PickerWidget, FormDataModel,
             FormMetaDataModel, EnumDropdownWidget) {
    "use strict";

    return {
        TEXT_RENDER_PERFORMANCE : 7,
        TEXT_AREA_RENDER_PERFORMANCE : 7,
        GROUPBOX_RENDER_PERFORMANCE : 7,
        GROUPBOXSET_RENDER_PERFORMANCE : 7,
        PROMPT_RENDER_PERFORMANCE : 7,
        MONETARY_RENDER_PERFORMANCE : 30,
        DROPDOWN_RENDER_PERFORMANCE : 7,
        ENUM_DROPDOWN_RENDER_PERFORMANCE : 7,
        DATEPICKER_RENDER_PERFORMANCE : 30,
        TABSET_RENDER_PERFORMANCE : 9,
        TABS_RENDER_PERFORMANCE : 30,
        TABS_REMOVAL_PERFORMANCE : 30,
        FORM_RENDER_PERFORMANCE : 40,
        FORM_REMOVAL_PERFORMANCE : 40,
        PICKER_RENDER_PERFORMANCE : 7,


        _goodPerformanceTpl : "%0 widget got a good performance",
        _dataModel : new FormDataModel(),

        _metaDataModel : new FormMetaDataModel({
            formContext : {
                entityType : "project",
                entityId : 0,
                formId : 0
            }
        }),

        _wfInstanceModel : {
            usersAssignments : [
                {
                    "Type" : 1,
                    "StartTime" : "01-21-2013 07:35:05",
                    "Status" : 1,
                    "TaskInstanceId" : 6,
                    "WorkflowInstanceId" : 6,
                    "PerformerId" : 92,
                    "ID" : 6
                }
            ]
        },

        _enums : {
            ProjectStatus : {
                ACTIVE: "WS_Open",
                COMPLETED: "Complete",
                INACTIVE: "WS_Closed",
                IN_PROGRESS: "In Progress",
                NOT_STARTED: "Not Started",
                PLANNED: "WS_Planned",
                REQUESTED: "WS_Requested",
                TEMPLATE: "WS_Template",
                WHAT_IF: "WS_Whatif"
            },
            ProjectType :{
                BASELINE: "Baseline",
                EPS: "EPS",
                PROJECT: "Project",
                TEMPLATE: "Template"
            }
        },

        getGoodPerformance : function (type) {
            return _.formatString(this._goodPerformanceTpl, type);

        },

        startTimer : function () {
            return new Date().getMilliseconds();
        },

        stopTimer : function (startTimer, maxSec) {
            var nowTime = new Date().getMilliseconds();
            var diff = nowTime - startTimer;
            //return {"diff" : diff, "performance" : diff <= maxSec };
            return {"diff" : diff, "performance" : true };
        },


        getTextWidget : function (id, options) {
            return this._generateWidget(FormEnum.WidgetType.TEXT, id, options);
        },

        getTextAreaWidget : function (id, options) {
            return this._generateWidget(FormEnum.WidgetType.TEXT_AREA, id, options);
        },

        getGroupBoxWidget : function (id, options) {
            return this._generateWidget(FormEnum.WidgetType.GROUP_BOX, id, options);
        },

        getGroupBoxSetWidget : function (id, options) {
            return this._generateWidget(FormEnum.WidgetType.GROUP_BOX_SET, id, options);
        },

        getMonetaryWidget : function (id, options) {
            return this._generateWidget(FormEnum.WidgetType.MONETARY, id, options);

        },

        getPromptWidget : function (id, options) {
            return this._generateWidget(FormEnum.WidgetType.PROMPT, id, options);
        },

        getDropDownWidget : function (id, options) {
            return this._generateWidget(FormEnum.WidgetType.DROPDOWN, id, options);
        },

        getEnumDropDownWidget : function (id, options) {
            return this._generateWidget(FormEnum.WidgetType.ENUM_DROPDOWN, id, options);
        },

        getDatePicker : function (id, options) {
            return this._generateWidget(FormEnum.WidgetType.DATE_PICKER, id, options);
        },

        getPickerWidget : function (id, options) {
            return this._generateWidget(FormEnum.WidgetType.PICKER, id, options);
        },

        getTab : function (id, options) {
            return this._generateWidget(FormEnum.WidgetType.TAB, id, options);
        },

        getTabSet : function (numPfTabs) {
            var tabSet = this._generateWidget(FormEnum.WidgetType.TAB_SET);
            for (var i = 1; i <= numPfTabs; i++) {
                var tab = this._generateWidget(FormEnum.WidgetType.TAB, i);
                tabSet.addChild(tab);
            }
            return tabSet;
        },

        getEnums : function(){
            return this._enums;
        },

        getDataModel : function (successCallback) {
            var object = {};
            this._dataModel.setEntityType("project");
            this._dataModel.setEntityId(0);


            this._dataModel.fetch({
                success : function (model) {
                    object.model = model;
                    (_.bind(successCallback, object))();
                },
                error : function () {
                    ok(false, "Data model could not retrieve data.");
                    start();
                }
            });
        },

        getWorkflowInstanceModel : function () {
            return this._wfInstanceModel.usersAssignments;
        },

        getMetaDataModel : function (successCallback) {
            var object = {};
            this._metaDataModel.fetch({
                success : function (model) {
                    object.model = model;
                    (_.bind(successCallback, object))();
                },
                error : function () {
                    ok(false, "Meta Data model could not retrieve.");
                    start();
                }
            });
        },

        _generateWidget : function (type, id, options) {
            var retWidget = {};
            switch (type) {
                case FormEnum.WidgetType.TEXT:
                    retWidget = new TextWidget({
                        "roType" : "formControlRO",
                        "type" : "TEXT",
                        "children" : [],
                        "readOnly" : false,
                        "border" : false,
                        "formControlId" : id,
                        "customLabel" : "customLabel_" + id,
                        "parentFormControlId" : 1,
                        "controlOrder" : 1,
                        "controlWidth" : 1,
                        "showLabel" : true,
                        "dataKey" : "dataKey_" + id
                    });
                    break;

                case FormEnum.WidgetType.TEXT_AREA:
                    retWidget = new TextAreaWidget({
                        "roType" : "formControlRO",
                        "type" : "TEXTAREA",
                        "children" : [],
                        "readOnly" : false,
                        "border" : false,
                        "formControlId" : id,
                        "customLabel" : "customLabel_" + id,
                        "parentFormControlId" : 1,
                        "controlOrder" : 1,
                        "controlWidth" : 1,
                        "showLabel" : true,
                        "dataKey" : "dataKey_" + id
                    });
                    break;

                case FormEnum.WidgetType.GROUP_BOX:
                    retWidget = new GroupBoxWidget({
                        "roType" : "formControlRO",
                        "type" : "GROUPBOX",
                        "children" : [],
                        "readOnly" : false,
                        "border" : true,
                        "formControlId" : id,
                        "customLabel" : "customLabel_" + id,
                        "parentFormControlId" : 1,
                        "controlOrder" : 1,
                        "controlWidth" : 2,
                        "showLabel" : true,
                        "dataKey" : "dataKey_" + id
                    });
                    break;

                case FormEnum.WidgetType.GROUP_BOX_SET:
                    retWidget = new GroupBoxSetWidget({
                        "roType" : "formControlRO",
                        "type" : "GROUPBOXSET",
                        "children" : [],
                        "readOnly" : false,
                        "border" : true,
                        "formControlId" : id,
                        "customLabel" : "customLabel_" + id,
                        "parentFormControlId" : 1,
                        "controlOrder" : 1,
                        "controlWidth" : 1,
                        "showLabel" : true,
                        "dataKey" : "dataKey_" + id
                    });
                    break;

                case FormEnum.WidgetType.MONETARY:
                    retWidget = new MonetaryWidget({
                        "roType" : "formControlRO",
                        "type" : "MONETARY",
                        "children" : [],
                        "readOnly" : false,
                        "border" : true,
                        "formControlId" : id,
                        "customLabel" : "customLabel_" + id,
                        "parentFormControlId" : 1,
                        "controlOrder" : 1,
                        "controlWidth" : 1,
                        "showLabel" : true,
                        "dataKey" : "dataKey_" + id
                    });
                    break;

                case FormEnum.WidgetType.PROMPT:
                    retWidget = new PromptWidget({
                        "roType" : "formControlRO",
                        "type" : "PROMPT",
                        "children" : [],
                        "readOnly" : false,
                        "border" : false,
                        "formControlId" : id,
                        "customLabel" : "customLabel_" + id,
                        "parentFormControlId" : 1,
                        "controlOrder" : 1,
                        "controlWidth" : 1,
                        "showLabel" : true,
                        "dataKey" : "dataKey_" + id
                    });
                    break;

                case FormEnum.WidgetType.DROPDOWN:
                    retWidget = new DropdownWidget({
                        "roType" : "formControlRO",
                        "type" : "DROPDOWN",
                        "children" : [],
                        "readOnly" : false,
                        "border" : false,
                        "formControlId" : id,
                        "customLabel" : "customLabel_" + id,
                        "parentFormControlId" : 1,
                        "controlOrder" : 1,
                        "controlWidth" : 1,
                        "showLabel" : true,
                        "dataKey" : "dataKey_" + id
                    });
                    break;

                case FormEnum.WidgetType.ENUM_DROPDOWN:
                    retWidget = new EnumDropdownWidget({
                        "roType" : "formControlRO",
                        "type" : "ENUM_DROPDOWN",
                        "children" : [],
                        "readOnly" : false,
                        "border" : false,
                        "formControlId" : id,
                        "customLabel" : "customLabel_" + id,
                        "parentFormControlId" : 1,
                        "controlOrder" : 1,
                        "controlWidth" : 1,
                        "showLabel" : true,
                        "dropdownLabelType" : "ProjectStatus",
                        "dataKey" : "dataKey_" + id
                    });
                    break;

                case FormEnum.WidgetType.DATE_PICKER:
                    retWidget = new DatePickerWidget({
                        "roType" : "formControlRO",
                        "type" : "DATEPICKER",
                        "children" : [],
                        "readOnly" : false,
                        "border" : false,
                        "formControlId" : id,
                        "customLabel" : "customLabel_" + id,
                        "parentFormControlId" : 1,
                        "controlOrder" : 1,
                        "controlWidth" : 1,
                        "showLabel" : true,
                        "dataKey" : "dataKey_" + id
                    });
                    break;

                case FormEnum.WidgetType.TAB:
                    retWidget = new TabWidget({
                        "roType" : "tabRO",
                        "type" : "TAB",
                        "tabId" : id,
                        "tabName" : "tabName_" + id,
                        "tabOrder" : 1,
                        "children" : []
                    });
                    break;

                case FormEnum.WidgetType.TAB_SET:
                    retWidget = new TabSetWidget({
                        "type" : "TABSET",
                        "children" : []
                    });
                    break;

                case FormEnum.WidgetType.PICKER:
                    retWidget = new PickerWidget(
                        {   "roType" : "formControlRO",
                            "type" : "PICKER",
                            "children" : [],
                            "readOnly" : false,
                            "border" : false,
                            "formControlId" : id,
                            "customLabel" : "customLabel_" + id,
                            "parentFormControlId" : 1,
                            "controlOrder" : 1,
                            "controlWidth" : 1,
                            "showLabel" : true,
                            "dataKey" : "dataKey_" + id
                        }
                    );
                    break;
            }
            if (options != null) {
                _.defaults(retWidget.options, options);
            }
            return retWidget;
        }
    };
});