define([
    "jquery", "underscore", "backbone", "event-bus", "formEngine/formWidgetView",
    "text!formEngine/formEngineViewTemplate.html",
    "formEngine/formEngineEnum", "oui", "i18n!nls/localeStrings"
], function ($, _, Backbone, EventBus, FormWidgetView, formTemplate, Enum, OUI, localeStrings) {
    "use strict";

    var template = _.pluckMarkup($(formTemplate), ".htm-pickerTemplate", null);

    return FormWidgetView.extend({

        initializeFormWidget : function () {
            this.options.dataKey = "parentProject";
        },

        getContentMarkup : function () {
            return _.template(template)({ options : this.options });
        },

        doRender : function () {
            var self = this;
            var locale = {};
            locale.title = _.formatString( localeStrings.text.select,  this.options.customLabel);

            this.$el.find("input").picker({
                style : "outside",
                rootId : "0",
                multiSelect : false,
                fluid : true,
                locale : locale,
                // todo: make the filtering parametrized (currently always EPS)
                // todo: make the retrieval  parametrized (currently always retrieves projects)

                storeFns : {
                    load : function () {
                        return $.ajax({
                            url : "rest/projects/childnodes/0/EPS"

                        });
                    },

                    loadChildren : function (id) {
                        return $.ajax({
                            url : "rest/projects/childnodes/" + id + "/EPS",
                            type : "GET",
                            dataType : "json"
                        });
                    },
                    submit : function (selected) {
                       self._updateValue(selected);
                    }
                }
            });
            return this;
        },

        _updateValue : function(selected){
            var changes = {
                parentProject : {
                    id : selected[0].id,
                    label : selected[0].name
                }
            };
            this.setData(changes.parentProject);
            this.updateModel(changes);
            this.triggerUpdate(changes);
        },

        registerFormListeners : function () {
            EventBus.on(Enum.POST_RENDER, this.postRender, this);
        },

        postRender : function () {
            return this;
        },

        controlSelected : function (event, target) {
        },

        controlChanged : function ($target) {
        },

        controlBlur : function ($target) {
        },

        setData : function (value) {
            this.$el.find("input").val(value.label != null ? value.label : value.parentProject.label);
//            this.triggerUpdate(value);
        },


        removeFormWidget : function () {
        }
    });
});