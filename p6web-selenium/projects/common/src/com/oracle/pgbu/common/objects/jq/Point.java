package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.Actions;

import com.oracle.pgbu.common.objects.BaseElement;

/**
 * 
 * Point appears in each segment represented in Capital Plan Balance screen
 * 
 */
public class Point extends BaseElement {

	public Point(WebElement element) {
		super(element);

	}

	/**
	 * 
	 * @param x
	 *            -horizontal offset. A negative value means moving a mouse left.
	 * @param y
	 *            - vertical offset. A negative value means moving a mouse up.
	 */
	public void movePointByOffset(int x, int y) {
		waitForReady();
		Actions builder = new Actions(m_driver);
		Action dragAndDrop = builder.clickAndHold(getElement()).moveByOffset(x, y).release().build();
		dragAndDrop.perform();
	}

}
