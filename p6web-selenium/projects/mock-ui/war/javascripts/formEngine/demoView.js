define([
    "jquery", "underscore", "backbone", "pgbu-backbone",
    "common/pageView",
    "text!formEngine/formEngineViewTemplate.html",
    "event-bus",
    "formEngine/formEngineEnum"
], function ($, _, Backbone, PgbuBackbone, PageView, FormTemplate, EventBus, Enum) {
    "use strict";

    var demoTpl = _.pluckMarkup($(FormTemplate), ".htm-demoTemplate", null);


    return PageView.extend({

        initializePage: function () {
            this._registerListeners();
        },
        events: {
            "click .createTestProject": "_createTestProject",
            "click .createProject": "_createProject",
            "click .workflowEditor": "_navigateToWFEditor",
            "click .workflowEditorNew": "_navigateToWFEditorNew",
            "click .showForm2": "_showForm2",
            "click .showForm3": "_showForm3",
            "click .logout": "_logout"
        },

        _registerListeners: function () {
            //EventBus.on(Enum.CONTROL_CHANGED, this.controlChanged, this);
        },

        getPageHeaderSettings: function () {
            return {
                heading: "Workflows "
            };
        },

        _createTestProject: function () {
            EventBus.trigger("createTestProject");
        },
        _createProject: function () {
            EventBus.trigger("createProject");
        },
        _navigateToWFEditor: function () {
            EventBus.trigger("navigateToWFEditor");
        },
        _navigateToWFEditorNew: function () {
            EventBus.trigger("navigateToWFEditorNew");
        },
        _showForm2: function () {
            EventBus.trigger("showForm2");
        },
        _showForm3: function () {
            EventBus.trigger("showForm3");
        },

        _logout : function(){
            EventBus.trigger("logout");
        },

        getContentMarkup: function () {
            return demoTpl;
        },

        renderChildren: function () {
            return this;
        },

        removePage: function () {
        },

        controlChanged: function (params) {
            this.dirty();
        }
    });
});