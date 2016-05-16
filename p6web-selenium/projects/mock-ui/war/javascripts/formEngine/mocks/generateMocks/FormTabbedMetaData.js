var createTabbedIntWidget = function (groupId, id) {
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

var createTabbedStringWidget = function (groupId, id) {
    "use strict";
    var widget = {
        "defaultValue": "Default Value",
        "bounds": {
            "numberMin": 1,
            "numberMax": 50
        },
        "type": "STRING",
        "dataKey": "MaxOBSTreeLevels",
        "label": "OBS tree maximum levels",
        "id": groupId * 1000 + id,
        "readOnly": false
    };
    return widget;
};

var createTabbedWidgets = function (groupId, numOfWidgets) {
    "use strict";
    var widgets = [];
    for (var i = 1; i <= numOfWidgets; i++) {
        widgets.push(createTabbedStringWidget(groupId, i));
    }
    return widgets;
};

var createTabbedGroup = function (id, numOfWidgets) {
    "use strict";
    var group = {
        "type": "GROUP",
        "label": "group label " + id,
        "description": "group " + id + " description",
        "layout": {
            "border": true,
            "showDescription": true
        },
        "children": createTabbedWidgets(id, numOfWidgets)
    };
    return group;
};

var createTabbedGroups = function (numOfGroups, numOfWidgets) {
    "use strict";
    var groups = [];
    for (var i = 1; i <= numOfGroups; i++) {
        groups.push(createTabbedGroup(i, numOfWidgets));
    }
    return groups;
};

var createTab = function (id, numOfGroups, numOfWidgets) {
    "use strict";
    var tab = {
        "type": "TAB",
        "label": "Tab " + id + " label",
        "name": "tab1"
    };
    if (numOfGroups > 0) {
        tab.children = createTabbedGroups(numOfGroups, numOfWidgets);
    } else {
        tab.children = createTabbedWidgets(0, numOfWidgets);
    }
    return tab;
};

var createTabs = function (numOfTabs, numOfGroups, numOfWidgets) {
    "use strict";
    var tabs = [];
    for (var i = 1; i <= numOfTabs; i++) {
        tabs.push(createTab(i, numOfGroups, numOfWidgets));
    }
    tabs[0].active = true;
    return tabs;
};

var getTabbedMetaData = function (numOfTabs, numOfGroups, numOfWidgets) {
    "use strict";
    var formMetaData = [];
    formMetaData[0] = {
        "type": "FORM",
        "label": "Simple Form",
        "children": []
    };
    formMetaData[0].children[0] = {
        "type": "TABSET",
        "label": "tabs title",
        "children": createTabs(numOfTabs, numOfGroups, numOfWidgets)
    };

    return JSON.stringify(formMetaData, null, "    ");
};