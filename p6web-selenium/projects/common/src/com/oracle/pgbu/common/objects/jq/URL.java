package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.objects.Selector;
import com.oracle.pgbu.common.objects.core.Label;
import com.oracle.pgbu.common.utils.ApplicationProperties;

public class URL extends BaseElement {

	String m_elementSelector;
	Button testButton;
	TextBox urlField;

	public URL(WebElement element) {
		super(element);
	}

	@Override
	public void initChildComponents() {
		m_elementSelector = (new Selector(m_element)).getCssSelector();
		testButton = new Button(m_element.findElement(By.cssSelector(".url-controls .url-test-button")));
		urlField = new TextBox(m_element.findElement(By.cssSelector("input[type=text]")));
	}

	public void setUrl(CharSequence url) {
		urlField.setText(url);
	}

	public boolean testConnection() {
		testButton.click();

		try {
			waitForElementToDisappear(new Label(m_element.findElement(By.cssSelector("span.testing-text.active"))), ApplicationProperties.getInstance().getWaitTime() * 3);
		} catch (NoSuchElementException e) {

		}

		try {
			ApplicationProperties.getInstance().disableWaitTime();
			m_element.findElement(By.cssSelector("span.valid-text.active"));
			return true;
		} catch (NoSuchElementException e) {
			try {
				m_element.findElement(By.cssSelector("span.invalid-text.active"));
				return false;
			} catch (NoSuchElementException f) {
				throw new RuntimeException("Neither valid or invalid status was found for test connection");
			}
		} finally {
			ApplicationProperties.getInstance().setTimeouts();
		}
	}

	public Object getUrl() {
		return urlField.getAttribute("value");
	}

}
