/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/misc.js"/>
/// <reference path="../workflow/diagram.js"/>

define([
    "workflows/workflowEnums",
    "ms-ajax"
], function (WorkflowEnums) {
    var diagramToolbar;
    var DT_SEARCH_BUTTON_ID;
    var DT_VERIFY_BUTTON_ID;

    function AddNewTaskStep_Clicked() {
        diagramToolbar.AddNewTaskStep();
    }

    function AddNewManualDecisionStep_Clicked() {
        diagramToolbar.AddNewManualDecisionStep();
    }

    function AddNewCateogryBasedDecisionStep_Clicked() {
        diagramToolbar.AddNewCateogryBasedDecisionStep();
    }

    function AddNewParallelStep_Clicked() {
        diagramToolbar.AddNewParallelStep();
    }

    function Delete_Clicked() {
        diagramToolbar.Delete();
    }

    function Search_Clicked() {
        diagramToolbar.Search();
    }

    function Verify_Clicked() {
        diagramToolbar.Verify();
    }

    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.DiagramToolbar = function (diagram, toolbarButtons, isEnabled) {
        this._diagram = diagram;
        this._toolbarButtons = toolbarButtons;
        this._isEnabled = (isEnabled === true);
        this._verifyDlgHandle = null;
        this._searchDlgHandle = null;
        this.SetState(this._isEnabled ?
            WorkflowEnums.DiagramToolbar.State.CANVAS_SELECTED :
            WorkflowEnums.DiagramToolbar.State.READ_ONLY);
    }

    ProSight.WebControls.Workflows.DiagramToolbar.prototype =
    {
        _AddStepToDiagram: function (stepType) {
            var stepID = null;

            stepID = this._diagram.AddStep(stepType);
            this._diagram.RenderStep(stepID);
            DiagramToolbar_StepAdded({
                StepID: stepID
            });
        },

        SetState: function (newState) {
            if (this._currentState !== WorkflowEnums.DiagramToolbar.State.READ_ONLY) {
                this._currentState = newState;

                this._toolbarButtons.CategoryBasedDecisionStep.enable();
                this._toolbarButtons.ManualDecisionStep.enable();
                this._toolbarButtons.ParallelStep.enable();
                this._toolbarButtons.TaskStep.enable();
                this._toolbarButtons.Delete.enable();

                switch (this._currentState) {
                    case WorkflowEnums.DiagramToolbar.State.CANVAS_SELECTED:
                        this._toolbarButtons.Delete.disable();
                        break;
                    case WorkflowEnums.DiagramToolbar.State.FINAL_STEP_SELECTED:
                        this._toolbarButtons.Delete.disable();
                        break;
                    case WorkflowEnums.DiagramToolbar.State.INITIAL_STEP_SELECTED:
                        this._toolbarButtons.Delete.disable();
                        break;
                    case WorkflowEnums.DiagramToolbar.State.PARALLEL_STEP_TRACK_LINE_SEGMENT_SELECTED:
                        this._toolbarButtons.CategoryBasedDecisionStep.disable();
                        this._toolbarButtons.ManualDecisionStep.disable();
                        this._toolbarButtons.ParallelStep.disable();
                        this._toolbarButtons.Delete.disable();
                        break;
                    case WorkflowEnums.DiagramToolbar.State.READ_ONLY:
                        this._toolbarButtons.CategoryBasedDecisionStep.disable();
                        this._toolbarButtons.ManualDecisionStep.disable();
                        this._toolbarButtons.ParallelStep.disable();
                        this._toolbarButtons.TaskStep.disable();
                        this._toolbarButtons.Delete.disable();
                        break;
                    case WorkflowEnums.DiagramToolbar.State.STEP_SELECTED:
                        break;
                    case WorkflowEnums.DiagramToolbar.State.TRANSITION_OPTION_SELECTED:
                        break;
                    default:
                        break;
                }
            }
        },

        AddNewTaskStep: function () {
            this._AddStepToDiagram(WorkflowEnums.Workflow.StepType.TASKS);
        },

        AddNewManualDecisionStep: function () {
            this._AddStepToDiagram(WorkflowEnums.Workflow.StepType.MANUAL_CONDITION);
        },

        AddNewCateogryBasedDecisionStep: function () {
            this._AddStepToDiagram(WorkflowEnums.Workflow.StepType.AUTOMATIC_CONDITION);
        },

        AddNewParallelStep: function () {
            this._AddStepToDiagram(WorkflowEnums.Workflow.StepType.PARALLEL);
        },

        Delete: function () {
            if (this._diagram.DeleteSelectedObject()) {
                DiagramToolbar_StepDeleted();
            }
        },

        Search: function () {
            if (this.isSearchWindowOpen()) {
                this._searchDlgHandle.focus();
            }
            else {
                this._searchDlgHandle = wmOpenWindowRC("RSC_WM_SEARCH_WORKFLOW", "../workflow/searchdlg.aspx");
            }
        },

        isSearchWindowOpen: function () {
            var res = false;
            if (this._searchDlgHandle != null) {
                try {
                    res = this._searchDlgHandle.IsOpen();
                }
                catch (e) {
                    this._searchDlgHandle = null;
                }
            }
            return res;
        },

        Verify: function () {
            var deSerializedWFMeta = null;

            deSerializedWFMeta = JSON.parse(GetWorkflowDataSerialized());

            if (this.isVerifyWindowOpen()) {
                this._verifyDlgHandle.focus();
                this._verifyDlgHandle.DelayedRefresh();
            }
            else {
                this._verifyDlgHandle = wmOpenWindowRC("RSC_WM_VERIFY_WORKFLOW", "../workflow/verifydlg.aspx?WFName=" + encodeURIComponent(encodeURIComponent(deSerializedWFMeta.Name)));
            }
        },

        isVerifyWindowOpen: function () {
            var res = false;
            if (this._verifyDlgHandle != null) {
                try {
                    res = this._verifyDlgHandle.IsOpen();
                }
                catch (e) {
                    this._verifyDlgHandle = null;
                }
            }
            return res;
        },

        dispose: function () {
            this._diagram = null;
            this._toolbarButtons.Search = null;
            this._toolbarButtons.Verify = null;
            this._toolbarButtons = null;
        }
    }

    ProSight.WebControls.Workflows.DiagramToolbar.registerClass("ProSight.WebControls.Workflows.DiagramToolbar");

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.DiagramToolbar;
});