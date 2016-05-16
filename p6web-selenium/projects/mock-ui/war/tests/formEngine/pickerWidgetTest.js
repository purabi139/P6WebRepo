define([
    "jquery", "underscore", "../../tests/formEngine/formTestHelper"
], function ($, _, FormTestHelper) {
    "use strict";

    module("picker widget view test");

    test("create a picker widget.", function () {
        expect(3);
        var pickerWidget1 = FormTestHelper.getPickerWidget(1);
        equal(pickerWidget1.options.dataKey, "parentProject", "picker widget has been created");
        var startTimer = FormTestHelper.startTimer();
        pickerWidget1.render($("<div>"));
        var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.PICKER_RENDER_PERFORMANCE);
        equal(timer.performance, true, FormTestHelper.getGoodPerformance("Picker"));
        equal(pickerWidget1.$("input").length, 1,
            "picker widget was verified, " + timer.diff + " Milliseconds");
    });
});