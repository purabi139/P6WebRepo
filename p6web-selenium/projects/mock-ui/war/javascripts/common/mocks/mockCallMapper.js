/*
 * Place all mock calls into this file.
 * To activate a mock call switch useMock flag to true.
 */
(function () {
    "use strict";

    window.mock_call_mapper = [
        {
            name : "Workflow Editor Mock",
            url : /rest\/workflows\/templates\/0/,
            mockUrl : "workflows/editor/editorMock",
            useMock : true,
            powerup : "amd"
        },
        {
            name : "Form Metadata",
            url : /rest\/forms\/0/,
            mockUrl : "javascripts/formEngine/mocks/tabbedFormMetadataMock.json",
            useMock : true
        },
        {
            name : "Form Metadata",
            url : /rest\/forms\/\d+\/qa/,
            mockUrl : "javascripts/formEngine/mocks/demo/qa_tabbedFormMetadataMock.json",
            useMock : true
        },
        {
            name : "Form Data",
            url : /rest\/projects\/0/,
            mockUrl : "javascripts/formEngine/mocks/formDataMock.json",
            useMock : true
        },
        {
            name : "QA Form Data",
            url : /rest\/forms\/\d+\/data\/qa/,
            mockUrl : "javascripts/formEngine/mocks/demo/formDataMock.json",
            useMock : true
        },
        {
            name : "Form Setting Data",
            url : /rest\/forms\/catTypes\/*/,
            mockUrl : "javascripts/formEngine/mocks/formSettingDataMock.json",
            useMock : false
        },
        {
            name : "Function Editor Fields Mock",
            url : /rest\/functions\/fields$/,
            mockUrl : "functionEditor/editorFieldsMock",
            useMock : false,
            powerup : "amd"
        },
        {
            name : "Function Editor Functions Mock",
            url : /rest\/functions\/fields\/\d+/,
            mockUrl : "functionEditor/editorFunctionsMock",
            useMock : false,
            powerup : "amd"
        },
        {
            name : "Start workflow",
            url : /rest\/workflows\/start/,
            mockUrl : "javascripts/formEngine/mocks/startWorkflowMock.json",
            useMock : false
        }
    ];
}());