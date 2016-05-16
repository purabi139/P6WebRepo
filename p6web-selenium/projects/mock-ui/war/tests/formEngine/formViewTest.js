define([
    "jquery", "underscore", "formEngine/formView", "../../tests/formEngine/formTestHelper"
], function ($, _, FormView, FormTestHelper) {
    "use strict";
    module("Form View Test");

    test("Form View Creation with nested widgets", function () {
        expect(4);
        var widgets = [];
        var tabSet = FormTestHelper.getTabSet(3);
        var groupsetWidget = FormTestHelper.getGroupBoxSetWidget(1);
        var groupWidget1 = FormTestHelper.getGroupBoxWidget(1);
        var textWidget1 = FormTestHelper.getTextWidget(1);
        groupWidget1.addChild(textWidget1);
        groupsetWidget.addChild(groupWidget1);
        tabSet.children[0].addChild(groupsetWidget);
        widgets.push(tabSet);

        var startTimer = FormTestHelper.startTimer();
        var formView = new FormView({ widgets : widgets });
        var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.FORM_RENDER_PERFORMANCE);
        equal(timer.performance, true, FormTestHelper.getGoodPerformance("Form view ") + timer.diff + " Milliseconds");
        strictEqual(formView.getWidgets().length, 1, "FormView sub views is 1");
        equal(formView.$(".formWidgets .tabbable .nav-tabs").length, 1, "Form View html tabSet");
        equal(formView.$(".formWidgets .tabbable .tab-content .bordered-fieldset .fieldset-content input").length, 1,
            "Form View html contains tab, groupBoxSet, group with border, text widget");
    });

    test("Form view remove", function () {
        expect(3);
        var widgets = [];
        var tabSet = FormTestHelper.getTabSet(3);
        var groupsetWidget = FormTestHelper.getGroupBoxSetWidget(1);
        var groupWidget1 = FormTestHelper.getGroupBoxWidget(1);
        var textWidget1 = FormTestHelper.getTextWidget(1);
        groupWidget1.addChild(textWidget1);
        groupsetWidget.addChild(groupWidget1);
        tabSet.children[0].addChild(groupsetWidget);
        widgets.push(tabSet);
        var formView = new FormView({ widgets : widgets });
        var startTimer = FormTestHelper.startTimer();
        formView.remove();
        var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.FORM_REMOVAL_PERFORMANCE);
        equal(timer.performance, true,
            FormTestHelper.getGoodPerformance("Form view removal"));
        equal(formView.$(".pgbu-page-container").length, 0,
            "Form view has been removed ," + timer.diff + " Milliseconds");
        equal(widgets[0].$el.html(), "", "Form view child has been removed");
    });
});