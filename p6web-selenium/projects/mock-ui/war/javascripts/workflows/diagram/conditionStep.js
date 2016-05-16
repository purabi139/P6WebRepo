/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/misc.js"/>
/// <reference path="../workflow/transitionoption.js"/>
/// <reference path="../workflow/transitionrule.js"/>

define([
    "i18n!nls/localeStrings",
    "workflows/diagram/step",
    "workflows/workflowEnums"
], function (locale, Step, WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.ConditionStep = function (options) // {eventBus, ptrToStepData, creationInfo}, where creationInfo -- optional
    {
        ProSight.WebControls.Workflows.ConditionStep.initializeBase(this, [options]);
    }

    ProSight.WebControls.Workflows.ConditionStep.prototype =
    {
        ConnectOption: function (optionIndex, targetStepID) {
            this.GetOption(optionIndex).set_TargetStepID(targetStepID);
        },

        DisconnectOption: function (optionIndex) {
            this.GetOption(optionIndex).set_TargetStepID(null);
        },

        GetOption: function (optionIndex) {
            return new ProSight.WebControls.Workflows.TransitionOption({
                eventBus: this._eventBus,
                stepID: this.get_ID(),
                optionIndex: optionIndex,
                optionData: this._get_Options()[optionIndex]
            });
        },

        RenameOption: function (optionIndex, newLabel) {
            this.GetOption(optionIndex).set_Label(newLabel);
        },

        get_CanConnectToItself: function () {
            // OVERRIDE

            return true;
        },

        IsUniqueOptionLabel: function (optionLabel) {
            // OVERRIDE

            var i = 0;
            var isUnique = true;

            for (i = 0; i < this.GetNumberOfOptions() ; i++) {
                if (this.GetOption(i).get_Label().toLowerCase() === optionLabel.toLowerCase()) {
                    isUnique = false;
                    break;
                }
            }
            return isUnique;
        },

        get_MaximumNumberOfOptions: function () {
            // OVERRIDE

            return 5;
        },

        /// #region Rendering APIs
        GetStepNameCSSClass: function () {
            // PROTECTED, OVERRIDE

            return "conditionStepName";
        },

        get_IncomingConnectionPoints: function () {
            // PROTECTED, OVERRIDE

            return [[
                (3 / 6), 0, 0, -1
            ], [
                (4 / 6), (1 / 6), 0, -1
            ], [
                (5 / 6), (2 / 6), 1, 0
            ], [
                (6 / 6), (3 / 6), 1, 0
            ], [
                (5 / 6), (4 / 6), 1, 0
            ], [
                (4 / 6), (5 / 6), 0, 1
            ], [
                (3 / 6), (6 / 6), 0, 1
            ], [
                (2 / 6), (5 / 6), 0, 1
            ], [
                (1 / 6), (4 / 6), -1, 0
            ], [
                0, (3 / 6), -1, 0
            ], [
                (1 / 6), (2 / 6), -1, 0
            ], [
                (2 / 6), (1 / 6), 0, -1
            ]];
        },

        get_Dimensions: function () {
            // PROTECTED, OVERRIDE

            return {
                Height: WorkflowEnums.ConditionStep.HEIGHT,
                Width: WorkflowEnums.ConditionStep.WIDTH
            };
        },
        /// #endregion Rendering APIs

        dispose: function () {
        }
    }

    ProSight.WebControls.Workflows.ConditionStep.registerClass(
        "ProSight.WebControls.Workflows.ConditionStep",
        ProSight.WebControls.Workflows.Step);

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.ConditionStep;
});