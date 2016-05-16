/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/misc.js"/>

define([
    "i18n!nls/localeStrings",
    "workflows/workflowEnums",
    "ms-ajax"
], function (locale, WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.Task = function (stepID, taskIndex, taskData) {
        this._parentStepID = stepID;
        this._taskIndex = taskIndex;
        this._task = taskData;
    }

    ProSight.WebControls.Workflows.Task.AllocAndInitNewTaskData = function (taskIndex) {
        var defaultTask = null;

        defaultTask = JSON.parse(WorkflowEnums.DataStructures.DefaultTask);
        defaultTask.Name = _.formatString(locale.label.workflows.default_task_name, taskIndex + 1);

        return defaultTask;
    }

    ProSight.WebControls.Workflows.Task.prototype =
    {
        get_Name: function () {
            return this._task.Name;
        },

        set_Name: function (newName) {
            this._task.Name = newName;
        },

        get_Description: function () {
            return this._task.Description;
        },

        set_Description: function (newDescription) {
            this._task.Description = newDescription;
        },

        get_Type: function () {
            return this._task.Type;
        },

        set_Type: function (newType) {
            this._task.Type = newType;
        },

        get_SignOffType: function () {
            return this._task.SignOffType;
        },

        set_SignOffType: function (newSignOffType) {
            this._task.SignOffType = newSignOffType;
        },

        get_UseFormContextForWorkflow: function () {
            return this._task.UseFormContextForWorkflow;
        },

        set_UseFormContextForWorkflow: function (value) {
            this._task.UseFormContextForWorkflow = value;
        },

        get_ChoiceLabel: function () {
            return this._task.Choice.ChoiceLabel;
        },

        set_ChoiceLabel: function (newLabel) {
            if (this._task.Choice == null) {
                this._task.Choice = {};
            }
            this._task.Choice.ChoiceLabel = newLabel;
        },

        set_ChoiceOptions: function (newChoiceOptions) // newChoiceOptions=[..., ..., ...]
        {
            if (this._task.Choice == null) {
                this._task.Choice = {};
            }
            this._task.Choice.ChoiceOptions = newChoiceOptions;
        },

        get_IsIterativeTask: function () {
            var scopeRule = null;
            var manager = null;

            scopeRule = this.get_ScopeRule();
            manager = this.get_Manager();
            return (scopeRule.ScopeDepthType === WorkflowEnums.UserTask.InstantiationRuleType.ALL ||
                scopeRule.ScopeDepthType === WorkflowEnums.UserTask.InstantiationRuleType.CUSTOM ||
                scopeRule.ScopeDepthType === WorkflowEnums.UserTask.InstantiationRuleType.ONE_LEVEL_BELOW ||
                scopeRule.ScopeDepthType === WorkflowEnums.UserTask.InstantiationRuleType.TWO_LEVELS_BELOW ||
                scopeRule.ScopeDepthType === WorkflowEnums.UserTask.InstantiationRuleType.THREE_LEVELS_BELOW ||
                manager.Type === WorkflowEnums.UserRoleType.USER_GROUP);
        },

        get_Scope: function () {
            return this._task.Scope;
        },

        get_ScopeRule: function () {
            return this._task.ScopeRule;
        },

        get_Manager: function () {
            return this._task.Manager;
        },

        get_EmbeddedWorkflow: function () {
            return this._task.EmbeddedWorkflow;
        },

        get_Link: function () {
            return this._task.Link;
        },

        get_FieldToUpdate: function () {
            return this._task.FieldToUpdate;
        },

        Delete: function () {
        },

        ToJSON: function () {
            /// <summary>
            ///     Serializes the Task into a JSON-format string.
            /// </summary>
            /// <returns type="String">
            ///     The string that is a JSON representation of the Task.
            /// </returns>

            return JSON.stringify(this._task);
        },

        dispose: function () {
        }
    }

    ProSight.WebControls.Workflows.Task.registerClass("ProSight.WebControls.Workflows.Task");

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.Task;
});