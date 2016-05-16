package com.oracle.pgbu.common.objects.core;

import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

/**
 * Home for all universal methods for interacting and manipulating Trees
 */

public class Tree extends BaseElement {
	/**
	 * Counts a list of {@link org.openqa.selenium.WebElement WebElements}
	 * designated by xpath. The xpath extends from the table WebElement passed
	 * in and locates all of the WebElements that are table rows.
	 * 
	 * @param table
	 *            A table WebElement
	 * @return The total rows in the table
	 */

	Tree(WebElement element) {
		super(element);
	}

}
