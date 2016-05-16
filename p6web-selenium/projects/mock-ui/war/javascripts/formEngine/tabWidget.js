define([
    "jquery", "underscore", "backbone", "formEngine/containerView", "event-bus", "formEngine/formEngineEnum", "text!formEngine/formEngineViewTemplate.html"
], function ($, _, Backbone, ContainerView, EventBus, Enum, TabTemplate) {
    "use strict";
    var tabTemplate = _.pluckMarkup($(TabTemplate), ".htm-tabTemplate", null);
    var tabLinkTemplate = _.pluckMarkup($(TabTemplate), ".htm-tabSetLinkTemplate", null);

    return ContainerView.extend({

        initializeContainerWidget: function () {
            this.options.controlId = _.uniqueId("tab_");
            this.children = [];
            this._prepareMarkup();
        },

        getContentMarkup : function () {
            return "";
        },

        _prepareMarkup : function(){
            this.options.tabId = _.uniqueId("tab-pane_");
            this._tabMarkup =  _.template(tabTemplate)({options : this.options});
            this._tabLinkMarkup =  _.template(tabLinkTemplate)({options : this.options});
        },

        renderChildren : function ( ) {
            this._tabpaneContainer = $(this._tabMarkup);
            this._prepareWidgetsForRender(this.children, this._tabpaneContainer);
            this.getParent().$(".nav").append(this._tabLinkMarkup);
            this.$el = this._tabpaneContainer;
            return this.$el;
        }
    });
});