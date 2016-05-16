		
package com.oracle.pgbu.pages;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.sikuli.script.Screen;
import org.sikuli.script.Key;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.NoSuchWindowException;
import org.openqa.selenium.Point;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.UnhandledAlertException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Predicate;
import com.oracle.pgbu.common.By;
import com.oracle.pgbu.common.enums.WindowNames;
import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.pagefactory.CustomPageFactory;
import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.oracle.pgbu.common.utils.AutomationUtils;
import com.oracle.pgbu.pages.p6Web15v2.WorkspacePage;


/**
 * Class file containing common locators & common methods like wait methods
 *
 */
public class BasePage {

	protected WebDriver m_driver = ApplicationProperties.getInstance().getDriver();
	int appWaitTime = ApplicationProperties.getInstance().getWaitTime();
	protected final JavascriptExecutor m_jsDriver = (JavascriptExecutor) m_driver;
	protected static final Logger logger = LoggerFactory.getLogger(BasePage.class);
	protected Robot robot;
	/**
	 * 
	 * @param seconds
	 *            number of seconds to sleep as a double value eg. 0.5.
	 */
	public void sleep(final Double seconds) {
		try {
			Thread.sleep((long) (seconds * 1000));
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 
	 * @param seconds
	 *            number of seconds to sleep as integer.
	 */
	public void sleep(final int seconds) {
		sleep(new Double(seconds));
	}

	/**
	 * 
	 * Method to wait for the App to be in ready state
	 */
	
	public BasePage waitForReady() {
		return waitForReady(ApplicationProperties.getInstance().getWaitTime());
	}

	/**
	 * Method to wait for the App to be in ready state and time to wait till it is ready
	 * @param secondsToSleep
	 * @return
	 */
	public BasePage waitForReady(int secondsToSleep) {
		FluentWait<BasePage> wait = new FluentWait<BasePage>(this);

		wait.withTimeout(secondsToSleep, TimeUnit.SECONDS).pollingEvery(1, TimeUnit.SECONDS).withMessage("waitForReady timed out. Page not ready").until(new Predicate<BasePage>() {
			@Override
			public boolean apply(BasePage element) {
				logger.info("Waiting for Page to be ready");
				return AutomationUtils.isPageReady();
			}
		});
		return this;
	}
	
/*	*//**
	 * Method to wait for the Element
	 * @param by
	 * @return
	 *//*
	public WebElement waitForElement(org.openqa.selenium.By by) {
		logger.info("Wait for element with by started");
		FluentWait<org.openqa.selenium.By> wait = new FluentWait<org.openqa.selenium.By>(by);
		long secondsToSleep = ApplicationProperties.getInstance().getWaitTime();
		
		//wait.withTimeout(secondsToSleep, TimeUnit.SECONDS).withMessage("waitForReady timed out. Element " + by.toString() + " not present").until(new Predicate<org.openqa.selenium.By>() {
		wait.withTimeout(secondsToSleep, TimeUnit.SECONDS).pollingEvery(1, TimeUnit.SECONDS).ignoring(NoSuchElementException.class).withMessage("waitForReady timed out. Element " + by.toString() + " not present").until(new Predicate<org.openqa.selenium.By>() {
			@Override
			public boolean apply(org.openqa.selenium.By by) {
				try {
					if(m_driver.findElement(by).isDisplayed())
						{
						logger.info("Element is displayed successfully "+by.toString());
						return true;
						}
				} catch (TimeoutException e) {
					logger.info("Element Not Found --" + by.toString() + " not present "+e.getLocalizedMessage());
					return false;
				}
				//Comes to this point if Element is Not displayed
				logger.info("Element is NOT displayed "+by.toString());
				return false;
			}
		});

		return m_driver.findElement(by);
	}*/

	/**
	 * Method to wait for the Element
	 * @param by
	 * @returnddd
	 */
	public WebElement waitForElement(org.openqa.selenium.By by) {
			logger.info("Inside waitForElement with By -- "+by.toString());
			
			int x=1;
			while(x<=appWaitTime*2)
			{
				try{
						if(m_driver.findElement(by).isDisplayed())
						{
						logger.info("Element is displayed successfully "+by.toString());
						return m_driver.findElement(by);
						}
						
				}catch(Exception e){
					logger.info("Exception while finding Element " + e.getLocalizedMessage());
				}
				
				
				if (x==appWaitTime)	
				{	
				logger.info("Element not found with By in FINAL loop "+x+" -- "+by.toString());
				return null;
				}else{		
					logger.info("TRYING AGAIN -- Element not found in loop "+x+" -- "+by.toString());
				sleep(0.5);
				x++;
				}
			}
			return m_driver.findElement(by);
		
	}
	
/*	
	*//**
	 * Waits for the Element for specified no. of seconds and returns the element if found
	 * @param by
	 * @param secondsToSleep
	 * @return
	 *//*
	public WebElement waitForElement(org.openqa.selenium.By by, int secondsToSleep) {
		logger.info("Wait for element with by started");
		FluentWait<org.openqa.selenium.By> wait = new FluentWait<org.openqa.selenium.By>(by);
		
		//wait.withTimeout(secondsToSleep, TimeUnit.SECONDS).withMessage("waitForReady timed out. Element " + by.toString() + " not present").until(new Predicate<org.openqa.selenium.By>() {
		wait.withTimeout(secondsToSleep, TimeUnit.SECONDS).pollingEvery(1, TimeUnit.SECONDS).ignoring(NoSuchElementException.class).withMessage("waitForReady timed out. Element " + by.toString() + " not present").until(new Predicate<org.openqa.selenium.By>() {
			@Override
			public boolean apply(org.openqa.selenium.By by) {
				try {
					if(m_driver.findElement(by).isDisplayed())
						{
						logger.info("Element is displayed successfully "+by.toString());
						return true;
						}
				} catch (TimeoutException e) {
					logger.info("Element Not Found --" + by.toString() + " not present "+e.getLocalizedMessage());
					return false;
				}
//				catch (StaleElementReferenceException e) {
//					logger.info("Element Not Found --" + by.toString() + " not present "+e.getLocalizedMessage());
//					waitForReady();
//					return false;
//				}
				//Comes to this point if Element is Not displayed
				logger.info("Element is NOT displayed "+by.toString());
				return false;
			}
		});

		return m_driver.findElement(by);
	}*/

	
	public WebElement waitForElement(org.openqa.selenium.By by, int secondsToSleep) {
		
		logger.info("Inside waitForElement with By -- "+by.toString());
		
		int x=1;
		while(x<=secondsToSleep)
		{
			try{
					if(m_driver.findElement(by).isDisplayed())
					{
					logger.info("Element is displayed successfully "+by.toString());
					return m_driver.findElement(by);
					}
					
			}catch(Exception e){
				logger.info("Exception while finding Element " + e.getLocalizedMessage());
			}
			
			
			if (x==secondsToSleep)	
			{	
				logger.info("Element not found with By in FINAL loop "+x+" -- "+by.toString());
			return null;
			}else{		
				logger.info("TRYING AGAIN -- Element not found in loop "+x+" -- "+by.toString());
			sleep(0.5);
			x++;
			}
		}
		return m_driver.findElement(by);
	}
	
	/**
	 * method waits for a particular element to appear on the page
	 * 
	 * @param by
	 *            - search by
	 * @param secondsToWait
	 *            - time to wait before throwing an error
	 */
	public void waitForElement(BaseElement element) {
		logger.info("About to wait....");
		waitForElement(element, ApplicationProperties.getInstance().getWaitTime());
	}
/*
	*//**
	 * method waits for a particular element to appear on the page
	 * 
	 * @param by
	 *            - search by
	 * @param secondsToWait
	 *            - time to wait before throwing an error
	 *//*
	public void waitForElement(BaseElement element, long secondsToWait) {
		logger.info("Wait for element started");
		FluentWait<BaseElement> wait = new FluentWait<BaseElement>(element);
		//wait.withTimeout(secondsToWait, TimeUnit.SECONDS).withMessage("waitForReady timed out. Element " + element.toString() + " is still not present").until(new Predicate<BaseElement>() {
		wait.withTimeout(secondsToWait, TimeUnit.SECONDS).pollingEvery(1, TimeUnit.SECONDS).ignoring(NoSuchElementException.class).withMessage("waitForReady timed out. Element " + element.toString() + element.getElement()+" is still not present").until(new Predicate<BaseElement>() {
			@Override
			public boolean apply(BaseElement element) {
				try {
					if (element.isDisplayed()) {
						//Returns back if the required Element is displayed
						logger.info("Element "+element.getElement()+" is Displayed Successfully");
						return true;
					}
				} catch (TimeoutException e) {
					logger.info("Element Not Displayed  "+element.toString()+element.getElement()+e.getLocalizedMessage());
					waitForReady();
					return false;
				}
				//Comes to this point if Element is Not displayed
				logger.info("Element " + element.toString() + element.getElement() + " is not Displayed");
				return false;
			}
		});
	}

    */
	
	
	public void waitForElement(BaseElement element, long secondsToWait) {
		logger.info("Inside waitForElement ");

		int x=1;
		while(x<=secondsToWait)
		{
			try{
					if(element.isDisplayed())
					{
					logger.info("Element is displayed successfully "+element.getElement());
					return;
					}
					
			}catch(Exception e){
				logger.info("Exception while finding Element " + e.getLocalizedMessage());
			}
			
			
			if (x==secondsToWait)	
			{	
			logger.info("Element not found with By in FINAL loop "+x);
			return;
			}else{		
				logger.info("TRYING AGAIN -- Element not found in loop "+x);
			sleep(0.5);
			x++;
			}
		}
		
	}
	
	
	
	/**
	 * method waits for a particular element to disappear from the page
	 * 
	 * @param by
	 */
	public void waitForElementToDisappear(org.openqa.selenium.By by) {
		waitForElementToDisappear(by, ApplicationProperties.getInstance().getWaitTime());
	}

	/**
	 * method waits for a particular element to disappear from the page
	 * 
	 * @param by
	 *            - search by
	 * @param secondsToWait
	 *            - time to wait before throwing an error
	 */
	public void waitForElementToDisappear(org.openqa.selenium.By by, long secondsToWait) {
		FluentWait<org.openqa.selenium.By> wait = new FluentWait<org.openqa.selenium.By>(by);

		wait.withTimeout(secondsToWait, TimeUnit.SECONDS).withMessage("waitForReady timed out. Element " + by.toString() + " is still present").until(new Predicate<org.openqa.selenium.By>() {
			@Override
			public boolean apply(org.openqa.selenium.By by) {
				ApplicationProperties.getInstance().disableWaitTime();
				try {
					if (!m_driver.findElement(by).isDisplayed()) {
						return true;
					}
				} catch (NoSuchElementException e) {
					return true;
				} catch (StaleElementReferenceException ef) {
					return true;
				} finally {
					ApplicationProperties.getInstance().setTimeouts();
				}
				return false;
			}
		});
	}

	/**
	 * method waits for a particular element to disappear from the page
	 * 
	 * @param by
	 *            - search by
	 * @param secondsToWait
	 *            - time to wait before throwing an error
	 */
	public void waitForElementToDisappear(BaseElement element) {
		waitForElementToDisappear(element, ApplicationProperties.getInstance().getWaitTime());
	}

	/**
	 * method waits for a particular element to disappear from the page
	 * 
	 * @param by
	 *            - search by
	 * @param secondsToWait
	 *            - time to wait before throwing an error
	 */
	public void waitForElementToDisappear(BaseElement element, long secondsToWait) {
		FluentWait<BaseElement> wait = new FluentWait<BaseElement>(element);

		wait.withTimeout(secondsToWait, TimeUnit.SECONDS).withMessage("waitForReady timed out. Element " + element.toString() + " is still present").until(new Predicate<BaseElement>() {
			@Override
			public boolean apply(BaseElement element) {
				try {
					if (!element.isDisplayed()) {
						return true;
					}
				} catch (NoSuchElementException e) {
					return true;
				}
				return false;
			}
		});
	}

	/**
	 * Disables timeout and checks if an element is present on page. returns
	 * true if it is, false otherwise.
	 * 
	 * @param by
	 * @return
	 */
	public boolean isElementPresent(org.openqa.selenium.By by) {
		try {
			ApplicationProperties.getInstance().disableWaitTime();
			return m_driver.findElement(by).isDisplayed();
		} catch (NoSuchElementException e) {
			return false;
		} finally {
			ApplicationProperties.getInstance().setTimeouts();
		}
	}

	public boolean isElementPresent(com.oracle.pgbu.common.By by) {
		try {
			ApplicationProperties.getInstance().disableWaitTime();
			return m_driver.findElement(by).isDisplayed();
		} catch (NoSuchElementException e) {
			return false;
		} finally {
			ApplicationProperties.getInstance().setTimeouts();
		}
	}

	/**
	 * Sets timeout and checks if an element is present on page. returns true if
	 * it is, false otherwise.
	 * 
	 * @param by
	 * @return
	 */
	public boolean isElementPresent(org.openqa.selenium.By by, int waitTime) {
		try {
			ApplicationProperties.getInstance().setTimeouts(waitTime, TimeUnit.SECONDS);
			return m_driver.findElement(by).isDisplayed();
		} catch (NoSuchElementException e) {
			return false;
		} finally {
			ApplicationProperties.getInstance().setTimeouts();
		}
	}

	/**
	 * Disables timeout and checks if an element is present on page. returns
	 * true if it is, false otherwise.
	 * 
	 * @param by
	 * @return
	 */
	public boolean isElementPresent(BaseElement element) {
		try {
			ApplicationProperties.getInstance().disableWaitTime();
			ApplicationProperties.getInstance().setPageFactoryCompLoadTime(0);
			return element.isDisplayed();
		} catch (NoSuchElementException e) {
			return false;
		} finally {
			ApplicationProperties.getInstance().setTimeouts();
			ApplicationProperties.getInstance().setPageFactoryCompLoadTime();
		}
	}

	
	 /**
     * Switches to New Pop-up window after waiting for the max Time out
     * 
     * @param windowTitle Title of the popup window to be switched to
     * @return after switching to the new popup window, else return after timeout
     */
   public String switchToWindow(WindowNames windowTitle, int maxWait)
	{
	   logger.info("Inside switchToWindow");
		int x=1;
		String currentlySwitchedWindowHandle="";
		
		while(x<=maxWait)
		{
				//Read all the available window handles
				try{
				for(String winHandle : m_driver.getWindowHandles())
					{
					try{
						//logger.info("About to Switch to "+winHandle.toString()+windowTitle.getWindowName());
						//Switch to new window and check whether it's the correct desired window title
						m_driver.switchTo().window(winHandle);
						//m_driver.findElement(By.xpath("//body")).click();
						//sleep(1);
						logger.info(m_driver.getTitle());
						if(m_driver.getTitle().contains(windowTitle.getWindowName()))
						{
							logger.info("Switch to Window successful, window handle is "+winHandle.toString()+" Window Title is "+m_driver.getTitle()+" loop "+x);
							waitForReady();
							currentlySwitchedWindowHandle = winHandle;
						   	return currentlySwitchedWindowHandle;		    	
						}
					  }catch(Throwable e){
						  logger.info("Switch to Window "+windowTitle.getWindowName()+" not successful in ATTEMPT No.: "+x+" Warning  "+e.getMessage());
					  }
					}
					}catch(Exception e){
				    	 logger.info("Exception in getWindowHandles() function"+e.getLocalizedMessage());
				     }
			if (x==maxWait)	
			{	
			logger.info("Switch to Window "+windowTitle.getWindowName()+" failed in loop "+x);
			return currentlySwitchedWindowHandle;
			}else{				
			sleep(1);
			x++;
			}
		}
		return currentlySwitchedWindowHandle;
	}
   
   /**
    * Switches to New Pop-up window after waiting for the max Time out
    * 
    * @param windowTitle Title of the popup window to be switched to
    * @return after switching to the new popup window, else return after timeout
    */
		  public String switchToWindow(String windowTitle, int maxWait)
		 {
		    logger.info("Inside switchToWindow");
		  int x=1;
		  String currentlySwitchedWindowHandle="";
		  
		  while(x<=maxWait)
		  {
			  
		    //Read all the available window handles
			try{  
		    for(String winHandle : m_driver.getWindowHandles())
		     {
		     try{
		      //logger.info("About to Switch to "+winHandle.toString()+windowTitle.getWindowName());
		      //Switch to new window and check whether it's the correct desired window title
		      m_driver.switchTo().window(winHandle);
		      //m_driver.findElement(By.xpath("//body")).click();
		      //sleep(1);
		      logger.info(m_driver.getTitle());
		      if(m_driver.getTitle().contains(windowTitle))
		      {
		       logger.info("Switch to Window successful, window handle is "+winHandle.toString()+" Window Title is "+m_driver.getTitle()+" loop "+x);
		       waitForReady();
				currentlySwitchedWindowHandle = winHandle;
			   	return currentlySwitchedWindowHandle;		  
		      }
		       }catch(Throwable e){
					  logger.info("Switch to Window "+windowTitle+" not successful in ATTEMPT No.: "+x+" Warning  "+e.getMessage());
		       }
		     }
			}catch(Exception e){
				logger.info("Exception in getWindowHandles() function"+e.getLocalizedMessage());
		     }
		   if (x==maxWait) 
		   { 
		   logger.info("Switch to Window "+windowTitle+" failed in loop "+x);
		   return currentlySwitchedWindowHandle;
		   }else{    
		   sleep(1);
		   x++;
		   }
		  }
		  return currentlySwitchedWindowHandle;
  
		 }

			 /**
		     * Switches to New Pop-up window with Exact same name (does not use 'contains') after waiting for the max Time out
		     * 
		     * @param windowTitle Title of the popup window to be switched to
		     * @return after switching to the new popup window, else return after timeout
		     */
		   public String switchToWindowExactName(WindowNames windowTitle, int maxWait)
			{
			   logger.info("Inside switchToWindow "+windowTitle.getWindowName());
				int x=1;
				String currentlySwitchedWindowHandle="";
				
				while(x<=maxWait)
				{
						//Read all the available window handles
						try{
						for(String winHandle : m_driver.getWindowHandles())
							{
							try{
								//logger.info("About to Switch to "+winHandle.toString()+windowTitle.getWindowName());
								//Switch to new window and check whether it's the correct desired window title
								logger.info(winHandle);
								m_driver.switchTo().window(winHandle);
								logger.info("After Switch");
								//m_driver.findElement(By.xpath("//body")).click();
								//sleep(1);
								
								//sleep(5);
								logger.info(m_driver.getTitle());
								if(m_driver.getTitle().equals(windowTitle.getWindowName()))
								{
									logger.info("Switch to Window successful, window handle is "+winHandle.toString()+" Window Title is "+m_driver.getTitle()+" loop "+x);
									waitForReady();
									currentlySwitchedWindowHandle = winHandle;
								   	return currentlySwitchedWindowHandle;			    	
								}
							  }catch(Throwable e){
								  logger.info("Switch to Window "+windowTitle.getWindowName()+" not successful in ATTEMPT No.: "+x+" Warning "+e.getMessage());
							  }
							}
							}catch(Exception e){
								logger.info("Exception in getWindowHandles() function"+e.getLocalizedMessage());
						     }
					if (x==maxWait)	
					{	
					logger.info("Switch to Window "+windowTitle.getWindowName()+" failed in loop "+x);
					return currentlySwitchedWindowHandle;
					}else{
					logger.info("Trying again to Switch to the required window");
					sleep(1);
					x++;
					}
				}
				return currentlySwitchedWindowHandle;	
			}
		   
		   
		   
		   /**
		     * Switches to New Pop-up window with Exact same name (does not use 'contains') after waiting for the max Time out
		     * 
		     * @param windowTitle Title of the popup window to be switched to
		 * @return 
		     * @return after switching to the new popup window, else return after timeout
		     */
		   public String switchToWindowExactName(String windowTitle, int maxWait)
			{
			   logger.info("Inside switchToWindow ");
				int x=1;
				String currentlySwitchedWindowHandle="";	
				
				while(x<=maxWait)
				{
						//Read all the available window handles
						for(String winHandle : m_driver.getWindowHandles())
							{
							try{
								//logger.info("About to Switch to "+winHandle.toString()+windowTitle.getWindowName());
								//Switch to new window and check whether it's the correct desired window title
								logger.info(winHandle);
								m_driver.switchTo().window(winHandle);
								logger.info("After Switch");
								//m_driver.findElement(By.xpath("//body")).click();
								//sleep(1);
								
								//sleep(5);
								logger.info(m_driver.getTitle());
								if(m_driver.getTitle().equals(windowTitle))
								{
									logger.info("Switch to Window successful, window handle is "+winHandle.toString()+" Window Title is "+m_driver.getTitle()+" loop "+x);
									waitForReady();
									currentlySwitchedWindowHandle = winHandle;
								   	return currentlySwitchedWindowHandle;	
								}
							  }catch(Throwable e){
								  logger.info("Switch to Window "+windowTitle+" not successful in ATTEMPT No.: "+x+" Warning "+e.getMessage());
								  e.printStackTrace();
							  }
							}
					if (x==maxWait)	
					{	
					logger.info("Switch to Window "+windowTitle+" failed in loop "+x);
					return currentlySwitchedWindowHandle;
					}else{				
					sleep(1);
					x++;
					}
				}
				  return currentlySwitchedWindowHandle;
			}
		   
           /**
         * Switches to New Pop-up window having required element after waiting for the max Time out
         * 
         * @param windowTitle Title of the popup window to be switched to
         * @param BaseElement Element to be checked on window
         * @return after switching to the new popup window, else return after timeout
         */
       public String switchToWindowWithElement(WindowNames windowTitle, BaseElement element, int maxWait)
           {
              logger.info("Inside switchToWindowWithElement");
                 int x=1;
                 String currentlySwitchedWindowHandle="";
                 
                 while(x<=maxWait)
                 {
                               //Read all the available window handles
                	 			try{
                               for(String winHandle : m_driver.getWindowHandles())
                                      {
                                      try{
                                             //logger.info("About to Switch to "+winHandle.toString()+windowTitle.getWindowName());
                                             //Switch to new window and check whether it's the correct desired window title
                                             m_driver.switchTo().window(winHandle);
                                             //m_driver.findElement(By.xpath("//body")).click();
                                             //sleep(1);
                                             logger.info(m_driver.getTitle());
                                             if(m_driver.getTitle().contains(windowTitle.getWindowName()))
                                             {
                                                    try{
                                                    m_driver.manage().window().setSize(new Dimension(1600, 900));
                                                    m_driver.manage().window().setPosition(new Point(0, 0));
                                                    waitForElement(element);
                                                    if(element.isDisplayed())
                                                    {
                                                           logger.info("Switch to Window with Element successful, window handle is "+winHandle.toString()+" Window Title is "+m_driver.getTitle()+" loop "+x);
                                                           waitForReady();
                               								currentlySwitchedWindowHandle = winHandle;
                               								return currentlySwitchedWindowHandle;		
                                                    }
                                                    }catch(NoSuchElementException e){
                                                           logger.info("NoSuchElementException while trying to check for Element on Window with matching Title");
                                                    }
                                             }
                                        }catch(Throwable e){
                                               logger.info("Switch to Window "+windowTitle.getWindowName()+" not successful in ATTEMPT No.: "+x+" Warning "+e.getMessage());
                                        }
                                      }
                               		  }catch(Exception e){
                               			logger.info("Exception in getWindowHandles() function"+e.getLocalizedMessage());
                         		     }
                        if (x==maxWait)      
                        {      
                        logger.info("Switch to Window "+windowTitle.getWindowName()+" failed in loop "+x);
                        return currentlySwitchedWindowHandle;
                        }else{                     
                        sleep(1);
                        x++;
                        }
                 }
                 return currentlySwitchedWindowHandle; 
           }

     /**
      * 
      * Waits for the Window with the specified window handles disappears - waits till maxTimeout 
      * @param winHandleToDisappear
      * @param maxWait
      */
	  public void waitForWindowWithHandleToDisappear(String winHandleToDisappear, int maxWait)
	 {
	  logger.info("Inside WaitForWindowToDissapear");
	  boolean windowHandlePresent=false;
	  int x=1;
	  
	  while(x<=maxWait)
	  {
		windowHandlePresent=false;  
		  try{
			 for(String winHandle : m_driver.getWindowHandles())
			     {
					logger.info("Current window handle "+winHandle);
					logger.info("Window handle to dissapear "+winHandleToDisappear);
					if (winHandle.equals(winHandleToDisappear)){
						windowHandlePresent = true;
					}
			     }
		    	}catch(UnhandledAlertException e){
		  			logger.info("Warning -- Unhandled Alert Exception thrown while ensuring that the window is disappeared");
		  			windowHandlePresent = true;
		  			}
		  
			 if(!windowHandlePresent){
				 logger.info("The Window is disappeared successfully");
				 return;
			 }
		  
	   if (x==maxWait) 
	   { 
	   logger.info("Window continues to exist....hence, closing it using m_driver.close()");
	   checkAlert();
	   m_driver.close();
	   checkAlert();
	   return;
	   }else{  
		   logger.info("Window found, continuing loop ");
	   sleep(1);
	   x++;
	   }
	  }

	 }

	     /**
	      * 
	      * Waits for the Window to disappear - waits till maxTimeout 
	      * @param winHandleToDisappear
	      * @param maxWait
	      */
	  public void waitForWindowToDisappear(String winTitle, int maxWait)
		 {
			  logger.info("Inside WaitForWindowToDissapear");  
			  WorkspacePage m_workspacePage = CustomPageFactory.initElements(WorkspacePage.class);
		 
		  int x=1;
		  
		  while(x<=maxWait)
		  {
			  try{
				  if (m_driver.getTitle().equals(winTitle)){
							//No Exception i.e. window exists
					  logger.info("Window exists "+m_driver.getTitle());
						}
		    	}catch(UnhandledAlertException e){
			  			logger.info("Warning -- Unhandled Alert Exception thrown while ensuring that the window is disappeared");
			  			logger.info("Dismissing Alert");
				  			try{
					        Alert alert = m_driver.switchTo().alert();
					        alert.dismiss();
					        logger.info("Dismissed the Alert");
				  			}catch(Exception en){
				  				logger.info("Exception while Dismissing Alert "+e.getLocalizedMessage());
				  				en.printStackTrace();
				  			}
				  			logger.info("Click Cancel Button to avoid hang issue like on Line Item window");
				  			try{
				  				switchToWindowExactName(winTitle, appWaitTime);
				  				m_workspacePage.waitForElement(m_workspacePage.commonCancelButton);
				  				if(m_workspacePage.isElementPresent(m_workspacePage.commonCancelButton)){
				  					m_workspacePage.commonCancelButton.click();
				  					logger.info("Clicked Cancel button inside waitForWindowToDisappear");
				  				}
				  			}catch(Exception ec){
				  				logger.info("Exception while clicking 'Cancel' button inside waitForWindowToDisappear "+ec.getLocalizedMessage());
				  			}
			  			}
			     catch(NoSuchWindowException e){
			    	 logger.info("Inside NoSuchWindowException: Window Disappeared Successfully");
			    	 return;
			     }
			     catch(Exception e){
			    	 logger.info("Exception while waiting for window to disappear");
			    	 e.printStackTrace();
			     }

			  
		   if (x==maxWait) 
		   { 
		   logger.info("Window continues to exist even after waiting for appWaitTime "+appWaitTime+" seconds");
		   logger.info("Making current window close using m_driver.close()");
		   try{
		   m_driver.manage().window().setPosition(new Point(0, 0));	   
		   m_driver.close();
		   logger.info("Executed m_driver.close()");
		   }catch(Exception e){
			   logger.info("Exception while trying to close the window with m_driver.close()");
			   e.printStackTrace();
		   }
		   return;
		   }else{  
			   logger.info("Window found, continuing loop ");
			   sleep(1);
			   x++;
		   		}
		  }

		 }
	  
	  
	  
	  public void checkAlert() {
		    try {
		        WebDriverWait wait = new WebDriverWait(m_driver, 3);
		        wait.until(ExpectedConditions.alertIsPresent());
		        Alert alert = m_driver.switchTo().alert();
		        alert.accept();
		    } catch (Exception e) {
		        //exception handling
		    }
		}
	  
	  
	  /**
	   * Function to close window by sending ALT+F4 keys
	   */
	  public void sendALTF4()
	  {
		  try{
			  	logger.info("Sending ALT+F4 keys");
				 Robot robot = new Robot();
				 robot.keyPress(KeyEvent.VK_ALT);
				 robot.keyPress(KeyEvent.VK_F4);
				 robot.keyRelease(KeyEvent.VK_F4);
				 robot.keyRelease(KeyEvent.VK_ALT);
				 logger.info("Sent ALT+F4 keys successfully");
				 }catch(Exception e){
					 logger.info("Exception while sending ALT+F4 keys "+e.getLocalizedMessage()+e.getMessage());
				 }
	  }
	  
     /**
     * Shift key will be pressed until the selection of the start and end elements in the Grid
     * 
     * @param Starting Element in the Grid
     * @param Ending Element in the Grid
     * @return after selection of the elements, else return after elements not found
     */
       public void shiftSelectElements(WebElement startElement, WebElement endElement) {
   
    		 try{
    			    robot = new Robot();
    			    //Shift Key Press Down
    			    robot.keyPress(KeyEvent.VK_SHIFT);
    			    //Selection of the elements
    			    startElement.click();
    			    endElement.click();
    			    //Shift Key Release
    			    robot.keyRelease(KeyEvent.VK_SHIFT);
    			    logger.info("Shift Selection of Elements Completed");
    		}catch(AWTException e){
    			logger.info("Shift Selection of Elements Failed");
    		}
       }
    
       /**
        * Select the Window Dialog elements basing on the image path's provided
        * 
        * @param Image Path of the element to be selected
        * @return Window Dialog Element is Selected
        */
       
       public boolean selectWindowDialogElements(String WindowDialogElement){
    	try{
    	   Screen s = new Screen();
    	     logger.info("Going Select the Window Dialog Element");
    	     s.wait(WindowDialogElement,appWaitTime*2);
    	     s.mouseMove(WindowDialogElement);
    	     s.click();
    	     s.mouseMove(s.getCenter());
             logger.info("Window Dialog Button selected");
             return true;
       }
       catch(Exception e){
    	   logger.info("Window Dialog Button selection Failed");
    	   return false;
       }
       }
       
       /**
        * Select the Window Dialog elements basing on the image path's provided
        * 
        * @param Image Path of the element to be selected
        * @return Window Dialog Element is Selected
        */
       
       public boolean rightClickWindowDialogElements(String WindowDialogElement){
    	try{
    	   Screen s = new Screen();
    	     logger.info("Going Select the Window Dialog Element");
    	     s.wait(WindowDialogElement,appWaitTime*2);
    	     s.mouseMove(WindowDialogElement);
    	     s.rightClick();
    	     s.mouseMove(s.getCenter());
             logger.info("Window Dialog Button selected");
             return true;
       }
       catch(Exception e){
    	   logger.info("Window Dialog Button selection Failed");
    	   return false;
       }
       }
       
       /**
        * Types the Window Dialog elements basing on the image path's provided
        * 
        * @param Image Path of window text element
        * @param Text to be pasted on the window text element
        * @return Text will be pasted on Windows Text element
        */
       public void TypeWindowDialogElements(String WindowDialogElement, String WindowPath){
       	try{
       	  
       		Screen s = new Screen();
       		logger.info("Going Type on the Window Dialog Element");
 	        s.wait(WindowDialogElement,appWaitTime*2);
 	        s.mouseMove(WindowDialogElement);
 	        s.type(Key.BACKSPACE);
 	        s.wait(WindowDialogElement,appWaitTime*2);
 	        s.paste(WindowDialogElement, WindowPath);
 	        s.mouseMove(s.getCenter());
            logger.info("Pasted on Window Dialog Element");
          }
          catch(Exception e){
       	   logger.info("Window Dialog Typing Failed");
          }
          }
       
    /**
     * Function to get the Element containing Inner Text   
     * @param element
     * @param innerText
     * @param maxWait
     * Example: 
     * @return WebElement containing specified Inner Text
     */
   	public WebElement findElementWithInnerTextCSS(String element, String innerText, int maxWait){
          
   		   logger.info("Finding Element "+element+" with Inner Text "+innerText);
   		   List<WebElement> elements = new ArrayList<WebElement>();
           int x=1;
                      
   		while(x<=maxWait)
   		{
           elements = m_driver.findElements(By.cssSelector(element));
           for(WebElement e:elements)
           {
        	   logger.info(e.getText());
               if(innerText.trim().equals(e.getText().trim()))
               {
            	   logger.info("Found Element with required inner text "+innerText+"  "+e.toString());
                   return e;
               }
           }
           
        //If maxWait Time is not reached, try again, else return
  		if (x==maxWait)	
  		{	
            //Element with specified inner text not found
            logger.info("Element not found with inner text: "+innerText);
            return null;
            
  			}else{		
  			sleep(1);
            //Element with specified inner text not found
            logger.info("TRYING AGAIN - Element not found with inner text in loop "+x);
  			x++;
  			}
       }
   		
        logger.info("Element not found with inner text: "+innerText);
        return null;
   	
   	}
   	
    /**
     * Function to get the Element containing Inner Text   
     * @param element
     * @param innerText
     * @param maxWait
     * Example: 
     * @return WebElement containing specified Inner Text
     */
   	public BaseElement findElementWithInnerTextXPath(String element, String innerText, int maxWait, boolean waitForElement){
   		
  	    //BaseElement m_findElement = new BaseElement(m_driver.findElement(By.xpath("//"+element+"[text()='"+innerText+"']")));
   		
   		if(waitForElement){
   			//waitForElement(m_findElement, maxWait);
   			waitForElement(By.xpath("//"+element+"[text()='"+innerText+"']"), maxWait);
   			return new BaseElement(m_driver.findElement(By.xpath("//"+element+"[text()='"+innerText+"']")));
   		}
   		   logger.info("Finding Element using XPath "+element+" with Inner Text "+innerText);
           //return m_driver.findElement(By.xpath("//"+element+"[text()='"+innerText+"']"));
           return new BaseElement(m_driver.findElement(By.xpath("//"+element+"[text()='"+innerText+"']")));
   	
   	}
   	
    /**
     * Function to get the Element using contains   
     * @param element
     * @param innerText
     * @param maxWait
     * Example: 
     * @return WebElement containing specified Inner Text
     */
   	public BaseElement findElementWithXPathContains(String element, String innerText, int maxWait, boolean waitForElement){
   		//BaseElement m_findElement = new BaseElement(m_driver.findElement(By.xpath("//"+element+"[contains(text(),'"+innerText+"')]")));
   		
   		if(waitForElement){
   			waitForElement(By.xpath("//"+element+"[contains(text(),'"+innerText+"')]"), maxWait);
   			return new BaseElement(m_driver.findElement(By.xpath("//"+element+"[contains(text(),'"+innerText+"')]")));
   		}
   		   logger.info("Finding Element using XPath "+element+" with contains "+innerText);
           //return m_driver.findElement(By.xpath("//"+element+"[contains(text(),'"+innerText+"')]"));
           //return m_findElement;
           return new BaseElement(m_driver.findElement(By.xpath("//"+element+"[contains(text(),'"+innerText+"')]")));
   	
   	}
   	
   	
    /**
     * Function to get the Element using contains   
     * @param element
     * @param innerText
     * @param maxWait
     * Example: 
     * @return WebElement containing specified Inner Text
     */
   	public BaseElement findElementWithXPathExactInnerText(String element, String innerText, int maxWait, boolean waitForElement){
   		
   		if(waitForElement){
   			waitForElement(By.xpath("//"+element+"[text() ='"+innerText+"']"), maxWait);
   			return new BaseElement(m_driver.findElement(By.xpath("//"+element+"[text()='"+innerText+"']")));
   		}
   		   logger.info("Finding Element using XPath "+element+" with contains "+innerText);
           //return m_driver.findElement(By.xpath("//"+element+"[contains(text(),'"+innerText+"')]"));
           //return m_findElement;
           return new BaseElement(m_driver.findElement(By.xpath("//"+element+"[text()='"+innerText+"']")));
   	
   	}
   	
   	
   	/**
   	 * function to select two elements using control key
   	 * @param firstElement
   	 * @param secondElement
   	 */
   	public void contrlSelectElements(WebElement firstElement, WebElement secondElement) {
 	   
 		 try{
 			    robot = new Robot();
 			    //Control Key Press Down
 			    
 			    //Selection of the elements
 			   firstElement.click();
 			   robot.keyPress(KeyEvent.VK_CONTROL);
 			   sleep(3);
 			   secondElement.click();
 			    //Control Key Release
 			    robot.keyRelease(KeyEvent.VK_CONTROL);
 			    logger.info("control Selection of Elements Completed");
 		}catch(AWTException e){
 			logger.info("control Selection of Elements Failed");
 		}
    }
   	
   	/**
   	 * function to wait for a window to disappear 
   	 * @param winTitle
   	 */
   	
   	public void waitForWindowToDisappear(String winTitle)
	 {
		  logger.info("Inside WaitForWindowToDissapear");  
	 
	  int x=1;
	  
	  while(x<=appWaitTime*2)
	  {
		  try{
			  if (m_driver.getTitle().equals(winTitle)){
						//No Exception i.e. window exists
				  logger.info("Window exists "+m_driver.getTitle());
					}
	    	}catch(UnhandledAlertException e){
		  			logger.info("Warning -- Unhandled Alert Exception thrown while ensuring that the window is disappeared");
		  			logger.info("Dismissing Alert");
			  			try{
				        Alert alert = m_driver.switchTo().alert();
				        alert.dismiss();
				        logger.info("Dismissed the Alert");
			  			}catch(Exception en){
			  				logger.info("Exception while Dismissing Alert "+e.getLocalizedMessage());
			  				en.printStackTrace();
			  			}
			  		logger.info("Click Cancel Button to avoid hang issue like on Line Item window");
			  			try{
			  				 WorkspacePage m_workspacePage = CustomPageFactory.initElements(WorkspacePage.class);
			  				switchToWindowExactName(winTitle, appWaitTime);
			  				m_workspacePage.waitForElement(m_workspacePage.commonCancelButton);
			  				if(m_workspacePage.isElementPresent(m_workspacePage.commonCancelButton)){
			  					m_workspacePage.commonCancelButton.click();
			  					logger.info("Clicked Cancel button inside waitForWindowToDisappear");
			  				}
			  			}catch(Exception ec){
			  				logger.info("Exception while clicking 'Cancel' button inside waitForWindowToDisappear "+ec.getLocalizedMessage());
			  			}
		  			}
		     catch(NoSuchWindowException e){
		    	 logger.info("Inside NoSuchWindowException: Window Disappeared Successfully");
		    	 return;
		     }
		     catch(Exception e){
		    	 logger.info("Exception while waiting for window to disappear");
		    	 e.printStackTrace();
		     }

		  
	   if (x==appWaitTime*2) 
	   { 
	   logger.info("Window continues to exist even after waiting for appWaitTime "+appWaitTime+" seconds");
	   logger.info("Making current window close using m_driver.close()");
	   try{
	   m_driver.manage().window().setPosition(new Point(0, 0));	   
	   m_driver.close();
	   logger.info("Executed m_driver.close()");
	   }catch(Exception e){
		   logger.info("Exception while trying to close the window with m_driver.close()");
		   e.printStackTrace();
	   }
	   return;
	   }else{  
		   logger.info("Window found, continuing loop ");
		   sleep(1);
		   x++;
	   		}
	  }

	 }
   	
    /**
     * Switches to All the windows & checks if the window to disappear exists
     * If window exists, loop and check again till time out is reached
     * @param windowTitle
     * @param maxWait
     */
		public boolean waitForWindowToDisappearWithSwitchWindows(String windowTitle, int maxWait)
		
		    {
		       logger.info("Inside waitForWindowToDisappearWithSwitchWindows ");
		           int x=1;
		           boolean m_winExists=false;
		           while(x<=maxWait)
		           {
		                        //Read all the available window handles
		                        for(String winHandle : m_driver.getWindowHandles())
		                              {
		                        	   m_winExists=false;
		                               try{
		                                      logger.info(winHandle);
		                                      m_driver.switchTo().window(winHandle);
		                                      logger.info("After Switch");                                 
		                                      logger.info(m_driver.getTitle());
		                                      if(m_driver.getTitle().contains(windowTitle))
		                                      {
		                                             logger.info("Window continues to exist "+winHandle.toString());
		                                             m_winExists=true;
		                                      }
		                                 }catch(Throwable e){
		                                	 
		                                 }
		                               }
				          //Window continues to exist & timeout is reached
				          if (x==maxWait && m_winExists==true)     
				          {
				          return false;                 
				          }
				          //Window doesn't exist after for loop
				          if (m_winExists==false)     
				          {
				          return true;                 
				          }
				          //Window exists & timeout is not reached, try again
				          else{                    
			                       sleep(1);
			                       x++;
			               }
		           }
		         //Window continues to exist & maxWait is over
		         return false;  
		    }      
}
       