package com.oracle.pgbu.common.enums;

public enum BrowserName {
	CHROME, FIREFOX, INTERNET_EXPLORER("InternetExplorer"), SAFARI, HTMLUNIT;

	String m_browser;

	BrowserName() {
		m_browser = toString();
	}

	BrowserName(String browser) {
		m_browser = browser;
	}

	public String getBrowser() {
		return m_browser;
	}

	public static BrowserName fromString(String browser) {
		if (browser == null) {
			return null;
		}
		for (BrowserName browserName : BrowserName.values()) {
			if (browser.equalsIgnoreCase(browserName.getBrowser())) {
				return browserName;
			}
		}
		return null;
	}
}
