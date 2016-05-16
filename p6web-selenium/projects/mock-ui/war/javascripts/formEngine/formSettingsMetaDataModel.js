define([
    "underscore", "backbone", "pgbu-backbone"
], function (_, Backbone, PgbuBackbone) {
    "use strict";

    var formSettingsMetadataModel = PgbuBackbone.Model.extend({
        _formId: null,
        _url: null,
        _response: null,

        defaults: {
        },

        initialize: function () {

            this._formId = this.get("formContext.id");
            //            if (this.get("formContext.clientType")!=null){
            //                this._url ="/rest/forms/"+this.get("formContext.clientType")+"/catTypes/";
            //            }
            //            else{
            this._url = "rest/forms/catTypes/";

            // }

            _.each(this.get("codeTypes"), function (code) {
                this._url = this._url + code + ",";
            }, this);

        },

        url: function () {
            return this._url;
        },

        parse: function (rsp) {
            return this._response = rsp;
        },

        getAllSettings: function () {
            return this._response[0].children;
        }

    });
    return formSettingsMetadataModel;
});