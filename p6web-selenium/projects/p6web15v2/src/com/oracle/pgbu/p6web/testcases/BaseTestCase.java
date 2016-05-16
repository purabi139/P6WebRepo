package com.oracle.pgbu.p6web.testcases;

import javax.security.auth.login.LoginException;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;

import com.oracle.pgbu.p6web.p6web;
import com.oracle.pgbu.p6web.appstate.BaseState;
import com.oracle.pgbu.common.categories.GridNodeDetails;
import com.oracle.pgbu.common.pagefactory.CustomPageFactory;
import com.oracle.pgbu.common.support.DataSetup;
import com.oracle.pgbu.common.support.Utilities;
import com.oracle.pgbu.common.support.WebServiceUtils;
import com.oracle.pgbu.common.testcase.CommonBaseTestCase;
import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.oracle.pgbu.intgservices.client.ClientEntityService;
import com.oracle.pgbu.pages.p6Web15v2.LoginPage;

/**
 * Testcases will extend this class to prevent the need to add @Before and @After to each test.
 * 
 */
public class BaseTestCase extends CommonBaseTestCase {
	
	 public final Utilities utils = Utilities.getInstance();
	 public final WebServiceUtils wsUtils = WebServiceUtils.getInstance();
	protected static final Logger logger = LoggerFactory.getLogger(BaseTestCase.class);

	protected ClientEntityService m_entityService;

	@Rule
	public TestRule upWatchman = new TestWatcher() {
		@Override
		protected void starting(Description description) {
			
			//Kill any pre-existing browser sessions if execution is local. Do not perform this during Grid execution
			if (!ApplicationProperties.getInstance().getGridEnabled()){
			killBrowsers();
			}
			
			logger.info("Creating driver for Test {} ...", description.getMethodName());
			ApplicationProperties appProperties = p6web.getInstance(true);
			m_driver = appProperties.createAndGetDriver();
			
			// Navigate to the right place
			m_driver.get(appProperties.getUrl());
			
		}
	};

    @BeforeClass
    public static void beforeClassSetUp() {
        dataSetup = new DataSetup();
        dataSetup.login();
    }
    
	/**
	 * Logs into application
	 * 
	 * @throws LoginException
	 */
	@Override
	@Before
	public void setUp() {
		dataSetup = new DataSetup();
        dataSetup.login();
		//
		ApplicationProperties appProperties = p6web.getInstance();
		//presetup();
		dataSetup();
		try {
			postSetup();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}
    @AfterClass
    public static void tearDownAfterClass() {
        // Clean up all the data that was saved on the stack.
        dataSetup.cleanAll();

        // Log out of the web services
        dataSetup.logout();

        // Logout of the database.
        if (!dataSetup.dbUtils.isClosed())
            dataSetup.dbUtils.disconnect();

    }
	/**
	 * After test clean up
	 */
	@Override
	@After
	public void tearDown() {

	}

	/**
	 * Close all instance of browser
	 * 	  
	 */	
	public static void killBrowsers() {
		
		try{
			
			String os = System.getProperty("os.name");
			if (os.contains("Windows")) {
			
			logger.info("About to clean browsers - kill any existing browsers");
			
			//Kills ALL instances of iexplorer.exe in Task Manager
			Runtime.getRuntime().exec("taskkill /F /IM iexplore.exe");
			Runtime.getRuntime().exec("taskkill /F /IM chrome.exe");
			Runtime.getRuntime().exec("taskkill /F /IM firefox.exe");
			Runtime.getRuntime().exec("taskkill /F /IM safari.exe");
			}
			
		}catch(Exception e){
			logger.info("Exception occured while deleting open browser tasks "+e.getLocalizedMessage());
		}
		
	}


	/**
	 * Close all instance of browser on Remote Machine (Selenium Node in Selenium Grid)
	 * 	  
	 */	
	public static void killBrowsersOnRemoteNode(String nodeName, String nodeUserName, String nodePassword) {
		
		try{
			
			String os = System.getProperty("os.name");
			if (os.contains("Windows")) {
			
			logger.info("About to clean browsers on Remote Node "+nodeName);
			
			//Kills ALL instances of iexplorer.exe in Task Manager of Remote Browser
			//Runtime.getRuntime().exec("taskkill /s 10.177.123.82 /u Administrator /p @lt12345 /IM iexplore.exe");
			Runtime.getRuntime().exec("taskkill /s "+nodeName+" /u "+nodeUserName+" /p "+nodePassword+" /F /IM iexplore.exe");
			Runtime.getRuntime().exec("taskkill /s "+nodeName+" /u "+nodeUserName+" /p "+nodePassword+" /F /IM chrome.exe");
			Runtime.getRuntime().exec("taskkill /s "+nodeName+" /u "+nodeUserName+" /p "+nodePassword+" /F /IM firefox.exe");
			Runtime.getRuntime().exec("taskkill /s "+nodeName+" /u "+nodeUserName+" /p "+nodePassword+" /F /IM safari.exe");
			}
			
		}catch(Exception e){
			logger.info("Exception occured while deleting open browser tasks "+e.getLocalizedMessage());
		}
		
	}

	/**
	 *  Check if the Selenium Grid is enabled
	 *  Then check if node is having Sikuli Capability
	 *  If not then log out current session and start a node with Sikuli capability and execute test on that
	 */
	protected void executeTestWithSikuliCapability(){
		//For Selnium Grid - ensure that the test executes on Selenium node with Sikuli capability
		if(ApplicationProperties.getInstance().getGridEnabled()){
		
			if(!isNodeWithSikuliCapability())
			{
				logoutAndStartNodeWithSikuliCapability();
			}
			
		}
	}
	
	
	/**
	 * Checks if the current Selnium node on Selenium Grid is having Sikuli capability
	 * 
	 */
	protected boolean isNodeWithSikuliCapability(){
		String currentNode = GridNodeDetails.getGridNode("blr2262572", "4444", m_driver);//TODO Remove hard coding and Fetch parameter values from properties file
		if(!currentNode.equals("10.177.101.207")) //TODO Remove hard coded host name and fetch applicationName through http://blr2262572:8080/selenium/ and add condition if applicationName does not contains 'sikuli'
		{
			return false;
		}else 
			return true;
		
	}
	
	/**
	 * Logs out from current session and connects to node with Sikuli Capability
	 * 
	 */
	protected void logoutAndStartNodeWithSikuliCapability(){
		//logout from current session & close the webdriver session
		LoginPage m_loginPage = CustomPageFactory.initElements(LoginPage.class);
		m_loginPage.logout();
		ApplicationProperties.getInstance().getDriver().quit();
		m_loggedIn = false;
		
		//Set the capability required from node as Sikuli
		ApplicationProperties appProperties = p6web.getInstance(true);
		m_driver = appProperties.createAndGetGridDriverWithSikuliCapability();
		m_driver.get(appProperties.getUrl());
		presetup();
		BaseState.login();
		m_loggedIn = true;

	}

	
}
