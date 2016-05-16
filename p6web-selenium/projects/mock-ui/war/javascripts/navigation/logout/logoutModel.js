define([
    "underscore", "backbone", "pgbu-backbone", "event-bus"
], function (_, Backbone, PgbuBackbone, EventBus) {
    "use strict";

    var logout = PgbuBackbone.Model.extend({
        initialize : function () {
        },

        url : function () {
            return "rest/logout";
        },

        parse : function (rsp) {
            return {};
        }
    });
    return logout;
});