package com.oracle.pgbu.p6web.helper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.oracle.pgbu.common.enm.ProjectStatus;
import com.oracle.pgbu.common.enm.ProjectType;
import com.oracle.pgbu.common.support.DatabaseUtils;
import com.oracle.pgbu.common.support.Utilities;

public class TimesheetUtility {
    private final DatabaseUtils dbUtils = DatabaseUtils.getInstance();
    private final Utilities utils = Utilities.getInstance();
    SimpleDateFormat sf = new SimpleDateFormat("dd-MMM-yy");
    SimpleDateFormat sfUI;
    Calendar cal = Calendar.getInstance();
    String startDate = "";
    String endDate = "";
    int maxTSId = 0;
    public int timesheetPeriodID;
    public List<String> nonworkCodes = new ArrayList<String>();
    public List<String> nonworkTypes = new ArrayList<String>();
    ResultSet result;

    
    public TimesheetUtility()
    {
    	switch (Utilities.appProperties.getLocale()) {
		case "de":
			sfUI = new SimpleDateFormat("MMM.-dd-yyyy");
			break;
		case "ko":
			sf = new SimpleDateFormat("yy-MM-dd");
			sfUI = new SimpleDateFormat("MMMM-dd-yyyy");
			break;
		case "ja":
			sf = new SimpleDateFormat("yy-MMM-dd");
			sfUI = new SimpleDateFormat("MMMM-dd-yyyy");
			break;	
		case "es":
			sf=new SimpleDateFormat("MM-dd-yy");
			sfUI = new SimpleDateFormat("MMM.-dd-yyyy");
			break;
		case "zh_CN":
			sf = new SimpleDateFormat("dd-MM-yy");
			sfUI = new SimpleDateFormat("M"+(char)26376+"-dd-yyyy");
			break;
		case "zh_TW":
			sf = new SimpleDateFormat("dd-MM-yy");
			sfUI = new SimpleDateFormat("M"+(char)26376+"-dd-yyyy");
			break;
		default:
			sfUI = new SimpleDateFormat("MMM-dd-yyyy");
			break;
		}
     
    }
    
    public boolean createCurrentTimesheetPeriod() {
    	
    	switch (Utilities.appProperties.getLocale()) {
		case "zh_CN":
			result = dbUtils.executeSQL("select TS_ID from TSDATES where START_DATE <= to_date('" + sf.format(cal.getTime()) + "','DD-MM-RR')" +  " and END_DATE >= to_date('" + sf.format(cal.getTime()) + "','DD-MM-RR')");
			break;
		case "zh_TW":
			result = dbUtils.executeSQL("select TS_ID from TSDATES where START_DATE <= to_date('" + sf.format(cal.getTime()) + "','DD-MM-RR')" +  " and END_DATE >= to_date('" + sf.format(cal.getTime()) + "','DD-MM-RR')");
			break;
		default:
			result = dbUtils.executeSQL("select TS_ID from TSDATES where START_DATE <= '" + sf.format(cal.getTime()) + "' and END_DATE >= '" + sf.format(cal.getTime())
	                + "'");
			break;
    	}

        try {
            if (!result.next()) {
                cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek());
                startDate = sf.format(cal.getTime());
                cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek() + 6);
                endDate = sf.format(cal.getTime());

                result = dbUtils.executeSQL("select max(ts_id) from tsdates");

                try {

                    while (result.next()) {
                        maxTSId = result.getInt(1) + 1;
                    }
                } catch (SQLException e) {
                    utils.log.severe("Unable to get new TimesheetPeriod ID. Reason:\n" + e.getMessage());
                    return false;
                }
                
                String sql;
                switch (Utilities.appProperties.getLocale()) {
                case "zh_CN":
                	sql = "Insert into TSDATES (TS_ID,START_DATE,END_DATE) values (" + maxTSId + ",to_date('" + startDate + "','DD-MM-RR'),to_date('" + endDate
                    + "','DD-MM-RR'))";
                	break;
                case "zh_TW":
                	sql = "Insert into TSDATES (TS_ID,START_DATE,END_DATE) values (" + maxTSId + ",to_date('" + startDate + "','DD-MM-RR'),to_date('" + endDate
                    + "','DD-MM-RR'))";
                	break;
				case "ko":
                case "ja":
					sql = "Insert into TSDATES (TS_ID,START_DATE,END_DATE) values (" + maxTSId + ",'" + startDate + "','" + endDate+ "')";
					break;
				default:
					if(Utilities.appProperties.getDatabaseName().equalsIgnoreCase("oracle")){
						sql = "Insert into TSDATES (TS_ID,START_DATE,END_DATE) values (" + maxTSId + ",to_date('" + startDate + "','DD-MON-RR'),to_date('" + endDate
			                    + "','DD-MON-RR'))";
					}
					else{
						sql = "Insert into TSDATES (TS_ID,START_DATE,END_DATE) values (" + maxTSId + ",'" + startDate + "','" + endDate + "')";
					}
					break;
				}
                dbUtils.executeSQL(sql);

            } else {
                switch (Utilities.appProperties.getLocale()) {
        		case "zh_CN":
        			result = dbUtils.executeSQL("select TS_ID from TSDATES where START_DATE <= to_date('" + sf.format(cal.getTime()) + "','DD-MM-RR')" +  " and END_DATE >= to_date('" + sf.format(cal.getTime()) + "','DD-MM-RR')");
        			break;
        		case "zh_TW":
        			result = dbUtils.executeSQL("select TS_ID from TSDATES where START_DATE <= to_date('" + sf.format(cal.getTime()) + "','DD-MM-RR')" +  " and END_DATE >= to_date('" + sf.format(cal.getTime()) + "','DD-MM-RR')");
        			break;
        		default:
        			result = dbUtils.executeSQL("select max(TS_ID) from TSDATES where START_DATE <= '" + sf.format(cal.getTime()) + "' and END_DATE >= '"
                            + sf.format(cal.getTime()) + "'");
        			break;
            	}
                try {

                    while (result.next()) {
                        maxTSId = result.getInt(1);
                    }
                } catch (SQLException e) {
                    utils.log.severe("Unable to get new TimesheetPeriod ID. Reason:\n" + e.getMessage());
                    return false;
                }
            }
        } catch (SQLException e) {
            utils.log.severe("Unable to get new TimesheetPeriod ID. Reason:\n" + e.getMessage());
            return false;
        }
        timesheetPeriodID = maxTSId;
        return true;
    }

    public int createTimesheetPeriod(Date startDate2, Date endDate2) {
        startDate = sf.format(startDate2);
        endDate = sf.format(endDate2);

        result = dbUtils.executeSQL("select max(ts_id) from tsdates");

        try {

            while (result.next()) {
                maxTSId = result.getInt(1) + 1;
            }
            String sql;
            switch (Utilities.appProperties.getLocale()) {
            case "zh_CN":
            	sql = "Insert into TSDATES (TS_ID,START_DATE,END_DATE) values (" + maxTSId + ",to_date('" + startDate + "','DD-MM-RR'),to_date('" + endDate
                + "','DD-MM-RR'))";
            	break;
            case "zh_TW":
            	sql = "Insert into TSDATES (TS_ID,START_DATE,END_DATE) values (" + maxTSId + ",to_date('" + startDate + "','DD-MM-RR'),to_date('" + endDate
                + "','DD-MM-RR'))";
            	break;
			case "ko":
            case "ja":
				sql = "Insert into TSDATES (TS_ID,START_DATE,END_DATE) values (" + maxTSId + ",'" + startDate + "','" + endDate + "')";
				break;
			default:
				if(Utilities.appProperties.getDatabaseName().equalsIgnoreCase("oracle")){
					sql = "Insert into TSDATES (TS_ID,START_DATE,END_DATE) values (" + maxTSId + ",to_date('" + startDate + "','DD-MON-RR'),to_date('" + endDate
			                + "','DD-MON-RR'))";
				}
				else{
					sql = "Insert into TSDATES (TS_ID,START_DATE,END_DATE) values (" + maxTSId + ",'" + startDate + "','" + endDate + "')";
				}
				break;
			}
            dbUtils.executeSQL(sql);

        } catch (SQLException e) {
            utils.log.severe("Unable to get new TimesheetPeriod ID. Reason:\n" + e.getMessage());
            return 0;
        }
        return maxTSId;
    }

    public String getTimesheetPeriodStartDate(int tsPeriodid) {
        String sql = "select START_DATE from TSDATES where TS_ID = " + tsPeriodid;
        result = dbUtils.executeSQL(sql);
        Date startDate = null;
        try {
            while (result.next()) {
                startDate = result.getDate(1);
            }
        } catch (SQLException e) {
            utils.log.severe("Unable to get start date of TimesheetPeriod. Reason:\n" + e.getMessage());
        }
        if(Utilities.appProperties.getLocale().equalsIgnoreCase("it"))
        {
        	return sfUI.format(startDate).substring(0, 1).toUpperCase() + sfUI.format(startDate).substring(1);
        }
        else{
        return sfUI.format(startDate);
        }
    }

    public String getTimesheetPeriodEndDate(int tsPeriodid) {
        String sql = "select END_DATE from TSDATES where TS_ID = " + tsPeriodid;
        result = dbUtils.executeSQL(sql);
        Date endDate = null;
        try {
            while (result.next()) {
                endDate = result.getDate(1);
            }
        } catch (SQLException e) {
            utils.log.severe("Unable to get end date of TimesheetPeriod. Reason:\n" + e.getMessage());
        }
        
        if(Utilities.appProperties.getLocale().equalsIgnoreCase("it"))
        {
        	return sfUI.format(endDate).substring(0, 1).toUpperCase() + sfUI.format(endDate).substring(1);
        }
        else{
        return sfUI.format(endDate);
        }
    }

    public String getTimesheetStatus(int tsPeriodid, int rsrcID) {
        String sql = "select STATUS_CODE from TIMESHT where TS_ID = " + tsPeriodid + " and RSRC_ID = " + rsrcID;
        result = dbUtils.executeSQL(sql);
        String timesheetStatus = null;
        try {
            while (result.next()) {
                timesheetStatus = result.getString(1);
            }
        } catch (SQLException e) {
            utils.log.severe("Unable to get Timesheet status. Reason:\n" + e.getMessage());
        }
        return timesheetStatus;
    }

    public List<String> getNonworkCodes() {
        String sql1 = "select NONWORK_CODE from NONWORK";
        String sql2 = "select NONWORK_TYPE from NONWORK";
        result = dbUtils.executeSQL(sql1);
        try {
            while (result.next()) {
                nonworkCodes.add(result.getString(1));
            }
        } catch (SQLException e) {
            utils.log.severe("Unable to get nonwork codes. Reason:\n" + e.getMessage());
        }

        result = dbUtils.executeSQL(sql2);
        try {
            while (result.next()) {
                nonworkTypes.add(result.getString(1));
            }
        } catch (SQLException e) {
            utils.log.severe("Unable to get nonwork types. Reason:\n" + e.getMessage());
        }
        return nonworkCodes;
    }

 /*   public ProjectType getProjectType(String projectName) {
        String sql = "select status_code from projwbs where wbs_name like '" + projectName + "'";
        result = dbUtils.executeSQL(sql);
        String projectType = null;
        try {
            while (result.next()) {
                projectType = result.getString(1);
            }
        } catch (SQLException e) {
            utils.log.severe("Unable to get Timesheet status. Reason:\n" + e.getMessage());
        }
        sql = "select orig_proj_id from project where proj_short_name like '" + projectName + "'";
        result = dbUtils.executeSQL(sql);
        String orig_proj_id = null;
        try {
            while (result.next()) {
                orig_proj_id = result.getString(1);
            }
        } catch (SQLException e) {
            utils.log.severe("Unable to get Timesheet status. Reason:\n" + e.getMessage());
        }
        switch (projectType) {
        case "WS_Open":
            if (orig_proj_id == null)
                return ProjectType.PROJECT;
            else
                return ProjectType.BASELINE;
        case "WS_Whatif":
            return ProjectType.PROJECT;
        case "WS_Closed":
            return ProjectType.PROJECT;
        case "WS_Template":
            return ProjectType.TEMPLATE;
        case "WS_Planned":
            return ProjectType.SCENARIO;
        case "WS_Requested":
            return ProjectType.PROJECT;
        }
        return null;
    }*/

    public boolean insertDiscussion(int activityID, int userID, String comment) {
        int maxID = 0;
        result = dbUtils.executeSQL("select max(discussion_id) from discussion");
        try {

            while (result.next()) {
                maxID = result.getInt(1);
            }
        } catch (SQLException e) {
            utils.log.severe("Unable to get maximum discussion id. Reason:\n" + e.getMessage());
            return false;
        }

        String sql = "insert into discussion (discussion_id, task_id, discussion_value, user_id) values (" + ++maxID + ", " + activityID + ", '" + comment + "', "
                + userID + ")";
        dbUtils.executeSQL(sql);
        return true;
    }

   /* public boolean updateProjectStatus(String projname, ProjectStatus status) {
        String status_code;
        switch (status) {
        case ACTIVE:
            status_code = "WS_Open";
        case WHAT_IF:
            status_code = "WS_Whatif";
        case INACTIVE:
            status_code = "WS_Closed";
        case TEMPLATE:
            status_code = "WS_Template";
        case PLANNED:
            status_code = "WS_Planned";
        }

        String sql = "update projwbs set status_code = '" + status + "' where wbs_name like '" + projname + "'";
        dbUtils.executeSQL(sql);
        return true;
    }*/

    public boolean rejectTimesheet(int TSid) {
        String sql = "update timesht set status_code = 'TS_Reject' where ts_id = " + TSid;
        dbUtils.executeSQL(sql);
        sql = "update rsrchour set status_code = 'TS_Reject' where ts_id = " + TSid;
        dbUtils.executeSQL(sql);
        return true;
    }

    public boolean updateProjectSettingRsrcSelfAdd(String projname, String value) {
        String sql = "update PROJECT set RSRC_SELF_ADD_FLAG = '" + value + "' where proj_id = (select PROJ_ID from PROJWBS where WBS_SHORT_NAME = '" + projname
                + "')";
        dbUtils.executeSQL(sql);
        return true;
    }

    public boolean updateProjectSettingRsrcCanMarkAssignCompleted(String projname, String value) {
        String sql = "update PROJECT set ALLOW_COMPLETE_FLAG = '" + value + "' where proj_id = (select PROJ_ID from PROJWBS where WBS_SHORT_NAME = '" + projname
                + "')";
        dbUtils.executeSQL(sql);
        return true;
    }

    public boolean updateProjectSettingRsrcMultiAssign(String projname, String value) {
        String sql = "update PROJECT set RSRC_MULTI_ASSIGN_FLAG = '" + value + "' where proj_id = (select PROJ_ID from PROJWBS where WBS_SHORT_NAME = '" + projname
                + "')";
        dbUtils.executeSQL(sql);
        return true;
    }

    public boolean deleteDiscussion(int userID) {
        String sql = "Delete from DISCUSSION where USER_ID = " + userID;
        dbUtils.executeSQL(sql);
        return true;
    }

    public boolean deleteTimesheetPeriod(int tsPeriodid) {
        String sql = "Delete from TSDATES where TS_ID >= " + tsPeriodid;
        dbUtils.executeSQL(sql);
        return true;
    }

    public boolean deleteTimesheet(int tsPeriodid) {
        String sql = "Delete from TIMESHT where TS_ID >= " + tsPeriodid;
        dbUtils.executeSQL(sql);
        return true;
    }

    public boolean deleteCurrentTimePeriodData() {
        cal = Calendar.getInstance();
        String sql = "delete from rsrchour where ts_id in (select ts_id from tsdates where start_date < '" + sf.format(cal.getTime()) + "' and end_date > '"
                + sf.format(cal.getTime()) + "')";
        dbUtils.executeSQL(sql);
        sql = "delete from timesht where ts_id in (select ts_id from tsdates where start_date < '" + sf.format(cal.getTime()) + "' and end_date > '"
                + sf.format(cal.getTime()) + "')";
        dbUtils.executeSQL(sql);
        sql = "delete from tsdates where start_date < '" + sf.format(cal.getTime()) + "' and end_date > '" + sf.format(cal.getTime()) + "'";
        dbUtils.executeSQL(sql);
        return true;
    }

    public boolean deleteTimesheetAssignments(int tsPeriodid) {
        String sql = "Delete from RSRCHOUR where TS_ID >= " + tsPeriodid;
        dbUtils.executeSQL(sql);
        return true;
    }

    public boolean setApprovalLevel(int approvalLevel) {
        String sql = "Update PREFER set ts_approval_level = " + approvalLevel;
        dbUtils.executeSQL(sql);
        return true;
    }

    public boolean approveTimesheet(int tsPeriodID, int rsrcID) {
        String sql = "Update TIMESHT set STATUS_CODE='TS_Approv' where TS_ID = " + tsPeriodID;
        dbUtils.executeSQL(sql);
        sql = "Update RSRCHOUR set STATUS_CODE = 'TS_Approv' where RSRC_ID = " + rsrcID + " and task_ts_flag = 'N' and TS_ID = " + tsPeriodID;
        dbUtils.executeSQL(sql);
        return true;
    }

    /**
     * Update project setting to resource assignment alone
     * @param projName
     * @param value
     * @return boolean
     */
    public boolean updateProjectSettingToResourceAssignmentAlone(String projName, String value) {
        String sql = "update PROJSET set SETTING_VALUE = '"+value+"' where proj_id = (select PROJ_ID from PROJWBS where WBS_SHORT_NAME = '" + projName
                + "') and SETTING_NAME='TeamMemberAssignmentType'";
        dbUtils.executeSQL(sql);
        return true;
    }
}

