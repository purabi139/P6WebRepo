package com.oracle.pgbu.common.objects.core;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

/**
 * Home for all universal methods for interacting and manipulating TABLES
 */

public class Table extends BaseElement {

	public Table(WebElement element) {
		super(element);
	}

	/**
	 * Counts a list of {@link org.openqa.selenium.WebElement WebElements} designated by xpath. The xpath extends from the table WebElement passed in and locates all of the WebElements that are table
	 * rows.
	 * 
	 * @param table
	 *            A table WebElement
	 * @return The total rows in the table
	 */
	public int getRowCount() {
		return m_element.findElements(By.xpath("tbody/tr")).size();
	}

}
