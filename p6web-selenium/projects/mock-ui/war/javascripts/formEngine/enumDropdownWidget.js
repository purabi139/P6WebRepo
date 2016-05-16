define([
    "jquery", "underscore", "backbone", "event-bus", "formEngine/formWidgetView",
    "text!formEngine/formEngineViewTemplate.html", "formEngine/formSettingsMetaDataModel", "formEngine/formEngineEnum"
], function ($, _, Backbone, EventBus, FormWidgetView, DropDownTemplate, FormSettingsMetadataModel, Enum) {
    "use strict";

    var dropDownTemplate = _.pluckMarkup($(DropDownTemplate), ".htm-dropDownTemplate", null);
    var dropDownOptionTemplate = _.pluckMarkup($(DropDownTemplate), ".htm-enumDropDownOptionTemplate", null);

    return FormWidgetView.extend({

        initializeFormWidget: function () {
            this._prepareMarkup();
        },

        getContentMarkup: function () {
            return this._dropDownTemplate;
        },

        renderSubViews: function () {
            return this;
        },
        registerFormListeners: function () {
            EventBus.on(Enum.FORM_ENUM_LOADED, this._setSettingsData, this);
        },
        _prepareMarkup: function () {
            this._dropDownTemplate = _.template(dropDownTemplate)({ options: this.options });
        },

        doRender: function () {
            return this.$el;
        },
        getSettingsType: function () {
            return this.options.enums;
        },

        setData: function (value) {
            if (value === "") {
                this.$el.find("#" + this.options.controlId).prop("selectedIndex", 0);
            }
            else {
                this.$el.find("#" + this.options.controlId + " option[value=\"" + value + "\"]").attr("selected", "selected");
            }
        },
        _setSettingsData: function (value) {
            var self = this;
            var valueList = value[this.options.dropdownLabelType];
            this._addFirstEmptySelection();
            for (var key in valueList) {
                self.$el.find("select").append(_.template(dropDownOptionTemplate)({
                    optionItem: {
                        id: key,
                        name: self._fixOptionName(valueList[key])
                    }
                }));
            }
        },

        _addFirstEmptySelection : function(){
            this.$el.find("select").append(_.template(dropDownOptionTemplate)({
                optionItem: {
                    id: "NO_ID",
                    name: ""
                }
            }));
        },

        _fixOptionName : function(name){
            return name.replace("WS_","");
        },

        getWidgetValue: function (value) {
            return value;
        },

        removeFormWidget: function () {
        }
    });
});