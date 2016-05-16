define([
    "jquery", "underscore", "backbone",
    "i18n!nls/localeStrings",
    "utilities/toolbar",
    "common/widgetView",
    "text!workflows/editor/editorTemplate.html",
    "workflows/workflowEnums"
], function ($, _, Backbone, locale, Toolbar, WidgetView, EditorTemplate, WorkflowEnums) {
    "use strict";

    return WidgetView.extend({
        events: {
            "click .taskStep": Toolbar.ToolbarItemCallback(function (e) {
                this._eventBus.trigger(WorkflowEnums.Events.ADD_TASK_STEP_BUTTON_CLICKED);
            }),

            "click .manualDecisionStep": Toolbar.ToolbarItemCallback(function (e) {
                this._eventBus.trigger(WorkflowEnums.Events.ADD_MANUAL_DECISION_STEP_BUTTON_CLICKED);
            }),

            "click .categoryBasedDecisionStep": Toolbar.ToolbarItemCallback(function (e) {
                this._eventBus.trigger(WorkflowEnums.Events.ADD_AUTOMATIC_DECISION_STEP_BUTTON_CLICKED);
            }),

            "click .parallelStep": Toolbar.ToolbarItemCallback(function (e) {
                this._eventBus.trigger(WorkflowEnums.Events.ADD_PARALLEL_STEP_BUTTON_CLICKED);
            }),

            "click .delete": Toolbar.ToolbarItemCallback(function (e) {
                this._eventBus.trigger(WorkflowEnums.Events.DELETE_BUTTON_CLICKED);
            })
        },

        initializeWidget: function () {
            this._eventBus = this.options.eventBus;
            this._initializeToolbar();
            this._registerListeners();
        },

        renderChildren: function () {
            this._renderToolbar();
        },


        _registerListeners: function () {
            this._eventBus.on(WorkflowEnums.Events.STEP_CLICKED, this._stepClicked, this);
            this._eventBus.on(WorkflowEnums.Events.TRACK_LINE_SEGMENT_CLICKED, this._trackSegmentSelected, this);
            this._eventBus.on(WorkflowEnums.Events.TRANSITION_OPTION_CLICKED, this._transitionOptionSelected, this);
            this._eventBus.on(WorkflowEnums.Events.TRANSITION_INDICATOR_CLICKED, this._transitionIndicatorSelected, this);
            this._eventBus.on(WorkflowEnums.Events.CANVAS_CLICKED, this._canvasSelected, this);
        },

        _stepClicked: function (event, params) {
            var stepType = params.StepType;

            if (stepType === WorkflowEnums.Workflow.StepType.FINAL) {
                this._setState(WorkflowEnums.DiagramToolbar.State.FINAL_STEP_SELECTED);
            }
            else if (stepType === WorkflowEnums.Workflow.StepType.INITIAL) {
                this._setState(WorkflowEnums.DiagramToolbar.State.INITIAL_STEP_SELECTED);
            }
            else {
                this._setState(WorkflowEnums.DiagramToolbar.State.STEP_SELECTED);
            }
        },

        _trackSegmentSelected: function (event, params) {
            this._setState(WorkflowEnums.DiagramToolbar.State.PARALLEL_STEP_TRACK_LINE_SEGMENT_SELECTED);
        },

        _transitionOptionSelected: function (event, params) {
            this._setState(WorkflowEnums.DiagramToolbar.State.TRANSITION_OPTION_SELECTED);
        },

        _transitionIndicatorSelected: function (event, params){
            this._setState(WorkflowEnums.DiagramToolbar.State.TRANSITION_INDICATOR_SELECTED);
        },

        _canvasSelected: function (event, params) {
            this._setState(WorkflowEnums.DiagramToolbar.State.CANVAS_SELECTED);
        },

        _renderToolbar: function () {
            this.$(".leftButtons").append(Toolbar.Toolbar({
                toolbarItems: [
                    this._taskStepButton,
                    this._manualDecisionStepButton,
                    this._categoryBasedDecisionStepButton,
                    this._parallelStepButton,
                    this._deleteButton
                ]
            }));

            this.$(".rightButtons").append(Toolbar.Toolbar({
                toolbarItems: [
                    this._searchButton,
                    this._validateButton,
                    this._printButton
                ]
            }));

            // reference button-elements
            this._taskStepButtonElement = this.$(".taskStep");
            this._manualDecisionStepButtonElement = this.$(".manualDecisionStep");
            this._categoryBasedDecisionStepButtonElement = this.$(".categoryBasedDecisionStep");
            this._parallelStepButtonElement = this.$(".parallelStep");
            this._deleteButtonElement = this.$(".delete");
        },

        _initializeToolbar: function () {
            this._taskStepButton = Toolbar.ButtonGroup({
                buttons: [Toolbar.ImageButton({
                    recognizedAs: "taskStep",
                    label: "",
                    icon: Toolbar.IconType.TASK_STEP,
                    tooltip: locale.label.workflows.add_task_step_button_tooltip
                })]
            });

            this._manualDecisionStepButton = Toolbar.ButtonGroup({
                buttons: [Toolbar.ImageButton({
                    recognizedAs: "manualDecisionStep",
                    label: "",
                    icon: Toolbar.IconType.MANUAL_DECISION_STEP,
                    tooltip: locale.label.workflows.add_manual_decision_step_button_tooltip
                })]
            });

            this._categoryBasedDecisionStepButton = Toolbar.ButtonGroup({
                buttons: [Toolbar.ImageButton({
                    recognizedAs: "categoryBasedDecisionStep",
                    label: "",
                    icon: Toolbar.IconType.CATEGORY_BASED_DECISION_STEP,
                    tooltip: locale.label.workflows.add_category_based_decision_step_button_tooltip
                })]
            });

            this._parallelStepButton = Toolbar.ButtonGroup({
                buttons: [Toolbar.ImageButton({
                    recognizedAs: "parallelStep",
                    label: "",
                    icon: Toolbar.IconType.PARALLEL_STEP,
                    tooltip: locale.label.workflows.add_parallel_step_button_tooltip
                })]
            });

            this._deleteButton = Toolbar.ButtonGroup({
                buttons: [Toolbar.ImageButton({
                    recognizedAs: "delete",
                    label: "",
                    icon: Toolbar.IconType.DELETE,
                    tooltip: locale.label.workflows.delete_button_tooltip
                })]
            });

            this._searchButton = Toolbar.ButtonGroup({
                buttons: [Toolbar.Button({
                    recognizedAs: "search",
                    label: locale.label.workflows.search_button,
                    tooltip: locale.label.workflows.delete_button_tooltip
                })]
            });

            this._validateButton = Toolbar.ButtonGroup({
                buttons: [Toolbar.Button({
                    recognizedAs: "validate",
                    label: locale.label.workflows.validate_button,
                    tooltip: locale.label.workflows.delete_button_tooltip
                })]
            });

            this._printButton = Toolbar.ButtonGroup({
                buttons: [Toolbar.Button({
                    recognizedAs: "print",
                    label: locale.label.workflows.print_button,
                    tooltip: locale.label.workflows.delete_button_tooltip
                })]
            });
        },

        _setState: function (state) {
            if (this._currentState !== WorkflowEnums.DiagramToolbar.State.READ_ONLY) {
                this._currentState = state;

                Toolbar.enable(this._taskStepButtonElement);
                Toolbar.enable(this._manualDecisionStepButtonElement);
                Toolbar.enable(this._categoryBasedDecisionStepButtonElement);
                Toolbar.enable(this._parallelStepButtonElement);
                Toolbar.enable(this._deleteButtonElement);

                switch (this._currentState) {
                    case WorkflowEnums.DiagramToolbar.State.CANVAS_SELECTED:
                        Toolbar.disable(this._deleteButtonElement);
                        break;
                    case WorkflowEnums.DiagramToolbar.State.FINAL_STEP_SELECTED:
                        Toolbar.disable(this._deleteButtonElement);
                        break;
                    case WorkflowEnums.DiagramToolbar.State.INITIAL_STEP_SELECTED:
                        Toolbar.disable(this._deleteButtonElement);
                        break;
                    case WorkflowEnums.DiagramToolbar.State.PARALLEL_STEP_TRACK_LINE_SEGMENT_SELECTED:
                        Toolbar.disable(this._manualDecisionStepButtonElement);
                        Toolbar.disable(this._categoryBasedDecisionStepButtonElement);
                        Toolbar.disable(this._parallelStepButtonElement);
                        Toolbar.disable(this._deleteButtonElement);
                        break;
                    case WorkflowEnums.DiagramToolbar.State.STEP_SELECTED:
                        break;
                    case WorkflowEnums.DiagramToolbar.State.TRANSITION_OPTION_SELECTED:
                        break;
                    case WorkflowEnums.DiagramToolbar.State.TRANSITION_INDICATOR_SELECTED:
                        Toolbar.disable(this._deleteButtonElement);
                        break;
                    case WorkflowEnums.DiagramToolbar.State.READ_ONLY:
                        Toolbar.disable(this._taskStepButtonElement);
                        Toolbar.disable(this._manualDecisionStepButtonElement);
                        Toolbar.disable(this._categoryBasedDecisionStepButtonElement);
                        Toolbar.disable(this._parallelStepButtonElement);
                        Toolbar.disable(this._deleteButtonElement);
                        break;
                    default:
                        break;
                }
            }
        }

    });
});