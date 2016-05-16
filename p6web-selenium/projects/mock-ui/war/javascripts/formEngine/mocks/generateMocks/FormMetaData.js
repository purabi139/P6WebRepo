var createIntWidget = function (groupId, id) {
    "use strict";
    var widget = {
        "defaultValue": 20,
        "bounds": {
            "numberMin": 1,
            "numberMax": 50
        },
        "type": "INTEGER",
        "dataKey": "MaxWBSTreeLevels",
        "label": "EPS/WBS tree maximum levels",
        "id": groupId * 1000 + id,
        "readOnly": false
    };
    return widget;
};

var createStringWidget = function (groupId, id) {
    "use strict";
    var widget = {
        "defaultValue": "text field " + id,
        "bounds": {
            "numberMin": 1,
            "numberMax": 50
        },
        "type": "STRING",
        "dataKey": "TextBox" + groupId + "_" + id,
        "label": "OBS tree maximum levels",
        "id": groupId * 1000 + id,
        "readOnly": false
    };
    return widget;
};

var createWidgets = function (groupId, numOfWidgets) {
    "use strict";
    var widgets = [];
    for (var i = 1; i <= numOfWidgets; i++) {
        widgets.push(createStringWidget(groupId, i));
    }
    return widgets;
};

var createGroup = function (id, numOfWidgets) {
    "use strict";
    var group = {
        "type": "GROUP",
        "label": "group label " + id,
        "description": "group " + id + " description",
        "layout": {
            "border": true,
            "showDescription": true
        },
        "children": createWidgets(id, numOfWidgets)
    };
    return group;
};


var createGroups = function (numOfGroups, numOfWidgets) {
    "use strict";
    var groups = [];
    for (var i = 1; i <= numOfGroups; i++) {
        groups.push(createGroup(i, numOfWidgets));
    }
    return groups;
};

var getMetaData = function (numOfGroups, numOfWidgets) {
    "use strict";
    var formMetaData = [];
    formMetaData[0] = {
        "type": "FORM",
        "label": "Simple Form",
        "children": createGroups(numOfGroups, numOfWidgets)
    };

    return JSON.stringify(formMetaData, null, "    ");
};