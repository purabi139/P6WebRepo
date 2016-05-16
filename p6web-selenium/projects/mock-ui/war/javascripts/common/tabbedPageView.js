define([
    "jquery", "underscore",
    "common/pageView", "common/widgetView",
    "text!templates/common/tabbedPageLayoutTemplate.html",
    "common/pgbuBackboneEnums"
], function ($, _, PageView, WidgetView, Markup, PgbuBackboneEnums) {
    "use strict";

    return PageView.extend({
        /* Abstract methods */

        // Override to define properties of the tabbed page: an ID for a tabbed page-wide container (recognizedAs),
        // and an ordered list of tab configuration objects.
        // Tab configuration object includes: an ID of the tab (recognizedAs), tab's label (label),
        // and a class of a WidgetView-derivative (tabViewClass), which renders the tab content.
        getTabbedPageConfig: $.noop,

        // Override to allow a page-specific way to navigate from tab to tab.
        // This method expects an ID of the tab to navigate to (tabId) to be passed as the parameter.
        // Tab ID is described as follows (using a regular expression): \w+ .
        navigateToTab: $.noop,

        // Override to allow child components to add themselves to the tabbed page itself, outside of any tab.
        // Page markup should be fully available at this point.
        renderTabbedPageChildren: $.noop,

        // Override to allow child components (which were rendered on the tabbed page itself, outside of any tab) to resize themselves on the page.
        // Page markup should be fully available at this point.
        resizeTabbedPageChildren: $.noop,

        /* End of Abstract methods */

        getActiveTab: function () {
            return this._activeTab;
        },

        getContentMarkup: function () {
            var templateValues = {
                recognizedAs: this._pageConfig.recognizedAs,
                tabConfigs: this._getTabConfigsForRender()
            };

            return (_.template(Markup))(templateValues);
        },

        getData: function () {
            if (this._activeTab != null) {
                return this._activeTab.getData();
            }
        },

        initializePage: function () {
            var self = this;
            var activeTabConfig = null;

            this._pageConfig = this.getTabbedPageConfig();

            activeTabConfig = _.find(this._pageConfig.tabConfigs, function (tabConfig) {
                return tabConfig.recognizedAs === self.options.activeTabId;
            });
            if (activeTabConfig != null &&
                _.isFunction(activeTabConfig.tabViewClass) &&
                WidgetView.prototype.isPrototypeOf(activeTabConfig.tabViewClass.prototype)) {
                this._activeTab = new activeTabConfig.tabViewClass();
                this._activeTab.on("all", function (eventName) {
                    if (eventName === PgbuBackboneEnums.ViewEvent.DATA_MODIFIED) {
                        self.dirty();
                    }
                    else {
                        self.trigger.apply(self, arguments);
                    }
                });
            }
        },

        renderChildren: function () {
            var self = this;

            this.renderTabbedPageChildren();

            this.$("ul.nav.nav-tabs").on("shown", "a[data-toggle=\"tab\"]", function (event) {
                var tabIdMatcher = /^\.(\w+)$/i;
                var tabId = $(event.target).data("target").match(tabIdMatcher);

                if (tabId != null) {
                    self.trigger(PgbuBackboneEnums.ViewEvent.TAB_CHANGED, tabId[1]);
                }
            });
            if (this._activeTab != null) {
                this._activeTab.render(_.formatString(".%0", this.options.activeTabId));
            }
        },

        resizeChildren: function () {
            this.resizeTabbedPageChildren();

            if (this._activeTab != null) {
                this._activeTab.resizeChildren();
            }
        },

        removePage: function () {
            this.undelegateEvents();

            this.$("ul.nav.nav-tabs").off("shown");

            if (this._activeTab != null) {
                this._activeTab.off();
                this._activeTab.remove();
            }
        },

        setData: function (options) {
            if (this._activeTab != null) {
                this._activeTab.setData(options);
            }
        },

        _getTabConfigsForRender: function () {
            var self = this;

            return _.map(this._pageConfig.tabConfigs, function (tabConfig) {
                return {
                    activeType: tabConfig.recognizedAs === self.options.activeTabId ? "active" : "",
                    label: tabConfig.label,
                    recognizedAs: tabConfig.recognizedAs
                };
            });
        }
    });
});