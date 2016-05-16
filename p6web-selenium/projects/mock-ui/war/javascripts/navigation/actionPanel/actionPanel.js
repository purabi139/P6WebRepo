define([
    "jquery", "underscore", "backbone",
    "text!navigation/actionPanel/actionPanelTemplate.html"
], function ($, _, Backbone, Markup) {
    "use strict";

    var $markup = $(Markup);
    var actionPanelMarkup = _.pluckMarkup($markup, ".htm-action-panel", null);
    var actionSectionTemplate = _.template(_.pluckMarkup($markup, ".htm-action-section"));
    return Backbone.View.extend({
        events: {
            "click .action-content ul > li > a": "_bubbleAction"
        },

        /**
        * Reads the <code>data-target</code> attribute of the cliked link and triggers that event on itself.
        * @param {jQuery.Event} evt
        * @return {Boolean} returns false to prevent default and stop propagation
        * @private
        */
        _bubbleAction: function (evt) {
            this.trigger(_.formatString("actionPanel:%0", $(evt.target).attr("data-event")));
            return false;
        },

        /**
        * Initialize the Action Panel
        *
        * @param {Array} options.linkGroups A 2D array representing the groups of links which are represented by objects.
        *                                   The object's label is used as the links text and the event is what this view
        *                                   will trigger on itself when it is clicked.
        *                                   e.g. [[{label:"Display Me",event:"displayed"},
        *                                          {label:"Another",event:"another"}]], [{...}, ...], ...]
        */
        initialize: function (options) {
            this.actions = options.actions || [];
        },

        render: function () {
            var that = this;

            this.$actionPanel = $(actionPanelMarkup);
            var $contentPanel = this.$actionPanel.find(".action-content");
            _.each(this.actions, function (actionGroup) {
                var $section = $(actionSectionTemplate(actionGroup));
                var $list = $section.find("ul");
                _.each(actionGroup.links, function (link) {
                    var $li = $(document.createElement("li"));
                    if (link.separator) {
                        $li.addClass("separator");
                    } else {
                        $li.append(that.make("a", { "data-event": link.event }, link.label));
                    }
                    $list.append($li);
                });
                $contentPanel.append($section);
            });
            this.$el.append(this.$actionPanel);

            this.$(".open-arrow").on("click", function () {
                that._show();
                $("html").on("click.action-panel", function (event) {
                    var clicked = $(event.target);
                    if (!clicked.parents().is(".action-panel,.action-content")) {
                        that._hide();
                        $("html").unbind("click.action-panel");
                    }
                });
            });
            this.$(".close-arrow").on("click", function () {
                that._hide();
            });

            return this;
        },

        _hide: function () {
            var that = this;

            that.$actionPanel.addClass("closed");
            that.$actionPanel.addClass("transition");
            that.$actionPanel.animate({ width: "19px" }, 350, function () {
                that.$actionPanel.removeClass("transition");
            });
        },

        _show: function () {
            var that = this;

            that.$actionPanel.addClass("transition");
            that.$actionPanel.animate({ width: "250px" }, 350, function () {
                that.$actionPanel.removeClass("closed");
                that.$actionPanel.removeClass("transition");
            });
        },

        remove: function () {
            this.off();
            this.undelegateEvents();
            this.$actionPanel.remove();
        }
    });
});