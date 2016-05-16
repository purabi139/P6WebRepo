/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/accessibilityclient.aspx"/>
/// <reference path="../utils/misc.js"/>

define([
    "underscore",
    "workflows/diagram/conditionStep",
    "workflows/workflowEnums"
], function (_, ConditionStep, WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.CategoryBasedConditionStep = function (options) // {eventBus, ptrToStepData, creationInfo}, where creationInfo -- optional
    {
        ProSight.WebControls.Workflows.CategoryBasedConditionStep.initializeBase(this, [options]);
    }

    ProSight.WebControls.Workflows.CategoryBasedConditionStep.prototype =
    {
        _get_Rules: function () {
            // PRIVATE

            return this._step.Transition.Rules;
        },

        _get_RuleType: function () {
            // PRIVATE

            var ruleType = WorkflowEnums.Workflow.TransitionRuleType.STRING;
            var categoryInfo = this.get_CategoryTransition();

            if (categoryInfo != null) {
                if (categoryInfo.CellPart === WorkflowEnums.CellPart.X_VALUE) {
                    if (categoryInfo.CategoryDataType === WorkflowEnums.CategoryDataType.DATETIME) {
                        ruleType = WorkflowEnums.Workflow.TransitionRuleType.DATETIME_RANGE;
                    }
                    else if (categoryInfo.CategoryDataType === WorkflowEnums.CategoryDataType.ENUM) {
                        ruleType = WorkflowEnums.Workflow.TransitionRuleType.INTEGER;
                    }
                    else if (categoryInfo.CategoryDataType === WorkflowEnums.CategoryDataType.FLOAT) {
                        ruleType = WorkflowEnums.Workflow.TransitionRuleType.DOUBLE_RANGE;
                    }
                    else if (categoryInfo.CategoryDataType === WorkflowEnums.CategoryDataType.INT) {
                        ruleType = WorkflowEnums.Workflow.TransitionRuleType.INTEGER_RANGE;
                    }
                    else if (categoryInfo.CategoryDataType === WorkflowEnums.CategoryDataType.STRING) {
                        ruleType = WorkflowEnums.Workflow.TransitionRuleType.STRING;
                    }
                    else if (categoryInfo.CategoryDataType === WorkflowEnums.CategoryDataType.USER) {
                        ruleType = WorkflowEnums.Workflow.TransitionRuleType.INTEGER;
                    }
                }
                else if (categoryInfo.CellPart === WorkflowEnums.CellPart.I_VALUE) {
                    ruleType = WorkflowEnums.Workflow.TransitionRuleType.INTEGER;
                }
            }

            return ruleType;
        },

        get_CategoryTransition: function () {
            return this._step.Transition.CategoryTransition;
        },

        set_TransitionType: function (newType) {
            this._step.Transition.Type = newType;
        },

        InitializeTransition: function () {
            // PROTECTED, OVERRIDE

            this._step.Transition = JSON.parse(WorkflowEnums.DataStructures.DefaultTransition);
            Array.add(
                this._get_Options(),
                ProSight.WebControls.Workflows.TransitionOption.AllocAndInitNewTransitionOptionData(0));
            Array.add(
                this._get_Options(),
                ProSight.WebControls.Workflows.TransitionOption.AllocAndInitNewTransitionOptionData(1));
            this._step.Transition.Type = WorkflowEnums.Workflow.TransitionLogicType.CATEGORY_EQUALITY;
        },

        InitializeStepSpecificProperties: function () {
            // PROTECTED, OVERRIDE
        },

        ClearRules: function () {
            Array.clear(this._get_Rules());
        },

        DeleteRule: function (ruleIndex) {
            Array.removeAt(this._get_Rules(), ruleIndex);
        },

        InsertRuleAt: function (insertAtIndex) {
            var newRule = null;
            var newID = 0;

            newID = this._GetUniqueIDForRule();
            Array.insert(
                this._get_Rules(),
                insertAtIndex,
                ProSight.WebControls.Workflows.TransitionRule.AllocAndInitNewTransitionRuleData(
                            insertAtIndex,
                            this._get_RuleType()));
            newRule = this.GetRule(insertAtIndex);

            newRule.set_ID(newID);
            return newRule;
        },

        GetRule: function (ruleIndex) {
            return new ProSight.WebControls.Workflows.TransitionRule(
                this._parentStepID,
                ruleIndex,
                this._get_Rules()[ruleIndex]);
        },

        GetNumberOfRules: function () {
            return this._get_Rules().length;
        },

        _GetUniqueIDForRule: function () {
            var ID = 0;
            var i = 0;

            for (i = 0; i < this.GetNumberOfRules() ; i++) {
                ID = Math.max(ID, this.GetRule(i).get_ID());
            }
            return ID < Number.MAX_VALUE ?
                ID + 1 :
                Number.MAX_VALUE;
        },

        /// #region Rendering APIs
        GetStepShape: function () {
            // PROTECTED, OVERRIDE

            return _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "categoryBasedDecisionStep.png");
        },

        GetSelectedStepShape: function () {
            // PROTECTED, OVERRIDE

            return _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "categoryBasedDecisionStep-Selected.png");
        },
        /// #endregion Rendering APIs

        dispose: function () {
            ProSight.WebControls.Workflows.CategoryBasedConditionStep.callBaseMethod(this, "dispose");
        }
    }

    ProSight.WebControls.Workflows.CategoryBasedConditionStep.registerClass(
        "ProSight.WebControls.Workflows.CategoryBasedConditionStep",
        ProSight.WebControls.Workflows.ConditionStep);

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.CategoryBasedConditionStep;
});