package com.oracle.pgbu.common.testcase;

import org.junit.After;
import org.junit.Before;

public interface TestCase {

	public void presetup();

	public void postSetup() throws Exception;

	public void dataSetup();

	@Before
	public void setUp();

	@After
	public void tearDown();
}
