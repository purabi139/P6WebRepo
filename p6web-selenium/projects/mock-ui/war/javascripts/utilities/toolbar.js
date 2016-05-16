define([
    "jquery", "underscore", "text!utilities/toolbarTemplate.html"
], function ($, _, ToolbarLayout) {
    "use strict";

    var toolbarLayoutElement = $(ToolbarLayout);

    var Toolbar = function () {
    };

    Toolbar.prototype = {
        _AdditionPlacement: {
            APPEND: 0,
            PREPEND: 1
        },

        AdditionType: {
            ADD: 0,
            DELETE: 1
        },

        ButtonSize: {
            MINI: "btn-mini",
            SMALL: "btn-small",
            NORMAL: "",
            LARGE: "btn-large"
        },

        ButtonType: {
            DANGER: "btn-danger",
            DEFAULT: "",
            INFO: "btn-info",
            INVERSE: "btn-inverse",
            PRIMARY: "btn-primary",
            SUCCESS: "btn-success",
            WARNING: "btn-warning",
            ACTION: "btn-action",
            BLUE_DARK: "btn-blue-dark",
            BLUE_LIGHT: "btn-blue-light"
        },

        ButtonDataDismissType: {
            MODAL: "modal",
            ALERT: "alert"
        },

        DropDirection: {
            DOWN: "",
            UP: "dropup"
        },

        IconType: {
            CATEGORY_BASED_DECISION_STEP: "icon-category-based-decision-step",
            DELETE: "icon-delete",
            MANUAL_DECISION_STEP: "icon-manual-decision-step",
            PARALLEL_STEP: "icon-parallel-step",
            TASK_STEP: "icon-task-step"
        },

        Button: function (options) {
            options.additionInfo = null;
            return this._createButtonHtml(".tpl-button", options);
        },

        ButtonDataDismiss: function (options) {
            return this._createButtonHtml(".tpl-button-data-dismiss", options);
        },

        ButtonAppended: function (options, additionType) {
            options.additionInfo = this._createAdditionInfo(additionType, this._AdditionPlacement.APPEND);
            return this._createButtonHtml(".tpl-button", options);
        },

        ButtonPrepended: function (options, additionType) {
            options.additionInfo = this._createAdditionInfo(additionType, this._AdditionPlacement.PREPEND);
            return this._createButtonHtml(".tpl-button", options);
        },

        ButtonDropdown: function (options) {
            options.dropDirection = options.dropDirection || this.DropDirection.DOWN;
            options.hasDivider = false;
            return this._createButtonHtml(".tpl-buttonDropdown", options);
        },

        ButtonDropdownWithDivider: function (options) {
            options.dropDirection = options.dropDirection || this.DropDirection.DOWN;
            options.hasDivider = true;
            return this._createButtonHtml(".tpl-buttonDropdown", options);
        },

        ImageButton: function (options) {
            options.additionInfo = null;
            return this._createButtonHtml(".tpl-imageButton", options);
        },

        SplitButtonDropdown: function (options) {
            options.dropDirection = options.dropDirection || this.DropDirection.DOWN;
            return this._createButtonHtml(".tpl-splitButtonDropdown", options);
        },

        ButtonGroup: _.template(_.pluckMarkup(toolbarLayoutElement, ".tpl-buttonGroup", null)),

        Toolbar: _.template(_.pluckMarkup(toolbarLayoutElement, ".tpl-toolbar", null)),

        _createAdditionInfo: function (additionType, additionPlacement) {
            var additionInfo = null;

            switch (additionType) {
                case this.AdditionType.ADD:
                    additionInfo = {
                        cssClass: "add",
                        label: "+"
                    };
                    break;
                case this.AdditionType.DELETE:
                    additionInfo = {
                        cssClass: "del",
                        label: "x"
                    };
                    break;
            }
            switch (additionPlacement) {
                case this._AdditionPlacement.APPEND:
                    additionInfo.append = true;
                    break;
                case this._AdditionPlacement.PREPEND:
                    additionInfo.prepend = true;
                    break;
            }
            return additionInfo;
        },

        _createButtonHtml: function (templateClass, options) {
            return _.pluckMarkup(toolbarLayoutElement, templateClass, _.defaults(options, {
                size: this.ButtonSize.NORMAL,
                type: this.ButtonType.BLUE_LIGHT
            }));
        },

        _itemEnabled: function (itemElement) {
            var result = true;

            // See https://github.com/twitter/bootstrap/pull/2301/files
            if (itemElement.prop("disabled") || itemElement.is(".disabled") || itemElement.is("[disabled]")) {
                result = false;
            }
            return result;
        },

        ToolbarItemCallback: function (callback) {
            var self = this;

            return function (e) {
                return self._itemEnabled($(e.currentTarget)) ? _.bind(callback, this)(e) : false;
            };
        },

        enable: function (buttonElement) {
            buttonElement.removeClass("disabled");
        },

        disable: function (buttonElement) {
            if (!buttonElement.hasClass("disabled")) {
                buttonElement.addClass("disabled");
            }
        }
    };

    return new Toolbar();
});