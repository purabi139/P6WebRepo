define([
    "underscore",
    "pgbu-backbone",
    "workflows/editor/editorModel",
    "workflows/editor/editorView",
    "workflows/editor/editorPresenter",
    "workflows/editor/toolbarView",
    "workflows/editor/taskDialog",
    "workflow-diagram", "workflows/workflowEnums"
], function (_, PgbuBackbone, EditorModel, EditorView, EditorPresenter, ToolbarView, TaskDialog, WorkflowDiagram, WorkflowEnums) {
    "use strict";

    var WORKFLOW_ID = 0;

    var editorView = new EditorView();

    var retrieveWorkflowData = function (id, successCallback) {
        var object = {};

        (new EditorModel.ExistingWorkflow({
            ID: id
        })).fetch({
            success: function (model) {
                object._workflow = model.toJSON();
                (_.bind(successCallback, object))();
            },
            error: function () {
                ok(false, "EditorModel could not retrieve data.");
                start();
            }
        });
    };
    var initializeWorkflow = function (workflowData) {
        var myDiagram = null;

        myDiagram = new WorkflowDiagram();
        myDiagram.Initialize({
            workflow: workflowData._workflow,
            eventBus: editorView
        });

        return myDiagram;
    };

    var initializeEditorToolbar = function () {
        var toolbarView = new ToolbarView({
            eventBus: editorView,
            dataModel: {}
        });

        toolbarView.render(editorView.$(".toolbar"));

        return toolbarView;
    };

    var initializeTaskDialog = function (dataModel) {
        var taskDialog = new TaskDialog({
            eventBus: editorView,
            dataModel: dataModel
        });

        return taskDialog;
    };

    return {
        runTests: function () {
            module("Workflow Editor");

            test("Workflow Editor modules exist.", 7, function () {
                ok(_ != null, "Underscore should not be null.");
                notEqual(PgbuBackbone, null, "PgbuBackbone should not be null.");
                notEqual(EditorModel, null, "EditorModel should not be null.");
                notEqual(EditorView, null, "EditorView should not be null.");
                notEqual(EditorPresenter, null, "EditorPresenter should not be null.");
                notEqual(WorkflowDiagram, null, "WorkflowDiagram should not be null.");
                notEqual(WorkflowEnums, null, "WorkflowEnums should not be null.");
            });

            asyncTest("EditorModel can retrieve data of workflow ID = WORKFLOW_ID.", 2, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    ok(true, "EditorModel could retrieve data.");
                    notEqual(this._workflow, null, "Got workflow data.");

                    start();
                });
            });

            asyncTest("Can intialize an instance of workflow diagram.", 1, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    var myDiagram = initializeWorkflow(this);

                    notEqual(myDiagram, null, "Dynamic variable to host an instance of workflow diagram was created.");

                    start();
                });
            });

            asyncTest("Can obtain a step (ID = 1, Type = WorkflowEnums.Workflow.StepType.INITIAL).", 2, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    var step = null;
                    var myDiagram = initializeWorkflow(this);

                    step = myDiagram.GetStep(1);
                    equal(step.get_ID(), 1, "Step ID is 1.");
                    equal(step.get_Type(), WorkflowEnums.Workflow.StepType.INITIAL, "Step Type is WorkflowEnums.Workflow.StepType.INITIAL.");

                    start();
                });
            });

            asyncTest("Saving unaltered workflow -- has the same data as fetched from the database.", 1, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    var view = new EditorView();

                    view.setData({
                        workflow: this._workflow
                    });
                    deepEqual(view.getData(), this._workflow, "Unaltered workflow can send to the server the same data as fetched from the database.");

                    start();
                });
            });

            asyncTest("Can get name property of a Workflow/Step/Task/Track.", 4, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    var step = null;
                    var task = null;
                    var track = null;
                    var myDiagram = initializeWorkflow(this);

                    equal(myDiagram.get_Name(), "Workflow 1", _.formatString("Workflow has name \"%0\".", "Workflow 1"));

                    step = myDiagram.GetStep(13);
                    equal(step.get_Name(), "Decision 1", _.formatString("Step (ID = 13) has name \"%0\".", "Decision 1"));

                    task = myDiagram.GetStep(4).GetTask(0);
                    equal(task.get_Name(), "Task 1", _.formatString("First task (index = 0) of step (ID = 4) has name \"%0\".", "Task 1"));

                    track = myDiagram.GetStep(25).GetTrack(0);
                    equal(track.get_Name(), "Track 1", _.formatString("First track (index = 0) of step (ID = 25) has name \"%0\".", "Track 1"));

                    start();
                });
            });

            asyncTest("Can set name property of a Workflow/Step/Task/Track.", 4, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    var step = null;
                    var task = null;
                    var track = null;
                    var myDiagram = initializeWorkflow(this);
                    var oldName = "";
                    var newName = "";

                    oldName = myDiagram.get_Name();
                    newName = _.formatString("New %0", oldName);
                    myDiagram.set_Name(newName);
                    equal(myDiagram.get_Name(), newName, _.formatString("Workflow had name \"%0\", now has name \"%1\".", oldName, newName));

                    step = myDiagram.GetStep(13);
                    oldName = step.get_Name();
                    newName = _.formatString("New %0", oldName);
                    step.set_Name(newName);
                    equal(step.get_Name(), newName, _.formatString("Step (ID = 13) had name \"%0\", now has name \"%1\".", oldName, newName));

                    task = myDiagram.GetStep(4).GetTask(0);
                    oldName = task.get_Name();
                    newName = _.formatString("New %0", oldName);
                    task.set_Name(newName);
                    equal(task.get_Name(), newName, _.formatString("First task (index = 0) of step (ID = 4) had name \"%0\", now has name \"%1\".", oldName, newName));

                    track = myDiagram.GetStep(25).GetTrack(0);
                    oldName = track.get_Name();
                    newName = _.formatString("New %0", oldName);
                    track.set_Name(newName);
                    equal(track.get_Name(), newName, _.formatString("First track (index = 0) of step (ID = 25) had name \"%0\", now has name \"%1\".", oldName, newName));

                    start();
                });
            });

            asyncTest("toolbar creation - buttons check.", 10, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    var toolbar = initializeEditorToolbar();

                    notEqual(toolbar.$(".taskStep")[0], null, "taskStep Button exist");
                    equal(toolbar.$(".taskStep")[0].title, "Add a task step", "taskStep Button: title is " + "Add a task step");//locale.label.workflows.add_task_step_button_tooltip);

                    notEqual(toolbar.$(".manualDecisionStep")[0], null, "manualDecisionStep Button exist");
                    equal(toolbar.$(".manualDecisionStep")[0].title, "Add a manual decision step", "manualDecisionStep Button: title is " + "Add a manual decision step");//locale.label.workflows.add_manual_decision_step_button_tooltip);

                    notEqual(toolbar.$(".categoryBasedDecisionStep")[0], null, "categoryBasedDecisionStep Button exist");
                    equal(toolbar.$(".categoryBasedDecisionStep")[0].title, "Add a category based decision step", "categoryBasedDecisionStep Button: title is " + "Add a category based decision step");//locale.label.workflows.add_category_based_decision_step_button_tooltip);

                    notEqual(toolbar.$(".parallelStep")[0], null, "taskStep Button exist");
                    equal(toolbar.$(".parallelStep")[0].title, "Add a parallel step", "parallelStep Button: title is " + "Add a parallel step");//locale.label.workflows.add_parallel_step_button_tooltip);

                    notEqual(toolbar.$(".delete")[0], null, "delete Button exist");
                    equal(toolbar.$(".delete")[0].title, "Delete a selected object", "delete Button: title is " + "Delete a selected object");//locale.label.workflows.delete_button_tooltip);

                    start();
                });
            });

            asyncTest("toolbar state testing: STEP_CLICKED Event", 30, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    var toolbar = initializeEditorToolbar();
                    var event = {};

                    // events - delete button is disabled
                    editorView.trigger(WorkflowEnums.Events.STEP_CLICKED, event, { StepType: WorkflowEnums.Workflow.StepType.FINAL });
                    equal(toolbar.$(".taskStep").hasClass("disabled"), false, "Event: FINAL-step selected. taskStep Button: enabled");
                    equal(toolbar.$(".manualDecisionStep").hasClass("disabled"), false, "Event: FINAL-step selected. manualDecisionStep Button: enabled");
                    equal(toolbar.$(".categoryBasedDecisionStep").hasClass("disabled"), false, "Event: FINAL-step selected. categoryBasedDecisionStep Button: enabled");
                    equal(toolbar.$(".parallelStep").hasClass("disabled"), false, "Event: FINAL-step selected. parallelStep Button: enabled");
                    equal(toolbar.$(".delete").hasClass("disabled"), true, "Event: FINAL-step selected. DELETE Button: disabled");

                    editorView.trigger(WorkflowEnums.Events.STEP_CLICKED, event, { StepType: WorkflowEnums.Workflow.StepType.INITIAL });
                    equal(toolbar.$(".taskStep").hasClass("disabled"), false, "Event: INITIAL-step selected. taskStep Button: enabled");
                    equal(toolbar.$(".manualDecisionStep").hasClass("disabled"), false, "Event: INITIAL-step selected. manualDecisionStep Button: enabled");
                    equal(toolbar.$(".categoryBasedDecisionStep").hasClass("disabled"), false, "Event: INITIAL-step selected. categoryBasedDecisionStep Button: enabled");
                    equal(toolbar.$(".parallelStep").hasClass("disabled"), false, "Event: INITIAL-step selected. parallelStep Button: enabled");
                    equal(toolbar.$(".delete").hasClass("disabled"), true, "Event: INITIAL-step selected. DELETE Button: disabled");

                    // events - delete button is enabled
                    editorView.trigger(WorkflowEnums.Events.STEP_CLICKED, event, { StepType: WorkflowEnums.Workflow.StepType.TASKS });
                    equal(toolbar.$(".taskStep").hasClass("disabled"), false, "Event: TASKS-step selected. taskStep Button: enabled");
                    equal(toolbar.$(".manualDecisionStep").hasClass("disabled"), false, "Event: TASKS-step selected. manualDecisionStep Button: enabled");
                    equal(toolbar.$(".categoryBasedDecisionStep").hasClass("disabled"), false, "Event: TASKS-step selected. categoryBasedDecisionStep Button: enabled");
                    equal(toolbar.$(".parallelStep").hasClass("disabled"), false, "Event: TASKS-step selected. parallelStep Button: enabled");
                    equal(toolbar.$(".delete").hasClass("disabled"), false, "Event: TASKS-step selected. DELETE Button: enabled");

                    editorView.trigger(WorkflowEnums.Events.STEP_CLICKED, event, { StepType: WorkflowEnums.Workflow.StepType.MANUAL_CONDITION });
                    equal(toolbar.$(".taskStep").hasClass("disabled"), false, "Event: MANUAL_CONDITION-step selected. taskStep Button: enabled");
                    equal(toolbar.$(".manualDecisionStep").hasClass("disabled"), false, "Event: MANUAL_CONDITION-step selected. manualDecisionStep Button: enabled");
                    equal(toolbar.$(".categoryBasedDecisionStep").hasClass("disabled"), false, "Event: MANUAL_CONDITION-step selected. categoryBasedDecisionStep Button: enabled");
                    equal(toolbar.$(".parallelStep").hasClass("disabled"), false, "Event: MANUAL_CONDITION-step selected. parallelStep Button: enabled");
                    equal(toolbar.$(".delete").hasClass("disabled"), false, "Event: MANUAL_CONDITION-step selected. DELETE Button: enabled");

                    editorView.trigger(WorkflowEnums.Events.STEP_CLICKED, event, { StepType: WorkflowEnums.Workflow.StepType.AUTOMATIC_CONDITION });
                    equal(toolbar.$(".taskStep").hasClass("disabled"), false, "Event: AUTOMATIC_CONDITION-step selected. taskStep Button: enabled");
                    equal(toolbar.$(".manualDecisionStep").hasClass("disabled"), false, "Event: AUTOMATIC_CONDITION-step selected. manualDecisionStep Button: enabled");
                    equal(toolbar.$(".categoryBasedDecisionStep").hasClass("disabled"), false, "Event: AUTOMATIC_CONDITION-step selected. categoryBasedDecisionStep Button: enabled");
                    equal(toolbar.$(".parallelStep").hasClass("disabled"), false, "Event: AUTOMATIC_CONDITION-step selected. parallelStep Button: enabled");
                    equal(toolbar.$(".delete").hasClass("disabled"), false, "Event: AUTOMATIC_CONDITION-step selected. DELETE Button: enabled");

                    editorView.trigger(WorkflowEnums.Events.STEP_CLICKED, event, { StepType: WorkflowEnums.Workflow.StepType.PARALLEL });
                    equal(toolbar.$(".taskStep").hasClass("disabled"), false, "Event: PARALLEL-step selected. taskStep Button: enabled");
                    equal(toolbar.$(".manualDecisionStep").hasClass("disabled"), false, "Event: PARALLEL-step selected. manualDecisionStep Button: enabled");
                    equal(toolbar.$(".categoryBasedDecisionStep").hasClass("disabled"), false, "Event: PARALLEL-step selected. categoryBasedDecisionStep Button: enabled");
                    equal(toolbar.$(".parallelStep").hasClass("disabled"), false, "Event: PARALLEL-step selected. parallelStep Button: enabled");
                    equal(toolbar.$(".delete").hasClass("disabled"), false, "Event: PARALLEL-step selected. DELETE Button: enabled");

                    start();
                });
            });

            asyncTest("toolbar state testing: CANVAS_CLICKED Event", 5, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    var toolbar = initializeEditorToolbar();

                    // events - delete button is disabled
                    editorView.trigger(WorkflowEnums.Events.CANVAS_CLICKED);
                    equal(toolbar.$(".taskStep").hasClass("disabled"), false, "Event: CANVAS_CLICKED. taskStep Button: enabled");
                    equal(toolbar.$(".manualDecisionStep").hasClass("disabled"), false, "Event: CANVAS_CLICKED. manualDecisionStep Button: enabled");
                    equal(toolbar.$(".categoryBasedDecisionStep").hasClass("disabled"), false, "Event: CANVAS_CLICKED. categoryBasedDecisionStep Button: enabled");
                    equal(toolbar.$(".parallelStep").hasClass("disabled"), false, "Event: CANVAS_CLICKED. parallelStep Button: enabled");
                    equal(toolbar.$(".delete").hasClass("disabled"), true, "Event: CANVAS_CLICKED. DELETE Button: disabled");

                    start();
                });
            });

            asyncTest("toolbar state testing: TRANSITION_OPTION_CLICKED Event", 5, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    var toolbar = initializeEditorToolbar();

                    // events - delete button is disabled
                    editorView.trigger(WorkflowEnums.Events.TRANSITION_OPTION_CLICKED);
                    equal(toolbar.$(".taskStep").hasClass("disabled"), false, "Event: TRANSITION_OPTION_CLICKED. taskStep Button: enabled");
                    equal(toolbar.$(".manualDecisionStep").hasClass("disabled"), false, "Event: TRANSITION_OPTION_CLICKED. manualDecisionStep Button: enabled");
                    equal(toolbar.$(".categoryBasedDecisionStep").hasClass("disabled"), false, "Event: CANVAS_CLICKED. categoryBasedDecisionStep Button: enabled");
                    equal(toolbar.$(".parallelStep").hasClass("disabled"), false, "Event: TRANSITION_OPTION_CLICKED. parallelStep Button: enabled");
                    equal(toolbar.$(".delete").hasClass("disabled"), false, "Event: TRANSITION_OPTION_CLICKED. DELETE Button: enabled");

                    start();
                });
            });

            asyncTest("toolbar state testing: TRACK_LINE_SEGMENT_CLICKED Event", 5, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    var toolbar = initializeEditorToolbar();

                    // events - delete button is disabled
                    editorView.trigger(WorkflowEnums.Events.TRACK_LINE_SEGMENT_CLICKED);
                    equal(toolbar.$(".taskStep").hasClass("disabled"), false, "Event: TRACK_LINE_SEGMENT_CLICKED. taskStep Button: enabled");
                    equal(toolbar.$(".manualDecisionStep").hasClass("disabled"), true, "Event: TRACK_LINE_SEGMENT_CLICKED. manualDecisionStep Button: enabled");
                    equal(toolbar.$(".categoryBasedDecisionStep").hasClass("disabled"), true, "Event: TRACK_LINE_SEGMENT_CLICKED. categoryBasedDecisionStep Button: enabled");
                    equal(toolbar.$(".parallelStep").hasClass("disabled"), true, "Event: TRACK_LINE_SEGMENT_CLICKED. parallelStep Button: enabled");
                    equal(toolbar.$(".delete").hasClass("disabled"), true, "Event: TRACK_LINE_SEGMENT_CLICKED. DELETE Button: enabled");

                    start();
                });
            });

            asyncTest("toolbar state testing: TRANSITION_INDICATOR_SELECTED Event", 5, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    var toolbar = initializeEditorToolbar();

                    // events - delete button is disabled
                    editorView.trigger(WorkflowEnums.Events.TRANSITION_INDICATOR_CLICKED);
                    equal(toolbar.$(".taskStep").hasClass("disabled"), false, "Event: TRANSITION_INDICATOR_CLICKED. taskStep Button: enabled");
                    equal(toolbar.$(".manualDecisionStep").hasClass("disabled"), false, "Event: TRANSITION_INDICATOR_CLICKED. manualDecisionStep Button: enabled");
                    equal(toolbar.$(".categoryBasedDecisionStep").hasClass("disabled"), false, "Event: TRANSITION_INDICATOR_CLICKED. categoryBasedDecisionStep Button: enabled");
                    equal(toolbar.$(".parallelStep").hasClass("disabled"), false, "Event: TRANSITION_INDICATOR_CLICKED. parallelStep Button: enabled");
                    equal(toolbar.$(".delete").hasClass("disabled"), true, "Event: TRANSITION_INDICATOR_CLICKED. DELETE Button: enabled");

                    start();
                });
            });

            asyncTest("Task Dialog testing: ", 2, function () {
                retrieveWorkflowData(WORKFLOW_ID, function () {
                    var myDiagram = initializeWorkflow(this);
                    var taskDialog = initializeTaskDialog(myDiagram);

                    notEqual(taskDialog, null, "Task Dialog was created.");

                    taskDialog.openTaskDialog(2, null, "form");
                    equal(taskDialog._dialogMode, "new", "Task Dialog - New-Task mode");

                    start();
                });
            });
        }
    };
});