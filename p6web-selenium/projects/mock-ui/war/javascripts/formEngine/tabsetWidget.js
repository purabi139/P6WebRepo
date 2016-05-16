define([
    "jquery", "underscore", "backbone", "formEngine/containerView", "event-bus", "formEngine/formEngineEnum", "text!formEngine/formEngineViewTemplate.html"
], function ($, _, Backbone, ContainerView, EventBus, Enum, TabTemplate) {
    "use strict";
    var template = _.pluckMarkup($(TabTemplate), ".htm-tabsetTemplate", null);

    return ContainerView.extend({

        initializeContainerWidget: function () {
            this.setChildrenEl (".tab-content");
        },

        getContentMarkup : function () {
            return _.template(template)({options : this.options});
        },

        _prepareWidgetsForRender : function (children, tempEl) {
            _.each(children, function (widget) {
                widget.render();
                tempEl.append(widget.$el.get(0));
            }, this);
        }
   });
});