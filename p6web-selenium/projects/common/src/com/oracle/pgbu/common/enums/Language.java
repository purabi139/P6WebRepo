package com.oracle.pgbu.common.enums;

public enum Language {
	ENGLISH("english"), FRENCH("french"), GERMAN("german"), ITALIAN("italian"), JAPANESE("japanese"), PORTUGESE("portugese"), RUSSIAN("russian"), SIMPLIFIED_CHINESE("simpChinese"), TRADITIONAL_CHINESE(
			"tradChinese");

	private String m_language;

	Language(String lang) {
		m_language = lang;
	}

	public String getLanguage() {
		return m_language;
	}

	public static Language fromString(String languageString) {
		if (languageString == null) {
			return null;
		}
		for (Language lang : Language.values()) {
			if (languageString.equalsIgnoreCase(lang.getLanguage())) {
				return lang;
			}
		}
		return null;
	}

}
