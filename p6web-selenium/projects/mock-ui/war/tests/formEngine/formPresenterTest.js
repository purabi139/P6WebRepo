define([
    "jquery", "underscore", "formEngine/formPresenter", "../../tests/formEngine/formTestHelper", "formEngine/formEngine"
], function ($, _, FormPresenter, FormTestHelper, FormEngine) {
    "use strict";

    return {
        runTests : function () {
            var _formContext = {"formContext":
            {
                entityType : "project",
                entityId : 0,
                formId : 0
            }

            };
            module("Form Presenter Test");
            asyncTest("Form Engine create Form Test.", function () {
                var formPresenter = new FormPresenter();
                formPresenter._formContext = _formContext;
                var formEngine = new FormEngine();
                formEngine.init();

                FormTestHelper.getMetaDataModel(function () {
                    ok(true, "Meta data model could retrieve data.");
                    start();
                });

            });
//            asyncTest("Form view render Test.", function () {
//                formPresenter.getForm({ id : 1 });
//                setTimeout(function () {
//                    formView = formPresenter.formView;
//
//                    equal(formView.$(".control-group input[id*=\"widget\"]").length, 14,
//                        "Form View html contains 14 text widget");
//                    start();
//                }, 300);
//            });
        }
    };
});