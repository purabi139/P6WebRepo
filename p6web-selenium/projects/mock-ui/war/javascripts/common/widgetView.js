define([
    "jquery", "underscore", "backbone"
], function ($, _, Backbone) {
    "use strict";

    return Backbone.View.extend({
        //#region Abstract methods

        // Override to provide a widget-specific markup to be appended to its content container.
        getContentMarkup: $.noop,

        // Override to allow collecting data, entered into UI by the user.
        getData: $.noop,

        // Override to allow widget-specific initializations at the beginning of the life-cycle of the widget.
        initializeWidget: $.noop,

        // Override to allow child components to clean up after themselves.
        removeWidget: $.noop,

        // Override to allow child components to add themselves to the widget. Widget markup should be fully available at this point and connected to the page.
        renderChildren: $.noop,

        // Override to allow child components to resize themselves inside of the widget. Widget markup should be fully available at this point and connected to the page.
        resizeChildren: $.noop,

        // Override to provide the widget with data, retrieved from external sources.
        // This method takes an optional parameter, which (if supplied) is an object to hold all implementation-specific options and configurations.
        setData: $.noop,

        //#endregion Abstract methods

        initialize: function () {
            this._layout = _.getLayout();
            this.initializeWidget();
        },

        render: function (renderTo) {
            this.setElement(renderTo);

            this._createContentMarkup();

            this.renderChildren();

            // Wire the events now, since widget markup should be fully available at this point and connected to the page.
            this.delegateEvents();

            return this;
        },

        _createContentMarkup: function () {
            this.$el.html(this.getContentMarkup(this._layout));
        },

        remove: function () {
            this.undelegateEvents();
            this.off();

            this.removeWidget();
        }
    });
});