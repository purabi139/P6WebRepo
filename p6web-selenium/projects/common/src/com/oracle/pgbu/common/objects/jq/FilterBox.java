package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.objects.Selector;

public class FilterBox extends BaseElement {

	String m_selector;

	TextBox m_filterText;

	// @FindBy(className = "pgbu-icon-find-clear")
	Button m_clearFilter;

	public FilterBox(WebElement element) {
		super(element);
	}

	@Override
	public void initChildComponents() {
		m_selector = (new Selector(m_element)).getCssSelector();
		m_filterText = new TextBox(m_element.findElement(By.className("filterbox")));
		m_clearFilter = new Button(m_element.findElement(By.cssSelector(".pgbu-icon-large-find-clear,.pgbu-icon-find-clear")));
	}

	@Override
	public WebElement waitForReady() {
		// waitFor(m_driver, By.cssSelector(m_selector + " input.filterbox-with-results, " + m_selector + " input.filterbox-no-results"));
		// waitFor(m_driver, By.cssSelector(m_selector + " a.search-clear-icon i.pgbu-icon-find-clear")).isDisplayed();
		waitForElement(new Button(m_driver.findElement(By.cssSelector(m_selector + " a.search-clear-icon i.pgbu-icon-find-clear"))));
		sleep(1);
		return this;
	}

	@Override
	public void sendKeys(CharSequence... keysToSend) {
		m_filterText.sendKeys(keysToSend);
		sleep(0.2);
		waitForReady();
	}

	public void setText(CharSequence text) {
		m_filterText.setText(text);
		waitForReady();
	}

	@Override
	public String getText() {
		return m_filterText.getText();
	}

	public void clearResults() {
		m_clearFilter.click();
	}

	@Override
	public void clear() {
		clearResults();
	}

}
