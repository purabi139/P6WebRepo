package com.oracle.pgbu.common.suites;

import org.junit.experimental.categories.Categories;
import org.junit.experimental.categories.Categories.IncludeCategory;
import org.junit.runner.RunWith;
import org.junit.runners.Suite.SuiteClasses;

import com.oracle.pgbu.common.categories.Regression;

@RunWith(Categories.class)
@IncludeCategory(Regression.class)
@SuiteClasses({ AllTests.class })
public class RegressionSuite {

}
