/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/accessibilityclient.aspx"/>
/// <reference path="../utils/misc.js"/>

define([
    "underscore",
    "workflows/diagram/step",
    "workflows/workflowEnums"
], function (_, Step, WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.FinalStep = function (options) // {eventBus, ptrToStepData, creationInfo}, where creationInfo -- optional
    {
        ProSight.WebControls.Workflows.FinalStep.initializeBase(this, [options]);
    }

    ProSight.WebControls.Workflows.FinalStep.prototype =
    {
        get_CanConnectToAnotherStep: function () {
            // OVERRIDE

            return false;
        },

        /// #region Rendering APIs
        GetStepNameCSSClass: function () {
            // PROTECTED, OVERRIDE

            return "finalAndInitialStepName";
        },

        GetStepShape: function () {
            // PROTECTED, OVERRIDE

            return _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "finalAndInitialStep.png");
        },

        GetSelectedStepShape: function () {
            // PROTECTED, OVERRIDE

            return _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "finalAndInitialStep-Selected.png");
        },

        get_IncomingConnectionPoints: function () {
            // PROTECTED, OVERRIDE

            return [[
                0.5, 0, 0, -1
            ], [
                1, 0.5, 1, 0
            ], [
                0, 0.5, -1, 0
            ]];
        },

        get_Dimensions: function () {
            // PROTECTED, OVERRIDE

            return {
                Height: WorkflowEnums.FinalStep.HEIGHT,
                Width: WorkflowEnums.FinalStep.WIDTH
            };
        },
        /// #endregion Rendering APIs

        dispose: function () {
            ProSight.WebControls.Workflows.FinalStep.callBaseMethod(this, "dispose");
        }
    }

    ProSight.WebControls.Workflows.FinalStep.registerClass(
        "ProSight.WebControls.Workflows.FinalStep",
        ProSight.WebControls.Workflows.Step);

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.FinalStep;
});