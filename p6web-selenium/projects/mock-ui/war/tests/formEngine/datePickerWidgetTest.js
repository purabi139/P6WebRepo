define([
    "jquery", "underscore", "../../tests/formEngine/formTestHelper"
], function ($, _, FormTestHelper) {
    "use strict";

    module("Date widget view test");

    test("create a date widget.", function () {
        expect(4);
        var datePickerWidget1 = FormTestHelper.getDatePicker(1);
        equal(datePickerWidget1.options.dataKey, "dataKey_1", "date area widget has been created - id verified");
        var startTimer = FormTestHelper.startTimer();
        datePickerWidget1.render($("<div>"));
        datePickerWidget1.postRender();
        var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.DATEPICKER_RENDER_PERFORMANCE);
        equal(timer.performance, true, FormTestHelper.getGoodPerformance("Date Picker"));
        equal(datePickerWidget1.$("input").length, 1,
            "Date Picker widget view verified, " + timer.diff + " Milliseconds");
        datePickerWidget1.setData("01-02-2012 01:02:00");  // TODO fix results after fix date formats MM:mm DD:dd (Microsoft ajax Vs oui.DateFormatter)
        equal(datePickerWidget1.$("input").val(), "02/02/2012", "Date Picker widget data verified");
    });
});