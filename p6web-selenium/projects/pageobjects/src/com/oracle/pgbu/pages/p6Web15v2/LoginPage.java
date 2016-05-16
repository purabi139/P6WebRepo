package com.oracle.pgbu.pages.p6Web15v2;

import org.openqa.selenium.By;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.oracle.pgbu.common.enums.WindowNames;
import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.objects.core.Button;
import com.oracle.pgbu.common.objects.core.TextBox;
import com.oracle.pgbu.common.testcase.CommonBaseTestCase;
import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.oracle.pgbu.pages.BasePage;

/**
 * Class file containing the PageObject for the Login screen 
 * 
 */
public class LoginPage extends BasePage {
	
	protected int appWaitTime = ApplicationProperties.getInstance().getWaitTime();
	protected static final Logger logger = LoggerFactory.getLogger(LoginPage.class);
	
	/** User name text field */
	@FindBy(how = How.NAME, using = "username")
	public TextBox username;
	/** Password text field */
	@FindBy(how = How.NAME, using = "password")
	public TextBox password;
	/** Login submit button */
	@FindBy(how = How.ID, using = "login")
	public Button loginBtn;
	/** Logout Link */
	@FindBy(css = "a[href='/p6/action/logoff']")
	public Button logoutLink;
	
	/**
	 * Enters the username and password to the designated text fields and clicks
	 * login button.
	 * 
	 * @param userName
	 *            Expecting user login ID. Commonly pulled from designate
	 *            properties file.
	 * @param pass
	 *            Expecting user password. Commonly pulled from designate
	 *            properties file.
	 */
	public void login(String userName, String pass, boolean logout) {
		
		//If already logged in, Logout first, switch to Login window and then proceed with required login credentials
		if (logout && CommonBaseTestCase.m_loggedIn) {	
			logout();

		}
		//Enter Username, Password and click Login button
		waitForReady();
		waitForElement(username);
		username.click();
		username.setText(userName);
		waitForElement(password);
		password.click();
		password.setText(pass);
		loginBtn.submit();
		
		//Switch to the Main P6 Window
		switchToWindow(WindowNames.MAIN_WINDOW,appWaitTime*2);
		m_driver.manage().window().maximize();
		
		try{
			waitForElement(logoutLink);
			if(logoutLink.isDisplayed()==true){
				logger.info("Successfully logged In to P6");
				CommonBaseTestCase.m_loggedIn = true;	
			}
			}
		  catch(Exception e){
			logger.info("Login to P6 FAILED "+e.getMessage());
			}
		
	}
	
	
	/**
	 * Enters the username and password to the designated text fields and clicks
	 * login button.
	 * 
	 * @param userName
	 *            Expecting user login ID. Commonly pulled from designate
	 *            properties file.
	 * @param pass
	 *            Expecting user password. Commonly pulled from designate
	 *            properties file.
	 */
	public void uDesignerLogin(String userName, String pass) {
		
		//If already logged in to P6 Server, Logout first, switch to Login window and then proceed with required login credentials
		if(m_driver.getTitle().contains(WindowNames.MAIN_WINDOW.getWindowName()))
		{
			//Logout of P6 Server and switch the window to P6 Server Login Window
			logout();
		}
		
		//Launch uDesigner URL in the login window of P6 Server
		m_driver.get(ApplicationProperties.getInstance().getUdesignerUrl());
		  
		//Enter Username, Password and click Login button
		waitForElement(username);
		username.click();
		username.setText(userName);
		waitForElement(password);
		password.click();
		password.setText(pass);
		loginBtn.submit();
		
		//Switch to the Main P6 Window
		switchToWindow(WindowNames.MAIN_WINDOW,appWaitTime*2);
		m_driver.manage().window().maximize();
		waitForReady();
		
		try{
			if(logoutLink.isDisplayed()==true){
				logger.info("Successfully logged In to uDesigner");
				CommonBaseTestCase.m_loggedIn = true;
			}
			}
		  catch(Exception e){
			logger.info("Login to uDesigner FAILED "+e.getMessage());
			}
		
	}
	
	
	public void uDesignerLogin(){
		
		//Login to uDesinger with the credentials given in the application.properties file
		uDesignerLogin(ApplicationProperties.getInstance().getUdesignerUsername(),ApplicationProperties.getInstance().getUdesignerPassword());
		
	}
	
	public void login(String userName, String pass) {
		login(userName, pass, false);
	}

	public void logout() {

		try {
			//Switch to Top HTML frame and click Logout link
			m_driver.switchTo().defaultContent();
			waitForElement(logoutLink);
			ApplicationProperties.getInstance().disableWaitTime();
			logoutLink.click();
			
			//Switch to the Main Login Window
			switchToWindow(WindowNames.MAIN_WINDOW,10);

		} catch (Exception e) {
			LoggerFactory.getLogger(LoginPage.class).error("Failed to logout.",e);

		} finally {
			ApplicationProperties.getInstance().setTimeouts();

		}
	}
	   
	/**
	 * Returns if the user is currently logged-in
	 * 	 * 
	 * @param userName
	 *            Expected user login ID. 
	 */	
	public boolean isCurrentUser(String user) {
		
		try{
			
			if(!CommonBaseTestCase.m_loggedIn){
				logger.info("Not Logged in with any User");
				return false;
			}
			
			//Does not throw Exception if it is Expected User
			m_driver.findElement(By.cssSelector("span:contains("+user+")")).getText();
			return true;
		}catch(Exception e){
			return false;	
		}
	}
}
