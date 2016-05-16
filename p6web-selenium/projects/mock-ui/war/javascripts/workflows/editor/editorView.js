define([
    "common/pageView", "i18n!nls/localeStrings", "utilities/toolbar",
    "text!workflows/editor/editorTemplate.html",
    "workflow-diagram", "workflows/workflowEnums",
    "workflows/editor/taskDialog",
    "workflows/editor/toolbarView", "workflows/editor/propertiesView"
], function (PageView, locale, Toolbar, EditorTemplate, WorkflowDiagram, WorkflowEnums, TaskDialog, ToolbarView, PropertiesView) {
    "use strict";

    var selectedStepID = -1;

    return PageView.extend({
        getContentMarkup: function () {
            //return EditorTemplate;
            var compiledTemplate = _.template(EditorTemplate);
            return compiledTemplate({
                locale: locale.label.workflows,
                enums: WorkflowEnums
            });
        },

        getData: function () {
            // Deep clone the diagram data, effectively make a snapshot.
            return JSON.parse(this._diagram.ToJSON());
        },

        initializePage: function () {
            this._diagram = new WorkflowDiagram();
            this._toolbar = new ToolbarView({ eventBus: this, dataModel: this._diagram });
            this._taskDialog = new TaskDialog({eventBus: this, dataModel: this._diagram});
            this._propertiesView = new PropertiesView({ eventBus: this, dataModel: this._diagram, taskDialog: this._taskDialog });
        },

        removePage: function () {
            this.off();
            this._diagram.ClearCanvas();
        },

        renderChildren: function () {
            this._toolbar.render(this.$(".toolbar"));
            this._propertiesView.render(this.$(".properties"));
            this._taskDialog.prepareDialog();
        },

        setData: function (data) {
            this.setHeading(data.workflow.Name, "");
            this._diagram.Initialize({
                workflow: data.workflow,
                eventBus: this
            });
            this._workflowHasInstances = this._diagram.get_HasInstances();
            this._diagram.RenderAll();
            this._propertiesView.setData();
            this._registerListeners();

            if (this.options.creatingNewWorkflow === true) {
                this.showActionBar();
            }
        },

        _registerListeners: function () {
            //#region Toolbar events
            this.on(WorkflowEnums.Events.ADD_TASK_STEP_BUTTON_CLICKED, function () {
                this._addStep(WorkflowEnums.Workflow.StepType.TASKS);
            }, this);
            this.on(WorkflowEnums.Events.ADD_MANUAL_DECISION_STEP_BUTTON_CLICKED, function () {
                this._addStep(WorkflowEnums.Workflow.StepType.MANUAL_CONDITION);
            }, this);
            this.on(WorkflowEnums.Events.ADD_AUTOMATIC_DECISION_STEP_BUTTON_CLICKED, function () {
                this._addStep(WorkflowEnums.Workflow.StepType.AUTOMATIC_CONDITION);
            }, this);
            this.on(WorkflowEnums.Events.ADD_PARALLEL_STEP_BUTTON_CLICKED, function () {
                this._addStep(WorkflowEnums.Workflow.StepType.PARALLEL);
            }, this);
            this.on(WorkflowEnums.Events.DELETE_BUTTON_CLICKED, this._deleteSelectedObject, this);
            //#endregion Toolbar events

            //#region Diagram events
            this.on(WorkflowEnums.Events.STEP_MOUSE_DOWN, function (domEvent, params) {
                this._diagram.SelectStep(params.StepID);
            }, this);
            this.on(WorkflowEnums.Events.STEP_CLICKED, function (domEvent, params) {
                this._doStepClick(params.StepID);
            }, this);
            this.on(WorkflowEnums.Events.STEP_DROPPED, function (domEvent, params) {
                this._diagram.MoveStepTo(
                    params.StepID,
                    params.Column,
                    params.Row);
                this.trigger(WorkflowEnums.Events.DATA_UPDATED);
            }, this);
            this.on(WorkflowEnums.Events.TRACK_LINE_SEGMENT_CLICKED, function (domEvent, params) {
                this._diagram.SelectParallelStepTrackLineSegment(
                    params.StepID,
                    params.TrackIndex,
                    params.SegmentIndex,
                    !this._workflowHasInstances);
            }, this);
            this.on(WorkflowEnums.Events.CANVAS_CLICKED, function (domEvent, params) {
                this._doCanvasClick();
            }, this);
            this.on(WorkflowEnums.Events.TRANSITION_INDICATOR_CLICKED, function (domEvent, params) {
                this._diagram.SelectTransitionIndicator(
                    params.StepID,
                    params.OptionIndex,
                    !this._workflowHasInstances);
            }, this);
            this.on(WorkflowEnums.Events.TRANSITION_OPTION_CLICKED, function (domEvent, params) {
                this._diagram.SelectTransitionOption(
                    params.StepID,
                    params.OptionIndex,
                    !this._workflowHasInstances);
            }, this);
            //#endregion Diagram events

            //#region Right pane events
            this.on(WorkflowEnums.Events.WORKFLOW_NAME_UPDATED, function (params) {
                this.setHeading(params.Name);
            }, this);
            this.on(WorkflowEnums.Events.STEP_NAME_UPDATED, function (params) {
                this._diagram.RenderStep(params.StepID);
            }, this);
            this.on(WorkflowEnums.Events.STEP_TASKS_UPDATED, function (params) {
                this._diagram.RenderStep(params.StepID);
            }, this);
            //#endregion Right pane events

            this.on(WorkflowEnums.Events.DATA_UPDATED, function (params) {
                this.dirty();
            }, this);
        },

        _addStep: function (stepType) {
            var stepID = null;

            stepID = this._diagram.AddStep(stepType);
            this._diagram.RenderStep(stepID);
            this._diagram.SelectStep(stepID);
            this.trigger(WorkflowEnums.Events.DATA_UPDATED);
        },

        _deleteSelectedObject: function () {
            this._diagram.DeleteSelectedObject();
            this.trigger(WorkflowEnums.Events.DATA_UPDATED);
        },

        _doStepClick: function (stepID) {
            var step = null;

            selectedStepID = stepID;
            this._diagram.SelectStep(selectedStepID);
            step = this._diagram.GetStep(selectedStepID);
            if (step.get_Type() === WorkflowEnums.Workflow.StepType.FINAL) {
                //diagramToolbar.SetState(WorkflowEnums.DiagramToolbar.State.FINAL_STEP_SELECTED);
            }
            else if (step.get_Type() === WorkflowEnums.Workflow.StepType.INITIAL) {
                //diagramToolbar.SetState(WorkflowEnums.DiagramToolbar.State.INITIAL_STEP_SELECTED);
            }
            else {
                //diagramToolbar.SetState(WorkflowEnums.DiagramToolbar.State.STEP_SELECTED);
            }
        },

        _doCanvasClick: function () {
            this._diagram.SelectCanvas();
            //diagramToolbar.SetState(WorkflowEnums.DiagramToolbar.State.CANVAS_SELECTED);
            selectedStepID = -1;
        }
    });
});