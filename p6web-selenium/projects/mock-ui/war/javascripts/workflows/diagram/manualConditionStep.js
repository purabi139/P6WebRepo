/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/accessibilityclient.aspx"/>
/// <reference path="../utils/misc.js"/>
/// <reference path="../workflow/task.js"/>
/// <reference path="../workflow/transitionoption.js"/>

define([
    "underscore", "i18n!nls/localeStrings",
    "workflows/diagram/conditionStep",
    "workflows/workflowEnums"
], function (_, locale, ConditionStep, WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.ManualConditionStep = function (options) // {eventBus, ptrToStepData, creationInfo}, where creationInfo -- optional
    {
        ProSight.WebControls.Workflows.ManualConditionStep.initializeBase(this, [options]);
    }

    ProSight.WebControls.Workflows.ManualConditionStep.prototype =
    {
        _GenerateChoiceOptions: function () {
            var i = 0;
            var choiceOptions = [];

            for (i = 0; i < this.GetNumberOfOptions() ; i++) {
                Array.add(
                    choiceOptions,
                    this.GetOption(i).get_Label());
            }
            this._GetTask().set_ChoiceOptions(choiceOptions);
        },

        _GetTask: function () {
            return new ProSight.WebControls.Workflows.Task(this.get_ID(), 0, this._step.Tasks[0]);
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
            this._step.Transition.CategoryTransition = null;
            this._step.Transition.Type = WorkflowEnums.Workflow.TransitionLogicType.MANUAL;
        },

        InitializeStepSpecificProperties: function () {
            // PROTECTED, OVERRIDE

            var task = null;

            task = ProSight.WebControls.Workflows.Task.AllocAndInitNewTaskData(0);
            this._step.Tasks = [task];
            task = this._GetTask();
            task.set_Name(locale.label.workflows.system_choice_task_name);
            task.set_Description(locale.label.workflows.system_choice_task_description);
            task.set_Type(WorkflowEnums.GUITaskType.CHOICE);
            task.set_SignOffType(WorkflowEnums.UserTask.SignOffType.MINIMAL_DIALOG);
            task.set_ChoiceLabel(locale.label.workflows.system_choice_label);
            task.get_Link().Type = WorkflowEnums.LinkType.TEXT;
            this._GenerateChoiceOptions();
        },

        get_ChoiceLabel: function () {
            return this._GetTask().get_ChoiceLabel();
        },

        set_ChoiceLabel: function (newLabel) {
            this._GetTask().set_ChoiceLabel(newLabel);
        },

        get_ChoiceTaskName: function () {
            return this._GetTask().get_Name();
        },

        set_ChoiceTaskName: function (newName) {
            this._GetTask().set_Name(newName);
        },

        get_ChoiceTaskManager: function () {
            return this._GetTask().get_Manager();
        },

        get_SignOffType: function () {
            return this._GetTask().get_SignOffType();
        },

        set_SignOffType: function (newSignOffType) {
            this._GetTask().set_SignOffType(newSignOffType);
        },

        RenameOption: function (optionIndex, newLabel) {
            // OVERRIDE

            ProSight.WebControls.Workflows.ManualConditionStep.callBaseMethod(this, "RenameOption", [optionIndex, newLabel]);
            this._GenerateChoiceOptions();
        },

        /// #region Rendering APIs
        GetStepShape: function () {
            // PROTECTED, OVERRIDE

            return _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "manualDecisionStep.png");
        },

        GetSelectedStepShape: function () {
            // PROTECTED, OVERRIDE

            return _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "manualDecisionStep-Selected.png");
        },
        /// #endregion Rendering APIs

        dispose: function () {
            ProSight.WebControls.Workflows.ManualConditionStep.callBaseMethod(this, "dispose");
        }
    }

    ProSight.WebControls.Workflows.ManualConditionStep.registerClass(
        "ProSight.WebControls.Workflows.ManualConditionStep",
        ProSight.WebControls.Workflows.ConditionStep);

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.ManualConditionStep;
});