package com.oracle.pgbu.common.objects.jq;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class Estimate extends BaseElement {

	TextBox days;
	TextBox hours;

	public Estimate(WebElement element) {
		super(element);
	}

	@Override
	public void initChildComponents() {
		List<WebElement> children = m_element.findElements(By.className("orcl-number-field"));
		days = new TextBox(children.get(0).findElement(By.tagName("input")));
		hours = new TextBox(children.get(1).findElement(By.tagName("input")));
	}

	public void setEstimate(String estimate) {
		String[] estimateArr = estimate.split(",");
		days.setText(estimateArr[0]);
		hours.setText(estimateArr[1]);
	}

}
