package com.oracle.bo;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Field;

import com.primavera.silktest.SilkTestAdapter;

import fuego.log.Logger;

public class seleniumBO {

	String sAdminUser=null;
	String sAdminPwd=null;
	String sDBName=null;
	String sBootStrapLocation=null;
	
	seleniumBO(String sAdminUser,String sAdminPwd,String sDBName,String sBootStrapLocation) throws FileNotFoundException, IOException 
	{
		this.sDBName=sDBName;
		this.sAdminUser=sAdminUser;
		this.sAdminPwd=sAdminPwd;
		this.sBootStrapLocation=sBootStrapLocation;
		System.setProperty("primavera.bootstrap.home", sBootStrapLocation);
		loadBOSession(sAdminUser,sAdminPwd,sDBName);
	}
	
	seleniumBO getInstance() throws FileNotFoundException, IOException
	{
		return new seleniumBO(sAdminUser, sAdminPwd, sDBName, sBootStrapLocation);
	}
	
	void loadBOSession(String sUser,String sPwd,String sDBID)
	{
		Object[] newValues = new Object[4];
		newValues[0]="MyPrimaveraAdapterFunction";
		newValues[1]="setProperties";
		newValues[2]="session.myPrimavera.userName="+sUser+"|session.myPrimavera.password="+sPwd+"|session.myPrimavera.dbId="+sDBID;
		
		try{
			new SilkTestAdapter(newValues);
		}catch(Exception ex){
			System.out.println(ex.getLocalizedMessage());
		}
	}
		
	String BO_GetWBSID(String sProj) throws IllegalArgumentException, IllegalAccessException, SecurityException, NoSuchFieldException
	{
		Object[] newValues = new Object[4];
		newValues[0]="MyPrimaveraBOFunction"; //Method Name
		newValues[1]="load-Projwbs"; //Action
		newValues[2] = "";//Input
		newValues[3] = "(ProjectProjectFlag = 'Y' AND ProjectFlag = 'Y') AND (ProjectShortName in ('"+sProj+"'))"; //Input
		
		Field f=new SilkTestAdapter(newValues).getClass().getDeclaredField("m_masterOutList");  //Output
		f.setAccessible(true);
		
		String[] output=f.get(0).toString().split(",");
	
		String ret=null;
		if(output[0].contains("true")){    //Validations
			ret=f.get(0).toString().split(",")[1];
			if(ret.contains("|"))
				ret=ret.substring(0,5).trim();
			else
				ret=ret.trim();
		}
		
		return ret;
	}
		
	void BO_CreateProject(String ProjectID,String ProjectName)
	{	
		try{
			Object[] newValues = new Object[4];
			newValues[0]="MyPrimaveraBOFunction";
			newValues[1]="load-Projwbs";
			newValues[2] = "";
			newValues[3] = "ProjectProjectFlag = 'N' AND ProjectFlag = 'Y' order by WbsId";
			
			Field f=new SilkTestAdapter(newValues).getClass().getDeclaredField("m_masterOutList");
			f.setAccessible(true);
			String[] output=f.get(0).toString().split(",");
			String ret=null;
			if(output[0].contains("true")){
				ret=f.get(0).toString().split(",")[1];
				if(ret.contains("|"))
					ret=ret.substring(0,5).trim();
				else
					ret=ret.trim();
			}
			System.out.println(f.get(0).toString());
			Object [] newValues1 = new String[4];
			newValues1[0]="MyPrimaveraBOFunction";
			newValues1[1]="create-Projwbs";
			newValues1[2] = "ProjwbsType|ParentWbsId|ProjectShortName|Name";
			newValues1[3] = "Project|"+ret+"|"+ProjectID+"|"+ProjectName;
						
			new SilkTestAdapter(newValues1);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//.printStackTrace();
			System.out.println(e.getLocalizedMessage());
		}
		
		

	}
	/*
	 * Function : BO_CreateResource 	
	 *  
	 *
	*/
	void BO_CreateResource(String sRes)
	{	 
		try{
			Object[] newValues = new Object[4];	
			newValues[0]="MyPrimaveraBOFunction";
			newValues[1]="create-Resource";
			newValues[2] = "ResourceShortName|ResourceName|ResourceType|EmailAddress";
			newValues[3] = sRes+"|"+sRes+"|RT_Labor|"+sRes+"@primavera.com";
						
			new SilkTestAdapter(newValues);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(e.getLocalizedMessage());
		}
	}
		
	void BO_CreatePortfolio(String sPortfolio,String sProjectName) throws IllegalArgumentException, IllegalAccessException, SecurityException, NoSuchFieldException
	{
		String iWbsID=BO_GetWBSID(sProjectName).toString();
		System.out.println(iWbsID);
		Object[] newValues = new Object[4];
		
		newValues[0]="MyPrimaveraBOFunction";
		newValues[1]="create-ProjectPortfolio";
		newValues[2] = "PortfolioName|ProjectList";
		newValues[3] = sPortfolio+"|"+iWbsID;
		new SilkTestAdapter(newValues);
		
	}
    
	void BO_ResetAdminPreferences()
	{
		Object[] newValues = new Object[5];
		
		newValues[0]="MyPrimaveraBOFunction";
		newValues[1]="update-GlobalPreferences";
		newValues[2] = "1";
		newValues[3] = "MaxResourceIDLength|MaxRoleIDLength|MaxProjectIDLength|MaxWBSCodeLength|MaxActivityIDLength|MaxCostAccountIDLength";
		newValues[4]="12|20|20|20|20|20";
		new SilkTestAdapter(newValues);
		
	}

	Object[] loadBO(String sBOName, Object[] args)
	{
		if(args!=null)
		{
			
		}
	return null;
	}
	
	String asyncInvokeJavaServer(Object[] args)
	{
		Field list=null;
		String ret=null;
		try
		{
			list=new SilkTestAdapter(args).getClass().getDeclaredField("m_masterOutList");
			list.setAccessible(true);
			String[] output=list.get(0).toString().split(",");
			
			if(output[0].contains("true")){
				ret=list.get(0).toString().split(",")[1];
				if(ret.contains("|"))
					ret=ret.substring(0,5).trim();
				else
					ret=ret.trim();
			}
			System.out.println(output[0]);
		}
		catch(Exception ex)
		{
			ret=null;
			System.out.println(ex.getLocalizedMessage());
		}
	    return ret;
	}
	
	public static void main(String aa[]) throws Exception {
		String strBootStrapLocation=System.getProperty("user.dir")+"\\Utility\\";
		seleniumBO selBO = new seleniumBO("admin", "admin", "oca", strBootStrapLocation);
		
		//selBO.BO_CreatePortfolio("Port4512", "AP122");    // This is working fine
		//selBO.BO_ResetAdminPreferences();
		//selBO.BO_CreateResource("Srini");			// This is working fine
		selBO.BO_CreateProject("P0Srin1i", "P0Sri1ni");		// This is a road block
		
		//Write Delete method for all projects
		
		
	
	}
}