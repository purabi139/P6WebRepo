define([
    "underscore", "backbone", "pgbu-backbone"
], function (_, Backbone, PgbuBackbone) {
    "use strict";

    var formDataModel = PgbuBackbone.Model.extend({

        _urlMapper : {
            project : {url : "rest/projects", idAttribute : "projectId"},
            completeWFTask : {url : "rest/workflows/signOff", idAttribute : "taskAssignmentId"}
        },

        urlRoot : function () {
            return this._urlMapper[this._entityType].url;
        },

        parse : function (rsp) {

            return rsp;
        },

        getFormValue : function (key) {
            var retVal = this.get(key + "");

            if (this.get("projectId")==null){
                return;
            }

            if (key === "picker") {
                retVal = this.get("parentProject");
            }
            if (retVal == null) {
                retVal = this.get("projectCategoryValues")[key];
            }
            return retVal;
        },

        setFormValue : function (key, value, isCode) {
            if (isCode) {
                this._setProjectCode(key, value);
            }
            else {
                if (key === "parentProject") {
                    value = value.parentProject;
                }
                this.set(key, value, {
                    silent : true
                });
            }
        },

        _setProjectCode : function (code, value) {
            var projectCategoryValues = this.get("projectCategoryValues") ==null? {}: this.get("projectCategoryValues");
            projectCategoryValues[code] = value;

            this.unset("projectCategoryValues", projectCategoryValues, {
                silent : true
            });
            this.set("projectCategoryValues", projectCategoryValues, {
                silent : true
            });
        },

        setEntityType : function (entity) {
            this._entityType = entity;
            this.idAttribute = this._urlMapper[this._entityType].idAttribute;
        },

        setEntityId : function (entityId) {
            this.set(this.idAttribute, entityId, {
                silent : true
            });
        },

        getChanges : function () {
            var changes = this.changedAttributes();
            this._fixChangesHierarchy(changes);
            changes.projectId = this.get("projectId");
            return changes;
        },

        _fixChangesHierarchy : function (changes) {
            if (changes["parentProject.id"] != null) {
                var parentId = changes["parentProject.id"];
                var parentLabel = changes["parentProject.label"];
                changes.parentProject = ({
                    id : parentId,
                    label : parentLabel
                });
                delete changes["parentProject.id"];
                delete changes["parentProject.label"];

            }
            for (var propertyName in changes) {
                if (propertyName.search("projectCategoryValues") > -1) {
                    var tempArray = propertyName.split(".");
                    if (changes.projectCategoryValues == null) {
                        changes.projectCategoryValues = {};
                    }
                    if (changes.projectCategoryValues[tempArray[1]] == null) {
                        changes.projectCategoryValues[tempArray[1]] = {};
                    }
                    changes.projectCategoryValues[tempArray[1]] = changes[propertyName];
                    delete changes[propertyName];
                }
            }

        }
    });
    return formDataModel;
});