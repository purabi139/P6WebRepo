/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/accessibilityclient.aspx"/>
/// <reference path="../utils/misc.js"/>
/// <reference path="../workflow/task.js"/>

define([
    "underscore",
    "workflows/diagram/step",
    "workflows/workflowEnums"
], function (_, Step, WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.TaskStep = function (options) // {eventBus, ptrToStepData, creationInfo}, where creationInfo -- optional
    {
        ProSight.WebControls.Workflows.TaskStep.initializeBase(this, [options]);
    }

    ProSight.WebControls.Workflows.TaskStep.prototype =
    {
        InitializeStepSpecificProperties: function () {
            // PROTECTED, OVERRIDE

            this._step.Tasks = [];
        },

        // Task-related APIs
        _get_Tasks: function () {
            //PRIVATE

            return this._step.Tasks;
        },

        AddTask: function (taskData) {
            Array.add(this._get_Tasks(), taskData);
            return this.GetTask(this.GetNumberOfTasks() - 1);
        },

        MoveDown: function (taskIndex) {
            if (taskIndex < (this.GetNumberOfTasks() - 1)) {
                SwapArrayElements(this._get_Tasks(), taskIndex, (taskIndex + 1));
            }
        },

        MoveUp: function (taskIndex) {
            if (taskIndex > 0) {
                SwapArrayElements(this._get_Tasks(), taskIndex, (taskIndex - 1));
            }
        },

        MoveToBottom: function (taskIndex) {
            var taskData = null;

            if (taskIndex < (this.GetNumberOfTasks() - 1)) {
                taskData = this._get_Tasks().splice(taskIndex, 1)[0];
                Array.add(this._get_Tasks(), taskData);
                taskData = null;
            }
        },

        MoveToTop: function (taskIndex) {
            var taskData = null;

            if (taskIndex > 0) {
                taskData = this._get_Tasks().splice(taskIndex, 1)[0];
                Array.insert(this._get_Tasks(), 0, taskData);
                taskData = null;
            }
        },

        DeleteTask: function (taskIndex) {
            this.GetTask(taskIndex).Delete();
            Array.removeAt(this._get_Tasks(), taskIndex);
        },

        GetTask: function (taskIndex) {
            return new ProSight.WebControls.Workflows.Task(
                this.get_ID(),
                taskIndex,
                this._get_Tasks()[taskIndex]);
        },

        GetNumberOfTasks: function () {
            return this._get_Tasks().length;
        },

        UpdateTask: function (taskIndex, taskData) {
            if (taskIndex >= 0 && taskIndex < this.GetNumberOfTasks()) {
                this._get_Tasks()[taskIndex] = taskData;
            }
        },
        // End of Task-related APIs

        /// #region Rendering APIs
        GetStepNameCSSClass: function () {
            // PROTECTED, OVERRIDE

            return "taskStepName";
        },

        GetStepShape: function () {
            // PROTECTED, OVERRIDE

            return _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "taskStep.png");
        },

        GetSelectedStepShape: function () {
            // PROTECTED, OVERRIDE

            return _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "taskStep-Selected.png");
        },

        SetStepSpecificVisualization: function (stepElement) {
            // PROTECTED, OVERRIDE

            var i = 0;
            var taskIconElement = null;
            var taskIconElementAttributes = null;
            var numberOfIconsToDisplay = 0;
            var taskIconLefts = [
                [],
                [39],
                [25, 54],
                [10, 39, 68],
                [5, 34, 63, 92]
            ];

            // There are only WorkflowEnums.TaskStep.MAX_TASK_RELATED_ICONS icon places in a Task step.
            numberOfIconsToDisplay = Math.min(this.GetNumberOfTasks(), WorkflowEnums.TaskStep.MAX_TASK_RELATED_ICONS);
            // numberOfIconsToDisplay can only have a value between 0 to WorkflowEnums.TaskStep.MAX_TASK_RELATED_ICONS, inclusive.
            for (i = 0; i < numberOfIconsToDisplay; i++) {
                // Fill only the first (WorkflowEnums.TaskStep.MAX_TASK_RELATED_ICONS - 1) icon places with task icons, if any.
                if (i < (WorkflowEnums.TaskStep.MAX_TASK_RELATED_ICONS - 1)) {
                    taskIconElementAttributes = {
                        id: _.formatString(WorkflowEnums.TaskStep.TASK_ICON_ID, this.get_ID(), i),
                        "class": "taskStepTasksIcon",
                        src: this._GetTaskIcon(i),
                        alt: this.GetTask(i).get_Name()
                    };
                }
                    // If we are to display the WorkflowEnums.TaskStep.MAX_TASK_RELATED_ICONS's icon -- it would be the ellipsis icon.
                else {
                    taskIconElementAttributes = {
                        id: _.formatString(WorkflowEnums.TaskStep.TASK_ELLIPSIS_ID, this.get_ID()),
                        "class": "taskStepEllipsisIcon",
                        src: _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "icons/ellipsis.png"),
                        alt: ""
                    };
                }
                taskIconElement = $("<img>", taskIconElementAttributes).css({
                    left: taskIconLefts[numberOfIconsToDisplay][i]
                }).appendTo(stepElement);

                taskIconElement = null;
                taskIconElementAttributes = null;
            }
        },

        get_IncomingConnectionPoints: function () {
            // PROTECTED, OVERRIDE

            return [[
                 0.125, 0, 0, -1 // Top 1
            ], [
                 0.375, 0, 0, -1 // Top 2
            ], [
                 0.625, 0, 0, -1 // Top 3
            ], [
                 0.875, 0, 0, -1 // Top 4
            ], [
                 1, 0.25, 1, 0 // Right 1
            ], [
                 1, 0.50, 1, 0 // Right 2
            ], [
                 1, 0.75, 1, 0 // Right 3
            ], [
                 0.125, 1, 0, 1 // Bottom 1
            ], [
                 0.375, 1, 0, 1 // Bottom 2
            ], [
                 0.625, 1, 0, 1 // Bottom 3
            ], [
                 0.875, 1, 0, 1 // Bottom 4
            ], [
                 0, 0.25, -1, 0 // Left 1
            ], [
                 0, 0.50, -1, 0 // Left 2
            ], [
                 0, 0.75, -1, 0 // Left 3
            ]];
        },

        get_Dimensions: function () {
            // PROTECTED, OVERRIDE

            return {
                Height: WorkflowEnums.TaskStep.HEIGHT,
                Width: WorkflowEnums.TaskStep.WIDTH
            };
        },

        _GetTaskIcon: function (taskIndex) {
            // PRIVATE

            var regularTaskIconTemplate = WorkflowEnums.TaskStep.REGULAR_TASK_ICON_TEMPLATE;
            var iterativeTaskIconTemplate = WorkflowEnums.TaskStep.ITERATIVE_TASK_ICON_TEMPLATE;
            var taskIcon = "";
            var currentTask = null;

            currentTask = this.GetTask(taskIndex);
            switch (currentTask.get_Type()) {
                case WorkflowEnums.GUITaskType.CHOICE:
                    break;
                case WorkflowEnums.GUITaskType.DOCUMENT:
                    taskIcon = "documentTask";
                    break;
                case WorkflowEnums.GUITaskType.EMBEDDED:
                    taskIcon = "embeddedWFTask";
                    break;
                case WorkflowEnums.GUITaskType.INSTRUCTIONS:
                    taskIcon = "instructionsTask";
                    break;
                case WorkflowEnums.GUITaskType.MODULE:
                    switch (currentTask.get_Link().Type) {
                        case WorkflowEnums.LinkType.SCORECARD:
                            taskIcon = "moduleScorecardTask";
                            break;
                        case WorkflowEnums.LinkType.FORM:
                            taskIcon = "moduleFormTask";
                            break;
                        case WorkflowEnums.LinkType.ALIGNMENT:
                            taskIcon = "moduleMapTask";
                            break;
                        case WorkflowEnums.LinkType.DASHBOARD:
                            taskIcon = "moduleDashboardTask";
                            break;
                        case WorkflowEnums.LinkType.WORKBOOK:
                            taskIcon = "moduleWorkbookTask";
                            break;
                        case WorkflowEnums.LinkType.TEXT:
                            taskIcon = "module";
                            break;
                        default:
                            break;
                    }
                    break;
                case WorkflowEnums.GUITaskType.UPDATE_FIELD:
                    taskIcon = "updateFieldTask";
                    break;
                case WorkflowEnums.GUITaskType.WEB:
                    taskIcon = "webTask";
                    break;
                default:
                    break;
            }
            if (taskIcon !== "") {
                if (currentTask.get_IsIterativeTask()) {
                    taskIcon = _.formatString(iterativeTaskIconTemplate, taskIcon);
                }
                else {
                    taskIcon = _.formatString(regularTaskIconTemplate, taskIcon);
                }
            }

            return taskIcon;
        },
        /// #endregion Rendering APIs

        dispose: function () {
            ProSight.WebControls.Workflows.TaskStep.callBaseMethod(this, "dispose");
        }
    }

    ProSight.WebControls.Workflows.TaskStep.registerClass(
        "ProSight.WebControls.Workflows.TaskStep",
        ProSight.WebControls.Workflows.Step);

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.TaskStep;
});