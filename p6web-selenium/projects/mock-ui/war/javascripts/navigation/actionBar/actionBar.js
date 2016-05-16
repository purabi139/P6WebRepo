define([
    "underscore", "i18n!nls/localeStrings",
    "common/widgetView",
    "text!navigation/actionBar/actionBarTemplate.html", "navigation/actionBar/actionBarEnums",
    "utilities/toolbar"
], function (_, locale, WidgetView, ViewMarkup, ActionBarEnums, Toolbar) {
    "use strict";

    var CLICK_EVENT_SELECTOR = "click .%0";

    return WidgetView.extend({
        _defaults: {
            type: ActionBarEnums.Type.SAVE
        },

        events: function () {
            var events = {};

            events[_.formatString(CLICK_EVENT_SELECTOR, ActionBarEnums.Selector.CANCEL_BUTTON)] = Toolbar.ToolbarItemCallback(function (e) {
                this.trigger(ActionBarEnums.Event.CANCEL);
            });
            events[_.formatString(CLICK_EVENT_SELECTOR, ActionBarEnums.Selector.COMPLETE_BUTTON)] = Toolbar.ToolbarItemCallback(function (e) {
                this.trigger(ActionBarEnums.Event.COMPLETE);
            });
            events[_.formatString(CLICK_EVENT_SELECTOR, ActionBarEnums.Selector.SAVE_BUTTON)] = Toolbar.ToolbarItemCallback(function (e) {
                this.trigger(ActionBarEnums.Event.SAVE);
            });
            events[_.formatString(CLICK_EVENT_SELECTOR, ActionBarEnums.Selector.SAVE_AS_BUTTON)] = Toolbar.ToolbarItemCallback(function (e) {
                this.trigger(ActionBarEnums.Event.SAVE_AS);
            });

            return events;
        },

        initializeWidget: function () {
            _.defaults(this.options, this._defaults);

            this._changesMade = 0;

            this._createCancelButton();
            this._createCompleteButton();
            this._createSaveAsButton();
            this._createSaveButton();
        },

        getContentMarkup: function () {
            return ViewMarkup;
        },

        renderChildren: function () {
            this.$(".toolbar").append(this._createToolbar());
            this._updateChangesCounterMessage();
        },

        hide: function () {
            if (!this.$el.is(":hidden")) {
                this.$el.slideUp(200);
            }
        },

        show: function () {
            if (this.$el.is(":hidden")) {
                this.$el.slideDown(200);
            }
        },

        removeWidget: function () {
            this.hide();
            this.$el.empty();
        },

        enableButton: function (selector) {
            Toolbar.enable(this.$("." + selector));
        },

        disableButton: function (selector) {
            Toolbar.disable(this.$("." + selector));
        },

        registerChange: function () {
            this._changesMade++;
            this._updateChangesCounterMessage();
        },

        clearChangesCounter: function () {
            this._changesMade = 0;
            this._updateChangesCounterMessage();
        },

        _updateChangesCounterMessage: function () {
            this.$(".message").text(
                _.formatString(locale.text.action_bar_default, this._changesMade));
        },

        _createToolbar: function () {
            var toolbarItems = null;

            switch (this.options.type) {
                case ActionBarEnums.Type.SAVE:
                    toolbarItems = this._constructSaveCancelToolbarItems();
                    break;
                case ActionBarEnums.Type.SAVE_AS:
                    toolbarItems = this._constructSaveSaveAsCancelToolbarItems();
                    break;
                case ActionBarEnums.Type.COMPLETE_SAVE_CANCEL:
                    toolbarItems = this._constructCompleteSaveCancelToolbarItems();
                    break;
            }

            return Toolbar.Toolbar({
                toolbarItems: toolbarItems
            });
        },

        _constructCompleteSaveCancelToolbarItems: function () {
            return [
                this._cancelButton,
                this._saveButton,
                this._completeButton
            ];
        },

        _constructSaveCancelToolbarItems: function () {
            return [
                this._cancelButton,
                this._saveButton
            ];
        },

        _constructSaveSaveAsCancelToolbarItems: function () {
            return [
                this._cancelButton,
                this._saveAsButton
            ];
        },

        _createCancelButton: function () {
            this._cancelButton = Toolbar.ButtonGroup({
                buttons: [Toolbar.Button({
                    recognizedAs: ActionBarEnums.Selector.CANCEL_BUTTON,
                    label: locale.label.cancel,
                    type: Toolbar.ButtonType.ACTION
                })]
            });
        },

        _createSaveButton: function () {
            this._saveButton = Toolbar.ButtonGroup({
                buttons: [Toolbar.Button({
                    recognizedAs: ActionBarEnums.Selector.SAVE_BUTTON,
                    label: locale.label.save,
                    type: Toolbar.ButtonType.ACTION
                })]
            });
        },

        _createSaveAsButton: function () {
            this._saveAsButton = Toolbar.SplitButtonDropdown({
                recognizedAs: ActionBarEnums.Selector.SAVE_BUTTON,
                buttonLabel: locale.label.save,
                buttonItems: [
                    {
                        recognizedAs: ActionBarEnums.Selector.SAVE_AS_BUTTON,
                        label: locale.label.save_as
                    }
                ],
                dropDirection: Toolbar.DropDirection.UP,
                type: Toolbar.ButtonType.ACTION
            });
        },

        _createCompleteButton: function () {
            this._completeButton = Toolbar.ButtonGroup({
                buttons: [Toolbar.Button({
                    recognizedAs: ActionBarEnums.Selector.COMPLETE_BUTTON,
                    label: locale.label.complete,
                    type: Toolbar.ButtonType.ACTION
                })]
            });
        }
    });
});