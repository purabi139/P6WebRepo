package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.utils.ApplicationProperties;

public class TabList extends BaseElement {

	public TabList(WebElement element) {
		super(element);
	}

	public boolean doesTabExist(String tabName) {
		try {
			ApplicationProperties.getInstance().disableWaitTime();
			return m_element.findElement(By.linkText(tabName)).isDisplayed();
		} catch (NoSuchElementException e) {
			return false;
		} finally {
			ApplicationProperties.getInstance().setTimeouts();
		}
	}

	public void selectTab(String tabName) {
		m_element.findElement(By.linkText(tabName)).click();
		waitForReady();
	}

	public boolean isTabSelected(String tabName) {
		return getSelectedTab().equalsIgnoreCase(tabName);
	}

	public String getSelectedTab() {
		return m_element.findElement(By.className("active")).findElement(By.cssSelector("[data-toggle=tab]")).getText();
	}
}
