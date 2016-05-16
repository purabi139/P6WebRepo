package com.oracle.pgbu.common.objects.core;

import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class Button extends BaseElement {
	/*
	 * Home for all universal methods for interacting and manipulating BUTTONS
	 */

	public Button(WebElement element) {
		super(element);
	}

	@Override
	public void click() {
		super.click();
		System.out.println("clicked");
		
	}

}
