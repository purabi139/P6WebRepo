define([
    "jquery", "underscore", "../../tests/formEngine/formTestHelper"
], function ($, _, FormTestHelper) {
    "use strict";

    module("Dropdown widget view test");

    test("create a dropdown widget.", function () {
        expect(3);
        var dropdownWidge1 = FormTestHelper.getDropDownWidget(1);
        equal(dropdownWidge1.options.dataKey, "dataKey_1", "Dropdown widget has been created");
        var startTimer = FormTestHelper.startTimer();
        dropdownWidge1.render($("<div>"));
        var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.DROPDOWN_RENDER_PERFORMANCE);
        equal(timer.performance, true, FormTestHelper.getGoodPerformance("DropDown"));
        equal(dropdownWidge1.$("select").get(0).name, dropdownWidge1.options.customLabel,
            "Dropdown widget name  verified, " + timer.diff + " Milliseconds");
    });
});