require.config({
    paths: {
        // setup up alias names
        "text": "../lib/require/plugins/text",
        "i18n": "../lib/require/plugins/i18n",
        "less": "../lib/less/js/less",
        "jquery": "../lib/jquery/js/jquery",
        "jquery-ui": "../lib/jquery/js/jquery-ui",
        "jquery.resize": "../lib/jquery/plugins/jquery.resize",
        "jquery.scrollintoview": "../lib/jquery/plugins/jquery.scrollintoview",
        "jquery.jsPlumb": "../lib/jquery/plugins/jquery.jsPlumb",
        "underscore": "../lib/underscore/js/underscore",
        "backbone": "../lib/backbone/js/backbone",
        "backbone.deep-model": "../lib/backbone/plugins/deep-model",
        "backbone.deep-model.mixins": "../lib/backbone/plugins/deep-model.mixins",
        "bootstrap": "../lib/bootstrap/js/bootstrap",
        "ms-ajax": "../lib/msAjax/js/microsoftAjax",
        "spin": "../lib/oui/js/spin",
        "dateFormat": "../lib/oui/js/dateFormat",
        "oui": "../lib/oui/js/oui",
        "mousewheel": "../lib/jquery/plugins/jquery.mousewheel",
        "gridapi": "../lib/gridapi/gridapi_nodeps",
        "pgbucoreapi": "../lib/pgbucore/pgbucoreapi_nodeps",
        "codemirror": "../lib/codemirror/js/codemirror",
        "codemirror.groovy": "../lib/codemirror/plugins/groovy",
        "pgbu-backbone": "../javascripts/common/pgbuBackbone",
        "mock-call-mapper": "../javascripts/common/mocks/mockCallMapper",
        "workflow-diagram": "workflows/diagram/diagram",
        "event-bus": "common/eventBus"
    },
    map: {
        "*": {
            "ochartlibs.jquery": "jquery",
            "ochartlibs.d3": "d3",
            "ochartlibs.log4javascript": "log4javascript",
            "ochartlibs.underscore": "underscore",
            "ochartlibs.jqueryui": "jquery-ui",

            "oui.jquery": "jquery",
            "oui.jqueryui": "jquery-ui",
            "oui.resize": "jquery.resize",
            "oui.underscore": "underscore",
            "oui.bootstrap": "bootstrap",
            "oui.spin": "spin",
            "oui.dateFormat": "dateFormat",

            "gridapi.jquery": "jquery",
            "gridapi.jqueryui": "jquery-ui",
            "gridapi.underscore": "underscore",
            "gridapi.mousewheel": "mousewheel"
        }
    },

    waitSeconds: 60,

    shim: {
        "jquery-ui": {
            deps: [
                "jquery"
            ]
        },

        "jquery.resize": {
            deps: [
                "jquery"
            ]
        },

        "jquery.scrollintoview": {
            deps: [
                "jquery"
            ],
            exports: "jQuery.fn.scrollintoview"
        },

        "jquery.jsPlumb": {
            deps: [
                "jquery", "jquery-ui"
            ],
            exports: "jsPlumb",
            init: function () {
                "use strict";

                return this.jsPlumb.getInstance();
            }
        },

        "mousewheel": {
            deps: [
                "jquery"
            ],
            exports: "jQuery.fn.mousewheel"
        },

        "bootstrap": {
            deps: [
                "jquery"
            ]
        },

        "underscore": {
            exports: "_"
        },

        "backbone": {
            deps: [
                "underscore", "jquery"
            ],
            exports: "Backbone"
        },

        "backbone.deep-model.mixins": {
            deps: [
                "underscore"
            ]
        },

        "codemirror": {
            deps: [
                "jquery"
            ],
            exports: "CodeMirror"
        },

        "codemirror.groovy": {
            deps: [
                "codemirror"
            ],
            exports: "CodeMirror.modes.groovy"
        }
    }
});

require([
    "jquery",
    "underscore",
    "jquery-ui",
    "jquery.scrollintoview",
    "backbone",
    "backbone.deep-model", "backbone.deep-model.mixins",
    "bootstrap",
    "utilities/utils",
    "pgbucoreapi",
    "oui",
    "gridapi"
], function ($, _) {
    "use strict";

    // use mustache style tags
    _.templateSettings.interpolate = /\{\{([\s\S]+?)\}\}/g;

    // list all the unit test files here
    require([
        "../tests/common/pgbuBackboneTest",
        "../tests/formEngine/textWidgetTest",
        "../tests/formEngine/groupsetWidgetTest",
        "../tests/formEngine/groupWidgetTest",
        "../tests/formEngine/startWorkflowTaskFormTest",
        "../tests/formEngine/formPresenterTest",
        "../tests/formEngine/formViewTest",
        "../tests/formEngine/tabbedFormTest",
        "../tests/formEngine/textAreaWidgetTest",
        "../tests/formEngine/promptWidgetTest",
        "../tests/formEngine/dropdownWidgetTest",
        "../tests/formEngine/enumDropdownWidgetTest",
        "../tests/formEngine/monetaryWidgetTest",
        "../tests/formEngine/datePickerWidgetTest",
        "../tests/formEngine/pickerWidgetTest",
        "../tests/workflows/workflowEditorTest"
    ], function (
            PgbuBackboneTest,
            TextWidgetTest, GroupSetWidgetTest, GroupWidgetTest, WorkflowTaskFormTest,
            FormPresenterTest, FormViewTest, TabbedFormTest,
            TextAreaWidgetTest, PromptWidget, DropdownWidgetTest, EnumDropdownWidgetTest, MonetaryWidgetTest, DatePickerWidgetTest,
            PickerWidgetTest, WorkflowEditorTest) {
        // now that the tests are loaded, run them after the DOM loads
        $(function () {
            QUnit.start();
            TabbedFormTest.runTests();
            FormPresenterTest.runTests();
            WorkflowEditorTest.runTests();
        });
    });
});