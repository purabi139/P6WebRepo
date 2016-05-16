package com.oracle.pgbu.common.objects.jq;

import java.util.Arrays;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.oracle.pgbu.common.enums.TreeItem;
import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.utils.ApplicationProperties;

public class TreePanel extends BaseElement {

	Logger logger = LoggerFactory.getLogger(TreePanel.class);

	public TreePanel(WebElement element) {
		super(element);
	}

	/**
	 * method to select a Tree item with an enum that implements the {@link
	 * TreeItem.class} interface. If multiple TreeItem objects can be specified
	 * to specify a hierarchy, n-1 objects will be expended, and nth object will
	 * be selected
	 * 
	 * @param items
	 */
	public void selectItem(TreeItem... items) {
		// Expand Items
		if (items.length > 1) {
			expand(Arrays.copyOf(items, items.length - 1));
		}

		// Select the items[item.length-1] node here and return
		m_element.findElement(By.cssSelector("li[data-treeid='" + items[items.length - 1].getTreeIndex() + "']")).click();
		waitForReady();
	}

	/**
	 * method to select a Tree item. If a list of strings is passed, n-1 objects
	 * will be expended, and nth object will be selected
	 * 
	 * @param items
	 */
	public void selectItem(String... items) {
		for (int i = 0; i < items.length - 1; i++) {
			m_jsDriver.executeScript("$('div.item').filter(" + getJqueryTextFilterFunction(items[i]) + ").find('i.tree-icon-collapsed').click()");
		}
		m_jsDriver.executeScript("$('div.item').filter(" + getJqueryTextFilterFunction(items[items.length - 1]) + ").click()");
	}

	public void expand(TreeItem... items) {
		for (int i = 0; i < items.length; i++) {
			WebElement treeItem = m_element.findElement(By.cssSelector("li[data-treeid='" + items[i].getTreeIndex() + "']"));
			expandCollapse(treeItem, false);
		}
	}

	public void collapse(TreeItem... items) {
		for (int i = items.length; i > 0; i--) {
			WebElement treeItem = m_element.findElement(By.cssSelector("li[data-treeid='" + items[i].getTreeIndex() + "']"));
			expandCollapse(treeItem, true);
		}
	}

	public boolean isItemPresent(TreeItem item) {
		List<WebElement> elements = m_element.findElements(By.cssSelector("ul.root li div.item"));
		for (WebElement element : elements) {
			if (element.getText().trim().equalsIgnoreCase(item.toString())) {
				return true;
			}
		}
		return false;
	}

	private void expandCollapse(WebElement treeItem, boolean bCollapse) {
		String state = (bCollapse) ? "expanded" : "collapsed";
		try {
			ApplicationProperties.getInstance().disableWaitTime();
			treeItem.findElement(By.cssSelector("div.item i.pgbu-icon-" + state)).click();
		} catch (NoSuchElementException e) {
			logger.debug(treeItem + " was already " + state, e);
		} finally {
			ApplicationProperties.getInstance().setTimeouts();
		}
	}

}
