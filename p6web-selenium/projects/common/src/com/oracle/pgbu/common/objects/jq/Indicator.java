package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class Indicator extends BaseElement {

	RadioButton value;
	RadioButton field;
	TextBox valueText;
	ComboButton fieldDropDown;

	public Indicator(WebElement element) {
		super(element);
	}

	@Override
	public void initChildComponents() {
		value = new RadioButton(m_element.findElement(By.className("value-radio")));
		field = new RadioButton(m_element.findElement(By.className("field-radio")));
		valueText = new TextBox(m_element.findElement(By.cssSelector(".value-field-input")));
		fieldDropDown = new ComboButton(m_element.findElement(By.className("combo-box-list")));
	}

	private void setValue(String text) {
		value.select();
		valueText = new TextBox(m_element.findElement(By.cssSelector(".value-field-input")));
		valueText.setText(text);
	}

	private void setField(String text) {
		field.select();
		fieldDropDown = new ComboButton(m_element.findElement(By.className("combo-box-list")));
		fieldDropDown.selectItem(text);
	}

	public void setIndicator(String indicator) {
		String[] indicatorArr = indicator.split(",");

		if (indicatorArr[0].toUpperCase().equals("FIELD")) {
			setField(indicatorArr[1]);
		} else {
			setValue(indicatorArr[1]);
		}
	}
}
