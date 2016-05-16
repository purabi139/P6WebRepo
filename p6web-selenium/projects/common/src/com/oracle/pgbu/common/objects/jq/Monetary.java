package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class Monetary extends BaseElement {

	public Monetary(WebElement element) {
		super(element);
	}
	
	public void setText(String text) {
		m_element.findElement(By.cssSelector("input")).clear();
		m_element.findElement(By.cssSelector("input")).sendKeys(text + Keys.ENTER);
	}
	
	public String getText() {
		return m_element.findElement(By.cssSelector("input")).getAttribute("value");
	}
	
	public String getCurrencyType() {
		return m_element.findElement(By.className("add-on")).getText();
	}
	
	public void pressPlusButton() {
		m_element.findElements(By.cssSelector("button")).get(0).click();
	}

	public void pressMinusButon() {
		m_element.findElements(By.cssSelector("button")).get(1).click();
	}
	
	public boolean isReadOnly() {
		if (m_element.findElement(By.cssSelector("input")).getAttribute("readonly") != null && m_element.findElement(By.cssSelector("input")).getAttribute("readonly").equalsIgnoreCase("true"))
			return true;
		return false;
	}
}