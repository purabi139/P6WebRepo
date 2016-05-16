package com.oracle.pgbu.common.enums;

public enum WindowNames {
	
	// Windows in P6.15v2
	
	//P6 Login Window
	LOGIN_WINDOW("Primavera Login"),
	
	//Main P6 Window
	MAIN_WINDOW("Primavera P6");	
	
	private String m_windowName;


	WindowNames(String windowName) {
		m_windowName = windowName;
	}

	
	public String getWindowName() {
		return m_windowName;
	}
}
