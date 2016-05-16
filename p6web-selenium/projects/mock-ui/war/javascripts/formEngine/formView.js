define([
    "jquery", "underscore", "backbone", "pgbu-backbone", "common/pageView", "navigation/actionBar/actionBarEnums",
    "text!formEngine/formEngineViewTemplate.html",
    "event-bus",
    "formEngine/formEngineEnum",
    "formEngine/formDataModel"
], function ($, _, Backbone, PgbuBackbone, PageView, ActionBarEnums, FormTemplate, EventBus, Enum, FormDataModel) {
    "use strict";

    var formTpl = _.pluckMarkup($(FormTemplate), ".htm-formTemplate", null);


    return PageView.extend({
        initializePage: function () {
            this._registerListeners();
        },

        _registerListeners: function () {
            EventBus.on(Enum.CONTROL_CHANGED, this.controlChanged, this);//this.listenTo(this._initialModel, 'change', this.controlChanged);
        },

        getActionBarSettings: function () {
            if (this.options.formType === Enum.FormType.WF_TASK_ASSIGNMENT)  {
                return {type: ActionBarEnums.Type.COMPLETE_SAVE_CANCEL};
            }
            return {type: ActionBarEnums.Type.SAVE};

        },

        getPageHeaderSettings: function () {
            return {
                heading: this.options.title
            };
        },

        getContentMarkup: function () {
            return formTpl;
        },

        getWidgets: function () {
            return this.options.widgets;
        },

        setData: function (model) {
            this._initialModel = model;
            EventBus.trigger(Enum.FORM_DATA_LOADED, { initModel: model });
        },

        renderChildren: function () {
            var _$tempEl = $("<div>");
            this._prepareWidgetsForRender(this.getWidgets(), _$tempEl);

            this.disableActionBarButton(ActionBarEnums.Selector.CANCEL_BUTTON);
            this.disableActionBarButton(ActionBarEnums.Selector.SAVE_BUTTON);
            
            this.$(".formWidgets").append(_$tempEl.children());
            return this;
        },

        _prepareWidgetsForRender: function (children, tempEl) {
            _.each(children, function (widget) {
                var container = $("<div>");
                widget.render(container.get(0));
                widget.setElement(container.find(".anchor").get(0));
                tempEl.append(container.children());
            }, this);
        },

        removePage: function () {
            _.each(this.getWidgets(), function (child) {
                    child.remove();
                }, this
            );
        },

        controlChanged: function (params) {
            this.enableActionBarButton(ActionBarEnums.Selector.CANCEL_BUTTON);
            this.enableActionBarButton(ActionBarEnums.Selector.SAVE_BUTTON);
            this.dirty();
        }
    });
});