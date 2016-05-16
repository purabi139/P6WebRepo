package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class ImgButton extends Button {
	
	protected BaseElement _buttonImage;

	public ImgButton(WebElement element) {
		super(element);
	}
	
	public BaseElement getImageElement() {
		return new BaseElement(getElement().findElement(By.cssSelector("i")));
	}
	
	public String getImageURL() {
		return getImageElement().getCssValue("background-image");
	}
}
