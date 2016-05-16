define([
    "underscore", "backbone", "pgbu-backbone", "formEngine/formEngineEnum"
], function (_, Backbone, PgbuBackbone, Enum) {
    "use strict";

    var formMetadataModel = PgbuBackbone.Model.extend({
        url: function () {
            return this._resolveUrl();

        },

        parse: function (rsp) {
            return this.tabSetFix(rsp);
        },

        tabSetFix: function (rsp) {
            if (rsp.children[0].type === Enum.WidgetType.TAB) {
                var mainTabSetWidget = {
                    type: Enum.WidgetType.TAB_SET,
                    children: []
                };
                rsp.children[0].active = true;
                mainTabSetWidget.children = rsp.children;
                rsp.children = [];
                rsp.children.push(mainTabSetWidget);
            }
            return rsp;
        },

        getFormChildren: function () {
            return this.get("children");
        },

        getFormTitle: function () {
            return this.get("formTitle");
        },

        getProjectCodes: function () {
            return this.get("projectCategoryTypes");
        },

        getFormEntity: function () {
            return this.get("formEntity");
        },
        getFormEntityId: function () {
            return this.get("entityId");
        },
        _resolveUrl: function () {
            if (this.get("formContext.clientType")!=null)
            {
                return "rest/forms/" + this.get("formContext.clientType")+"/" +this.get("formContext.id") ;
            }else{
                return "rest/forms/" + this.get("formContext.formId");
            }
        }
    });

    return formMetadataModel;
});