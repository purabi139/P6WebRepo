define([
    "jquery", "underscore", "../../tests/formEngine/formTestHelper"
], function ($, _, FormTestHelper) {
    "use strict";

    module("Prompt widget view test");

    test("create a text widget.", function () {
        expect(3);
        var promptWidget1 = FormTestHelper.getPromptWidget(1);
        equal(promptWidget1.options.customLabel, "customLabel_1", "Prompt widget has been created - label verified");
        var startTimer = FormTestHelper.startTimer();
        promptWidget1.render($("<div>"));
        var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.PROMPT_RENDER_PERFORMANCE);
        equal(timer.performance, true, FormTestHelper.getGoodPerformance("Prompt"));
        equal(promptWidget1.$("span").text(), "customLabel_1 ",
            "Prompt widget view verified, " + timer.diff + " Milliseconds");
    });
});