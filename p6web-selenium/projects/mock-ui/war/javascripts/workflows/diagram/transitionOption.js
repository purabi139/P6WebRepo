/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/accessibilityclient.aspx"/>
/// <reference path="../utils/misc.js"/>

define([
    "underscore",
    "i18n!nls/localeStrings",
    "workflows/workflowEnums",
    "ms-ajax"
], function (_, locale, WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.TransitionOption = function (options) // {eventBus, stepID, optionIndex, optionData}
    {
        this._eventBus = options.eventBus;
        this._stepID = options.stepID;
        this._optionIndex = options.optionIndex;
        this._option = options.optionData;
    };

    ProSight.WebControls.Workflows.TransitionOption.AllocAndInitNewTransitionOptionData = function (optionIndex) {
        var defaultTransitionOption = null;

        defaultTransitionOption = JSON.parse(WorkflowEnums.DataStructures.DefaultTransitionOption);
        defaultTransitionOption.Label = _.formatString(locale.label.workflows.default_transition_option_name, optionIndex + 1);

        return defaultTransitionOption;
    };

    ProSight.WebControls.Workflows.TransitionOption.RemoveFromCanvas = function (parentStepID, optionIndex) {
        var selector = _.formatString(WorkflowEnums.TransitionOption.SCOPE_ID, parentStepID, optionIndex);
        var transitionIndicatorElement = null;

        // Cleanup transition indicator
        transitionIndicatorElement = $(_.formatString("#" + WorkflowEnums.TransitionOption.INDICATOR_ID, parentStepID, optionIndex));
        if (transitionIndicatorElement.length > 0) {
            transitionIndicatorElement.off();
            transitionIndicatorElement.remove();
        }

        // Cleanup connections before their hosting endpoints to allow unbinding events
        jsPlumb.select({
            scope: selector
        }).each(function (connection) {
            connection.unbind();
        }).detach();

        // Cleanup endpoints
        jsPlumb.selectEndpoints({
            scope: selector
        }).each(function (endpoint) {
            endpoint.unbind();
        }).delete();

        transitionIndicatorElement = null;
    };

    ProSight.WebControls.Workflows.TransitionOption.prototype =
    {
        get_IsDefaultOption: function () {
            return this._option.IsDefaultOption;
        },

        set_IsDefaultOption: function (isDefault) {
            this._option.IsDefaultOption = isDefault;
        },

        get_Label: function () {
            return this._option.Label;
        },

        set_Label: function (newLabel) {
            this._option.Label = newLabel;
        },

        get_TargetStepID: function () {
            return this._option.TargetStepID;
        },

        set_TargetStepID: function (newTargetStepID) {
            this._option.TargetStepID = newTargetStepID;
        },

        /// #region Rendering APIs
        _get_TransitionIndicatorElement: function () {
            return $(_.formatString("#" + WorkflowEnums.TransitionOption.INDICATOR_ID, this._stepID, this._optionIndex));
        },

        _AddHandlersToTransitionOption: function (objects) {
            var self = this;

            _.each(objects, function (object) {
                object.bind("click", function (source, event) {
                    event.stopPropagation();
                    self._eventBus.trigger(WorkflowEnums.Events.TRANSITION_OPTION_CLICKED, event, {
                        StepID: self._stepID,
                        OptionIndex: self._optionIndex
                    });
                });
            });
        },

        _AddHandlersToTransitionIndicator: function (transitionIndicatorElement) {
            transitionIndicatorElement.on({
                click: _.bind(function (event) {
                    event.stopPropagation();
                    this._eventBus.trigger(WorkflowEnums.Events.TRANSITION_INDICATOR_CLICKED, event, {
                        StepID: this._stepID,
                        OptionIndex: this._optionIndex
                    });
                }, this)
            });
        },

        _RenderTransitionIndicator: function (stepElement) {
            var transitionIndicatorElement = null;

            if (stepElement.length > 0) {
                transitionIndicatorElement = $("<div>", {
                    id: _.formatString(WorkflowEnums.TransitionOption.INDICATOR_ID, this._stepID, this._optionIndex)
                }).appendTo(stepElement);

                // A disconnected transition
                if (this.get_TargetStepID() == null) {
                    transitionIndicatorElement.attr("class", "transitionIndicator");
                    this._AddHandlersToTransitionIndicator(transitionIndicatorElement);
                }
                else {
                    transitionIndicatorElement.attr("class", "transitionIndicator-disabled");
                }
            }
            transitionIndicatorElement = null;
        },

        RenderConnection: function (sourceStep, destinationStep) {
            var sourceStepElement = null;
            var destinationStepElement = null;
            var sourceEndpoint = null;
            var destinationEndpoint = null;
            var connection = null;

            // Remove the transition from the diagram if it is already there.
            ProSight.WebControls.Workflows.TransitionOption.RemoveFromCanvas(this._stepID, this._optionIndex);

            sourceStepElement = sourceStep.get_StepElement();
            this._RenderTransitionIndicator(sourceStepElement);

            // A connected transition
            if (this.get_TargetStepID() != null) {
                destinationStepElement = destinationStep.get_StepElement();
                if (sourceStepElement.length > 0 &&
                    destinationStepElement.length > 0) {
                    sourceEndpoint = jsPlumb.addEndpoint(sourceStepElement, {
                        endpoint: ["Rectangle", {
                            height: 7,
                            width: 7,
                            cssClass: "transitionHandle"
                        }],
                        scope: _.formatString(WorkflowEnums.TransitionOption.SCOPE_ID, this._stepID, this._optionIndex),
                        anchor: sourceStep.get_OutgoingConnectionPoints(),
                        paintStyle: WorkflowEnums.TransitionOption.SOURCE_ENDPOINT_PAINT_STYLE,
                        connector: ["Flowchart", { stub: WorkflowEnums.Diagram.GRID_SIZE * 2 }],
                        connectionsDetachable: false,
                        connectorStyle: WorkflowEnums.TransitionOption.CONNECTION_PAINT_STYLE,
                        connectorOverlays: [[
                            "Arrow", {
                                location: 1,
                                length: 9,
                                width: 9,
                                cssClass: _.formatString(WorkflowEnums.TransitionOption.ENDING_ARROW_ID, this._stepID, this._optionIndex)
                            }], [
                            "Label", {
                                cssClass: "transitionOptionName",
                                label: this.get_Label(),
                                location: 50
                            }]]
                    });
                    destinationEndpoint = jsPlumb.addEndpoint(destinationStepElement, {
                        endpoint: ["Blank"],
                        scope: _.formatString(WorkflowEnums.TransitionOption.SCOPE_ID, this._stepID, this._optionIndex),
                        anchor: destinationStep.get_IncomingConnectionPoints()
                    });

                    connection = jsPlumb.connect({
                        source: sourceEndpoint,
                        target: destinationEndpoint,
                        cssClass: "transitionOption"
                    });
                    this._AddHandlersToTransitionOption([sourceEndpoint, connection]);
                }
            }
            sourceStepElement = null;
            destinationStepElement = null;
        },
        /// #endregion Rendering APIs

        /// #region Selection APIs
        Select: function () {
            var selector = "";
            var connection = null;

            selector = _.formatString(WorkflowEnums.TransitionOption.SCOPE_ID, this._stepID, this._optionIndex);
            // Paint style of the connection line
            jsPlumb.select({
                scope: selector
            }).setPaintStyle(_.extend({}, WorkflowEnums.TransitionOption.CONNECTION_PAINT_STYLE, {
                outlineColor: WorkflowEnums.TransitionOption.SELECTED_OUTLINE_COLOR
            }));

            connection = $("." + _.formatString(WorkflowEnums.TransitionOption.ENDING_ARROW_ID, this._stepID, this._optionIndex));
            if (connection.length > 0) {
                connection.attr("class", connection.attr("class") + " endingArrowSelected");
            }

            // Paint style of the source endpoint
            jsPlumb.selectEndpoints({
                scope: selector
            }).setPaintStyle(_.extend({}, WorkflowEnums.TransitionOption.SOURCE_ENDPOINT_PAINT_STYLE, {
                fillStyle: WorkflowEnums.TransitionOption.SELECTED_SOURCE_ENDPOINT_FILL_COLOR
            }));
            connection = null;
        },

        Deselect: function () {
            var selector = "";

            selector = _.formatString(WorkflowEnums.TransitionOption.SCOPE_ID, this._stepID, this._optionIndex);
            // Paint style of the connection line
            jsPlumb.select({
                scope: selector
            }).setPaintStyle(WorkflowEnums.TransitionOption.CONNECTION_PAINT_STYLE);

            // Paint style of the source endpoint
            jsPlumb.selectEndpoints({
                scope: selector
            }).setPaintStyle(WorkflowEnums.TransitionOption.SOURCE_ENDPOINT_PAINT_STYLE);
        },

        SelectIndicator: function () {
            var transitionIndicatorElement = null;

            transitionIndicatorElement = this._get_TransitionIndicatorElement();
            if (transitionIndicatorElement.length > 0) {
                transitionIndicatorElement.attr("class", "transitionIndicator-selected");
            }
            transitionIndicatorElement = null;
        },

        DeselectIndicator: function () {
            var transitionIndicatorElement = null;

            transitionIndicatorElement = this._get_TransitionIndicatorElement();
            if (transitionIndicatorElement.length > 0) {
                transitionIndicatorElement.attr("class", this.get_TargetStepID() == null ?
                    "transitionIndicator" :
                    "transitionIndicator-disabled");
            }
            transitionIndicatorElement = null;
        },
        /// #endregion Selection APIs

        dispose: function () {
        }
    };

    ProSight.WebControls.Workflows.TransitionOption.registerClass("ProSight.WebControls.Workflows.TransitionOption");

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.TransitionOption;
});