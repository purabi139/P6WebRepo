define([], function () {
    "use strict";

    return {
        FORM_DATA_LOADED: "formEngine:formDataLoaded",
        FORM_ENUM_LOADED: "formEngine:formEnumLoaded",
        FORM_META_DATA_LOADED: "formEngine:formMetaDataLoaded",
        FORM_SETTINGS_META_DATA_LOADED: "formEngine:formSettingsMetaDataLoaded",
        FORM_WIDGET_DATA_CHANGED_TPL: "formEngine:%0Updated",
        POST_RENDER: "formEngine:postRender",
        CONTROL_CHANGED: "formEngine:controlChanged",
        FORM_TASK_ASSIGNMENT_URL : "#form/wfTaskAssignment/%0",

        WidgetType: {
            TEXT: "TEXT",
            COMBO_BOX: "COMBOBOX",
            DROPDOWN: "DROPDOWN",
            ENUM_DROPDOWN : "ENUMDROPDOWN",
            GROUP_BOX_SET: "GROUPBOXSET",
            GROUP_BOX: "GROUPBOX",
            TAB_SET: "TABSET",
            TAB: "TAB",
            PROMPT : "PROMPT",
            TEXT_AREA: "TEXTAREA",
            MONETARY: "MONETARY",
            DATE_PICKER: "DATEPICKER",
            PICKER : "PICKER"
        },

        GroupWidgetSize: {
            QUARTER: 1,
            HALF: 2,
            THREE_QUARTERS: 3,
            WHOLE: 4
        },

        FormType: {
            ENTITY : 1,
            WF_TASK_ASSIGNMENT : 2
        },
        FormEntity: {
            NEW : 0
       }
    };
});