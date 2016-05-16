package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.Selector;
import com.oracle.pgbu.common.objects.core.TextBox;

public class TimeField extends TextBox {

	String m_elementSelector;

	public TimeField(WebElement element) {
		super(element);
	}

	@Override
	public void initChildComponents() {
		m_elementSelector = new Selector(m_element).getCssSelector();
	}

	@Override
	public void clear() {
		m_jsDriver.executeScript("$('" + m_elementSelector + "').attr('value','').change()");
	}

	public void setTime(String time) {
		m_jsDriver.executeScript("$('" + m_elementSelector + "').attr('value','" + time + "').change()");
	}

	@Override
	public void setText(String time) {
		setTime(time);
	}
}
