package com.oracle.pgbu.common.enums;

public enum ErrorType {

	UNIQUE("Field value already exists. Enter a unique value."),

	CANNOT_BE_EMPTY(" field cannot be empty."),

	CANNOT_BE_BLANK(" - This is a required field."),

	FIELD_LENGTH(" field cannot be above XXXYYY characters."),
	
	CANNON_START_WITH_NUMERICAL(" - This value may not begin with a numeric character (0-9) or contain '/', '.' or ','."),

	CUSTOM("");

	private String m_coreMessage;

	ErrorType(String type) {
		m_coreMessage = type;
	}

	@Override
	public String toString() {
		return m_coreMessage;
	}

}
