package com.oracle.pgbu.bo;

public enum PrimaveraBOPrivilegs {
	G_ADMIN_PREF("G_ADMIN_PREF","22"), P_CREATE_PROJ("P_CREATE_PROJ", "64"),P_DELETE_PROJ("P_DELETE_PROJ","65"),EMPTY("EMPTY","");
	private String m_type;
	private String m_value;
	public String m_empty= "";
	
	PrimaveraBOPrivilegs(String m_type, String m_value) {
		this.m_type = m_type;
		this.m_value= m_value;
		
	}

	public String getPrivilege() {
		return m_value;
	}
    
	public void setPrivilege(String m_value) {
		this.m_value=m_value;
	}
	
	public static PrimaveraBOPrivilegs fromString(String typeString) {
		if (typeString == null) {
			return null;
		}
		for (PrimaveraBOPrivilegs value : PrimaveraBOPrivilegs.values()) {
			if (typeString.equalsIgnoreCase(value.getPrivilege())) {
				return value;
			}
		}
		return null;
	}

}



