package com.oracle.pgbu.p6web.testsuites;

import org.junit.runner.RunWith;


import org.jenkinsci.testinprogress.runner.ProgressBatchSuite;
import de.oschoen.junit.runner.BatchTestRunner;

@RunWith(ProgressBatchSuite.class)
@BatchTestRunner.BatchTestInclude("**.*Suite")
public class JenkinsBatchProgess {
}