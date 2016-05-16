/*
Copyright 2007-2009 Selenium committers

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

import java.lang.reflect.Field;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.pagefactory.ElementLocator;
import org.openqa.selenium.support.pagefactory.ElementLocatorFactory;

public class AjaxElementLocatorFactory implements ElementLocatorFactory {
	private final WebDriver driver;

	public AjaxElementLocatorFactory(WebDriver driver) {
		this.driver = driver;
	}

	@Override
	public ElementLocator createLocator(Field field) {
		return new AjaxElementLocator(driver, field);
	}
}