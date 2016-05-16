define([
    "jquery", "underscore", "backbone", "formEngine/containerView",  "formEngine/formEngineEnum", "text!formEngine/formEngineViewTemplate.html"
], function ($, _, Backbone, ContainerView, Enum, TabTemplate) {
    "use strict";
    var template = _.pluckMarkup($(TabTemplate), ".htm-groupsetTemplate", null);
    return ContainerView.extend({
        initializeContainerWidget: function () {
            this.options.controlId = _.uniqueId("widget_");
        },

        getContentMarkup : function () {
            return _.template(template)({options : this.options});
        }
    });
});