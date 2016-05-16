package com.oracle.pgbu.pages.p6Web15v2;


import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import com.oracle.pgbu.common.By;
import com.oracle.pgbu.common.enums.Tabs;
import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.oracle.pgbu.pages.BasePage;

/**
 * Class File for code & locators related to Navigation in P6 9 Application
 * 
 *
 */
public class NavigationPage extends BasePage {
	BasePage m_basePage = new BasePage();;
	long appWaitTime = ApplicationProperties.getInstance().getWaitTime();
	
	/** IFMain Frame */
	@FindBy(how = How.NAME, using = "IFMain")
	public BaseElement ifMainFrame;

	/** Tree View Frame */
	@FindBy(how = How.NAME, using = "TreeView")
	public BaseElement leftTreeFrame;
	
	/** Workspace Frame */
	@FindBy(how = How.NAME, using = "Workspace")
	public BaseElement workspaceFrame;
	
	/** Workspace Frame */
	@FindBy(how = How.NAME, using = "IFShell")
	public BaseElement shellFrame;
	
	/** Document Workspace Frame */
	@FindBy(how = How.NAME, using = "DMWorkspace")
	public BaseElement documentWorkspaceFrame;
	
	/** Bookmarks Frame */
	@FindBy(how = How.NAME, using = "IFBookmark")
	public BaseElement bookmarksFrame;
	
	/** RecordsWorkspaceFrame */
	@FindBy(how = How.NAME, using = "RecordWorkspace")
	public BaseElement recordsWorkspaceFrame;
	
	/** AssetsWorkspaceFrame */
	@FindBy(how = How.NAME, using = "AssetWorkspace")
	public BaseElement assetWorkspaceFrame;
	
	/** ScrollYesFrame */
	@FindBy(css = "frame[src='scroll_yes_no.htm']")
	public BaseElement scrollYesFrame;
	
	
	
	/**
	 * Navigate to a section of the application
	 * 
	 * @param Tab to be navigated to
	 */
	
	public void navigateToTab(Tabs tabs)
	{
		toTopFrame();
		//TabNavigation
		try{
			waitForReady();
			m_basePage.waitForElement(By.id("nav_tab_" + tabs.getTab().toLowerCase()));
			m_driver.findElement(By.id("nav_tab_" + tabs.getTab().toLowerCase())).click();
			logger.info("Navigation to "+tabs.getTab()+" Successful");
			waitForReady();
		}catch(Exception e)
		{
			logger.info("Navigation to "+tabs.getTab()+" failed--" + e.getLocalizedMessage());
		}

		
	}
	   
		 
		
		/**
		    * Switches to Admin or User Mode
		    * 
		    * @param Mode to be switched to (Either "User" or "Administration")
		    */
			public void switchMode(String mode)
			{
				WebElement m_currentMode;
				
				//Move to the Tree where Anchor is present to change to User or Administration Mode
				toLeftTreeFrame();
				 
				 //Verify Current Mode
				 m_basePage.waitForElement(By.id("useranchor"));
				 m_currentMode = m_driver.findElement(By.id("useranchor"));
				 
				 if (m_currentMode.getText().contains(mode))
				 {
					 //Already in the required mode, hence return
					 logger.info("Already in the "+mode+" Mode");
					 return;
				 }else{
					 //Switch to the required mode
					 m_currentMode.click();
					 m_basePage.waitForElement(By.id("OtherModes")).findElement(By.linkText(mode +" Mode"));
				 	 m_driver.findElement(By.id("OtherModes")).findElement(By.linkText(mode +" Mode")).click();
				 	logger.info("Switch to "+mode+" Mode Done");
				 }
			}		//Suresh	 
		
		
		 /**
		    * 
		    * Switches to Top frame in HTML content 
		    * 
		    */
		public void toTopFrame(){		
			m_driver.switchTo().defaultContent();
		}

		 /**
		    * 
		    * Switches to Left Tree frame in HTML content 
		    * 
		    */
		public void toLeftTreeFrame(){
			try{
				 //Move to Top HTML
				 toTopFrame();
				 
				 //Move to IfMain frame
				 m_basePage.waitForElement(ifMainFrame,appWaitTime);
				 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
				 
				 //Move to Left Tree frame
				 m_basePage.waitForElement(leftTreeFrame,appWaitTime);
				 m_driver.switchTo().frame(m_driver.findElement(By.name("TreeView")));
				 
				 logger.info("Switch to Left Tree frame successful");
				}catch(Exception e){
				logger.info("Switch to Tree frame failed--" + e.getLocalizedMessage());
			}
		}

		 /**
		    * 
		    * Switches to Workspace frame on the right
		    * 
		    */
		public void toWorkSpaceFrame(){
			try{
				logger.info("to workspace frame function");
				//Move to Top HTML
				toTopFrame();
		 
				//Move to IfMain frame
				 m_basePage.waitForElement(ifMainFrame,appWaitTime);
				 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
				 
				 //Move to Workspace frame
				 m_basePage.waitForElement(workspaceFrame);
				 m_driver.switchTo().frame(m_driver.findElement(By.name("Workspace")));
			
				logger.info("Switch to Workspace frame successful");
			}catch(Exception e){
				logger.info("Switch to Workspace frame failed--" + e.getLocalizedMessage());
			}
		}
		
		
		 /**
		    * 
		    * Switches to Shell frame on the right
		    * 
		    */
		public void toShellFrame(){
			try{
				//Move to Top HTML
				toTopFrame();
		 
				 //Move to IfMain frame
				 m_basePage.waitForElement(ifMainFrame,appWaitTime);
				 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
				 
				 //Move to Workspace frame
				 m_basePage.waitForElement(workspaceFrame,appWaitTime);
				 m_driver.switchTo().frame(m_driver.findElement(By.name("Workspace")));
				 
				 //Move to Workspace frame
				 m_basePage.waitForElement(shellFrame,appWaitTime);
				 m_driver.switchTo().frame(m_driver.findElement(By.name("IFShell")));
				 
				logger.info("Switch to Shell frame successful");
			}catch(Exception e){
				logger.info("Switch to Shell frame failed--" + e.getLocalizedMessage());
			}
		}
		
		
		 /**
		    * 
		    * Switches to Workspace frame with in Workspace frame on the right
		    * 
		    */
		
		public void toLogsWorkSpaceFrame(){
			try{
			 //Move to Top HTML
			 toTopFrame();
			 
			 //Move to IfMain frame
			 m_basePage.waitForElement(ifMainFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
			 
			 //Move to Workspace frame
			 m_basePage.waitForElement(workspaceFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("Workspace")));

			 //Move to Sub-IfMain frame
			 m_basePage.waitForElement(ifMainFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
			 
			 //Move to Sub-Workspace frame
			 m_basePage.waitForElement(workspaceFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("Workspace")));
			 
			 logger.info("Switch to Workspace frame successful");
			 
				}catch(Exception e){
					logger.info("Switch to Workspace frame failed--" + e.getLocalizedMessage());
				}
		
		}
		
		 /**
		    * 
		    * Switches to Workspace frame with in Document Workspace frame on the right
		    * 
		    */
		
		public void toDocumentWorkSpaceFrame(){
			try{
			 //Move to Top HTML
			 toTopFrame();
			 
			 //Move to IfMain frame
			 m_basePage.waitForElement(ifMainFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
			 
			 //Move to Workspace frame
			 m_basePage.waitForElement(workspaceFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("Workspace")));

			 //Move to Sub-IfMain frame
			 m_basePage.waitForElement(ifMainFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
			 
			 //Move to Sub-Workspace frame
			 m_basePage.waitForElement(documentWorkspaceFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("DMWorkspace")));
			 
			 logger.info("Switch to Document Workspace frame successful");
			 
				}catch(Exception e){
					logger.info("Switch to Document Workspace frame failed--" + e.getLocalizedMessage());
				}
		
		}
		
		 /**
		    * 
		    * Switches to Workspace frame with in Document Tree frame on the right
		    * 
		    */
		
		public void toDocumentTreeFrame(){
			try{
			 //Move to Top HTML
			 toTopFrame();
			 
			 //Move to IfMain frame
			 m_basePage.waitForElement(ifMainFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
			 
			 //Move to Workspace frame
			 m_basePage.waitForElement(workspaceFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("Workspace")));

			 //Move to Sub-IfMain frame
			 m_basePage.waitForElement(ifMainFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
			 
			 //Move to Sub-Workspace frame
			 m_basePage.waitForElement(documentWorkspaceFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("DMTreeView")));
			 
			 logger.info("Switch to Document Tree frame frame successful");
			 
				}catch(Exception e){
					logger.info("Switch to Document Tree frame failed--" + e.getLocalizedMessage());
				}
		
		}
		
		 /**
		    * 
		    * Switches to Content Editor frame with in Layout tab in Landing Page
		    * 
		    */
		
		public void toContentEditorFrame(){
			try{
			 //Move to Top HTML
			 toTopFrame();
			 
			 //Move to Content Editor frame
			 m_driver.switchTo().frame(m_driver.findElement(By.id("_content_editor")));
			 logger.info("Switch to Content Editor frame successful");
			 
			}catch(Exception e){
				logger.info("Switch to Content Editor frame failed--" + e.getLocalizedMessage());
			}
	
	  }
		
		
		
		 /**
		    * 
		    * Switches to Bookmarks frame on the right
		    * 
		    */
		public void toBoomarksFrame(){
			try{
				//Move to Top HTML
				toTopFrame();
		 
				//Move to IfMain frame
				 m_basePage.waitForElement(bookmarksFrame,appWaitTime);
				 m_driver.switchTo().frame(m_driver.findElement(By.name("IFBookmark")));
				 
				logger.info("Switch to Bookmarks frame successful");
			}catch(Exception e){
				logger.info("Switch to Bookmarks frame failed--" + e.getLocalizedMessage());
			}
		}
		

		 /**
		    * 
		    * Switches to Scroll Yes frame on the Alert Window
		    * 
		    */
		public void toScrollYesFrame(){
			try{
				//Move to Top HTML
				toTopFrame();
		 
				//Move to Scroll Yes frame frame
				 m_basePage.waitForElement(scrollYesFrame,appWaitTime);
				 m_driver.switchTo().frame(m_driver.findElement(By.cssSelector("frame[src='scroll_yes_no.htm']")));
				 
				logger.info("Switch to Scroll Yes frame frame successful");
			}catch(Exception e){
				logger.info("Switch to Scroll Yes frame frame failed--" + e.getLocalizedMessage());
			}
		}
		
		 /**
		    * 
		    * Switches to Records Workspace Frame with in Workspace frame on the right
		    * 
		    */
		
		public void toRecordsWorkspaceFrame(){
			try{
			 //Move to Top HTML
			 toTopFrame();
			 
			 //Move to IfMain frame
			 m_basePage.waitForElement(ifMainFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
			 
			 //Move to Workspace frame
			 m_basePage.waitForElement(workspaceFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("Workspace")));

			 //Move to Sub-IfMain frame
			 m_basePage.waitForElement(ifMainFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
			 
			 //Move to Sub-Workspace frame
			 m_basePage.waitForElement(recordsWorkspaceFrame,appWaitTime);
			 m_driver.switchTo().frame(m_driver.findElement(By.name("RecordWorkspace")));
			 
			 logger.info("Switch to Workspace frame successful");
			 
				}catch(Exception e){
					logger.info("Switch to Workspace frame failed--" + e.getLocalizedMessage());
				}
		
		}
				
		
		/**
		 * Returns if the tab is selected
		 * 	 * 
		 * @param tabName
		 *            Tab is selected or not 
		 */	
		public boolean isTabSelected(String tabName) {
			
				//returns true if the tab is selected
				boolean switchTab = m_driver.findElement(By.cssSelector("span:contains('"+tabName+"')")).getAttribute("style").contains("tab_active");
				if (switchTab)
				{
					logger.info("Navigation to "+tabName+ "Successful");
					return switchTab;
				}else{
					logger.info("Navigation to "+tabName+ "FAILED");
					return switchTab;
				} 
		}

		/**
		 * Function to click on Node in the Left Tree frame
		 * @param nodeName
		 */
		public void clickTreeNode(String nodeName){
				
				//Move to Left Tree Frame
				toLeftTreeFrame();
				
				//Wait For the Node Name to Appear and then click it
				try{
				m_basePage.waitForElement(By.cssSelector(".anchorchild[innertext='"+nodeName+"']"));
				m_driver.findElement(By.cssSelector(".anchorchild[innertext='"+nodeName+"']")).click();
				logger.info("Clicked successfully on the tree node "+nodeName);
				}catch(Exception e){
					logger.info("Clicking on Tree node > "+nodeName+" failed "+ e.getLocalizedMessage());
				}
			}
		
		
		/**
		 * Function to click on Node with out Left Tree frame
		 * @param nodeName
		 */
		public void clickTreeNode(String nodeName, boolean leftTreeFrame){
				
				if(leftTreeFrame){
				//Move to Left Tree Frame
				toLeftTreeFrame();
				}
				
				//Wait For the Node Name to Appear and then click it
				try{
				m_basePage.waitForElement(By.cssSelector(".anchorchild[innertext='"+nodeName+"']"));
				m_driver.findElement(By.cssSelector(".anchorchild[innertext='"+nodeName+"']")).click();
				logger.info("Clicked successfully on the tree node "+nodeName);
				}catch(Exception e){
					logger.info("Clicking on Tree node > "+nodeName+" failed "+ e.getLocalizedMessage());
				}
			}
		
		
		/**
		 * Function to click on the Left Tree Node using URL of the Node
		 * @param nodeName
		 * @param nodeURL
		 */
			public void clickTreeNodeWithURL(String nodeName, String nodeURL){
				
				//Move to Left Tree Frame
				toLeftTreeFrame();
				
				//Wait For the Node with URL to Appear and then click it
				try{
				m_basePage.waitForElement(By.cssSelector("span[innertext='"+nodeName+"']span[url='"+nodeURL+"']"));
				m_driver.findElement(By.cssSelector("span[innertext='"+nodeName+"']span[url='"+nodeURL+"']")).click();
				logger.info("Clicked successfully with URL on the tree node > "+nodeName);
				}catch(Exception e){
					logger.info("Clicking on Tree node "+nodeName+" with URL failed "+ e.getLocalizedMessage());
				}
				
				
			}
			
			/**
			 * Function to click on the Left Tree Node using URL of the Node
			 * @param nodeName
			 * @param nodeURL
			 */
				public void clickTreeNodeSibling(String firstNodeName, String siblingNodeName, int siblingNumber, boolean leftTreeFrame){
					
					if(leftTreeFrame){
					//Move to Left Tree Frame
					toLeftTreeFrame();
					}
					//Move to the sibling based on Sibling Number
					 switch(siblingNumber){
					 case 1:
						 try{
						m_basePage.waitForElement(By.cssSelector("div span[innertext='"+firstNodeName+"']+* div[innerText='"+siblingNodeName+"']"));
						m_driver.findElement(By.cssSelector("div span[innertext='"+firstNodeName+"']+* div[innerText='"+siblingNodeName+"']")).click();
						 }catch(Exception e){
								logger.info("Clicking on Tree Sibling node "+siblingNodeName+" with URL failed "+ e.getLocalizedMessage());
						 }
						break;
					 case 2:
						 try{
						m_basePage.waitForElement(By.cssSelector("div span[innertext='"+firstNodeName+"']+*+* div[innerText='"+siblingNodeName+"']"));
						m_driver.findElement(By.cssSelector("div span[innertext='"+firstNodeName+"']+*+* div[innerText='"+siblingNodeName+"']")).click();
					 }catch(Exception e){
							logger.info("Clicking on Tree Sibling node "+siblingNodeName+" with URL failed "+ e.getLocalizedMessage());
					 	}
						break;
					default:
						try{
						m_basePage.waitForElement(By.cssSelector("div span[innertext='"+firstNodeName+"'] div[innerText='"+siblingNodeName+"']"));
						m_driver.findElement(By.cssSelector("div span[innertext='"+firstNodeName+"'] div[innerText='"+siblingNodeName+"']")).click();
						}catch(Exception e){
							logger.info("Clicking on Tree Sibling node "+siblingNodeName+" with URL failed "+ e.getLocalizedMessage());
						}	
					 }	 
					 
				}
				
				
				/**
				 * Function to click on the Left Tree Node with out Left Tree frame
				 * @param nodeName
				 * @param nodeURL
				 */
					public void clickTreeNodeSibling(String firstNodeName, String siblingNodeName, int siblingNumber){

						//Move to Left Tree Frame
						toLeftTreeFrame();

						//Move to the sibling based on Sibling Number
						 switch(siblingNumber){
						 case 1:
							 try{
							m_basePage.waitForElement(By.cssSelector("div span[innertext='"+firstNodeName+"']+* div[innerText='"+siblingNodeName+"']"));
							m_driver.findElement(By.cssSelector("div span[innertext='"+firstNodeName+"']+* div[innerText='"+siblingNodeName+"']")).click();
							 }catch(Exception e){
									logger.info("Clicking on Tree Sibling node "+siblingNodeName+" with URL failed "+ e.getLocalizedMessage());
							 }
							break;
						 case 2:
							 try{
							m_basePage.waitForElement(By.cssSelector("div span[innertext='"+firstNodeName+"']+*+* div[innerText='"+siblingNodeName+"']"));
							m_driver.findElement(By.cssSelector("div span[innertext='"+firstNodeName+"']+*+* div[innerText='"+siblingNodeName+"']")).click();
						 }catch(Exception e){
								logger.info("Clicking on Tree Sibling node "+siblingNodeName+" with URL failed "+ e.getLocalizedMessage());
						 	}
							break;
						default:
							try{
							m_basePage.waitForElement(By.cssSelector("div span[innertext='"+firstNodeName+"'] div[innerText='"+siblingNodeName+"']"));
							m_driver.findElement(By.cssSelector("div span[innertext='"+firstNodeName+"'] div[innerText='"+siblingNodeName+"']")).click();
							}catch(Exception e){
								logger.info("Clicking on Tree Sibling node "+siblingNodeName+" with URL failed "+ e.getLocalizedMessage());
							}	
						 }	 
						 
					}
					
				
				/**
				 * Fuction to click tree node only with URL
				 * @param nodeURL
				 */
							
				public void clickTreeNodeWithOnlyURL(String nodeURL){
					
					//Move to Left Tree Frame
					toLeftTreeFrame();
					
					//Wait For the Node with URL to Appear and then click it
					try{
					m_basePage.waitForElement((By.cssSelector(".anchorchild[url='"+nodeURL+"']")));
					m_driver.findElement(By.cssSelector(".anchorchild[url='"+nodeURL+"']")).click();
					logger.info("Clicked successfully with URL on the tree node > "+nodeURL);
					}catch(Exception e){
						logger.info("Clicking on Tree node "+nodeURL+" with URL failed "+ e.getLocalizedMessage());
					}
					
				}
				 public void toAssetsWorkspaceFrame(){
						try{
						 //Move to Top HTML
						 toTopFrame();
						 
						 //Move to IfMain frame
						 m_basePage.waitForElement(ifMainFrame,appWaitTime);
						 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
						 
						 //Move to Workspace frame
						 m_basePage.waitForElement(workspaceFrame,appWaitTime);
						 m_driver.switchTo().frame(m_driver.findElement(By.name("Workspace")));

						 //Move to Sub-IfMain frame
						 m_basePage.waitForElement(ifMainFrame,appWaitTime);
						 m_driver.switchTo().frame(m_driver.findElement(By.name("IFMain")));
						 
						 //Move to Sub-Workspace frame
						 m_basePage.waitForElement(assetWorkspaceFrame,appWaitTime);
						 m_driver.switchTo().frame(m_driver.findElement(By.name("AssetWorkspace")));
						 
						 logger.info("Switch to Workspace frame successful");
						 
							}catch(Exception e){
								logger.info("Switch to Workspace frame failed--" + e.getLocalizedMessage());
							}
					
					}

				
}