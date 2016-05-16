var createData = function (numOfGroups, numOfWidgets) {
    "use strict";
    var data = {};

    if (numOfGroups > 0) {
        for (var i = 1; i <= numOfGroups; i++) {
            for (var j = 1; j <= numOfWidgets; j++) {
                var text = "TextBox" + i + "_" + j;
                data[text] = "new value " + text;
            }
        }
    } else {
        for (var k = 1; k <= numOfWidgets; k++) {
            var wtext = "TextBox" + 0 + "_" + k;
            data[wtext] = "new value " + wtext;
        }
    }
    return data;
};

var getData = function (numOfGroups, numOfWidgets) {
    "use strict";
    var formData = {
        "form": {
            "id": "1000",
            "name": "Master Form for Sprint 2",
            "label": "Form for Sprint 2",
            "type": "upperForm",
            "data": createData(numOfGroups,numOfWidgets)
        }
    };

    return JSON.stringify(formData, null, "    ");
};
