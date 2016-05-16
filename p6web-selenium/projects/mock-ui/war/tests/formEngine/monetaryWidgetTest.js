define([
    "jquery", "underscore", "formEngine/formView", "../../tests/formEngine/formTestHelper"
], function ($, _, FormView, FormTestHelper) {
    "use strict";

    module("Monetary widget view test");

    test("create a monetary widget.", function () {
        expect(4);
        var monetaryWidget1 = FormTestHelper.getMonetaryWidget(1);
        equal(monetaryWidget1.options.dataKey, "dataKey_1", "monetary widget has been created");
        var startTimer = FormTestHelper.startTimer();
        monetaryWidget1.render($("<div>"));
        var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.MONETARY_RENDER_PERFORMANCE);
        equal(timer.performance, true, FormTestHelper.getGoodPerformance("Monetary"));
        equal(monetaryWidget1.$("input")[0].id, monetaryWidget1.options.controlId,
            "Text widget view verified, " + timer.diff + " Milliseconds");
        equal(monetaryWidget1.$("input").attr("type"), "number", "Number input verified");
    });
});