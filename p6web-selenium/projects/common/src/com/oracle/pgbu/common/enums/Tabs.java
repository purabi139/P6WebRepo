package com.oracle.pgbu.common.enums;

public enum Tabs {
	
	// Tabs in P6
	DASHBOARD("Dashboard");

	private String m_tab;


	Tabs(String tab) {
		m_tab = tab;
	}

	
	public String getTab() {
		return m_tab;
	}
}
