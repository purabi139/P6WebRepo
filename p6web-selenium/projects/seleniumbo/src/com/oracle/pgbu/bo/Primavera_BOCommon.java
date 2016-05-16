package com.oracle.pgbu.bo;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;
import java.util.regex.Pattern;

import com.primavera.silktest.SilkTestAdapter;

public class Primavera_BOCommon {
	
	static String EMPTY ="";
	static ResourceBundle rb = ResourceBundle.getBundle("com.oracle.pgbu.bo.BO");
	static String sAdminUser=rb.getString("ADMIN_USER");
	static String sAdminPwd=rb.getString("ADMIN_PWD");
	static String sDBName=rb.getString("DB_NAME");
	static String sBootStrapLocation=System.getProperty("user.dir")+"\\config\\";
	
	/*
     * Method Name : Primavera_BOCommon
•	 * Author: Pavan G
     * Arguments: 
     *      sAdminUser   : String, mandatory
     *      sAdminPwd    : String, mandatory
     *      sDBName      : String, mandatory
     *      sBootStrapLocation : String, mandatory
     * Purpose: It's constructor to initialize all variables
     */
	  @SuppressWarnings("static-access")
	  Primavera_BOCommon(String sAdminUser,String sAdminPwd,String sDBName,String sBootStrapLocation) throws FileNotFoundException, IOException {
		this.sDBName=sDBName;
		this.sAdminUser=sAdminUser;
		this.sAdminPwd=sAdminPwd;
		System.setProperty("primavera.bootstrap.home", sBootStrapLocation);
		Primavera_loadBOSession(sAdminUser,sAdminPwd,sDBName);
	}
	
	/*
     * Method Name : Primavera_loadBOSession
•	 * Author: Pavan G
     * Arguments: 
     *      sUser     : String, mandatory
     *      sPassword : String, mandatory
     *      sDBID     : String, mandatory
     * Purpose: It's constructor to initialize the bo session
     */
	void Primavera_loadBOSession(String sUser,String sPassword,String sDBID)
	{
		Object[] newValues = new Object[4];
		newValues[0]="MyPrimaveraAdapterFunction";
		newValues[1]="setProperties";
		newValues[2]="session.myPrimavera.userName="+sUser+"|session.myPrimavera.password="+sPassword+"|session.myPrimavera.dbId="+sDBID;
		
		try{
			new SilkTestAdapter(newValues);
		}catch(Exception ex){
			System.out.println(ex.getLocalizedMessage());
		}
	}
	
	public static Primavera_BOCommon getInstance() throws FileNotFoundException, IOException
	{
		return new Primavera_BOCommon(sAdminUser, sAdminPwd, sDBName, sBootStrapLocation);
	}
	
	static List<String> BO_LoadBusinessObject(String sObject,List <String>lsFields,String sFilter,String sFileName) throws PrimaveraException {
		List<String> laRetArgs = null;
		List<String> lsfields= new ArrayList<String>(); 
		int nLoopCounter;
		String sFields = lsFields.get(0);
		try
		{
			for(nLoopCounter=1;nLoopCounter<lsFields.size();nLoopCounter++)
				sFields = sFields + "|" + lsFields.get(nLoopCounter);
		
			if (sFileName!=EMPTY && sFilter ==EMPTY)
				throw new PrimaveraException("Filter should be specified when File name is specified");
		
			if(sFilter==EMPTY)
			{
				lsfields.add(sFields);
				laRetArgs = Primavera_BOHelper.loadBOs(sObject,lsfields);		
			}else if(sFileName==EMPTY && sFilter!=EMPTY)
			{
				lsfields.add(sFields);
				lsfields.add(sFilter.toString());
				laRetArgs = Primavera_BOHelper.loadBOs(sObject,lsfields);
			}else{
				lsfields.add(sFields);
				lsfields.add(sFilter.toString());
				lsfields.add(sFileName.toString());
				laRetArgs = Primavera_BOHelper.loadBOs(sObject,lsfields);
			}	
		}catch(Exception ex){
			if(laRetArgs.size() != 5)
				throw new PrimaveraException("Unable to Load BO, See Server Console for Details.");
		}
		
		return laRetArgs;
	}
	
	Integer BO_CreateResource(String sResourceName,String sResourceType,String sParentResource, String sEmail) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException
	{	
		String sResourceEmail;
		List<String> laRetArgs;
		String sActionName = "create-Resource";
		String sFields;
		String sFieldValues;
		String ParentResourceId;
		List<String> params = new ArrayList<String>();
		if(sEmail==null) {
			sResourceEmail=sResourceName+"@primavera.com";
		}else if(sEmail.length()>0)
			sResourceEmail=sEmail;
		else{
			sResourceEmail=sResourceName+"@primavera.com";
			System.out.println("Your Email address is empty string, using default "+sResourceEmail+".");
		}
		
		if(sResourceType==EMPTY)
			sResourceType = "Labor";	
		
		switch (sResourceType.toUpperCase()){
			case "LABOR":
				sResourceType = "RT_Labor";
				break;
			case "NONLABOR":
				sResourceType = "RT_Equip";
				break;
			case "MATERIAL":
				sResourceType = "RT_Mat";
				break;
			default:
				throw new PrimaveraException("Resource Type can  be Labor or NonLabor or Material");
		}
		
		if(sParentResource==EMPTY)
		{
			try{
				params.add("ResourceId");
				List<String> boParentResId= BO_LoadBusinessObject("ResourceSecurity", params, "Lower(UserName) = 'admin'","");
				if(!(Boolean.parseBoolean(boParentResId.get(0))))
				{
					params.set(0, sActionName);
					sFields = "ResourceShortName|ResourceName|ResourceType|EmailAddress";
					params.add(sFields);
					sFieldValues = sResourceName+ "|"+ sResourceName +"|"+ sResourceType+"|"+sResourceEmail;
					params.add(sFieldValues);
				}
				else
				{
					ParentResourceId = EMPTY; // Need to work on it.
					sFields = "ResourceShortName|ResourceName|ResourceType|ParentResourceId|EmailAddress";
					sFieldValues = sResourceName+ "|"+ sResourceName +"|"+ sResourceType+"|"+ParentResourceId+"|"+sResourceEmail;
					params.add(sFields);
					params.add(sFieldValues);

				}
				laRetArgs = Primavera_BOHelper.handleBO(params);
				
				if(Boolean.parseBoolean(laRetArgs.get(0)))
					return Integer.parseInt(laRetArgs.get(1));
				
						
			}catch(Exception ex){
				throw new PrimaveraException(ex.getMessage());
			}
		}else{
			sActionName = "load-Resource";
		    sFields = "ResourceId";
		    String sFilter = "ResourceName like '"+sParentResource+"'";
		    params.add(sActionName);
		    params.add(sFields);
		    params.add(sFilter);
		    laRetArgs = Primavera_BOHelper.handleBO(params);
		    if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
		    {
		    	params.clear();
		    	ParentResourceId = laRetArgs.get(1);
		    	sFields = "ResourceShortName|ResourceName|ResourceType|ParentResourceId|EmailAddress";
		    	sFieldValues = sResourceName+"|"+sResourceName+"|"+sResourceType+"|"+ParentResourceId+"|"+sResourceEmail;
		    	sActionName = "create-Resource";
		    	params.add(sActionName);
			    params.add(sFields);
			    params.add(sFieldValues);
		    }
		    else
		    	throw new PrimaveraException("Failed to find Parent Resource "+sParentResource);
		    
		    laRetArgs = Primavera_BOHelper.handleBO(params);
			
			if(Boolean.parseBoolean(laRetArgs.get(0)))
				return Integer.parseInt(laRetArgs.get(1).replace("]", "").trim());//Updated by Sravanthi
			else
				return -1;
		}
		return Integer.parseInt(laRetArgs.get(1).replace("]", "").trim()); //Updated by Sravanthi
}
	
	Integer BO_CreateRole(String sRoleName, String sParentRole) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException
	{
		List<String> laRetArgs;
		int sPRoleId;
		String sFileds;
		String sFieldValues;
		List<String> lsFieldValues = new ArrayList<String>();
		String sActionName = "create-Roles";
		lsFieldValues.add(sActionName);
		
		if(sParentRole==EMPTY) {
			sFileds = "RoleShortName|RoleName";
			sFieldValues = sRoleName+"|"+ sRoleName;
		    lsFieldValues.add(sFileds);
		    lsFieldValues.add(sFieldValues);
		}
		else
		{
		 sPRoleId = BO_GetObjectId("Roles", "RoleId", "RoleName = '"+sParentRole+"'",false);
		 sFileds = "RoleShortName|RoleName|ParentRoleId";
		 sFieldValues = sRoleName+"|"+ sRoleName+"|"+sPRoleId;
		 lsFieldValues.add(sFileds);
		 lsFieldValues.add(sFieldValues); 
		}
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
		
		if (Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
			return Integer.parseInt(laRetArgs.get(1).replace("]", "").trim());
		else
			return -1;
	}
	
	Integer BO_GetObjectId(String sObjectName,String sIdFieldName,String sFilter,Boolean bThrowError) throws PrimaveraException{	
		List<String> params= new ArrayList<String>();
		params.add(sIdFieldName);
		params.add(sFilter);
		
		if(!bThrowError)
			bThrowError = true;

		List<String> laRetArgs = Primavera_BOHelper.loadBOs(sObjectName,params);
		
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
			return Integer.parseInt(laRetArgs.get(1).trim());
		else
			if(bThrowError)
				throw new PrimaveraException("Failed to find "+sObjectName+" based on Filter criteria "+sFilter);
		return -1;	
	}	
	
	List<String> createBOs(String sBOName, List<String> laArgs, boolean bIsBatchMode) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException{
		List<String> laNewArgs=new ArrayList<String>();
		List<String> laRetArgs;
		
		if (bIsBatchMode){
			laNewArgs.add("MyPrimaveraBOFunction");
			laNewArgs.add("createBatch-"+sBOName);
		}
		else{
			laNewArgs.add("MyPrimaveraBOFunction");
			laNewArgs.add("create-"+sBOName);
		}
		
		for(String l: laArgs){
			laNewArgs.add(l);
		}
		laRetArgs = Primavera_BOHelper.asyncInvokeJavaServer(laNewArgs);
		return laRetArgs;
	}
	
	String getFirstEPS(){
		List<String> laRetArgs;
		String sWhere = "ProjectProjectFlag = 'N' AND ProjectFlag = 'Y' order by WbsId";
		List<String> laNewArgs= new ArrayList<String>();
		laNewArgs.add("");
		laNewArgs.add(sWhere);
		laRetArgs = Primavera_BOHelper.loadBOs("Projwbs",laNewArgs);
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
		{
			String wbsIDs = laRetArgs.get(1).split(Pattern.quote("|"))[0]; 
			return wbsIDs.toString().trim();
		}
		return EMPTY;
	}
	
	String GetDBFieldName(String sLabel) throws PrimaveraException {
		switch (sLabel.toLowerCase()) {
			case "annual discount rate":
				return "AnnualDiscountRate";
			case "net present value":
				return	"NetPresentValue";
			case "payback period":
				return	"PaybackPeriod";
			case "return on investment":
				return	"ReturnOnInvestment";
			case "current budget":
				return	"CurrentBudget";
			case "current variance":
				return	"CurrentVariance";
			case "distributed current budget":
				return	"DistributedCurrentBudget";
			case "independent etc labor units":
				 return	"IndependentETCLaborUnits";
			 case "independent etc total cost":
				 return	"IndependentETCTotalCost";
			 case "original budget":
				 return	"OriginalBudget";
			 case "proposed budget":
				 return	"ProposedBudget";
			 case "total benefit plan":
				 return	"TotalBenefitPlan";
			 case "total benefit plan tally":
				 return	"TotalBenefitPlanTally";
			 case "total funding":
				 return	"TotalFunding";
			 case "total spending plan":
				 return	"TotalSpendingPlan";
			 case "total spending plan tally":
				 return	"TotalSpendingPlanTally";
			 case "unallocated budget":
				 return	"UnallocatedBudget";
			 case "undistributed current variance":
				 return	"UndistributedCurrentVariance";
			 case "actual expense cost":
				 return	"ActualExpenseCost";
			 case "actual labor cost":
				 return	"ActualLaborCost";
			 case "actual material cost":
				 return	"ActualMaterialCost";
			 case "actual nonlabor cost":
				 return	"ActualNonLaborCost";
			 case "actual this period labor cost":
				 return	"ActualThisPeriodLaborCost";
			 case "actual this period material cost":
				 return	"ActualThisPeriodMaterialCost";
			 case "actual this period nonlabor cost":
				 return	"ActualThisPeriodNonLaborCost";
			 case "actual total cost":
				 return	"ActualTotalCost";
			 case "at completion expense cost":
				 return	"AtCompletionExpenseCost";
			 case "at completion labor cost":
				 return	"AtCompletionLaborCost";
			 case "at completion material cost":
				 return	"AtCompletionMaterialCost";
			 case "at completion nonlabor cost":
				 return	"AtCompletionNonlaborCost";
			 case "at completion total cost":
				 return	"EstimatedTotalCostAC";
			 case "bl expense cost":
				 return	"BaseExpenseCost";
			 case "bl labor cost":
				 return	"BaseLaborCost";
			 case "bl material cost":
				 return	"BaseMaterialCost";
			 case "bl nonlabor cost":
				 return	"BaseNonLaborCost";
			 case "bl total cost":
				 return	"BaselineCost";
			 case "remaining expense cost":
				 return	"RemainingExpenseCost";
			 case "remaining labor cost":
				 return	"RemainingLaborCost";
			 case "remaining material cost":
				 return	"RemainingMaterialCost";
			 case "remaining nonlabor cost":
				 return	"RemainingNonLaborCost";
			 case "remaining total cost":
				 return	"RemainingCost";
			 case "variance - expense cost":
				 return	"ExpenseCostVariance";
			 case "variance - labor cost":
				 return	"LaborCostVariance";
			 case "variance - material cost":
				 return	"MaterialCostVariance";
			 case "variance - nonlabor cost":
				 return	"NonLaborCostVariance";
			 case "variance - total cost ":
				 return	"TotalCostVariance";
			 case "actual finish":
				 return	"ActualFinish";
			 case "actual start":
				 return	"ActualStart";
			 case "anticipated finish":
				 return	"AnticipatedFinish";
			 case "anticipated start":
				 return	"AnticipatedStart";
			 case "bl finish":
				 return	"BLFinish";
			 case "bl start":
				 return	"BLStart";
			 case "data date":
				 return	"ProjectDataDate";
			 case "finish":
				 return	"FinishDate";
			 case "forecast finish date":
				 return	"ForecastFinishDate";
			 case "forecast start date":
				 return	"ForecastStartDate";
			 case "must finish by":
				 return	"ProjectPlannedFinish";
			 case "planned start":
				 return	"ProjectPlannedStart";
			 case "project forecast start":
				 return	"ProjectForecastStart";
			 case "scheduled finish":
				 return	"ProjectScheduledFinish";
			 case "start":
				 return	"StartDate";
			 case "actual duration":
				 return	"ActualDuration";
			 case "at completion duration":
				 return	"AtCompletionDuration";
			 case "bl duration":
				 return	"BLDuration";
			 case "remaining duration":
				 return	"RemainingDuration";
			 case "total float":
				 return	"TotalFloat";
			 case "variance - duration":
				 return	"DurationVariance";
			 case "variance - finish date":
				 return	"FinishDateVariance";
			 case "variance - start date":
				 return	"StartDateVariance";
			 case "accounting variance":
				 return	"AccountingVarianceByCost";
			 case "accounting variance - labor units":
				 return	"AccountingVarianceByLaborUnits";
			 case "actual cost":
				 return	"ActualCostACWP";
			 case "budget at completion":
				 return	"BudgetAtCompletion";
			 case "budget at completion - labor units":
				 return	"BudgetAtCompletionByLaborUnits";
			 case "cost performance index":
				 return	"CostPerformanceIndex";
			 case "cost performance index - labor units":
				 return	"CostPerformanceIndexLaborUnits";
			 case "cost variance":
				 return	"CostVariance";
			 case "cost variance - labor units":
				 return	"CostVarianceLaborUnits";
			 case "cost variance index":
				 return	"CostVarianceIndex";
			 case "cost variance index - labor units":
				 return	"CostVarianceIndexByLaborUnits";
			 case "earned value cost":
				 return	"EarnedValueCostBCWP";
			 case "earned value labor units":
				 return	"EarnedValueLaborUnits";
			 case "estimate at completion - labor units":
				 return	"EstimateAtCompletionLaborUnits";
			 case "estimate at completion cost":
				 return	"EstimateAtCompletion";
			 case "estimate to complete":
				 return	"EstimateToComplete";
			 case "estimate to complete labor units":
				 return	"EstimateToCompleteLaborUnits";
			 case "planned value cost":
				 return	"PlannedValueCostBCWS";
			 case "planned value labor units":
				 return	"PlannedValueLaborUnits";
			 case "schedule performance index":
				 return	"SchedulePerformanceIndex";
			 case "schedule performance index - labor units":
				 return	"SchedPerfIndexLaborUnits";
			 case "schedule variance":
				 return	"ScheduleVariance";
			 case "schedule variance - labor units":
				 return	"ScheduleVarianceLaborUnits";
			 case "schedule variance index":
				 return	"ScheduleVarianceIndex";
			 case "schedule variance index - labor units":
				 return	"SVIByLaborUnits";
			 case "summarized data date":
				 return "SummarizedDataDate";
			 case "to complete performance index":
				 return	"ToCompletePerformanceIndex";
			 case "variance at completion":
				 return	"ForecastAtCompletionCV";
			 case "variance at completion - labor units":
				 return	"VACLaborUnits";
			 case "project":
				 return	"ProjectId";
			 case "projectid":
				 return "ProjectShortName";
			 case "project id":
				 return "ProjectShortName";
			 case "parent eps":
				 return "ParentWbsId";
			 case "project leveling priority":
				 return	"ProjectPriority";
			 case "project owner":
				 return	"ResourceId";
			 case "project score":
				 return	"ProjectScore";
			 case "project status":
				 return	"StatusCode";
			 case "responsible manager":
				 return	"ObsId";
			 case "risk level":
				 return	"ProjectRiskLevel";
			 case "strategic priority":
				 return	"ProjectStrategicPriority";
			 case "actual completed activities":
				 return	"ActualCompletedActCount";
			 case "actual in-progress activities":
				 return	"ActualInProgressActCount";
			 case "actual not-started activities":
				 return	"ActualNotStartedActCount";
			 case "bl completed activities":
				 return	"BaselineCompletedActCount";
			 case "bl in-progress activities":
				 return	"BaselineInProgressActCount";
			 case "bl not-started activities":
				 return	"BaselineNotStartedActCount";
			 case "total activities":
				 return	"ActivityCount";
			 case "cost % complete":
				 return	"CostPercentComplete";
			 case "cost % of planned":
				 return	"CostPercentOfBudget";
				case "duration % of planned":
					 return	"DurationPercentOfPlanned";
				 case "expense cost % complete":
					 return	"ExpenseCostPercentComplete";
				 case "labor cost % complete":
					 return	"LaborCostPercentComplete";
				 case "labor units % complete":
					 return	"LaborUnitsPercentComplete";
				 case "material cost % complete":
					 return	"MaterialCostPercentComplete";
				 case "nonlabor cost % complete":
					 return	"NonlaborCostPercentComplete";
				 case "nonlabor units % complete":
					 return	"NonLaborUnitsPercentComplete";
				 case "performance % complete":
					 return	"PerformancePercentComplete";
				 case "schedule % complete":
					 return	"SchedulePercentComplete";
				 case "units % complete":
					 return	"UnitsPercentComplete";
				 case "actual labor units":
					 return	"ActualLaborUnits";
				 case "actual nonlabor units":
					 return	"ActualNonlaborUnits";
				 case "actual this period labor units":
					 return	"ActualThisPeriodLaborUnits";
				 case "actual this period nonlabor Units":
					 return	"ActualThisPeriodNonLaborUnits";
				 case "at completion labor units":
					 return	"AtCompletionLaborUnits";
				 case "at completion nonlabor units":
					 return	"AtCompletionNonlaborUnits";
				 case "bl labor units":
					 return	"BLLaborUnits";
				 case "bl nonlabor units":
					 return	"BLBudgetedNonlaborUnits";
				 case "remaining labor units":
					 return	"RemainingLaborUnits";
				 case "remaining nonlabor units":
					 return	"RemainingNonlaborUnits";
				 case "variance - labor units":
					 return	"LaborUnitsVariance";
				 case "variance - nonlabor units":
					 return	"NonlaborUnitsVariance";
				 case "project website url":
					 return "ProjectWebsiteURL";
				 case "activities":
					 return "ActivitiesView";
				default:
					if(sLabel.contains("projectcodeid:"))
						return sLabel;
					else if(sLabel.contains("projectcode_"))
						return sLabel;
					else if (sLabel.contains("udf:"))
						return sLabel;
					else
						throw new PrimaveraException("Database Value for '"+sLabel+"' not found");
		}
	}
	
	@SuppressWarnings("static-access")
	Integer BO_CreateProject(ProjectDetails tProjectDetails) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{

		List<String> laRetArgs = null;
		String sEps, sFields, sFieldValues1;
		String sAutoProjectName = "";

		if(tProjectDetails.ProjectId==null || tProjectDetails.ProjectId==EMPTY)
			tProjectDetails.ProjectId = sAutoProjectName + new SimpleDateFormat("HH:mm:ss").format(new Date());
		if(tProjectDetails.ProjectName==null || tProjectDetails.ProjectName==EMPTY)
			tProjectDetails.ProjectName = sAutoProjectName + new SimpleDateFormat("HH:mm:ss").format(new Date());
		if(tProjectDetails.Location==null || tProjectDetails.Location==EMPTY)
			sEps =getFirstEPS();
		else{
			laRetArgs = Primavera_BOHelper.loadEPS("ProjectWbsId","Name ='"+tProjectDetails.Location+"'");
			sEps = laRetArgs.get(1);
		}
		tProjectDetails.ProjectId = tProjectDetails.ProjectName;
		String sActionName = "create-Projwbs";
		sFields = "ProjwbsType|ParentWbsId|ProjectShortName|Name";
		sFieldValues1 = "Project|"+sEps+"|"+tProjectDetails.ProjectId+"|"+ tProjectDetails.ProjectName;
		
		if(tProjectDetails.IsTemplate!=null && tProjectDetails.IsTemplate!=false)
		{	
			sFields+= "|StatusCode";
			sFieldValues1 += "|WS_Template";
		}
		if(tProjectDetails.StartDate!=null && tProjectDetails.StartDate!=EMPTY){
			sFields = sFields+"|ProjectPlannedStart";
			sFieldValues1 = sFieldValues1+"|{tProjectDetails.StartDate}";
		}
		
		if(tProjectDetails.ResponsibleManager!=null && tProjectDetails.ResponsibleManager!=EMPTY){
			String sObsId = EMPTY+ BO_GetObjectId("Obs","ObsId","ObsName = '"+tProjectDetails.ResponsibleManager+"'",false);
			sFields = sFields+"|ObsId";
			sFieldValues1 = sFieldValues1+"|"+sObsId;
		}
		
		if(tProjectDetails.ProjectOwner!=null && tProjectDetails.ProjectOwner!=EMPTY){
			String sResId = EMPTY+BO_GetObjectId("Resource", "ResourceId", "ResourceName = '"+tProjectDetails.ProjectOwner+"'",false);
			sFields += "|ResourceId";
			sFieldValues1 += "|"+sResId;
		}
		
		List<String> params=  new ArrayList<String>();
		params.add(sActionName);
		params.add(sFields);
		params.add(sFieldValues1);
		laRetArgs = Primavera_BOHelper.handleBO(params);
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
		{
			tProjectDetails.ObjectId = laRetArgs.get(1).replace("]", "").trim();
			System.out.println(tProjectDetails.ObjectId);
			return Integer.parseInt(tProjectDetails.ObjectId);
		}
		else
			throw new PrimaveraException("Failed to get project details");
	}

	//Pavan
	
	Integer BO_CreateResourceCode(String sResourceCodeName, String sResourceCodeTypeName, String sParentCodeName) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		String sActionName,sFields = null,sFieldValues = null,sResourceCodeId,sFilter;
		Integer sResourceCodeTypeId;
		List<String> laRetArgs;
		sFilter = "ResourceCodeType = '"+sResourceCodeTypeName+"'";
		sActionName = "create-ResourceCode";
		List<String> lsFieldValues = new ArrayList<String>();
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sFieldValues);
				
		sResourceCodeTypeId = BO_GetObjectId("ResourceCodeType", "ResourceCodeTypeId", sFilter,false);
		if (sParentCodeName!=null)
		{
			sFilter = "ResourceCodeTypeId = '"+sResourceCodeTypeId+"' AND ResourceCodeName = '"+sParentCodeName+"'";
			//sResourceCodeId = Primavera_BOHelper.BO_GetObjectId("ResourceCode", "ResourceCodeId", sFilter,false);
		}
		if (sParentCodeName==null)
		{
			sFields = "ResourceCodeName|ResourceCodeShortName|ResourceCodeTypeId";
			sFieldValues = sResourceCodeName+"|"+sResourceCodeName+"|"+sResourceCodeTypeId;
		}
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
		if (Boolean.parseBoolean(laRetArgs.get(0)))
			return (Integer.parseInt(laRetArgs.get(1)));
		else
			throw new PrimaveraException(laRetArgs.get(1));
	}

	Integer BO_CreateUser(String sUserName,String sGlobalProfile,String sResAccessFlag,String sNaviOverrideFlag) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{     
		List<String> laRetArgs;
		
		String sActionName = "create-User";
		String sFields = "UserName|EmailAddress";
		String sFieldValues = "{sUserName}|{sUserName}@primavera.com";
		List<String> lsFieldValues = new ArrayList<String>();
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sFieldValues);
		int sProfId;

		if (sGlobalProfile!=null)
		{
			sFields += "|ProfileId";
			sProfId = BO_GetObjectId("Profile", "ProfileId", "ProfileName = '"+sGlobalProfile+"'",false);
			sFieldValues += "|"+sProfId+"";
		}
		if (sResAccessFlag!=null)
		{
			sFields = sFields + "|AllResourceAccessFlag";
			sFieldValues = sFieldValues + "|"+sResAccessFlag+"";
		}
		if (sNaviOverrideFlag!=null)
		{
			sFields = sFields + "|OverrideFlag";
			sFieldValues = sFieldValues + "|"+sNaviOverrideFlag+"";
		}
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
		if(Boolean.parseBoolean(laRetArgs.get(0)))
			return (Integer.parseInt(laRetArgs.get(1)));
		else
			throw new PrimaveraException(laRetArgs.get(1));
			
	
	}

	void PrintOutBoInfo(BOInfo bo){
		//ResOpenList(bo.Type+" ["+bo.ObjectId+"]");
		int i;
		for(i=1;i<=bo.FieldCount-1;i++)
			System.out.println(bo.FieldNames.get(i)+" = "+bo.FieldValues.get(i));
		//ResCloseList();
			
	}
		
	
	 String BO_GetProjectId(String sProjectName) throws PrimaveraException{
			//get the project's wbs id and project id
			List<String> lsFields = new ArrayList<String>();
			lsFields.add("WbsId");
			lsFields.add("ProjectId");
			List<String> bo = BO_LoadBusinessObject("Projwbs", lsFields, "Name = '"+sProjectName+"'",EMPTY);
			for(Object item :bo){
				if(item.toString().contains("ProjectId ="))
					return item.toString().replace("ProjectId =", "").replace("]", "").trim();
			}
			return null;
		}


	String BO_GetProjectWBSId(String sProjectName) throws PrimaveraException{
		//get the project's wbs id and project id
				List<String> lsFields = new ArrayList<String>();
				lsFields.add("WbsId");
				lsFields.add("ProjectId");
				List<String> bo = BO_LoadBusinessObject("Projwbs", lsFields, "Name = '"+sProjectName+"'","");
				
				for(Object item :bo){
					if(item.toString().contains("WbsId ="))
						return item.toString().replace("WbsId =", "").replace("]", "").trim();
				}
				return null;
				
	}
	 
	/* * Method Name : BO_CreateWBS
	   * Author: Sravanthi
	   * Arguments: 
	   * 	sParentWBSName     : String, mandatory
	   * 	sWBSName	       :List of String, mandatory
	   * Purpose: It's a method which creates WBS
	*/
 	Integer BO_CreateWBS(String sParentWBSName, List<String> sWBSName) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List<String> laRetArgs=new ArrayList<String>();
		String sFilter = "Name ='"+sParentWBSName+"'";
		String sWBSParentId =BO_GetObjectId("Projwbs", "WbsId", sFilter,false).toString();
		String sActionName= "create-Projwbs";
		String sFields = "ProjwbsType|ParentWbsId|ShortName|Name";
		String sFieldValues;
		List<String> lsFieldValues = new ArrayList<String>();
		
		for( String sWBS : sWBSName){
			sFieldValues = "WBS|" +sWBSParentId+ "|" +sWBS+ "|" +sWBS;
			lsFieldValues.clear();
			lsFieldValues.add(sActionName);
			lsFieldValues.add(sFields);
			lsFieldValues.add(sFieldValues);
			laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
			if(!Boolean.parseBoolean(laRetArgs.get(0).replace("[", "").trim()))
				throw new PrimaveraException(laRetArgs.get(1));
		}
		return (Integer.parseInt(laRetArgs.get(1).replace("]", "").trim()));
	}
 	
    /* * Method Name : BO_CreateEPS
 	   * Author: Sravanthi
 	   * Arguments: 
 	   * 	sEPSName            : List of String, mandatory
 	   *	sParentEPSName	    :String, mandatory
 	   * Purpose: It's a method which creates EPS
    */
	Integer BO_CreateEPS(List<String> sEPSName,String sParentEPSName) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List<String> laRetArgs = new ArrayList<String>();
		String sEPSParentId;
		String sActionName = "create-Projwbs";
		String sFieldValues;
		String sFields = "ProjwbsType|ParentWbsId|ShortName|Name";
		List<String> lsFieldValues = new ArrayList<String>();
		Integer i;
		
		if(sParentEPSName== EMPTY)
			sEPSParentId = getFirstEPS();
		else{
			String sFilter = "Name = '"+sParentEPSName+"'";
			sEPSParentId = BO_GetObjectId("Projwbs", "WbsId", sFilter,false).toString();
		}
		
		for(i=0;i<sEPSName.size();i++){
			String  sEPS = sEPSName.get(i);
			sFieldValues = "EPS|" +sEPSParentId+"|"+sEPS+"|"+sEPS;
			lsFieldValues.clear();
			lsFieldValues.add(sActionName);
			lsFieldValues.add(sFields);
			lsFieldValues.add(sFieldValues);
			laRetArgs =Primavera_BOHelper.handleBO(lsFieldValues);
			if(!Boolean.parseBoolean(laRetArgs.get(0).replace("[", "").trim()))
				throw new PrimaveraException(laRetArgs.get(1));
		}
		return (Integer.parseInt(laRetArgs.get(1).replace("]", "").trim()));
	}

    /* * Method Name : BO_CreateNotebookTopic
       * Author: Sravanthi
       * Arguments: 
       * 	sNotebookTopic      : String, mandatory
       * 	lsScope			 	: List of String, mandatory
       * Purpose: It's a method which creates Notebooktopics of EPS,Projects,WBS,Activities scope 
    */
	Integer BO_CreateNotebookTopic(String sNotebookTopic, List<String> lsScope) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		String sActionName = "Create-NotebookTopic";
		String sFields;
		String sFieldValues;
		sFields = "NotebookTopic";
		sFieldValues=""+ sNotebookTopic;
		List<String> params = new ArrayList<String>();
		List<String> laRetArgs  = new ArrayList<String>();
		
		if (lsScope== null || lsScope.size() == 0){
			sFields= sFields + "|AvailableForProject|AvailableForActivity|AvailableForWbs|AvailableForEps";
			sFieldValues = sFieldValues + "|true|true|true|true";
		}
		for(String sElement : lsScope){
			switch(sElement.toUpperCase()){
				case "PROJECT":
					sFields = sFields+"|AvailableForProject";
					sFieldValues = sFieldValues +"|true";
					break;
				case "WBS" :
					sFields = sFields+"|AvailableForWbs";
					sFieldValues = sFieldValues +"|true";
					break;
				case "EPS" :
					sFields = sFields+"|AvailableForEps";
					sFieldValues = sFieldValues +"|true";
					break;
				case "ACTIVITY" :
					sFields = sFields+"|AvailableForActivity";
					sFieldValues = sFieldValues +"|true";
					break;
				default :
					throw new PrimaveraException(sElement+"is not valid for Notebook Topic");
			}
		}
		params.add(sActionName);
		params.add(sFields);
		params.add(sFieldValues);
		laRetArgs = Primavera_BOHelper.handleBO(params);
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
			return (Integer.parseInt(laRetArgs.get(1).replace("]", "").trim()));
		else
			throw new PrimaveraException(laRetArgs.get(1));
	}

	/* * Method Name : BO_GetEPSName
       * Author: Sravanthi
       * Arguments: 
       * 	sEPSId   : String, mandatory
       * Purpose: It's a method which return the EPS Name 
     */
	String BO_GetEPSName(String sEPSId) throws PrimaveraException{
		List<String> params = new ArrayList<String>();
		params.add("Name");
		List<String> boInfo =  BO_LoadBusinessObject("Projwbs",params, "WbsId= '"+sEPSId+ "'",EMPTY);
		return boInfo.get(5).replace("Name = ", "").trim();		
	}
	
	/* * Method Name : BO_CreateWBSHierarchy
       * Author: Sravanthi
       * Arguments: 
       *	 sParentWBSName   : String, mandatory
       *	 sWBSName         : List of String, mandatory
       * Purpose: It's a method which creates WBS hierarchy for a project or WBS
    */
	Integer BO_CreateWBSHierarchy(String sParentWBSName,List<String> sWBSName) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List<String> laRetArgs =new ArrayList<String>();
		String sFilter = "Name = '" + sParentWBSName + "'" ;
		String sWBSParentId = BO_GetObjectId("Projwbs", "WbsId", sFilter,false).toString();
		String sActionName = "create-Projwbs";
		String sFields = "ProjwbsType|ParentWbsId|ShortName|Name";
		String sFieldValues;
		List<String> lsFieldValues = new ArrayList<String>();
		
		for(String sWBS : sWBSName){		
			sFieldValues = "WBS|"+  sWBSParentId + "|" + sWBS +"|" +sWBS;
			lsFieldValues.clear();
			lsFieldValues.add(sActionName);
			lsFieldValues.add(sFields);
			lsFieldValues.add(sFieldValues);
			laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
			if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "").trim()))
				sWBSParentId =laRetArgs.get(1).replace("]", "").trim();
			else
				throw new PrimaveraException(laRetArgs.get(1));
		}
		return (Integer.parseInt(laRetArgs.get(1).replace("]", "").trim()));
	} 
	
	/* * Method Name : BO_AssignResourceCode
	   * Author: Sravanthi
	   * Arguments: 
	   * 	sResourceName   		: String, mandatory
	   * 	sResourceCodeType       : String, mandatory
       * 	sResourceCode	    	:  String, mandatory
	   * Purpose: It's a method which assigns Resource code to a resource
	*/
	Integer BO_AssignResourceCode(String sResourceName,String sResourceCodeType,String sResourceCode  ) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{ 
		List<String>  laRetArgs;
		//get resource id
		String  sResourceId = BO_GetObjectId("Resource","ResourceId","ResourceName = '" +sResourceName+"'",false).toString();
		//get resource code type id
		String  sFilter = "ResourceCodeType = '"+ sResourceCodeType+ "'";
		String sResourceCodeTypeId = BO_GetObjectId("ResourceCodeType", "ResourceCodeTypeId", sFilter,false).toString();
		//get resource code id
		sFilter = "ResourceCodeTypeId = '"+sResourceCodeTypeId+"' AND  ResourceCodeName = '" +sResourceCode+"'";
		String sResourceCodeId = BO_GetObjectId("ResourceCode", "ResourceCodeId", sFilter,false).toString();
		String  sActionName =  "create-ResourceResourceCode";
		String sFields = "ResourceId|ResourceCodeId|ResourceCodeTypeId";
		String sFieldValues1 = sResourceId+"|"+sResourceCodeId+"|"+sResourceCodeTypeId;
		//assign resource code to the resource
		List<String> lsFieldValues = new ArrayList<String>();
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sFieldValues1);
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
		
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "").trim())) 
			return (Integer.parseInt(laRetArgs.get(1).replace("]", "").replace("(", "").trim()));
		else
			 throw new PrimaveraException(laRetArgs.get(1));
	}
	
	/* * Method Name : BO_AssignResourceRole
	   * Author: Sravanthi
	   * Arguments: 
	   * sResourceName   		: String, mandatory
	   * sRoleName    			: String, mandatory
	   * Purpose: It's a method which assigns Resource to a role
     */
	Integer BO_AssignResourceRole(String sResourceName, String sRoleName) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List<String>  laRetArgs;
		//get resource id
		String  sResourceId = BO_GetObjectId("Resource","ResourceId","ResourceName = '" +sResourceName+"'",false).toString();
		String  sRoleId = BO_GetObjectId("Roles","RoleId","RoleName = '" +sRoleName+"'",false).toString();
		String  sActionName = "create-ResourceRole";
		String sFields = "ResourceId|RoleId";
		String sFieldValues1 = sResourceId+"|"+sRoleId;
		List<String> lsFieldValues = new ArrayList<String>(); 
		//assign role to the resource
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sFieldValues1);
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
		
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "").trim())) 
			return (Integer.parseInt(laRetArgs.get(1).replace("]", "").replace("(", "").trim()));
		else
			 throw new PrimaveraException(laRetArgs.get(1));
	}
	
	/* * Method Name : BO_DeleteBusinessObjectByFilter
	   * Author: Sravanthi
	   * Arguments: 
	   *	 sObject   		: String, mandatory
	   *	 sFilter   		: String, mandatory
	   * Purpose: It's a method which deletes an object based on the specified filter
    */
	Boolean BO_DeleteBusinessObjectByFilter(String sObject,String sFilter ) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException{
		List<String> laRetArgs;
		laRetArgs = Primavera_BOHelper.deleteBOs(sObject, sFilter, "true");
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "").replace("]", "")))
			return true;
		else
			throw new PrimaveraException(laRetArgs.get(1));			
	}
	
	/* * Method Name : BO_CreateProjectFilter
	   * Author: Sravanthi
	   * Arguments: 
	   * 	sProjectFilterName   	   	: String, mandatory
	   * 	sFilterCriteria    			: String, mandatory
	   * Purpose: Below method creates a Project Filter with specified Name and Criteria
	 */
	Integer BO_CreateProjectFilter(String sProjectFilterName,String sFilterCriteria) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException{
		List<String> laRetArgs;
		String sActionName = "create-ActivityFilter";
		String sFields = "ActivityFilterName|FilterType|FilterCriteria";
		String sFieldValues1 = sProjectFilterName + "|VT_PROJECTS_FILTER|" +sFilterCriteria;
		List<String> lsFieldValues = new ArrayList<String>();
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sFieldValues1);
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
		
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "").replace("]", "")))
			return Integer.parseInt(laRetArgs.get(1).replace("]", "").trim());
		else
			throw new PrimaveraException(laRetArgs.get(1));			
	}
	
	/* * Method Name : BO_UpdateBusinessObject
	   * Author: Sravanthi
	   * Arguments: 
	   * 	sObject	        	   	    	: String, mandatory
	   * 	lsFields		    			: List of String, mandatory
	   * 	lsValues						: List of String, mandatory
	   * 	sObjectId					    : String, mandatory
	   * Purpose: Below method creates a Project Filter with specified Name and Criteria
	*/
	Boolean BO_UpdateBusinessObject(String sObject,List<String> lsFields,List<String> lsValues,String sObjectId) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		String sFields,sValues;
		Integer nLoopCounter;
		List<String>  laRetArgs;
		List<String> lsFieldValues = new ArrayList<String>();
		if (lsFields.size() != lsValues.size() )
			throw new PrimaveraException("Column and Value count doesn't match");
		sFields = lsFields.get(0);
		sValues = lsValues.get(0);
		for(nLoopCounter=1;nLoopCounter<lsFields.size() ;nLoopCounter++){
			sFields = sFields + "|" + lsFields.get(nLoopCounter);
			sValues  = sValues + "|" + lsValues.get(nLoopCounter);
		}
		String sActionName = "update-"+sObject;
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sObjectId);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sValues);
		
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "").replace("]", "")))
			return true;
		else
			throw new PrimaveraException(laRetArgs.get(1));
	}
	
	/* * Method Name : BO_CreateGlobalProfile
	   * Author: Sravanthi
	   * Arguments: 
	   * 	sProfileName	        	   	: String, mandatory
	   * Purpose: Below method creates a Global Security Profile.
	*/
	Integer BO_CreateGlobalProfile(String sProfileName) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException{
		List<String> laRetArgs;
		String  sActionName = "create-Profile";
		String  sFields =  "ProfileName|ScopeType";
		String sScopeType = PrimaveraBO_EnumType.ScopeType_GLOBAL;
		String sFieldValues1 = sProfileName+ "|" +sScopeType;
		List<String> lsFieldValues = new ArrayList<String>();
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sFieldValues1);
		
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "").replace("]", "")))
			return Integer.parseInt(laRetArgs.get(1).replace("]", "").trim());
		else
			throw new PrimaveraException(laRetArgs.get(1));
		
		
	}
	
	/* * Method Name : BO_CreateActivity
	   * Author: Sravanthi
	   * Arguments: 
	   * 	sActivityName	          		: String, mandatory
	   * 	sProjectWBSName					: String, mandatory
       * 	sActivityType					: String, mandatory
	   * 	ActivityId						: String, mandatory
       * 	sDuration						: String, mandatory
	   * Purpose: Below method creates an Activity.
	 */
	String BO_CreateActivity(String sActivityName,String sProjectWBSName,String sActivityType,String ActivityId,String sDuration) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List <String>  laRetArgs;
		String sFields,sFiledValues1;
		String sActionName= "create-Activity";
		List<String> lsFieldValues = new ArrayList<String>();
		List<String> params = new ArrayList<String>();
		
		if (sDuration== EMPTY)
			sDuration = "1d";
		else if(Character.isDigit(sDuration.charAt(sDuration.length()-1))){ //Updated by Sravanthi
			params.add("DurationUnitType");
			List<String> tBoInfo =BO_LoadBusinessObject("User",params,"Lower(UserName) = '"+sAdminUser.toLowerCase()+"'",EMPTY);
			sDuration  =  sDuration + tBoInfo.get(0).replace("DurationUnitType =", "").charAt(0);
		}
		if(sActivityType == EMPTY ){
			sFields = "ActivityName|WbsId|PlannedDuration";
			sFiledValues1 = sActivityName+"|"+BO_GetObjectId("Projwbs","WbsId","Name = '"+sProjectWBSName+ "'",false).toString() + "|"+sDuration.replace("[", "").replace("]", "");
		}
		else{
			sFields = "ActivityName|WbsId|ActivityType|PlannedDuration";
			sFiledValues1 = sActivityName+"|"+BO_GetObjectId("Projwbs","WbsId","Name = '"+sProjectWBSName+ "'",false).toString() + "|"+sActivityType.toString()+ "|"+sDuration.replace("[", "").replace("]", "");
		
		}
		sFields = sFields + "|ReviewRequired";
		sFiledValues1 = sFiledValues1 + "|true";
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sFiledValues1);
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues );
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", ""))){
			ActivityId =laRetArgs.get(1).replace("[", "").replace("]", "").trim();
			return ActivityId;			
		}
		else
			throw new PrimaveraException(laRetArgs.get(1));	
	}
	
	/* * Method Name : BO_CreateProjectProfile
	   * Author: Sravanthi
	   * Arguments: 
	   * 	sProfileName	          		: String, mandatory
	   * Purpose: Below method creates a Global Security Profile.
	*/
	Integer BO_CreateProjectProfile(String sProfileName) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException{
		List<String> laRetArgs;
		String  sActionName = "create-Profile";
		String  sFields =  "ProfileName|ScopeType";
		String sScopeType = PrimaveraBO_EnumType.ScopeType_PROJECT;
		String sFieldValues1 = sProfileName+ "|" +sScopeType;
		List<String> lsFieldValues = new ArrayList<String>();
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sFieldValues1);
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
		
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "").replace("]", "")))
			return Integer.parseInt(laRetArgs.get(1).replace("]", ""));
		else
			throw new PrimaveraException(laRetArgs.get(1));			
	}
	
	/* * Method Name : BO_CreateBusinessObject
	   * Author: Sravanthi
	   * Arguments: 
	   *	sObject	          		: String, mandatory
	   *	lsFields				: List of String,mandatory
	   *	lsValues				: List of String,mandatory
	   * Purpose: Below method creates a Object with the specified fields and values.
	*/
	Integer BO_CreateBusinessObject(String sObject,List<String> lsFields,List<String> lsValues) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		String sFields,sValues;
		Integer nLoopCounter;
		List<String> laRetArgs = new ArrayList<String>();
		List<String> lsFieldValues = new ArrayList<String>();
		
		if(lsFields.size() != lsValues.size() )
			throw new PrimaveraException("Column and Value count doesn't match");
		sFields = lsFields.get(0);
		sValues = lsValues.get(0);
		for(nLoopCounter =1;nLoopCounter<lsFields.size();nLoopCounter++){
			sFields = sFields + "|" + lsFields.get(nLoopCounter);
			sValues  = sValues + "|" + lsValues.get(nLoopCounter);
			
		}
		String sActionName = "create-"+sObject;
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sValues);
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", ""))){
			if(laRetArgs.get(1).startsWith("("))
				laRetArgs.set(1, laRetArgs.get(1).replace(laRetArgs.get(1).substring(laRetArgs.get(1).length()-1), ""));
			return Integer.parseInt(laRetArgs.get(1).replace("]", "").trim());
		}
		else
			throw new PrimaveraException(laRetArgs.get(1));
				
		
	}

	/* * Method Name : BO_SetTimeUnitsFormat
	   * Author: Sravanthi
	   * Arguments: 
	   *	rTimeUnitsFormat 		: BO_TimeUnitsFormat, mandatory
	   *	bLogout					: Boolean,mandatory
	   *	sUserName				: String,mandatory
	   * Purpose: Below method sets the TimeUnits format.
	*/	
	void BO_SetTimeUnitsFormat(BO_TimeUnitsFormat rTimeUnitsFormat,Boolean bLogout,String sUserName) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, FileNotFoundException, IOException{
		
		if(sUserName == "")
			sUserName = sAdminUser;
		List<String> params =new ArrayList<String> ();
		List<String> pvalues =new ArrayList<String> ();
		params.add("UserId");
		List<String> boIn = BO_LoadBusinessObject("User",params,"Lower(UserName)= '"+sUserName.toLowerCase()+"'","");
		String sUserId = boIn.get(1).replace("UserId = ", "").trim();	
		
		if(rTimeUnitsFormat.ShowTimeUnit == "" )
			rTimeUnitsFormat.ShowTimeUnit ="true";
		if(rTimeUnitsFormat.ShowDurationTimeUnit == "" )
			rTimeUnitsFormat.ShowDurationTimeUnit ="true";
		params.clear();
		params.add("DurationUnitType");
		params.add("DurationUseFraction");
		params.add("DurationDecimalCount");
		params.add("UnitsPerTimeShowAsPercentage");
		params.add("SmallScaleUseFraction");
		params.add("SmallScaleDecimalCount");
		params.add("SmallScaleUnitType");
		params.add("ShowDurationTimeUnit");
		params.add("ShowTimeUnit");
		
		pvalues.add(rTimeUnitsFormat.DurationUnitType);
		pvalues.add(rTimeUnitsFormat.DurationUseFraction);
		pvalues.add(rTimeUnitsFormat.DurationDecimalCount);
		pvalues.add(rTimeUnitsFormat.UnitsPerTimeShowAsPercentage);
		pvalues.add(rTimeUnitsFormat.SmallScaleUseFraction);
		pvalues.add(rTimeUnitsFormat.SmallScaleDecimalCount);
		pvalues.add(rTimeUnitsFormat.SmallScaleUnitType);
		pvalues.add(rTimeUnitsFormat.ShowDurationTimeUnit);
		pvalues.add(rTimeUnitsFormat.ShowTimeUnit);
		
		BO_UpdateBusinessObject("User",params,pvalues,sUserId);
		Primavera_BOCommon.getInstance();
		
		if(bLogout){
			//WIP
		}	
	}

	/* * Method Name : BO_UpdateActivity
	   * Author: Sravanthi
	   * Arguments: 
	   *	sProjectName 			: String, mandatory
	   *	sActivityName			: String,mandatory
	   *	sFieldName				: String,mandatory
	   *	sFieldValue				: String,mandatory
	   * Purpose: Below method Updates specified fields of an activity 
	*/	
	Boolean  BO_UpdateActivity(String sProjectName, String sActivityName, String sFieldName, String sFieldValue) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List<String> wbsParams = new ArrayList<String> ();
		List<String> actParams = new ArrayList<String> ();
		List<String> lsFields = new ArrayList<String> ();
		List<String> lsValues = new ArrayList<String> ();
		
		wbsParams.add("WbsId");
		List<String> boWBS = BO_LoadBusinessObject("Projwbs", wbsParams,"Name = '"+sProjectName+"'","");
		
		actParams.add("ActivityId");
		actParams.add("WbsId");
		List<String> boAct  = BO_LoadBusinessObject("Activity", actParams,"ActivityName = '"+sActivityName+"' AND WbsId = '"+boWBS.get(1).replace("WbsId = ", "").replace("]","").trim()+"'","");
		
		lsFields.add("WbsContextId");
		lsFields.add("ActivityId");
		lsFields.add(sFieldName);
		lsValues.add(boWBS.get(1).replace("WbsId = ", "").replace("[","").trim());
		lsValues.add(boAct.get(1).replace("ActivityId = ", "").trim());
		lsValues.add(sFieldValue);
		
		if(BO_UpdateBusinessObject("Activity",lsFields,lsValues,boAct.get(1).replace("ActivityId = ", "").trim()))
			return true;
		else
			return false;
	}

	/* * Method Name : BO_AddPrivilegesToProfile
	   * Author: Sravanthi
	   * Arguments: 
	   *	sProfileName 			: String, mandatory
	   *	sPrivileges				: List of String,mandatory
	   * Purpose: Below method adds and updates a profile with specified privileges
	*/	
	Integer BO_AddPrivilegesToProfile(String sProfileName,List<String> sPrivileges) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		//get profile id
		String sFilter = "ProfileName = '"+sProfileName+"'";
		String sProfileId = BO_GetObjectId("Profile", "ProfileId", sFilter,false).toString();
		
		//set the privileges as values
		List<String> laRetArgs;
		String sFields = "PrivilegesToAdd";
		String sValues;
		int iCount = sPrivileges.size();
		if(iCount==0)
			return null;
		sValues = sPrivileges.get(0);
		for(int i=1;i<iCount;i++)
			sValues = sValues + "," + sPrivileges.get(i);
		
		//update project profile with privileges
		String sActionName = "update-Profile";
		List<String> lsFieldValues = new ArrayList<String>();
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sProfileId);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sValues);
		laRetArgs =Primavera_BOHelper.handleBO(lsFieldValues);
		
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
			return Integer.parseInt(laRetArgs.get(1).replace("[", "").replace("]", "").trim());
		else
			throw new PrimaveraException(laRetArgs.get(1));
	}

	/* * Method Name : BO_SetUserLicense
	   * Author: Sravanthi
	   * Arguments: 
	   *	sUserName	 				: String, mandatory
	   *	sLicenseType				: String, mandatory
	   *	sNamedUserFlag				: String,mandatory
	   * Purpose: Below method sets specified License to the specified user
	*/	
	Integer BO_SetUserLicense(String sUserName, String sLicenseType, String sNamedUserFlag) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		String sFilter = "Lower(UserName) = '"+sUserName.toLowerCase()+"' ";
		String sUserId = BO_GetObjectId("User", "UserId", sFilter,false).toString();
		List<String> laRetArgs;
		String sActionName = "create-UserEngine";
		String sFields = "UserId|DBEngineType";
		String sFieldValues = sUserId+"|"+sLicenseType;
		List<String> lsFieldValues = new ArrayList<String>();
		
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sFieldValues);
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
		
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
			return Integer.parseInt(laRetArgs.get(1).replace("[", "").replace("]", "").trim());
		else
			throw new PrimaveraException(laRetArgs.get(1));
	}

	/* * Method Name : BO_SetDateFormat
	   * Author: Sravanthi
	   * Arguments: 
	   *	rDateFormat	 				: BO_DateFormat, mandatory
	   *	bLogout						: String, mandatory
	   *	sUserName					: String,mandatory
	   * Purpose: Below method sets Date format
	*/	
	void BO_SetDateFormat(BO_DateFormat rDateFormat,Boolean bLogout, String sUserName) throws PrimaveraException, FileNotFoundException, IOException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		if(sUserName == "")
			sUserName = sAdminUser;
		List<String> params =new ArrayList<String> ();
		List<String> pvalues =new ArrayList<String> ();
		params.add("UserId");
		
		// Set the preference for GUI loginuser
		List<String> boIn = BO_LoadBusinessObject("User",params,"Lower(UserName)= '"+sUserName.toLowerCase()+"'","");
		String sUserId = boIn.get(1).replace("UserId = ", "").trim();
		
		params.clear();
		params.add("DateShowFourDigitYear");
		params.add("DateUseLeadingZero");
		params.add("DateUseMonthName");
		params.add("DateSeparator");
		params.add("DateFormatType");
		params.add("DateShowMinutes");
		params.add("DateTimeFormatType");
		
		pvalues.add(rDateFormat.DateShowFourDigitYear);
		pvalues.add(rDateFormat.DateUseLeadingZero);
		pvalues.add(rDateFormat.DateUseMonthName);
		pvalues.add(rDateFormat.DateSeparator);
		pvalues.add(rDateFormat.DateFormatType);
		pvalues.add(rDateFormat.DateShowMinutes);
		pvalues.add(rDateFormat.DateTimeFormatType);
		BO_UpdateBusinessObject("User",params,pvalues,sUserId);
		Primavera_BOCommon.getInstance();
		if(bLogout){
			//WIP
		}
	}

	/* * Method Name : BO_SetCurrencyFormat
	   * Author: Sravanthi
	   * Arguments: 
	   *	rCurrencyFormat	 				: BO_CurrencyFormat, mandatory
	   *	bLogout						: String, mandatory
	   *	sUserName					: String,mandatory
	   * Purpose: Below method sets Currency format
	*/
	void BO_SetCurrencyFormat(BO_CurrencyFormat rCurrencyFormat,Boolean bLogout, String sUserName ) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, FileNotFoundException, IOException{
		List<String> params =new ArrayList<String> ();
		List<String> pvalues =new ArrayList<String> ();
		if(sUserName == "")
			sUserName = sAdminUser;
		if(rCurrencyFormat.Currency == "" || rCurrencyFormat.Currency==null){
			rCurrencyFormat.Currency = "USD";
			System.out.println("Currency Name not set, setting to USD");
		}
		if(rCurrencyFormat.ShowDecimalPlaces == "" || rCurrencyFormat.ShowDecimalPlaces==null){
			rCurrencyFormat.ShowDecimalPlaces = "false";
		}
		if(rCurrencyFormat.ShowCurrencySymbol == "" || rCurrencyFormat.ShowCurrencySymbol==null){
			rCurrencyFormat.ShowCurrencySymbol = "false";
		}
		params.add("UserId");
		List<String> boIn = BO_LoadBusinessObject("User",params,"Lower(UserName)= '"+sUserName.toLowerCase()+"'","") ;
		String sUserId = boIn.get(1).replace("UserId = ", "").trim();
		
		params.clear();
		params.add("CurrencyId");
		params.add("DecimalDigits");
		
		List<String> rCurrBOInfo = BO_LoadBusinessObject("PrmCurrency",params,"CurrencyName = '"+rCurrencyFormat.Currency+"'","");
		List<List> rCurrBOInfolist = new  ArrayList<List>();
		rCurrBOInfolist.add(rCurrBOInfo);
		params.clear();
		params.add("DecimalDigits");
		
		if(rCurrencyFormat.NumberOfDecimalPlaces == "" || rCurrencyFormat.NumberOfDecimalPlaces==null){
			pvalues.add("2");
			if (Integer.parseInt(rCurrBOInfo.get(6).replace("]","").replace("DecimalDigits =","").trim()) !=2){
				BO_UpdateBusinessObject("PrmCurrency",params,pvalues,rCurrBOInfo.get(6).replace("]","").replace("DecimalDigits =","").trim());
			}
		}
		else{
			pvalues.add(rCurrencyFormat.NumberOfDecimalPlaces);
			BO_UpdateBusinessObject("PrmCurrency",params,pvalues,rCurrBOInfo.get(6).replace("]","").replace("DecimalDigits =","").trim());
		}
		if(rCurrBOInfolist.size() > 1){
			System.out.println("Multiple Records found for CurrencyName '"+rCurrencyFormat.Currency+"', using first record. this may result in testcase failure.");
		}
		params.clear();
		params.add("CurrencyId");
		params.add("CurrencyShowDecimals");
		params.add("CurrencyShowSymbol");
		pvalues.clear();
		pvalues.add(rCurrBOInfo.get(5).replace("CurrencyId =","").trim());
		pvalues.add(rCurrencyFormat.ShowDecimalPlaces);
		pvalues.add(rCurrencyFormat.ShowCurrencySymbol);
		BO_UpdateBusinessObject("User",params,pvalues,sUserId);
		Primavera_BOCommon.getInstance();
		if(bLogout){
			//WIP
		}						
	}

	/* * Method Name : BO_SetAdminMaxIdLength
	   * Author: Sravanthi
	   * Arguments: 
	   *	sField	 				  	: String, mandatory
	   *	sMaxIdLen					: String, mandatory
	   *	sSetAll						: String,mandatory
	   * Purpose: Below method sets Maximum length for the IDs
	*/
	void BO_SetAdminMaxIdLength(String sField,String sMaxIdLen,String sSetAll) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException{
		List<String> lsField = new ArrayList<String>();
		List<String> params = new ArrayList<String>();
		List<String> pvalues = new ArrayList<String>();
		lsField.add("MaxProjectIDLength");
		lsField.add("MaxWBSCodeLength");
		lsField.add("MaxResourceIDLength");
		lsField.add("MaxActivityIDLength");
		lsField.add("MaxCostAccountIDLength");
		lsField.add("MaxRoleIDLength");
		
		if(Boolean.parseBoolean(sSetAll)){
			switch(sField.toUpperCase()){
				case "PROJECT":
					params.add("MaxProjectIDLength");
					pvalues.add(sMaxIdLen);
					BO_UpdateBusinessObject("GlobalPreferences",params,pvalues,"1");
					break;
				case "WBS":
					params.add("MaxWBSCodeLength");
					pvalues.add(sMaxIdLen);
					BO_UpdateBusinessObject("GlobalPreferences",params,pvalues,"1");
					break;
				case "RESOURCE":
					params.add("MaxResourceIDLength");
					pvalues.add(sMaxIdLen);
					BO_UpdateBusinessObject("GlobalPreferences",params,pvalues,"1");
					break;
				case "ACTIVITY":
					params.add("MaxActivityIDLength");
					pvalues.add(sMaxIdLen);
					BO_UpdateBusinessObject("GlobalPreferences",params,pvalues,"1");
					break;
				case "COSTACCOUNT":
					params.add("MaxCostAccountIDLength");
					pvalues.add(sMaxIdLen);
					BO_UpdateBusinessObject("GlobalPreferences",params,pvalues,"1");
					break;
				case "ROLE":
					params.add("MaxRoleIDLength");
					pvalues.add(sMaxIdLen);
					BO_UpdateBusinessObject("GlobalPreferences",params,pvalues,"1");
					break;
				default:
					params.clear();
					pvalues.clear();
					params.add("MaxProjectIDLength");
					params.add("MaxWBSCodeLength");
					params.add("MaxResourceIDLength");
					params.add("MaxActivityIDLength");
					params.add("MaxCostAccountIDLength");
					params.add("MaxRoleIDLength");
					pvalues.add(sMaxIdLen);
					pvalues.add(sMaxIdLen);
					pvalues.add(sMaxIdLen);
					pvalues.add(sMaxIdLen);
					pvalues.add(sMaxIdLen);
					pvalues.add(sMaxIdLen);
					BO_UpdateBusinessObject("GlobalPreferences",params,pvalues,"1");
					break;
			}
		}
		else{
			params.clear();
			pvalues.clear();
			params.add("MaxProjectIDLength");
			params.add("MaxWBSCodeLength");
			params.add("MaxResourceIDLength");
			params.add("MaxActivityIDLength");
			params.add("MaxCostAccountIDLength");
			params.add("MaxRoleIDLength");
			pvalues.add(sMaxIdLen);
			pvalues.add(sMaxIdLen);
			pvalues.add(sMaxIdLen);
			pvalues.add(sMaxIdLen);
			pvalues.add(sMaxIdLen);
			pvalues.add(sMaxIdLen);
			BO_UpdateBusinessObject("GlobalPreferences",params,pvalues,"1");
		}
	}
	
	/* * Method Name : BO_SetDefaultAdminPrefs
	   * Author: Sravanthi
	   * Arguments: 
	   *	bLogout	 				  	: String, mandatory
	   * Purpose: Below method sets default Admin Preferences
	*/
	void BO_SetDefaultAdminPrefs(String bLogout) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException{
		TimePeriodPrefs sTPPrefs = new TimePeriodPrefs();
		//Set Options
		// Time Periods
		sTPPrefs.HoursPerDay ="8";
		sTPPrefs.HoursPerWeek ="40";
		sTPPrefs.HoursPerMonth ="172";
		sTPPrefs.HoursPerYear ="2000";
		sTPPrefs.UseCalendarPeriods="false";
		BO_UpdateAdminTimePeriods(sTPPrefs,"");
		if(bLogout!= ""){
			if(Boolean.parseBoolean(bLogout)){
				//WIP
			}
		}
	}	

	/* * Method Name : BO_UpdateAdminTimePeriods
	   * Author: Sravanthi
	   * Arguments: 
	   *	sTPPrefs	 				: TimePeriodPrefs, mandatory
	   *	bLogout						: String, mandatory
	   * Purpose: Below method update  Admin TimePeriods
	*/
	Boolean BO_UpdateAdminTimePeriods(TimePeriodPrefs sTPPrefs, String bLogout) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException{
		List<String> sColumns = new ArrayList<String>();
		List<String> sDataVal= new ArrayList<String>();
		Boolean bResult;
		
		// Creating of Update BO argument strings
		if(sTPPrefs.HoursPerDay != "" && sTPPrefs.HoursPerDay != null){
			sColumns.add("HoursPerDay");
			sDataVal.add(sTPPrefs.HoursPerDay);
		}
		if(sTPPrefs.HoursPerWeek !="" && sTPPrefs.HoursPerWeek!= null){
			sColumns.add("HoursPerWeek");
			sDataVal.add(sTPPrefs.HoursPerWeek);
		}
		if(sTPPrefs.HoursPerMonth !="" && sTPPrefs.HoursPerMonth!= null){
			sColumns.add("HoursPerMonth");
			sDataVal.add(sTPPrefs.HoursPerMonth);
		}
		if(sTPPrefs.HoursPerYear !="" && sTPPrefs.HoursPerYear!= null){
			sColumns.add("HoursPerYear");
			sDataVal.add(sTPPrefs.HoursPerYear);
		}
		if(sTPPrefs.UseCalendarPeriods !="" && sTPPrefs.UseCalendarPeriods!= null){
			sColumns.add("UseCalendarTimePeriodsFlag");
			sDataVal.add(sTPPrefs.UseCalendarPeriods);
		}
		// Set options and logout
		bResult = BO_UpdateBusinessObject("GlobalPreferences",sColumns,sDataVal,"1");
		if(bLogout!= ""){
			if(Boolean.parseBoolean(bLogout)){
				//WIP
			}
		}
		return bResult;
		
	}

	/* * Method Name : BO_CreateProjectAccess
	   * Author: Sravanthi
	   * Arguments: 
	   *	sUserName	 				: String, mandatory
	   *	sOBSName					: String, mandatory
	   *	sProjectProfileName			: String, mandatory
	   * Purpose: Below method update  Admin TimePeriods
	*/
	Integer BO_CreateProjectAccess(String sUserName, String sOBSName,String sProjectProfileName) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		String sUserId = BO_GetObjectId("User","UserId","Lower(UserName) = '"+sUserName.toLowerCase()+"'",false).toString();
		String sProfileId = BO_GetObjectId("Profile","ProfileId","ProfileName = '"+sProjectProfileName+"'",false).toString();
		String sObsId  = BO_GetObjectId("Obs","ObsId","ObsName = '"+sOBSName+"'",false).toString();
		List<String> laRetArgs=new ArrayList<String>();
		List<String> params = new ArrayList<String>();
		String sActionName = "create-UserObs";
		String sFields = "UserId|ObsId|ProfileId";
		String  sFieldValues = sUserId + "|" + sObsId + "|" + sProfileId;
		params.add(sActionName);
		params.add(sFields);
		params.add(sFieldValues);
		
		laRetArgs = Primavera_BOHelper.handleBO(params);
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
			return Integer.parseInt(laRetArgs.get(1).replace("]", "").replace("(", "").trim());
		else
				throw new PrimaveraException(laRetArgs.get(1));
	}

	/* * Method Name : BO_GetRiskId
	   * Author: Sravanthi
	   * Arguments: 
	   *	sRiskName	 					: String, mandatory
	   *	sProjectName					: String, mandatory
	   * Purpose: Below method returns the Risk Id of the specified risk under the specified project
	*/
	String BO_GetRiskId(String sRiskName,String sProjectName){
		List<String> tBOInfo;
		List<String> params =new ArrayList<String>();
		if(sProjectName == "" ){
			try{
				params.add("RiskId");
				tBOInfo = BO_LoadBusinessObject ("Risk", params, "Name = '"+ sRiskName +"'","");
			 }catch(PrimaveraException pe){
				 return "";
			 }
		}
		else{
			try{
				String sProjectId=BO_GetProjectId (sProjectName);
				params.add("RiskId");
				tBOInfo = BO_LoadBusinessObject ("Risk", params, "Name = '"+ sRiskName +"' AND ProjectId='"+sProjectId+"'","");
			 }catch(PrimaveraException pe){
				 return "";
			 }
		}
		return tBOInfo.get(1).split(Pattern.quote("|"))[0];
	}
	
	/* * Method Name : BO_CreateRisk
	   * Author: Sravanthi
	   * Arguments: 
	   *	tRiskDetails	 				: RiskDetails, mandatory
	   * Purpose: Below method creates risk of specified details
	*/
	String BO_CreateRisk (RiskDetails tRiskDetails) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List<String> lsFields =new ArrayList<String>();
		List<String> lsValues=new ArrayList<String>();
		
		if (tRiskDetails.sProjectName == "" || tRiskDetails.sRiskName== ""){
			throw new PrimaveraException("Project Id and Name field are null. Cannot create risk");
		}
		
		lsFields.add("ProjectId");
		lsFields.add("WbsContextId");
		lsFields.add("Name");
		lsValues.add(BO_GetProjectId (tRiskDetails.sProjectName));
		lsValues.add(BO_GetProjectWBSId (tRiskDetails.sProjectName));
		lsValues.add(tRiskDetails.sRiskName);
		
		if(tRiskDetails.sRiskTitle != null){
			lsFields.add("Title");
			lsValues.add(tRiskDetails.sRiskTitle);
		}
		if(tRiskDetails.sResourceId !=null){
			lsFields.add("ResourceId");
			lsValues.add(tRiskDetails.sResourceId);
		}
		if(tRiskDetails.sRiskCategoryId != null){
			lsFields.add("CategoryId");
			lsValues.add(tRiskDetails.sRiskCategoryId);
		}
		if(tRiskDetails.sStatus !=null){
			lsFields.add("RiskStatusWeb");
			lsValues.add(tRiskDetails.sStatus);
		}
		if(tRiskDetails.sType!=null){
			lsFields.add("RiskTypeWeb");
			lsValues.add(tRiskDetails.sType);
		}
		
		if(tRiskDetails.sCause !=null){
			lsFields.add("Cause");
			lsValues.add(tRiskDetails.sCause);
		}
		if(tRiskDetails.sDescription != null){
			lsFields.add("Description");
			lsValues.add(tRiskDetails.sDescription);
		}
		if(tRiskDetails.sEffect != null){
			lsFields.add("Effect");
			lsValues.add(tRiskDetails.sEffect);
		}
		
		if(tRiskDetails.sNote!= null){
			lsFields.add("Note");
			lsValues.add(tRiskDetails.sNote);
		}
		BO_CreateBusinessObject ("Risk", lsFields, lsValues);
		return BO_GetRiskId (tRiskDetails.sRiskName,"");
	}
	
	/* * Method Name : BO_CreateFundingSource
	   * Author: Sravanthi
	   * Arguments: 
	   *	sFundingName	 				: String, mandatory
	   *	sParentFundingName				: String, mandatory(Can be empty)
	   * Purpose: Below method creates funding source under specified parent funding source or under root
	*/
	Integer BO_CreateFundingSource(String sFundingName,String sParentFundingName) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List<String> laRetArgs = new ArrayList<String>();
		List<String> params = new ArrayList<String>();
		String sFundingId,sFields,sFieldValues1;
		String sFundDescription= sFundingName;
		if(sParentFundingName== ""){
			sFields = "FundingSourceName|FundingSourceDescription";
			sFieldValues1 = sFundingName +"|" +sFundDescription;
		}
		else{
			sFundingId = BO_GetObjectId("FundingSource", "FundingId", "FundingSourceName = '"+sParentFundingName+"'",false).toString();
			sFields = "FundingSourceName|FundingSourceDescription|ParentFundingId";
			sFieldValues1 = sFundingName +"|" +sFundDescription+"|" + sFundingId;
		}
		
		String sActionName = "create-FundingSource";
		params.add(sActionName);
		params.add(sFields);
		params.add(sFieldValues1);
		laRetArgs = Primavera_BOHelper.handleBO(params);
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
			return Integer.parseInt(laRetArgs.get(1).replace("]", "").replace("(", "").trim());
		else
				throw new PrimaveraException(laRetArgs.get(1));
	}

	/* * Method Name : BO_CreateActivityWithPrimaryRes
	   * Author: Sravanthi
	   * Arguments: 
	   *	sActivityName	 				: String, mandatory
	   *	sProjectWBSName					: String, mandatory
	   *	sResId							: String, mandatory
	   *	sActivityType					: String,mandatory (can be empty)
	   *	ActivityId						: String,mandatory(can be empty)
	   *	sDuration						: String,mandatory(can be empty)
	   * Purpose: Below method creates acivity with specified resource as primary resource
	*/
	String BO_CreateActivityWithPrimaryRes(String sActivityName,String sProjectWBSName,String sResId,String sActivityType,String ActivityId,String sDuration) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List<String> laRetArgs;
		String sFields,sFiledValues1;
		String sActionName = "create-Activity";
		List<String> lsFieldValues = new ArrayList<String>();
		List<String> params = new ArrayList<String>();
		if (sDuration== EMPTY){
			sDuration = "1d";
		}	
		else if(Character.isDigit(sDuration.charAt(sDuration.length()-1))){
			params.add("DurationUnitType");
			List<String> tBoInfo =BO_LoadBusinessObject("User",params,"Lower(UserName) = '"+sAdminUser.toLowerCase()+"'",EMPTY);
			sDuration  =  sDuration + tBoInfo.get(0).replace("DurationUnitType =", "").charAt(0);
		}
		if(sActivityType == EMPTY ){
			sFields = "ActivityName|WbsId|PrimaryResourceId|PlannedDuration";
			sFiledValues1 = sActivityName+"|"+BO_GetObjectId("Projwbs","WbsId","Name = '"+sProjectWBSName+ "'",false).toString() +"|"+sResId+ "|"+sDuration.replace("[", "").replace("]", "");
		}
		else{
			sFields = "ActivityName|WbsId|ActivityType|PrimaryResourceId|PlannedDuration";
			sFiledValues1 = sActivityName+"|"+BO_GetObjectId("Projwbs","WbsId","Name = '"+sProjectWBSName+ "'",false).toString() + "|"+sActivityType.toString()+"|"+sResId+ "|"+sDuration.replace("[", "").replace("]", "");
		}
		lsFieldValues.add(sActionName);
		lsFieldValues.add(sFields);
		lsFieldValues.add(sFiledValues1);
		laRetArgs = Primavera_BOHelper.handleBO(lsFieldValues);
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", ""))){
			ActivityId =laRetArgs.get(1).replace("[", "").replace("]", "").trim();
			return ActivityId;
			
		}
		else
			throw new PrimaveraException(laRetArgs.get(1));
	}
	
	/* * Method Name : BO_AssignActivityResource
	   * Author: Sravanthi
	   * Arguments: 
	   *	sProjectName	 				: String, mandatory
	   *	sActivityName					: String, mandatory
	   *	sResourceName					: String, mandatory
	   * Purpose: Below method creates acivity with specified resource as primary resource
	*/	
	Integer BO_AssignActivityResource(String sProjectName,String sActivityName, String sResourceName) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List<String> params = new ArrayList<String>();
		List<String> pValues  = new ArrayList<String>();
		String sActId;
		params.add("WbsId");
		List<String> boWbs1 =  BO_LoadBusinessObject("Projwbs", params,"Name = '"+sProjectName+"'","");
		
		params.clear();
		params.add("ActivityId");
		params.add("WbsId");
		List<String> boWbs2 =  BO_LoadBusinessObject("Activity",params,"ActivityName = '"+sActivityName +"' AND WbsId = '"+boWbs1.get(1).trim() +"'","");
		params.clear();
		params.add("ResourceId");
		List<String> boResource = BO_LoadBusinessObject("Resource", params, "ResourceName = '"+sResourceName+"'","");
		params.clear();
		params.add("WbsContextId");
		params.add("ActivityId");
		params.add("ResourceId");
		
		pValues.add(boWbs1.get(1).trim());
		pValues.add(boWbs2.get(1).trim());
		pValues.add(boResource.get(1).trim());
		sActId = BO_CreateBusinessObject("Assignment",params,pValues).toString();
		return Integer.parseInt(sActId);
	}

	/* * Method Name : BO_AssignActivityResource
	   * Author: Sravanthi
	   * Arguments: 
	   *	sWBSName		 				: String, mandatory
	   *	sActivityName					: String, mandatory
	   *	sActivityStepName				: String, mandatory
	   * Purpose: Below method creates activity step
	*/	
	Integer BO_AddStepToActivity(String sWBSName, String sActivityName, String sActivityStepName) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		String sActionName = "Create-ActivityStep";
		String sFields,sFieldValues;
		
		List<String> retArgs;
		List<String> params = new ArrayList<String>();
		params.add("WbsId");
		List<String> boInfo1 =  BO_LoadBusinessObject("Projwbs",params,"Name = '"+sWBSName+"'","");
		String sWbsId = boInfo1.get(1).trim();
		params.clear();
		params.add("ActivityId");
		params.add("WbsId");
		List<String> boInfo2 = BO_LoadBusinessObject("Activity",params,"ActivityName = '"+sActivityName+"' AND WbsId = '"+sWbsId+"'","");
		String sActId = boInfo2.get(1).trim();
		sFields="wbsContextId|ActivityId|ActivityStepName";
		sFieldValues=sWbsId+"|"+ sActId+ "|"+ sActivityStepName;
		
		params.clear();
		params.add(sActionName);
		params.add(sFields);
		params.add(sFieldValues);
		List<String> laRetArgs =  Primavera_BOHelper.handleBO(params);
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
			return Integer.parseInt(laRetArgs.get(1).replace("]", "").replace("(", "").trim());
		else
				throw new PrimaveraException(laRetArgs.get(1));
	} 
	
	/* * Method Name : BO_CreateNavigationView
	   * Author: Sravanthi
	   * Arguments: 
	   *	sUIView			 				: String, mandatory
	   *	bDefaultStatus					: String, mandatory(can be empty)
	   *	sUser							: String, mandatory(can be empty)
	   * Purpose: Below method creates navigation view
	*/	
	String BO_CreateNavigationView(String sUIView,  String  bDefaultStatus, String sUser) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException{
		List<String> laRetArgs;
		String  sActionName = "create-UIView";
		String  sFields,sFieldsValues;
		List<String> params = new ArrayList<String>();
		
		if(bDefaultStatus == ""){
			if(sUser ==""){
				sFields = "UIViewName";
				sFieldsValues = sUIView;
			}
			else{
				sFields = "UIViewName|Users";
				sFieldsValues = sUIView +"|" +sUser;
			}
		}
		else{
			if(sUser ==""){
				sFields = "UIViewName|IsDefault";
				sFieldsValues = sUIView +"|" + bDefaultStatus;
			}
			else{
				sFields = "UIViewName|Users|IsDefault";
				sFieldsValues = sUIView +"|" +sUser+"|" + bDefaultStatus; 
			}
		}
		params.add(sActionName);
		params.add(sFields);
		params.add(sFieldsValues);
		laRetArgs = Primavera_BOHelper.handleBO(params);
		
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
			return laRetArgs.get(1).replace("]", "").replace("(", "").trim();
		else
				throw new PrimaveraException(laRetArgs.get(1));
		
	}

	/* * Method Name : BO_CreateProjectView
	   * Author: Sravanthi
	   * Arguments: 
	   *	sProjectView			 		: String, mandatory
	   *	isGlobal						: String, mandatory(can be empty)
	   * Purpose: Below method creates Project View
	*/	
	String BO_CreateProjectView(ProjectView sProjectView,Boolean isGlobal) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List<String> lsFields = new ArrayList<String> ();
		List<String>lsListOfUserFlds,lsSelCols;
		List<String> lsListOfUserVals  = new ArrayList<String> ();
		List<String> lsValues =new ArrayList<String> ();
		String sTmp,ViewUsersArray,sPrev,sWidthInfo, sActivityCode = "";
		int i,j,x;
		int k=1;
		Boolean isListOfUsers = false;
		Boolean bContinue = true;
		String sUserID;
		List<String> params = new ArrayList<String>();
		
		if(isGlobal == false){
			if(sProjectView.UserName == null){
				sProjectView.UserName = sAdminUser;
			}
			sUserID = BO_GetObjectId("User","UserId","Lower(UserName) ='"+sProjectView.UserName+"'",false).toString();
			lsFields.add("UserId");
			lsValues.add(sUserID);
			if(sProjectView.ListOfUserNames != null){
				for(String sVar : sProjectView.ListOfUserNames){
					sTmp =  BO_GetObjectId("User","UserId","Lower(UserName) ='"+sVar.toLowerCase()+"'",false).toString();
					lsListOfUserVals.add(sTmp);
				}
			}
			ViewUsersArray = lsListOfUserVals.get(0);
			
			for(i=1;i<lsListOfUserVals.size();i++){
				ViewUsersArray += ","+ lsListOfUserVals.get(i);
			}
			lsFields.add("ActivityViewUserIdArray");
			lsValues.add(ViewUsersArray);
		}
		else{
			if(sProjectView.UserName != null || sProjectView.ListOfUserNames != null){
				throw new PrimaveraException("UserName and ListOfUserNames shouldn't be set for Global views");
			}
		}
		
		//Set View Name
		if(sProjectView.ProjectViewName ==  null){
			throw new PrimaveraException("View Name is required");
		}
		else{
			lsFields.add("ProjectViewName");
			lsValues.add(sProjectView.ProjectViewName);
		}
		
		//Set View Type
		lsFields.add("ProjectViewType");
		lsValues.add("VT_PROJECT");
		
		//Groups
		if(sProjectView.Groups ==  null){
			System.out.println("No Grouping");
		}
		else{
			lsFields.add("Groups");
			lsValues.add(sProjectView.Groups);
		}
		
		//Hide if Empty
		if(sProjectView.HideBandIfEmpty ==  null)
			sProjectView.HideBandIfEmpty ="false";
		lsFields.add("HideBandIfEmpty");
		lsValues.add(sProjectView.HideBandIfEmpty);
		
		//Selected Columns
		if(sProjectView.SelectedColumns ==  null)
			sProjectView.SelectedColumns ="ParentWbsId,ParentWbsName,OriginalBudget,ObsId,IndependentETCLaborUnits,IndependentETCTotalCost,AnticipatedStart,AnticipatedFinish";
		lsFields.add("SelectedColumns");
		lsValues.add(sProjectView.SelectedColumns);
		
		//Show on Band
		if(sProjectView.ShowOnBand ==  null)
			sProjectView.ShowOnBand ="BDV_ID";
		lsFields.add("ShowOnBand");
		lsValues.add(sProjectView.ShowOnBand);
		
		//First Column
		if(sProjectView.FirstColumn ==  null)
			sProjectView.FirstColumn ="Name";
		lsFields.add("FirstColumn");
		lsValues.add(sProjectView.FirstColumn);
		
		//Filter
		if(sProjectView.Filter != null || sProjectView.FiltersList != null){
			String FiltersOperator, lsFiltersList;
			if(sProjectView.Filter != null && sProjectView.FiltersList == null){
				sProjectView.FiltersList = sProjectView.Filter;
			}
			else if (sProjectView.FiltersList == null)
				sProjectView.FiltersList = "ProjectCActive";
			if(sProjectView.FiltersOperator ==null)
				sProjectView.FiltersOperator ="AND";
			FiltersOperator = sProjectView.FiltersOperator.toUpperCase();
			List<String> bo;
			params.add("ActivityFilterName");
			params.add("ActivityFilterId");
			bo = BO_LoadBusinessObject("ActivityFilter",params,"Lower(ActivityFilterName)='"+sProjectView.FiltersList.toLowerCase()+"'","");
			lsFiltersList = bo.get(1);
			lsFields.add("Filter");
			lsFields.add("FiltersList");
			lsFields.add("FiltersOperator");
			lsValues.add("TreeFilter");
			lsValues.add(lsFiltersList);
			lsValues.add("AND");
		}
		//Sort By
		if(sProjectView.SortBy ==null)
			sProjectView.SortBy = "Name";
		lsFields.add("SortBy");
		lsValues.add(sProjectView.SortBy);
		//Sort By
		if(sProjectView.SortOrder ==null)
			sProjectView.SortOrder = "SO_ASC";
		lsFields.add("SortOrder");
		lsValues.add(sProjectView.SortOrder);
		
		//Show Rollups
		if(sProjectView.ShowRollups ==null)
			sProjectView.ShowRollups = "true";
		lsFields.add("ShowRollups");
		lsValues.add(sProjectView.ShowRollups);
		
		//Show Title
		if(sProjectView.ShowTitle ==null)
			sProjectView.ShowTitle = "false";
		lsFields.add("ShowTitle");
		lsValues.add(sProjectView.ShowTitle);
		
		//Show Title
		if(sProjectView.Timescale ==null)
			sProjectView.Timescale = "TS_MW";
		lsFields.add("Timescale");
		lsValues.add(sProjectView.Timescale);
		
		//First Bar
		if(sProjectView.FirstBarDisplayType ==null)
			sProjectView.FirstBarDisplayType = PrimaveraBO_EnumType.BarType_CURRENT_BAR.getPrivilege();
		
		//Second Bar
		if(sProjectView.SecondBarDisplayType ==null)
			sProjectView.SecondBarDisplayType = PrimaveraBO_EnumType.BarType_NO_BAR.getPrivilege();		
		
		//Third Bar
		if(sProjectView.ThirdBarDisplayType ==null)
			sProjectView.ThirdBarDisplayType = PrimaveraBO_EnumType.BarType_NO_BAR.getPrivilege();	
		
		//Issue Columns
		if(sProjectView.SelectedIssuesColumns !=null){
			lsFields.add("SelectedIssuesColumns");
			lsValues.add(sProjectView.SelectedIssuesColumns);
		}
		return 	BO_CreateBusinessObject("ProjectView", lsFields, lsValues).toString();
	}
	
	/* * Method Name : BO_CreateActivityView
	   * Author: Sravanthi
	   * Arguments: 
	   *	sActivityView			 		: String, mandatory
	   *	isGlobal						: String, mandatory(can be empty)
	   * Purpose: Below method creates Project View
	*/	
	@SuppressWarnings({ "unused", "static-access", "null" })
	String BO_CreateActivityView(ActivityView sActivityView,Boolean isGlobal) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List<String> lsFields = new ArrayList<String> ();
		List<String> lsListOfUserFlds;
		List<String> lsListOfUserVals = new ArrayList<String> ();
		List<String> lsSelCols = new ArrayList<String> ();
		String[] sPrev1,sPrev2;
		List<String> lsValues = new ArrayList<String> ();
		String sTmp,ViewUsersArray,sWidthInfo, sActivityCode = "";
		int i,j,x;
		int k=0;
		String name = "UserName";
		Boolean isListOfUsers = false;
		Boolean bContinue = true;
		if( isGlobal == false){
			if(sActivityView.UserName == null)
				sActivityView.UserName =sAdminUser;
			String sUserId = BO_GetObjectId("User","UserId",  "Lower(UserName) ='"+sActivityView.UserName.toLowerCase()+"'",false).toString();
			lsFields.add("UserId");
			lsValues.add(sUserId);
			if(sActivityView.ListOfUserNames !=  null){
				for(i=0;i<sActivityView.ListOfUserNames.size();i++){
					sTmp = BO_GetObjectId("User","UserId",  "Lower(UserName) ='"+sActivityView.ListOfUserNames.get(i).toLowerCase()+"'",false).toString();
					lsListOfUserVals.add(sTmp);
					
				}
				ViewUsersArray =lsListOfUserVals.get(0);
				for(i=1;i<lsListOfUserVals.size();i++)
					ViewUsersArray =ViewUsersArray+ ",'"+lsListOfUserVals.get(i)+"'";
				lsFields.add("ActivityViewUserIdArray");
				lsValues.add(ViewUsersArray);							
			}
		}
		else
			if(sActivityView.UserName != null || sActivityView.ListOfUserNames !=null)
				throw new PrimaveraException("UserName and ListOfUserNames shouldn't be set for Global views");
		//Set View Name
		if(sActivityView.ActivityViewName==null)
			throw new PrimaveraException("View Name is required");
		else{
			lsFields.add("ActivityViewName");
			lsValues.add(sActivityView.ActivityViewName);
		}
		//Set View Type
		lsFields.add("ActivityViewType");
		lsValues.add("VT_ACTIVITY");
		//Wbs Managed
		if(sActivityView.WbsManaged!=null){
			if (sActivityView.WbsManaged == "true")
				sActivityView.Groups = "WbsId,6,SO_ASC,28,-1;WbsId,15,SO_ASC,28,0;WbsId,23,SO_ASC,28,0;WbsId,8,SO_ASC,28,0;WbsId,26,SO_ASC,28,0;WbsId,6,SO_ASC,28,0;WbsId,15,SO_ASC,28,0;WbsId,23,SO_ASC,28,0;WbsId,8,SO_ASC,28,0;WbsId,26,SO_ASC,28,0;WbsId,15,SO_ASC,28,0;WbsId,23,SO_ASC,28,0;WbsId,8,SO_ASC,28,0;WbsId,26,SO_ASC,28,0;WbsId,6,SO_ASC,28,0;WbsId,15,SO_ASC,28,0;WbsId,23,SO_ASC,28,0;WbsId,8,SO_ASC,28,0;WbsId,26,SO_ASC,28,0;WbsId,26,SO_ASC,28,0;";
			sActivityView.WbsManaged = "false";
		}
		else
			sActivityView.WbsManaged = "false";
		//Groups
		if(sActivityView.Groups==null)
			System.out.println("No Grouping");
		else{
			lsFields.add("Groups");
			lsValues.add(sActivityView.Groups);
				
			String[] ids= sActivityView.Groups.split(Pattern.quote(";"));
			String[] ids2 =ids[0].split(Pattern.quote(","));
			if(ids2[4]!= "-1" )
				sActivityView.HideBandIfEmpty = "true";
		}
		//Hide if Empty
		if(sActivityView.HideBandIfEmpty =="false" || sActivityView.HideBandIfEmpty == null )
			sActivityView.HideBandIfEmpty ="false";
		else
			sActivityView.HideBandIfEmpty ="true";	
		lsFields.add("HideBandIfEmpty");
		lsValues.add(sActivityView.HideBandIfEmpty);
		
		//Selected Columns
		if(sActivityView.SelectedColumns == null)
			sActivityView.SelectedColumns = "PlannedStart,PlannedFinish,RemainingDuration";
		lsFields.add("SelectedColumns");
		lsValues.add(sActivityView.SelectedColumns);
		
		if(sActivityView.ShowOnBand == null)
			sActivityView.ShowOnBand = "BDV_ID";
		lsFields.add("ShowOnBand");
		lsValues.add(sActivityView.ShowOnBand);
		
		if(sActivityView.FirstColumn == null)
			sActivityView.FirstColumn = "ActivityName";
		lsFields.add("FirstColumn");
		lsValues.add(sActivityView.FirstColumn);
		//Filter
		if(sActivityView.Filter == "" || sActivityView.Filter == null)
			sActivityView.Filter = "AllActivities";
		lsFields.add("Filter");
		lsValues.add(sActivityView.Filter);
		
		//Sort By
		if(sActivityView.SortBy == "" || sActivityView.SortBy == null)
			sActivityView.SortBy = "ActivityCode";
		lsFields.add("SortBy");
		lsValues.add(sActivityView.SortBy);
		
		//Sort Order
		if(sActivityView.SortOrder == "" || sActivityView.SortOrder == null)
			sActivityView.SortOrder = "SO_ASC";
		lsFields.add("SortOrder");
		lsValues.add(sActivityView.SortOrder);
		
		//Show Rollups
		if(sActivityView.ShowRollups == "" || sActivityView.ShowRollups == null)
			sActivityView.ShowRollups = "true";
		lsFields.add("ShowRollups");
		lsValues.add(sActivityView.ShowRollups);
		
		//Show Title
		if(sActivityView.ShowTitle == "" || sActivityView.ShowTitle == null)
			sActivityView.ShowTitle = "false";
		lsFields.add("ShowTitle");
		lsValues.add(sActivityView.ShowTitle);
		
		//Label Field
		if(sActivityView.LabelField == "" || sActivityView.LabelField == null)
			sActivityView.LabelField = "ActivityName";
		lsFields.add("LabelField");
		lsValues.add(sActivityView.LabelField);
		
		//Label Position
		if(sActivityView.LabelPosition == "" || sActivityView.LabelPosition == null)
			sActivityView.LabelPosition = "RIGHT";
		lsFields.add("LabelPosition");
		lsValues.add(sActivityView.LabelPosition);
		
		//Show Critical
		if(sActivityView.ShowCritical == "" || sActivityView.ShowCritical == null)
			sActivityView.ShowCritical = "true";
		lsFields.add("ShowCritical");
		lsValues.add(sActivityView.ShowCritical);
		
		//Show ProgressBar
		if(sActivityView.ShowProgressBar == "" || sActivityView.ShowProgressBar == null)
			sActivityView.ShowProgressBar = "true";
		lsFields.add("ShowProgressBar");
		lsValues.add(sActivityView.ShowProgressBar);
		
		//Time Scale
		if(sActivityView.Timescale == "" || sActivityView.Timescale == null)
			sActivityView.Timescale = "TS_MW";
		lsFields.add("Timescale");
		lsValues.add(sActivityView.Timescale);
		
		//Selected WBS Columns
		if(sActivityView.SelectedWbsColumns != null){
			lsFields.add("SelectedWbsColumns");
			lsValues.add(sActivityView.SelectedWbsColumns);
		}
		//Column Widths
		while(bContinue && k<sActivityView.SelectedColumns.length()){
			if(k>0){
				sPrev1 = sActivityView.SelectedColumns.split(Pattern.quote(","));
				sPrev2 =sActivityView.SelectedColumns.split(Pattern.quote(","));
				if(k>= sPrev1.length ){
					bContinue = false;
					break;
				}
			}
			if(bContinue == true){
				sPrev2 =sActivityView.SelectedColumns.split(Pattern.quote(","));
				lsSelCols.add(sPrev2[k]);
				k++;
			}
		}
		sWidthInfo = "ganttSheetVisible=true;left.Divider=158;right.Divider=650;"+lsSelCols.get(0)+"=100;" ;
		for(k=2;k<(lsSelCols.size())-1;k++){
			sTmp = sWidthInfo;
			sWidthInfo= sTmp + lsSelCols.get(k)+"=100;" ;
		}
		lsFields.add("WidthInfo");
		lsValues.add(sWidthInfo);
		
		//Show Relationships
		if(sActivityView.ShowRelationships =="" || sActivityView.ShowRelationships == null)
			sActivityView.ShowRelationships = "true";
		lsFields.add("ShowRelationships");
		lsValues.add(sActivityView.ShowRelationships);
		
		//Activity Network/PERT Columns
		if(sActivityView.ActivityNetworkColumns != null){
			lsFields.add("SelectedPertColumns");
			lsValues.add(sActivityView.ActivityNetworkColumns);
		}
		
		//PertExpandToLevel
		if(sActivityView.PertExpandToLevel != null){
			lsFields.add("PertCollapseToLevel");
			lsValues.add(sActivityView.PertExpandToLevel);
		}
		
		//Assignment Columns
		if(sActivityView.SelectedAssignmentColumns != null){
			lsFields.add("SelectedAssignmentColumns");
			lsValues.add(sActivityView.SelectedAssignmentColumns);
		}
		
		//Expense Columns
		if(sActivityView.SelectedExpenseColumns != null){
			lsFields.add("SelectedExpenseColumns");
			lsValues.add(sActivityView.SelectedExpenseColumns);
		}
		
		//Issue Columns
		if(sActivityView.SelectedIssuesColumns != null){
			lsFields.add("SelectedIssuesColumns");
			lsValues.add(sActivityView.SelectedIssuesColumns);
		}
		
		//Selected Chart
		if(sActivityView.SelectedChart != null){
			lsFields.add("LastSelectedChart");
			lsValues.add(sActivityView.SelectedChart);
		}
		//First Bar
		if(sActivityView.FirstBarDisplayType == "" || sActivityView.FirstBarDisplayType == null){
			sActivityView.FirstBarDisplayType = PrimaveraBO_EnumType.BarType_CURRENT_BAR.getPrivilege();
		}
		if(sActivityView.FirstBarActivityCodeId != null){
			sActivityCode = "0,"+sActivityView.FirstBarActivityCodeId;
		}
		
		//Second Bar
		if(sActivityView.SecondBarDisplayType == "" || sActivityView.SecondBarDisplayType == null){
			sActivityView.SecondBarDisplayType = PrimaveraBO_EnumType.BarType_NO_BAR.getPrivilege();
		} 
		if(sActivityView.SecondBarActivityCodeId != null &&  sActivityView.SecondBarDisplayType != PrimaveraBO_EnumType.BarType_NO_BAR.getPrivilege()){
			if(sActivityCode.length() ==0)
				sActivityCode = "1,"+sActivityView.SecondBarActivityCodeId;
			else
				sActivityCode = sActivityCode+";1,"+sActivityView.SecondBarActivityCodeId;
		}
		
		//Third Bar
		if(sActivityView.ThirdBarDisplayType == "" ||  sActivityView.ThirdBarDisplayType == null){
			sActivityView.ThirdBarDisplayType = PrimaveraBO_EnumType.BarType_NO_BAR.getPrivilege();
		}
		if(sActivityView.ThirdBarActivityCodeId!= null && sActivityView.ThirdBarDisplayType != PrimaveraBO_EnumType.BarType_NO_BAR.getPrivilege()){
			if(sActivityCode.length() ==0)
				sActivityCode = "2,"+sActivityView.ThirdBarActivityCodeId;
			else
				sActivityCode = sActivityCode+";2,"+sActivityView.ThirdBarActivityCodeId;
				
		}
		lsFields.add("BarDisplayTypes");
		String tmp =sActivityView.FirstBarDisplayType+","+sActivityView.SecondBarDisplayType+","+sActivityView.ThirdBarDisplayType;
		lsValues.add(tmp);
		
		if(sActivityCode.length() >0){
			lsFields.add("ActivityCodeBars");
			lsValues.add(sActivityCode);
		}
		return BO_CreateBusinessObject("ActivityView", lsFields, lsValues).toString();
	}
	
	/* * Method Name : BO_CreateResourceTeam
	   * Author: Sravanthi
	   * Arguments: 
	   *	sResourceTeamName			 	: String, mandatory
	   *	lsResources						: List of String, mandatory
	   *	sUserName						: String, mandatory(can be empty)
	   * Purpose: Below method creates resource team 
	*/	
	Integer BO_CreateResourceTeam(String sResourceTeamName,List<String> lsResources,String sUserName) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		List<String>  laRetArgs;
		String laResources,sResId;
		String[] sResourceIds;
		List<String> params= new ArrayList<String>();
		laResources = BO_GetResourceId(lsResources);
		sResourceIds = laResources.trim().split(Pattern.quote("|"));
		sResId =sResourceIds[0];
		for(int i=1;i<sResourceIds.length;i++)
			sResId = sResId+ ","+ sResourceIds[i];
		String sActionName = "create-ResourcePortfolio";
		String sFields = "PortfolioName|ResourceList";
		String sFieldValues =   sResourceTeamName +"|"+ sResId;
		if(sUserName!=""){
			params.add("UserId");
			List<String> boUsersInfo =   BO_LoadBusinessObject("User", params, "UserName='"+sUserName+"'","");
			String sUserId = boUsersInfo.get(1);
			sFields = "PortfolioName|ResourceList|UserId";
			sFieldValues = sFieldValues+ "|" +sUserId;
		}
		params.clear();
		params.add(sActionName);
		params.add(sFields);
		params.add(sFieldValues);
		laRetArgs = Primavera_BOHelper.handleBO(params);
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
			return Integer.parseInt(laRetArgs.get(1).replace("]", "").replace("(", "").trim());
		else
				throw new PrimaveraException(laRetArgs.get(1));
		
	}

	/* * Method Name : BO_GetResourceId
	   * Author: Sravanthi
	   * Arguments: 
	   *	lsResources						: List of String, mandatory
	   * Purpose: Below method returns resourceid of specified resources 
	*/
	String BO_GetResourceId(List<String> lsResource){
		String sResourceNames ;
		List<String> params = new ArrayList<String> ();
		sResourceNames = lsResource.get(0);
		for(int nLoopCounter=1;nLoopCounter<lsResource.size();nLoopCounter++)
			sResourceNames = "'"+sResourceNames+"' , '"+lsResource.get(nLoopCounter)+"'";
		String sFilter = "ResourceName in ("+sResourceNames+")";
		String sFields = "ResourceId|ResourceName";
		params.add(sFields);
		params.add(sFilter);
		List<String> laRetArgs =  Primavera_BOHelper.loadBOs("Resource", params);
		
		return laRetArgs.get(1);
	}

	/* * Method Name : BO_CreateResourceCodeType
	   * Author: Sravanthi
	   * Arguments: 
	   *	sResourceCodeTypeName			: String, mandatory
	   *	bSecureCode						: String,mandatory (can be empty)
	   * Purpose: Below method creates resource codes
	*/
	Integer BO_CreateResourceCodeType(String sResourceCodeTypeName,String bSecureCode) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException{
		List<String> laRetArgs;
		List<String> params = new ArrayList<String>();
		if(bSecureCode =="")
			bSecureCode="false";
		String sActionName = "create-ResourceCodeType";
		String sFields = "ResourceCodeType|MaxCodeLength|SecureCodeFlag";
		String sFieldValues = sResourceCodeTypeName +"|"+20+"|"+bSecureCode;
		params.add(sActionName);
		params.add(sFields);
		params.add(sFieldValues);
		laRetArgs =Primavera_BOHelper.handleBO(params);
		
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
			return Integer.parseInt(laRetArgs.get(1).replace("]", "").replace("(", "").trim());
		else
			throw new PrimaveraException(laRetArgs.get(1));
	}

	/* * Method Name : BO_CreatePredecessor
	   * Author: Sravanthi
	   * Arguments: 
	   *	sActProjName					: String, mandatory
	   *	sActWBSName						: String,mandatory 
	   *	sActivityName					: String,mandatory
	   *	sPredProjName					: String,mandatory
	   *	sPredWBSName					: String,mandatory
	   *	sPredActivityName				: String,mandatory
	   *	sDepType						: String.mandatory(can be empty)
	   * Purpose: Below method creates predecessor
	*/
	Integer BO_CreatePredecessor(String sActProjName,String sActWBSName, String sActivityName, String sPredProjName, String sPredWBSName, String sPredActivityName, String sDepType) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException{
		//sDepType should be one of the following:
			// DependencyType_FINISH_TO_START
			// DependencyType_FINISH_TO_FINISH
			// DependencyType_START_TO_START
			// DependencyType_START_TO_FINISH 
		String sActionName = "Create-Dependency";
		String sFields,sFieldValues,sDepId;
		List<String> retArgs;
		List<String> boWBSAct;
		List<String> boWBSPredAct;
		List<String> boAct;
		List<String> boPredAct;
		List<String>  lsFields = new ArrayList<String>();
		lsFields.add("WbsId");
		lsFields.add("ProjectId");
		
		//get project, wbs and activity ids
		List<String> boProj = BO_LoadBusinessObject("Projwbs", lsFields,"Name = '"+sActProjName+"'","");
		String sProjectId = boProj.get(6).replace("ProjectId =", "").replace("]", "").trim();
		
		lsFields.clear();
		lsFields.add("WbsId");
		boWBSAct = BO_LoadBusinessObject("Projwbs", lsFields,"Name = '"+sActWBSName+"'","");
		String sWbsId = boWBSAct.get(1).trim();
		
		lsFields.clear();
		lsFields.add("ActivityId");
		lsFields.add("WbsId");
		boAct = BO_LoadBusinessObject("Activity", lsFields, "ActivityName = '"+sActivityName+"' AND WbsId = '"+boWBSAct.get(1).trim()+"'","");
		String sActId = boAct.get(1).trim();
		
		//get predecessor project and activity ids
		lsFields.clear();
		lsFields.add("WbsId");
		lsFields.add("ProjectId");
		List<String> boPredProj = BO_LoadBusinessObject("Projwbs", lsFields, "Name = '"+sPredProjName+"'","");
		String sPredProjectId = boPredProj.get(6).replace("ProjectId =", "").replace("]", "").trim();
		
		lsFields.clear();
		lsFields.add("WbsId");
		boWBSPredAct = BO_LoadBusinessObject("Projwbs",lsFields,"Name = '"+sPredWBSName+"'","");
	   
		lsFields.clear();
	    lsFields.add("ActivityId");
	    lsFields.add("WbsId");
		boPredAct = BO_LoadBusinessObject("Activity",lsFields,"ActivityName = '"+sPredActivityName+"' AND WbsId = '"+boWBSPredAct.get(1).trim()+"'","");
		String sPredActId = boPredAct.get(1).trim();
		
		if(sDepType == "")
			sDepType= PrimaveraBO_EnumType.DependencyType_FINISH_TO_START.getPrivilege();
		sFields = "WbsContextId|SuccessorProjectId|SuccessorActivityId|PredecessorProjectId|PredecessorActivityId|DependencyType";
		sFieldValues = sWbsId +"|"+sProjectId+"|"+sActId+"|"+sPredProjectId+"|"+sPredActId+"|"+sDepType;
		
		lsFields.clear();
		lsFields.add(sActionName);
		lsFields.add(sFields);
		lsFields.add(sFieldValues);
		List<String> laRetArgs = Primavera_BOHelper.handleBO(lsFields);
		if(Boolean.parseBoolean(laRetArgs.get(0).replace("[", "")))
			return Integer.parseInt(laRetArgs.get(1).replace("]", "").replace("(", "").trim());
		else
			throw new PrimaveraException(laRetArgs.get(1));
	}

	/* * Method Name : BO_CreatePredecessor
	   * Author: Sravanthi
	   * Arguments: 
	   * Purpose: Below method runs resource management job service
	*/
	Boolean BO_PublishResourceData() throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException, InterruptedException{
		List<String> boUserInfo,boJobInfo;
		List<String> params = new ArrayList<String>();
		List<String> lsValues = new ArrayList<String>();
		BO_DeleteBusinessObjectByFilter("JobService","JobType =  'JT_ResourceMgmt'");
		params.add("UserId");
		boUserInfo = BO_LoadBusinessObject("User",params,"Lower(UserName) = '"+sAdminUser.toLowerCase()+"'","");
		params.clear();
		params.add("Name");
		params.add("JobType");
		params.add("UserId");
		params.add("JobRecurringType"); 
		lsValues.add("Publish Resource Management");
		lsValues.add(PrimaveraBO_EnumType.JobType_RESOURCEMANAGEMENTSERVICE.getPrivilege());
		lsValues.add(boUserInfo.get(1));
		lsValues.add(PrimaveraBO_EnumType.JobRecurringType_WEBASAP.getPrivilege());
		String sJobId = BO_CreateBusinessObject("JobService",params,lsValues).toString();
		int iCount = 0;
		params.clear();
		params.add("JobStatus");
		boJobInfo =  BO_LoadBusinessObject("JobService",params,"JobId = '"+sJobId+"'","");
		while(!(boJobInfo.get(5).replace("JobStatus =", "").trim().equals("Completed")) && !(boJobInfo.get(5).replace("JobStatus =", "").trim().equals("Failed")) ){
			try{
				Thread.sleep(ApplicationProperties.getInstance().getWaitTime()*50);
			}finally{
				
			}
			if (++iCount > ApplicationProperties.getInstance().getWaitTime()*5){
				throw new PrimaveraException("ERROR: Failed to get Running status on job after "+iCount*ApplicationProperties.getInstance().getWaitTime()+"seconds.");
			}
			boJobInfo=BO_LoadBusinessObject("JobService",params,"JobId = '"+sJobId+"'","");
		}
		if (boJobInfo.get(5).replace("JobStatus =", "").trim().equals("Completed")){
			System.out.println("Publish Resource Data");
			return true;
		}else{
			throw new PrimaveraException("Publish Resource Data Failed after "+iCount*ApplicationProperties.getInstance().getWaitTime() +"seconds ");
		}
	}

}

		
	

	

