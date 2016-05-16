package com.oracle.pgbu.pages.p6Web15v2;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.objects.core.Button;
import com.oracle.pgbu.common.objects.jq.RadioButton;
import com.oracle.pgbu.common.objects.jq.TextBox;
import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.oracle.pgbu.pages.BasePage;

/*
 * Class file containing Page objects related to Workspace page
 */
public class WorkspacePage extends BasePage {
	BasePage m_basePage = new BasePage();
	int appWaitTime = ApplicationProperties.getInstance().getWaitTime();
	
	//Date From Calendar button in Resource Manager
	@FindBy(css = "input[title='Date From']")
    public Button dateFromButton;
	
	//Date From Calendar button in Resource Manager
	@FindBy(css = "input[name='from_date']")
    public TextBox fromDateTextBox;
	
	//Date From Calendar button in Resource Manager
	@FindBy(css = ".buttonpopup[value='OK']")
	public TextBox resourceMgrOkButton;
	
	//Date To Calendar button in Resource Manager
	@FindBy(css = "input[title='Date To']")
	public Button dateToButton;
	
	//Date From Calendar button in Resource Manager
	@FindBy(css = "input[name='to_date']")
	public TextBox toDateTextBox;
	
	//Open Button on Projects -> Projects(Standard) page
	@FindBy(css = ".dijitReset:contains('Open')")
    public Button projOpenButton;


	//Open Button on Projects -> Projects(Standard) page
	@FindBy(css = ".clMenu:contains('Open')")
    public Button workspaceOpenButton;

	//Open Button on Projects -> Projects(Standard) page
	@FindBy(css = "span[id=mainToolBar_Open_label]")
    public Button commonWorkspaceOpenButton;
	
	//New Button down Arrow on Cost Manager -> Cost Sheet page
    @FindBy(css = "td[id=NewArrow]")
    public Button newButtonArrow;
    
    //Find Button
    @FindBy(css = "a[id=ToolBarFindTool_a]")
    public Button findMenuBtn;
    
    //Find Button
    @FindBy(css = "a[id=FindTool_a]")
    public Button commonFindBtn;
    
    //Find Button
    @FindBy(css = "span[id=mainToolBar_Find_label]")
    public Button commonFindMenuBtn;
    
  //Find Button
    @FindBy(css = "input[name=searchfor]")
    public TextBox srchTxtBox;
        
    //Find TextBox
    @FindBy(css = "input[id=searchforid]")
    public TextBox searchTxtBox;

    //Find TextBox
    @FindBy(css = "input[name=searchfor]")
    public TextBox commonSearchTxtBox;

    //Search Button
    @FindBy(css = "input[name=searchbtn]")
    public Button searchBtn;
    
    //Search Button
    @FindBy(css = "span[id=mainToolBar_Find_label]")
    public Button projFindBtn;
    
	//Worksheet Menu Item under New Button on Cost Manager -> Cost Sheet page
    @FindBy(css = "a[id=menu_copyTemplate]")
    public Button workSheetMenuItem;
    
	//Copy From Template under New Button on Cost Manager -> Cost Sheet page -> Worksheet
    @FindBy(css = "a[id=menu_wsnewcopyTemplate]")
    public Button copyFromTempate;
    
	//Open Button on Projects -> Projects(Standard) page
	@FindBy(css = ".clMenu:contains('Open')")
    public Button commonOpenButton;
	
	//New Button on Projects -> Projects(Standard) page
	@FindBy(css = ".clMenu:contains('New')")
	public Button commonNewButton;
	
	//New Button on Projects -> Projects(Standard) page
	@FindBy(css = ".clMenu:contains('Copy')")
	public Button commonCopyButton;
	
	//Open Button on Projects -> Projects(Standard) page
	@FindBy(css = ".clMenu:contains('Delete')")
    public Button commonDeleteButton;
	
	//// OK button on CostManager -> Cost sheet -> project cost sheet -> columns -> New
	@FindBy(css = "input[value=OK]")
    public Button commonOkButton;
	
	// OK button on CostManager -> Cost sheet -> project cost sheet -> columns -> New
	@FindBy(css = "input[value=Close]")
    public Button commonCloseButton;
	
    //yes button on CostManager -> Cost sheet -> project cost sheet -> columns -> columns log -> Column Properties -> Delete -> Confirmation
	@FindBy(css = "input[name='Yes']")
	public Button commonYesButton;
	
	//Columns button on CostManager -> Cost sheet -> Worksheet Radion button 
	@FindBy(css = ".fonttopbar4:contains('WorkSheet')>input")
	public Button workSheetRadionBtn;
	 
	//Columns button on CostManager -> Worksheet
	@FindBy(css = ".input[name=bfieldname]")
	public TextBox workSheetTxtBox;
	 
	 
	//Workspace > New Arrow > Manual
	@FindBy(css = "a[id=ManualTool_a]")
	public Button workSpaceManualMenuItemBtn;
	
	//Workspace > New 
	@FindBy(css = "a[id=NewTool_a]")
	public Button workSpaceNewBtn;
	 
	//New Button down Arrow on Logs -> BP Name
	@FindBy(css = "td[id=NewArrow]")
	public Button newButtonArrowLogsBtn;
		    
	//Bp name Menu Item under New Button on Logs -> Bp name
	@FindBy(css = "a[id='usbc1Tool_a']")
	public Button LogsMenuItemBtn;
	 
	//Find Button in project -> setup -> bussiness process 
    @FindBy(css = "a[id=FindTool_a]")
    public Button bpFindMenuBtn;
    
	//Find Button in Reoprts  -> Userdefined report -> bussiness process 
    @FindBy(css = "a[id=FindBarTool_a]")
    public Button reportFindMenuBtn;
    
    //Find TextBox
    @FindBy(css = "input[name=searchfor]")
    public TextBox bpSearchTxtBox;
    
    //Title on Title -> Colloboration Tasks
	@FindBy(how = How.ID, using = "u3_title")
	public TextBox titleTxtBox;
	
	//Added by Suresh
	//Open Button on Companies->Partner Companies page
	@FindBy(css = ".clMenu:contains('Add')")
    public Button commonAddButton;
	
	//Open Button on Companies->Partner Companies->Add Partner Companies page
	@FindBy(css = ".clMenu:contains('Add Member')")
    public Button commonAddMemberButton;

	//Remove Button on Partner Companies page
	@FindBy(css = ".clMenu:contains('Remove')")
    public Button commonRemoveButton;
	
    //Find Button
    @FindBy(css = "input[id=findview_search]")
    public Button commonSearchBtn;
    
	//Copy Menu Item under Copy in Logs->BP
    @FindBy(css = "a[id=CopyTool_na]")
    public Button copyButtonArrow;
    
    //Copy Menu Item under Copy in Logs->BP
    @FindBy(css = "a[id=WOATool_a]")
    public Button copyDropDownWOABtn;
    
	//Open Button on Projects -> Projects(Standard) page
	@FindBy(css = "input[value=OK]")
    public Button notificationOKButton;
	
    //Find TextBox
    @FindBy(css = "div[id=spanFind] input[name=record_no]")
    public TextBox recordNoSearchTxtBox;
    
	// Add button on users/group picker window
	@FindBy(css = "input[id=add]")
    public Button userAddButton;
	
	// Add button on users/group picker window
	@FindBy(css = "input[id=ok_btn]")
    public Button userOKButton;
	
	//Menu Items under Logs->BP->CopyWOA window
    @FindBy(css = ".fonttopbar4:contains('-Select-')")
    public Button workFlowActionsSelectDropDown;
    
	//Menu Items under Logs->BP->CopyWOA window
    @FindBy(css = ".clMenu:contains('Send')")
    public Button workFlowActionsSendBtn;
    
	//Work Package Menu Item under New Button on Cost Manager -> Cost Sheet page
    @FindBy(css = "a[id=menu_wp]")
    public Button WorkPkgMenuItem;		//Suresh
    
	//// OK button on CostManager -> Cost sheet -> project cost sheet -> columns -> New
	@FindBy(css = "input[value=Cancel]")
    public Button commonCancelButton;

	//Update Structure button on CostManager -> Commitment Summaries
	@FindBy(css = "a[id=IconUpdateStructureTool_a]")
    public Button update_StructureButton;
	
	//Columns Button on CostManager -> Commitment Summaries -> Update Structure
	@FindBy(css = "a[id=IconColumnsTool_a]")
	public Button columnsButton;
		
	//Active Names Users in PartnerCompaniesUsers -> Login with admin user -> Adimn Mode -> Companies -> U90All -> License Manager -> Open
	@FindBy(css = "input[id=txt_active_partner_max]")
	public TextBox ActiveNamesUsersTxtBox;
	
	// OK button on CostManager -> Cost sheet -> project cost sheet -> columns -> New
	@FindBy(css = ".menuButton[innerText=Edit]")
    public Button commonEditButton;
	
	// View button on Record Window -> Company Logs -> Record ->
	@FindBy(css = ".menuButton[innerText=View]")
    public Button commonviewButton;
	
	// File button on Record Window -> Company Logs -> Record ->
	@FindBy(css = ".menuButton[innerText=File]")
    public Button commonFileBtn1;
	
	//// Date button on CostManager -> Cost sheet
	@FindBy(css = "td[id=colHeadingTDWorkPackage2]")
    public Button commonDateButton;
	
	
	//Remove Button on Partner Companies page
	@FindBy(css = ".menuButton[id='FileMenu_a']")
    public Button commonFileButton;
	
	
	//Template Buton in Workspace
	@FindBy(css = "a[id=BPTemplatesMenu_a]")
	public Button commonTemplateButton;
	
	//Template Buton in Workspace - Bookmarks
	@FindBy(css = "a[innertext=Bookmarks]")
	public Button commonBookMarksLink;
	
	//QATemplate Bookmarks name in the bookmark popup
	@FindBy(css = "a[title='QA_Template_Copy1 - Home']")
	public Button QATemplateCopy1BookMarkButton;
	
	//seetha Bookmarks name in the bookmark popup
	@FindBy(css = "a[title='Seetha Bookmark Program - Cash Flow']")
	public Button seethaBookMarkButton;
	
	//Status Button on Gates -> Admin Mode
	@FindBy(css = "a[id=StatusTool_a]")
	public Button commonStatusButton;
	
	//Inactive Button on Status -> Gates -> Admin Mode
	@FindBy(css = "a[id=InactiveTool_a]")
	public Button inactiveButton;
	
	//active Button on Status -> Gates -> Admin Mode
	@FindBy(css = "a[id=ActiveTool_a]")
	public Button activeButton;
	
	// Bulk Edit button on Edit Menu -> Company workspace ->company logs -> record -> edit
    @FindBy(css = ".menuItem[id='Bulk EditMenu_a']")
	public Button commonLogsBulkEditButton;
    
    //Bulk Edit button on Edit Menu -> Home -> master logs -> record -> edit
    @FindBy(css = "span[innerText='Bulk Edit']")
	public Button commonMasterLogsBulkEditButton;
    
    //Saved Searches button on Edit Menu -> Home -> master logs -> record -> edit
    @FindBy(css = "span[innerText='Saved Searches']")
	public Button commonMasterLogsSavedSearchesButton;
    
 // copy menu item under copy in logs->BP (workspacePage)
    @FindBy(css = "a[id=WATool_a]")
    public Button copyDropDownWABtn;

    //Date Picker - Today button
    @FindBy(css = "input[value=Today]")
    public Button commonTodayBtn;
    
    //Date Picker - Future Date
    @FindBy(css = "td[innerText='28']")
    public Button futureDateBtn;
    
    //Apply button on CostManager -> Cost sheet -> project cost sheet -> columns -> New
	@FindBy(css = "input[value=Apply]")
    public Button commonApplyButton;
	
	// Text box for rule name in 'Edit Rule' window> Home-> cmpny wrkspace -> template -> rules -> new
    @FindBy(css = "input[name=rule_name]")
    public TextBox ruleNameTxtBox;
    
    // Rule tab in 'Edit Rule' window > Home -> cmpny wrkspace -> template -> rules -> new -> rules
    @FindBy(css = "td[id=TabRule]")
    public Button rulesTab;
    
    // Formula button for limit expression in 'Edit Rule' window > Home -> cmpny wrkspace -> template -> rules -> new -> rules
    @FindBy(css = "input[id=ruleLimitExpressionButton]")
    public Button formulaLimitExpBtn;
    
    // Formula button for Data expression in 'Edit Rule' window > Home -> cmpny wrkspace -> template -> rules -> new -> rules
    @FindBy(css = "input[id=ruleDataExpressionButton]")
    public Button formulaDataExpBtn;
    
    // Zero button in Formula creation window for new rules> Home -> cmpny wrkspace -> template -> rules -> new -> rule -> formula
    @FindBy(css = "input[id=btn0]")
    public Button zeroButton;
    
    // Five button in Formula creation window for new rules> Home -> cmpny wrkspace -> template -> rules -> new -> rule -> formula
    @FindBy(css = "input[id=btn5]")
    public Button fiveButton;
    
    // Select button in formula creation window for new rule>Home -> cmpny wrkspace -> template -> rules -> new -> rule -> formula
    @FindBy(css = "input[id=btnsel]")
    public Button selectBtn;
    
    // Apply button in Edit rule window for new rules > Home -> cmpny wrkspace -> template -> rules -> new -> rule
    @FindBy(css = "input[name=btn_apply]")
    public Button applyBtn;
    
    // Text area to enter message when rule fails > Home -> cmpny wrkspace -> template -> rules -> new -> rule
    @FindBy(css = "textarea[name=rule_message]")
    public TextBox ruleMessageTxtBox;
    
    // Validate button in tool bar for rules > Home -> cmpny wrkspace -> template -> rules
    @FindBy(css = "a[id=ValidateBarTool_a]")
    public Button validateButton;
    
    // activate button in tool bar for rules > Home -> cmpny wrkspace -> template -> rules
    @FindBy(css = "a[id=ActivateBarTool_a]")
    public Button activateButton;
    
    //Company Workspace -> user mode -> company logs -> open BP -> Grid -> users -> find
 	 @FindBy(css = "input[name=uuu_user_firstname]input[class='input findDe']")
 	 public TextBox firstNameSearchTextBox;	 
 	 
 	//Search Button to find user >  Company Workspace -> user mode -> company logs -> open BP -> Grid -> users -> find
 	@FindBy(css = "input[value=Search]")
 	public Button searchUserBtn;
 	
 	//Open button in assets window >Company Workspace -> user mode -> company logs -> open BP -> Grid -> assests ->open
 	 @FindBy(css = "a[id=IconOpenTool_a]")
 	 public Button openAssetBtn;
 	 
 	// Projects/Shell tab in program activity sheet > company workspace -> admin mode -> programs
  	@FindBy(css = "td[id=TabMProjects]")
  	public Button projectShellButton;
  	
  	// Add button in Projects/Shell tab in program activity sheet > company workspace -> admin mode -> programs
  	@FindBy(css = "input[value=Add]")
  	public Button projectAddBtn;

     //OK Button in projects 
 	@FindBy(css = "input[value=OK]input[class=buttonpopup]")
   public Button projectOkButton;
 	
 	 //OK Button in projects 
 	@FindBy(css = "input[value=Cancel]input[class=buttonpopup]")
   public Button projectCancelButton;

 	//remove Button in projects
 	@FindBy(css = "input[value=Remove]input[class=buttonpopup]")
 	   public Button projectRemoveButton;

    //Add button
   @FindBy(css = "a[id=AddTool_a]")
     public Button projAddBtn;
   
 //New Button to create a new resource> company Workspace ->  Resource Manager -> resources
 	@FindBy(css = "a[id=IconNewTool_a]")
 	public Button newResourceBtn;
 	
 	//Resource capacity text box to create new resource> company Workspace ->  Resource Manager -> resources
 	@FindBy(css = "input[id=uuu_resc_capacity]")
 	public TextBox resourceCapacityTxtBox;
 	
   
 	//add button to add roles while creatring resources>  company Workspace ->  Resource Manager -> resources
 	@FindBy(css = "input[id=addrole]")
 	public Button addRolesButton;
 	
 	//Role name text box in creating new role > company Workspace ->  Resource Manager -> roles
 	@FindBy(css = "input[id=uuu_role_name]")
 	public TextBox roleNameTextBox;
 	
 	//select Button in roles to select effective currency >> company Workspace ->  Resource Manager -> roles
 	@FindBy(css = "input[id=selectcurrbtn]input[class=buttonpopupsmall]")
 	public Button selectCurrencyBtn;
 	
 	//add button to add rates >company Workspace ->  Resource Manager -> roles > new > Rates 
 	@FindBy(css = "input[id=addrate]input[class=buttonpopupsmall]")
 	public Button addRateBtn;
 	
 	//Effective date picker button >company Workspace ->  Resource Manager -> roles > new > Rates
 	@FindBy(xpath = "//input[@name='effdatebtn']")
 	public Button effectiveDateBtn;
 	
 	//Standard rate text box 
 	@FindBy(css = "input[id=stdrate]")
 	public TextBox stdRateTxtBox;

       // Open Button in Select BO window  > Home -> Master Logs -> Records -> New -> create in shell -> Shell picker window -> Select button -> Select BO button in create record window
	@FindBy(css = "a[id=OpenTool_a]")
	public Button boOpenBtn;
	
	//Title textbox in creatinfg payment applications 
		@FindBy(css = "input[id=uscfp_title]")
		public TextBox paymentAppTitleTextBox;
		
		//Add line item on Logs -> New BP
		@FindBy(how = How.ID, using = "addlineitem")
		public Button addButton;
		
		// Add Deatil line item button arrow Logs-BP-CopyWOA window
		@FindBy(css = ".menuItemNew:contains('Detail Line Item')")
		public Button addDetailLineItemButton;
		
		// Asset name text box > company workspace > asset manager > new > asset name text box
		@FindBy(css = "input[id=uam_uuu_asset_name]")
		public TextBox assetNameTextBox;
		
		// Asset name text box > company workspace > asset manager > new > asset acquisition text box
		@FindBy(css = "input[id=uam_uuu_asset_acquisition_cost]")
		public TextBox assetAcquisitionCostTextBox;
		
		// Asset name text box > company workspace > asset manager > new > asset acquisition date picker
		@FindBy(css = "input[id=CalArrow_uuu_asset_acquisition_date]")
		public Button assetAcquisitionDatePickerBtn;
		
		// Asset name text box > company workspace > asset manager > new > asset depreciation text box
		@FindBy(css = "input[id=uam_uuu_asset_depreciation_prd]")
		public TextBox assetDepreciationTextBox;
		
		// Asset name text box > company workspace > asset manager > new > asset depreciation text box
		@FindBy(css = "input[id=uam_title]")
		public TextBox assetTitleTextBox;
				
		// Asset name text box > company workspace > asset manager > new > asset depreciation text box
		@FindBy(css = "input[id=uam_uuu_asset_salvage_value]")
		public TextBox assetSalvageValueTextBox;
		
		// Asset name text box > company workspace > asset manager > new > asset depreciation text box
		@FindBy(css = "input[id=uam_short_desc]")
		public TextBox assetShortDescTextBox;
		
		//finish button in Create Record window -> Company Workspace -> Company Logs -> Records -> New
		@FindBy(css = "a[id=xeditrecordTool_a]")
		public Button finishEditingBtn;
		
		//close window button in asset sheet
		@FindBy(css = "a[id=CloseTool_a]")
		public Button closeAssetSheetBtn;

	    //Copy from button -> company workspace > templates > projects > workflow setup > copy from on tool bar
		@FindBy(css = "a[id='Copy From...Tool_a']")
		public Button copyFromButton;
		
		//Copy from button -> company workspace > templates > projects > workflow setup > copy from on tool bar > project/shell
		@FindBy(css = "a[id='Project/Shell...Tool_a']")
		public Button copyFromProjectShellBtn;
		
		//Copy workflow button -> company workspace > templates > projects > workflow setup > copy from on tool bar > project/shell
		@FindBy(css = "a[id=CopyTool_a]")
		public Button copyWfButton;
		
		//Setup name for workflow after copying > company workspace > templates > projects > workflow setup > copy from on tool bar > project/shell
		@FindBy(css = "input[name=name]")
		public TextBox workflowSetupNameTxtBox;
		
		//Copy from button -> company workspace > templates > projects > workflow setup > copy from on tool bar
		@FindBy(css = "a[id='Templates...Tool_a']")
		public Button copyFromTemplatesButton;
		
		//update shells button > company workspace > admin mode > BP > workflow setup 
		@FindBy(css = "a[id='Update ShellsTool_a']")
		public Button updateShellsButton;
		
		//update shells button > company workspace > admin mode > BP > workflow setup > update shells
		@FindBy(css = "a[id='Shells...Tool_a']")
		public Button updateSingleShellButton;
		
		//update shells button > company workspace > admin mode > BP > workflow setup > update shells
		@FindBy(css = "a[id='All ShellsTool_a']")
		public Button updateAllShellButton;
		
		//update shells button > company workspace > admin mode > BP > workflow setup > update shells
		@FindBy(css = "a[id='History...Tool_a']")
		public Button updateHistoryButton;
        
		//Apply changes to shell, update button >Company Workspace -> User Administration -> Groups
		 @FindBy(css = "a[id=UpdateProjectTool_a]")
		 public Button finalUpdateButton;
		 
		 //Update button >Company Workspace -> User Administration -> Groups
		 @FindBy(css = "a[id='Update ProjectsTool_a']")
		 public Button updateProjectBtn;
		 
		//update projects button > company workspace > admin mode > BP > workflow setup > update projects
		@FindBy(css = "a[id='Projects...Tool_a']")
		public Button updateSingleProjectButton;
		
		//update projects button > company workspace > admin mode > BP > workflow setup > update projects
		@FindBy(css = "a[id='All ProjectsTool_a']")
		public Button updateAllProjectButton;
		
		//Settings tab on workflow Setup Window -> Admin Mode -> Setup -> workflow setup
		@FindBy(css = "td[id=TabSettings]")
		public Button settingsTab;
		
		 // User/Group Picker window > Add Button
		 @FindBy(css = "input[name=add_btn]")
		 public Button addBtn;

		 // User/Group Picker window > Search Button
		 @FindBy(css = "input[name=ok_btn]")
		 public Button okBtn;
    
		//New Button on BP logs---Added by Madhavi
		@FindBy(css = "a[id=NewTool_a]")
		public Button newBPlogButton;
		    
		//Open Button on BP Logs---Added by Madhavi
		@FindBy(css = "a[id=OpenTool_a")
		public Button openBPlogButton;
		    
		//Send button on the BP form--Added By Madhavi
		@FindBy(css = "a[id=xsendTool_a]")
		public Button sendBPButton;
		    
		//Accept task Button for BP form--Added by madhavi
		@FindBy(css = "a[id=xaccept_taskTool_a]")
		public Button AcceptTaskBPButton;
		   
		//Find window Title---Added by madhavi
		@FindBy(css = "div[id=spanFind] input[name=title]")
		public TextBox titleSearchTxtBox;
		
		//No button 
		@FindBy(css = "input[name='No']")
		public Button commonNoButton;


	//add button in booking resource sheet
			@FindBy(css = "a[id=iconAddTool_a]")
			public Button addBookingSheetBtn;
			
			//Non project radio button
			@FindBy(css = "input[id=project_booking_form]input[value=1]")
			public RadioButton nonProjectRadioButton;
			
			//select resource button in resource booking window 
			@FindBy(css = "input[id=selectresc]")
			public Button selectResouceNameButton;
			
			//close window button
			 @FindBy(css = "a[id=iconCloseTool_a]")
			 public Button closeWindowIconButton;
		
	       //From date calendar picker
			 @FindBy(css = "input[id=CalArrow_uuu_from_date]")
			 public Button fromDateResourceButton;
			 
			 //To date calendar picker
			 @FindBy(css = "input[id=CalArrow_uuu_to_date]")
			 public Button toDateResourceButton;
			 
			 //select allocated role button
			 @FindBy(css = "input[id=alloc_role_btn]")
			 public Button selectAllocatedRoleButton;
			 
			 //availability match percentage text box 
			 @FindBy(css = "input[id=avail_match_text]")
			 public TextBox availabilityPercentTextBox;
			 
			//booking per resource hours  text box 
			 @FindBy(css = "input[id=bk_hrs_resc_text]")
			 public TextBox bookingPerResourceHoursTextBox;
			 
			 //validate button in booking line item 
			 @FindBy(css = "td[title=Validate]")
			 public Button validateResourceButton;
			 
			 //create snapShot button 
			 @FindBy(css = "a[id=SaveAsMenu_a]")
			 public Button saveSnapshotButton;
			 
			 //snapshot name text box 
			 @FindBy(css = "input[id=title]")
			 public TextBox snapshotNameTextBox;
			 
			 //open snapShot button 
			 @FindBy(css = "a[id=OpenMenu_a]")
			 public Button openSnapshotButton;
			 
			 //close button in snapShot log
			 @FindBy(css = "a[id=CloseWindowTool_a]")
			 public Button closeSnapshotLogBtn;
			 
		     // View button on Record Window -> Company Logs -> Record ->
			@FindBy(css = "a[id=ViewMenu_a]")
		    public Button commonViewButton;
				
			//Remove Button on Partner Companies page
			@FindBy(css = "a[id=ConvertMenu_a]")
		    public Button commonConvertButton;
				
	 	 
	 /**
		 * This function is used to counter StaleElementException during Click - by trying again if the exception is encountered
		 * It will keep trying till half of appWaitTime
		 * @param element
		 * @return clicking of the element
		 */
				public boolean retryClickOnStaleElementException(WebElement element){
					boolean m_Result = false;
					
					for(int i=0;i<appWaitTime;i++)
					{
						try
							{
							if(m_Result)
								
								element.click();
								//If No Exception
								m_Result=true;
							}
						catch(StaleElementReferenceException e)
							{
							m_Result = false;
							
							}
						if(m_Result)
							{
								break;
							}else
							  {
								logger.info("** StaleElementReferenceException - Trying again");
								sleep(0.5);
							 }
					}
					return m_Result;
				}
			 
	/* 
	 * Returns WebElement in Workspace page based on gridCellValue
	 * 
	 */	
	public WebElement getGridCellElement(String gridCellValue, boolean waitForElement) {
		if(waitForElement){
		waitForElement(By.cssSelector(".dojoxGrid-cell[innertext="+gridCellValue+"]"));
		}
		logger.info("Element "+gridCellValue+" found");
		return m_driver.findElement(By.cssSelector(".dojoxGrid-cell[innertext="+gridCellValue+"]"));
	}
	
	/*
	 * Returns WebElement for options selector
	 * 
	 */
	public WebElement getDropDownoption(String option, boolean waitForElement) {
		if(waitForElement){
		waitForElement(By.cssSelector("option:contains('"+option+"')"));
		}
		return m_driver.findElement(By.cssSelector("option:contains('"+option+"')"));
	}
	
	
	/*
	 * Returns WebElement for options selector
	 * 
	 * input[id='use2_uvlTimelyCompletionPD']>option:contains
	 * 
	 */
	public WebElement getDropDownoptionWithSelector(String selector, String option, boolean waitForElement) {
		if(waitForElement){
		waitForElement(By.cssSelector(selector+">option:contains('"+option+"')"));
		}
		return m_driver.findElement(By.cssSelector(selector+">option:contains('"+option+"')"));
	}
	
	
	/*
	 * Select any element in the nobr tag with contains
	 * 
	 */
	public WebElement getGridItem(String gridItem, boolean waitForElement) {
		if(waitForElement){
		waitForElement(By.cssSelector("nobr:contains('"+gridItem+"')"));
		}
		return m_driver.findElement(By.cssSelector("nobr:contains('"+gridItem+"')"));
	}
	
	/*
	 * Select any element in the nobr tag with contains with exact text
	 * 
	 */
	public WebElement getGridExactItem(String gridItem, boolean waitForElement) {
		if(waitForElement){
		waitForElement(By.cssSelector("nobr[innerText='"+gridItem+"']"));
		}
		return m_driver.findElement(By.cssSelector("nobr[innerText='"+gridItem+"']"));
	}
	
	/*
	 * Returns WebElement for options selector
	 * 
	 */
	public BaseElement getGridItemExactText(String gridItem, boolean waitForElement) {
		if(waitForElement){
			return findElementWithXPathExactInnerText("nobr",gridItem, appWaitTime,true);
		}
		return findElementWithXPathExactInnerText("nobr",gridItem, appWaitTime,false);
	}
	
	/*
	 * Select any element in the nobr tag with contains
	 */
	public WebElement getGridValue(String gridItem, boolean waitForElement) {
	   if(waitForElement){
	   waitForElement(By.cssSelector("nobr:contains('"+gridItem+"')"));
	   }
			return m_driver.findElement(By.cssSelector("nobr:contains('"+gridItem+"')"));
	}
	
	/*
	 * Return element in the td contains tag
	 */
	public WebElement getTableDataElement(String tableDataText, boolean waitForElement) {
	   if(waitForElement){
	   waitForElement(By.cssSelector("td:contains("+tableDataText+")"));
	   }
			return m_driver.findElement(By.cssSelector("td:contains('"+tableDataText+"')"));
	}
	
	/*
	 * Return exact element in the td  tag
	 */
	public WebElement getTableDataElementExact(String tableDataText, boolean waitForElement) {
	   if(waitForElement){
	   waitForElement(By.cssSelector("td[innerText='"+tableDataText+"']"));
	   }
			return m_driver.findElement(By.cssSelector("td[innerText='"+tableDataText+"']"));
	}
	
	/*
	 * Select any element in the table contains tag
	 */
	public WebElement getTabItem(String gridItem, boolean waitForElement) {
	   if(waitForElement){
	   waitForElement(By.cssSelector("table[innerText='"+gridItem+"']"));
	   }
			return m_driver.findElement(By.cssSelector("table[innerText='"+gridItem+"']"));
	}
	
	/*
	 * Return element in the span tag 
	 */
	public WebElement getSpanItem(String tableDataText, boolean waitForElement) {
		 if(waitForElement){
	     waitForElement(By.cssSelector("span:contains("+tableDataText+")"));
		  }
		 return m_driver.findElement(By.cssSelector("span:contains("+tableDataText+")"));
	}
	
	/**
	 * Select any element in the div tag with contains
	 */
	
	public WebElement getdivItem(String gridItem, boolean waitForElement) {
		if(waitForElement){
			waitForElement(By.cssSelector("div:contains('"+gridItem+"')"));
		}
		return m_driver.findElement(By.cssSelector("div:contains('"+gridItem+"')"));
	}
	
	/**
	 * Select any element in the a tag
	 * 
	 */
	public WebElement getHrefItem(String gridItem, boolean waitForElement) {
		   if(waitForElement){
			   return findElementWithXPathContains("a",gridItem, appWaitTime,true);
		   }
		   return findElementWithXPathContains("a",gridItem, appWaitTime,false);
		}
}