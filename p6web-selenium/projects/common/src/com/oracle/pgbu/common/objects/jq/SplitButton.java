package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class SplitButton extends BaseElement {

	private By m_splittext;
	private By m_splitbutton;
	private By m_splitbuttonmenu;

	public SplitButton(WebElement element) {
		super(element);
	}

	@Override
	public void initChildComponents() {
		m_splittext = By.cssSelector("button:nth-child(1)");
		m_splitbutton = By.cssSelector("button:nth-child(2)");
		m_splitbuttonmenu = By.cssSelector("ul.dropdown-menu");
	}

	public String getSelected() {
		return m_driver.findElement(m_splittext).getText();
	}

	@Override
	public void click() {
		Button name = new Button(m_element.findElement(m_splittext));
		name.click();
	}

	public void selectSplitMenu(String item) {
		Button splitbutton = new Button(m_element.findElement(m_splitbutton));
		splitbutton.click();
		m_element.findElement(m_splitbuttonmenu).findElement(By.linkText(item)).click();

	}

	public boolean isItemEnabled(String item) {
		Button splitbutton = new Button(m_element.findElement(m_splitbutton));
		if (!splitbutton.isDisplayed() || !splitbutton.isEnabled()) {
			return false;
		}
		splitbutton.click();
		return m_element.findElement(m_splitbuttonmenu).findElement(By.linkText(item)).isEnabled();
	}
}
