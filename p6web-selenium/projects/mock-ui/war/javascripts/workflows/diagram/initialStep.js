/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/accessibilityclient.aspx"/>
/// <reference path="../utils/misc.js"/>

define([
    "underscore",
    "workflows/diagram/step",
    "workflows/workflowEnums"
], function (_, Step, WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.InitialStep = function (options) // {eventBus, ptrToStepData, creationInfo}, where creationInfo -- optional
    {
        ProSight.WebControls.Workflows.InitialStep.initializeBase(this, [options]);
    }

    ProSight.WebControls.Workflows.InitialStep.prototype =
    {
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
                1, 0.5, 1, 0
            ], [
                0.5, 1, 0, 1
            ], [
                0, 0.5, -1, 0
            ]];
        },

        get_Dimensions: function () {
            // PROTECTED, OVERRIDE

            return {
                Height: WorkflowEnums.InitialStep.HEIGHT,
                Width: WorkflowEnums.InitialStep.WIDTH
            };
        },
        /// #endregion Rendering APIs

        dispose: function () {
            ProSight.WebControls.Workflows.InitialStep.callBaseMethod(this, "dispose");
        }
    }

    ProSight.WebControls.Workflows.InitialStep.registerClass(
        "ProSight.WebControls.Workflows.InitialStep",
        ProSight.WebControls.Workflows.Step);

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.InitialStep;
});