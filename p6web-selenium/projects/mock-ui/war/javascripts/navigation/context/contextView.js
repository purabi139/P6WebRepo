define([
    "jquery", "underscore",
    "common/widgetView",
    "text!navigation/context/contextViewTemplate.html",
    "utilities/toolbar", "navigation/context/contextEnums"
], function ($, _, WidgetView, viewMarkup, Toolbar, ContextEnums) {
    "use strict";

    return WidgetView.extend({
        events: {
            "click .dropItem": Toolbar.ToolbarItemCallback(function (e) {
                var className = $(e.target).attr("class");
                var navigationParams = this._getNavigationTypeAndId(className);

                if (navigationParams != null) {
                    this.trigger(ContextEnums.Event.NAVIGATE, {
                        id: navigationParams.id,
                        type: navigationParams.type
                    });
                }
            })
        },

        getContentMarkup: function () {
            return viewMarkup;
        },

        setData: function (options) {
            var self = this;
            var dropdown = [];

            if (options.contextCollections != null) {
                _.each(options.contextCollections, function (contextCollection, type) {
                    var buttonOptions = contextCollection.collection.getButtonModel();

                    buttonOptions.type = Toolbar.ButtonType.BLUE_DARK;
                    dropdown.push(Toolbar.ButtonDropdownWithDivider(buttonOptions));
                });
                self.$(".context-container").append(Toolbar.Toolbar({
                    toolbarItems: dropdown
                }));
            }
        },

        _getNavigationTypeAndId: function (className) {
            var myRegexp = /^dropItem (\w+)ID(\d+)$/i;
            var match = className.match(myRegexp);
            var result = null;

            if (match != null) {
                result = {
                    type: match[1],
                    id: match[2]
                };
            }
            return result;
        }
    });
});