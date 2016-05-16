package com.oracle.pgbu.common.objects.core;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class TextArea extends BaseElement {

	public TextArea(WebElement element) {
		super(element);
	}

	public void setText(String text) {
		m_element.clear();
		m_element.sendKeys(text + Keys.END);
	}

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
