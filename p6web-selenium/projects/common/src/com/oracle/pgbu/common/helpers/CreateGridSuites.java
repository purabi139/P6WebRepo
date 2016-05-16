/**
 * 
 * This class is to create Suite Files dynamically in order to use these suites for execution on Selenium Grid
 * It Creates 4 Suite Files:
 * GridAcceptanceSuite: To execute only the tests with 'Acceptance' category
 * GridRegressionSuite: To execute only the tests with 'Regression' category
 * GridSRSSuite: To execute only the tests with 'SRS' category
 * GridAllTestsSuite: To execute ALL the tests without filtering any category
 * 
 * It creates the above suite files dynamically for the project specified in 'helper.properties' file
 * It is executed from build.xml of the project and will fetch the Test class files from respective project folder (like 'system-tests') and its sub-directories
 * 
 */
package com.oracle.pgbu.common.helpers;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.io.File;
import java.io.IOException;
import java.util.Properties;


public class CreateGridSuites {
	
	public String testClasses[] = new String[2];
	public String fileNames ="";
	public String importStatements ="";
	public static String HELPER_FILE = "helper.properties";
	public static Properties m_helper_properties = new Properties();
	public static String gridProject = "";
	static Properties prop = new Properties();
	
	public String absolutePath="";

	public static void main(String args[]) 
	{
		try {
			m_helper_properties.load(new FileInputStream(new File("../common/src/"+HELPER_FILE)));
			gridProject = m_helper_properties.getProperty("gridProject");
								
			CreateGridSuites createGridSuites = new CreateGridSuites();
			
			//Acceptance category suite creation
			createGridSuites.createSuite(gridProject, "GridAcceptanceSuite", "Acceptance");

			//Regression category suite creation
			createGridSuites.createSuite(gridProject, "GridRegressionSuite", "Regression");
			
			//SRS category suite creation
			createGridSuites.createSuite(gridProject, "GridSRSSuite", "SRS");

			//All tests suite creation
			createGridSuites.createSuite(gridProject, "GridAllTestsSuite", "All");
		
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    
	}
	
	/**
	 * 
	 * Creates the dynamic suite for tests execution on Selenium Grid
	 * @param suiteName: Name of the Dynamic Suite to be created
	 * @param includeCategory: Category of the tests to be executed in the suite 
	 * @throws IOException
	 * 
	 */
	public void createSuite(String gridProject, String suiteName, String includeCategory) throws IOException
	{
		fileNames ="";
		importStatements ="";
		
		String classesDetails[];
		String classesNames;
		String classesImportStatements;
		
			classesDetails = getTestClassNames("../"+gridProject);
			classesNames = classesDetails[0].replaceFirst(" , ","");
			classesImportStatements = classesDetails[1];
				
			FileOutputStream fout;   
  		    PrintStream prints;   

		    File file = new File("../common/src/com/oracle/pgbu/common/helpers/"+suiteName+".java"); 
			fout = new FileOutputStream(file);   
	        prints = new PrintStream(fout);   
	        prints.println("package com.oracle.pgbu.common.helpers;\n");
	        prints.println("import com.oracle.pgbu.common.categories.ParallelCategories;\n");
	    	prints.println("import org.junit.runner.RunWith;\n");
	        prints.println("import org.junit.runners.Suite.SuiteClasses;\n");
	        prints.println(classesImportStatements+"\n");
	           
	        if (!includeCategory.equals("All"))
	         {   
	       	  prints.println("import org.junit.experimental.categories.Categories.IncludeCategory;\n");
	       	  prints.println("import com.oracle.pgbu.common.categories."+includeCategory+";\n");
	       	
	          prints.println("@IncludeCategory("+includeCategory+".class)");
	           
	       	 }
	           
	        prints.println("@RunWith(ParallelCategories.class)");
	        prints.println("@SuiteClasses({ "+ classesNames +" })\n");
	        prints.println("public class "+suiteName+" { \n }");
	           
	        fout.close();   
	}
	
	
	/**
	 * 
	 * Reads the current directory and sub-directories and 
	 * fetches the '.class' files with names starting with 'Test', ending with '.class' and does not contain '$'
	 * 
	 * As this file will be called from build.xml in system-tests folder, 
	 * it will fetch the class files from project folder (like 'system-tests') and its sub-directories
	 * 
	 */
	public String[] getTestClassNames(String directoryName)
	{
	    File directory = new File(directoryName);
	    
        File[] fList = directory.listFiles();
 
        for (File file : fList){
            if (file.isFile()){
                if (file.getName().startsWith("Test") && file.getName().endsWith(".class") && !file.getName().contains("$"))
                {
                	//Class Names
                	fileNames = fileNames + " , " +file.getName();
                	
                	//create import statements from absolute paths
                	absolutePath = file.getAbsolutePath();
                   importStatements += "import "+absolutePath.substring(absolutePath.indexOf("com"),absolutePath.indexOf(".class")).replace("\\", ".")+";\n"; 
                   
                }
                
            } else if (file.isDirectory()){
            	getTestClassNames(file.getAbsolutePath());
            }
        }
    		
        testClasses[0]=fileNames;
        testClasses[1]=importStatements;

        return testClasses;
	}

}
