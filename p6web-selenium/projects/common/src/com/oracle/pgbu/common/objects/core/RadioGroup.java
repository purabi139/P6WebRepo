package com.oracle.pgbu.common.objects.core;

import org.openqa.selenium.WebElement;
import org.slf4j.LoggerFactory;

import com.gargoylesoftware.htmlunit.ElementNotFoundException;
import com.oracle.pgbu.common.By;
import com.oracle.pgbu.common.objects.BaseElement;

public class RadioGroup extends BaseElement {

	public RadioGroup(WebElement element) {
		super(element);
	}

	public boolean select(String value) {
		try {
			BaseElement item = new BaseElement(m_driver.findElement(By.jQuery("input[name=" + m_element.getAttribute("name") + "]").filter("input[value=" + value + "]")));
			item.click();

			return true;
		} catch (ElementNotFoundException e) {
			LoggerFactory.getLogger(RadioGroup.class).error("Failed to find radio button with value " + value);
			return false;
		}
	}

	public WebElement getSelected() {
		return m_driver.findElement(By.jQuery("input[name=" + m_element.getAttribute("name") + "]:checked"));
	}
}
