package com.oracle.pgbu.common.utils;

import org.junit.Assert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author OlgaL This class provides Selenium verify functionality. In opposite to Assert that fails the entire test, verify catches the error message, what allows the test to run further
 */
public class Verify {

	protected static final Logger logger = LoggerFactory.getLogger(Verify.class);

	/**
	 * Catches the exception of Assert.assertTrue
	 * 
	 * @param tracker
	 *            - Exception tracker (class extending CommonBaseTestCase)
	 * @param errorMessage
	 *            - message provided by user
	 * @param condition
	 *            - condition to be tested e.getStackTrace()[3] - contains the hierarchical path (package name,class name, test name) to the test that invoked this method
	 */

	public static void verifyTrue(ExceptionTracker tracker, String errorMessage, boolean condition) {
		try {
			Assert.assertTrue(errorMessage, condition);
		} catch (AssertionError e) {
			tracker.addException(e);
			logger.error(e.getMessage());
		}

	}

	/**
	 * Catches the exception of Assert.assertFalse
	 * 
	 * @param tracker
	 *            - Exception tracker (class extending CommonBaseTestCase)
	 * @param errorMessage
	 *            - message provided by user
	 * @param condition
	 *            - condition to be tested e.getStackTrace()[3] - contains the hierarchical path (package name,class name, test name) to the test that invoked this method
	 */

	public static void verifyFalse(ExceptionTracker tracker, String errorMessage, boolean condition) {
		try {
			Assert.assertFalse(errorMessage, condition);
		} catch (AssertionError e) {
			tracker.addException(e);
			logger.error(e.getMessage());
		}

	}

	/**
	 * Catches the exception of Assert.assertEquals
	 * 
	 * @param tracker
	 *            - Exception tracker (class extending CommonBaseTestCase)
	 * @param errorMessage
	 *            - message provided by user
	 * @param expected
	 *            - expected string
	 * @param actual
	 *            - actual string e.getStackTrace()[2] - contains the hierarchical path (package name,class name, test name) to the test that invoked this method
	 */
	public static void verifyEquals(ExceptionTracker tracker, String errorMessage, Object expected, Object actual) {
		try {
			Assert.assertEquals(errorMessage, expected, actual);
		} catch (AssertionError e) {
			tracker.addException(e);
			logger.error(e.getMessage());
		}
	}

	
	/**
	 * Catches the exception of Assert.assertNotEquals
	 * 
	 * @param tracker
	 *            - Exception tracker (class extending CommonBaseTestCase)
	 * @param errorMessage
	 *            - message provided by user
	 * @param expected
	 *            - expected string
	 * @param actual
	 *            - actual string e.getStackTrace()[2] - contains the hierarchical path (package name,class name, test name) to the test that invoked this method
	 */
	public static void verifyNotEquals(ExceptionTracker tracker, String errorMessage, Object notExpected, Object actual) {
		try {
			Assert.assertNotEquals(errorMessage, notExpected, actual);
		} catch (AssertionError e) {
			tracker.addException(e);
			logger.error(e.getMessage());
		}
	}
	
	/**
	 * Catches the exception of Assert.assertNotNull
	 * 
	 * @param tracker
	 *            - Exception tracker (class extending CommonBaseTestCase)
	 * @param errorMessage
	 *            - message provided by user
	 * @param object
	 *            - object to be verified as not null
	 * 
	 */
	public static void verifyNotNull(ExceptionTracker tracker, String errorMessage, Object object) {
		try {
			Assert.assertNotNull(errorMessage, object);
		} catch (AssertionError e) {
			tracker.addException(e);
			logger.error(e.getMessage());
		}

	}

	/**
	 * Catches the exception of Assert.assertNull
	 * 
	 * @param tracker
	 *            - Exception tracker (class extending CommonBaseTestCase)
	 * @param errorMessage
	 *            - message provided by user
	 * @param object
	 *            - object to be verified as null
	 * 
	 */
	public static void verifyNull(ExceptionTracker tracker, String errorMessage, Object object) {
		try {
			Assert.assertNull(errorMessage, object);
		} catch (AssertionError e) {
			tracker.addException(e);
			logger.error(e.getMessage());
		}

	}
}
