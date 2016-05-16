define([
    "jquery", "underscore", "backbone",
    "pgbu-backbone",
    "formEngine/formMetaDataModel", "formEngine/formView", "formEngine/groupsetWidget", "formEngine/groupWidget",
    "formEngine/textWidget", "formEngine/tabsetWidget", "formEngine/tabWidget", "formEngine/promptWidget",
    "formEngine/dropdownWidget", "event-bus",
    "formEngine/textAreaWidget", "formEngine/formEngineEnum",
    "formEngine/monetaryWidget", "formEngine/datePickerWidget", "formEngine/pickerWidget",
    "formEngine/enumDropdownWidget"
], function ($, _, Backbone, PgbuBackbone, FormMdtModel, FormView, GroupSetWidget, GroupWidget, TextWidget,
              TabSetWidget, TabWidget, PromptWidget, DropdownWidget, EventBus, TextAreaWidget, Enum, MonetaryWidget,
              DatePickerWidget, PickerWidget, EnumDropdownWidget) {
    "use strict";

    return PgbuBackbone.BaseClass.extend({

        _widgetMap: { },
        _formContext: null,
        _codeTypes: {},
        _formView: {},
        _entity: null,
        _entityId: null,

        init: function () {
            this._widgetMap[Enum.WidgetType.GROUP_BOX_SET] = GroupSetWidget;
            this._widgetMap[Enum.WidgetType.GROUP_BOX] = GroupWidget;
            this._widgetMap[Enum.WidgetType.TEXT] = TextWidget;
            this._widgetMap[Enum.WidgetType.TAB_SET] = TabSetWidget;
            this._widgetMap[Enum.WidgetType.TAB] = TabWidget;
            this._widgetMap[Enum.WidgetType.PROMPT] = PromptWidget;
            this._widgetMap[Enum.WidgetType.DROPDOWN] = DropdownWidget;
            this._widgetMap[Enum.WidgetType.TEXT_AREA] = TextAreaWidget;
            this._widgetMap[Enum.WidgetType.MONETARY] = MonetaryWidget;
            this._widgetMap[Enum.WidgetType.DATE_PICKER] = DatePickerWidget;
            this._widgetMap[Enum.WidgetType.PICKER] = PickerWidget;
            this._widgetMap[Enum.WidgetType.ENUM_DROPDOWN] = EnumDropdownWidget;
        },

        getForm: function (formContext) {
            var self = this;
            this._formContext = formContext;

            var _formMdtModel = new FormMdtModel({formContext: this._formContext});
            _formMdtModel.fetch({
                success: function (responseFormMdt) {
                    self._entity = _formMdtModel.getFormEntity();
                    self._entityId = _formMdtModel.getFormEntityId();
                    var widgets = {
                        children: [],
                        addChild: function (child) {
                            this.children.push(child);
                        }
                    };

                    self._generateChildren(responseFormMdt.getFormChildren(), widgets);
                    self._formView = new FormView({
                        widgets: widgets.children,
                        title: responseFormMdt.getFormTitle(),
                        formType: self._getFormType()
                    });
                    if (responseFormMdt.getFormChildren()[0].children.length===0){
                        self._formView.removePage();
                        self._formView.clean();
                        return;
                    }
                    self._updateProjectCodes(responseFormMdt.getProjectCodes());
                    EventBus.trigger(Enum.FORM_ENUM_LOADED, responseFormMdt.get("enums"));
                    self.postRender();
                }
            });
            return  this._formView;
        },

        _getFormType: function () {
            if (this._formContext.clientType === "wfTaskAssignment") {
                return Enum.FormType.WF_TASK_ASSIGNMENT;
            }
            return Enum.FormType.ENTITY;
        },

        _updateProjectCodes: function (projectCodes) {
            var settingDataMap = {};
            _.each(projectCodes, function (code) {
                settingDataMap[code.projectCategoryTypeId] = code.projectCategoryTypeValues;
            }, this);
            EventBus.trigger(Enum.FORM_SETTINGS_META_DATA_LOADED, settingDataMap);
            EventBus.trigger(Enum.FORM_META_DATA_LOADED, this._formView);
        },

        _generateChildren: function (children, parent) {
            _.each(children, function (child) {
                var widget = this._widgetFactory(child);
                parent.addChild(widget);

                if (widget.supportChildren) {
                    this._generateChildren(child.children, widget);
                }
            }, this);
        },
        postRender: function () {
            EventBus.trigger(Enum.POST_RENDER, null);
        },

        _widgetFactory: function (widgetMdt) {
            var WidgetObject = this._widgetMap[widgetMdt.type];
            var _widget = new WidgetObject(widgetMdt);
            return _widget;
        },

        getFormEntity: function () {
            return this._entity;
        },
        getFormEntityId: function () {
            return this._entityId;
        }
    });
});