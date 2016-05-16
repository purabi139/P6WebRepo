package com.oracle.pgbu.common;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.SearchContext;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.slf4j.LoggerFactory;

public abstract class By extends org.openqa.selenium.By {

	public static jQueryBy jQuery(final String selector) {
		if (selector == null) {
			throw new IllegalArgumentException("Cannot find elements with a null id attribute.");
		}

		return new jQueryBy(selector);
	}

	public static class jQueryBy extends By {
		private String m_selector;
		private String m_functionString = "";

		public String getSelector() {
			return m_selector;
		}

		public void setSelector(String selector) {
			m_selector = selector.replace("'", "\\'");

		}

		public jQueryBy(String selector) {
			m_selector = selector;
		}

		public jQueryBy(String selector, String functionString) {
			m_selector = selector;
			m_functionString = functionString;
		}

		public void setFunctionString(String functionString) {
			m_functionString += functionString;
		}

		public jQueryBy find(String selector) {
			setFunctionString(generateFunctionString("find", selector));
			return new jQueryBy(m_selector, m_functionString);
		}

		public jQueryBy filter(String selector) {
			setFunctionString(generateFunctionString("filter", selector));
			return new jQueryBy(m_selector, m_functionString);
		}

		public jQueryBy not(String selector) {
			setFunctionString(generateFunctionString("not", selector));
			return new jQueryBy(m_selector, m_functionString);
		}

		public jQueryBy siblings(String selector) {
			setFunctionString(generateFunctionString("siblings", selector));
			return new jQueryBy(m_selector, m_functionString);
		}
		
		public jQueryBy parent()
		{
			setFunctionString(generateFunctionString("parent", ""));
			return new jQueryBy(m_selector, m_functionString);
		}

		public jQueryBy get(String index) {
			setFunctionString(generateFunctionString("get", index));
			return new jQueryBy(m_selector, m_functionString);
		}

		private String generateFunctionString(String function, String argument) {
			return "." + function + "('" + argument + "')";
		}

		@Override
		public String toString() {
			return "By.jQuery: " + m_selector + ((m_functionString.length() > 0) ? "" : "|" + m_functionString);
		}

		@Override
		public List<WebElement> findElements(SearchContext context) {

			String selector = "$('" + m_selector + "')" + m_functionString;
			List<WebElement> elements = new ArrayList<WebElement>();
			if (context instanceof FirefoxDriver) {
				// in firefox, complex jQuery result set seems to lockup the browser. so, get one element at a time
				Long value = executeScript(context, selector + ".length");

				for (int i = 0; i < value.intValue(); i++) {
					WebElement element = executeScript(context, selector + ".get(" + i + ")");
					elements.add(element);
				}
			} else {
				elements = executeScript(context, selector);
			}
			return elements;
		}

		@Override
		public WebElement findElement(SearchContext context) {
			String selector = "$('" + m_selector + "')" + m_functionString + ".get(0)";

			return executeScript(context, selector);
		}

		/**
		 * Method will try to type cast Object into the requested Type of Object, will throw a runtime exception if the type cast fails.
		 * 
		 * @param context
		 *            - instance of the driver
		 * @param selector
		 *            - the selector to look up by
		 * @return Object of type T
		 */
		@SuppressWarnings("unchecked")
		public <T> T executeScript(SearchContext context, String selector) {
			JavascriptExecutor jse = (JavascriptExecutor) context;
			Object object = jse.executeScript("return " + selector);

			if (object == null) {
				throw new NoSuchElementException("No element(s) found with selector: " + selector);
			}

			try {
				return (T) object;
			} catch (Exception e) {
				LoggerFactory.getLogger(By.class).error("Lookup by JQuery Returned: " + object);
				throw new RuntimeException(e.getMessage());
			}
		}
	}
}
