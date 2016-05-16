package com.oracle.pgbu.pages.p6Web15v2;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;

public class ProjectsPage extends WorkspacePage {
	/*
	 * Project search Text box
	 */
	@FindBy(id = "oui-typeahead-5")
	public WebElement searchProjectTxt;

	/*
	 * @author:Purabi Project close All
	 */
	@FindBy(xpath = "//*[@id='pgbu-dropdown-menu-30']/li[4]/a")
	public WebElement CloseAll;

	/*
	 * Add to Selected Projects List
	 */
	@FindBy(xpath = "//button[@title=' Add Projects to Selected Projects']/i")
	public WebElement addToSelectedProj;

	/*
	 * Save Button
	 */
	@FindBy(xpath = "//button[@title='Save']")
	public WebElement saveButton;

	/*
	 * Left Gear Icon
	 */
	@FindBy(xpath ="//td[contains(@id,'col-menu-button-column')]")
	public WebElement leftGearIcon;

	/*
	 * Add Activity option in Left Gear menu
	 */
	@FindBy(xpath ="//div[@title='Add Activity']")
	public WebElement leftGearAddActivity;

	/*
	 * Add Wbs option in Left Gear menu
	 */
	@FindBy(xpath = "//div[@title='Add Activity']")
	public WebElement leftGearAddWbs;

	/*
	 * Activity Name Field
	 */
	@FindBy(xpath = "//div[@id='1grid-cell-editor']/input")
	public WebElement activityNameInput;

	/*
	 * Ok button
	 */
	@FindBy(id = "op-double-assign")
	public WebElement openProjectOKButton;

	@FindBy(xpath = "//*[@id='grid-settings-dialog']/div[3]/button[3]")
	public WebElement Save;

	@FindBy(xpath = "//*[@id='master-panel']/div[1]/div/div[4]/button")
	public WebElement Action;

	@FindBy(xpath = "//ul[@id='pgbu-dropdown-menu-30']/li[5]/a")
	public WebElement closeall;

	@FindBy(xpath = "html/body/div[6]/div/div/div/div[2]/div[1]/div[2]/div/div[1]/div/div[14]/div[3]/table/tbody/tr[2]/td[1]/div/div[2]")
	public WebElement selectFirstActivity;

	@FindBy(xpath = "//td[contains(@id,'col-ActivityType')]")
	public WebElement selectActivityType;
	
	@FindBy(xpath = "//*td[contains(@id, 'col-RemainingDuration')]/div/div")
	public WebElement remainingDurations;

	@FindBy(xpath = "html/body/div[6]/div/div/div/div[2]/div[1]/div[2]/div/div[1]/div/div[14]/div[4]/table/tbody/tr[2]/td[3]/div/div")
	public WebElement remainingDuration;

	@FindBy(xpath = "html/body/div[6]/div/div/div/div[2]/div[1]/div[2]/div/div[1]/div/div[14]/div[4]/table/tbody/tr[3]/td[1]/div/div")
	public WebElement plannedStart;

	@FindBy(xpath = "html/body/div[6]/div/div/div/div[2]/div[1]/div[2]/div/div[1]/div/div[14]/div[4]/table/tbody/tr[3]/td[2]/div/div")
	public WebElement activityType;

	@FindBy(xpath = "//ul[starts-with(@id='oui-combobox']/li[1]/a")
	public WebElement activityTypedropdownvalue;

	@FindBy(xpath = "//div[starts-with(@id,'oui-calendar')]")
	public WebElement selectdatepicker;

	@FindBy(xpath = "//div[starts-with(@id,'oui-calendar')]/tr[4]/td[2]")
	public WebElement selectdate;

	@FindBy(xpath = "//div[@title=' Delete']")
	public WebElement leftGearDeleteActivity;
	
	
	@FindBy(xpath = "html/body/div[6]/div/div/div/div[2]/div[1]/div[2]/div/div[1]/div/div[14]/div[2]/table/tbody/tr[2]/td/div/div/div")
	public WebElement leftGearActivityIcon;
	
	// Navigate to Activities Page
	public void navigateToActivitiesPage() {
		sleep(2);
		m_driver.findElement(By.linkText("Projects")).click();
		sleep(4);
		m_driver.findElement(By.linkText("Activities")).click();
		sleep(4);
	}
	/*
	 * @author:Purabi
	 */

//	// Navigate to EPS Page
//	public void navigateToEPSPage() {
//		sleep(20);
//		m_driver.findElement(By.linkText("Projects")).click();
//		sleep(5);
//		m_driver.findElement(By.linkText("EPS")).click();
//		sleep(25);
//	}

	/*
	 * @author:Purabi
	 */

	// To Edit a particular Activity
	public void editActivityField(String value) {
		Actions builder = new Actions(m_driver);
		builder.doubleClick().perform();
		activityNameInput.sendKeys(value);
		sleep(5);
		leftGearIcon.click();
		saveButton.click();
	}

	/**
	 * @author:Purabi
	 */

	// To Select a particular Activity
	public void selectActivityName() {
		sleep(5);
		selectFirstActivity.click();
		sleep(5);
	}

	public void selectRemainingDuration() {
		sleep(5);
		remainingDuration.click();
		sleep(5);
	}

	public void selectplannedStart() {
		sleep(5);
		plannedStart.click();
		Actions builder = new Actions(m_driver);
		builder.doubleClick().perform();
		System.out.println("date picker opened");
		builder.moveToElement(selectdatepicker).build().perform();
		System.out.println("Moved");
		// selectdate.click();
		// System.out.println("clicked");
		builder.doubleClick().perform();
		System.out.println("date selected");
		sleep(2);
		leftGearIcon.click();
		saveButton.click();

	}

	public void selectactivityType() {
		sleep(5);
		String str = activityType.getText();
		System.out.println(str);
		activityType.click();
		activityType.click();
		System.out.println("dropdown opened");
		// java.util.List<WebElement>
		// dropdownoptions=m_driver.findElements(By.xpath("//ul[starts-with(@id='oui-combobox']/li"));
		// dropdownoptions.get(1).getText();
		// System.out.println(dropdownoptions.get(1).getText());
		// System.out.println(activitypes.get(2).getText());
		System.out.println("After activity type list");
		sleep(5);
		//activitypes.selectMenuItem(2);;
		System.out.println("Value selected");

	}

	

	// Navigate to Projects Page
	public void CloseAllProjects() {

		Actions builder = new Actions(m_driver);
		builder.moveToElement(Action).build().perform();
		Action.click();
		sleep(5);
		closeall.click();
		System.out.println("closed");
		/*
		 * if(closeAllLnk !=null && closeAllLnk.isEnabled()){
		 * closeAllLnk.click(); System.out.println("closed  all   projects"); }
		 */
		sleep(5);
	}

	/**
	 * Open a Project
	 * 
	 * @param projName
	 */
	public void openAProject(String projName) {
		// Switch to Open Projects Popup
		for (String handle : m_driver.getWindowHandles()) {
			m_driver.switchTo().window(handle);
		}
		// Search the Project to be opened
		searchProjectTxt.sendKeys(projName);
		searchProjectTxt.sendKeys(Keys.TAB);
		// Select the Project
		m_driver.findElement(By.xpath("//div[contains(@title,'" + projName + "')]")).click();
		addToSelectedProj.click();
		// Click on OK button
		openProjectOKButton.click();
		// Switch To main Window
		for (String handle : m_driver.getWindowHandles()) {
			m_driver.switchTo().window(handle);
		}
		sleep(2);
	}

	

	/**
	 * Add Activity
	 * 
	 * @param activityName
	 */
	public void addActivity(String activityName) {
		sleep(4);
		leftGearIcon.click();
		leftGearAddActivity.click();
		activityNameInput.sendKeys(activityName);
		saveButton.click();
		sleep(4);
	}
//
//	public void deleteActivity() {	
//		sleep(4);
//		Actions builder = new Actions(m_driver);
//		builder.doubleClick().perform();
//		
//		leftGearActivityIcon.click();
//		leftGearDeleteActivity.click();
//		saveButton.click();
//		sleep(4);
//	}

	
	 
}
