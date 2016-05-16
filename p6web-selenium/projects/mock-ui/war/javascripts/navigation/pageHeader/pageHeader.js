define([
    "jquery", "underscore", "backbone", "i18n!nls/localeStrings",
    "common/widgetView",
    "navigation/context/contextPresenter",
    "text!navigation/pageHeader/pageHeaderTemplate.html"
], function ($, _, Backbone, locale, WidgetView, ContextPresenter, HeaderLayout) {
    "use strict";

    return WidgetView.extend({
        _defaults: {
            heading: "",
            subheading: "",
            link: {
                enabled: false,
                url: "#"
            },
            context: {
                enabled: false
            },
            conversation: {
                enabled: false,
                url: "#"
            },
            filter: {}
        },

        parentTemplate: _.template("<span>{{label}}</span><a href=\"{{link}}\">{{name}}</a>"),

        getContentMarkup: function () {
            return HeaderLayout;
        },

        initializeWidget: function () {
            _.defaults(this.options, this._defaults);
        },

        renderChildren: function () {
            var that = this;

            if (this.options.type != null && !_.isEmpty(this.options.type)) {
                var text = locale.entity[this.options.type];
                var labelClass = "label-" + this.options.type;

                this.$("span.label").addClass(labelClass).text(text);
            } else {
                this.$("span.label").remove();
            }
            if (this.options.parent != null) {
                this.$(".parent").append(this.parentTemplate(this.options.parent));
            } else {
                this.$(".parent").remove();
            }
            this.setHeading(this.options.heading, this.options.subheading);

            if (this.options.context.enabled) {
                var context = $("<div class=\"context\">");

                this.$(".header-buttons").append(context);
                this._ContextPresenter = new ContextPresenter(_.extend(this.options,
                    {
                        el: context.get(0)
                    }));
            } else {
                this.$(".fav").remove();
            }


            if (this.options.conversation.enabled) {
                this.$(".convo").attr("href", this.options.conversation.url);
            } else {
                this.$(".convo").remove();
            }

            if (this.options.link.enabled) {
                this.$(".heading").on("click", function () {
                    Backbone.history.navigate(that.options.link.url, { trigger: true });
                });
                this.$(".heading").addClass("clickable");
            }

            return this;
        },

        setHeading: function (heading, subheading) {
            this.$(".heading").text(heading + (subheading.length > 0 ? ": " : ""));
            this.$(".subheading").text(subheading);
        },

        removeWidget: function () {
            this.$(".heading").off("click");
        }
    });
});