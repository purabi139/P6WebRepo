define([
    "jquery", "underscore", "../../tests/formEngine/formTestHelper"
], function ($, _, FormTestHelper) {
    "use strict";

    module("Group widget view test");

    test("create a group widget.", function () {
        expect(5);
        var groupWidget1 = FormTestHelper.getGroupBoxWidget(1);
        equal(groupWidget1.options.borderClass, "bordered-fieldset", "Group widget has been created - class verified");
        var startTimer = FormTestHelper.startTimer();
        groupWidget1.render($("<div>"));
        var timer = FormTestHelper.stopTimer(startTimer,FormTestHelper.GROUPBOX_RENDER_PERFORMANCE );
        equal (timer.performance, true, FormTestHelper.getGoodPerformance("GroupBox"));
        equal(groupWidget1.$("legend[title=customLabel_1]").text(), "customLabel_1", "Group widget view legend  verified, " + timer.diff + " Milliseconds");
        ok(groupWidget1.$(".span6").length > 0, "Group widget view size verified");
        var groupWidget2 = FormTestHelper.getGroupBoxWidget(2, {"controlWidth" : 0});
        ok(groupWidget2.$("fieldset[class~=\"span\"]").length === 0, "Group widget view size class is not defined (for groups which are not surrounded by groupSet)");
    });
});