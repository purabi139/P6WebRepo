define(function () {
    "use strict";

    return {
        Event: {
            CANCEL: "actionBar:cancel",
            COMPLETE: "actionBar:complete",
            SAVE: "actionBar:save",
            SAVE_AS: "actionBar:saveAs"
        },

        Selector: {
            CANCEL_BUTTON: "cancel",
            COMPLETE_BUTTON: "complete",
            SAVE_BUTTON: "save",
            SAVE_AS_BUTTON: "saveAs"
        },

        Type: {
            SAVE: 0,
            SAVE_AS: 1,
            COMPLETE_SAVE_CANCEL: 2
        }
    };
});