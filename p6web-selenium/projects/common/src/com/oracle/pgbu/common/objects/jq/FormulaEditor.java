package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class FormulaEditor extends BaseElement {

	public FormulaEditor(WebElement element) {
		super(element);
	}

	public void setText(String text) {
		m_element.clear();
		m_element.sendKeys(text + Keys.END);
	}

	@Override
	public String getText() {
		return m_element.getAttribute("innerHTML");
	}

	public boolean isReadOnly() {
		if (m_element.getAttribute("readonly") != null && (m_element.getAttribute("readonly").equalsIgnoreCase("true")))
			return true;
		else
			return false;

	}

}
