package com.oracle.pgbu.p6web.testsuites;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import com.oracle.pgbu.common.categories.ParallelSuite;
import com.oracle.pgbu.p615v2.testcases.usermode.dashboard.TestDashBoard;


@RunWith(Suite.class)
@Suite.SuiteClasses({TestDashBoard.class})
/**
 * Settings test suite
 */
public class BasicTestSuite {

}