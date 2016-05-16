define(["underscore"], function (_) {
    "use strict";

    return {
        get: function () {
            return {
                fields: [
                    {columnName: "col1", columnId: 7, columnType: "typeSnarf"},
                    {columnName: "col2", columnId: 8, columnType: "typeBarf"}
                ]
            };
        }
    };
});