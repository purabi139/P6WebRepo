package com.oracle.pgbu.p6web.appstate;


import org.junit.Test;
import org.openqa.selenium.WebDriver;

import com.oracle.pgbu.p6web.p6web;
import com.oracle.pgbu.common.pagefactory.CustomPageFactory;
import com.oracle.pgbu.common.testcase.CommonBaseTestCase;
import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.oracle.pgbu.pages.p6Web15v2.LoginPage;
import com.primavera.ws.p6.user.User;

public class BaseState {

    /**
     * Loads the current url and logins to the application. Pulls the environment info from .properties and set
     * the implicitWait for loading objects.
     * 
     * @return the WebDriver object for the current testcase
     */
    public static WebDriver set() {

        ApplicationProperties appProperties = p6web.getInstance();

        // Create a new instance of a driver
        WebDriver driver = appProperties.getDriver();

        // Navigate to the right place
        driver.get(appProperties.getUrl());

        return driver;
    }

    /**
     * Function to login to P6 10, open a New tab and close all other tabs
     * 
     */
    
    public static void login() {
        ApplicationProperties appProperties = p6web.getInstance();
        appProperties.setContinueOnMissingEvents(true);

        // Create a new instance of the Login and Navigation page classes initialize WebElement fields in it
        LoginPage page = CustomPageFactory.initElements(LoginPage.class);
        
        //Login to the application & open a new tab and close all other tabs
        //page.login(appProperties.getUsername(), appProperties.getPassword());
        page.login(CommonBaseTestCase.m_userName, CommonBaseTestCase.m_password);
        // page.waitForReady();
        appProperties.setContinueOnMissingEvents(false);
    }
    
    /**
     * Function to login to P6 10, open a New tab and close all other tabs
     * 
     */
    
    public static void login(User user) {
        ApplicationProperties appProperties = p6web.getInstance();
        appProperties.setContinueOnMissingEvents(true);

        // Create a new instance of the Login and Navigation page classes initialize WebElement fields in it
        LoginPage page = CustomPageFactory.initElements(LoginPage.class);
        
        //Login to the application & open a new tab and close all other tabs
        //page.login(appProperties.getUsername(), appProperties.getPassword());
        page.login(user.getName(), CommonBaseTestCase.m_password);
        // page.waitForReady();
        appProperties.setContinueOnMissingEvents(false);
    }

}
