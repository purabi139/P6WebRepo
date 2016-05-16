package com.oracle.pgbu.bo;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import com.primavera.silktest.SilkTestAdapter;

public class Primavera_BOHelper {
	
	static List<String> asyncInvokeJavaServer(List<String> laArgs) throws PrimaveraException, NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException {
		List<String> laRetArgs = new ArrayList<String>();
		
		Object[] lists= new Object[laArgs.size()];
		for(int index=0;index<laArgs.size();index++)
		{
			lists[index]=laArgs.get(index);
		}
		
		
		Field f=new SilkTestAdapter(lists).getClass().getDeclaredField("m_masterOutList");  //Output
		f.setAccessible(true);
		
		String[] values=f.get(0).toString().split(",");
		
		for(String value: values){
			laRetArgs.add(value);
		}
		return laRetArgs;
		
	}	
	static List<String> handleBO(List<String> laArgs) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException{
		List<String> laRetArgs;
		List<String> laNewArgs = new ArrayList<String>();
		laNewArgs.add("MyPrimaveraBOFunction");
		for(String l: laArgs){
			laNewArgs.add(l);
		}
		laRetArgs = asyncInvokeJavaServer(laNewArgs);
		return laRetArgs;
	}
	static List<String> loadBOs(String sBOName, List<String> laArgs) {

		List<String>laRetArgs = null;
		List<String>laNewArgs = new ArrayList<String>();
		laNewArgs.add("MyPrimaveraBOFunction");
		laNewArgs.add("load-"+sBOName);
		if (laArgs!=null){
			for (String l:laArgs){
				laNewArgs.add(l);
			}
		}	
		try{
		laRetArgs = asyncInvokeJavaServer(laNewArgs);
		}
		
		catch(Exception ex){}
		/* NEED TO BE UPDATED
		if((laRetArgs.size()>3)){
			List<String> laBOArgs =laRetArgs;
			int iPrefixCount=4;
			int iBOCount=Int.parseInt(laRetArgs.get(3));
			int iBOFieldCount = ((laRetArgs.size())-iPrefixCount)/iBOCount-1;
			int iBOIndex,iFieldIndex;
			List<BOInfo> boInfos;
			
			for(iBOIndex = 0;iBOIndex<=iBOCount-1;iBOIndex++){
				BOInfo bo = {sBOName,GetField(laRetArgs[2],"|",iBOIndex+1),iBOFieldCount,{},{}};
			}
			
		}*/
				
		return laRetArgs;
	}
	
	
	static List<String> loadEPS(String sFields,String sFilter){
		List<String> laRetArgs;
		String sWhere = "(ProjectProjectFlag = 'N' AND ProjectFlag = 'Y')";
		if(sFilter!=Primavera_BOCommon.EMPTY){
			sWhere = sWhere+ "AND ("+sFilter+")";
		}
		return loadProjwbs(sFields,sWhere);
	}
	
	static List<String> loadProjwbs(String sFields, String sWhere){
		List<String> list =new ArrayList<String>();
		list.add(sFields);
		list.add(sWhere);
		return loadBOs("Projwbs",list);
	}
	
	//Sravanthi
	/* * Method Name : GetBOField
	   * Author: Sravanthi
	   * Arguments: 
	   * 	bo    		   : String, mandatory
	   * 	sFieldName     : String, mandatory
	   * Purpose: Below method  returns the specified value of specified field
	 */
	static String GetBOField(String bo, String sFieldName){
		int iIndex = (BOInfo.FieldNames).indexOf(sFieldName);
		if (iIndex > 0)
			return BOInfo.FieldValues.get(iIndex);
		else
			return null;
	}
	
	/* * Method Name : deleteBOs
	   * Author: Sravanthi
	   * Arguments: 
	   * 	sBOName    		 	: String, mandatory
	   * 	sFilter             : String, mandatory
	   * 	bIsBatchMode		: String, mandatory
	   * Purpose: Below method  deletes object or batch which matches which the specified filter
	*/
	static List<String> deleteBOs(String sBOName, String sFilter, String bIsBatchMode) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, PrimaveraException{
		List<String> laRetArgs;
		List<String> laNewArgs = new ArrayList<String> ();
		
		if ( (bIsBatchMode!=null) &&  ( Boolean.parseBoolean(bIsBatchMode)) ||   sFilter.contains("=")  || sFilter.contains("LIKE")){
			laNewArgs.add("MyPrimaveraBOFunction");
			laNewArgs.add("deleteBatch-"+sBOName);
		}
		else{
			laNewArgs.add("MyPrimaveraBOFunction");
			laNewArgs.add("delete-"+sBOName);
		}
	    laNewArgs.add(sFilter);
		laRetArgs = asyncInvokeJavaServer(laNewArgs);
		return laRetArgs;
			
	}

}






  
