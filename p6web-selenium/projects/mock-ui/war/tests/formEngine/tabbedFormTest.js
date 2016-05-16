define([
    "jquery", "underscore", "../../tests/formEngine/formTestHelper"
], function ($, _, FormTestHelper) {
    "use strict";
    return {
        runTests : function () {
            module("Tabbed Form Test");

            test("create a Tabset and 3 Tabs widget.", function () {
                expect(3);
                var tabSet = FormTestHelper.getTabSet(3);
                equal(tabSet.children.length, 3, "tabSet widget with 3 tabs has been created");
                var startTimer = FormTestHelper.startTimer();
                tabSet.render($("<div>"));
                var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.TABSET_RENDER_PERFORMANCE);
                equal(timer.performance, true, FormTestHelper.getGoodPerformance("TabSet"));
                equal(tabSet.$("li").length, 3, "Text widget view verified, " + timer.diff + " Milliseconds");
            });

            asyncTest("TabSet with 3 tabs, groupset, groupBoxUpdate & text widget. verify structure & that the data is indeed updated",
                function () {
                    expect(3);
                    var tabSet = FormTestHelper.getTabSet(3);
                    var groupsetWidget = FormTestHelper.getGroupBoxSetWidget(1);
                    var groupWidget1 = FormTestHelper.getGroupBoxWidget(1);
                    var textWidget1 = FormTestHelper.getTextWidget(1);
                    groupWidget1.addChild(textWidget1);
                    groupsetWidget.addChild(groupWidget1);
                    tabSet.children[0].addChild(groupsetWidget);
                    var startTimer = FormTestHelper.startTimer();
                    tabSet.render($("<div>"));
                    var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.TABS_RENDER_PERFORMANCE);
                    equal(timer.performance, true,
                        FormTestHelper.getGoodPerformance("3 tab's tabSet with text widget " + timer.diff + " Milliseconds"));

                    FormTestHelper.getDataModel(function () {
                        ok(true, "Data model could retrieve data.");
                        textWidget1._initialDataModelUpdate({ initModel : this.model });
                        equal(tabSet.$(".tab-content .bordered-fieldset .control-group input").get(0).value,
                            "data key1 value",
                            "text widget 1: update data verified");
                        start();
                    });
                });

            test("TabSet with nested widgets removal", function () {
                expect(8);
                var tabSet = FormTestHelper.getTabSet(3);
                var groupsetWidget = FormTestHelper.getGroupBoxSetWidget(1);
                var groupWidget1 = FormTestHelper.getGroupBoxWidget(1);
                var textWidget1 = FormTestHelper.getTextWidget(1);
                groupWidget1.addChild(textWidget1);
                groupsetWidget.addChild(groupWidget1);
                tabSet.children[0].addChild(groupsetWidget);
                tabSet.render($("<div>"));
                var startTimer = FormTestHelper.startTimer();
                tabSet.remove();
                var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.TABS_REMOVAL_PERFORMANCE);
                equal(timer.performance, true,
                    FormTestHelper.getGoodPerformance("2 tab's tabSet with text widget removal"));

                equal(textWidget1.$el.html(), "", "Form view with tabs text has been removed");
                equal(groupWidget1.$el.html(), "", "Form view with tabs group has been removed");
                equal(groupsetWidget.$el.html(), "", "Form view with tabs groupSet has been removed");
                equal(groupWidget1.$el.html(), "", "Form view with tabs groupWidget1 has been removed");
                equal(tabSet.children[0].$el.html(), "", "Tab1 has been removed");
                equal(tabSet.children[1].$el.html(), "", "Tab2 has been removed");
                equal(tabSet.$(".pgbu-page-container").length, 0,
                    "Form view with tabs tabSet has been removed " + timer.diff + " Milliseconds");
            });
        }
    };
});