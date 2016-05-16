package com.oracle.pgbu.p615v2.testcases.usermode.dashboard;

import org.junit.Test;
import org.junit.experimental.categories.Category;
import com.oracle.pgbu.p6web.testcases.BaseTestCase;
import com.oracle.pgbu.common.categories.SRS;
import com.oracle.pgbu.common.enums.UserNames;
import com.oracle.pgbu.common.enums.WindowNames;
import com.oracle.pgbu.common.pagefactory.CustomPageFactory;
import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.oracle.pgbu.pages.p6Web15v2.DashBoardPage;
import com.oracle.pgbu.pages.p6Web15v2.LoginPage;


public class TestDashBoard  extends BaseTestCase{

	LoginPage m_loginPage;
	DashBoardPage m_dashboardPage;			
	int appWaitTime = ApplicationProperties.getInstance().getWaitTime();
	
	public void presetup()
	{
		//Temp Data Clean up
		//AutomationUtils.tempDataCleanup(m_tempDataPath);
		
		//To ensure no exceptions remain in the test during retry of failed tests
		this.clearExceptions();

	    m_dashboardPage = CustomPageFactory.initElements(DashBoardPage.class);	
	    m_loginPage = CustomPageFactory.initElements(LoginPage.class);	
	    
	    
	   
	}
	
	/**
	    * @case Case to Verify Bulk Edit of Record Status in Company Logs
	    * @case_id 1506
	    * @step 1. Login into P6 using admin1/admin credentials
		* @step 2. Click on expand All button in Dashboard 
		* @step 3. Click on collapse ALL button in Dashboard
		* @step 4. Click on Maximize earned value top up button in Dashboard
		* @step 5. Click on Minimize earned value top up button in Dashboard
		* @step 6. Click on customize button in Dashboard
		* @step 7. Change Personal Workspace Name in Dashboard
		* @step 8. Click on Save and Close button in Dashboard
		* @step 11. Logout of P6
	    * @author   ssamaved
	    * @author_date : 09-sep-2015
        * 
	 */
	
	@Test
	@Category(SRS.class)
	public void verifyLoginExpandCollapseDashborad(){
			
		//step 1. Login into p6 using admin1/admin credentials
		logger.info("******* step 1. Login into p6 using admin1/admin credentials **********");
		if (!m_loginPage.isCurrentUser(UserNames.ADMIN_USER.getUserName())){
		m_loginPage.login(UserNames.ADMIN_USER.getUserName(), UserNames.ADMIN_USER.getUserPassword(), true); 
		}
		
		//step 2. Click on expand All button in Dashboard
		logger.info("******* step 2. Click on expand All button in Dashboard **********");
		m_dashboardPage.waitForElement(m_dashboardPage.expandAllButton);
		m_dashboardPage.expandAllButton.click();
		
		//step 3. Click on collapse ALL button in Dashboard
		logger.info("******* step 3. Click on collapse ALL button in Dashboard **********");
		m_dashboardPage.collapseAllButton.click();
	
		//step 4. Click on Maximize earned value top up button in Dashboard
		logger.info("******* step 4. Click on Maximize earned value top up button in Dashboard **********");
		m_dashboardPage.maximizeProjectGanttButton.click();
		
		//step 5. Click on Minimize earned value top up button in Dashboard
		logger.info("******* step 5. Click on Minimize earned value top up button in Dashboard **********");
		m_dashboardPage.maximizeProjectGanttButton.click();
		
		//step 6. Click on customize button in Dashboard
		logger.info("******* step 6. Click on customize button in Dashboard **********");
		m_dashboardPage.customizeButton.click();
		
		//step 7. Change Personal Workspace Name in Dashboard
		logger.info("******* step 7. Change Personal Workspace Name in Dashboard **********");
		m_dashboardPage.waitForElement(m_dashboardPage.dashboardNameTextBox);
		m_dashboardPage.dashboardNameTextBox.setText("New Personal Workspace 1234567");
		
		//step 8. Click on Save and Close button in Dashboard
		logger.info("******* step 8. Dash board Activities **********");
		m_dashboardPage.saveAndCloseButton.click();
		
		//step 9. Logout of p6
		logger.info("****** step 9. Logout of p6******");
		m_dashboardPage.switchToWindow(WindowNames.MAIN_WINDOW, appWaitTime);
		m_dashboardPage.waitForElement(m_loginPage.logoutLink);
		m_loginPage.logoutLink.click();
		
	}
	
}