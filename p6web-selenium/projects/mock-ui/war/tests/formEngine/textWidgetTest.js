define([
    "jquery", "underscore", "../../tests/formEngine/formTestHelper"
], function ($, _, FormTestHelper) {
    "use strict";

    module("Text widget view test");

    test("create a text widget.", function () {
        expect(3);
        var textWidget1 = FormTestHelper.getTextWidget(1);
        equal(textWidget1.options.dataKey, "dataKey_1", "Text widget has been created");
        var startTimer = FormTestHelper.startTimer();
        textWidget1.render($("<div>"));
        var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.TEXT_RENDER_PERFORMANCE);
        equal(timer.performance, true, FormTestHelper.getGoodPerformance("Text widget"));
        equal(textWidget1.$("input")[0].id, textWidget1.options.controlId,
            "Text widget view verified, " + timer.diff + " Milliseconds");
    });
});