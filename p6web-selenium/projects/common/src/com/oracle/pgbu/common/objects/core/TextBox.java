package com.oracle.pgbu.common.objects.core;

import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

/**
 * Text Field object for Ext GWT
 * 
 */
public class TextBox extends BaseElement {

	public TextBox(WebElement element) {
		super(element);
	}

	/**
	 * Sets text value in text field
	 * 
	 * @param text
	 *            String value to be entered in text field
	 */
	public void setText(String text) {
		m_element.clear();
		m_element.sendKeys(text);
	}

	/**
	 * Gets the current text value from a text field
	 * 
	 * @return String value set in text field
	 */
	@Override
	public String getText() {
		return m_element.getAttribute("value");
	}

	public boolean isReadOnly() {
		if (m_element.getAttribute("readonly") != null && (m_element.getAttribute("readonly").equalsIgnoreCase("true")))
			return true;
		else
			return false;

	}

}
