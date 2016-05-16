package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class Bar extends BaseElement {
	public Bar(WebElement element) {
		super(element);
	}

	/**
	 * Returns the color of the bar in hex format
	 * 
	 * @return The color of the bar
	 */
	public String getColor() {
		waitForReady();
		return m_element.findElement(By.className("bar")).getCssValue("background-color");
	}

	/**
	 * Returns the String value displayed in the bar's tool-tip on mouse-over
	 * 
	 * @return The String value displayed on mouse-over
	 */
	public String getToolTip() {
		waitForReady();
		return m_element.getAttribute("data-original-title");
	}

	public String getPercentComplete() {
		waitForReady();
		String style = m_element.findElement(By.className("bar")).getAttribute("style");
		return style.substring(7, style.length() - 1);
	}

	public String getHeight() {
		waitForReady();
		return m_element.findElement(By.className("bar")).getCssValue("height");
	}

	public String getWidth() {
		waitForReady();
		return m_element.getCssValue("width");
	}

}
