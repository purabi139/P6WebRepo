package com.oracle.pgbu.common.objects.core;

import java.util.List;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import com.oracle.pgbu.common.objects.BaseElement;

public class DropDownMenu extends BaseElement {

	Select m_select;

	public DropDownMenu(WebElement element) {
		super(element);
	}

	@Override
	public void initChildComponents() {
		m_select = new Select(m_element);
	}

	public void selectMenuItem(int menuItemIndex) {
		m_select.selectByIndex(menuItemIndex);
	}

	public void selectMenuItem(String item) {
		m_select.selectByVisibleText(item);
	}

	public String getSelectedItemText() {
		return m_select.getFirstSelectedOption().getText();
	}
	
	
	public List<WebElement> getAllDropDownOptions() {
		return m_select.getOptions();
	}
	
	public boolean isReadOnly() {
		if (m_element.getAttribute("disabled") != null && m_element.getAttribute("disabled").equalsIgnoreCase("true"))
			return true;
		return false;
	}
}
