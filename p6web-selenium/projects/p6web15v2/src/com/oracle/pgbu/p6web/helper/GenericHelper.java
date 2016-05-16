package com.oracle.pgbu.p6web.helper;

import java.io.File;
import java.io.IOException;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.oracle.pgbu.p6web.p6web;
import com.oracle.pgbu.p6web.testcases.BaseTestCase;
import com.primavera.ws.p6.user.User;
import com.oracle.pgbu.common.By;
import com.oracle.pgbu.common.enm.ProjectStatus;
import com.oracle.pgbu.common.enm.ProjectType;
import com.oracle.pgbu.common.utils.ApplicationProperties;

/**
 * Testcases will extend this class to prevent the need to add @Before and @After to each test.
 * 
 */
public class GenericHelper extends BaseTestCase  {
	protected static final Logger logger = LoggerFactory.getLogger(GenericHelper.class);

	static WebDriver  m_driver;
	DataHelper dataHelper= new DataHelper();
	
	/**
	 * Temporary solution to set download path in chrome till bug in WebDriver is resolved (https://code.google.com/p/chromedriver/issues/detail?id=783)
	 * This function will set the download path to P6Selenium\\projects\\P610 + Path sent in the parameter
	 * 
	 * @param path 
	 * 
	 * example:GenericHelper.setChromeDriverDownloadPath("\\TestData\\PlanningManager\\");
	 */
	public static void setChromeDriverDownloadPath(String path)
	{
		ApplicationProperties appProperties = p6web.getInstance();
		
	try{
		
		m_driver = ApplicationProperties.getInstance().getDriver();
		m_driver.get("chrome://settings/advanced");
        JavascriptExecutor js = (JavascriptExecutor) m_driver;
        String prefId = "download.default_directory";
        File tempDir=new File(System.getProperty("user.dir")+path);
        if (m_driver.findElements(By.xpath(String.format(".//input[@pref='%s']", prefId))).size() == 0) {
        	m_driver.get("chrome://settings-frame");
        	m_driver.findElement(By.xpath(".//button[@id='advanced-settings-expander']")).click();        }
        String tmpDirEscapedPath = tempDir.getCanonicalPath().replace("\\", "\\\\");
        js.executeScript(String.format("Preferences.setStringPref('%s', '%s', true)", prefId,
                tmpDirEscapedPath));
		}
	
		catch(IOException e){
			
		}
	
		m_driver.get(appProperties.getUrl());
	
	}

	/**
	 * 
	 * @param user
	 */
	public void createDataP6Test1(User user){
	 //Project access to the user
	 //String[] moduleAccess = { "Projects" , "Resources"};
	 //dataSetup.users.createUserLicense(user.getObjectId(), moduleAccess);
     //Create Project
	 dataHelper.project = dataHelper.createProject(ProjectStatus.ACTIVE, ProjectType.PROJECT);
	 //dataSetup.projects.createProjectOBS(user, dataHelper.project);
	 dataHelper.updateProjects(dataHelper.project);
    }
	
}
