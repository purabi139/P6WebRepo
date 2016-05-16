define([
    "underscore", "backbone", "pgbu-backbone",
    "navigation/context/contextEnums",
    "navigation/context/contextModel",
    "navigation/context/contextView"
], function (_, Backbone, PgbuBackbone, ContextEnums, ContextModel, ContextView) {
    "use strict";

    return PgbuBackbone.Presenter.extend({
        _succesfulFetchCount: 0,

        initialize: function () {
            var self = this;

            this._view = new ContextView();
            this._view.on(ContextEnums.Event.NAVIGATE, function (params) {
                var replaceRegexp = new RegExp(_.formatString("(%0)/\\d+", params.type), "i");
                var goTo = Backbone.history.getFragment().replace(replaceRegexp, _.formatString("$1/%0", params.id));

                this.navigateToFragment(goTo, {
                    trigger: true
                });
            }, this);
            this._contextCollections = this.options.context.dropdownButtons;
            _.each(this._contextCollections, function (selectedId, type) {
                self._fetchCollection(type, selectedId);
            });
        },

        _fetchCollection: function (type, selectedId) {
            var self = this;
            var entityCollection = new ContextModel([], {
                type: type,
                selectedId: selectedId
            });

            entityCollection.fetch({
                success: function (collection, response) {
                    self._contextCollections[type] = {
                        collection: collection,
                        selectedId: selectedId
                    };
                    self._succesfulFetchCount++;
                    self._setViewData();
                }
            });
        },

        _setViewData: function () {
            // Set data of the Context View after all models were fetched
            if (this._succesfulFetchCount === _.size(this._contextCollections)) {
                this._view.render(this.options.el);
                this._view.setData({
                    contextCollections: this._contextCollections
                });
            }
        }
    });
});