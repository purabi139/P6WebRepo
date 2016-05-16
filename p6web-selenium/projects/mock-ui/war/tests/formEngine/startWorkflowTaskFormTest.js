define([
    "jquery", "underscore", "../../tests/formEngine/formTestHelper" , "formEngine/demoPresenter", "formEngine/formEngineEnum"
], function ($, _, FormTestHelper, DemoPresenter, Enum) {
    "use strict";
    module("Instantiate workflow form Test");

    test("Start workflow and navigate to task assignment.", function () {
        expect(2);
        var presenter = new DemoPresenter();
        equal(presenter._demoView.$(".createProject").length, 1, "Demo page is got create Project button");
        presenter._setAssignmentId(FormTestHelper.getWorkflowInstanceModel());
        equal(_.formatString(Enum.FORM_TASK_ASSIGNMENT_URL, presenter._firstAssignmentId),
            "#form/wfTaskAssignment/6", "Demo page is navigating to " + presenter._getAssignmentURL());
    });
});