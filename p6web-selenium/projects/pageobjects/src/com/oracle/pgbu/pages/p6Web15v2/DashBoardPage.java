package com.oracle.pgbu.pages.p6Web15v2;


import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import com.oracle.pgbu.common.enums.WindowNames;
import com.oracle.pgbu.common.objects.core.Button;
import com.oracle.pgbu.common.objects.jq.TextBox;
import com.oracle.pgbu.common.pagefactory.CustomPageFactory;
import com.oracle.pgbu.common.utils.ApplicationProperties;


/**
 * Class file containing Page objects related to logs and Company Logs
 *
 */
public class DashBoardPage extends WorkspacePage {
	
	
	//NavigationPage m_navigation;
	
	int appWaitTime = ApplicationProperties.getInstance().getWaitTime();
	
	
	//Expand All Button from tool bar on Dashboard
	@FindBy(css = "a[id=expandAll]")
	public Button expandAllButton;
	
	//Collapse All Button from tool bar on Dashboard
	@FindBy(css = "a[id=collapseAll]")
	public Button collapseAllButton;
	
	//customize Button from tool bar on Dashboard
	@FindBy(css = "a[id=customizeDashboard]")
	public Button customizeButton;
	 	 

	//maximize Earned Value Button from tool bar on Dashboard
	@FindBy(css = "td[name=p_max_ProjectGanttPortlet]")
	public Button maximizeProjectGanttButton;
	
	//DashboardName text box on Dashboard -> Customize
	@FindBy(css = "input[id=dashboardName]")
	public TextBox dashboardNameTextBox;
	
	//save and Close Button from tool bar on Dashboard
	@FindBy(css = "a[id=saveclose]")
	public Button saveAndCloseButton;
	
	
	
	 
	//short description Logs -> New BP -> Add -> Add Line Item ->Line Item Window -> short description
	@FindBy(css = "input[name=short_desc]")
    public TextBox lineItemShortDescTxtBox;
	
	//GCM picker on Logs -> New BP -> Add -> Add Line Item ->Line Item Window -> GCM picker
	@FindBy(how = How.ID, using = "btnuuu_cm0_picker")
	public Button gcmButton;
			 
	//Item quantity on Logs -> New BP -> Add -> Add Line Item ->Line Item Window -> Item quantity
	@FindBy(how = How.ID, using = "uuu_quantity")
	public TextBox lineItemQtyTxtBox;
	
	//Item cost on Logs -> New BP -> Add -> Add Line Item ->Line Item Window -> Itemcost
	@FindBy(how = How.ID, using = "uuu_unit_price")
	public TextBox lineItemUnitCostTxtBox;
	
	// Close button on Logs -> New BP 
	@FindBy(css = "a[id='Close WindowTool_a']")
	public Button closeRecord;

	// Linked Record -> Company Workspace -> Company Logs -> Record -> New BP -> LineItem Window
	@FindBy(css = "a[name='anchor_link_log']")
	public Button linkedRecordButton;

	// Attach arrow -> Company Workspace -> Company Logs -> Record -> New BP -> LineItem Window	-> Linked Record
	@FindBy(css = "img[id=newImg]")
	public Button AttachArrowButton;

	// Attach arrow -> Company Workspace -> Company Logs -> Record -> New BP -> LineItem Window	-> Linked Record
	@FindBy(css = ".clMenu[id=AttachTool_a]")
	public Button AttachButton;

	// Linked Records count -> Company Workspace -> Company Logs -> Record -> New BP 
	@FindBy(css = "span[id=linksLink]")
	public Button linkedRecordCountButton;
	
	// Linked Records count -> Company Workspace -> Company Logs -> Record -> New BP -> LineItem Window	
	@FindBy(css = "span[id=linksLiRecordLink]")
	public Button lineItemLinkedRecordCountButton;

	// referenceRecordButton button on Record Window -> Company Logs -> Record -> View button
	@FindBy(css = "a[id=xreferencingrecordsMenu_a]")
	public Button referenceRecordButton;

	// auditLogButton on Record Window -> Company Logs -> Record -> View button
	@FindBy(css = "a[id=xaudit_logMenu_a]")
	public Button auditLogButton;

	// Editing Record -> Company Workspace -> Company Logs -> Record 
	@FindBy(css = "td[title='Edit']")
	public Button editRecordButton;

	// Finish Editing Record -> Company Workspace -> Company Logs -> Record 
	@FindBy(css = "td[title='Finish Editing'] a img[id='img_menuitem']")
	public Button finishEditRecordButton;
			
	// Remove Buttom -> Company Workspace -> Company Logs -> Record -> New BP -> LineItem Window -> Linked Record
	@FindBy(css = "a[id=RemoveTool_a]")
	public Button AttachmentRemoveButton;

	// Exiting record -> Company Workspace -> Company Logs -> Record -> New BP -> LineItem Window -> Linked Record
	@FindBy(css = "nobr:contains('uetcma')")
	public Button existingLineItemLinkedRecordButton;
	
	// Exiting record -> Company Workspace -> Company Logs -> Record -> New BP -> LineItem Window -> Linked Record
	@FindBy(css = "nobr:contains('us')")
	public Button existingBPLinkedRecordButton;

	// Exiting record -> Company Workspace -> Company Logs -> Record -> New BP -> LineItem Window -> Linked Record
	@FindBy(css = "nobr:contains('uetcma')")
	public Button existingBPUELinkedRecordButton;
		
	// Select Record -> Company Workspace -> Company Logs -> Record -> New BP -> LineItem Window -> Attachment
	@FindBy(css = "td[innerText='Pending']:nth-child(1)")
	public Button selectPendingRecordButton;

	// Select Date -> Company Workspace -> Company Logs -> Record -> view Audit record
	@FindBy(css = "td[id=colHeadingTD0]")	
	public Button dateButton;

	// Action -> Company Workspace -> Company Logs -> Record -> view Audit record
	@FindBy(css = "tr[RowId=0] td:nth-child(3)")	
	public Button actionButton;

	// Action -> Company Workspace -> Company Logs -> Record -> view Audit record
	@FindBy(css = "td[title=Close]")
	public Button closeButton;
	
	//GCM picker on Logs -> New BP -> Add -> Add Line Item ->Line Item Window -> GCM picker
	@FindBy(how = How.ID, using = "btnuuu_company_acc_codepicker")
	public Button acpButton;
		
	//Title on Logs -> New BP
	@FindBy(how = How.ID, using = "urliwc_title")
	public TextBox logsTitleTxtBox;
		
	//Properties Button on Template List window -> Company Workspace -> Company Logs -> any log
	@FindBy(css = "td[id='PropertiesTool_td']")
	public Button commonPropertiesButton;
	
	//copy linked records check box on Properties window -> Company Workspace -> Company Logs -> any log -> Template List window -> Properties
	@FindBy(css = "input[name='linked_records']")
	public Button copyLinkedRecordsCheckbox;
	
	//Bpcreate2 button create new log window -> projects -> Logs -> New
	@FindBy(css = "input[id=btnugcbcr_BPCreat2]")
	public Button bpcreate2Button;
	
	//Bpcreate2 button create new log window -> projects -> Logs -> New
	@FindBy(css = "input[id=btnugcbcr_Group1]")
	public Button selectGroupButton;
	
	//Record tilte on create new log window -> projects -> Logs -> New
	@FindBy(css = "input[id=ugcbcr_uuu_title]")
	public TextBox recordTitleTxtbox;
					
	//General tab button create new log window -> projects -> Logs -> New
	@FindBy(css = "div[id='TabGeneral'] td[vAlign=top]")
	public Button generalTabButton;
	
	// Select Record -> Company Workspace -> Company Logs -> Record -> New BP -> LineItem Window -> Attachment
//	@FindBy(css = "td[innerText='ugcbcr-0003']")
//	public Button selectauditRecordButton;
		
	//Tile in Bulk Edit popup -> Company Workspace -> Company Logs -> Records -> Edit -> Bulk Edit
	@FindBy(css = "input[name=up_title]")
	public TextBox editTitleTxtbox;		
			
	//Update button in Bulk Edit popup -> Company Workspace -> Company Logs -> Records -> Edit -> Bulk Edit
	@FindBy(css = "a[id=UpdateTool_a]")
	public Button updateButton;		
	
	//finish button in Create Record window -> Company Workspace -> Company Logs -> Records -> New
	@FindBy(css = "a[id=xeditrecordTool_a]")
	public Button finishEditingBtn;
	
	//Cancel filter button in  Home -> Master Logs -> Records 
	@FindBy(css = "span[title='Cancel Filter']")
	public Button cancelFilterBtn;		
			
	//Create in shell button in new -> Home -> Master Logs -> Records -> New
	@FindBy(css = "a[id='Create in ShellTool_a']")
	public Button createInShellBtn;
	
	//Select button in Shell picker window > Home -> Master Logs -> Records -> New -> create in shell
	@FindBy(css = "a[id=SelectTool_a]")
	public Button SelectBtn;

	// Title in create record window > Home -> Master Logs -> Records -> New -> create in shell -> Shell picker window -> Select button
	@FindBy(css = "input[id=usg_title]")
	public TextBox shellTitleTxtbox;

	// Save Button in create record window > Home -> Master Logs -> Records -> New -> create in shell -> Shell picker window -> Select button
//	@FindBy(css = "clAnMenu[id=xsaveTool_a]")
//	public Button saveButton;
	
	// send in create record window > Home -> Master Logs -> Records -> New -> create in shell -> Shell picker window -> Select button
	@FindBy(css = "a[id=xsendTool_a]")
	public Button sendBtn;
			
    // file button in create record window > Home -> Master Logs -> Records -> New -> create in shell -> Shell picker window -> Select button
	@FindBy(css = "a[id=xfileMenu_a]")
    public Button fileButton;
			
	// Close window in create record window > Home -> Master Logs -> Records -> New -> create in shell -> Shell picker window -> Select button
	@FindBy(css = "a[id=xclose_windowMenu_a]")
	public TextBox closeBtn;
	
	// Select BO button in create record window > Home -> Master Logs -> Records -> New -> create in shell -> Shell picker window -> Select button
	@FindBy(css = "input[name=picker_usg_ref_bpo_select]")
	public Button selectBOBtn;
	
	// Open Button in Select BO window  > Home -> Master Logs -> Records -> New -> create in shell -> Shell picker window -> Select button -> Select BO button in create record window
	@FindBy(css = "a[id=OpenTool_a]")
	public Button boOpenBtn;
	
	// 91MultiSelectString Button in Bulk Edit popup -> Home -> Master Logs -> Records -> Edit -> Bulk Edit
	@FindBy(css = "input[name=multiselect_select]")
	public Button multiSelectButton;	
	
	// End date in Bulk Edit popup -> Home -> Master Logs -> Records -> Edit -> Bulk Edit
	@FindBy(css = "input[id=usg_uuu_lse_end_date]")
	public TextBox endDateTxtbox;	
	
	// 91 Text in Bulk Edit popup -> Home -> Master Logs -> Records -> Edit -> Bulk Edit
	@FindBy(css = "input[id=usg_text]")
	public TextBox bulk91Txtbox;	
	
	// Title in Bulk Edit popup > Projects -> Logs -> Records -> Edit -> Bulk Edit
	@FindBy(css = "input[name=usli3_title]")
	public TextBox projectTitleTxtbox;
	
	//currency TextBox in Create Record window -> Projects -> Logs -> Records -> New
	@FindBy(css = "input[name=usli3_Currency_Amount_04]")
	public TextBox currencyTxtbox;
	
	//New date Button in Create Record window -> Projects -> Logs -> Records -> New
	@FindBy(css = "input[name=usli3_Date1]")
	public TextBox recorddateButton;
	
	//Short description TextBox in Create Record window -> Projects -> Logs -> Records -> New
	@FindBy(css = "input[name=usli3_short_desc]")
	public TextBox shortDescTxtbox;
	
   	//Save Button in Manage Saved Searches window > Home -> Master Logs -> Records -> Edit -> Saved Searches
	@FindBy(css = "a[id=SaveTool_a]")
	public Button saveSearchButton;

	//Print Preview Button in File > company workspace-> company Logs
	@FindBy(css = "a[id='Print PreviewMenu_a']")
	public Button printPreviewButton;
		
	//HTML Button in Print Preview Button > company workspace-> company Logs >  File
	@FindBy(css = "a[id='HTML ...Menu_a']")
	public Button htmlButton;
		
	//PDF Button in Print Preview Button > company workspace-> company Logs >  File
	@FindBy(css = "a[id='PDF ...Menu_a']")
	public Button pdfButton;
	
	//select all button in print preview > company workspace-> company Logs >  File -> Print Preview Button > HTML 
	@FindBy(css = "input[id=select]")
	public Button selectAllButton;
	
	//Title in Create New Window > Home -> Logs ->  87'1_NF_Text -> New (text type BP) 
	@FindBy(css = "input[id=u2_title]")
    public TextBox textBPTitleTxtBox;
	
	//Text area Entry Area in Create New Window > Home -> Logs ->  87'1_NF_Text -> New (text type BP) 
	@FindBy(css = "textarea[id=comments_content]")
	public TextBox textAreaEntryAreaTxtBox;
		    		
	//Due Date in Edit Window > Home -> Logs ->  87'1_NF_Text -> Edit (text type BP) 
	@FindBy(css = "input[id=u2_due_date]")
	public TextBox dueDateTxtBox;
	
	//Text area final response in Create New Window > Home -> Logs ->  lz_text -> New (text type BP) 
	@FindBy(css = "textarea[id=ul_Final_Response]")
	public TextBox textAreaFinalResponseTxtBox;
	
	//S_BPPicker button in Create New Window > Home -> Logs ->  lz_text -> New (text type BP) 
	@FindBy(css = "input[id=picker_ul_S_BPPicker_select]")
	public Button bpPickerBtn;
	
	//Add Attachments button in Create New Window > Home -> Logs ->  lz_text -> New (text type BP)
	@FindBy(css = "a[id=xadd_attachmentTool_a]")
	public Button addAttachmentButton;
	
	//My Computer in Create New Window > Home -> Logs ->  lz_text -> New (text type BP) -> Add attachment
	@FindBy(css = "a[id=xattach_localTool_a]")
	public Button myComputerButton;
	
	// Attachments count in Create New Window > Home -> Logs ->  lz_text -> New (text type BP)
	@FindBy(css = "a[name=anchor_attach]")
	public TextBox attachmentsLinkCountTxtBox;
	
	//Title textbox  in Edit Window > Home -> seethaProject1 - Home -> Information -> General -> record -> open
	@FindBy(css = "input[id=ugspl_title]")
	public TextBox singleBpTitleTxtBox;
	
	//City textbox  in Edit Window > Home -> seethaProject1 - Home -> Information -> General -> record -> open
	@FindBy(css = "input[id=ugspl_uuu_user_city]")
	public TextBox singleBpCityTxtBox;
	
	//First Name in Create Window > Home -> proj-17 -> Home -> Logs -> Simple BP -> record -> New
	@FindBy(css = "input[id=ugspma1_VDB_ContactFirstName]")
	public TextBox singleBpFirstNameTxtBox;
		
	//Late Name in Create Window > Home -> proj-17 -> Home -> Logs -> Simple BP -> record -> New
	@FindBy(css = "input[id=ugspma1_VDB_ContactLastName]")
	public TextBox singleBpLastNameTxtBox;
		
	//Building Name in Create Window > Home -> proj-17 -> Home -> Logs -> Simple BP -> record -> New
	@FindBy(css = "input[id=ugspma1_BuildingName_txt]")
	public TextBox singleBpBuildingNameTxtBox;
		
	//Accounting Code in Create Window > Home -> proj-17 -> Home -> Logs -> Simple BP -> record -> New
	@FindBy(css = "input[id=ugspma1_AccountingCode_txt]")
	public TextBox singleBpAccountingCodeTxtBox;
		
	//Project Manager in Create Window > Home -> proj-17 -> Home -> Logs -> Simple BP -> record -> New
	@FindBy(css = "input[id=ugspma1_PPM_ProjectManager]")
	public TextBox singleBpProjectManagerTxtBox;
	
    @FindBy(css = "input[id=usg1_Date_Created]")
    public TextBox createDateTxtBox;

    //Item quantity text box in master log > new shell -> new BP -> item quantity text box 
    @FindBy(css = "input[id=usg1_uuu_quantity]")
    public TextBox itemQuantityTxtBox;

    //Date picker button in master log > new shell -> new BP -> date created button
    @FindBy(css = "input[id=CalArrow_Date_Created]")
    public Button datePickerButton;

    //Close window button in shell> open shell -> close window button
    @FindBy(css = "a[id=xclose_windowTool_a]")
    public Button closeWindowbtn;

    //Today button in date picker for shell > open shell -> date picker button -> today button
    @FindBy(css = "input[value=Today]")
    public Button todayBtn;

    //Title text box in master log > new shell -> title
    @FindBy(css = "input[id=usg1_title]")
    public TextBox logRecordTitleTxtBox;
	
    @FindBy(css = "input[name=title][class='input findDe']")
    public TextBox titleSearchTxtBox;

    @FindBy(css = "input[name='record_no'][class='input findDe']")
    public TextBox recordNoSearchTxtBox;
    
    //Find Button
    @FindBy(css = "input[id=findview_search]")
    public Button recordSearchBtn;
	
    // issue date picer in doc type BP >  new BP -> issue date picker
    @FindBy(css = "input[id=CalArrow_uuu_issue_date]")
    public Button issueDatePicker;
	    
    // copy buttonin line item > new doc type BP -> copy
    @FindBy(how = How.ID, using = "copyitem")
    public Button copyButton;
	    
    //Detail line item on Logs -> New BP -> copy -> copy line item
    @FindBy(xpath = "//a[contains(.,'Copy Line Items')]")
    public Button copyLineItemBtn;
	    
   // title text box in Doc type BP > new BP -> title
    @FindBy(css = "input[id=u29_title]")
    public TextBox titleTxtBoxLogs;
	    
    // attachments Button in master log BP
    @FindBy(css = "a[name=anchor_attach]")
    public Button attachmentsButton;
	    
    // save Button in new BP
    @FindBy(css = "a[id=xsaveTool_a]")
    public Button saveBtn;
	    
   // Decimal 14 text box in doc type BP > new BP -> Decimal14 text box
    @FindBy(css = "input[id=utwf2_Decimal4]")
    public TextBox decimal14TxtBox;
    
    // integer 1 text box in doc type BP > new BP -> integer 1 text box
    @FindBy(css = "input[id=u29_Integer1]")
    public TextBox integer1TxtBox;

    //Main Window -> Logs -> Create New Record -> Line Item Window - Name TextBox
    @FindBy(css = "span[id='href_uuu_name']>a")
    public TextBox lineItemNameTxtBox;
    
    

   // Title text box in edit window for single BP> Company Workspace -> General -> open BP -> edit -> Title text box
    @FindBy(css = "input[id=uglcfa1_title]")
    public TextBox singleTitleTxtBox;
    
    //Due date date picker button in edit window for single BP> Company Workspace -> general -> open BP -> edit -> Due date
    @FindBy(css = "input[id=CalArrow_due_date]")
    public Button singleBPdueDateBtn;
    
    // Grid Button in record under company logs> Home -> Company workspace-> company Logs -> BP -> new -> grid 
    @FindBy(css = "button[id=opengrid]")
    public Button gridButton;
    
    
    //vehicles drop down in asset picker>  Home -> Company workspace-> company Logs -> BP -> new -> grid 
    @FindBy(css = "option[value=uv2]")
    public Button vehiclesBtn;
      
    // to button in New BP -> new BP -> Action items -> to 
    @FindBy(css = "input[id=picker_to]")
    public Button toBtn;
    //91Sam-Country1 (G... tab in shell picker window 
    @FindBy(css = "div[id=shell_us_s1]")
	 public Button locationPickerTab;
    
    //Bulk edit button in master logs 
    @FindBy(css = "a[id=BulkEditMenu_a]")
    public Button bulkEditMasterLogBtm;
    
	//new arrow button in workspece page 
	@FindBy(css = "span[id=NewArrow]")
	public Button newArrowButton;
	
	//  Sheet -> Open sheet -> close window
	@FindBy(css = "a[id=IconCloseTool_a]")
	public Button sheetcloseBtn;
	
	//status dropdow in single BP
	@FindBy(css = "input[id=uglcfa1_status]")
	public TextBox singleBpStatusTxtBox; 
	
	//copy button in workspace
	@FindBy(css = "a[id=CopyTool_a]")
	public Button BPCopyBtn;
	
	 //View button 
    @FindBy(css = "a[id=xviewMenu_a]")
    public Button fileViewbtn;
    
    //Audit logs button 
    @FindBy(css = "a[id=xaudit_logMenu_a]")
    public Button fileAuditLogsbtn;
    
    //Date button in audit logs
    @FindBy(css = "th[idx='0']")
    public Button dateAuditlogsBtn;
    
  //Open project button
    @FindBy(css = "span[id=mainToolBar_Open]")
    public Button openLogsProjectButton;
    
	
			 
			 
			
}
