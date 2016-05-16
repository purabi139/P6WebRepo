package com.oracle.pgbu.common.enums;

/*
 * Enum containing the list of User Ids and Passwords being used in P6
 */
public enum UserNames {
	
	// User Ids being used in P6
	
	//admin User
	ADMIN_USER("admin","admin"),
	//admin User
	Login_USER("test","test1234");
	
	private String m_userName;
	private String m_userPassword;

	/*
	 * Stores the User Name and Password
	 */
	UserNames(String userName,String userPassword) {
		m_userName = userName;
		m_userPassword = userPassword;
	}

	/*
	 * Returns User Name of the enum
	 */
	public String getUserName() {
		return m_userName;
	}
	
	/*
	 * Returns Password of the enum
	 */
	public String getUserPassword() {
		return m_userPassword;
	}
}
