package com.oracle.pgbu.common.testcase;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import org.apache.commons.io.FileUtils;
import org.junit.Rule;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.UnreachableBrowserException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.Assert;

import com.oracle.pgbu.common.categories.GridNodeDetails;
import com.oracle.pgbu.common.support.DataSetup;
import com.oracle.pgbu.common.support.Utilities;
import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.oracle.pgbu.common.utils.AutomationUtils;
import com.oracle.pgbu.common.utils.ExceptionTracker;
import com.primavera.ws.p6.activity.Activity;
import com.primavera.ws.p6.project.Project;
import com.primavera.ws.p6.user.User;

public abstract class CommonBaseTestCase extends RetryTest implements TestCase, ExceptionTracker {
	List<Throwable> m_exceptions = new ArrayList<Throwable>();

	private final Utilities utils = Utilities.getInstance();
	protected static final Logger logger = LoggerFactory.getLogger(CommonBaseTestCase.class);
	public static boolean m_loggedIn = false;
	public static DataSetup dataSetup=new DataSetup();;
    public static User user;

    public static String m_sessionId;
    public static String m_userName;
    public static String m_password;

	/** WebDriver instance for the current browser */
	protected WebDriver m_driver;

	@Rule
	public TestRule watchman = new TestWatcher() {
		@Override
		protected void starting(Description description) {
			logger.info("###################### Started Running Test {} ...", description.getMethodName());
		}

		@Override
		public void finished(Description desc) {
			logger.info("Finishing Test case in finished() method");
			boolean fail = doesGlobalErrorExist(desc);
			StringBuffer buff = new StringBuffer();
			try{
			// Close browser
			if (ApplicationProperties.getInstance().getCloseBrowserOnExit()) {
				ApplicationProperties.getInstance().getDriver().quit();
				m_loggedIn = false;
			}
			}
			catch(UnreachableBrowserException e){
				logger.info("UnreachableBrowserException while trying to quit the browser, perhaps the test might have failed and browsers were killed in failed() method to avoid hang issue");
			}
			catch(Throwable e){
				logger.info("Exception while Executing driver.quit() method"+e.getLocalizedMessage());
				e.printStackTrace();
			}
			// Print list of exceptions
			Collection<Throwable> ex = getExceptions();
			if (!ex.isEmpty()) {
				for (Throwable e : ex) {
					buff.append("\n" + e.getMessage());
					logger.error(e.getMessage(), e);
				}
				fail = true;
			}
			logger.info("===================== Finished Running Test {} ...", desc.getMethodName());

			if (fail) {
				Assert.fail("Test Case " + desc.getMethodName() + " failed due to: " + buff.toString() + "\nsee log for details.");
			}
		}

		@Override
		protected void failed(Throwable e, Description description) {
			logger.info("!!!!!!!!!!!!!! Test Failed {} ...", description.getMethodName());
			super.failed(e, description);
			try{
			String screenshotPath = ApplicationProperties.getInstance().getScreenshotPath();
			if (screenshotPath != null) {
				File scrFile = ((TakesScreenshot) m_driver).getScreenshotAs(OutputType.FILE);
				String[] className = description.getClassName().split("\\.");
				File destFile = new File(screenshotPath, className[className.length - 1] + "_" + description.getMethodName() + "_" + getDateTime() + "_Fail" + ".png");
				try {
					FileUtils.copyFile(scrFile, destFile);
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
			}catch(Exception esc){
				logger.info("Exception while taking screenshot "+esc.getLocalizedMessage());
			}
			
			//Kill Browser & WebDriver Processes to avoid Browser Hang issues during Suite Execution
			//If Grid is enabled, kill the browser on Remote node, else on current local machine
			if(ApplicationProperties.getInstance().getGridEnabled()){
				String m_sikuliGridHostName = ApplicationProperties.getInstance().getSikuliGridHostName();
			killBrowserAndWebDriverProcessOnRemoteNode( GridNodeDetails.getGridNode(m_sikuliGridHostName, "4444", m_driver), "Administrator", "@lt123456");//TODO Replace hard coded values, read from properties file and also the hub host name
			}
			//Specifically ONLY if grid is not enabled
			else if (!ApplicationProperties.getInstance().getGridEnabled()){
				killBrowserProcess();
			}
			m_loggedIn = false;
		}

		private String getDateTime() {
			DateFormat dateFormat = new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss");
			Date date = new Date();
			return dateFormat.format(date);
		}

		private boolean doesGlobalErrorExist(Description description) {
			// Look for error message on page
			try {
				logger.info("checking in the doesGlobalErrorExist() method");
				String methodName = description.getMethodName();
				ApplicationProperties.getInstance().disableWaitTime();
				WebElement error = m_driver.findElement(By.cssSelector(".global-flash .alert-error"));

				logger.info("Taking screenshot");
				String screenshotPath = ApplicationProperties.getInstance().getScreenshotPath();
				if (screenshotPath != null) {
					File scrFile = ((TakesScreenshot) m_driver).getScreenshotAs(OutputType.FILE);
					String[] className = description.getClassName().split("\\.");
					File destFile = new File(screenshotPath, className[className.length - 1] + "_" + methodName + "_" + getDateTime() + "_ServerError" + ".png");
					FileUtils.copyFile(scrFile, destFile);

					String message = error.getAttribute("textContent");
					logger.error("Global error exists on page: " + message.trim() + ". screenshot saved as " + destFile.getAbsolutePath());
				}
				return true;

			} catch (NoSuchElementException e) {
				logger.info("NoSuchElementException in doesGlobalErrorExist");
			} catch (IOException e) {
				logger.error("Error message exists on page. Failed to save screenshot", e);
				return true;
			} catch(UnreachableBrowserException e){   
				logger.info("UnreachableBrowserException in doesGlobalErrorExist() method, perhaps the test might have failed and browsers were killed in failed() method to avoid hang issue");
				logger.info("!!!!!!!!!!!!!! Test Failed {} ...", description.getMethodName());
				logger.info("===================== Finished Running Test {} ...", description.getMethodName());
			}finally {
				ApplicationProperties.getInstance().setTimeouts();
			}
			return false;
		}
	};

	/**
	 * Can Override to adjust what testcase runs prior to login
	 */
	@Override
	public void presetup() {
		  user = createUser();
	      dataSetup.users.createUserLicense(user.getObjectId());
	}

    public User createUser() {
        m_userName = "TestUser" + utils.randomChars(6);
        m_password = "Password@1";
        // Create and Register our user in P6
        utils.log.info("Creating test user: " + m_userName + " with password " + m_password);
        return dataSetup.users.createUser(m_userName, m_password);
    }
    
    /**
     * Update the user - To be called after any changes to the user is made.
     * @param user
     * @return
     */
    public boolean updateUser(User user) {
        return dataSetup.users.updateUser(user);
    }
	/**
	 * Update the project - To be called after any changes to the project is made. 
	 * @param prj
	 * @return
	 */
    public boolean updateProjects(Project prj) {
        return dataSetup.projects.updateProject(prj);
    }
    
	/**
	 * Update the activity - To be called after any changes to the activity is made. 
	 * @param act
	 * @return
	 */
    public boolean updateActivities(Activity act) {
        return dataSetup.activities.updateActivity(act);
    }
    
    
	/**
	 * Can Override to adjust what testcase runs post login.
	 * @throws Exception 
	 */
	@Override
	public void postSetup() throws Exception {

	}

	/**
	 * Can Override to create data needed for current testcase
	 */
	@Override
	public void dataSetup() {

	}

	@Override
	public void addException(Throwable e) {
		m_exceptions.add(e);
	}

	@Override
	public Collection<Throwable> getExceptions() {
		return m_exceptions;
	}

	@Override
	public void clearExceptions() {
		m_exceptions.clear();
	}

	/**
	 * @deprecated avoid using sleep as much as possible, improve the
	 *             waitForReady() method for your page
	 * @param seconds
	 *            number of seconds to sleep as a double value eg. 0.5.
	 */
	public void sleep(final Double seconds) {
		AutomationUtils.sleep(seconds);
	}

	/**
	 * @deprecated avoid using sleep as much as possible, improve the
	 *             waitForReady() method for your page
	 * @param seconds
	 *            number of seconds to sleep as integer.
	 */
	public void sleep(final int seconds) {
		AutomationUtils.sleep(seconds);
	}
	
	/**
	 * Close all instance of browser
	 * 	  
	 */	
	public static void killBrowserProcess() {
		
		try{
			
			String os = System.getProperty("os.name");
			if (os.contains("Windows")) {
			
			logger.info("About to clean browsers - kill any existing browsers");
			
			//Kill ALL instances of iexplorer.exe in Task Manager
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
	 * Close all instance of browsers and Webdriver Process on Remote Machine (Selenium Node in Selenium Grid)
	 * 	  
	 */	
	public static void killBrowserAndWebDriverProcessOnRemoteNode(String nodeName, String nodeUserName, String nodePassword) {
		
		try{
			
			String os = System.getProperty("os.name");
			if (os.contains("Windows")) {
			
			logger.info("About to clean browsers - kill any existing browsers on Remote Node " +nodeName);
			Runtime.getRuntime().exec("taskkill /s "+nodeName+" /u "+nodeUserName+" /p "+nodePassword+" /F /IM iexplore.exe");
			Runtime.getRuntime().exec("taskkill /s "+nodeName+" /u "+nodeUserName+" /p "+nodePassword+" /F /IM chrome.exe");
			Runtime.getRuntime().exec("taskkill /s "+nodeName+" /u "+nodeUserName+" /p "+nodePassword+" /F /IM firefox.exe");
			Runtime.getRuntime().exec("taskkill /s "+nodeName+" /u "+nodeUserName+" /p "+nodePassword+" /F /IM safari.exe");
			logger.info("About to clean WebDriver process - kill any existing IEDriverServer.exe process on Remote Node " +nodeName);
			Runtime.getRuntime().exec("taskkill /s "+nodeName+" /u "+nodeUserName+" /p "+nodePassword+" /F /IM IEDriverServer.exe");
			
			}
			
		}catch(Exception e){
			logger.info("Exception occured while deleting open browser tasks "+e.getLocalizedMessage());
		}
		
	}

	
}
