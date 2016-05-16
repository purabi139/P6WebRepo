define([
    "jquery", "underscore", "backbone", "common/widgetView"
], function ($, _, Backbone, WidgetView) {
    "use strict";

    return WidgetView.extend({
        /* Abstract methods */

        initializeContainerWidget: $.noop,

        /* End of Abstract methods */

        _childrenEl: ".children",

        initializeWidget: function () {
            this.children = [];
            this._parent = null;
            this.supportChildren = true;

            _.defaults(this.options, this._defaults);
            this.initializeContainerWidget();
        },

        renderChildren: function () {
            var $tempContainer = $("<div>");
            this._prepareWidgetsForRender(this.getChildren(), $tempContainer);
            this.$(this._childrenEl).append($tempContainer.children());
            return this;
        },

        removeWidget: function(){
            _.each(this.getChildren(), function (child) {
                child.remove();
            }, this);
            this.$el.empty();
        },

        _prepareWidgetsForRender: function (children, parent) {
            _.each(children, function (widget) {
                var container = $("<div>");
                widget.render(container.get(0));
                widget.setElement(container.find(".anchor").get(0));
                parent.append(container.children());

            }, this);
        },

        setChildrenEl: function (el) {
            this._childrenEl = el;
        },

        addChild: function (child) {
            this.children.push(child);
            child._setParent(this);
        },

        getChildren: function () {
            return this.children;
        },

        getParent: function () {
            return this._parent;
        },

        _setParent: function (parent) {
            this._parent = parent;
        }
    });
});