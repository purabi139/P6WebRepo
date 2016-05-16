package com.oracle.pgbu.common.objects;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class Selector {
	private static final String ID = "id";
	private static final String CLASS = "class";
	private static final String CSS = "css";
	private static final String NAME = "name";
	private static final String LINK = "link";

	String m_elementString;
	String m_byString = "";
	String m_selector = "";
	By by;

	public Selector(WebElement element) {
		m_elementString = element.toString();
		parseSelector();
	}

	private void parseSelector() {
		Pattern pattern = Pattern.compile(".*->\\s([a-z]*).*:\\s(.*)]");
		Matcher matcher = pattern.matcher(m_elementString);

		if (matcher.matches()) {
			m_byString = matcher.group(1);
			m_selector = matcher.group(2);

			if (m_byString.equals(CSS)) {
				by = By.cssSelector(m_selector);
			} else if (m_byString.equals(CLASS)) {
				by = By.className(m_selector);
			} else if (m_byString.equals(ID)) {
				by = By.id(m_selector);
			} else if (m_byString.equals(LINK)) {
				by = By.linkText(m_selector);
			} else if (m_byString.equals(NAME)) {
				by = By.name(m_selector);
			}
		}
	}

	public String getByString() {
		return m_byString;
	}

	public String getSelector() {
		return m_selector;
	}

	public String getCssSelector() {
		if (m_byString.equals(CLASS)) {
			return "." + m_selector;
		} else if (m_byString.equals(ID)) {
			return "#" + m_selector;
		} else if (m_byString.equals(NAME)) {
			return "[name=" + m_selector + "]";
		}

		return m_selector;
	}

	public By getBy() {
		return by;
	}

	public void setByString(String byString) {
		m_byString = byString;
	}

	public void setSelector(String selector) {
		m_selector = selector;
	}

	public void setBy(By by) {
		this.by = by;
	}
}
