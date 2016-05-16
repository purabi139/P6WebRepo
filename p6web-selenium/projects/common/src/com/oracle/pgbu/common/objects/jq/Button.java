package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class Button extends BaseElement {

	public Button(WebElement element) {
		super(element);
	}

	@Override
	public void click() {
		if (!m_element.isEnabled()) {
			throw new RuntimeException(m_element + " is not enabled");
		}
		click(true);
	}

	public void click(boolean waitForReady) {
		super.click();
		if (waitForReady) {
			waitForReady();
		}
	}

}
