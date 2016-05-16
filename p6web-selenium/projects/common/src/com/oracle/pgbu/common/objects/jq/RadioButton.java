package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class RadioButton extends BaseElement {

	public RadioButton(WebElement element) {
		super(element);
	}

	public void select() {
		m_element.click();
	}

	/**
	 * Determines if radio button is selected
	 * 
	 * @return True if radio button is selected; False if radio button is not selected
	 */
	@Override
	public boolean isSelected() {
		String checked = m_element.getAttribute("checked");
		if (checked != null && checked.equals("true"))
			return true;
		else
			return false;
	}
}
