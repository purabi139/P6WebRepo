/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/accessibilityclient.aspx"/>
/// <reference path="../utils/misc.js"/>
/// <reference path="../workflow/track.js"/>

define([
    "underscore", "i18n!nls/localeStrings",
    "workflows/diagram/step",
    "workflows/workflowEnums"
], function (_, locale, Step, WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.ParallelStep = function (options) // {eventBus, ptrToStepData, creationInfo}, where creationInfo -- optional
    {
        ProSight.WebControls.Workflows.ParallelStep.initializeBase(this, [options]);
    }

    ProSight.WebControls.Workflows.ParallelStep.prototype =
    {
        Delete: function () {
            // OVERRIDE

            while (this.GetNumberOfTracks() > 0) {
                this.DeleteTrack(0);
            }
            ProSight.WebControls.Workflows.ParallelStep.callBaseMethod(this, "Delete");
        },

        InitializeStepSpecificProperties: function () {
            // PROTECTED, OVERRIDE

            this._step.Tracks = [
                ProSight.WebControls.Workflows.Track.AllocAndInitNewTrackData(0),
                ProSight.WebControls.Workflows.Track.AllocAndInitNewTrackData(1)
            ];
        },

        // Track-related APIs
        _get_Tracks: function () {
            //PRIVATE

            return this._step.Tracks;
        },

        AddTrack: function () {
            var newTrack = null;
            var newName = "";

            newName = this._GetUniqueNameForTrack();
            Array.add(
                this._get_Tracks(),
                ProSight.WebControls.Workflows.Track.AllocAndInitNewTrackData(this.GetNumberOfTracks()));
            newTrack = this.GetTrack(this.GetNumberOfTracks() - 1);

            newTrack.set_Name(newName);
            this._RefreshTrackSteps();
            return newTrack;
        },

        DeleteTrack: function (trackIndex) {
            this.GetTrack(trackIndex).Delete();
            Array.removeAt(this._get_Tracks(), trackIndex);
            this._RefreshTrackSteps();
        },

        GetTrack: function (trackIndex) {
            return new ProSight.WebControls.Workflows.Track({
                eventBus: this._eventBus,
                parentStepID: this.get_ID(),
                trackIndex: trackIndex,
                trackData: this._get_Tracks()[trackIndex]
            });
        },

        GetNumberOfTracks: function () {
            return this._get_Tracks().length;
        },

        IsUniqueTrackName: function (trackName) {
            var i = 0;
            var isUnique = true;

            for (i = 0; i < this.GetNumberOfTracks() ; i++) {
                if (this.GetTrack(i).get_Name().toLowerCase() === trackName.toLowerCase()) {
                    isUnique = false;
                    break;
                }
            }
            return isUnique;
        },

        _GetUniqueNameForTrack: function () {
            //PRIVATE

            var name = "";
            var i = 0;

            for (i = this.GetNumberOfTracks() + 1; i < Number.MAX_VALUE; i++) {
                name = _.formatString(locale.label.workflows.default_track_name, i);
                if (this.IsUniqueTrackName(name)) {
                    break;
                }
            }
            return name;
        },

        _RefreshTrackSteps: function () {
            //PRIVATE

            var i = 0;

            for (i = 0; i < this.GetNumberOfTracks() ; i++) {
                this.GetTrack(i).StepLocation_Changed();
            }
        },
        // End of Track-related APIs

        /// #region Rendering APIs
        RemoveFromCanvas: function () {
            // OVERRIDE

            var i = 0;
            var j = 0;
            var track = null;
            var trackLineElement = null;

            for (i = 0; i < this.GetNumberOfTracks() ; i++) {
                track = this.GetTrack(i);
                for (j = 0; j < track.GetNumberOfSteps() ; j++) {
                    track.GetStep(j).RemoveFromCanvas();
                }
            }

            // Clear event handlers of the track lines
            for (i = 0; i < this.GetNumberOfTracks() ; i++) {
                track = this.GetTrack(i);
                for (j = 0; j < track.GetNumberOfSteps() + 1; j++) {
                    trackLineElement = $(_.formatString(
                        "#" + WorkflowEnums.ParallelStep.LINE_SEGMENT_ID,
                        this.get_ID(),
                        i,
                        j));
                    if (trackLineElement.length > 0) {
                        trackLineElement.off();
                    }
                    trackLineElement = null;
                }
            }

            ProSight.WebControls.Workflows.ParallelStep.callBaseMethod(this, "RemoveFromCanvas");
        },

        GetStepNameCSSClass: function () {
            // PROTECTED, OVERRIDE

            return "parallelStepName";
        },

        GetStepShape: function () {
            // PROTECTED, OVERRIDE

            var parallelShapes = [
                "",
                "",
                _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "parallelStep-2-Tracks.png"),
                _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "parallelStep-3-Tracks.png"),
                _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "parallelStep-4-Tracks.png"),
                _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "parallelStep-5-Tracks.png")
            ];

            return parallelShapes[this.GetNumberOfTracks()];
        },

        GetSelectedStepShape: function () {
            // PROTECTED, OVERRIDE

            var parallelShapes = [
                "",
                "",
                _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "parallelStep-2-Tracks-Selected.png"),
                _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "parallelStep-3-Tracks-Selected.png"),
                _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "parallelStep-4-Tracks-Selected.png"),
                _.formatString(WorkflowEnums.Diagram.WORKFLOW_IMAGE_PATH, "parallelStep-5-Tracks-Selected.png")
            ];

            return parallelShapes[this.GetNumberOfTracks()];
        },

        SetStepSpecificVisualization: function (stepElement) {
            // PROTECTED, OVERRIDE

            var i = 0;

            // Set track names
            this._RenderTrackNames(stepElement);

            // Render track lanes
            this._RenderTrackLanes(stepElement);

            // Render track steps
            for (i = 0; i < this.GetNumberOfTracks() ; i++) {
                this._RenderTrackSteps(stepElement, i);
            }

            // Render track lines
            for (i = 0; i < this.GetNumberOfTracks() ; i++) {
                this._RenderTrackLines(stepElement, i);
            }
        },

        get_IncomingConnectionPoints: function () {
            // PROTECTED, OVERRIDE

            var pixelHeight = 0;
            var gridHeight = 0;

            pixelHeight = WorkflowEnums.ParallelStep.HEADER_HEIGHT + (this._GetTracksHeight() + 2); // Adding 2 allows a CSS border of 2px height.
            gridHeight = Math.floor(pixelHeight / WorkflowEnums.Diagram.GRID_SIZE);

            return [[
                (1 / 9), 0, 0, -1 // Top 1
            ], [
                (2 / 9), 0, 0, -1 // Top 2
            ], [
                (3 / 9), 0, 0, -1 // Top 3
            ], [
                (4 / 9), 0, 0, -1 // Top 4
            ], [
                (5 / 9), 0, 0, -1 // Top 5
            ], [
                (6 / 9), 0, 0, -1 // Top 6
            ], [
                (7 / 9), 0, 0, -1 // Top 7
            ], [
                (8 / 9), 0, 0, -1 // Top 8
            ], [
                1, (1 / gridHeight), 1, 0 // Right 1
            ], [
                1, (2 / gridHeight), 1, 0 // Right 2
            ], [
                1, (3 / gridHeight), 1, 0 // Right 3
            ], [
                0, (1 / gridHeight), -1, 0 // Left 1
            ], [
                0, (2 / gridHeight), -1, 0 // Left 2
            ], [
                0, (3 / gridHeight), -1, 0 // Left 3
            ]];
        },

        get_OutgoingConnectionPoints: function () {
            // PROTECTED, OVERRIDE

            return [WorkflowEnums.ParallelStep.OUTGOING_CONNECTION_POINT_BY_NUMBER_OF_TRACKS[this.GetNumberOfTracks()]];
        },

        get_Dimensions: function () {
            // PROTECTED, OVERRIDE

            var pixelHeight = 0;

            pixelHeight = WorkflowEnums.ParallelStep.HEADER_HEIGHT + (this._GetTracksHeight() + 2); // Adding 2 allows a CSS border of 2px height.

            return {
                Height: Math.floor(pixelHeight / WorkflowEnums.Diagram.GRID_SIZE),
                Width: WorkflowEnums.ParallelStep.WIDTH_BY_NUMBER_OF_TRACKS[this.GetNumberOfTracks()]
            };
        },

        _RenderTrackNames: function (stepElement) {
            // PRIVATE

            var i = 0;
            var nameElement = null;

            for (i = 0; i < this.GetNumberOfTracks() ; i++) {
                nameElement = $("<div>", {
                    id: _.formatString(WorkflowEnums.ParallelStep.TRACK_NAME_ID, this.get_ID(), i),
                    "class": "parallelStepTrackName"
                }).css({
                    left: (WorkflowEnums.ParallelStep.TRACK_WIDTH + 2) * i + 5 // Adding 2 allows a CSS border of 2px width
                }).text(this.GetTrack(i).get_Name()).appendTo(stepElement);

                nameElement = null;
            }
        },

        _GetStepTotalWidth: function () {
            // PRIVATE

            var parallelStepWidths = [
                0,
                0,
                234,
                350,
                466,
                582
            ];

            return parallelStepWidths[this.GetNumberOfTracks()];
        },

        _GetMaxNumberOfSteps: function () {
            // PRIVATE

            var maxNumberOfSteps = 0;
            var i = 0;

            for (i = 0; i < this.GetNumberOfTracks() ; i++) {
                maxNumberOfSteps = Math.max(maxNumberOfSteps, this.GetTrack(i).GetNumberOfSteps());
            }
            // Parallel step is to accomodate at least WorkflowEnums.ParallelStep.MINIMAL_TRACK_HEIGHT_BASED_ON_STEPS steps in a track from the beginning
            maxNumberOfSteps = Math.max(maxNumberOfSteps, WorkflowEnums.ParallelStep.MINIMAL_TRACK_HEIGHT_BASED_ON_STEPS);

            return maxNumberOfSteps;
        },

        _GetTracksHeight: function () {
            // PRIVATE

            return (this._GetMaxNumberOfSteps() * WorkflowEnums.ParallelStep.VERTICAL_STEP_SPACE
                + WorkflowEnums.ParallelStep.VERTICAL_LAST_STEP_PADDING);
        },

        _RenderTrackLanes: function (stepElement) {
            // PRIVATE

            var laneElement = null;

            // Render the lanes
            laneElement = $("<div>", {
                id: _.formatString(WorkflowEnums.ParallelStep.LANES_BG_ID, this.get_ID()),
                "class": "parallelStepTrackLanesBackground",
                title: this.get_Name()
            }).css({
                top: WorkflowEnums.ParallelStep.HEADER_HEIGHT,
                height: this._GetTracksHeight(),
                width: this._GetStepTotalWidth() - 4 // Substracting 4 allows a CSS border of 2px width
            }).appendTo(stepElement);

            laneElement = null;
        },

        _RenderTrackSteps: function (stepElement, trackIndex) {
            var i = 0;
            var track = null;
            var currentStep = null;

            track = this.GetTrack(trackIndex);
            for (i = 0; i < track.GetNumberOfSteps() ; i++) {
                currentStep = track.GetStep(i);
                // Position the step in its parent parallel step according to the inner step index.
                currentStep.Render(
                    stepElement,
                    {
                        Left: (7 + WorkflowEnums.ParallelStep.HORIZONTAL_STEP_SPACE * trackIndex),
                        Top: (WorkflowEnums.ParallelStep.HEADER_HEIGHT + WorkflowEnums.ParallelStep.VERTICAL_INTER_STEP_PADDING
                            + WorkflowEnums.ParallelStep.VERTICAL_STEP_SPACE * i)
                    });
            }
        },

        _AddHandlersToTrackLine: function (lineElement, trackIndex, segmentIndex) {
            lineElement.on({
                click: _.bind(function (event) {
                    event.stopPropagation();
                    this._eventBus.trigger(WorkflowEnums.Events.TRACK_LINE_SEGMENT_CLICKED, event, {
                        StepID: this.get_ID(),
                        TrackIndex: trackIndex,
                        SegmentIndex: segmentIndex
                    });
                }, this)
            });
        },

        _RenderTrackLines: function (stepElement, trackIndex) {
            var i = 0;
            var track = null;
            var lineElement = null;
            var lineGraphicsElement = null;
            var handleElement = null;
            var maxNumberOfSteps = 0;

            track = this.GetTrack(trackIndex);
            maxNumberOfSteps = this._GetMaxNumberOfSteps();
            for (i = 0; i < track.GetNumberOfSteps() + 1; i++) {
                // Create an HTML element for a track line segment.
                // A line consists of graphics, a handle and a uniting DIV.
                lineElement = $("<div>", {
                    id: _.formatString(WorkflowEnums.ParallelStep.LINE_SEGMENT_ID, this.get_ID(), trackIndex, i),
                    "class": "parallelStepLine"
                }).css({
                    left: ((WorkflowEnums.ParallelStep.TRACK_WIDTH + 2) * trackIndex) +
                        ((WorkflowEnums.ParallelStep.TRACK_WIDTH - WorkflowEnums.ParallelStep.TRACK_LINE_WIDTH) / 2),
                    top: WorkflowEnums.ParallelStep.HEADER_HEIGHT + WorkflowEnums.ParallelStep.VERTICAL_STEP_SPACE * i
                }).appendTo(stepElement);

                // Add a onmousedown and onclick event handlers to the track line
                this._AddHandlersToTrackLine(lineElement, trackIndex, i);

                // Create an HTML element for the track line graphics.
                lineGraphicsElement = $("<div>", {
                    id: _.formatString(WorkflowEnums.ParallelStep.LINE_SEGMENT_GRAPHICS_ID, this.get_ID(), trackIndex, i),
                    "class": "parallelStepLineGraphics"
                }).appendTo(lineElement);

                // Create a handle on the track line
                handleElement = $("<div>", {
                    id: _.formatString(WorkflowEnums.ParallelStep.LINE_SEGMENT_HANDLE_ID, this.get_ID(), trackIndex, i),
                    "class": "parallelStepLineHandle"
                }).appendTo(lineElement);

                // Adjust the height of the last line in the lane so it reaches the bottom of the parent step.
                // Adjust the top position of the handle of the last line in the lane,
                // if that line should be higher than usual to reach the bottom of the parent step.
                if (i === track.GetNumberOfSteps()) {
                    lineElement.css({
                        height: (WorkflowEnums.ParallelStep.VERTICAL_STEP_SPACE * (maxNumberOfSteps - track.GetNumberOfSteps()) +
                        WorkflowEnums.ParallelStep.VERTICAL_LAST_STEP_PADDING)
                    });
                    handleElement.css({
                        top: (lineElement.height() - WorkflowEnums.ParallelStep.TRACK_LINE_HANDLE_HEIGHT) / 2
                    });
                }

                lineElement = null;
                lineGraphicsElement = null;
                handleElement = null;
            }
        },
        /// #endregion Rendering APIs

        /// #region Selection APIs
        SelectTrackLineSegment: function (trackIndex, segmentIndex) {
            var trackLineElement = null;

            trackLineElement = $(_.formatString(
                        "#" + WorkflowEnums.ParallelStep.LINE_SEGMENT_ID,
                        this.get_ID(),
                        trackIndex,
                        segmentIndex));
            if (trackLineElement.length > 0) {
                trackLineElement.attr("class", "parallelStepLineSelected");
            }

            trackLineElement = null;
        },

        DeselectTrackLineSegment: function (trackIndex, segmentIndex) {
            var trackLineElement = null;

            trackLineElement = $(_.formatString(
                        "#" + WorkflowEnums.ParallelStep.LINE_SEGMENT_ID,
                        this.get_ID(),
                        trackIndex,
                        segmentIndex));
            if (trackLineElement.length > 0) {
                trackLineElement.attr("class", "parallelStepLine");
            }

            trackLineElement = null;
        },
        /// #endregion Selection APIs

        dispose: function () {
            ProSight.WebControls.Workflows.ParallelStep.callBaseMethod(this, "dispose");
        }
    }

    ProSight.WebControls.Workflows.ParallelStep.registerClass(
        "ProSight.WebControls.Workflows.ParallelStep",
        ProSight.WebControls.Workflows.Step);

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.ParallelStep;
});