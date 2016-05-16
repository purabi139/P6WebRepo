define([
    "jquery", "underscore", "backbone", "event-bus", "formEngine/formWidgetView",
    "text!formEngine/formEngineViewTemplate.html", "formEngine/formEngineEnum"
], function ($, _, Backbone, EventBus, FormWidgetView, formTemplate, Enum) {
    "use strict";

    var template = _.pluckMarkup($(formTemplate), ".htm-promptTemplate", null);
    return FormWidgetView.extend({

        initializeFormWidget: function () {
            this.unboundListeners();
        },

        getContentMarkup: function () {
            return _.template(template)({ options: this.options });
        },

        renderSubViews: function () {
            return this;
        },


        controlSelected: function (event, target) {
        },

        controlChanged: function ($target) {
        },

        controlBlur: function ($target) {
        },

        removeFormWidget: function () {
        }
    });
});