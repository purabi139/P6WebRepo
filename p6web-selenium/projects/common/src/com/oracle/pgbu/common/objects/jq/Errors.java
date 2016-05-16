package com.oracle.pgbu.common.objects.jq;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.utils.ApplicationProperties;

public class Errors extends BaseElement {

	public Errors(WebElement element) {
		super(element);
	}

	@Override
	public boolean isDisplayed() {
		return m_element.findElement(By.className("change-group-errors")).getAttribute("style").equalsIgnoreCase("display: inline-block;");
	}

	public int getErrorCountDisplayed() {
		return Integer.parseInt(m_element.findElement(By.className("change-group-errors")).getAttribute("data-error-count"));
	}

	/**
	 * Selects an item in the list
	 * 
	 * @param itemName
	 */
	public void clickItem(String itemName) {
		if (doesItemExist(itemName)) {
			m_element.findElement(By.className("change-group-errors")).click();
			m_element.findElements(By.cssSelector("li a")).get(getItemIndex(itemName)).click();
			waitForReady();
		}
	}

	public int getItemIndex(String itemName) {
		return getErrorsList().indexOf(itemName);
	}

	public List<String> getErrorsList() {
		List<String> result = new ArrayList<String>();
		for (int i = 0; i < getItemCount(); i++) {
			result.add(m_element.findElements(By.cssSelector("li a")).get(i).getAttribute("innerText").trim());
		}
		return result;
	}

	public int getItemCount() {
		try {
			ApplicationProperties.getInstance().disableWaitTime();
			return m_element.findElements(By.cssSelector("li a")).size();
		} catch (Exception e) {
			// should not happen
		} finally {
			ApplicationProperties.getInstance().setTimeouts();
		}
		return 0;
	}

	/**
	 * returns true if the item exists in the list, false otherwise.
	 * 
	 * @param itemName
	 * @return
	 */
	public boolean doesItemExist(String itemName) {
		return getErrorsList().contains(itemName);
	}

}
