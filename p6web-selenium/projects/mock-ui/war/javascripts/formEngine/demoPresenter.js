define([
    "jquery", "underscore", "backbone", "pgbu-backbone", "event-bus",
    "formEngine/demoView", "formEngine/workflowInstanceModel", "formEngine/formEngineEnum", "navigation/logout/logoutModel"
], function ($, _, Backbone, PgbuBackbone, EventBus, DemoView, WFInstanceModel, Enum, LogoutModel) {
    "use strict";

    return PgbuBackbone.Presenter.extend({
        initialize: function () {
            this._registerListeners();
            this._demoView = new DemoView();
        },

        _registerListeners: function () {
            EventBus.on("createTestProject", this._createTestProject, this);
            EventBus.on("createProject", this._createProject, this);
            EventBus.on("logout", this._logout, this);
            //hard coded navigation - TODO : remove after implementation
            EventBus.on("navigateToWFEditor", function () {
                this.navigateToFragment("#workflows/3/editor", {
                    trigger: true
                });
            }, this);
            EventBus.on("navigateToWFEditorNew", function () {
                this.navigateToFragment("#workflows/editor", {
                    trigger: true
                });
            }, this);
            EventBus.on("showForm2", function () {
                this.navigateToFragment("#form/2/entity/4467", {
                    trigger: true
                });
            }, this);
            EventBus.on("showForm3", function () {
                this.navigateToFragment("#form/3/entity/4467", {
                    trigger: true
                });
            }, this);
        },


        _createTestProject: function () {
            var self = this;
            this._instanceModel = new WFInstanceModel();

            var attributes = {
                workflowTemplateID: 2,
                workflowInstanceName: "instance Name",
                useDefaultManager: false,
                useDefaultScope: false,
                scopePortfolioID: 4467,
                useDefaultRunAsUserID: false,
                runAsUserID: 92,
                useDefaultCanAccessAllData: false,
                canAccessAllData: false,
                useLoggedInUserAsManager: true
            };
            this._instanceModel.save(attributes, {
                success: function (model, rsp) {
                    self._workflowStarted(model);
                }
            });
        },

        _createProject: function () {
            var self = this;
            this._instanceModel = new WFInstanceModel();
            var attributes = {
                workflowTemplateID: 3,
                workflowInstanceName: "instance for demo Name",
                useDefaultManager: false,
                useDefaultScope: false,
                scopePortfolioID: 4467,
                useDefaultRunAsUserID: false,
                runAsUserID: 92,
                useDefaultCanAccessAllData: false,
                canAccessAllData: false,
                useLoggedInUserAsManager: true
            };
            this._instanceModel.save(attributes, {
                success: function (model, rsp) {
                    self._workflowStarted(model);
                }
            });
        },

        _workflowStarted: function (model) {
            this._setAssignmentId(model.getUsersAssignments());
            this._navigate();
        },

        _setAssignmentId: function (usersAssignments) {
            this._firstAssignmentId = usersAssignments[0].ID;
        },

        _navigate: function () {
            this.navigateToFragment(this._getAssignmentURL(), {
                trigger: true
            });
        },

        _getAssignmentURL: function () {
            return _.formatString(Enum.FORM_TASK_ASSIGNMENT_URL, this._firstAssignmentId);
        },

        _logout : function(){
            var self = this;
            var logoutModel = new LogoutModel();
            logoutModel.save({},{
                success: function(model, rsp){
                    self._navigateToLogin();
                },
                error :  function(model, rsp){
                    self._navigateToLogin();
                }
            });
        },

        _navigateToLogin: function (){
            var url = location.href.split("#")[0];
            var baseUrl = url.split("index.html")[0];
            location.replace(baseUrl+"login.jsp");
        }
    });
});