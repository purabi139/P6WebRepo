define([
    "jquery", "underscore", "backbone",
    "formEngine/formEngineEnum", "i18n!nls/localeStrings",
    "text!formEngine/formEngineViewTemplate.html", "formEngine/containerView"
], function ($, _, Backbone, Enum, locale, FormTemplate, ContainerView) {
    "use strict";

    var template = _.pluckMarkup($(FormTemplate), ".htm-groupTemplate", null);

    return ContainerView.extend({
        _defaults : {
            label : "",
            borderClass : "",
            sizeClass : "",
            showLabel : true
        },

        _sizeToStyleMap : [],

        initializeContainerWidget : function () {
            this._initializeSizeToStyleMap();
            this._updateStyles();
        },

        _initializeSizeToStyleMap : function () {
            this._sizeToStyleMap[Enum.GroupWidgetSize.QUARTER] = "span3";
            this._sizeToStyleMap[Enum.GroupWidgetSize.HALF] = "span6";
            this._sizeToStyleMap[Enum.GroupWidgetSize.THREE_QUARTERS] = "span9";
            this._sizeToStyleMap[Enum.GroupWidgetSize.WHOLE] = "span12";
        },

        _updateStyles : function () {
            if (this.options.border === true) {
                this.options.borderClass = "bordered-fieldset";
            }
            if (this.options.controlWidth != null ){
                this.options.sizeClass = this._sizeToStyleMap[this.options.controlWidth];
            }
        },

        getContentMarkup : function () {
            return _.template(template)({ options : this.options });
        }
    });
});