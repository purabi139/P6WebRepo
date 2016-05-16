package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class TextBox extends BaseElement {

	public TextBox(WebElement element) {
		super(element);
	}

	public void setText(CharSequence text) {
		setText(text, Keys.TAB);
	}

	public void setText(CharSequence text, Keys key) {
		if (text == null)
			return;
		m_element.clear();
		m_element.sendKeys(text, key);
	}

	/**
	 * Gets the current text value from a text field
	 * 
	 * @return String value set in text field
	 */
	public String getValue() {
		return m_element.getAttribute("value");
	}

}
