/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/misc.js"/>

define([
    "i18n!nls/localeStrings",
    "workflows/workflowEnums",
    "ms-ajax"
], function (locale, WorkflowEnums) {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.Track = function (options) // {eventBus, parentStepID, trackIndex, trackData}
    {
        this._eventBus = options.eventBus;
        this._parentStepID = options.parentStepID;
        this._trackIndex = options.trackIndex;
        this._track = options.trackData;
    }

    ProSight.WebControls.Workflows.Track.AllocAndInitNewTrackData = function (trackIndex) {
        var defaultTrack = null;

        defaultTrack = JSON.parse(WorkflowEnums.DataStructures.DefaultTrack);
        defaultTrack.Name = _.formatString(locale.label.workflows.default_track_name, trackIndex + 1);

        return defaultTrack;
    }

    ProSight.WebControls.Workflows.Track.prototype =
    {
        get_Name: function () {
            return this._track.Name;
        },

        set_Name: function (newName) {
            this._track.Name = newName;
        },

        get_Steps: function () {
            // PRIVATE

            return this._track.Steps;
        },

        Delete: function () {
            while (this.GetNumberOfSteps() > 0) {
                this.DeleteStep(0);
            }
        },

        // Step-related APIs
        InsertStepAt: function (creationInfo, insertAtIndex) // creationInfo = {ID, Name, Type}
        {
            Array.insert(
                this.get_Steps(),
                insertAtIndex,
                JSON.parse(WorkflowEnums.DataStructures.DefaultStep));
            // There is a need to initialize the default step properties
            // of the newly inserted step with ones supplied by the creationInfo parameter.
            this.GetStep(insertAtIndex, creationInfo);
            this.StepLocation_Changed();
        },

        GetStep: function (stepIndex, creationInfo) // creationInfo = {ID, Name, Type} -- optional
        {
            return ProSight.WebControls.Workflows.Step.GetStepImplementation({
                eventBus: this._eventBus,
                ptrToStepData: this.get_Steps()[stepIndex],
                creationInfo: creationInfo
            });
        },

        GetNumberOfSteps: function () {
            return this.get_Steps().length;
        },

        DeleteStep: function (stepIndex) {
            this.GetStep(stepIndex).Delete();
            Array.removeAt(this.get_Steps(), stepIndex);
            this.StepLocation_Changed();
        },

        StepLocation_Changed: function () {
            var step = null;
            var i = 0;

            // Re-register all the track's steps as either track index or
            // in-track indexes of some of them might have changed.
            for (i = 0; i < this.GetNumberOfSteps() ; i++) {
                step = this.GetStep(i);
                step.Register({
                    LocationType: WorkflowEnums.StepLocationType.TRACK,
                    ParentStepID: this._parentStepID,
                    TrackIndex: this._trackIndex,
                    InTrackIndex: i
                });
            }
        },
        // End of Step-related APIs

        dispose: function () {
        }
    }

    ProSight.WebControls.Workflows.Track.registerClass("ProSight.WebControls.Workflows.Track");

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.Track;
});