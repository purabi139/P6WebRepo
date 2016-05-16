define([
    "underscore", "backbone", "pgbu-backbone", "formEngine/formEngineEnum" , "event-bus"
], function (_, Backbone, PgbuBackbone, Enum, EventBus) {
    "use strict";

    var workflowInstanceModel = PgbuBackbone.Model.extend({
        _response : null,
        initialize : function () {
        },

        url : function () {
            return "rest/workflows/start";
        },

        parse : function (rsp) { //retrieve TaskInstanceAssignmentRO
            this._response = rsp;
        },

        getUsersAssignments : function () {
            return this._response.usersAssignments;
        },

        getWorkflowInstance : function(){
            return this._response.usersAssignments;
        }
    });
    return workflowInstanceModel;
});