define([
    "jquery", "underscore", "backbone",
    "navigation/pageHeader/pageHeader",
    "navigation/actionBar/actionBar",
    "navigation/actionPanel/actionPanel",
    "text!common/pageLayoutTemplate.html", "common/pgbuBackboneEnums"
], function ($, _, Backbone, PageHeader, ActionBar, ActionPanel, Markup, PgbuBackboneEnums) {
    "use strict";

    return Backbone.View.extend({
        //#region Abstract methods

        // Override to provide page-specific action bar settings.
        getActionBarSettings: $.noop,

        // Override to provide page-specific action panel settings.
        getActionPanelSettings: $.noop,

        // Override to provide a page-specific markup to be appended to div.content container.
        getContentMarkup: $.noop,

        // Override to allow collecting data, entered into UI by the user.
        getData: $.noop,

        // Override to provide page-specific header settings.
        getPageHeaderSettings: $.noop,

        // Override to allow page-wide initializations at the beginning of the life-cycle of the page.
        initializePage: $.noop,

        // Override to allow child components to clean up after themselves.
        removePage: $.noop,

        // Override to allow child components to add themselves to the page. Page markup should be fully available at this point.
        renderChildren: $.noop,

        // Override to allow child components to resize themselves on the page. Page markup should be fully available at this point.
        resizeChildren: $.noop,

        // Override to provide the page with data, retrieved from external sources.
        // This method takes an optional parameter, which (if supplied) is an object to hold all implementation-specific options and configurations.
        setData: $.noop,

        //#endregion Abstract methods

        //#region Action Bar methods
        clean: function () {
            this._actionBar.hide();
            this._actionBar.clearChangesCounter();
        },

        dirty: function () {
            this._actionBar.registerChange();
            this.showActionBar();
        },

        showActionBar: function () {
            this._actionBar.show();
        },

        enableActionBarButton: function (selector) {
            this._actionBar.enableButton(selector);
        },

        disableActionBarButton: function (selector) {
            this._actionBar.disableButton(selector);
        },
        //#endregion Action Bar methods

        //#region Page Header methods
        setHeading: function (heading, subHeading) {
            this._pageHeader.setHeading(heading, (subHeading || ""));
        },
        //#endregion Page Header methods

        initialize: function () {
            var self = this;

            this._prepare();

            this._layout = _.getLayout();
            this.initializePage();
            this.render();
            $(window).on("resize", function (event) {
                self._resize();
            });
        },

        remove: function () {
            this.undelegateEvents();

            this._pageHeader.remove();
            this._actionPanel.remove();
            this._actionBar.remove();

            this.removePage();

            $(window).off("resize");

            this.$("div.page-header").empty().removeData();
            this.$("div.toolbar").empty().removeData();
            this.$("div.actions-overlay").empty().removeData();
            this.$("div.content").empty().removeData();
        },

        render: function () {
            this._createHeading();
            this._createActionBar();
            this._createActionPanel();
            this._createContentMarkup();

            this.renderChildren();

            return this;
        },

        _ensureElement: function () {
            if (this.el == null) {
                this.setElement($(".page-content"), false);
            } else {
                Backbone.View.prototype._ensureElement.apply(this, arguments);
            }
        },

        _prepare: function () {
            var activeView = this.$el.data("activeView");

            if (activeView != null && _.isFunction(activeView.remove)) {
                activeView.remove();
            }
            this.$el.data("activeView", this);
        },

        _createActionBar: function () {
            var self = this;

            this._actionBar = new ActionBar(this.getActionBarSettings() || {});
            this._actionBar.on("all", function (eventName) {
                self.trigger(eventName);
            });
            this._actionBar.render(this.$(".actions-overlay").get(0));
        },

        _createActionPanel: function () {
            var self = this;

            this._actionPanel = new ActionPanel({
                actions: this.getActionPanelSettings(),
                el: this.$(".content").get(0)
            });
            this._actionPanel.on("all", function (eventName) {
                self.trigger(eventName);
            });
            this._actionPanel.render();
        },

        _createContentMarkup: function () {
            this.$(".content").append($(Markup).html(this.getContentMarkup(this._layout)));
        },

        _createHeading: function () {
            this._pageHeader = new PageHeader(this.getPageHeaderSettings() || {});
            this._pageHeader.render(this.$(".page-header").get(0));
        },

        _resize: function () {
            var newLayout = _.getLayout();

            if (newLayout !== this._layout) {
                this._layout = newLayout;
                this.resizeChildren();
                this.trigger(PgbuBackboneEnums.ViewEvent.LAYOUT_CHANGED);
            }
        }
    });
});