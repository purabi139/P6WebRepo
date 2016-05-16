package com.oracle.pgbu.common.objects.core;

import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class Label extends BaseElement {

	public Label(WebElement element) {
		super(element);
	}

	public String[] getTextArray() {
		return getText().split("\n");
	}

	public String getInnerText() {
		return m_element.getAttribute("innerText");
	}
}
