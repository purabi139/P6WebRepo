
define('workflows/workflowsRouter',["backbone"], function (Backbone) {
    "use strict";

    return Backbone.Router.extend({
        routes: {
            "workflows(/:id)/editor": "workflowEditor"
        },

        workflowEditor: function (id) {
            var workflowId = parseInt(id, 10);

            if (!_.isNumber(workflowId) || _.isNaN(workflowId)) {
                workflowId = null;
            }

            require([
                "workflows/editor/editorPresenter"
            ],
            function (WorkflowEditorPresenter) {
                new WorkflowEditorPresenter({
                    id: workflowId,
                    creatingNewWorkflow: (workflowId == null)
                });
            });
        }
    });
});
define('formEngine/formRouter',["jquery", "underscore", "backbone"], function ($, _, Backbone) {
    "use strict";

    return Backbone.Router.extend({
        routes : {
            "form/:formId/entity/:entityId" : "showForm",
            "form/:clientType/:id" : "getFormWithClientType",
            "demoPage" : "demoPage"
        },

        showForm : function (formId, entityId) {
            var self = this;
            require([
                "formEngine/formPresenter"
            ], function (FormPresenter) {
                self.formPresenter = new FormPresenter();
                var formContext = {
                    formId : formId,
                    entityId : entityId
                };
                self.formPresenter.getForm(formContext);
            });
        },
        getFormWithClientType : function (clientype, id) {
            var self = this;
            require([
                "formEngine/formPresenter"
            ], function (FormPresenter) {
                self.formPresenter = new FormPresenter();
                var formContext = {
                    id : id,
                    clientType : clientype
                };
                self.formPresenter.getForm(formContext);
            });
        },
        demoPage : function(){
            var self = this;
            require([
                "formEngine/demoPresenter"
            ], function (DemoPresenter) {
                self.demoPresenter = new DemoPresenter();
            });

        }

    });
});
define('functionEditor/functionEditorRouter',["backbone"], function (Backbone) {
    "use strict";

    return Backbone.Router.extend({
        routes: {
            "functions/editor": "functionEditor", // functions/editor
            "functions/:id/editor": "functionEditor" // functions/1/editor
        },

        functionEditor: function (id) {
            require([
                "functionEditor/editorPresenter"
            ],
                function (FunctionEditorPresenter) {
                    new FunctionEditorPresenter({
                        id: id == null ? null : parseInt(id, 10)
                    });
                });
        }
    });
});
define('utilities/console-utils',[
    "jquery", "underscore"
], function ($, _) {
    "use strict";

    (function () {
        window.console = window.console || {};
        var functions = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
            "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

        _.each(functions, function (fn) {
            if (!_.isFunction(window.console[fn])) {
                window.console[fn] = $.noop;
            }
        });
    } ());
});

/**
 * @license RequireJS i18n 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/i18n for details
 */
/*jslint regexp: true */
/*global require: false, navigator: false, define: false */

/**
 * This plugin handles i18n! prefixed modules. It does the following:
 *
 * 1) A regular module can have a dependency on an i18n bundle, but the regular
 * module does not want to specify what locale to load. So it just specifies
 * the top-level bundle, like "i18n!nls/colors".
 *
 * This plugin will load the i18n bundle at nls/colors, see that it is a root/master
 * bundle since it does not have a locale in its name. It will then try to find
 * the best match locale available in that master bundle, then request all the
 * locale pieces for that best match locale. For instance, if the locale is "en-us",
 * then the plugin will ask for the "en-us", "en" and "root" bundles to be loaded
 * (but only if they are specified on the master bundle).
 *
 * Once all the bundles for the locale pieces load, then it mixes in all those
 * locale pieces into each other, then finally sets the context.defined value
 * for the nls/colors bundle to be that mixed in locale.
 *
 * 2) A regular module specifies a specific locale to load. For instance,
 * i18n!nls/fr-fr/colors. In this case, the plugin needs to load the master bundle
 * first, at nls/colors, then figure out what the best match locale is for fr-fr,
 * since maybe only fr or just root is defined for that locale. Once that best
 * fit is found, all of its locale pieces need to have their bundles loaded.
 *
 * Once all the bundles for the locale pieces load, then it mixes in all those
 * locale pieces into each other, then finally sets the context.defined value
 * for the nls/fr-fr/colors bundle to be that mixed in locale.
 */
(function () {
    'use strict';

    //regexp for reconstructing the master bundle name from parts of the regexp match
    //nlsRegExp.exec("foo/bar/baz/nls/en-ca/foo") gives:
    //["foo/bar/baz/nls/en-ca/foo", "foo/bar/baz/nls/", "/", "/", "en-ca", "foo"]
    //nlsRegExp.exec("foo/bar/baz/nls/foo") gives:
    //["foo/bar/baz/nls/foo", "foo/bar/baz/nls/", "/", "/", "foo", ""]
    //so, if match[5] is blank, it means this is the top bundle definition.
    var nlsRegExp = /(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/;

    //Helper function to avoid repeating code. Lots of arguments in the
    //desire to stay functional and support RequireJS contexts without having
    //to know about the RequireJS contexts.
    function addPart(locale, master, needed, toLoad, prefix, suffix) {
        if (master[locale]) {
            needed.push(locale);
            if (master[locale] === true || master[locale] === 1) {
                toLoad.push(prefix + locale + '/' + suffix);
            }
        }
    }

    function addIfExists(req, locale, toLoad, prefix, suffix) {
        var fullName = prefix + locale + '/' + suffix;
        if (require._fileExists(req.toUrl(fullName))) {
            toLoad.push(fullName);
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     * This is not robust in IE for transferring methods that match
     * Object.prototype names, but the uses of mixin here seem unlikely to
     * trigger a problem related to that.
     */
    function mixin(target, source, force) {
        var prop;
        for (prop in source) {
            if (source.hasOwnProperty(prop) && (!target.hasOwnProperty(prop) || force)) {
                target[prop] = source[prop];
            } else if (typeof source[prop] === 'object') {
                mixin(target[prop], source[prop], force);
            }
        }
    }

    define('i18n',['module'], function (module) {
        var masterConfig = module.config();

        return {
            version: '2.0.1',
            /**
             * Called when a dependency needs to be loaded.
             */
            load: function (name, req, onLoad, config) {
                config = config || {};

                if (config.locale) {
                    masterConfig.locale = config.locale;
                }

                var masterName,
                    match = nlsRegExp.exec(name),
                    prefix = match[1],
                    locale = match[4],
                    suffix = match[5],
                    parts = locale.split("-"),
                    toLoad = [],
                    value = {},
                    i, part, current = "";

                //If match[5] is blank, it means this is the top bundle definition,
                //so it does not have to be handled. Locale-specific requests
                //will have a match[4] value but no match[5]
                if (match[5]) {
                    //locale-specific bundle
                    prefix = match[1];
                    masterName = prefix + suffix;
                } else {
                    //Top-level bundle.
                    masterName = name;
                    suffix = match[4];
                    locale = masterConfig.locale;
                    if (!locale) {
                        locale = masterConfig.locale =
                            typeof navigator === "undefined" ? "root" :
                            (navigator.language ||
                             navigator.userLanguage || "root").toLowerCase();
                    }
                    parts = locale.split("-");
                }

                if (config.isBuild) {
                    //Check for existence of all locale possible files and
                    //require them if exist.
                    toLoad.push(masterName);
                    addIfExists(req, "root", toLoad, prefix, suffix);
                    for (i = 0; i < parts.length; i++) {
                        part = parts[i];
                        current += (current ? "-" : "") + part;
                        addIfExists(req, current, toLoad, prefix, suffix);
                    }

                    req(toLoad, function () {
                        onLoad();
                    });
                } else {
                    //First, fetch the master bundle, it knows what locales are available.
                    req([masterName], function (master) {
                        //Figure out the best fit
                        var needed = [],
                            part;

                        //Always allow for root, then do the rest of the locale parts.
                        addPart("root", master, needed, toLoad, prefix, suffix);
                        for (i = 0; i < parts.length; i++) {
                            part = parts[i];
                            current += (current ? "-" : "") + part;
                            addPart(current, master, needed, toLoad, prefix, suffix);
                        }

                        //Load all the parts missing.
                        req(toLoad, function () {
                            var i, partBundle, part;
                            for (i = needed.length - 1; i > -1 && needed[i]; i--) {
                                part = needed[i];
                                partBundle = master[part];
                                if (partBundle === true || partBundle === 1) {
                                    partBundle = req(prefix + part + '/' + suffix);
                                }
                                mixin(value, partBundle);
                            }

                            //All done, notify the loader.
                            onLoad(value);
                        });
                    });
                }
            }
        };
    });
}());

define('nls/localeStrings',{
    root : true
});
define('nls/root/localeStrings',{
    entity: {
    },
    label: {
        error: "Error",
        warning: "Warning",
        success: "Success",
        info: "Information",
        live: "Live",
        cancel: "Cancel",
        clear: "Clear",
        complete: "Complete",
        save: "Save",
        save_as: "Save As",
        delete_label: "Delete",
        workflows: {
            default_transition_option_name: "Option %0",
            default_category_based_decision_step_name: "Decision %0",
            default_manual_decision_step_name: "Decision %0",
            default_parallel_step_name: "Parallel Step %0",
            default_task_step_name: "Step %0",
            remove_step_confirmation_message: "Are you sure that you want to remove the selected Step?",
            system_choice_task_name: "Decision",
            system_choice_task_description: "System choice task for manual decision Step",
            system_choice_label: "Which option do you prefer?",
            default_track_name: "Track %0",
            default_task_name: "Task %0",
            add_task_step_button_tooltip: "Add a task step",
            add_manual_decision_step_button_tooltip: "Add a manual decision step",
            add_category_based_decision_step_button_tooltip: "Add a category based decision step",
            add_parallel_step_button_tooltip: "Add a parallel step",
            delete_button_tooltip: "Delete a selected object",
            search_button: "Search",
            validate_button: "Validate",
            print_button: "Print",
            default_workflow_name: "New workflow",
            default_initial_step_name: "Start",
            default_final_step_name: "End",
            properties: {
                workflow: "Workflow",
                step: "Step",
                task: "Task",
                name: "Name",
                description: "Description",
                duration: "Duration",
                amount: "Amount",
                unit: "Unit",
                duration_units: {
                    days: "Days",
                    weeks: "Weeks",
                    months: "Months"
                },
                instance_defaults: "Instance Defaults",
                context: "Context",
                manager: "Manager",
                alternate_managers: "Alternate Managers",
                status: "Status",
                enabled: "Enabled",
                disabled: "Disabled",
                error_handling: "Error Handling",
                error_handling_types: {
                    stop: "Stop workflow",
                    notify: "Notify manager",
                    ignore: "Ignore"
                },
                details: "Details",
                add_button: "Add",
                add_button_tooltip: "Add task",
                edit_button: "Edit",
                edit_button_tooltip: "Edit task",
                copy_button: "Copy",
                copy_button_tooltip: "Copy task",
                paste_button: "Paste",
                paste_button_tooltip: "Paste task",
                delete_button: "Delete",
                delete_button_tooltip: "Delete task",
                details_name: "Name:",
                details_type: "Type:",
                details_context: "Context:",
                details_performer: "Performer:"
            },
            taskDialog: {
                form_task_dialog: "Form Task Details",
                name: "Name",
                description: "Description",
                context: "Context",
                use_as_wf_context: "Use this form's context as the workflow context",
                form: "Form",
                tab: "Tab",
                performer: "Performer",
                completion: "Completion",
                voting: "Voting",
                confirmation: "Confirmation",
                select_context: "Select Context",
                select_form: "Select Form",
                select_tab: "Select Tab",
                select_performer: "Select Performer",
                sign_off_type: {
                    ok_cancel: "Cancel/OK",
                    ok_cancel_and_password: "Cancel/OK + Password",
                    none: "None"
                }
            }
        },
        functionEditor: {
            title: "Function Editor",
            object_type_label: "Target object type:",
            field_name_label: "Target column name:",
            function_code_label: "Function code:",
            because: "because",
            confirm_deletion_prompt: "If you click ok, the function will be deleted from the system. \nAre you sure?",
            choose_target_field_alert: "No target field has been selected",
            function_deleted_successfully_alert: "Function deleted successfully",
            function_delete_failed_alert: "Failed to delete function for field ",
            function_saved_successfully_alert: "Function saved successfully for field ",
            function_save_failed_alert: "Failed to save function for field ",
            wrong_return_type: " because the return type of the function is incompatible with the target field type",
            get_function_for_field_failed_alert: "Failed to get function for field ",
            fill_target_field_dropdown_failed_alert: "Failed to fill target field dropdown"
        }
    },
    text: {
        action_bar_default: "Changes made: %0",
        select: "Select %0"
    },
    error: {
        model_or_collection_accessing_server_data_failed: "Accessing data from the server has failed.<br />The server has returned the following error message:<br /><code>%0</code>"
    }
});
define('common/pgbuBackboneEnums',[],function () {
    "use strict";

    return {
        ViewEvent: {
            DATA_MODIFIED: "page:dataModified",
            LAYOUT_CHANGED: "page:layoutChanged",
            TAB_CHANGED: "page:tabChanged"
        },

        FlashMessageType: {
            ERROR: "error",
            INFO: "info",
            SUCCESS: "success"
        }
    };
});
define('utilities/viewable-utils',[
    "jquery", "underscore", "backbone",
    "i18n!nls/localeStrings",
    "common/pgbuBackboneEnums"
], function ($, _, Backbone, locale, PgbuBackboneEnums) {
    "use strict";

    var FlashView = Backbone.View.extend({
        tagName: "div",
        className: "alert alert-block fade in out",

        initialize: function (options) {
            this.options = options;
        },

        _getDefaultHeading: function () {
            switch (this.options.type) {
                case PgbuBackboneEnums.FlashMessageType.ERROR:
                    return locale.label.error;
                case PgbuBackboneEnums.FlashMessageType.INFO:
                    return locale.label.info;
                case PgbuBackboneEnums.FlashMessageType.SUCCESS:
                    return locale.label.success;
                default:
                    return locale.label.warning;
            }
        },

        render: function () {
            this.options.closeable = (this.options.closeable != null ? this.options.closeable : true);
            if (this.options.type) {
                this.$el.addClass("alert-" + this.options.type);
            }
            if (this.options.closeable) {
                this.$el.append($(this.make("a", { "class": "close", "data-dismiss": "alert" }, "&times;")).css("top", "12px"));
            }
            this.options.heading = this.options.heading || this._getDefaultHeading();
            this.$el.append(this.make("h4", { "class": "alert-heading" }, this.options.heading));
            if (this.options.text) {
                this.$el.append(this.make("span", {}, this.options.text));
            }
            this.$el.alert();
            return this;
        }
    });

    //Cached variables
    var $globalFlash = $(".global-flash");

    _.mixin({
        /**
         * Builds a flash message with the given options and appends it to the DOM above the page content.
         * Only use this for important, global messages.
         * @param {String}  options.text      The text of the flash message.
         * @param {String}  options.heading   (Optional) The heading of the flash message.
         * @param {Boolean} options.closeable (Optional) Whether the flash message is closeable. Defaults to true.
         * @param {String}  options.type      (Optional) One of PgbuBackboneEnums.FlashMessageType.ERROR, PgbuBackboneEnums.FlashMessageType.SUCCESS, or PgbuBackboneEnums.FlashMessageType.INFO.
         */
        flash: function (options) {
            if (options == null) {
                options = {};
            } else if (_.isString(options)) {
                options = { text: options };
            }

            $globalFlash.empty();
            $globalFlash.append(new FlashView(options).render().$el).slideDown(300);
            if (options.closeable !== false) {
                $globalFlash.delay(5000)
                    .slideUp(500, function () {
                        $(this).children().remove();
                    });
            }

            Backbone.history.on("route", function () {
                $globalFlash.empty();
            });
        },

        /**
         * Displays a film over the UI while the Deferred object has not yet been resolved or rejected.
         * @param {Deferred} jQuery"s Deferred object
         */
        film: function (deferred) {
            var $film = $("<div class=\"modal-backdrop\"></div>");
            deferred.always(function () {
                $film.fadeOut(_.bind($film.remove, $film));
            });
            $(document.body).append($film);
        }
    });
});
/*
 * If there is a live JSON resource available, the call must not be mocked in here.
 * This is the mock definition file for the production server.
 *
 * The goal of this file should be to have it empty.
 */
(function () {
    "use strict";

    window.mock_call_mapper = [
        {
            name : "Workflow Editor Mock",
            url : /rest\/workflows\/templates\/0/,
            mockUrl : "workflows/editor/editorMock",
            useMock : true,
            powerup : "amd"
        },
        {
            name : "Form Metadata",
            url : /rest\/forms\/0/,
            mockUrl : "javascripts/formEngine/mocks/tabbedFormMetadataMock.json",
            useMock : true
        },
        {
            name : "Form Metadata",
            url : /rest\/forms\/\d+\/qa/,
            mockUrl : "javascripts/formEngine/mocks/demo/qa_tabbedFormMetadataMock.json",
            useMock : true
        },
        {
            name : "Form Data",
            url : /rest\/projects\/0/,
            mockUrl : "javascripts/formEngine/mocks/formDataMock.json",
            useMock : true
        },
        {
            name : "QA Form Data",
            url : /rest\/forms\/\d+\/data\/qa/,
            mockUrl : "javascripts/formEngine/mocks/demo/formDataMock.json",
            useMock : true
        },
        {
            name : "Form Setting Data",
            url : /rest\/forms\/catTypes\/*/,
            mockUrl : "javascripts/formEngine/mocks/formSettingDataMock.json",
            useMock : false
        },
        {
            name : "Function Editor Fields Mock",
            url : /rest\/functions\/fields$/,
            mockUrl : "functionEditor/editorFieldsMock",
            useMock : false,
            powerup : "amd"
        },
        {
            name : "Function Editor Functions Mock",
            url : /rest\/functions\/fields\/\d+/,
            mockUrl : "functionEditor/editorFunctionsMock",
            useMock : false,
            powerup : "amd"
        },
        {
            name : "Start workflow",
            url : /rest\/workflows\/start/,
            mockUrl : "javascripts/formEngine/mocks/startWorkflowMock.json",
            useMock : false
        }
    ];
}());
define("mock-call-mapper", function(){});

/**
 * Editing this file means that you understand the
 * risk of completely screwing up everyone"s development environment.
 *
 * Most people should just use mockCallMapper.js.
 */
define('utilities/ajax-mock',["jquery", "underscore", "mock-call-mapper"], function ($, _) {
    "use strict";

    console.log("\nWarning: ajax mocking enabled.");
    var enabled = true;
    var realAjax = $.ajax;

    var hijacks = [
        {
            url: /.*/,
            call: function (ajax, option) {
                return ajax.call(this, option);
            }
        }
    ];

    var mockIt = function (realUrl, mockUrl, amd) {
        _.ajaxMock(realUrl, amd, mockUrl, function (ajax, options, file) {
            options.url = mockUrl;
            options.type = "GET";
            return ajax.call(this, options);
        });
    };

    var processMapper = function () {
        var mockCalls = window.mock_call_mapper;
        if (mockCalls) {
            for (var i = 0; i < mockCalls.length; ++i) {
                if (mockCalls[i].useMock) {
                    mockIt(mockCalls[i].url, mockCalls[i].mockUrl, (mockCalls[i].powerup === "amd") ? true : false);
                }
            }
        }
    };

    // Default hijack: Just pass it along to the normal jQuery ajax method.
    $.ajax = function (options) {
        if (enabled) {
            for (var i = 0; i < hijacks.length; ++i) {
                if (_.isFunction(options.url)) {
                    options.url = options.url();
                }
                var matches = options.url.match(hijacks[i].url);
                if (matches) {
                    matches.splice(0, 1, realAjax, options);

                    if (hijacks[i].amd) {
                        var dfd = $.Deferred();
                        amdMock(hijacks[i].file, options.type, options.success, options.data, dfd);
                        return dfd.promise();
                    } else {
                        return hijacks[i].call.apply(this, matches);
                    }
                }
            }
            console.log("ajax: dropped request to \"%o\".", options.url);
        } else {
            return realAjax.apply(this, arguments);
        }
    };

    var amdMock = function (file, type, successCallback, data, dfd) {
        require([file], function (powerup) {
            dfd.resolve();
            successCallback.call(this, powerup[type.toLowerCase()].call(this, data));
        });
    };

    _.mixin({
        ajaxMock: function (urlPattern, amd, mockUrl, func) {
            _.ajaxUnmock(urlPattern);
            hijacks.unshift({
                url: urlPattern,
                amd: amd,
                file: mockUrl,
                call: func

            });
        },

        ajaxUnmock: function (urlPattern) {
            for (var i = 0; i < hijacks.length; ++i) {
                if (hijacks[i].url.toString() === urlPattern.toString()) {
                    hijacks.splice(i--, 1);
                }
            }
        },

        ajaxMockEnabled: function (state) {
            if (_.isUndefined(state)) {
                enabled = state;
            }
            return enabled;
        }
    });

    processMapper();

});
define('utilities/utils',[
    "jquery", "underscore", "backbone", "utilities/viewable-utils", "utilities/ajax-mock"
], function ($, _, Backbone) {
    "use strict";

    _.mixin({
        /** Translate a string
         * @param {String} str The string to merge in params.
         * @param {Object} The remaining arguments that replace %0..%N in
         * the string.
         * @return {String} The merged string.
         */
        formatString: function (str /*, arg1, arg2, ...*/) {
            var localeArgs = _.toArray(arguments);

            return str.replace(/%([0-9]+)/g, function (match, g1) {
                var value = localeArgs[parseInt(g1, 10) + 1];

                return value != null ? value : "";
            });
        },

        /** Extract markup from htm template and inject values.
         *  @param {Object} $markup jQuery object of the template content.
         *  @param {String} clazzName Class name of the element to select.
         *  @param {Object} map Map containing values to inject into markup.
         *  @return {String} Html containing injected values.
         */
        pluckMarkup: function ($markup, clazzName, map) {
            var template = $markup.filter(clazzName).html();
            if (map == null) {
                return template;
            }
            return _.template(template, map);
        },

        getLayout: function () {
            var width = $(window).width();
            if (width < 768) {
                return "mobile";
            } else if (width <= 980) {
                return "tablet-portrait";
            } else if (width <= 1024) {
                return "tablet-landscape";
            } else if (width <= 1400) {
                return "desktop";
            } else {
                return "desktop-wide";
            }
        },

        convertURLParametersToHashed: function (url) {
            var i = url.indexOf("?");
            if (i > 0) {
                var params = url.substring(i);
                url = url.replace("?", "#form/");
                //replace all "=" with "/"
                url = url.split("=").join("/");
                //replace all "&" with "/"
                url = url.split("&").join("/");
            }

            return (url);

        },

        formatDate: function (date) {
            return date.replace(/-/g, "/");
        }
    });
});
define('app',[
    "jquery", "underscore", "backbone",
    "workflows/workflowsRouter",
    "formEngine/formRouter",
    "functionEditor/functionEditorRouter",
    "less", "bootstrap", "jquery-ui",
    "jquery.scrollintoview",
    "backbone.deep-model", "backbone.deep-model.mixins",
    "utilities/console-utils",
    "utilities/utils",
    "pgbucoreapi", "oui", "gridapi"
], function ($, _, Backbone, WorkflowsRouter, FormRouter, FunctionEditorRouter) {
    "use strict";

    return {
        initialize: function () {
            // use mustache style tags
            _.templateSettings.interpolate = /\{\{([\s\S]+?)\}\}/g;

            $(function () {
                var fragment = "";

                new WorkflowsRouter();
                new FormRouter();
                new FunctionEditorRouter();

                var currentUrl = Backbone.history.location.href;

                // URL with ?
                if (Backbone.history.location.href.indexOf("?") >= 0)
                {
                    Backbone.history.location.href = _.convertURLParametersToHashed(currentUrl);
                }

                else
                {
                    Backbone.history.start();
                    fragment = Backbone.history.getFragment();
                    if (fragment == null || fragment === "") {
                        Backbone.history.navigate("demoPage", {trigger: true});
                    }
                }
            });
        }
    };
});
require.config({
    has: {
        production: false
    },

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
        "mousewheel": {
            deps: [
                "jquery"
            ],
            exports: "jQuery.fn.mousewheel"
        },

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
    "app"
], function (App) {
    "use strict";

    App.initialize();
});
define("loader", function(){});
