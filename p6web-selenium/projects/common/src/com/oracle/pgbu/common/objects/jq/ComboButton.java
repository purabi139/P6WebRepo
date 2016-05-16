package com.oracle.pgbu.common.objects.jq;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.objects.Selector;
import com.oracle.pgbu.common.utils.ApplicationProperties;

public class ComboButton extends BaseElement {

	String m_elementSelector;

	public ComboButton(WebElement element) {
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
		dropDownClick();
		result = m_element.findElement(By.cssSelector(".combo-button")).getAttribute("innerHTML");
		return result;
	}

	/**
	 * Select item
	 */
	public void selectItem(String itemText) {
		dropDownClick();
		try {
			ApplicationProperties.getInstance().disableWaitTime();
			m_element.findElement(By.cssSelector("[data-key='" + itemText + "']")).click();
		} catch (NoSuchElementException e) {
			try {
			m_driver.findElement(By.cssSelector("[data-combo-id='" + itemText + "']")).click();
			} catch (NoSuchElementException e2) {
				m_driver.findElement(By.cssSelector(".combo-item [title='" + itemText + "']")).click();
			}
		} finally {
			ApplicationProperties.getInstance().setTimeouts();
		}

	}

	private void dropDownClick() {
		m_element.findElement(By.cssSelector(".combo-button")).click();
	}
	
	public List<String> getItemList() {

		dropDownClick();
		List<WebElement> elements = m_driver.findElements(By.cssSelector("ul li.combo-item a"));

		List<String> items = new ArrayList<>();

		for (WebElement element : elements) {
			items.add(element.getAttribute("title"));
		}
		return items;
	}
}
