package com.oracle.pgbu.common.objects.jq;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.objects.Selector;
import com.oracle.pgbu.common.utils.ApplicationProperties;

public class DropDown extends BaseElement {

	String m_elementSelector;

	public DropDown(WebElement element) {
		super(element);
	}

	@Override
	public void initChildComponents() {
		m_elementSelector = (new Selector(m_element)).getCssSelector();
	}

	/**
	 * Get the item selected
	 */
	public String getSelectedItemText() {
		String result;
		result = m_element.findElement(By.cssSelector(".combo-value")).getAttribute("title");
		return result;
	}

	/**
	 * Select item
	 */
	public void selectItem(String itemText) {
		dropDownClick();
		try {
			ApplicationProperties.getInstance().disableWaitTime();
			m_driver.findElement(By.cssSelector("[data-key='" + itemText + "']")).click();
		} catch (NoSuchElementException e) {
			m_driver.findElement(By.cssSelector(m_elementSelector + " a[title='" + itemText + "']")).click();
		} finally {
			ApplicationProperties.getInstance().setTimeouts();
		}
	}

	private void dropDownClick() {
		try {
			ApplicationProperties.getInstance().disableWaitTime();
			if (!m_driver.findElement(By.cssSelector("ul.combo-dropdown-menu")).isDisplayed()) {
				(new Button(m_element.findElement(By.cssSelector(".combo-button")))).click();
			}
		} catch (NoSuchElementException e) {
			(new Button(m_element.findElement(By.cssSelector(".combo-button")))).click();
		} finally {
			ApplicationProperties.getInstance().setTimeouts();
		}

	}

	public List<String> getItemList() {
		List<WebElement> elements = m_element.findElements(By.cssSelector("ul li.combo-item a"));

		List<String> items = new ArrayList<>();

		for (WebElement element : elements) {
			items.add(element.getAttribute("title"));
		}
		return items;
	}
}
