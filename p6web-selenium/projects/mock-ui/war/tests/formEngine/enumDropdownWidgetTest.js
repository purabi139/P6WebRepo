define([
    "jquery", "underscore", "../../tests/formEngine/formTestHelper"
], function ($, _, FormTestHelper) {
    "use strict";

    module("Enum dropdown widget view test");

    test("create a enum dropdown widget.", function () {
        expect(5);
        var dropdownWidge1 = FormTestHelper.getEnumDropDownWidget(1);
        equal(dropdownWidge1.options.dataKey, "dataKey_1", "Enum Dropdown widget has been created");
        var startTimer = FormTestHelper.startTimer();
        dropdownWidge1.render($("<div>"));
        var timer = FormTestHelper.stopTimer(startTimer, FormTestHelper.ENUM_DROPDOWN_RENDER_PERFORMANCE);
        equal(timer.performance, true, FormTestHelper.getGoodPerformance("EnumDropDown"));
        equal(dropdownWidge1.$("select").get(0).name, dropdownWidge1.options.customLabel,
            "Enum dropdown widget name  verified, " + timer.diff + " Milliseconds");

        dropdownWidge1._setSettingsData(FormTestHelper.getEnums());
        equal(dropdownWidge1.$("select").get(0)[9].text, "Whatif" ,
            "Enum dropdown option name  verified (without WS_)" );

        equal(dropdownWidge1.$("select").get(0)[9].value, "WHAT_IF" ,
            "Enum dropdown option value verified" );
    });
});