define([
    "jquery", "underscore",  "../../tests/formEngine/formTestHelper"
], function ($, _, FormTestHelper) {
    "use strict";

    module("Groupset layout widget view test");

    test("create a groupset widget.", function () {
        expect(3);
        var groupsetWidget = FormTestHelper.getGroupBoxSetWidget(1);
        equal(groupsetWidget.options.dataKey, "dataKey_1", "Groupset widget has been created");
        var startTimer = FormTestHelper.startTimer();
        groupsetWidget.render ($("<div>"));
        var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.GROUPBOXSET_RENDER_PERFORMANCE);
        equal (timer.performance, true, FormTestHelper.getGoodPerformance("groupSet"));
        equal(groupsetWidget.$(".row-fluid")[0].id, groupsetWidget.options.controlId,
            "Text widget view verified, " + timer.diff + " Milliseconds");
    });
});