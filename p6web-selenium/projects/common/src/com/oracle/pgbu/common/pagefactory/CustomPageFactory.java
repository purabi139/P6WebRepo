/*
Copyright 2007-2009 WebDriver committers
Copyright 2007-2009 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

package com.oracle.pgbu.common.pagefactory;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.pagefactory.ElementLocatorFactory;
import org.openqa.selenium.support.pagefactory.FieldDecorator;

import com.oracle.pgbu.common.utils.ApplicationProperties;

/**
 * Factory class to make using Page Objects simpler and easier.
 * 
 * @see http://code.google.com/p/webdriver/wiki/PageObjects
 */
public class CustomPageFactory {

/**
	 * Instantiate an instance of the given class, and set a lazy proxy for each of the WebElement fields that have been declared, assuming that the field name is also the HTML element's "id" or
	 * "name". This means that for the class:
	 * 
	 * <code>
	 * public class Page {
	 *     private WebElement submit;
	 * }
	 * </code>
	 * 
	 * there will be an element that can be located using the xpath expression "//*[@id='submit']" or "//*[@name='submit']"
	 * 
	 * Any WebElement in the class will be proxied as a WebElement. You will not be able to cast this as a RenderedWebElement. If you want to access the field as a RenderedWebElement, you should
	 * declare the field as a RenderedWebElement, i.e.
	 * 
	 * <code>
	 * public class Page {
	 *     private RenderedWebElement submit;
	 * }
	 * </code>
	 * 
	 * By default, the element is looked up each and every time a method is called upon it. To change this behaviour, simply annnotate the field with the {@link
	 * @org.openqa.selenium.support.CacheLookup}. To change how the element is located, use the {@link @org.openqa.selenium.support.FindBy} annotation.
	 * 
	 * This method will attempt to instantiate the class given to it, preferably using a constructor which takes a WebDriver instance as its only argument or falling back on a no-arg constructor. An
	 * exception will be thrown if the class cannot be instantiated.
	 * 
	 * @see @org.openqa.selenium.support.FindBy
	 * @see @org.openqa.selenium.support.CacheLookup
	 * @param driver
	 *            The driver that will be used to look up the elements
	 * @param pageClassToProxy
	 *            A class which will be initialised.
	 * @return An instantiated instance of the class with WebElement fields proxied
	 */
	public synchronized static <T> T initElements(Class<T> pageClassToProxy) {
		WebDriver driver = ApplicationProperties.getInstance().getDriver();
		T page = instantiatePage(driver, pageClassToProxy);
		initElements(driver, page);
		return page;
	}

	public synchronized static void initElements(Object page) {
		final WebDriver driverRef = ApplicationProperties.getInstance().getDriver();
		initElements(new AjaxElementLocatorFactory(driverRef), page);
	}

	/**
	 * As
	 * {@link org.openqa.selenium.support.PageFactory#initElements(org.openqa.selenium.WebDriver, Class)}
	 * but will only replace the fields of an already instantiated Page Object.
	 * 
	 * @param driver
	 *            The driver that will be used to look up the elements
	 * @param page
	 *            The object with WebElement fields that should be proxied.
	 */
	public synchronized static void initElements(WebDriver driver, Object page) {
		final WebDriver driverRef = driver;
		initElements(new AjaxElementLocatorFactory(driverRef), page);
	}

	/**
	 * Similar to the other "initElements" methods, but takes an
	 * {@link ElementLocatorFactory} which is used for providing the mechanism
	 * for fniding elements. If the ElementLocatorFactory returns null then the
	 * field won't be decorated.
	 * 
	 * @param factory
	 *            The factory to use
	 * @param page
	 *            The object to decorate the fields of
	 */
	public synchronized static void initElements(ElementLocatorFactory factory, Object page) {
		final ElementLocatorFactory factoryRef = factory;
		initElements(new DefaultFieldDecorator(factoryRef), page);
	}

	/**
	 * Similar to the other "initElements" methods, but takes an
	 * {@link FieldDecorator} which is used for decorating each of the fields.
	 * 
	 * @param decorator
	 *            the decorator to use
	 * @param page
	 *            The object to decorate the fields of
	 */
	public synchronized static void initElements(FieldDecorator decorator, Object page) {
		Class<?> proxyIn = page.getClass();
		while (proxyIn != Object.class) {
			proxyFields(decorator, page, proxyIn);
			proxyIn = proxyIn.getSuperclass();
		}
	}

	private synchronized static void proxyFields(FieldDecorator decorator, Object page, Class<?> proxyIn) {
		Field[] fields = proxyIn.getDeclaredFields();
		for (Field field : fields) {
			if (field.getAnnotations().length == 0) {
				continue;
			}
			Object value = decorator.decorate(page.getClass().getClassLoader(), field);
			if (value != null) {
				try {
					field.setAccessible(true);
					if ((field.getType() != WebElement.class)) {
						// value returned is always of type WebElement.
						// so, if the Field type is not WebElement, get the
						// type and create a new instance of the class by
						// reflection.
						Class<?> objectClass = Class.forName(field.getType().getName().toString());
						Constructor<?> constructor = objectClass.getConstructor(new Class[] { WebElement.class });
						Object newVal = (constructor.newInstance((WebElement) value));

						field.set(page, newVal);
					} else {
						field.set(page, value);
					}

				} catch (Exception e) {
					throw new RuntimeException(e);
				}

			}
		}
	}

	private synchronized static <T> T instantiatePage(WebDriver driver, Class<T> pageClassToProxy) {
		try {
			try {
				Constructor<T> constructor = pageClassToProxy.getConstructor(WebDriver.class);
				return constructor.newInstance(driver);
			} catch (NoSuchMethodException e) {
				return pageClassToProxy.newInstance();
			}
		} catch (InstantiationException e) {
			throw new RuntimeException(e);
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		} catch (InvocationTargetException e) {
			throw new RuntimeException(e);
		}
	}
}
