
package com.oracle.pgbu.common.objects;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.Point;
import org.openqa.selenium.SearchContext;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Function;
import com.google.common.base.Predicate;
import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.oracle.pgbu.common.utils.AutomationUtils;

/**
 * Declaration class for all object types. Implements Selenium WebElement
 * 
 */
public class BaseElement implements WebElement {

    protected final WebDriver m_driver = ApplicationProperties.getInstance().getDriver();
    protected final JavascriptExecutor m_jsDriver = (JavascriptExecutor) m_driver;
    private static final Logger logger = LoggerFactory.getLogger(BaseElement.class);

    protected WebElement m_element;

    public BaseElement(WebElement element) {
        m_element = element;

        try {
            ApplicationProperties.getInstance().setPageFactoryCompLoadTime(0);
            ApplicationProperties.getInstance().disableWaitTime();
            initChildComponents();
        } catch (Exception e) {
            // do nothing in case of no such element exception here. the error
            // should be propagated later.
            logger.trace("Failed to find Component", e);
        } finally {
            ApplicationProperties.getInstance().setPageFactoryCompLoadTime();
            ApplicationProperties.getInstance().setTimeouts();
        }
    }

    /**
     * override this method to initialize child elements instead of adding them to the constructor
     */
    public void initChildComponents() {

    }

    public WebElement waitForReady() {
        sleep(0.3);
        return waitForReady(ApplicationProperties.getInstance().getWaitTime());
    }

    public WebElement waitForReady(int secondsToSleep) {
        FluentWait<WebElement> wait = new FluentWait<WebElement>(m_element);

        wait.withTimeout(secondsToSleep, TimeUnit.SECONDS).withMessage("waitForReady timed out. Page not ready").until(new Predicate<WebElement>() {
            @Override
            public boolean apply(WebElement element) {
                return AutomationUtils.isPageReady();
            }
        });

        return m_element;
    }

    /**
     * method waits for element to be hidden
     * 
     * @param secondsToSleep
     */
    public void waitUntilHidden(int secondsToSleep) {
        FluentWait<BaseElement> wait = new FluentWait<BaseElement>(this);

        wait.withTimeout(secondsToSleep, TimeUnit.SECONDS).withMessage("waitUntilHidden timed out. Element did not disappear in alloted time")
                .until(new Predicate<BaseElement>() {
                    @Override
                    public boolean apply(BaseElement element) {
                        return !element.exists();
                    }
                });
    }

    public void waitUntilHidden() {
        waitUntilHidden(ApplicationProperties.getInstance().getWaitTime());
    }

    @Override
    public void clear() {
        m_element.clear();
    }

    @Override
    public void click() {
        try {
        	m_element.click();
        } catch (WebDriverException e) {
            try {
                logger.debug("Click Failed, Attempting to click by scrolling into view with bottom align option");
                scrollIntoView();
                m_element.click();
            } catch (WebDriverException ef) {
                try {
                    logger.debug("Click Failed, Attempting to click by scrolling into view with top align option");
                    scrollIntoView(true);
                    m_element.click();
                } catch (WebDriverException e2) {
                    try {
                        logger.debug("Click Failed, Attempting to click by scrolling down by 200 pixels");
                        m_jsDriver.executeScript("window.scrollBy(0,200)");
                        m_element.click();
                    } catch (WebDriverException e3) {
                        logger.debug("Click Failed, Attempting to click by scrolling up by 200 pixels");
                        m_jsDriver.executeScript("window.scrollBy(0,-200)");
                        m_element.click();
                    }
                }
            }
        }
    }

    public void clickCorner() {
        new Actions(m_driver).moveToElement(m_element, 1, 1).click().build().perform();
    }

    /**
     * Method to click using Actions class
     */
    public void actionClick(){
    	
    	//Carry out Normal click if browser is Safari (Actions not supported on Safari browser)
    	if (ApplicationProperties.getInstance().getBrowser().equalsIgnoreCase("safari")){
    		m_element.click();
    		}
    	//Carry out Action click on browsers other than safari
    	else{
    		logger.info("Click using Actions");
    		new Actions(m_driver).click(m_element).perform();
    		logger.info("Click using Actions Performed");
    	    }
    }
    
    
    @Override
    public WebElement findElement(By by) {
        return m_element.findElement(by);
    }

    @Override
    public List<WebElement> findElements(By by) {
        return m_element.findElements(by);
    }

    @Override
    public String getAttribute(String name) {
        return m_element.getAttribute(name);
    }

    public String getClassName() {
        return m_element.getAttribute("class");
    }

    @Override
    public String getCssValue(String propertyName) {
        return m_element.getCssValue(propertyName);
    }

    @Override
    public Point getLocation() {
        return m_element.getLocation();
    }

    @Override
    public Dimension getSize() {
        return m_element.getSize();
    }

    @Override
    public String getTagName() {
        return m_element.getTagName();
    }

    @Override
    public String getText() {
        return m_element.getText();
    }

    public String getType() {
        return m_element.getAttribute("type");
    }

    @Override
    public boolean isDisplayed() {
        waitForReady();
        try{
        return m_element.isDisplayed();
        }catch(NoSuchElementException e){
        	return false;
        }
    }

    public boolean exists() {
        try {
            ApplicationProperties.getInstance().disableWaitTime();
            ApplicationProperties.getInstance().setPageFactoryCompLoadTime(0);
            return m_element.isDisplayed();
        } catch (NoSuchElementException e) {
            // Do Nothing here. If there is an exception, the element does not
            // exist
            logger.debug("element does not exist");
            return false;
        } finally {
            ApplicationProperties.getInstance().setTimeouts();
            ApplicationProperties.getInstance().setPageFactoryCompLoadTime();
        }
    }

    @Override
    public boolean isEnabled() {
        return m_element.isEnabled();
    }

    @Override
    public boolean isSelected() {
        return m_element.isSelected();
    }

    @Override
    public void sendKeys(java.lang.CharSequence... keysToSend) {
        m_element.sendKeys(keysToSend);
    }

    @Override
    public void submit() {
        m_element.submit();
    }

    /**
     * Performs Double-Click actions for specific object
     */
    public void doubleClick() {
        ((JavascriptExecutor) m_driver).executeScript("var evt = document.createEvent('MouseEvents');"
                + "evt.initMouseEvent('dblclick',true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0,null);" + "arguments[0].dispatchEvent(evt);",
                m_element);
    }

    /**
     * Displays Right-Click actions to display object specific Context menu
     */
    public void contextClick() {
        new Actions(m_driver).contextClick(m_element).perform();
    }

    /**
     * Scrolls active pane until objects is displayed on screen
     */
    public void scrollIntoView() {
        scrollIntoView(false);
    }

    public void scrollIntoView(Boolean topAlign) {
        ((JavascriptExecutor) m_driver).executeScript("arguments[0].scrollIntoView(" + topAlign + ");", m_element);
    }

    /**
     * Forces context menu to remain displayed after right click
     */
    public void blockDisplay() {
        ((JavascriptExecutor) m_driver).executeScript("arguments[0].style.display='block';", m_element);
    }

    /**
     * Waits for a specified length of time
     * 
     * @param seconds
     *            The total time in seconds to wait for a specific object
     */
    protected void sleep(final Double seconds) {
        AutomationUtils.sleep(seconds);
    }

    /**
     * Sleeps specified amount of seconds
     * 
     * @param seconds
     *            the number of seconds to sleep as integer.
     */
    protected void sleep(final int seconds) {
        AutomationUtils.sleep(seconds);
    }

    /**
     * waits for an element to show up on page
     * 
     * @param locator
     *            the locator tag to search by. eg. By.className("className")
     * @return WebElement the element found by search. will throw exception if the element is not found.
     */
    public WebElement waitFor(final By locator) {
        return waitFor(m_element, locator);
    }

    /**
     * waits for an element to show up on page
     * 
     * @param locator
     *            the locator tag to search by. eg. By.className("className")
     * @return WebElement the element found by search. will throw exception if the element is not found.
     */
    public WebElement waitFor(final SearchContext context, final By locator) {
        Wait<By> wait = new FluentWait<By>(locator).withTimeout(ApplicationProperties.getInstance().getWaitTime(), TimeUnit.SECONDS).ignoring(
                NoSuchElementException.class);

        return wait.until(new Function<By, WebElement>() {
            @Override
            public WebElement apply(By locator) {
                return context.findElement(locator);
            }
        });
    }

    public WebElement waitForElement(org.openqa.selenium.By by) {
        FluentWait<org.openqa.selenium.By> wait = new FluentWait<org.openqa.selenium.By>(by);

        long secondsToSleep = ApplicationProperties.getInstance().getWaitTime();
        wait.withTimeout(secondsToSleep, TimeUnit.SECONDS).withMessage("waitForReady timed out. Element " + by.toString() + " not present")
                .until(new Predicate<org.openqa.selenium.By>() {
                    @Override
                    public boolean apply(org.openqa.selenium.By by) {
                        try {
                            m_driver.findElement(by);
                            return true;
                        } catch (NoSuchElementException e) {
                            return false;
                        }
                    }
                });

        return m_driver.findElement(by);
    }

    /**
     * method waits for a particular element to appear on the page
     * 
     * @param by
     *            - search by
     * @param secondsToWait
     *            - time to wait before throwing an error
     */
    public void waitForElement(BaseElement element) {
        waitForElement(element, ApplicationProperties.getInstance().getWaitTime());
    }

    /**
     * method waits for a particular element to appear on the page
     * 
     * @param by
     *            - search by
     * @param secondsToWait
     *            - time to wait before throwing an error
     */
    public void waitForElement(BaseElement element, long secondsToWait) {
        FluentWait<BaseElement> wait = new FluentWait<BaseElement>(element);

        wait.withTimeout(secondsToWait, TimeUnit.SECONDS).withMessage("waitForReady timed out. Element " + element.toString() + " is still not present")
                .until(new Predicate<BaseElement>() {
                    @Override
                    public boolean apply(BaseElement element) {
                        try {
                            if (element.isDisplayed()) {
                                return true;
                            }
                        } catch (NoSuchElementException e) {
                            return false;
                        }
                        return true;
                    }
                });
    }

    /**
     * waits for one child of specified type to appear, and returns all elements of that type.
     * 
     * @param locator
     *            the locator tag to search by. eg. By.className("className")
     * @return List<WebElements> performs a WebElement.findElements(locator)
     */
    public List<WebElement> waitForElements(final By locator) {
        waitFor(locator);

        return m_element.findElements(locator);
    }

    /**
     * method waits for a particular element to disappear from the page
     * 
     * @param by
     *            - search by
     * @param secondsToWait
     *            - time to wait before throwing an error
     */
    public void waitForElementToDisappear(BaseElement element) {
        waitForElementToDisappear(element, ApplicationProperties.getInstance().getWaitTime());
    }

    /**
     * method waits for a particular element to disappear from the page
     * 
     * @param by
     *            - search by
     * @param secondsToWait
     *            - time to wait before throwing an error
     */
    public void waitForElementToDisappear(BaseElement element, long secondsToWait) {
        FluentWait<BaseElement> wait = new FluentWait<BaseElement>(element);

        wait.withTimeout(secondsToWait, TimeUnit.SECONDS).withMessage("waitForReady timed out. Element " + element.toString() + " is still present")
                .until(new Predicate<BaseElement>() {
                    @Override
                    public boolean apply(BaseElement element) {
                        try {
                            if (!element.isDisplayed()) {
                                return true;
                            }
                        } catch (NoSuchElementException e) {
                            return true;
                        } catch (StaleElementReferenceException ex) {
                            return true;
                        }
                        return false;
                    }
                });
    }

    /**
     * This method waits to find a minimal amount of elements before returning them to the user
     * 
     * @param locator
     *            the locator tag to search by. eg. By.className("className")
     * @param expectedTotal
     *            the amounts of elements to be waited upon
     * @return List<WebElements> performs a WebElement.findElements(locator)
     */
    public List<WebElement> findElements(final By locator, final int expectedTotal) {
        Wait<By> wait = new FluentWait<By>(locator).withTimeout(ApplicationProperties.getInstance().getWaitTime(), TimeUnit.SECONDS).ignoring(
                NoSuchElementException.class);

        List<WebElement> resultList = wait.until(new Function<By, List<WebElement>>() {
            @Override
            public List<WebElement> apply(By locator) {
                List<WebElement> elements = findElements(locator);
                if (elements.size() < expectedTotal) {
                    return null;
                }
                return elements;
            }
        });

        int actualTotal = resultList.size();
        if (actualTotal < expectedTotal) {
            logger.info("Expecetd amount of elements not found: " + Integer.toString(actualTotal) + " instead of " + Integer.toString(expectedTotal));
        } else if (actualTotal > expectedTotal) {
            logger.info("Note more elements were found than expected: " + Integer.toString(actualTotal) + " instead of " + Integer.toString(expectedTotal));
        }
        return resultList;
    }

    /**
     * The default findElement throws NoSuchElementException which requires exception handling if you are searching for one from a number of possible elements. this method will just return null if element is
     * not found.
     * 
     * @param context
     * @param by
     * @return
     */
    protected WebElement findElement(SearchContext context, By by) {
        try {
            return context.findElement(by);
        } catch (NoSuchElementException e) {
            return null;
        } catch (StaleElementReferenceException e) {
            return null;
        }
    }

    public WebElement getElement() {
        return m_element;
    }

    /**
     * returns text string to be used with jQuery filter to find elements by specific text
     * 
     * @param text
     * @return
     */
    protected String getJqueryTextFilterFunction(String text) {
        return "function () { return (this.textContent || this.innerText).trim().search('^" + text + "$') != -1;}";
    }

    protected String escapeSingleSlash(String selector) {
        return selector.replace("'", "\\'");
    }

	@Override
	public <X> X getScreenshotAs(OutputType<X> target)
			throws WebDriverException {
		// TODO Auto-generated method stub
		return null;
	}
}	 