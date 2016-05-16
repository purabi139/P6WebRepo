define([
    "underscore", "pgbu-backbone",
    "navigation/actionBar/actionBarEnums",
    "workflows/editor/editorModel", "workflows/editor/editorView"
], function (_, PgbuBackbone, ActionBarEnums, WorkflowEditorModel, WorkflowEditorView) {
    "use strict";

    return PgbuBackbone.Presenter.extend({
        initialize: function () {
            var self = this;

            this._createView();
            this._getFetchModel().fetch({
                success: function (model) {
                    self._view.setData({
                        workflow: model.toJSON()
                    });
                }
            });
        },

        _getFetchModel: function () {
            return this.options.creatingNewWorkflow === true ?
                (new WorkflowEditorModel.FetchNewWorkflow()) :
                (new WorkflowEditorModel.ExistingWorkflow({
                    ID: this.options.id
                }));
        },

        _createView: function () {
            var self = this;

            this._view = new WorkflowEditorView({
                creatingNewWorkflow: this.options.creatingNewWorkflow
            });
            this._view.on(ActionBarEnums.Event.CANCEL, function () {
                this.reload();
            }, this);
            this._view.on(ActionBarEnums.Event.SAVE, function () {
                (new WorkflowEditorModel.ExistingWorkflow({
                    ID: (this.options.creatingNewWorkflow === true ? null : this.options.id)
                })).save(this._view.getData(), {
                    success: function (model, response, options) {
                        self._view.clean();
                        if (self.options.creatingNewWorkflow === true) {
                            self.navigateToFragment(_.formatString("workflows/%0/editor", model.id), {
                                trigger: true
                            });
                        }
                    }
                });
            }, this);
        }
    });
});