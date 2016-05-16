/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/misc.js"/>

define([
    "workflows/workflowEnums",
    "ms-ajax"
], function (WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.Step = function (options) // {eventBus, ptrToStepData, creationInfo}, where creationInfo -- optional
    {
        this._eventBus = options.eventBus;
        if (options.creationInfo != null) {
            this._step = options.ptrToStepData;
            this._AllocateAndIntializeNew(options.creationInfo);
        }
        else {
            this._step = options.ptrToStepData;
        }
    }

    // PRIVATE, STATIC
    // In a new workflow the Start and End steps will have an ID of -1 and -2 respectively.
    ProSight.WebControls.Workflows.Step._newStepID = -3;

    // PRIVATE, STATIC
    ProSight.WebControls.Workflows.Step._stepNamesAndLocation = null;

    ProSight.WebControls.Workflows.Step._get_StepNamesAndLocation = function () {
        // PRIVATE, STATIC
        /// <returns type="Object"/>

        return ProSight.WebControls.Workflows.Step._stepNamesAndLocation;
    }

    ProSight.WebControls.Workflows.Step.set_StepNamesAndLocation = function (stepNamesAndLocation) {
        // STATIC

        var stepIDs = null;
        var currentStepID = 0;
        var i = 0;

        ProSight.WebControls.Workflows.Step._stepNamesAndLocation = stepNamesAndLocation;

        stepIDs = _.keys(ProSight.WebControls.Workflows.Step._get_StepNamesAndLocation());
        // Step IDs are returned as strings -- need to convert them to an integer number.
        for (i = 0; i < stepIDs.length; i++) {
            currentStepID = parseInt(stepIDs[i], 10);
            // Ensure the ProSight.WebControls.Workflows.Step._newStepID is lower than
            // any step ID generated for new steps (a new step is initialized with a
            // negative integer as ID).
            if (currentStepID <= ProSight.WebControls.Workflows.Step._newStepID) {
                ProSight.WebControls.Workflows.Step._newStepID = (currentStepID - 1);
            }
        }
    }

    ProSight.WebControls.Workflows.Step.StepNamesAndLocationToJSON = function () {
        // STATIC

        return JSON.stringify(ProSight.WebControls.Workflows.Step._get_StepNamesAndLocation());
    }

    ProSight.WebControls.Workflows.Step.GetStepImplementation = function (options) // {eventBus, ptrToStepData, creationInfo}, where creationInfo = {ID, Name, Type} -- optional
    {
        // STATIC

        var stepType = WorkflowEnums.Workflow.StepType.TASKS;

        if (options.creationInfo != null) {
            stepType = options.creationInfo.Type;
        }
        else {
            stepType = options.ptrToStepData.Type;
        }
        switch (stepType) {
            case WorkflowEnums.Workflow.StepType.AUTOMATIC_CONDITION:
                return new ProSight.WebControls.Workflows.CategoryBasedConditionStep(options);
                break;
            case WorkflowEnums.Workflow.StepType.FINAL:
                return new ProSight.WebControls.Workflows.FinalStep(options);
                break;
            case WorkflowEnums.Workflow.StepType.INITIAL:
                return new ProSight.WebControls.Workflows.InitialStep(options);
                break;
            case WorkflowEnums.Workflow.StepType.MANUAL_CONDITION:
                return new ProSight.WebControls.Workflows.ManualConditionStep(options);
                break;
            case WorkflowEnums.Workflow.StepType.PARALLEL:
                return new ProSight.WebControls.Workflows.ParallelStep(options);
                break;
            case WorkflowEnums.Workflow.StepType.TASKS:
            default:
                return new ProSight.WebControls.Workflows.TaskStep(options);
                break;
        }
    }

    ProSight.WebControls.Workflows.Step.GetStepNameAndLocation = function (stepID) {
        // STATIC

        var stepLocation = null;

        stepLocation = ProSight.WebControls.Workflows.Step._get_StepNamesAndLocation()[stepID];

        return stepLocation != null ? stepLocation : null;
    }

    ProSight.WebControls.Workflows.Step.GetNewStepID = function () {
        // STATIC

        return ProSight.WebControls.Workflows.Step._newStepID--;
    }

    ProSight.WebControls.Workflows.Step.IsUniqueName = function (name) {
        // STATIC

        var stepIDs = null;
        var i = 0;
        var stepLocation = null;
        var isUnique = true;

        stepIDs = _.keys(ProSight.WebControls.Workflows.Step._get_StepNamesAndLocation());
        // Step IDs are returned as strings -- need to convert them to an integer number.
        for (i = 0; i < stepIDs.length; i++) {
            stepLocation = ProSight.WebControls.Workflows.Step.GetStepNameAndLocation(parseInt(stepIDs[i], 10));
            if (stepLocation.Name.toLowerCase() === name.toLowerCase()) {
                isUnique = false;
                break;
            }
        }
        return isUnique;
    }

    ProSight.WebControls.Workflows.Step.prototype =
    {
        get_ID: function () {
            return this._step.ID;
        },

        get_Scope: function () {
            return this._step.Scope;
        },

        set_Scope: function (newScope) // newScope = {ObjectID, Type}
        {
            this._step.Scope =
            {
                ObjectID: newScope.ObjectID,
                Type: newScope.Type
            };
        },

        get_Manager: function () {
            return this._step.Manager;
        },

        set_Manager: function (newManager) // newManager = {ID, Type}
        {
            this._step.Manager =
            {
                ID: newManager.ID,
                Type: newManager.Type
            }
        },

        get_Name: function () {
            return this._step.Name;
        },

        set_Name: function (newName) {
            var stepLocation = null;

            this._step.Name = newName;

            // stepNamesAndLocation cache should be updated with the new step name
            stepLocation = ProSight.WebControls.Workflows.Step.GetStepNameAndLocation(this.get_ID());
            stepLocation.Name = this._step.Name;
        },

        get_Description: function () {
            return this._step.Description;
        },

        set_Description: function (newDescription) {
            this._step.Description = newDescription;
        },

        get_Type: function () {
            return this._step.Type;
        },

        get_ErrorHandlingType: function () {
            return this._step.ErrorHandlingType;
        },

        set_ErrorHandlingType: function (newErrorHandlingType) {
            this._step.ErrorHandlingType = newErrorHandlingType;
        },

        get_DirectPredecessorIDs: function () {
            return this._step.DirectPredecessorIDs;
        },

        get_Duration: function () {
            return this._step.Duration;
        },

        set_Duration: function (value) // value = {Amount, Unit}
        {
            this._step.Duration =
            {
                Amount: value.Amount,
                Unit: value.Unit
            };
        },

        get_StepElement: function () {
            return $(_.formatString("#" + WorkflowEnums.Step.ELEMENT_ID, this.get_ID()));
        },

        MoveTo: function (column, row) {
            var result = false;

            if (this._step.Column !== column ||
                this._step.Row !== row) {
                this._step.Column = column;
                this._step.Row = row;
                result = true;
            }
            return result;
        },

        Delete: function () {
            this._Unregister();
        },

        Register: function (locationInfo) // locationInfo = {LocationType, ParentStepID, TrackIndex, InTrackIndex}
        {
            ProSight.WebControls.Workflows.Step._get_StepNamesAndLocation()[this.get_ID()] = {
                Name: this.get_Name(),
                LocationType: locationInfo.LocationType,
                ParentStepID: locationInfo.ParentStepID,
                TrackIndex: locationInfo.TrackIndex,
                InTrackIndex: locationInfo.InTrackIndex
            };
        },

        InitializeTransition: function () {
            // PROTECTED

            this._step.Transition = JSON.parse(WorkflowEnums.DataStructures.DefaultTransition);
            Array.add(
                this._get_Options(),
                ProSight.WebControls.Workflows.TransitionOption.AllocAndInitNewTransitionOptionData(0));
            this._step.Transition.CategoryTransition = null;
            this._step.Transition.Type = WorkflowEnums.Workflow.TransitionLogicType.EMPTY;
        },

        InitializeStepSpecificProperties: function () {
            //  PROTECTED, ABSTRACT
        },

        //#region Private methods
        _Unregister: function () {
            // PRIVATE

            delete ProSight.WebControls.Workflows.Step._get_StepNamesAndLocation()[this.get_ID()];
        },

        _AllocateAndIntializeNew: function (creationInfo) // creationInfo = {ID, Name, Type}
        {
            // PRIVATE

            this._step.ID = creationInfo.ID;
            this._step.Name = creationInfo.Name;
            this._step.Type = creationInfo.Type;
            this.InitializeTransition();
            this.InitializeStepSpecificProperties();
        },

        _AddHandlers: function (stepElement) {
            // PRIVATE

            stepElement.on({
                mousedown: _.bind(function (event) {
                    this._eventBus.trigger(WorkflowEnums.Events.STEP_MOUSE_DOWN, event, {
                        StepID: this.get_ID()
                    });
                }, this),
                click: _.bind(function (event) {
                    event.stopPropagation();
                    this._eventBus.trigger(WorkflowEnums.Events.STEP_CLICKED, event, {
                        StepID: this.get_ID(),
                        StepType: this.get_Type()
                    });
                }, this)
            });
        },

        _get_StepShapeElement: function () {
            return $(_.formatString("#" + WorkflowEnums.Step.SHAPE_ID, this.get_ID()));
        },
        //#endregion Private methods

        //#region Option-related APIs
        _get_Options: function () {
            // PRIVATE

            return this._step.Transition.Options;
        },

        ConnectOption: function (optionIndex, targetStepID) {
            // Create a SingleTargetTransition
            this._step.Transition.Type = WorkflowEnums.Workflow.TransitionLogicType.SINGLE_TARGET_AUTO;
            this.GetOption(0).set_TargetStepID(targetStepID);
        },

        DisconnectOption: function (optionIndex) {
            this.InitializeTransition();
        },

        GetNumberOfOptions: function () {
            return this._get_Options().length;
        },

        GetOption: function (optionIndex) {
            return new ProSight.WebControls.Workflows.TransitionOption({
                eventBus: this._eventBus,
                stepID: this.get_ID(),
                optionIndex: 0,
                optionData: this._get_Options()[0]
            });
        },

        ConnectPredecessor: function (predecessorID) {
            if (this.get_ID() !== predecessorID) {
                Array.add(this.get_DirectPredecessorIDs(), predecessorID);
            }
        },

        DisconnectPredecessor: function (predecessorID) {
            var i = 0;

            for (i = 0; i < this.get_DirectPredecessorIDs().length; i++) {
                if (this.get_DirectPredecessorIDs()[i] === predecessorID) {
                    Array.removeAt(this.get_DirectPredecessorIDs(), i);
                    break;
                }
            }
        },

        get_CanConnectToAnotherStep: function () {
            // VIRTUAL

            return true;
        },

        get_CanConnectToItself: function () {
            // VIRTUAL

            return false;
        },

        IsUniqueOptionLabel: function (optionLabel) {
            return true;
        },

        get_MaximumNumberOfOptions: function () {
            return 1;
        },
        //#endregion Option-related APIs

        //#region Rendering APIs
        _RenderStepName: function (stepElement) {
            if (stepElement.length > 0) {
                $("<div>", {
                    id: _.formatString(WorkflowEnums.Step.NAME_ID, this.get_ID()),
                    "class": this.GetStepNameCSSClass()
                }).text(this.get_Name()).appendTo(stepElement);
            }
        },

        _RenderStepShape: function (stepElement) {
            if (stepElement.length > 0) {
                $("<img>", {
                    id: _.formatString(WorkflowEnums.Step.SHAPE_ID, this.get_ID()),
                    alt: this.get_Name(),
                    src: this.GetStepShape()
                }).appendTo(stepElement);
            }
        },

        Render: function (containerElement, preferredCoordinates) // preferredCoordinates {Left, Top} -- optional
        {
            var stepElement = null;
            var stepDimensions = null;
            var stepLocation = null;
            var self = this;

            if (containerElement.length > 0) {
                // Remove the step from the diagram if it is already there.
                this.RemoveFromCanvas();

                // A DIV container of the step
                stepElement = $("<div>", {
                    id: _.formatString(WorkflowEnums.Step.ELEMENT_ID, this.get_ID()),
                    "class": "step"
                }).css({
                    left: preferredCoordinates != null ?
                        preferredCoordinates.Left :
                        this._step.Column * WorkflowEnums.Diagram.GRID_SIZE,
                    top: preferredCoordinates != null ?
                        preferredCoordinates.Top :
                        this._step.Row * WorkflowEnums.Diagram.GRID_SIZE
                }).appendTo(containerElement);

                // An image element of the step (the actual image is supplied by each step type through inheritance)
                this._RenderStepShape(stepElement);

                // A DIV container of the step's name (the actual name position inside the step is defined for each step type through inheritance)
                this._RenderStepName(stepElement);

                // Each step type modifies the generated step HTML in a unique way through inheritance
                this.SetStepSpecificVisualization(stepElement);

                // Set the height and width of the step element for drag-N-drop effects
                stepDimensions = this.get_Dimensions();
                stepElement.css({
                    height: stepDimensions.Height * WorkflowEnums.Diagram.GRID_SIZE,
                    width: stepDimensions.Width * WorkflowEnums.Diagram.GRID_SIZE
                });

                // Add onmousedown and onclick event handlers to the step
                this._AddHandlers(stepElement);

                // Setup jQuery UI draggable on steps that are direct children of a diagram.
                stepLocation = ProSight.WebControls.Workflows.Step.GetStepNameAndLocation(this.get_ID());
                if (stepLocation.LocationType === WorkflowEnums.StepLocationType.WORKFLOW) {
                    jsPlumb.draggable(stepElement, {
                        containment: "parent",
                        grid: [WorkflowEnums.Diagram.GRID_SIZE, WorkflowEnums.Diagram.GRID_SIZE],
                        opacity: 0.5,
                        snapTolerance: 1,
                        stop: function (event, ui) {
                            self._eventBus.trigger(WorkflowEnums.Events.STEP_DROPPED, event, {
                                StepID: self.get_ID(),
                                Column: Math.floor(ui.position.left / WorkflowEnums.Diagram.GRID_SIZE),
                                Row: Math.floor(ui.position.top / WorkflowEnums.Diagram.GRID_SIZE)
                            });
                        },
                        zIndex: 1000
                    });
                }
            }
            stepElement = null;
        },

        RemoveFromCanvas: function () {
            // VIRTUAL

            var stepElement = null;

            stepElement = this.get_StepElement();
            if (stepElement.length > 0) {
                stepElement.off();
                stepElement.remove();
            }
            stepElement = null;
        },

        RemoveOptionsFromCanvas: function () {
            var i = 0;

            for (i = 0; i < this.get_MaximumNumberOfOptions() ; i++) {
                ProSight.WebControls.Workflows.TransitionOption.RemoveFromCanvas(this.get_ID(), i);
            }
        },

        GetStepNameCSSClass: function () {
            // PROTECTED, ABSTRACT
        },

        GetStepShape: function () {
            // PROTECTED, ABSTRACT
        },

        GetSelectedStepShape: function () {
            // PROTECTED, VIRTUAL
        },

        SetStepSpecificVisualization: function (stepElement) {
            // PROTECTED, ABSTRACT
        },

        get_IncomingConnectionPoints: function () {
            // PROTECTED, ABSTRACT
        },

        get_OutgoingConnectionPoints: function () {
            // PROTECTED, VIRTUAL

            return this.get_IncomingConnectionPoints();
        },

        get_Dimensions: function () {
            // PROTECTED, ABSTRACT
        },
        //#endregion Rendering APIs

        //#region Selection APIs
        Select: function () {
            var shapeElement = null;

            shapeElement = this._get_StepShapeElement();
            if (shapeElement.length > 0) {
                shapeElement.attr("src", this.GetSelectedStepShape());
            }

            shapeElement = null;
        },

        Deselect: function () {
            var shapeElement = null;

            shapeElement = this._get_StepShapeElement();
            if (shapeElement.length > 0) {
                shapeElement.attr("src", this.GetStepShape());
            }

            shapeElement = null;
        },

        ScrollIntoView: function () {
            var stepElement = null;

            stepElement = this.get_StepElement();
            if (stepElement.length > 0) {
                stepElement.scrollintoview();
            }
            stepElement = null;
        },
        //#endregion Selection APIs

        ToJSON: function () {
            /// <summary>
            ///     Serializes the Step into a JSON-format string.
            /// </summary>
            /// <returns type="String">
            ///     The string that is a JSON representation of the Step.
            /// </returns>

            return JSON.stringify(this._step);
        },

        dispose: function () {
        }
    }

    ProSight.WebControls.Workflows.Step.registerClass("ProSight.WebControls.Workflows.Step");

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.Step;
});