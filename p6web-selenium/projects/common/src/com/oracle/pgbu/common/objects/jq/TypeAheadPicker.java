package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.objects.Selector;

public class TypeAheadPicker extends BaseElement {

	public TypeAheadPicker(WebElement element) {
		super(element);
	}

	String m_elementSelector;
	Button m_launchPicklist;
	Picklist m_picklist;

	@Override
	public void initChildComponents() {
		m_elementSelector = (new Selector(m_element)).getCssSelector();
		m_launchPicklist = new Button(m_element.findElement(By.cssSelector("button.picker-btn")));
		m_picklist = new Picklist(m_driver.findElement(By.cssSelector("div.pgbu-modal")));
	}

	public void selectItem(String value) {
		m_launchPicklist.click();
		m_picklist = new Picklist(m_driver.findElement(By.cssSelector("div.pgbu-modal")));

		m_picklist.selectItem(value);
	}

	@Override
	public String getText() {
		return (String) m_jsDriver.executeScript("return $('" + escapeSingleSlash(m_elementSelector) + " .setting-user-display').attr('value')");
	}
}
