package com.oracle.pgbu.p616v1.testcases.projects.activities;

import org.junit.Before;
import org.junit.Test;
import org.junit.experimental.categories.Category;
import org.testng.Assert;

import com.oracle.pgbu.common.categories.Acceptance;
import com.oracle.pgbu.common.enums.UserNames;
import com.oracle.pgbu.common.pagefactory.CustomPageFactory;
import com.oracle.pgbu.common.support.Utilities;
//import com.oracle.pgbu.pages.progressreporter.MyTasksPage;
import com.oracle.pgbu.p6web.appstate.BaseState;
import com.oracle.pgbu.p6web.helper.DataHelper;
import com.oracle.pgbu.p6web.helper.GenericHelper;
//import com.oracle.pgbu.teammember.helper.TeamMemberHelper;
import com.oracle.pgbu.p6web.testcases.BaseTestCase;
import com.oracle.pgbu.pages.p6Web15v2.LoginPage;
import com.oracle.pgbu.pages.p6Web15v2.NavigationPage;
import com.oracle.pgbu.pages.p6Web15v2.ProjectsPage;

/**
 * @Case
 * @author viksv
 * @date 
 * @throws Exception
 */
@Category(Acceptance.class)
public class Test1 extends BaseTestCase {
	 private final GenericHelper genHelper = new GenericHelper();
	 ProjectsPage projectsPage;
	 DataHelper dataHelper;
	 LoginPage m_loginPage = new LoginPage();
	 @Before
	    public void testSetUp() throws InterruptedException {
		    genHelper.createDataP6Test1(user);
	       /* if (!m_loggedIn) {
	            BaseState.login();	            
	            m_loggedIn = true;
	        }*/
	 }
	 
		/**
		 * @case: Create Activities for a Project
		 * @step1: Login to P6
		 * @step2: Navigate to Activities Page under Projects Tab
		 * @step3: Open a Project from Open Projects Dialog option
		 * @step4: Add Activity
		 * 
		 */
	 
	/*@Test
    public void P6Test() throws Exception {
 		/**
 		 * P6 Activity Creation test
 		 *//*		
		projectsPage = CustomPageFactory.initElements(ProjectsPage.class);
		m_loginPage = CustomPageFactory.initElements(LoginPage.class);
		//step 1. Login into p6 using admin1/admin credentials
		logger.info("******* step 1. Login into p6 using admin1/admin credentials **********");
		m_loginPage.login(UserNames.ADMIN_USER.getUserName(), UserNames.ADMIN_USER.getUserPassword(), true);
		logger.info("******* step2: Navigate to Activities Page under Projects Tab **********");
		projectsPage.navigateToActivitiesPage();
		logger.info("******* step3: Open a Project from Open Projects Dialog option **********");
		projectsPage.openAProject(dataHelper.project.getName());
		logger.info("******* step4: Add Activity **********");
		projectsPage.addActivity("Auto Activity");
		projectsPage.addActivity("Auto Activity1");		
	}*/
	
	/**
	 * Login to P6 4 Navigate to Projects -> EPS. Close all Projects. Create a
	 * Project and save. Project created successfully Navigate to Activities
	 * Page . Select the Activity View - ActView1 View is loaded Add a new
	 * Activity with no grouping to the project and save New Activity saved
	 * "Now edit the ""Activity Name"" of the Activity that was added in
	 * previous step. And save Activity Name is changed and saved successfully
	 * Edit Remaining duration of the Activity and Save the changes Successfully
	 * changed and saved the remaining duration Now edit the Planned Start date,
	 * Activity Type and WBS. Save the changes Successfully changed and saved
	 * the Planned Start Date, Activity Type and WBS Delete the Activity that
	 * was added. Warning displays and activity is removed when clicking yes
	 * 
	 * Activity is deleted and only one Activity is available in the project
	 * 
	 */
	@Test
    public void Add_Edit_DeleteActivity_SingleProject() throws Exception {
		projectsPage = CustomPageFactory.initElements(ProjectsPage.class);
		m_loginPage = CustomPageFactory.initElements(LoginPage.class);
		// step 1. Login into p6 using admin1/admin credentials
		logger.info("******* step 1. Login into p6 using admin1/admin credentials **********");
		m_loginPage.login(UserNames.Login_USER.getUserName(), UserNames.Login_USER.getUserPassword(), true);
		logger.info("******* step2: Navigate to Activities Page under Projects Tab **********");
		//projectsPage.navigateToEPSPage();
	    //projectsPage.CloseAllProjects();
	
		
		projectsPage.navigateToActivitiesPage();
		logger.info("******* step3: Open a Project from Open Projects Dialog option **********");		
		projectsPage.openAProject(dataHelper.project.getName());
		
		projectsPage.addActivity("Auto Activity");
	    projectsPage.addActivity("Auto Activity1");		

//		
//		projectsPage.selectActivityName();
//		projectsPage.editActivityField("Activity 11");
//		
//		projectsPage.selectRemainingDuration();
//		projectsPage.editActivityField("5.0d");
//		
//		projectsPage.selectplannedStart();
//		
//		//projectsPage.selectActivityName();
//		//projectsPage.selectactivityType();
//
//		projectsPage.selectActivityName();
//		projectsPage.deleteActivity();
		

	}}
