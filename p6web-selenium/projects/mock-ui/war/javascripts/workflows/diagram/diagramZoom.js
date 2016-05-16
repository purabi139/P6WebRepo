/// <reference name="MicrosoftAjax.js"/>
/// <reference path="../utils/misc.js"/>
/// <reference path="../workflow/diagram.js"/>

define([
    "ms-ajax"
], function () {
    Type.registerNamespace("ProSight.WebControls.Workflows");

    ProSight.WebControls.Workflows.DiagramZoom = function () {
        this._initialized = false;
    }

    ProSight.WebControls.Workflows.DiagramZoom.InitializeDiagramZoomControl = function (diagramZoomObjectName) {
        var initializationFunction = null;
        var initializationFunctionBody = "";

        initializationFunctionBody = _.formatString(
            "	if (typeof (%0) === \"undefined\" || %0 == null || !{0}.get_IsInitialized())\n\
	{{\n\
		%0 = new ProSight.WebControls.Workflows.DiagramZoom();\n\
	}}",
            diagramZoomObjectName);

        initializationFunction = new Function(initializationFunctionBody);
        initializationFunction();
        initializationFunction = null;
    }

    ProSight.WebControls.Workflows.DiagramZoom.prototype =
    {
        Initialize: function (diagram) {
            if (!this._initialized) {
                this._diagram = diagram;
                this._initialized = true;
            }
        },

        get_IsInitialized: function () {
            return this._initialized;
        },

        ZoomLevel_Changed: function (selectedIndex, value, sender, previouslySelectedIndex) {
            this._diagram.ZoomTo(parseInt(value, 10));
        },

        dispose: function () {
        }
    }

    ProSight.WebControls.Workflows.DiagramZoom.registerClass("ProSight.WebControls.Workflows.DiagramZoom");

    if (typeof (Sys) !== "undefined") {
        Sys.Application.notifyScriptLoaded();
    }
    return ProSight.WebControls.Workflows.DiagramZoom;
});