define([
    "jquery", "underscore", "../../tests/formEngine/formTestHelper"
], function ($, _, FormTestHelper) {
    "use strict";

    module("Text Area widget view test");

    test("create a text widget.", function () {
        expect(3);
        var textAreaWidget1 = FormTestHelper.getTextAreaWidget(1);
        equal(textAreaWidget1.options.dataKey, "dataKey_1", "Text area widget has been created");
        var startTimer = FormTestHelper.startTimer();
        textAreaWidget1.render($("<div>"));
        var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.TEXT_AREA_RENDER_PERFORMANCE);
        equal(timer.performance, true, FormTestHelper.getGoodPerformance("Text Area"));
        equal(textAreaWidget1.$("textarea")[0].id, textAreaWidget1.options.controlId,
            "Text widget view verified, " + timer.diff + " Milliseconds");
    });
});