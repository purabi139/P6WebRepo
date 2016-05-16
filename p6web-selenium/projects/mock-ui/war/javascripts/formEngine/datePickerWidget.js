define([
    "jquery", "underscore", "backbone", "event-bus", "formEngine/formWidgetView", "text!formEngine/formEngineViewTemplate.html",
    "formEngine/formEngineEnum", "oui", "dateFormat"
], function ($, _, Backbone, EventBus, FormWidgetView, formTemplate, Enum, OUI, DateFormat) {
    "use strict";

    var template = _.pluckMarkup($(formTemplate), ".htm-datePickerTemplate", null);

    return FormWidgetView.extend({
        getContentMarkup: function () {

            return _.template(template)({ options: this.options });
        },

        doRender: function () {
            return this;
        },

        registerFormListeners: function () {
            EventBus.on(Enum.POST_RENDER, this.postRender, this);
        },
        postRender: function () {
            this.$("input[type=date]").first().datePicker({
                fluid: true,
                iconTrigger: true,
                fallback: false,
                locale: {
                    today: "Today",
                    cancel: "Cancel"
                },
                dateFormat: function (date) {
                    return date.toDateString();
                },
                error: function (event, ui) {
                    console.error("Error: " + ui.prevValue.toDateString());
                }
            });

        },

        controlSelected: function (event, target) {
        },

        controlChanged: function ($target) {
            this.setData($target.val());
        },

        controlBlur: function ($target) {
        },

        setData: function (value) {
            var date = _.formatDate(value);
            var d = new Date(date);
            var formatedDate = d.format("mm/dd/yyyy");
            this.$("input[id=" + this.options.controlId + "]").val(formatedDate);

        },

        getWidgetValue: function (value) {
            var date = _.formatDate(value);
            var d = new Date(date);
            return d.format("mm-dd-yyyy hh:mm:ss");
        },

        removeFormWidget: function () {
        }
    });
});