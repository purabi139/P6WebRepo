define([
    "underscore", "backbone", "pgbu-backbone", "formEngine/formEngineEnum" , "event-bus"
], function (_, Backbone, PgbuBackbone, Enum, EventBus) {
    "use strict";

    var workflowApiInvokerModel = PgbuBackbone.Model.extend({
        _response : null,
        initialize : function () {
        },
        _urlMapper : {
          completeWFTask : {url : "rest/workflows/signOff/", id : "taskAssignmentId"}
        },
        urlRoot : function () {
            if (this._urlMapper[this._actionType].id!=null){
                return this._urlMapper[this._actionType].url+this._urlMapper[this._actionType].id;
            }else{
                return this._urlMapper[this._actionType].url;
            }
        },
        setActionType : function (actionType) {
            this._actionType = actionType;
        },
        setId : function (Id) {
            this._urlMapper[this._actionType].id=Id;
         },
        parse : function (rsp) {
            this._response = rsp;
        },

        getResponse : function () {
            return this._response;
        }
    });


    return workflowApiInvokerModel;
});