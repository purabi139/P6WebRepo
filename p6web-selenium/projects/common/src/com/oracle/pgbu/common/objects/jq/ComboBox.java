package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.objects.Selector;

public class ComboBox extends BaseElement {

	String m_elementSelector;

	public ComboBox(WebElement element) {
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
		result = m_element.findElement(By.cssSelector("li.menu-item-selected")).getAttribute("innerHTML");
		m_element.findElement(By.cssSelector("a.btn.dropdown-toggle")).click();
		return result;
	}

	/**
	 * Select item
	 */
	public void selectItem(String itemText) {
		dropDownClick();
		m_element.findElement(By.cssSelector("[data-id='" + itemText + "']")).click();
	}

	private void dropDownClick() {
		if (!m_element.findElement(By.cssSelector("ul.cell-select-menu")).isDisplayed()) {
			m_element.findElement(By.cssSelector("a.btn.dropdown-toggle")).click();
		}
	}
}
