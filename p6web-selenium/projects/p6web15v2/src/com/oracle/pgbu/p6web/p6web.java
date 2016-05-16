package com.oracle.pgbu.p6web;

import com.oracle.pgbu.common.utils.ApplicationProperties;

public class p6web extends ApplicationProperties {

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
