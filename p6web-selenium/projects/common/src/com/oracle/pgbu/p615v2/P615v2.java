package com.oracle.pgbu.p615v2;

import com.oracle.pgbu.common.utils.ApplicationProperties;

public class P615v2 extends ApplicationProperties {

    static final String APP_NAME = "p615v2";

    public static ApplicationProperties getInstance(boolean createNew) {
        ApplicationProperties instance = ApplicationProperties.getInstance(createNew);
        instance.setApplicationSpecificProperties(APP_NAME);

        return instance;
    }

    public static ApplicationProperties getInstance() {
        ApplicationProperties instance = ApplicationProperties.getInstance();
        instance.setApplicationSpecificProperties(APP_NAME);

        return instance;
    }
}
