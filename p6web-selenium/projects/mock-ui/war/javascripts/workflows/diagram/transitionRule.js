/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../workflow/transitionoption.js"/>

define([
    "workflows/workflowEnums",
    "ms-ajax"
], function (WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.TransitionRule = function (stepID, ruleIndex, ruleData) {
        this._parentStepID = stepID;
        this._ruleIndex = ruleIndex;
        this._rule = ruleData;
    }

    ProSight.WebControls.Workflows.TransitionRule.AllocAndInitNewTransitionRuleData = function (ruleIndex, ruleType) {
        var defaultTransitionRule = null;

        defaultTransitionRule = JSON.parse(WorkflowEnums.DataStructures.DefaultTransitionRule);
        defaultTransitionRule.ID = ruleIndex + 1;
        defaultTransitionRule.Type = ruleType;

        return defaultTransitionRule;
    }

    ProSight.WebControls.Workflows.TransitionRule.prototype =
    {
        get_TransitionOptionID: function () {
            return this._rule.TransitionOptionID;
        },

        set_TransitionOptionID: function (newID) {
            this._rule.TransitionOptionID = newID;
        },

        get_ID: function () {
            return this._rule.ID;
        },

        set_ID: function (newID) {
            this._rule.ID = newID;
        },

        get_Type: function () {
            return this._rule.Type;
        },

        get_Definition: function () {
            var definition = null;

            switch (this.get_Type()) {
                case WorkflowEnums.Workflow.TransitionRuleType.DATETIME_RANGE:
                    definition = this._rule.DateTimeRangeTransitionRule;
                    break;
                case WorkflowEnums.Workflow.TransitionRuleType.DOUBLE_RANGE:
                    definition = this._rule.DoubleRangeTransitionRule;
                    break;
                case WorkflowEnums.Workflow.TransitionRuleType.INTEGER:
                    definition = this._rule.IntegerTransitionRule;
                    break;
                case WorkflowEnums.Workflow.TransitionRuleType.INTEGER_RANGE:
                    definition = this._rule.IntegerRangeTransitionRule;
                    break;
                case WorkflowEnums.Workflow.TransitionRuleType.STRING:
                    definition = this._rule.StringTransitionRule;
                    break;
                default:
                    break;
            }
            return definition;
        },

        dispose: function () {
        }
    }

    ProSight.WebControls.Workflows.TransitionRule.registerClass("ProSight.WebControls.Workflows.TransitionRule");

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.TransitionRule;
});