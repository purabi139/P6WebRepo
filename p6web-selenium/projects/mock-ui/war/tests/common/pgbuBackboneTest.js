define([
    "jquery", "underscore",
    "pgbu-backbone",
    "common/pageView"
], function ($, _, PgbuBackbone, PageView) {
    "use strict";

    module("PGBU Backbone Model Extensions");

    test("Request options request metadata when none presently exist .", function () {
        var model = new PgbuBackbone.Model();
        var collection = new PgbuBackbone.Collection();

        equal(model._requestOptions().data.metadata, "true",
                "Model's metadata is true when passed default options.");
        equal(collection._requestOptions({}).data.metadata, "true",
                "Collection's metadata is true when passed default options.");

        model.schema = {};
        ok(_.isUndefined(model._requestOptions().data.metadata),
                "Collection's metadata is true when passed default options.");

        delete model.schema;
        model.collection = collection;
        collection.schema = {};
        ok(_.isUndefined(model._requestOptions().data.metadata),
                "Collection's metadata is true when passed default options.");
    });

    test("Request for metadata can be overridden.", function () {
        var model = new PgbuBackbone.Model();
        var collection = new PgbuBackbone.Collection();
        equal(model._requestOptions({ data: { metadata: "false"} }).data.metadata, "false",
                "Override to not include metadata.");

        model.schema = {};
        equal(model._requestOptions({ data: { metadata: "true"} }).data.metadata, "true",
                "Override model to include metadata.");

        collection.schema = {};
        equal(model._requestOptions({ data: { metadata: "true"} }).data.metadata, "true",
                "Override collection to include metadata.");
    });

    module("PGBU Backbone View Extensions");

    test("Views assume .page-content when no el is supplied.", function () {
        var view = new PageView();
        strictEqual(view.$el.length, $(".page-content").length, "Same number of elements are selected.");
        strictEqual(view.$el[0], $(".page-content")[0], "div elements are the same.");
    });

    test("Views attach themselves as data on their $el.", function () {
        $(".page-content").removeData();
        var view = new PageView();
        strictEqual($(".page-content").data("activeView"), view, "View is on .page-content as data");
        $(".page-content").removeData();
    });
});