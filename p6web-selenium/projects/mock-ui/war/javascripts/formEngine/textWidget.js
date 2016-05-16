define([
    "jquery", "underscore", "backbone", "event-bus", "formEngine/formWidgetView",
    "text!formEngine/formEngineViewTemplate.html"
], function ($, _, Backbone, EventBus, FormWidgetView, formTemplate) {
    "use strict";

    var template = _.pluckMarkup($(formTemplate), ".htm-textTemplate", null);
    return FormWidgetView.extend({
        getContentMarkup: function () {
            return _.template(template)({ options: this.options });
        },

        renderSubViews: function () {
            return this;
        },

        registerFormListeners: function () {
        },

        controlSelected: function (event, target) {
        },

        controlChanged: function ($target) {
        },

        controlBlur: function ($target) {
        },

        setData: function (value) {
            this.$mainControl.val(value);
        },

        removeFormWidget: function () {
        }
    });
});