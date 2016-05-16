/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/misc.js"/>
/// <reference path="../utils/prosight.utils.dictionary.js"/>
/// <reference path="../workflow/step.js"/>

define([
    "i18n!nls/localeStrings",
    "workflows/workflowEnums",
    "jquery.jsPlumb",
    "ms-ajax",
    "workflows/diagram/step",
    "workflows/diagram/conditionStep",
    "workflows/diagram/categoryBasedConditionStep",
    "workflows/diagram/manualConditionStep",
    "workflows/diagram/finalStep",
    "workflows/diagram/initialStep",
    "workflows/diagram/parallelStep",
    "workflows/diagram/taskStep",
    "workflows/diagram/task",
    "workflows/diagram/track",
    "workflows/diagram/transitionOption",
    "workflows/diagram/transitionRule"
], function (locale, WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.Diagram = function () {
        this._eventBus = null;
        this._workflow = null;
        this._ResetCurrentlySelectedObject();

        this._canvasZoomLevel = WorkflowEnums.ZoomLevel.PERCENT100;
        this._canvasSupportsGrid = true;
    }

    ProSight.WebControls.Workflows.Diagram.prototype =
    {
        /// #region Private methods
        _GetWorkflowStep: function (stepID, creationInfo) // creationInfo -- optional
        {
            return ProSight.WebControls.Workflows.Step.GetStepImplementation({
                eventBus: this._eventBus,
                ptrToStepData: this._get_WorkflowSteps()[stepID],
                creationInfo: creationInfo
            });
        },

        _DeleteWorkflowStep: function (stepID) {
            this._GetWorkflowStep(stepID).Delete();
            delete this._get_WorkflowSteps()[stepID];
        },

        _PrepareToDeleteByRemovingAllConnections: function (stepID) {
            var step = null;
            var predecessor = null;
            var successorID = null;
            var successor = null;
            var directPredecessorIDs = null;
            var i = 0;
            var j = 0;

            step = this._GetWorkflowStep(stepID);
            directPredecessorIDs = step.get_DirectPredecessorIDs();
            for (i = 0; i < directPredecessorIDs.length; i++) {
                predecessor = this._GetWorkflowStep(directPredecessorIDs[i]);
                for (j = 0; j < predecessor.GetNumberOfOptions() ; j++) {
                    if (predecessor.GetOption(j).get_TargetStepID() === stepID) {
                        predecessor.DisconnectOption(j);
                    }
                }
            }

            for (i = 0; i < step.GetNumberOfOptions() ; i++) {
                successorID = step.GetOption(i).get_TargetStepID();
                if (successorID != null) {
                    successor = this._GetWorkflowStep(successorID);
                    successor.DisconnectPredecessor(stepID);
                }
            }
        },

        _ApplyVisualProperties: function () {
            var canvasElement = null;
            var visualProperties = null;
            var canvasCSSClass = "";

            canvasElement = $(".diagramCanvas");
            if (canvasElement.length > 0) {
                visualProperties = this._CalculateVisualPropertiesForCurrentZoomLevel();

                if (this._canvasSupportsGrid && visualProperties.canvasHasGrid) {
                    canvasCSSClass = "diagramCanvas";
                }
                else {
                    canvasCSSClass = "diagramCanvas noGrid";
                }

                // Apply an appropriate CSS class when zooming the diagram out
                if (visualProperties.zoomCSSClass !== "") {
                    canvasCSSClass += " " + visualProperties.zoomCSSClass;
                }
                canvasElement.attr("class", canvasCSSClass);
            }
            canvasElement = null;
        },

        _CalculateVisualPropertiesForCurrentZoomLevel: function () {
            var result = null;

            result = {};
            switch (this._canvasZoomLevel) {
                case WorkflowEnums.ZoomLevel.PERCENT100:
                    result.canvasHasGrid = true;
                    result.zoomFactor = 1.0;
                    result.zoomCSSClass = "";
                    break;
                case WorkflowEnums.ZoomLevel.PERCENT75:
                    result.canvasHasGrid = false;
                    result.zoomFactor = 0.75;
                    result.zoomCSSClass = "zoom75percent";
                    break;
                case WorkflowEnums.ZoomLevel.PERCENT50:
                    result.canvasHasGrid = false;
                    result.zoomFactor = 0.5;
                    result.zoomCSSClass = "zoom50percent";
                    break;
                case WorkflowEnums.ZoomLevel.PERCENT25:
                    result.canvasHasGrid = false;
                    result.zoomFactor = 0.25;
                    result.zoomCSSClass = "zoom25percent";
                    break;
                case WorkflowEnums.ZoomLevel.PERCENT15:
                    result.canvasHasGrid = false;
                    result.zoomFactor = 0.15;
                    result.zoomCSSClass = "zoom15percent";
                    break;
                default:
                    break;
            }
            return result;
        },

        _AddHandlersToCanvas: function (canvasElement) {
            canvasElement.on({
                click: _.bind(function (event) {
                    event.stopPropagation();
                    this._eventBus.trigger(WorkflowEnums.Events.CANVAS_CLICKED, {
                        domEvent: event
                    });
                }, this)
            });
        },

        _CreateServiceElements: function (canvasElement) {
            var centerAnchor = null;

            // The element is used to scroll the diagram viewport to the center
            centerAnchor = $("<div>", {
                id: WorkflowEnums.Diagram.CENTER_ANCHOR_ELEMENT_ID
            }).css({
                left: (WorkflowEnums.Diagram.CANVAS_WIDTH + this._get_CanvasViewportDimensions().Width) / 2,
                top: 0
            }).appendTo(canvasElement);

            centerAnchor = null;
        },

        _RemoveServiceElementsFromCanvas: function () {
            var centerAnchor = null;

            // Remove the center anchor element
            centerAnchor = $("#" + WorkflowEnums.Diagram.CENTER_ANCHOR_ELEMENT_ID);
            if (centerAnchor.length > 0) {
                centerAnchor.remove();
            }

            centerAnchor = null;
        },

        _RemoveStepFromCanvas: function (stepID) {
            var step = null;

            // Remove step option(s)
            this._RemoveStepOptionsFromCanvas(stepID);
            step = this._GetWorkflowStep(stepID);
            step.RemoveFromCanvas();
        },

        _RemoveStepOptionsFromCanvas: function (stepID) {
            var step = null;

            step = this._GetWorkflowStep(stepID);
            step.RemoveOptionsFromCanvas();
        },

        _ResetCurrentlySelectedObject: function () {
            this._currentlySelectedObject = {
                Type: WorkflowEnums.Diagram.SelectedObjectType.NONE
            };
        },

        _DeselectStep: function () {
            var step = null;
            var stepLocation = null;

            if (this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.STEP) {
                stepLocation = ProSight.WebControls.Workflows.Step.GetStepNameAndLocation(this._currentlySelectedObject.StepID);
                if (stepLocation.LocationType === WorkflowEnums.StepLocationType.WORKFLOW) {
                    step = this._GetWorkflowStep(this._currentlySelectedObject.StepID);
                }
                else if (stepLocation.LocationType === WorkflowEnums.StepLocationType.TRACK) {
                    step = this._GetWorkflowStep(stepLocation.ParentStepID).GetTrack(stepLocation.TrackIndex).GetStep(stepLocation.InTrackIndex);
                }
                step.Deselect();
                this._ResetCurrentlySelectedObject();
            }
        },

        _DeselectParallelStepTrackLineSegment: function () {
            var step = null;

            if (this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.PARALLEL_STEP_TRACK_LINE_SEGMENT) {
                // It is expected to have a ParallelStep instance here.
                step = this._GetWorkflowStep(this._currentlySelectedObject.StepID);
                step.DeselectTrackLineSegment(
                    this._currentlySelectedObject.TrackIndex,
                    this._currentlySelectedObject.SegmentIndex);
                this._ResetCurrentlySelectedObject();
            }
        },

        _DeselectTransitionIndicator: function () {
            var step = null;

            if (this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.TRANSITION_INDICATOR) {
                step = this._GetWorkflowStep(this._currentlySelectedObject.StepID);
                step.GetOption(this._currentlySelectedObject.OptionIndex).DeselectIndicator();
                this._ResetCurrentlySelectedObject();
            }
        },

        _DeselectTransitionOption: function () {
            var step = null;

            if (this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.TRANSITION_OPTION) {
                step = this._GetWorkflowStep(this._currentlySelectedObject.StepID);
                step.GetOption(this._currentlySelectedObject.OptionIndex).Deselect();
                this._ResetCurrentlySelectedObject();
            }
        },

        _DeselectAll: function () {
            this._DeselectParallelStepTrackLineSegment();
            this._DeselectTransitionIndicator();
            this._DeselectTransitionOption();
            this._DeselectStep();
        },

        _RenderStepOptions: function (stepID) {
            var step = null;
            var successorID = null;
            var successor = null;
            var currentOption = null;
            var i = 0;

            step = this._GetWorkflowStep(stepID);
            if (step.get_CanConnectToAnotherStep()) {
                // The following function ensures that any previously removed options
                // will no longer be drawn on the canvas. Subsequent rendering will draw
                // only those options that still exist.
                this._RemoveStepOptionsFromCanvas(stepID);

                // Iterate over the list of step�s options in a reverse order.
                // This is done, to let active transition indicator elements
                // with a smaller transition option index be displayed on top
                // of those active transition indicator elements with a greater transition option index.
                for (i = (step.GetNumberOfOptions() - 1) ; i >= 0 ; i--) {
                    currentOption = step.GetOption(i);
                    successorID = currentOption.get_TargetStepID();
                    if (successorID != null) {
                        successor = this._GetWorkflowStep(successorID);
                    }
                    else {
                        successor = null;
                    }
                    currentOption.RenderConnection(step, successor);
                }
            }
        },

        _DeleteStep: function (stepID) {
            var stepLocation = null;
            var directPredecessorIDs = null;
            var i = 0;

            stepLocation = ProSight.WebControls.Workflows.Step.GetStepNameAndLocation(stepID);
            if (stepLocation.LocationType === WorkflowEnums.StepLocationType.WORKFLOW) {
                directPredecessorIDs = this._GetWorkflowStep(stepID).get_DirectPredecessorIDs();
                this._PrepareToDeleteByRemovingAllConnections(stepID);
                // Re-render options of any predecessors
                for (i = 0; i < directPredecessorIDs.length; i++) {
                    this._RenderStepOptions(directPredecessorIDs[i]);
                }

                this._RemoveStepFromCanvas(stepID);
                this._DeleteWorkflowStep(stepID);
            }
            else if (stepLocation.LocationType === WorkflowEnums.StepLocationType.TRACK) {
                this._GetWorkflowStep(stepLocation.ParentStepID).GetTrack(stepLocation.TrackIndex).DeleteStep(stepLocation.InTrackIndex);
                this.RenderStep(stepLocation.ParentStepID);
            }
        },

        _GetUniqueNumberForStepType: function (stepType) {
            /// <returns type="Number" integer="true" />

            var stepIDs = null;
            var i = 0;
            var j = 0;
            var step = null;
            var counts = null;

            // Initialize counters for every countable step type.
            // Initial and Final steps are not accounted for, as there is no way to add new steps of those types.
            counts = [];
            counts[WorkflowEnums.Workflow.StepType.AUTOMATIC_CONDITION] = 0;
            counts[WorkflowEnums.Workflow.StepType.MANUAL_CONDITION] = 0;
            counts[WorkflowEnums.Workflow.StepType.PARALLEL] = 0;
            counts[WorkflowEnums.Workflow.StepType.TASKS] = 0;

            // Step IDs are returned as strings -- need to convert them to an integer number.
            stepIDs = _.keys(this._get_WorkflowSteps());
            for (i = 0; i < stepIDs.length; i++) {
                step = this._GetWorkflowStep(parseInt(stepIDs[i], 10));
                switch (step.get_Type()) {
                    case WorkflowEnums.Workflow.StepType.AUTOMATIC_CONDITION:
                    case WorkflowEnums.Workflow.StepType.MANUAL_CONDITION:
                        // Category-based decision and Manual decision steps are counted together
                        counts[WorkflowEnums.Workflow.StepType.AUTOMATIC_CONDITION] += 1;
                        counts[WorkflowEnums.Workflow.StepType.MANUAL_CONDITION] += 1;
                        break;
                    case WorkflowEnums.Workflow.StepType.PARALLEL:
                        // When counting a Parallel step -- Task steps counter is advanced to include the total number    
                        // of its inner steps.
                        counts[WorkflowEnums.Workflow.StepType.PARALLEL] += 1;
                        for (j = 0; j < step.GetNumberOfTracks() ; j++) {
                            counts[WorkflowEnums.Workflow.StepType.TASKS] += step.GetTrack(j).GetNumberOfSteps();
                        }
                        break;
                    case WorkflowEnums.Workflow.StepType.TASKS:
                        counts[WorkflowEnums.Workflow.StepType.TASKS] += 1;
                        break;
                    default:
                        break;
                }
            }

            return (counts[stepType] + 1);
        },

        _GetUniqueNameForStepByStepType: function (stepType) {
            var nameTemplate = "";
            var name = "";
            var i = 0;

            switch (stepType) {
                case WorkflowEnums.Workflow.StepType.AUTOMATIC_CONDITION:
                    nameTemplate = locale.label.workflows.default_category_based_decision_step_name;
                    break;
                case WorkflowEnums.Workflow.StepType.MANUAL_CONDITION:
                    nameTemplate = locale.label.workflows.default_manual_decision_step_name;
                    break;
                case WorkflowEnums.Workflow.StepType.PARALLEL:
                    nameTemplate = locale.label.workflows.default_parallel_step_name;
                    break;
                case WorkflowEnums.Workflow.StepType.TASKS:
                    nameTemplate = locale.label.workflows.default_task_step_name;
                    break;
                default:
                    break;
            }

            for (i = this._GetUniqueNumberForStepType(stepType) ; i < Number.MAX_VALUE; i++) {
                name = _.formatString(nameTemplate, i);
                if (this.IsUniqueStepName(name)) {
                    break;
                }
            }

            return name;
        },

        _GetViewportCenterCoordinates: function () {
            var canvasContainerElement = null;
            var coordinates = null;
            var visualProperties = null;

            coordinates = {
                Column: 1,
                Row: 1
            };
            canvasContainerElement = $(".diagramContainer");
            // canvasContainerElement.scrollLeft and canvasContainerElement.scrollTop return values in pixels.
            // Then, the pixel coordinates of the center of viewport are converted to cells.
            if (canvasContainerElement.length > 0) {
                coordinates.Column = Math.floor(
                    (canvasContainerElement.scrollLeft() + (this._get_CanvasViewportDimensions().Width / 2)) / WorkflowEnums.Diagram.GRID_SIZE);
                coordinates.Row = Math.max(
                    Math.floor((canvasContainerElement.scrollTop() + (this._get_CanvasViewportDimensions().Height / 2)) / WorkflowEnums.Diagram.GRID_SIZE),
                    1);
                visualProperties = this._CalculateVisualPropertiesForCurrentZoomLevel();
                coordinates.Column = Math.floor(coordinates.Column / visualProperties.zoomFactor);
                coordinates.Row = Math.floor(coordinates.Row / visualProperties.zoomFactor);
            }
            canvasContainerElement = null;
            return coordinates;
        },

        _ConnectSteps: function (predecessorID, predecessorTransitionOptionIndex, successorID) {
            var predecessor = null;
            var successor = null;
            var oldSuccessorID = null;

            predecessor = this._GetWorkflowStep(predecessorID);
            oldSuccessorID = predecessor.GetOption(predecessorTransitionOptionIndex).get_TargetStepID();
            if (successorID !== oldSuccessorID) {
                // Disconnect an old connection, if any
                if (oldSuccessorID != null) {
                    this._DisconnectSteps(predecessorID, predecessorTransitionOptionIndex);
                }

                successor = this._GetWorkflowStep(successorID);

                predecessor.ConnectOption(predecessorTransitionOptionIndex, successorID);
                successor.ConnectPredecessor(predecessorID);
            }
        },

        _DisconnectSteps: function (predecessorID, predecessorTransitionOptionIndex) {
            var predecessor = null;
            var successor = null;
            var successorID = null;

            predecessor = this._GetWorkflowStep(predecessorID);
            successorID = predecessor.GetOption(predecessorTransitionOptionIndex).get_TargetStepID();
            if (successorID != null) {
                successor = this._GetWorkflowStep(successorID);

                predecessor.DisconnectOption(predecessorTransitionOptionIndex);
                successor.DisconnectPredecessor(predecessorID);
            }
        },

        _get_CanvasViewportDimensions: function () {
            var result = {
                Height: 0,
                Width: 0
            };
            var canvasContainerElement = null;

            canvasContainerElement = $(".diagramContainer");
            if (canvasContainerElement.length > 0) {
                result.Height = canvasContainerElement.height();
                result.Width = canvasContainerElement.width();
            }
            canvasContainerElement = null;
            return result;
        },

        _get_WorkflowSteps: function () {
            return this._workflow.Steps;
        },
        /// #endregion Private methods

        Initialize: function (options) {
            this._workflow = options.workflow;
            this._eventBus = options.eventBus;
            ProSight.WebControls.Workflows.Step.set_StepNamesAndLocation(this._workflow.StepsVisualProperties);
        },

        GetStep: function (stepID) {
            var stepLocation = null;
            var step = null;

            stepLocation = ProSight.WebControls.Workflows.Step.GetStepNameAndLocation(stepID);
            if (stepLocation.LocationType === WorkflowEnums.StepLocationType.WORKFLOW) {
                step = this._GetWorkflowStep(stepID);
            }
            else if (stepLocation.LocationType === WorkflowEnums.StepLocationType.TRACK) {
                step = this._GetWorkflowStep(stepLocation.ParentStepID).GetTrack(stepLocation.TrackIndex).GetStep(stepLocation.InTrackIndex);
            }

            return step;
        },

        AddStep: function (stepType) {
            var step = null;
            var creationInfo = {};
            var viewportCenterCoordinates = null;

            creationInfo.ID = ProSight.WebControls.Workflows.Step.GetNewStepID();
            creationInfo.Name = this._GetUniqueNameForStepByStepType(stepType);
            creationInfo.Type = stepType;

            // If a Parallel step's track line segment (that allows insertion of a step) was highlighted
            // -- the new step is added as the inner step to that Parallel step.
            if (this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.PARALLEL_STEP_TRACK_LINE_SEGMENT) {
                if (this._currentlySelectedObject.AllowsInsertion) {
                    // It is expected to have a ParallelStep instance here.
                    this._GetWorkflowStep(this._currentlySelectedObject.StepID).
                        GetTrack(this._currentlySelectedObject.TrackIndex).
                        InsertStepAt(
                            creationInfo,
                            this._currentlySelectedObject.SegmentIndex);
                }
            }
                // Otherwise -- the new step is added on the WF level.
            else {
                this._get_WorkflowSteps()[creationInfo.ID] = JSON.parse(WorkflowEnums.DataStructures.DefaultStep);
                step = this._GetWorkflowStep(creationInfo.ID, creationInfo);
                step.Register({
                    LocationType: WorkflowEnums.StepLocationType.WORKFLOW,
                    ParentStepID: 0,
                    TrackIndex: 0,
                    InTrackIndex: 0
                });
                // Get the coordinates of the center of viewport
                viewportCenterCoordinates = this._GetViewportCenterCoordinates();
                // Adjust the coordinates so the center of the step is aligned with the center of viewport
                viewportCenterCoordinates.Column -= (step.get_Dimensions().Width / 2);
                viewportCenterCoordinates.Row -= (step.get_Dimensions().Height / 2);
                step.MoveTo(viewportCenterCoordinates.Column, viewportCenterCoordinates.Row);
            }

            return creationInfo.ID;
        },

        IsUniqueStepName: function (stepName) {
            return ProSight.WebControls.Workflows.Step.IsUniqueName(stepName);
        },

        IsUniqueTrackNameForStep: function (stepID, trackName) {
            // It is expected to have a ParallelStep instance here.
            return this._GetWorkflowStep(stepID).IsUniqueTrackName(trackName);
        },

        IsUniqueTransitionOptionLabelForStep: function (stepID, transitionOptionLabel) {
            return this._GetWorkflowStep(stepID).IsUniqueOptionLabel(transitionOptionLabel);
        },

        DeleteSelectedObject: function () {
            var stepID = null;
            var optionIndex = null;
            var wasDeleted = true;

            // Deleting a step
            if (this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.STEP) {
                if (confirm(locale.label.workflows.remove_step_confirmation_message)) {
                    stepID = this._currentlySelectedObject.StepID;

                    // Deletion is performed on the currently selected step.
                    // Deselecting of any diagram element would ensure we do not
                    // keep track of non-existing elements.
                    this._DeselectAll();

                    this._DeleteStep(stepID);
                }
                else {
                    wasDeleted = false;
                }
            }
                // Deleting (disconnecting) a transition option
            else if (this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.TRANSITION_OPTION) {
                stepID = this._currentlySelectedObject.StepID;
                optionIndex = this._currentlySelectedObject.OptionIndex;

                // Deletion is performed on the currently selected transition option.
                // Deselecting of any diagram element would ensure we do not
                // keep track of non-existing elements.
                this._DeselectAll();

                this._DisconnectSteps(
                    stepID,
                    optionIndex);
                this._RenderStepOptions(stepID);
            }
            return wasDeleted;
        },

        MoveStepTo: function (stepID, column, row) {
            /// <summary>
            ///     Updates the data model to reflect a step was moved to the new Column and Row coordinates.
            /// </summary>
            /// <param name="stepID" type="Number" integer="true">
            ///     The ID of the step that was moved.
            /// </param>
            /// <param name="column" type="Number" integer="true">
            ///     The new horizontal screen position of the step, in grid squares.
            /// </param>
            /// <param name="row" type="Number" integer="true">
            ///     The new vertical screen position of the step, in grid squares.
            /// </param>
            /// <returns type="Boolean">
            ///     True if the step has moved, False -- otherwise.
            /// </returns>

            var step = null;
            var result = false;

            step = this._GetWorkflowStep(stepID);
            result = step.MoveTo(column, row);
            return result;
        },

        ToJSON: function () {
            return JSON.stringify(this._workflow);
        },

        StepNamesAndLocationToJSON: function () {
            return ProSight.WebControls.Workflows.Step.StepNamesAndLocationToJSON();
        },

        set_CanvasSupportsGrid: function (supportsGrid) {
            this._canvasSupportsGrid = (supportsGrid === true);
        },

        ZoomTo: function (zoomLevel) {
            var centerAnchor = null;

            this._canvasZoomLevel = zoomLevel;
            this._ApplyVisualProperties();

            // If there is a selected step -- bring it into view...
            if (this.get_AnyStepSelected()) {
                this.ScrollStepIntoView(this.get_SelectedStep());
            }
                // If there is a selected parallel step track instead -- bring its parent step into view...
            else if (this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.PARALLEL_STEP_TRACK_LINE_SEGMENT) {
                this.ScrollStepIntoView(this._currentlySelectedObject.StepID);
            }
                // If there is a selected transition indicator instead -- bring its source step into view...
            else if (this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.TRANSITION_INDICATOR) {
                this.ScrollStepIntoView(this._currentlySelectedObject.StepID);
            }
                // If there is a selected transition option instead -- bring its source step into view...
            else if (this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.TRANSITION_OPTION) {
                this.ScrollStepIntoView(this._currentlySelectedObject.StepID);
            }
                // Otherwise, center the diagram...
            else {
                centerAnchor = $("#" + WorkflowEnums.Diagram.CENTER_ANCHOR_ELEMENT_ID);
                if (centerAnchor.length > 0) {
                    centerAnchor.scrollintoview();
                }
            }
            centerAnchor = null;
        },

        ClearCanvas: function () {
            var stepIDs = null;
            var i = 0;
            var canvasElement = null;

            canvasElement = $(".diagramCanvas");
            if (canvasElement.length > 0) {
                this._RemoveServiceElementsFromCanvas();

                // Step IDs are returned as strings -- need to convert them to an integer number.
                stepIDs = _.keys(this._get_WorkflowSteps());
                // Remove step option(s) in a separate cycle as each pair of connected steps must still be present on the canvas.
                for (i = 0; i < stepIDs.length; i++) {
                    this._RemoveStepOptionsFromCanvas(parseInt(stepIDs[i], 10));
                }
                // Remove all the diagram steps
                for (i = 0; i < stepIDs.length; i++) {
                    this._RemoveStepFromCanvas(parseInt(stepIDs[i], 10));
                }

                // Clean up of jsPlumb
                jsPlumb.unmakeEverySource();
                jsPlumb.unmakeEveryTarget();
                jsPlumb.reset();

                // Ensure there are no canvas' event handlers left
                canvasElement.off();
            }
            canvasElement = null;
        },

        RenderAll: function () {
            var canvasContainerElement = null;
            var canvasElement = null;
            var i = 0;
            var stepIDs = null;

            // Erase the contents of the canvas to ensure the new contents won't be place on top of the old one
            this.ClearCanvas();

            canvasContainerElement = $(".diagramContainer");
            canvasElement = $(".diagramCanvas");
            if (canvasContainerElement.length > 0 && canvasElement.length > 0) {
                // Add onclick event handler to the canvas
                this._AddHandlersToCanvas(canvasElement);

                // Set the canvas dimensions
                canvasElement.css({
                    height: WorkflowEnums.Diagram.CANVAS_HEIGHT,
                    width: WorkflowEnums.Diagram.CANVAS_WIDTH
                });

                this._CreateServiceElements(canvasElement);

                // Zoom the diagram to the current zoom level
                this.ZoomTo(this._canvasZoomLevel);
            }

            // Step IDs are returned as strings -- need to convert them to an integer number.
            stepIDs = _.keys(this._get_WorkflowSteps());
            for (i = 0; i < stepIDs.length; i++) {
                this.RenderStep(parseInt(stepIDs[i], 10));
            }
            // Render step option(s) in a separate cycle as each pair of connected steps must already be rendered on the canvas beforehand.
            for (i = 0; i < stepIDs.length; i++) {
                this._RenderStepOptions(parseInt(stepIDs[i], 10));
            }

            canvasContainerElement = null;
            canvasElement = null;
        },

        RenderStep: function (stepID) {
            var step = null;
            var parentStep = null;
            var stepLocation = null;
            var canvasElement = null;

            canvasElement = $(".diagramCanvas");
            if (canvasElement.length > 0) {
                stepLocation = ProSight.WebControls.Workflows.Step.GetStepNameAndLocation(stepID);
                if (stepLocation.LocationType === WorkflowEnums.StepLocationType.WORKFLOW) {
                    step = this._GetWorkflowStep(stepID);
                    step.Render(canvasElement);
                    // Render step option(s)
                    this._RenderStepOptions(stepID);
                }
                else {
                    parentStep = this._GetWorkflowStep(stepLocation.ParentStepID);
                    step = parentStep.GetTrack(stepLocation.TrackIndex).GetStep(stepLocation.InTrackIndex);
                    parentStep.Render(canvasElement);
                    // Render step option(s)
                    this._RenderStepOptions(stepLocation.ParentStepID);
                }

                // Rendering a step will set it to a deselected state.
                // When re-rendering a currently selected step
                // we do not want to lose the highlight on that step.
                if (this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.STEP &&
                    this._currentlySelectedObject.StepID === stepID) {
                    step.Select();
                }
            }
            canvasElement = null;
        },

        SelectStep: function (stepID) {
            /// <returns type="Boolean">
            ///     True if a transition option was connected during step selection, False -- otherwise.
            /// </returns>

            var step = null;
            var stepLocation = null;
            var transitionOptionWasConnected = false;

            if (this._currentlySelectedObject.Type !== WorkflowEnums.Diagram.SelectedObjectType.STEP ||
                this._currentlySelectedObject.StepID !== stepID) {
                stepLocation = ProSight.WebControls.Workflows.Step.GetStepNameAndLocation(stepID);
                if (stepLocation.LocationType === WorkflowEnums.StepLocationType.WORKFLOW) {
                    step = this._GetWorkflowStep(stepID);
                    // If a transition indicator was selected (and it is allowed to be connected)
                    // -- we need to try to connect the step being selected
                    // to the parent step of that transition indicator.
                    if (this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.TRANSITION_INDICATOR &&
                        this._currentlySelectedObject.CanConnect &&
                        (this._currentlySelectedObject.StepID !== stepID || step.get_CanConnectToItself())) {
                        this._ConnectSteps(
                            this._currentlySelectedObject.StepID,
                            this._currentlySelectedObject.OptionIndex,
                            stepID);
                        this._RenderStepOptions(this._currentlySelectedObject.StepID);
                        transitionOptionWasConnected = true;
                    }

                }
                else if (stepLocation.LocationType === WorkflowEnums.StepLocationType.TRACK) {
                    step = this._GetWorkflowStep(stepLocation.ParentStepID).GetTrack(stepLocation.TrackIndex).GetStep(stepLocation.InTrackIndex);
                }
                this._DeselectAll();
                this._currentlySelectedObject = {
                    Type: WorkflowEnums.Diagram.SelectedObjectType.STEP,
                    StepID: stepID
                };
                step.Select();
            }
            return transitionOptionWasConnected;
        },

        ScrollStepIntoView: function (stepID) {
            var step = null;
            var stepLocation = null;

            stepLocation = ProSight.WebControls.Workflows.Step.GetStepNameAndLocation(stepID);
            if (stepLocation.LocationType === WorkflowEnums.StepLocationType.WORKFLOW) {
                step = this._GetWorkflowStep(stepID);
            }
            else if (stepLocation.LocationType === WorkflowEnums.StepLocationType.TRACK) {
                step = this._GetWorkflowStep(stepLocation.ParentStepID);
            }
            step.ScrollIntoView();
        },

        SelectCanvas: function () {
            this._DeselectAll();
        },

        SelectParallelStepTrackLineSegment: function (stepID, trackIndex, segmentIndex, allowInsertion) {
            if (this._currentlySelectedObject.Type !== WorkflowEnums.Diagram.SelectedObjectType.PARALLEL_STEP_TRACK_LINE_SEGMENT ||
                this._currentlySelectedObject.StepID !== stepID ||
                this._currentlySelectedObject.TrackIndex !== trackIndex ||
                this._currentlySelectedObject.SegmentIndex !== segmentIndex) {
                this._DeselectAll();
                this._currentlySelectedObject = {
                    Type: WorkflowEnums.Diagram.SelectedObjectType.PARALLEL_STEP_TRACK_LINE_SEGMENT,
                    StepID: stepID,
                    TrackIndex: trackIndex,
                    SegmentIndex: segmentIndex,
                    AllowsInsertion: allowInsertion
                };
                // It is expected to have a ParallelStep instance here.
                this._GetWorkflowStep(stepID).SelectTrackLineSegment(trackIndex, segmentIndex);
            }
        },

        SelectTransitionIndicator: function (stepID, optionIndex, allowConnection) {
            if (this._currentlySelectedObject.Type !== WorkflowEnums.Diagram.SelectedObjectType.TRANSITION_INDICATOR ||
                    this._currentlySelectedObject.StepID !== stepID ||
                    this._currentlySelectedObject.OptionIndex !== optionIndex) {
                this._DeselectAll();
                this._currentlySelectedObject = {
                    Type: WorkflowEnums.Diagram.SelectedObjectType.TRANSITION_INDICATOR,
                    StepID: stepID,
                    OptionIndex: optionIndex,
                    CanConnect: allowConnection
                };
                this._GetWorkflowStep(stepID).GetOption(optionIndex).SelectIndicator();
            }
        },

        SelectTransitionOption: function (stepID, optionIndex, allowReconnection) {
            if (this._currentlySelectedObject.Type !== WorkflowEnums.Diagram.SelectedObjectType.TRANSITION_OPTION ||
                this._currentlySelectedObject.StepID !== stepID ||
                this._currentlySelectedObject.OptionIndex !== optionIndex) {
                this._DeselectAll();
                this._currentlySelectedObject = {
                    Type: WorkflowEnums.Diagram.SelectedObjectType.TRANSITION_OPTION,
                    StepID: stepID,
                    OptionIndex: optionIndex,
                    CanReconnect: allowReconnection
                };
                this._GetWorkflowStep(stepID).GetOption(optionIndex).Select();
            }
        },

        get_AnyStepSelected: function () {
            return this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.STEP;
        },

        get_SelectedStep: function () {
            return this._currentlySelectedObject.Type === WorkflowEnums.Diagram.SelectedObjectType.STEP ?
                this._currentlySelectedObject.StepID :
                null;
        },

        get_ID: function () {
            return this._workflow.ID;
        },

        get_Name: function () {
            return this._workflow.Name;
        },

        set_Name: function (value) {
            this._workflow.Name = value;
        },

        get_Description: function () {
            return this._workflow.Description;
        },

        set_Description: function (value) {
            this._workflow.Description = value;
        },

        get_HasInstances: function () {
            return this._workflow.HasInstances;
        },

        get_IsEnabled: function () {
            return this._workflow.IsEnabled;
        },

        set_IsEnabled: function (value) {
            this._workflow.IsEnabled = value;
        },

        get_Manager: function () {
            return this._workflow.Manager;
        },

        set_Manager: function (value) // value = {ID, Type}
        {
            this._workflow.Manager =
            {
                ID: value.ID,
                Type: value.Type
            }
        },

        get_AlternativeManagers: function () {
            return this._workflow.AlternativeManagers;
        },

        set_AlternativeManagers: function (value) // value = {GroupID, Type}
        {
            this._workflow.AlternativeManagers =
            {
                GroupID: value.GroupID,
                Type: value.Type
            }
        },

        get_AuthorizingUserCanAccessAllData: function () {
            return this._workflow.AuthorizingUserCanAccessAllData;
        },

        set_AuthorizingUserCanAccessAllData: function (value) {
            this._workflow.AuthorizingUserCanAccessAllData = value;
        },

        get_AuthorizingUserID: function () {
            return this._workflow.AuthorizingUserID;
        },

        set_AuthorizingUserID: function (value) {
            this._workflow.AuthorizingUserID = value;
        },

        get_OwnerID: function () {
            return this._workflow.OwnerID;
        },

        set_OwnerID: function (value) {
            this._workflow.OwnerID = value;
        },

        get_Scope: function () {
            return this._workflow.Scope;
        },

        set_Scope: function (value) // value = {ObjectID, Type}
        {
            this._workflow.Scope =
            {
                ObjectID: value.ObjectID,
                Type: value.Type
            };
        },

        get_Duration: function () {
            return this._workflow.Duration;
        },

        set_Duration: function (value) // value = {Amount, Unit}
        {
            this._workflow.Duration =
            {
                Amount: value.Amount,
                Unit: value.Unit
            };
        },

        get_SecurityResult: function () {
            return this._workflow.SecurityResult;
        },

        dispose: function () {
        }
    }

    ProSight.WebControls.Workflows.Diagram.registerClass("ProSight.WebControls.Workflows.Diagram");

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.Diagram;
});