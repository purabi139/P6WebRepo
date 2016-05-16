package com.oracle.pgbu.bo;



public class seleniumBO {
	
	public static void main(String aa[]) throws Exception {
		Primavera_BOCommon common =Primavera_BOCommon.getInstance();
		
		//ProjectDetails tProjectDetails = null;
		//tProjectDetails.ProjectName= "Sample123";
		//tProjectDetails.ProjectId="Sample123";
		
		//common.BO_CreateProject(tProjectDetails);
		
		
		//System.out.println(common.BO_GetProjectId("Sample13"));
		//System.out.println(common.BO_GetProjectWBSId("Sample13"));
		
		
		
		//common.BO_CreatePortfolio("Port4512", "AP122");    // This is working fine
		//common.BO_ResetAdminPreferences();
		//common.BO_CreateResource("Srini");			// This is working fine
		//common.BO_CreateProject("P0Srin1i", "P0Sri1ni");		// This is working fine
		common.BO_CreateRole("Role99", "Role919");
		
	}
}