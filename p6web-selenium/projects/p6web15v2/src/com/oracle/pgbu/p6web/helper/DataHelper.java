package com.oracle.pgbu.p6web.helper;

import java.text.Collator;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.xml.bind.JAXBElement;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.namespace.QName;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.oracle.pgbu.common.enm.ActivityStatus;
import com.oracle.pgbu.common.enm.ActivityType;
import com.oracle.pgbu.common.enm.ProjectStatus;
import com.oracle.pgbu.common.enm.ProjectType;
import com.oracle.pgbu.common.enm.TimesheetStatus;
import com.oracle.pgbu.common.pagefactory.CustomPageFactory;
import com.oracle.pgbu.common.support.Utilities;
import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.oracle.pgbu.intgtest.helper.StringGen;
import com.oracle.pgbu.p6web.p6web;
import com.oracle.pgbu.p6web.testcases.BaseTestCase;
import com.primavera.ws.p6.activity.Activity;
import com.primavera.ws.p6.activitynote.ActivityNote;
import com.primavera.ws.p6.notebooktopic.NotebookTopic;
import com.primavera.ws.p6.project.Project;
import com.primavera.ws.p6.resource.Resource;
import com.primavera.ws.p6.resourceassignment.ResourceAssignment;
import com.primavera.ws.p6.user.User;
import com.primavera.ws.p6.wbs.WBS;

public class DataHelper extends BaseTestCase {
   
    public User tsUser;
    public Resource tsRsrc;
    public static Project project;
    public static WBS wbs1;

    public List<Activity> activityList = new ArrayList<Activity>();
    public List<Activity> activityList2 = new ArrayList<Activity>();
    public List<Activity> particularTypeActivities = new ArrayList<Activity>();
    public List<String> resourceNameList = new ArrayList<String>();
    public List<String> resourceIdList = new ArrayList<String>();
    Calendar cal = Calendar.getInstance();
    Calendar cal2 = Calendar.getInstance();
    public JAXBElement<XMLGregorianCalendar> actStart = wsUtils.getJAXBDate(cal.getTime(), "ActualStartDate");
    public JAXBElement<XMLGregorianCalendar> actFinish = wsUtils.getJAXBDate(cal.getTime(), "ActualFinishDate");
    public JAXBElement<XMLGregorianCalendar> remainingEarlyStart;
    public JAXBElement<XMLGregorianCalendar> remainingEarlyEnd;
    public JAXBElement<XMLGregorianCalendar> actualStart;
    public JAXBElement<XMLGregorianCalendar> actualFinish;
    private User subordinateUser;
    public Resource subordinateResource;
    public int timesheetPeriodID2;
    public int timesheetPeriodID3;
    public int timesheetPeriodID4;
    public static List<String> activitiesList = new ArrayList<>();
    public static List<String> activitiesList0 = new ArrayList<>();
    public static List<Activity> actList = new ArrayList<>();
    public TimesheetUtility TSUtil = new TimesheetUtility();
    public List<ResourceAssignment> rsrcAssignments = new ArrayList<>();
    public ApplicationProperties appProperties = p6web.getInstance();
    public List<NotebookTopic> notebooks = new ArrayList<>();
    public List<ActivityNote> activityNote = new ArrayList<>();
    Collator collator = Collator.getInstance();
    public String projectID;
    public Resource resource;
    public static Resource resource1;
    public static Resource resource2;
	private static List<Project>  projectList= new ArrayList<Project>();
	public static List<Activity> otherTypeOfActivities = new ArrayList<Activity>();
	public List<Activity> overdueActivities = new ArrayList<Activity>();

	
    //Creates Timesheet project
    public void createProject(ProjectStatus m_projectStatus) {
        project = dataSetup.projects.createProject("TestProject-" + utils.randomChars(6), m_projectStatus.toString());
    }

    public Project createProject(ProjectStatus projectStatus, ProjectType projectType) {
        projectID = "TestProject-" + utils.randomChars(6);
        project = dataSetup.projects.createProject(projectID, projectStatus.toString(), projectType.toString());
        return project;
    }

  //Creates Timesheet project
    public Project createProjectWbs(Project projectwbs, ProjectStatus m_projectStatus) throws InterruptedException {
    	return projectwbs = dataSetup.projects.createProject("TestProject-" + utils.randomChars(6), m_projectStatus.toString());
    }
    
    /**
     * Creates Timesheet project with Log Additional Time
     * @param m_projectStatus
     */
    public void createProjectWithLogAdditionalTime(ProjectStatus m_projectStatus) {
        project = dataSetup.projects.createProjectWithLogAdditionalTime("TestProject-" + utils.randomChars(6), m_projectStatus.toString());
    }
    
    /**
     * Creates Timesheet project with reviewer
     * @param m_projectStatus
     */
    public void createProjectWithStatusReviewer(ProjectStatus m_projectStatus) {
        project = dataSetup.projects.createProjectWithStatusReviewer("TestProject-" + utils.randomChars(6), m_projectStatus.toString());
    }
    
    /**
     * Creates Timesheet for a project with reviewer and different project Id and Name
     * @param m_projectStatus
     */
    public void createProjectWithStatusReviewerAndDiffProjIdName(ProjectStatus m_projectStatus) {
        project = dataSetup.projects.createProjectWithStatusReviewerAndDiffProjIdName("TestProject-" + utils.randomChars(6), m_projectStatus.toString());
    }


    public int createBaselineProject(int OriginalProjectObjectId, int TargetProjectObjectId) {
        return dataSetup.projects.createBaselineProject(OriginalProjectObjectId, TargetProjectObjectId);
    }
    //Creates WBS
    public WBS createWBS(Project projectwbs,String wbsCode, WBS wbs) {
    	return wbs= dataSetup.wbs.createWBS(projectwbs.getObjectId(), "wbs-"+ utils.randomChars(3), wbsCode);        
    }
  //deleteWBS
    public void deleteWBS(WBS wbs) {
    	dataSetup.wbs.deleteWBS(wbs.getObjectId());        
    }
    
   //Creates Inactive WBS
    public WBS createInactiveWBS(Project projectwbs,String wbsCode, WBS wbs) {
    	return wbs= dataSetup.wbs.createInactiveWBS(projectwbs.getObjectId(), "wbs-"+ utils.randomChars(3), wbsCode);        
    }
    //creates n number of activities with Not-Started status falling in current time period 
    public List<Activity> createActivity(int i) {
    	String name;
    	String id;
        for (int j = 0; j < i; j++) {
        	 name="TestAct" + utils.randomChars(10);
         	 id="TestAct" + utils.randomChars(10);
            activityList.add(dataSetup.activities.createActivity(project.getObjectId(), id, name));
            activitiesList.add(id+" - "+name);
        }
        return activityList;
    }
    
  //creates n number of activities with Not-Started status falling in current time period 
    public List<Activity> createStarredActivity(int i) {
    	String name;
    	String id;
        for (int j = 0; j < i; j++) {
        	name="TestAct" + utils.randomChars(10);
        	 id="TestAct" + utils.randomChars(10);
            activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), id, name, ActivityStatus.COMPLETED));
            activitiesList0.add(id+" - "+name);
        }
        return activityList2;
    }
    
    public void createActivity(ActivityType actType, Resource rsrc) {
        particularTypeActivities.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10),
                "TestAct" + utils.randomChars(10), actType.toString(), rsrc));
    }

    public void createActivity(ActivityType actType) {
        particularTypeActivities.add(dataSetup.activities.createActivityOfType(project.getObjectId(), "TestAct" + utils.randomChars(10),
                "TestAct" + utils.randomChars(10), actType.toString()));
    }

    public void createMilestoneActivity(ActivityType actType) {
        cal = Calendar.getInstance();
        cal.add(Calendar.DATE, 1);
        remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
        particularTypeActivities.add(dataSetup.activities.createActivityOfType(project.getObjectId(), "TestAct" + utils.randomChars(10),
                "TestAct" + utils.randomChars(10), actType.toString(), remainingEarlyStart));
    }

    //Creates 4 activities with not started status falling in different time periods
    public List<Activity> createActivities() {
        activityList2.clear();
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10)));
        cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek() + 6);
        cal.add(Calendar.DATE, 1);
        cal2.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek() + 6);
        cal2.add(Calendar.DATE, 7);
        remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
        remainingEarlyEnd = wsUtils.getJAXBDate(cal2.getTime(), "RemainingEarlyFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));

        cal.add(Calendar.DATE, 1);
        cal2.add(Calendar.DATE, 7);
        remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
        remainingEarlyEnd = wsUtils.getJAXBDate(cal2.getTime(), "RemainingEarlyFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));

        cal.add(Calendar.DATE, 7);
        cal2.add(Calendar.DATE, 7);
        remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
        remainingEarlyEnd = wsUtils.getJAXBDate(cal2.getTime(), "RemainingEarlyFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));
        return activityList2;
    }

    //Creates 4 activities with different status' NOT falling in current time periods
    public List<Activity> createActivitiesDiffStatus() {
        activityList2.clear();
        cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek() + 6);
        cal.add(Calendar.DATE, 1);
        cal2.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek() + 6);
        cal2.add(Calendar.DATE, 7);
        remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
        remainingEarlyEnd = wsUtils.getJAXBDate(cal2.getTime(), "RemainingEarlyFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));

        actualStart = wsUtils.getJAXBDate(cal.getTime(), "ActualStartDate");
        actualFinish = wsUtils.getJAXBDate(cal2.getTime(), "ActualFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                ActivityStatus.IN_PROGRESS, remainingEarlyStart, remainingEarlyEnd, actualStart, null));

        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                ActivityStatus.COMPLETED, null, null, actualStart, actualFinish));
        return activityList2;
    }

    //Creates 4 activities with different status' falling in current time periods
    public List<Activity> createActivitiesDiffStatusCurrentTimePeriod() {
        cal = Calendar.getInstance();
        cal2 = Calendar.getInstance();
        activityList2.clear();
        remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
        remainingEarlyEnd = wsUtils.getJAXBDate(cal2.getTime(), "RemainingEarlyFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));

        actualStart = wsUtils.getJAXBDate(cal.getTime(), "ActualStartDate");
        actualFinish = wsUtils.getJAXBDate(cal2.getTime(), "ActualFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                ActivityStatus.IN_PROGRESS, remainingEarlyStart, remainingEarlyEnd, actualStart, null));

        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                ActivityStatus.COMPLETED, null, null, actualStart, actualFinish));
        return activityList2;
    }

    //Creates 4 activities with different status' NOT falling in current time periods
    public List<Activity> createActivitiesDiffStatusOneOverdue() {
        activityList2.clear();
        cal.add(Calendar.DATE, -7);
        cal2.add(Calendar.DATE, -6);
        remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
        remainingEarlyEnd = wsUtils.getJAXBDate(cal2.getTime(), "RemainingEarlyFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));

        cal.add(Calendar.DATE, 7);
        cal2.add(Calendar.DATE, 13);
        remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
        remainingEarlyEnd = wsUtils.getJAXBDate(cal2.getTime(), "RemainingEarlyFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));

        actualStart = wsUtils.getJAXBDate(cal.getTime(), "ActualStartDate");
        actualFinish = wsUtils.getJAXBDate(cal2.getTime(), "ActualFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                ActivityStatus.IN_PROGRESS, remainingEarlyStart, remainingEarlyEnd, actualStart, null));

        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                ActivityStatus.COMPLETED, null, null, actualStart, actualFinish));
        return activityList2;
    }

    //Creates 4 activities with different status' and different reend date/actual finish date (for testing sorting order in UI)
    public void createActivityOther() {
        cal = Calendar.getInstance();
        cal2 = Calendar.getInstance();
        activityList2.clear();
        cal.add(Calendar.DATE, 1);
        cal2.add(Calendar.DATE, 10);
        remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
        remainingEarlyEnd = wsUtils.getJAXBDate(cal2.getTime(), "RemainingEarlyFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                ActivityStatus.IN_PROGRESS));
        cal.add(Calendar.DATE, 1);
        cal2.add(Calendar.DATE, 1);
        actualStart = wsUtils.getJAXBDate(cal.getTime(), "ActualStartDate");
        actualFinish = wsUtils.getJAXBDate(cal2.getTime(), "ActualFinishDate");
        //        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
        //                ActivityStatus.COMPLETED, null, null, actualStart, actualFinish));
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                ActivityStatus.COMPLETED, null, null, null, actualFinish));
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                ActivityStatus.COMPLETED));
    }

    //Creates activity of particular type
    public Activity createActivityWithType(String actType) {
        return dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10), actType);
    }

    public Resource createResource(String rsrcShortName, String rsrcName) {
        Resource tsRsrc = dataSetup.resources.createResource(rsrcShortName, rsrcName);
        resourceNameList.add(tsRsrc.getName());
        resourceIdList.add(tsRsrc.getId());
        return tsRsrc;
    }

    public void createResourceAssignment(List<Activity> activityList, Resource tsRsrc) {
        for (Activity act : activityList) {
            if (act != null)
                createResourceAssignment(act, tsRsrc);
        }
    }

    public void createResourceAssignment(Activity activity, Resource tsRsrc) {
        rsrcAssignments.add(dataSetup.resources.createResourceAssignment(activity.getObjectId(), tsRsrc.getObjectId()));
    }
    
    /**
     * createResource Assignment But Not As PrimaryResource
     * @param activity
     * @param tsRsrc
     */
    public void createResourceAssignmentNotAsPrimaryResource(Activity activity, Resource tsRsrc) {
        rsrcAssignments.add(dataSetup.resources.createResourceAssignmentNotAsPrimaryResource(activity.getObjectId(), tsRsrc.getObjectId()));
    }

    //Creates assignments with different status'
    public void createResourceOtherAssignment(List<Activity> activityList) {
        dataSetup.resources.createResourceAssignment(activityList.get(0).getObjectId(), resource.getObjectId());
        dataSetup.resources.createResourceAssignment(activityList.get(1).getObjectId(), resource.getObjectId());
        //In-progress assignment
        dataSetup.resources.createResourceAssignment(activityList.get(2).getObjectId(), resource.getObjectId(), actStart);
        //Completed assignment
        dataSetup.resources.createResourceAssignment(activityList.get(3).getObjectId(), resource.getObjectId(), actStart, actFinish);
    }

    public void createResourceUserAssignment(Resource resource, User user) {
        dataSetup.resources.createResourceUserAssignment(resource.getObjectId(), user.getObjectId());
    }

    public void createTimesheetData(User user) {
        createProject(ProjectStatus.ACTIVE);
        createActivity(4);
        resource = createResource(user.getName(), user.getName());
        createResourceUserAssignment(resource, user);
        createResourceAssignment(activityList, resource);
        //        resource.setUseTimesheets(true);
        dataSetup.resources.updateResource(resource);
        TSUtil.createCurrentTimesheetPeriod();
    }
    
    /**
     * create Timesheet Data With Status Reviewer
     * @param user
     */
    public void createTimesheetDataWithStatusReviewer(User user) {
        createProjectWithStatusReviewer(ProjectStatus.ACTIVE);
        createActivity(4);
        resource = createResource(user.getName(), user.getName());
        createResourceUserAssignment(resource, user);
        createResourceAssignment(activityList, resource);
        dataSetup.resources.updateResource(resource);
        TSUtil.createCurrentTimesheetPeriod();
    }
    
    /**
     * create Timesheet Data With Status Reviewer for a project having different project Id and Name
     * @param user
     */
    public void createTimesheetDataWithStatusReviewerForDiffProjIdName(User user) {
    	createProjectWithStatusReviewerAndDiffProjIdName(ProjectStatus.ACTIVE);
        createActivity(4);
        resource = createResource(user.getName(), user.getName());
        createResourceUserAssignment(resource, user);
        createResourceAssignment(activityList, resource);
        dataSetup.resources.updateResource(resource);
        TSUtil.createCurrentTimesheetPeriod();
    }
    
/*    public void createTimesheetDataMultipleAssignmentsInMultipleTimePeriods(User user) {
        createProject(ProjectStatus.ACTIVE);
        createActivity(4);
        resource = createResource(user.getName(), user.getName());
        createResourceUserAssignment(resource, user);
        createResourceAssignment(activityList, resource);
        //        resource.setUseTimesheets(true);
        dataSetup.resources.updateResource(resource);

        actList1.addAll(createActivitiesDiffStatus());
        actList2.addAll(createActivitiesDiffStatus());
        actList3.addAll(createActivitiesDiffStatus());
        actList4.addAll(createActivitiesDiffStatus());
        createResourceAssignment(actList1, resource);
        createResourceAssignment(actList2, resource);
        createResourceAssignment(actList3, resource);
        createResourceAssignment(actList4, resource);
        TSUtil.createCurrentTimesheetPeriod();
    }*/

    //Creates different timesheet periods and timesheet data with different assignments falling in different timesheet periods
    public void createTimesheetDataAssign() {
        Calendar cal = Calendar.getInstance();
        Calendar cal2 = Calendar.getInstance();

        tsUser = createUser();
        dataSetup.users.createUserLicense(tsUser.getObjectId());
        tsRsrc = createResource(tsUser.getName(), tsUser.getName());
        //        tsRsrc.setUseTimesheets(true);
        dataSetup.resources.updateResource(tsRsrc);
        createResourceUserAssignment(tsRsrc, tsUser);
        createProject(ProjectStatus.ACTIVE);
        createActivities();
        createResourceAssignment(activityList2, tsRsrc);

        cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek() + 6);
        cal.add(Calendar.DATE, 1);
        cal2.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek() + 6);
        cal2.add(Calendar.DATE, 7);
        timesheetPeriodID2 = createTimesheetPeriod(cal.getTime(), cal2.getTime());
        cal.add(Calendar.DATE, 1);
        cal2.add(Calendar.DATE, 7);
        timesheetPeriodID3 = createTimesheetPeriod(cal.getTime(), cal2.getTime());
        cal.add(Calendar.DATE, 7);
        cal2.add(Calendar.DATE, 7);
        timesheetPeriodID4 = createTimesheetPeriod(cal.getTime(), cal2.getTime());
    }

    public int createTimesheetPeriod(Date startDate, Date endDate) {
        return TSUtil.createTimesheetPeriod(startDate, endDate);
    }

    public void createNotebookTopic(Activity activity) {
        notebooks.add(dataSetup.notebooks.createNotebookTopic("TestNotebookTopic-" + utils.randomChars(6)));
        activityNote.add(dataSetup.activities.createActivityNote(activity, notebooks.get(notebooks.size() - 1), "TestNote" + utils.randomChars(6)));
    }

    public void noTimeperiodData(User user) {
        TSUtil.deleteCurrentTimePeriodData();
        createProject(ProjectStatus.ACTIVE);
        createActivity(4);
        resource = createResource(user.getName(), user.getName());
        createResourceUserAssignment(resource, user);
        createResourceAssignment(activityList, resource);
        //        resource.setUseTimesheets(true);
        dataSetup.resources.updateResource(resource);
    }

    public void createTimeSheetDataManagerSubordinate(int numOfSubordinates, User user) {
        createTimesheetData(user);
        for (int i = 0; i < numOfSubordinates; i++) {
            createSubordinatedata(user);
        }
    }

   /* public void setEditSubordinateTimesheet() {
        myTaskPage = CustomPageFactory.initElements(MyTasksPage.class);
        appSettingsPage = CustomPageFactory.initElements(ApplicationSettingsPage.class);
        myTaskPage.selectDynamicObject("link", "global_application").click();
        appSettingsPage.waitForReady();
        if (!appSettingsPage.editSubordinateTimesheet.isChecked()) {
            appSettingsPage.editSubordinateTimesheet.check();
            appSettingsPage.sleep(10);
            appSettingsPage.selectDynamicObject("button", "global_save").click();
            appSettingsPage.waitForSave();
        }
    }

    public void setReportingHoursByReportingPeriod(ReportingHours reportingHour) {
        myTaskPage = CustomPageFactory.initElements(MyTasksPage.class);
        appSettingsPage = CustomPageFactory.initElements(ApplicationSettingsPage.class);
        myTaskPage.selectDynamicObject("link", "global_application").click();
        appSettingsPage.waitForReady();
        if (reportingHour == ReportingHours.REPORTING_PERIOD) {
            if (!appSettingsPage.byReportingPeriod.isSelected()) {
                appSettingsPage.byReportingPeriod.select();
                appSettingsPage.sleep(10);
                appSettingsPage.selectDynamicObject("button", "global_save").click();
                appSettingsPage.waitForSave();
            }
        } else {
            if (!appSettingsPage.daily.isSelected()) {
                appSettingsPage.daily.select();
                appSettingsPage.sleep(10);
                appSettingsPage.selectDynamicObject("button", "global_save").click();
                appSettingsPage.waitForSave();
            }
        }
    }
*/
    public void createSubordinatedata(User user) {
        String m_subordinateUserName = "TestUser" + StringGen.generate(10);
        subordinateUser = dataSetup.users.createUser(m_subordinateUserName, m_password);
        dataSetup.users.createUserLicense(subordinateUser.getObjectId());
        subordinateResource = dataSetup.resources.createResource(m_subordinateUserName, m_subordinateUserName);
        dataSetup.resources.createResourceUserAssignment(subordinateResource.getObjectId(), subordinateUser.getObjectId());
        //        subordinateResource.setUseTimesheets(true);
        JAXBElement<Integer> jaxbElementObject = new JAXBElement(new QName("TimesheetApprovalManagerObjectId"), Integer.class, user.getObjectId());
        subordinateResource.setTimesheetApprovalManagerObjectId(jaxbElementObject);
        dataSetup.resources.updateResource(subordinateResource);
        createResourceAssignment(activityList, subordinateResource);
        resourceNameList.add(subordinateResource.getName());
        resourceIdList.add(subordinateResource.getId());
    }
    
    //Creates 3 activities with different status' falling in current time periods without 'In-Progress' task
    public List<Activity> createActivitiesDiffStatusWithOutInProgress() {
        activityList2.clear();
        cal = Calendar.getInstance();
        cal2 = Calendar.getInstance();
        
        remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
        remainingEarlyEnd = wsUtils.getJAXBDate(cal2.getTime(), "RemainingEarlyFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));

        actualStart = wsUtils.getJAXBDate(cal.getTime(), "ActualStartDate");
        actualFinish = wsUtils.getJAXBDate(cal2.getTime(), "ActualFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                ActivityStatus.COMPLETED, null, null, actualStart, actualFinish));
        return activityList2;
    }
    
    //Creates 4 activities with different status' with long timeperiod
    public List<Activity> createActivitiesWithLongTimePeriod() {
        activityList2.clear();
        cal = Calendar.getInstance();
        cal2 = Calendar.getInstance();
        cal.add(Calendar.DATE, 24);
        cal2.add(Calendar.DATE, 36);
        
        remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
        remainingEarlyEnd = wsUtils.getJAXBDate(cal2.getTime(), "RemainingEarlyFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                remainingEarlyStart, remainingEarlyEnd));

        actualStart = wsUtils.getJAXBDate(cal.getTime(), "ActualStartDate");
        actualFinish = wsUtils.getJAXBDate(cal2.getTime(), "ActualFinishDate");
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                ActivityStatus.IN_PROGRESS, remainingEarlyStart, remainingEarlyEnd, actualStart, null));
        
        activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                ActivityStatus.COMPLETED, null, null, actualStart, actualFinish));
        return activityList2;
    }

    public void createRelationship(Activity predecessor, Activity successor, String relationshipType) {
        dataSetup.activities.createSuccessor(predecessor.getObjectId(), successor.getObjectId());
        predecessor.setType(relationshipType);
    }

    public String getTimesheetPeriodStartDate(int tsPeriodID) {
        return TSUtil.getTimesheetPeriodStartDate(tsPeriodID);
    }

    public String getTimesheetPeriodEndDate(int tsPeriodID) {
        return TSUtil.getTimesheetPeriodEndDate(tsPeriodID);
    }

    public String getTimesheetStatus(int tsPeriodID, Resource rsrc) {
        String status = "";
        if (TSUtil.getTimesheetStatus(tsPeriodID, rsrc.getObjectId()) == null)
            status = Utilities.getInstance().getString("timesheet_status_NotStarted");
        else if (TSUtil.getTimesheetStatus(tsPeriodID, rsrc.getObjectId()) == TimesheetStatus.ACTIVE.toString())
            status = Utilities.getInstance().getString("timesheet_status_ACTIVE");
        else if (TSUtil.getTimesheetStatus(tsPeriodID, rsrc.getObjectId()) == TimesheetStatus.SUBMITTED.toString())
            status = Utilities.getInstance().getString("timesheet_status_SUBMITTED");
        else if (TSUtil.getTimesheetStatus(tsPeriodID, rsrc.getObjectId()) == TimesheetStatus.APPROVED.toString())
            status = Utilities.getInstance().getString("timesheet_status_APPROVED"); 
        return status;
    }

    public void approveTimesheet(int tsPeriodID, int rsrcID, WebDriver m_driver) throws InterruptedException {
        TSUtil.approveTimesheet(tsPeriodID, rsrcID);
        Thread.sleep(1000);
        m_driver.get(appProperties.getUrl());
    }

    public void deleteTimesheetData() {
        TSUtil.deleteTimesheetAssignments(TSUtil.timesheetPeriodID);
        TSUtil.deleteTimesheet(TSUtil.timesheetPeriodID);
        TSUtil.deleteTimesheetPeriod(TSUtil.timesheetPeriodID);
    }


    public boolean isSortedAscendingByAttribute(List<String> elementsList) {
        boolean sorted = true;
        for (int i = 1; i < elementsList.size(); i++) {
        	collator.setStrength(Collator.PRIMARY);

        	if (collator.compare(elementsList.get(i - 1),elementsList.get(i))>0)
        		sorted = false;
        }
        return sorted;
    }

    public boolean isSortedAscendingByAttributeCase(List<String> elementsList) {
        boolean sorted = true;
        for (int i = 1; i < elementsList.size(); i++) {
            if (elementsList.get(i - 1).compareTo(elementsList.get(i)) > 0)
                sorted = false;
        }
        return sorted;
    }

    public boolean isSortedDescendingByAttribute(List<String> elementsList) {
        boolean sorted = true;
        for (int i = 1; i < elementsList.size(); i++) {
            collator.setStrength(Collator.PRIMARY);
            
            if (collator.compare(elementsList.get(i - 1),elementsList.get(i)) < 0)
                sorted = false;
        }
        return sorted;
    }
        

    //Creates project list
    public void createProjectlist(ProjectStatus m_projectStatus) throws InterruptedException {
    	getProjectList().add(dataSetup.projects.createProject("TestProject-" + utils.randomChars(6), m_projectStatus.toString()));
    }

    /**
     * Method to create particular types of activities in a specific project
     * @param actType
     */
    public void createActivityInAProject(Project projectassignment, ActivityType actType) {
    	otherTypeOfActivities.add(dataSetup.activities.createActivityOfType(projectassignment.getObjectId(), "TestAct" + utils.randomChars(10),
    			"TestAct" + utils.randomChars(10), actType.toString()));
    }
    
    /**
     * Method to create normal activities in a specific project
     * @param actType
     */
    public void createNormalActivityInAProject(Project projectassignment, ActivityType actType) {
    	otherTypeOfActivities.add(dataSetup.activities.createActivityOfType(projectassignment.getObjectId(), "TestAct" + utils.randomChars(10),
    			"TestAct" + utils.randomChars(10), actType.toString()));
    }
    
    public Resource createResourcelist(String rsrcShortName, String rsrcName) {
    	Resource tsRsrc = dataSetup.resources.createResource(rsrcShortName, rsrcName);
    	resourceNameList.add(tsRsrc.getName());
    	resourceIdList.add(tsRsrc.getId());
    	return tsRsrc;
    }
    
    
    /**
     * Get the project object
     * @return project
     */
    public Project getProject()
    {
    	return project;
    }
    
/**
 * Creates 4 activities with different status' falling in current time periods
 * @param project
 * @return list of activities
 */
public List<Activity> createActivitiesDiffStatusCurrentTimePeriod(Project project) {
	cal = Calendar.getInstance();
	cal2 = Calendar.getInstance();
	activityList2.clear();
	remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
	remainingEarlyEnd = wsUtils.getJAXBDate(cal2.getTime(), "RemainingEarlyFinishDate");
	activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
			remainingEarlyStart, remainingEarlyEnd));
	activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
			remainingEarlyStart, remainingEarlyEnd));

	actualStart = wsUtils.getJAXBDate(cal.getTime(), "ActualStartDate");
	actualFinish = wsUtils.getJAXBDate(cal2.getTime(), "ActualFinishDate");
	activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
			ActivityStatus.IN_PROGRESS, remainingEarlyStart, remainingEarlyEnd, actualStart, null));

	activityList2.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
			ActivityStatus.COMPLETED, null, null, actualStart, actualFinish));
	return activityList2;
}
	
    /**
     * Returns Locale based on the locale set in properties
     * @return
     */
    
    public Locale returnLocale(){
    	/**
    		Locale.CANADA,Locale.CANADA_FRENCH,Locale.CHINA,Locale.CHINESE,Locale.ENGLISH,Locale.FRANCE,Locale.FRENCH,Locale.GERMAN,Locale.GERMANY,
    		Locale.ITALIAN,Locale.ITALY,Locale.JAPAN,Locale.JAPANESE,Locale.KOREA,Locale.KOREAN,Locale.PRC,Locale.ROOT,Locale.SIMPLIFIED_CHINESE,
    		Locale.TAIWAN,Locale.TRADITIONAL_CHINESE,Locale.UK,Locale.US};
    	*/
    	 switch (Utilities.appProperties.getLocale()) {
			case "zh_CN":
				return Locale.CHINESE;
		    case "zh_TW":
				return Locale.TAIWAN;
		    default:
		    	return Locale.ENGLISH;
		 	}
    }
    
   
   /**
    * This method generates and returns a string having data to compare with the time period in the application
    * @param period : Current, Past, Future
    *  
    * @return: Returns a string having formated date to compare with the time period in the application
    */

       public String createTimeperiodData(String period) {

              // set the date
              Calendar cal = Calendar.getInstance();
              SimpleDateFormat df = new SimpleDateFormat("MMM-dd-yyyy");

              // cal.set(2011, 10 - 1, 12);
              int year = cal.get(Calendar.YEAR);
              switch (period.toLowerCase()) {
              case "past":
                     cal.set(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH),cal.get(Calendar.DAY_OF_MONTH) - 7);
                     break;
              case "future":
                     cal.set(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH),cal.get(Calendar.DAY_OF_MONTH) + 7);
                     break;
              default:
                     cal.set(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH),cal.get(Calendar.DAY_OF_MONTH));
              }

              // "calculate" the start date of the week
              Calendar first = (Calendar) cal.clone();
              first.add(Calendar.DAY_OF_WEEK,first.getFirstDayOfWeek() - first.get(Calendar.DAY_OF_WEEK));

              // and add six days to the end date
              Calendar last = (Calendar) first.clone();
              last.add(Calendar.DAY_OF_YEAR, 6);

              df = new SimpleDateFormat("MMM-dd-yyyy");
              switch (Utilities.appProperties.getLocale().toLowerCase()) {
              case "en":
              case "current":
                     return df.format(first.getTime()) + " - "+ df.format(last.getTime());
              default:
                     // Start Date
                     String YYYY = df.getDateInstance(df.LONG, returnLocale()).format(first.getTime()).substring(0, 4);
                     String MMM = df.getDateInstance(df.LONG, returnLocale()).format(first.getTime()).substring(5, 8);
                     String DD = df.getDateInstance(df.LONG, returnLocale()).format(first.getTime()).substring(8, 10);
                     if(first.get(Calendar.DAY_OF_MONTH)<10)
                     {
                      DD = DD.substring(0, 1);
                      DD="0"+DD;
                     }
                     // End date
                     String YYYY1 = df.getDateInstance(df.LONG, returnLocale()).format(last.getTime()).substring(0, 4);
                     String MMM1 = df.getDateInstance(df.LONG, returnLocale()).format(last.getTime()).substring(5, 8);
                     String DD1 = df.getDateInstance(df.LONG, returnLocale()).format(last.getTime()).substring(8, 10);
                     if(last.get(Calendar.DAY_OF_MONTH)<10)
                     {
                      DD1 = DD1.substring(0, 1);
                      DD1="0"+DD1;
                     }
                     return MMM + "-" + DD + "-" + YYYY + " - " + MMM1 + "-" + DD1 + "-"+ YYYY1;
              }
       }

       /**
        * Click a link using the link text.
        * @param linkText
        * @param m_driver Webdriver instance
        */
       public void clickLink(String linkText, WebDriver m_driver){
    	   m_driver.findElement(By.linkText(linkText)).click();
       }
       
       /**
        *  Returns the start date of the time period of the week number passed
        * @param week:  week ahed of the current week
        */
       public String getTimesheetStartDate(int week){
    	// set the date
           Calendar cal = Calendar.getInstance();
           SimpleDateFormat df = new SimpleDateFormat("MMM-dd-yyyy");

           // cal.set(2011, 10 - 1, 12);
           int year = cal.get(Calendar.YEAR);
           cal.set(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH),cal.get(Calendar.DAY_OF_MONTH) + (7*week));

           // "calculate" the start date of the week
           Calendar first = (Calendar) cal.clone();
           first.add(Calendar.DAY_OF_WEEK,first.getFirstDayOfWeek() - first.get(Calendar.DAY_OF_WEEK));

           // and add six days to the end date
           Calendar last = (Calendar) first.clone();
           last.add(Calendar.DAY_OF_YEAR, 6);

           df = new SimpleDateFormat("MMM-dd-yyyy");
           switch (Utilities.appProperties.getLocale().toLowerCase()) {
           case "en":
           case "current":
                  return df.format(first.getTime());
           default:
                  // Start Date
                  String YYYY = df.getDateInstance(df.LONG, returnLocale()).format(first.getTime()).substring(0, 4);
                  String MMM = df.getDateInstance(df.LONG, returnLocale()).format(first.getTime()).substring(5, 8);
                  String DD = df.getDateInstance(df.LONG, returnLocale()).format(first.getTime()).substring(8, 10);
                  if(first.get(Calendar.DAY_OF_MONTH)<10)
                  {
                   DD = DD.substring(0, 1);
                   DD="0"+DD;
                  }
                  // End date
                  String YYYY1 = df.getDateInstance(df.LONG, returnLocale()).format(last.getTime()).substring(0, 4);
                  String MMM1 = df.getDateInstance(df.LONG, returnLocale()).format(last.getTime()).substring(5, 8);
                  String DD1 = df.getDateInstance(df.LONG, returnLocale()).format(last.getTime()).substring(8, 10);
                  if(last.get(Calendar.DAY_OF_MONTH)<10)
                  {
                   DD1 = DD1.substring(0, 1);
                   DD1="0"+DD1;
                  }
                  return MMM + "-" + DD + "-" + YYYY;
           }
       }
       
       /**
        * 
        * @param check : True if the box has to be checked and false to uncheck
        * @param checkBoxElement : Checkbox to be clicked
        */
       public boolean clickCheckBox(boolean check,WebElement checkBoxElement){
    	   if(!check && checkBoxElement.isSelected()){
    		   checkBoxElement.click();
    		   return true;
    	   }
    	   if(check && !checkBoxElement.isSelected()){
    		   checkBoxElement.click();
    		   return true;
    	   }
    	   return false;
       }
       
      public List<Project> getProjectList() {
   		return projectList;
   		}

   	public void setProjectList(List<Project> projectList) {
   		DataHelper.projectList = projectList;
   	}
	
    //Creates overdue activities
    public List<Activity> createOverdueActivities(int i) {
    	overdueActivities.clear();
        cal.add(Calendar.DATE, -7);
        cal2.add(Calendar.DATE, -6);
        remainingEarlyStart = wsUtils.getJAXBDate(cal.getTime(), "RemainingEarlyStartDate");
        remainingEarlyEnd = wsUtils.getJAXBDate(cal2.getTime(), "RemainingEarlyFinishDate");
        
        for(int j=0;j<i;j++){
        	overdueActivities.add(dataSetup.activities.createActivity(project.getObjectId(), "TestAct" + utils.randomChars(10), "TestAct" + utils.randomChars(10),
                    remainingEarlyStart, remainingEarlyEnd));
        }
        return overdueActivities;
    }

}