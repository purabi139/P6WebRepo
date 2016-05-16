package com.oracle.pgbu.common.objects.core;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.objects.Selector;

public class CheckBox extends BaseElement {

	String m_elementSelector;

	public CheckBox(WebElement element) {
		super(element);
	}

	@Override
	public void initChildComponents() {
		m_elementSelector = (new Selector(m_element)).getCssSelector();
	}

	/**
	 * Verifies state of Checkbox and checks is state isChecked returns 'false'
	 */
	public void check() {
		if (!isSelected()) {
			click();

			if (!isSelected()) {
				scrollIntoView(true);
				click();
			} else {
				return;
			}

			if (!isSelected()) {
				scrollIntoView();
				click();
			} else {
				return;
			}

			if (!isSelected()) {
				throw new RuntimeException("Failed to check the checkbox");
			}
		}
	}

	/**
	 * Verifies state of Checkbox and unchecks is state isChecked returns 'true'
	 */
	public void uncheck() {
		if (isSelected()) {
			click();

			if (isSelected()) {
				scrollIntoView(true);
				click();
			} else {
				return;
			}

			if (isSelected()) {
				scrollIntoView();
				click();
			} else {
				return;
			}

			if (isSelected()) {
				throw new RuntimeException("Failed to uncheck the checkbox");
			}
		}
	}

	/**
	 * Verifies the state of a checkbox
	 * 
	 * @return True if checkbox is checked; False if checkbox is unchecked
	 */
	public boolean isChecked() {
		return isSelected();
	}

	@Override
	public boolean isSelected() {
		try {
			return super.isSelected();
		} catch (StaleElementReferenceException e) {
			m_element = m_driver.findElement(By.cssSelector(m_elementSelector));
			return super.isSelected();
		}
	}

}
