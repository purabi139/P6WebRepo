package com.oracle.pgbu.bo;

public enum  PrimaveraBO_EnumType{
	ScopeType_GLOBAL("ScopeType_GLOBAL","ST_Global"), 
	BarType_CURRENT_BAR("BarType_CURRENT_BAR", "NORMAL_BAR"),
	BarType_NO_BAR("BarType_NO_BAR","NO_BAR"),
	ScopeType_PROJECT("ScopeType_PROJECT","ST_Project"),
	UnitType_DAY("UnitType_DAY","QT_Day"),
	DBEngineType_PRIMAVISON_PROJECTS("DBEngineType_PRIMAVISON_PROJECTS","WEB_PM"),
	DateSeparator_DASH("DateSeparator_DASH","-"),
	DateFormatType_DAY_MONTH_YEAR("DateFormatType_DAY_MONTH_YEAR","1"),
	DateTimeFormatType_DO_NOT_SHOW_TIME("DateTimeFormatType_DO_NOT_SHOW_TIME","2"),
	JobType_RESOURCEMANAGEMENTSERVICE("JobType_RESOURCEMANAGEMENTSERVICE","JT_ResourceMgmt"),
	JobRecurringType_WEBASAP("JobRecurringType_WEBASAP","RT_WebASAP"),
	DependencyType_FINISH_TO_START("DependencyType_FINISH_TO_START","PR_FS"),
	CalendarType_RESOURCE("CalendarType_RESOURCE","CA_Rsrc"),
	CalendarType_PROJECT("CalendarType_PROJECT","CA_Project"),
	CalendarType_GLOBAL("CalendarType_GLOBAL","CA_Base");
	private String m_type;
	private String m_value;
	public String m_empty= "";
	
	PrimaveraBO_EnumType(String m_type, String m_value) {
		this.m_type = m_type;
		this.m_value= m_value;
	}

	public String getPrivilege() {
		return m_value;
	}
    
	public void setPrivilege(String m_value) {
		this.m_value=m_value;
	}
	
	public static PrimaveraBO_EnumType fromString(String typeString) {
		if (typeString == null) {
			return null;
		}
		for (PrimaveraBO_EnumType value : PrimaveraBO_EnumType.values()) {
			if (typeString.equalsIgnoreCase(value.getPrivilege())) {
				return value;
			}
		}
		return null;
	}
}


