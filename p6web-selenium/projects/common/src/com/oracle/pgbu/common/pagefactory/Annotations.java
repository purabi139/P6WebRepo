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

import org.openqa.selenium.By;

public class Annotations extends org.openqa.selenium.support.pagefactory.Annotations {

	private final Field field;

	public Annotations(Field field) {
		super(field);
		this.field = field;
	}

	@Override
	public By buildBy() {
		By ans = null;
		JQuery jquery = field.getAnnotation(JQuery.class);
		if (jquery != null) {
			ans = com.oracle.pgbu.common.By.jQuery(jquery.locator());
		} else {
			ans = super.buildBy();
		}

		return ans;
	}

}
