package com.oracle.pgbu.common.objects.jq;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.objects.BaseElement;

public class TypeAhead extends BaseElement {

	TextBox owner;

	public TypeAhead(WebElement element) {
		super(element);
	}

	@Override
	public void initChildComponents() {
		WebElement ownerTypeAhead = m_element.findElement(By.className("orcl-type-ahead"));
		owner = new TextBox(ownerTypeAhead.findElement(By.tagName("input")));
	}

	public void setText(CharSequence text) {
		if (text == null)
			return;
		owner.sendKeys(text);
		waitForElement(By.cssSelector("li.orcl-type-ahead-node"));
	}

	public void selectActiveItem() {
		m_driver.findElement(By.cssSelector("li.active")).click();
	}

	public void selectItem(CharSequence text) {
		setText(text);
		selectActiveItem();
		owner.sendKeys(Keys.TAB);
	}

	public String getSelectedItem() {
		return m_driver.findElement(By.cssSelector("li.active")).getText();
	}

	public List<String> getItemList() {
		List<WebElement> elements = m_driver.findElements(By.cssSelector("li.orcl-type-ahead-node"));
		List<String> items = new ArrayList<>();

		for (WebElement element : elements) {
			items.add(element.getText());
		}
		return items;
	}

}
