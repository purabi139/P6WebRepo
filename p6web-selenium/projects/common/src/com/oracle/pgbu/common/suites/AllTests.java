package com.oracle.pgbu.common.suites;

import org.junit.extensions.cpsuite.ClasspathSuite;
import org.junit.extensions.cpsuite.ClasspathSuite.ClassnameFilters;
import org.junit.runner.RunWith;

@RunWith(ClasspathSuite.class)
// only run cases starting with Test in the name, and exclude innner classes
@ClassnameFilters({ ".*\\.Test.*", ".*Test", "!.*\\$.*" })
public class AllTests {

}
