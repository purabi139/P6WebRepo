define([
    "i18n!nls/localeStrings",
    "underscore",
    "pgbu-backbone",
    "functionEditor/editorModel", "functionEditor/editorView",
    "functionEditor/functionEditorEnums"
], function (locale, _, PgbuBackbone, FunctionEditorModel, FunctionEditorView, FunctionEditorEnums) {
    "use strict";

    return PgbuBackbone.Presenter.extend({
        initialize: function () {
            var self = this;

            this._view = new FunctionEditorView();
            this._fieldsCollection = new FunctionEditorModel.FieldsCollection();

            this._functionsModel = new FunctionEditorModel.FunctionsModel();

            this._view.on(FunctionEditorEnums.Event.TARGET_OBJECT_TYPE_CHANGED, function (params) {
                this._fillTargetFieldDropdown(params.objectType);
            }, this);
            this._view.on(FunctionEditorEnums.Event.TARGET_FIELD_CHANGED, function (params) {
                this._getFunctionByField(params.objectType, params.fieldId);
            }, this);
            this._view.on(FunctionEditorEnums.Event.SAVE_BUTTON_CLICKED, function (params) {
                this._saveFunction(params.objectType, params.fieldId, params.functionCode);
            }, this);
            this._view.on(FunctionEditorEnums.Event.DELETE_BUTTON_CLICKED, function (params) {
                this._deleteFunction(params.objectType, params.fieldId);
            }, this);


            this._fillTargetFieldDropdown("Project");
        },

        _getFunctionByField: function (objectType, fieldId) {
            var self = this;

            this._functionsModel.setObjectTypeAndFieldId(objectType, fieldId);
            this._functionsModel.fetch({
                success: function (model) {
                    self._view.fillEditorWithCode(model.get("functionCode"));
                },
                error: function(model, xhr, options) {
                    self._view.alertMessage(locale.label.functionEditor.get_function_for_field_failed_alert + fieldId);
                }
            });
        },

        _saveFunction: function (objectType, fieldId, functionCode) {
            var self = this;

            this._functionsModel.setObjectTypeAndFieldId(objectType, fieldId);
            this._functionsModel.save({
                functionCode: functionCode
            },
                {
                    success: function(model, response, options) {
                        var addFunctionResult = model.get("addFunctionResult");
                        if(addFunctionResult.success) {
                            self._view.saveFunctionSuccess(fieldId);
                        }
                        else {
                            self._view.saveFunctionFailed(model, fieldId);
                        }
                    },
                    error: function(model, xhr, options) {
                        self._view.saveFunctionFailed(model, fieldId);
                    }
                });
        },

        _deleteFunction: function(objectType, fieldId) {
            var self = this;
            this._functionsModel.destroy({
                success: function(model, response) {
                    self._view.deleteFunctionSuccess();
                },
                error: function(model, xhr, options) {
                    self._view.deleteFunctionFailed(fieldId);
                }

            });
        },

        _fillTargetFieldDropdown: function(objectType) {
            var self = this;

            if(objectType == undefined) {
                console.log("object type is undefined");
                return;
            }

            this._fieldsCollection.setObjectType(objectType);

            this._fieldsCollection.fetch({
                success: function (fieldCollection, response) {
                    self._view.fillTargetFieldDropdown(fieldCollection);
                    if (self.options.id != null) {
                        self._getFunctionByField(self.options.id);
                    }
                },
                error: function(model, xhr, options) {
                    self._view.alertMessage(locale.label.functionEditor.fill_target_field_dropdown_failed_alert);
                }
            });
        }
    });
});