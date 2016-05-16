define([
    "common/pageView", "i18n!nls/localeStrings",
    "utilities/toolbar",
    "text!functionEditor/editorTemplate.html",
    "functionEditor/functionEditorEnums",
    "codemirror", "codemirror.groovy"
], function (PageView, locale, Toolbar, EditorTemplate, FunctionEditorEnums) {
    "use strict";

    var defaultFunction = "/*\n * SAMPLE FUNCTION\n */\nProjectStatus status = (ProjectStatus) getProjectValue(\"status\");\n\nif(status == ProjectStatus.IN_PROGRESS) {\n\treturn \"Progress\";\n}\nelse if(status == ProjectStatus.COMPLETED) {\n\treturn \"Completed\";\n}\nelse {\n\treturn \"Started\";\n}";

    return PageView.extend({
        events: {
            "change #objectTypeDropdown": "_onObjectTypeChange",
            "change #fieldNameDropdown": "_onTargetFieldChange",
            "click .deleteFunctionButton": "_deleteFunctionClicked",
            "click .saveFunctionButton": "_saveFunctionClicked"
        },

        getContentMarkup: function () {
            return _.template(EditorTemplate)({
                locale: locale
            });
        },

        removePage: function () {
            this._codeInput = null;
        },

        renderChildren: function () {
            var codeInputElement = this.$("#functionCodeInput");

            if (codeInputElement.length > 0) {
                this._codeInput = CodeMirror.fromTextArea(codeInputElement.get(0), {
                    mode: "text/x-groovy",
                    theme: "eclipse",
                    indentUnit: 4,
                    indentWithTabs: true,
                    lineNumbers: true
                });
                this._codeInput.setValue(defaultFunction);
            }
            codeInputElement = null;
        },

        fillTargetFieldDropdown: function (targetFields) {
            var fieldNameDropdown = document.getElementById("fieldNameDropdown");

            //Clear the dropdown and add an empty default option
            fieldNameDropdown.options.length = 0;
            fieldNameDropdown[0] = new Option("");

            targetFields.forEach(function (fieldRO) {
                var optionText = fieldRO.get("columnName") + " (" + fieldRO.get("columnType") + ")";
                var optionValue = fieldRO.get("columnId");

                var length = fieldNameDropdown.length;
                fieldNameDropdown[length] = new Option(optionText, optionValue);
            });


            /*
             Populate Object Type and Column Name combo-boxes with data from the server.
             */

            fieldNameDropdown = null;
        },

        fillEditorWithCode: function (functionBody) {
            if (this._codeInput != null) {
                this._codeInput.setValue(functionBody);
            }
            if(functionBody == "" || functionBody == " ") {
                $(".deleteFunctionButton").attr("disabled", true);
            }
            else {
                $(".deleteFunctionButton").attr("disabled", false);
            }
        },

        _saveFunctionClicked: function () {

            var fieldId = this._getSelectedFieldId();
            var objectType = this._getSelectedObjectType();

            if(fieldId == "") {
                alert(locale.label.functionEditor.choose_target_field_alert);
                return;
            }

            if (this._codeInput != null) {
                this.trigger(FunctionEditorEnums.Event.SAVE_BUTTON_CLICKED, {
                    fieldId: fieldId,
                    objectType: objectType,
                    functionCode: this._codeInput.getValue()
                });
            }
        },

        saveFunctionSuccess: function(fieldId) {
            alert(locale.label.functionEditor.function_saved_successfully_alert + fieldId);
            $(".deleteFunctionButton").attr("disabled", false);
        },

        saveFunctionFailed: function(functionModel, fieldId) {
            var addResult = functionModel.get("addFunctionResult");

            if(addResult.wrongReturnType) {
                alert(locale.label.functionEditor.function_save_failed_alert + fieldId + locale.label.functionEditor.wrong_return_type);
                return;
            }

            if(addResult.reasonForFailure != null) {
                alert(locale.label.functionEditor.function_save_failed_alert + fieldId + "\n" +
                    locale.label.functionEditor.because + ": \n" + addResult.reasonForFailure);
            }
            else {
                alert(locale.label.functionEditor.function_save_failed_alert + fieldId);
            }

            if(addResult.lineNumber > 0) {
                this._markLineInEditor(addResult.lineNumber);
            }

        },

        _deleteFunctionClicked: function () {
            var fieldId = this._getSelectedFieldId();
            var objectType = this._getSelectedObjectType();

            if(fieldId == "") {
                alert(locale.label.functionEditor.choose_target_field_alert);
                return;
            }

            var deletionApproved = confirm(locale.label.functionEditor.confirm_deletion_prompt);
            if(!deletionApproved) {
                return;
            }

            this.trigger(FunctionEditorEnums.Event.DELETE_BUTTON_CLICKED, {
                fieldId: fieldId,
                objectType: objectType
            });

        },

        deleteFunctionSuccess: function() {
            this.clearFunctionCodeAndDisableDeleteButton();
            alert(locale.label.functionEditor.function_deleted_successfully_alert);
        },

        deleteFunctionFailed: function(fieldId) {
            alert(locale.label.functionEditor.function_delete_failed_alert + fieldId);
        },

        clearFunctionCodeAndDisableDeleteButton : function() {
            if (this._codeInput != null) {
                this._codeInput.setValue("");
            }

            $(".deleteFunctionButton").attr("disabled", true);
        },

        alertMessage: function(messageText) {
            console.log(messageText);
            alert(messageText);
        },

        _onObjectTypeChange: function () {
            var selectedObjectType = this._getSelectedObjectType();

            this.trigger(FunctionEditorEnums.Event.TARGET_OBJECT_TYPE_CHANGED, {
                objectType: selectedObjectType
            });
        },

        _onTargetFieldChange: function () {
            var fieldId = this._getSelectedFieldId();

            if(fieldId == "") {
                this.clearFunctionCodeAndDisableDeleteButton();
                $(".saveFunctionButton").attr("disabled", true);
                return;
            }

            $(".saveFunctionButton").attr("disabled", false);

            var objectType = this._getSelectedObjectType();

            this.trigger(FunctionEditorEnums.Event.TARGET_FIELD_CHANGED, {
                fieldId: fieldId,
                objectType: objectType
            });

        },

        _getSelectedObjectType: function() {
            var objectTypeDropdown = document.getElementById("objectTypeDropdown");
            var selectedIndex = objectTypeDropdown.selectedIndex;

            var selectedObjectType = objectTypeDropdown.options[selectedIndex].text;

            objectTypeDropdown = null;
            selectedIndex = null;

            return selectedObjectType;
        },

        _getSelectedFieldId: function() {
            var fieldNameDropdown = document.getElementById("fieldNameDropdown");
            var selectedIndex = fieldNameDropdown.selectedIndex;

            var targetFieldId = fieldNameDropdown.options[selectedIndex].value;

            fieldNameDropdown = null;
            selectedIndex = null;

            return targetFieldId;
        },

        _markLineInEditor: function(lineNumber) {
            var self = this;
            this._codeInput.addLineClass(lineNumber - 1, "background", "marked");
            setTimeout(function() {self._codeInput.removeLineClass(lineNumber - 1, "background", "marked")}, 3000);
        }
    });
});