package com.oracle.pgbu.common.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Random;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.junit.Test;
import org.junit.experimental.categories.Category;
import org.openqa.selenium.JavascriptExecutor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.oracle.pgbu.common.categories.SRS;

public class AutomationUtils  {

	private final static String ENGLISH = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890";
	private final static String FRENCH = "àâçëèéêïôæüùû";
	private final static String GERMAN = "äöüßàáâèéëêìíïîòóõùúûñç";
	private final static String JAPANESE = "検索中�?�ページ�?�削";
	private final static String SIMPLIFIED_CHINESE = "为手到页教�?��?��?";
	private final static String TRADITIONAL_CHINESE = "從事銷售工作�?財務應有的�?知用";
	private final static String PORTUGESE = "á�?âÂàÀãÃëËÀ�?ÂÃÉÊ�?ÓÔÕÚÜüúõôóíêéãâáàÇç";
	private final static String RUSSIAN = "йцуКе�?гшЩЗхъФываПролдж�?�?Ч�?Митьбю";
	private final static String SPECIAL_CHARS = "+-$@!`~{}[]|\'\";:.><,?/#%^*()_=&";
	private final static String SPACE = " ";

	final static Logger logger = LoggerFactory.getLogger(AutomationUtils.class);

	public static String getInputString(int length, boolean includeSpecialChars, boolean includeSpace) {
		String extraChars = (includeSpecialChars) ? SPECIAL_CHARS : "";
		extraChars += (includeSpace) ? SPACE : "";

		switch (ApplicationProperties.getInstance().getLanguage()) {
		case FRENCH:
		case ITALIAN:
			return RandomStringUtils.random(length, FRENCH + extraChars).trim().replaceAll("(\\s)+", SPACE);
		case GERMAN:
			return RandomStringUtils.random(length, GERMAN + extraChars).trim().replaceAll("(\\s)+", SPACE);
		case JAPANESE:
			return RandomStringUtils.random(length, JAPANESE + extraChars).trim().replaceAll("(\\s)+", SPACE);
		case PORTUGESE:
			return RandomStringUtils.random(length, PORTUGESE + extraChars).trim().replaceAll("(\\s)+", SPACE);
		case RUSSIAN:
			return RandomStringUtils.random(length, RUSSIAN + extraChars).trim().replaceAll("(\\s)+", SPACE);
		case SIMPLIFIED_CHINESE:
			return RandomStringUtils.random(length, SIMPLIFIED_CHINESE + extraChars).trim().replaceAll("(\\s)+", SPACE);
		case TRADITIONAL_CHINESE:
			return RandomStringUtils.random(length, TRADITIONAL_CHINESE + extraChars).trim().replaceAll("(\\s)+", SPACE);
		default:
			return RandomStringUtils.random(length, ENGLISH + extraChars).trim().replaceAll("(\\s)+", SPACE);
		}
	}

	public static String getInputString(int length, boolean includeSpecialChars) {
		return getInputString(length, includeSpecialChars, false);
	}

	public static String getInputString(int length) {
		return getInputString(length, false);
	}

	/**
	 * A helper function, Returns a random number between a range
	 * 
	 * @param floor
	 *            lowest number in range
	 * @param ceiling
	 *            highest number in range
	 */

	public static int getRandomInt(int floor, int ceiling) {
		Random rnd = new Random();
		return rnd.nextInt(ceiling - floor) + floor;
	}
	
	
	
	/**
	 * A helper function, Returns a IE browser version
	 * 
	 */

	public static String getIEBrowserVersion() {
		String version="";
	try {
		Process p = Runtime.getRuntime().exec("reg query \"HKLM\\Software\\Microsoft\\Internet Explorer\" /v Version");
		BufferedReader getStdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));
		String s = null;
		ArrayList<String> output = new ArrayList<String>();
		while ((s = getStdInput.readLine()) != null)
		output.add(s);
		String internet_explorer_value = (output.get(2));
		version = internet_explorer_value.trim().split("   ")[2].substring(0,2);
	  } catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	  }
		return version;
	}
	
	
	/**
	 * A helper function, Returns a File Download Status
	 * 
	 */
	
	public static boolean verifyFileDownload(String fileDowloadedName)

	{
	    File f = new File(fileDowloadedName);
	    if(f.exists()){
	    	try
	    	{
			  System.out.println("File has Downloaded");
			  return true;
	    	}
	    	catch(Exception e)
	    	{
			  System.out.println("File had not Downloaded!");
			  return false;
		    }
	    }			
	    return false;
	  }
	
	
	/**
	 * 
	 * @param seconds
	 *            number of seconds to sleep as a double value eg. 0.5.
	 */
	public static void sleep(final Double seconds) {
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
	public static void sleep(final int seconds) {
		sleep(new Double(seconds));
	}
	
	/**
	 * Checks if Page is loaded
	 * @return true if page is ready
	 */
	public static boolean isPageReady() {
		JavascriptExecutor javascriptExecutor = (JavascriptExecutor) ApplicationProperties.getInstance().getDriver();
		boolean docReadyState;

		// Document ready State
		docReadyState = (Boolean) javascriptExecutor.executeScript("return document.readyState == 'complete'");
		
		if (docReadyState)
		{
			logger.info("Page "+ApplicationProperties.getInstance().getDriver().getTitle()+" Loaded Successfully");
			return docReadyState;
		}else{
			try{
			logger.info("Page "+ApplicationProperties.getInstance().getDriver().getTitle()+" Loading Failed");
			}catch(Exception e){
				logger.info("Failure in getting Page Title - "+e.getLocalizedMessage());
			}
			return (docReadyState);
		}
	}
	
	/**
	 * Function get Today's date
	 * @return
	 */
	public static String getTodaysDate()
	{
		   //get current date time with Date()
		   Date date = new Date();
		   DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
		   //get current date time with Calendar()
		   //Calendar cal = Calendar.getInstance();
		   return dateFormat.format(date);		
		
	}
	
	/**
	 * Function get Today's date
	 * @return
	 */
	public static String getTodaysDateAndTime()
	{
		   //get current date time with Date()
		   Date date = new Date();
		   DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		   //get current date time with Calendar()
		   //Calendar cal = Calendar.getInstance();
		   return dateFormat.format(date);		
		
	}
	
	/**
	 * Returns today's date in expected format
	 * @param expectedFormat
	 * @return
	 */
	public static String getTodaysDateWithFormat(String expectedFormat)
	{
		   //get current date time with Date()
		   Date date = new Date();
		   DateFormat dateFormat = new SimpleDateFormat(expectedFormat);
		   //get current date time with Calendar()
		   //Calendar cal = Calendar.getInstance();
		   return dateFormat.format(date);		
		
	}
	
	public static void tempDataCleanup(String tempDataPath)
	{
	
	File index = new File(tempDataPath);
	if (!index.exists())
	{
	     index.mkdir();
	     System.out.println("Temp Dir Not present. Creating new one!");
	}
	try {
		FileUtils.cleanDirectory(index);
		System.out.println("Temp Dir deleted successfully");
		index.mkdir();
		System.out.println("Temp Dir created successfully");
	} catch (IOException e) {
		//e.printStackTrace();
	}
	}
}
