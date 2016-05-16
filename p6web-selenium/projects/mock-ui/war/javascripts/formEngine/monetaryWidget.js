define([
    "jquery", "underscore", "backbone", "event-bus", "formEngine/formWidgetView",
    "text!formEngine/formEngineViewTemplate.html",
    "formEngine/formEngineEnum", "oui"
], function ($, _, Backbone, EventBus, FormWidgetView, formTemplate, Enum, oui) {
    "use strict";

    var template = _.pluckMarkup($(formTemplate), ".htm-monetaryTemplate", null);
    return FormWidgetView.extend({

        initializeFormWidget : function () {
            this._prepareMarkup();
        },

        getContentMarkup : function () {
            return this._monetaryTemplate;
        },
        _prepareMarkup : function () {
            this._monetaryTemplate = _.template(template)({ options : this.options });
        },
        doRender : function () {
            return this;
        },
        registerFormListeners : function () {
            EventBus.on(Enum.POST_RENDER, this.postRender, this);
        },

        postRender : function () {
            $("input[type=number]").first().number({
                type : "number",
                fluid : true,
                min : "0",
                step : 10
            });
        },
        setData : function (value) {
            $("input[id=" + this.options.controlId + "]").val(value);
        },

        getWidgetValue : function (value) {
            return parseFloat(value.replace(/,/g, ""));
        },

        removeFormWidget : function () {
        }
    });
});