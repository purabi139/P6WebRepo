define([
    "jquery", "underscore", "backbone",
    "i18n!nls/localeStrings",
    "common/pgbuBackboneEnums"
], function ($, _, Backbone, locale, PgbuBackboneEnums) {
    "use strict";

    var extended = {};

    /**
    * The storeXhr and killAllXhr are extremely experimental.
    * If you have any feedback on it, contact <george.adams@oracle.com>.
    */
    var activeXhr = {};
    var storeXhr = function (xhr) {
        var id = _.uniqueId("xhr");
        activeXhr[id] = xhr;
        xhr.always(function () {
            delete activeXhr[id];
        });
    };
    /**
    * Call this method to abort all currently active XHRs started from within Backbone.
    */
    var killAllXhr = extended.killAllXhr = function () {
        _.each(activeXhr, function (xhr) {
            if (_.has(xhr, "abort")) {
                xhr.abort();
            }
        });
    };
    var _sync = Backbone._sync || Backbone.sync; //this file can be run twice so be careful
    Backbone.sync = function (method, model, options) {
        var xhr = null;

        // Reroute "patch" partial updates through the PUT HTTP verb, instead of PATCH.
        if (method === "patch") {
            options.type = "PUT";
        }
        xhr = _sync.apply(this, [method, model, options]);
        if (!options.ubiqitous) {
            storeXhr(xhr);
        }
        return xhr;
    };
    var _loadUrl = Backbone.History.prototype.loadUrl;
    Backbone.History.prototype.loadUrl = function () {
        killAllXhr();
        return _loadUrl.apply(this, _.toArray(arguments));
    };

    var setSchema = extended.setSchema = function (dest, schema) {
        if (dest.schema != null) {
            _.each(dest.schema, function (value, key) {
                if (_.isUndefined(schema[key])) {
                    schema[key] = value;
                } else {
                    _.defaults(schema[key], value);
                }
            });
        }
        dest.schema = schema;
    };

    var defaultErrorHandler = function (modelOrCollection, response, options) {
        var error = "";

        try {
            error = JSON.parse(response.responseText).errorMessage;
        }
        catch (e) {
        }
        finally {
            if (error == null || error === "") {
                error = response.responseText;
            }
        }
        _.flash({
            type: PgbuBackboneEnums.FlashMessageType.ERROR,
            closeable: false,
            text: _.formatString(locale.error.model_or_collection_accessing_server_data_failed, error)
        });
    };

    extended.Model = Backbone.DeepModel.extend({
        initialize: function () {
            this.schema = this.schema || null;
            this.on("error", function (model, response, options) {
                defaultErrorHandler(model, response, options);
            });
        },

        _requestOptions: function (options) {
            var that = this;

            options = options ? _.clone(options) : {};
            options.data = options.data || {};
            //`x == null` checks for null and undefined
            if (options.data.metadata == null && this.schema == null &&
                (this.collection == null || this.collection.schema == null)) {
                options.data.metadata = "true";
            }
            var success = options.success;
            options.success = function (model, resp) {
                if (_.isObject(resp.schema)) {
                    setSchema(that, resp.schema);
                }
                if (success) {
                    success(model, resp);
                }
            };
            options.cache = false;
            return options;
        },

        fetch: function (options) {
            return Backbone.Model.prototype.fetch.call(this, this._requestOptions(options));
        }
    });

    extended.Collection = Backbone.Collection.extend({
        initialize: function () {
            this.schema = this.schema || null;
            this.on("error", function (collection, response, options) {
                defaultErrorHandler(collection, response, options);
            });
        },

        _requestOptions: function (options) {
            var that = this;

            options = options ? _.clone(options) : {};
            options.data = options.data || {};
            if (options.data.metadata == null && this.schema == null) {
                options.data.metadata = "true";
            }
            var success = options.success;
            options.success = function (collection, resp) {
                if (_.isObject(resp.schema)) {
                    setSchema(that, resp.schema);
                }
                if (success) {
                    success(collection, resp);
                }
            };
            options.cache = false;
            return options;
        },

        fetch: function (options) {
            return Backbone.Collection.prototype.fetch.call(this, this._requestOptions(options));
        }
    });

    extended.BaseClass = function (options) {
        this.options = options || {};
        this.initialize.apply(this, arguments);
    };
    _.extend(extended.BaseClass.prototype, Backbone.Events, {
        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function () {
        }
    });
    extended.BaseClass.extend = Backbone.Router.extend;

    extended.Presenter = extended.BaseClass.extend({
        navigateToFragment: function (fragment, options) {
            if (Backbone.history.getFragment(fragment) === Backbone.history.getFragment()) {
                Backbone.history.fragment = null;
            }
            Backbone.history.navigate(fragment, options);
        },

        reload: function () {
            this.navigateToFragment(Backbone.history.getFragment(), {
                trigger: true
            });
        }
    });

    return extended;
});