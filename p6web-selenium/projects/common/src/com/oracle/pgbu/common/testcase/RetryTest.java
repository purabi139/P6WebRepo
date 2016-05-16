package com.oracle.pgbu.common.testcase;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.junit.Rule;
import org.junit.rules.TestRule;
import org.junit.runner.Description;
import org.junit.runners.model.Statement;
import com.oracle.pgbu.common.utils.ApplicationProperties;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

/**
 * To Re-execute the test upon failure, No. of times it retries depend on the 
 * 
 *
 */

public class RetryTest {
    public class Retry implements TestRule {
    	protected final Logger logger = LoggerFactory.getLogger(RetryTest.class);
    	
        private int retryCount;

        public Retry(int retryCount) {
        	if(retryCount==1){
            	logger.info("---------Inside Retry Test ---- This test will be Not be re-executed upon failure - provide 'retryCount' in application.properties if test is to be re-executed upon failure");
        	}else if(retryCount==0){
              	logger.info("---------Inside Retry Test ---- 'retryCount' cannot be 0 in application.properties - provide it to be atleast 1, if it is '1' it executes only one time without re-execution");
        	}
        	else{
        	logger.info("---------Inside Retry Test ---- This test will be re-executed upto "+retryCount+" times upon failure");
        	}
            this.retryCount = retryCount;
        }

        public Statement apply(Statement base, Description description) {
            return statement(base, description);
        }

        private Statement statement(final Statement base, final Description description) {
            return new Statement() {
                @Override
                public void evaluate() throws Throwable {
                    Throwable caughtThrowable = null;

                    // implement retry logic here
                    for (int i = 0; i < retryCount; i++) {
                        try {
                            base.evaluate();
                            return;
                        } catch (Throwable t) {
                            caughtThrowable = t;
                            logger.info(description.getMethodName() + ": run " + (i+1) + " failed");
                            logger.info("^^^^^^####################^^^ Re-executing the test "+description.getMethodName());
                        }
                    }
                    logger.info(description.getDisplayName() + ": giving up after " + retryCount + " failures");
        			logger.info("^^^^^^^^^^^^^^^^^^^ Test Failed {} ...", description.getMethodName());
                    throw caughtThrowable;
                }
            };
        }
    }

    @Rule
    public Retry retry = new Retry(ApplicationProperties.getInstance().getRetryCount());

}