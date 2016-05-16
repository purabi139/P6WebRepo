define([
    "underscore", "i18n!nls/localeStrings", "pgbu-backbone", "navigation/context/contextEnums"
], function (_, locale, PgbuBackbone, ContextEnums) {
    "use strict";

    return PgbuBackbone.Collection.extend({
        _response: null,
        _contextType: null,
        _url: null,
        _dropDown: null,
        _buttonModel: null,
        _selectedId: null,
        _selectedText: "",

        initialize: function (models, options) {
            this._contextType = options.type;
            this._selectedId = options.selectedId;
            this._setUrl();
        },

        _setUrl: function () {
            switch (this._contextType) {
                case ContextEnums.EntityType.CAPITAL_PLAN:
                    this._url = "rest/capitalPlans";
                    break;
                case ContextEnums.EntityType.PROJECT:
                    this._url = "rest/projects/list";
                    break;
                case ContextEnums.EntityType.STRATEGY:
                    this._url = "rest/strategy/all/limited";
                    break;
                case ContextEnums.EntityType.SCENARIO:
                    this._url = "rest/scenario2/capitalplan/" + this._selectedId.capitalPlanId;
                    break;
            }
        },

        url: function () {
            return this._url;
        },

        parse: function (response) {
            this._getResponse(response);
            this._setButtonModel();
            return response.response;
        },

        _getResponse: function (response) {
            this._response = response.response;
        },

        _setButtonModel: function () {
            var buttonItems = this._getDropdownItems();
            var dropdown = {
                recognizedAs: "pull-left " + this._contextType,
                buttonLabel: this._selectedText,
                buttonItems: buttonItems
            };

            this._buttonModel = dropdown;
        },

        _getDropdownItems: function () {
            var self = this;
            var dropItems = [];

            this._selectedText = this._contextType;
            switch (this._contextType) {
                case ContextEnums.EntityType.CAPITAL_PLAN:
                    _.each(this._response, function (item) {
                        if (item.capitalPlanId === self._selectedId) {
                            self._selectedText = item.capitalPlanName;
                        }
                        dropItems.push({
                            recognizedAs: "dropItem " + self._contextType + "ID" + item.capitalPlanId,
                            label: item.capitalPlanName
                        });

                    });
                    break;
                case ContextEnums.EntityType.PROJECT:
                    _.each(this._response, function (item) {
                        if (item.projectId === self._selectedId) {
                            self._selectedText = item.projectName;
                        }
                        dropItems.push({
                            recognizedAs: "dropItem " + self._contextType + "ID" + item.projectId,
                            label: item.projectName
                        });

                    });
                    break;
                case ContextEnums.EntityType.STRATEGY:
                    _.each(this._response, function (item) {
                        if (item.strategyId === self._selectedId) {
                            self._selectedText = item.strategyName;
                        }
                        dropItems.push({
                            recognizedAs: "dropItem " + self._contextType + "ID" + item.strategyId,
                            label: item.strategyName
                        });

                    });
                    break;
                case ContextEnums.EntityType.SCENARIO:
                    //push Live option
                    dropItems.push({
                        recognizedAs: "dropItem " + self._contextType + "ID0",
                        label: locale.label.live
                    });
                    self._selectedText = locale.label.live;
                    //push response options
                    _.each(this._response, function (item) {
                        if (item.scenarioId === self._selectedId.id) {
                            self._selectedText = item.scenarioName;
                        }
                        dropItems.push({
                            recognizedAs: "dropItem " + self._contextType + "ID" + item.scenarioId,
                            label: item.scenarioName
                        });
                    });
                    break;
                default:
                    _.each(this._response, function (item) {
                        if (item.id === self._selectedId) {
                            self._selectedText = item.name;
                        }
                        dropItems.push({
                            recognizedAs: "dropItem " + self._contextType + "ID" + item.id,
                            label: item.name
                        });
                    });
            }
            return dropItems;
        },

        getButtonModel: function () {
            return this._buttonModel;
        }
    });
});