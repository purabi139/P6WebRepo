package com.oracle.pgbu.common.objects.jq;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.enums.TreeItem;
import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.objects.Selector;
import com.oracle.pgbu.common.objects.core.Button;
import com.oracle.pgbu.common.pagefactory.CustomPageFactory;

public class Picklist extends BaseElement {

    String m_elementSelector;
    FilterBox m_search;
    TreePanel m_items;
    Button m_ok;
    Button m_cancel;

    BaseElement m_loadingSpinner;

    public Picklist(WebElement element) {
        super(element);
    }

    @Override
    public void initChildComponents() {
        m_elementSelector = (new Selector(m_element)).getCssSelector();
        m_search = new FilterBox(m_driver.findElement(By.cssSelector(m_elementSelector + " div.search")));
        m_items = new TreePanel(m_driver.findElement(By.cssSelector(m_elementSelector + " .tree-content")));
        m_ok = new Button(m_driver.findElement(By.cssSelector(".modal .modal-footer .modal-accept")));
        m_cancel = new Button(m_driver.findElement(By.cssSelector(".modal .modal-footer .modal-cancel")));

        m_loadingSpinner = new BaseElement(m_element.findElement(By.cssSelector("i.loading-spinner")));
    }

    public void selectItem(TreeItem... items) {
        waitForReady();
        m_items.selectItem(items);
        m_ok.click();
    }

    public void selectItem(String item) {
        waitForReady();
        // m_search.setText(item); TODO: uncomment. Filter is broken right now
        m_items.selectItem(item);
        m_ok.click();
    }

    @Override
    public WebElement waitForReady() {
        super.waitForReady();
        waitForElementToDisappear(m_loadingSpinner);
        CustomPageFactory.initElements(this);
        return m_element;
    }
}
