define([
    "jquery", "underscore", "backbone", "pgbu-backbone", "formEngine/formEngine", "event-bus",
    "formEngine/formDataModel", "formEngine/formEngineEnum", "navigation/actionBar/actionBarEnums","formEngine/apiInvokerModel"
], function ($, _, Backbone, PgbuBackbone, FormEngine, EventBus, FormDataModel, Enum, ActionBarEnums,ApiInvokerModel) {
    "use strict";

    return PgbuBackbone.Presenter.extend({
        _formContext: null,
        _formEngine: null,
        _formView: null,

        initialize: function () {
            this._registerListeners();
        },

        getForm: function (formContext) {
            this._formContext = formContext;
            this._formEngine = new FormEngine();
            this._formEngine.init();
            this._formEngine.getForm(formContext);
        },

        setFormData: function (formView) {
            this._formView = formView;

            this._prepareDataModel();

            if (this._formEngine.getFormEntityId() === Enum.FormEntity.NEW) {
                this._registerActionBarListeners();
                formView.setData(this._dataModel);
                return;
            }
            var self = this;
            this._dataModel.fetch({
                success: function (responseFormData) {
                    formView.setData(responseFormData);
                    self._registerActionBarListeners();
                    self.formView = formView;
                    EventBus.off(Enum.FORM_META_DATA_LOADED);
                    self._formEngine = null;
                }
            });
        },

        _registerActionBarListeners: function () {
            this._formView.on(ActionBarEnums.Event.CANCEL, this._cancelChanges, this);
            this._formView.on(ActionBarEnums.Event.SAVE, this._saveForm, this);
            this._formView.on(ActionBarEnums.Event.COMPLETE, this._completeForm, this);
        },

        _prepareDataModel: function () {
            this._dataModel = new FormDataModel();
            this._formContext.entityType = this._formEngine.getFormEntity();
            this._dataModel.setEntityType(this._formContext.entityType);

            if (this._formContext.entityId == null && this._formEngine.getFormEntityId() !== 0) {
                this._dataModel.setEntityId(this._formEngine.getFormEntityId());
            } else {
                this._dataModel.setEntityId(this._formContext.entityId);
            }
        },

        _registerListeners: function () {
            EventBus.on(Enum.FORM_META_DATA_LOADED, this.setFormData, this);
        },

        _cancelChanges: function (event) {
            this.reload();
        },

        _saveForm: function () {
            var self = this;
            var changes = this._dataModel.getChanges();
            if (changes !== false) {
                if (this._formContext.clientType != null) {
                    this._enrichRequestParams(changes, "SET_SCOPE");
                }
                this._dataModel.save(changes, {
                    patch: true,
                    success: function (response) {
                        self._formView.clean();
                        self._formView.showActionBar();
                      }
                });
            }
        },

        _completeForm: function () {
            var self = this;

            var changes = this._dataModel.getChanges();

            if (this._formContext.clientType != null) {
                this._enrichRequestParams(changes, "COMPLETE");
            }
            if (changes!==false){
                 this._dataModel.save(changes, {
                    patch: true,
                    success: function (response) {
                        self._formView.clean();
                        if (changes.taskAssignmentAction==="COMPLETE"){
                            window.location.reload();
                        }else{
                            self.navigateToFragment("#demoPage", {
                                trigger: true
                            });
                        }
                    }
                });
            }else{
                    this._callRestAPI("completeWFTask",this._formContext.id);
            }

        },
        _callRestAPI:function(actionType,entityId){
            var self = this;
            var apiInvokerModel = new ApiInvokerModel();
            apiInvokerModel.set("assignmentId",entityId);
            apiInvokerModel.setActionType(actionType);
            apiInvokerModel.setId(entityId);

            apiInvokerModel.sync("create",apiInvokerModel,{
                success: function (response) {
                    window.location.reload();
                }});

        },
        _enrichRequestParams: function (changes, action) {
            changes.taskAssignmentId = this._formContext.id;
            changes.taskAssignmentAction = action;
        }
    });
});