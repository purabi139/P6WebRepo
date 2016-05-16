define(["pgbu-backbone"], function (PgbuBackbone) {

    var FieldsModel = PgbuBackbone.Model.extend({

    });

    var FieldsCollection = PgbuBackbone.Collection.extend({
        objectType: "Project",
        setObjectType: function(objectType) {
            this.objectType = objectType;
        },

        // URL: rest/{objectType}/fields?isFlex={isFlex}
        url: function() {
            return "rest/" + this.objectType + "/fields?isFlex=true";
        },
        model: FieldsModel
    });

    var FunctionsModel = PgbuBackbone.Model.extend({
        objectType: "Project",
        targetFieldId: -1,
        setObjectTypeAndFieldId: function(targetObjectType, targetFieldId) {
            this.objectType = targetObjectType;
            this.targetFieldId = targetFieldId;
        },

        // URL: rest/{objectType}/fields/{fieldId}/function
        url: function() {
            return "rest/" + this.objectType + "/fields/" + this.targetFieldId + "/function";
        },

        // Need to override this function, otherwise backbone won't let me delete because my functions have no id
        isNew : function() {
            return false;
        }
    });

    return {
        FieldsModel: FieldsModel,

        FieldsCollection: FieldsCollection,

        FunctionsModel: FunctionsModel
    };
});