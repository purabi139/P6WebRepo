define([
    "jquery", "underscore", "backbone", "common/widgetView", "event-bus", "formEngine/formEngineEnum", "common/pageView",
    "formEngine/formDataModel"
], function ($, _, Backbone, WidgetView, EventBus, Enum, PageView,FormDataModel) {
    "use strict";

    return WidgetView.extend({

        /* Abstract methods */

        // Override to allow widget-specific initializations at the beginning of the life-cycle of the form widget.
        initializeFormWidget: $.noop,

        // Override to add widget-specific listeners registration.
        registerFormListeners: $.noop,

        // Override to allow implement after form dataModel updated
        updateFormData: $.noop,

        // Override to implement children rendering
        doRender: $.noop,

        // Override for post render business logic
        postRender: $.noop,

        // Override to implement after main control selected
        controlSelected: $.noop,

        // Override to implement after main control value changed
        controlChanged: $.noop,

        // Override to implement form widget specific cleanup (like events off & unDelegateEvents)
        removeFormWidget: $.noop,

        controlBlur: $.noop,

        getWidgetValue: $.noop,

        postControlChanged: $.noop,

        /* methods */

        $mainControl: {},
        _updateListenerName: "",
        _initialDataModel: null,
        _tooltipTpl: "Field: %0, Value: %1",
        _defaults: {
            readOnly: false,
            mandatory: false,
            hidden: false,
            dataKey: ""
        },

        events: {
            "mouseover .main-control": "_mouseover",
            "focus .main-control": "_mainControlSelected",
            "change": "_controlChanged",
            "blur .main-control": "_controlBlur"
        },

        initializeWidget: function () {
            this._parent = null;

            _.defaults(this.options, this._defaults);
            this.options.controlId = _.uniqueId("widget_");
            this.initializeFormWidget();
            this._registerListeners();

        },

        _registerListeners: function () {
            EventBus.on(Enum.FORM_DATA_LOADED, this._initialDataModelUpdate, this);
            this._updateListenerName = _.formatString(Enum.FORM_WIDGET_DATA_CHANGED_TPL, this.options.dataKey);
            EventBus.on(this._updateListenerName, this._updateDataChange, this);

            this.registerFormListeners();

        },

        unboundListeners: function () {
            EventBus.off(Enum.FORM_DATA_LOADED, this._initialDataModelUpdate, this);
            EventBus.off(this._updateListenerName, this._updateDataChange, this);
            this.undelegateEvents();
        },

        _initialDataModelUpdate: function (params) {
            this._updateControlsPointers();
            this._initialDataModel = params.initModel;
            var valueToUpdate = this._initialDataModel.getFormValue(this.options.dataKey);
            this._setData(valueToUpdate);
            this.updateFormData();
        },

        _updateControlsPointers: function () {
            this.$mainControl = this.$el.find(".main-control");
        },

        _setData: function (value) {
            if (value == null) {
                return;
            }
            this.setData(value);
        },

        renderChildren: function () {
            if (this.options.hidden) {
                this.$el.children().remove();
                return;
            }
            this.doRender();
        },

        _mouseover: function (event) {
            var $target = $(event.target);
            $target.attr("title", this._getTooltip($target));
        },

        _getTooltip: function ($target) {
            var tipVal = $target.val();
            if ($target.get(0).nodeName === "SELECT") {
                tipVal = $target.find("option:selected").text();
            }
            return _.formatString(this._tooltipTpl, this.options.customLabel, tipVal);
        },

        _mainControlSelected: function (event) {
            if (this.options.readOnly) {
                return;
            }
            var $target = event.target;
            this.controlSelected(event, $target);
        },

        _controlChanged: function (event) {
            var $target = $(event.target);
            this._valueChanged($target);
            this.controlChanged($target);
        },

        _valueChanged: function ($target) {
            var newVal = $target.val();

            var typedVal = this.getWidgetValue(newVal);
            if (typedVal != null) {
                newVal = typedVal;
            }
            if (this._initialDataModel.getFormValue(this.options.dataKey) === newVal) {
                return;
            }
            this.updateModel(newVal);
            this.triggerUpdate(newVal);
        },

        updateModel: function (newVal) {
            this._initialDataModel.setFormValue(this.options.dataKey, newVal,
                this.options.projectCategoryTypeId != null);

        },

        triggerUpdate: function (newVal) {
            EventBus.trigger(this._updateListenerName, {
                name: this.options.dataKey,
                value: newVal,
                formControlId: this.options.formControlId
            }, this);
            EventBus.trigger(Enum.CONTROL_CHANGED, { id: this.options.dataKey, value: newVal });
        },

        _controlBlur: function (event) {
            var $target = $(event.target);
            this.controlBlur($target);
        },

        _updateDataChange: function (params) {
            if (params.formControlId === this.options.formControlId) {
                return;
            }
            this._setData(params.value);
        },

        removeWidget: function () {
            //EventBus.off();  //TODO need to be off , without grunt timeout!
            this.removeFormWidget();
            this.$el.empty();
        },

        _setParent: function (parent) {
            this._parent = parent;
        }
    });
});