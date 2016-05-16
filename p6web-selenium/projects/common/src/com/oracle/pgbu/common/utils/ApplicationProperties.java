package com.oracle.pgbu.common.utils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

//import mx4j.log.Logger;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.safari.SafariDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.oracle.pgbu.common.enums.BrowserName;
import com.oracle.pgbu.common.enums.Language;


public class ApplicationProperties {

	private final static int DEFAULT_COMP_LOAD_TIMEOUT = 7;
	private int m_pageFactoryCompLoadTime = DEFAULT_COMP_LOAD_TIMEOUT;

	final static String FILE = "application.properties";
	final static String URL = "url";
	final static String UDESIGNER_URL = "udesigner9.url";
	final static String LOGIN = "login";
	final static String PASSWORD = "password";
	final static String BROWSER = "browser";
	final static String DEFAULT_LOGIN_ENABLED = "defaultLoginEnabled";
	final static String UDESIGNER_LOGIN = "udesignerLogin";
	final static String UDESIGNER_PASSWORD = "udesignerPassword";
	final static String WAIT_TIME = "waitTime";
	final static String RETRY_COUNT = "retryCount";
	final static String CHROME_PATH = "chromePath";
	final static String CHROME_DRIVER_PATH = "chromeDriverPath";
	final static String IE_DRIVER_PATH = "ieDriverPath";
	final static String GRID_ENABLED = "gridEnabled";
	final static String GRID_HUB = "gridHub";
	final static String GRID_SIKULI_HOST_NAME = "gridSikuliHostName";
	final static String GRID_SIKULI_IP_NAME = "gridSikuliIPName";
	final static String LANGUAGE = "language";
	final static String INTG_PREFIX = "intg.";
	final static String INTG_BASE_URL = "INTG_BASE_URL";
	final static String INTG_DEFAULT_USER = "INTG_DEFAULT_USER";
	final static String INTG_DEFAULT_PASS = "INTG_DEFAULT_PASS";
	final static String CLOSE_BROWSER_ON_EXIT = "closeBrowserOnExit";
	final static String REST_PATH = "/rest";
	final static String MOCK_PATH = "MockUiPath";
	final static String SCREENSHOT_PATH = "screenshotPath";
	final static String TEST_DATA_PATH_P684 = "..\\..\\p6\\TestData\\";
	final static String TEMP_DATA_PATH_P684 = "..\\..\\p6\\Temp\\";
	final static String TEST_DATA_PATH_P684_SF = "../../p6/TestData/";
	final static String TEMP_DATA_PATH_P684_SF = "../../p6/Temp/";
	
	/*
	 * Vikas - Webservices
	 */
    final static String DATABASE_INSTANCE = "DatabaseInstance";
    final static String DATABASE_USERNAME = "DatabaseUsername";
    final static String DATABASE_PASSWORD = "DatabasePassword";
    final static String P6_WEBSERVICE_URL = "P6WebServicesUrl";
    final static String P6_WEBSERVICE_USER = "P6WebServicesUser";
    final static String P6_WEBSERVICE_PASSWORD = "P6WebServicesPassword";
    final static String DATABASE_NAME = "DatabaseName";
    final static String DATABASE_HOST = "DatabaseHost";
    final static String DATABASE_PORT = "DatabasePort";
    final static String MAX_TRIES = "MaximumTries";
    final static String DEFAULT_WAIT_TIME = "DefaultWaitTime";
    final static String LOG_LEVEL = "LogLevel";
    final static String LOCALE = "Locale";
    final static String LOG_FILE = "LogFile";
    final static String P6_ADMIN_USER = "P6AdminUser";
    final static String SAMPLE_DATA = "SampleData";
    
	private static ApplicationProperties s_uniqueInstance;
	private static Map<Long, ApplicationProperties> s_instanceMap = Collections.synchronizedMap(new HashMap<Long, ApplicationProperties>());
	protected static final Logger logger = LoggerFactory.getLogger(ApplicationProperties.class);
	String m_url;
	String m_udesignerUrl;
	String m_username;
	String m_password;
	String m_udesignerUsername;
	String m_udesignerPassword;
	String m_chromePath;
	String m_chromeDriverPath;
	String m_ieDriverPath;
	String m_screenshotPath;
	String m_intgUrl;
	String m_intgUser;
	String m_intgPass;

	int m_waitTime;
	int m_retryCount;
	boolean m_gridEnabled;
	boolean m_closeBrowserOnExit;
	boolean m_defaultLoginEnabled;
	String m_gridHub;
	String m_gridSikuliHostName;
	String m_gridSikuliIPName;
	BrowserName m_browser;
	Language m_language;
	String m_mockUiPath;
	WebDriver m_driver;
	Properties m_properties = new Properties();

	boolean m_continueOnMissingEvents;

	public ApplicationProperties() {

		try {
			m_properties.load(getPropertiesFile());
			m_chromePath = getSetting(CHROME_PATH, null);
			m_chromeDriverPath = getSetting(CHROME_DRIVER_PATH, null);
			m_ieDriverPath = getSetting(IE_DRIVER_PATH, null);
			m_waitTime = Integer.parseInt(getSetting(WAIT_TIME, String.valueOf(DEFAULT_COMP_LOAD_TIMEOUT)));
			m_retryCount = Integer.parseInt(getSetting(RETRY_COUNT, "1"));
			m_gridEnabled = Boolean.parseBoolean(getSetting(GRID_ENABLED, "false"));
			m_defaultLoginEnabled = Boolean.parseBoolean(getSetting(DEFAULT_LOGIN_ENABLED, "false"));
			m_gridHub = getSetting(GRID_HUB, null);
			m_gridSikuliHostName = getSetting(GRID_SIKULI_HOST_NAME, null);
			m_gridSikuliIPName = getSetting(GRID_SIKULI_IP_NAME, null);
			m_browser = BrowserName.fromString(getSetting(BROWSER, "chrome"));
			m_language = (getSetting(LANGUAGE, null) != null) ? Language.valueOf(getSetting(LANGUAGE, null)) : Language.ENGLISH;
			m_closeBrowserOnExit = Boolean.parseBoolean(getSetting(CLOSE_BROWSER_ON_EXIT, "false"));
			m_mockUiPath = getSetting(MOCK_PATH, null);
			m_screenshotPath = createScreenshotPath();

			// createAndGetDriver();
		} catch (IOException e) {
			throw new RuntimeException("Failed to load " + FILE + " from classpath", e);
		}

	}

	InputStream getPropertiesFile() {
		InputStream propFile = ClassLoader.getSystemResourceAsStream(FILE);

		if (propFile == null) {
			// List of classpath entries
			URL[] urls = ((URLClassLoader) ClassLoader.getSystemClassLoader()).getURLs();

			StringBuffer buffer = new StringBuffer(urls.length);

			buffer.append("Failed to find ").append(FILE).append(" in classpath.  Current classpath is: \n");
			for (URL url : urls) {
				buffer.append(url.getFile()).append("\n");
			}

			throw new RuntimeException(buffer.toString());
		}

		return propFile;
	}

	/**
	 * 
	 * @return Test Data File Path for V10v1
	 */
	public String getP684TestDataFile() {
		String currentPath;
		String filePath;
		String browser = getInstance().getBrowser();
		if(browser.equals("SAFARI"))
		{
			currentPath = this.getClass().getClassLoader().getResource("").getPath();
			filePath = currentPath.substring(0,currentPath.lastIndexOf(""))+TEST_DATA_PATH_P684_SF;
		}
		else
		{
			currentPath = this.getClass().getClassLoader().getResource("").getPath().replace("/", "\\");
			filePath = currentPath.substring(1,currentPath.lastIndexOf(""))+TEST_DATA_PATH_P684;
		}
		return filePath;
	  }
	
	
	/**
	 * 
	 * 
	 * @return Temp data file path in V10v1
	 */
	public String getP684TempDataFile() {
		String currentPath;
		String filePath;
		String browser = getInstance().getBrowser();
		if(browser.equals("SAFARI"))
		{
		currentPath = this.getClass().getClassLoader().getResource("").getPath();
		filePath = currentPath.substring(0,currentPath.lastIndexOf(""))+TEMP_DATA_PATH_P684_SF;
		}
		else
		{
		currentPath = this.getClass().getClassLoader().getResource("").getPath().replace("/", "\\");;
		filePath = currentPath.substring(1,currentPath.lastIndexOf(""))+TEMP_DATA_PATH_P684;	
		}
		return filePath;
	  }
	
	

	public void setApplicationSpecificProperties(String appName) {
		appName = (appName != null && appName.length() > 0) ? appName + "." : "";

		//Set P6 URL
		setUrl(getSetting(appName + URL, getSetting(URL, "http://localhost:7001/bluedoor")));
		setUsername(getSetting(appName + LOGIN, getSetting(LOGIN, "admin")));
		setPassword(getSetting(appName + PASSWORD, getSetting(PASSWORD, "admin")));
		
		//Set uDesigner URL
		seUdesignerUrl(getSetting(UDESIGNER_URL, "http://localhost:8080/bluedoor"));
		
		//setUdesignerUrl
		setUdesignerUsername(getSetting(UDESIGNER_LOGIN, "Administrator"));
		setUdesignerPassword(getSetting(UDESIGNER_PASSWORD, "!nn0v8te"));

	}
	
/*	public void setUdesignerApplicationSpecificProperties(String appName) {
		appName = (appName != null && appName.length() > 0) ? appName + "." : "";

		seUdesignertUrl(getSetting(appName + UDESIGNERURL, getSetting(UDESIGNERURL, "http://localhost:7001/bluedoor")));
		setUdesignerUsername(getSetting(appName + UDESIGNERLOGIN, getSetting(UDESIGNERLOGIN, "admin")));
		setUdesignerPassword(getSetting(appName + UDESIGNERPASSWORD, getSetting(UDESIGNERPASSWORD, "admin")));

		//setRestProperties();
	}*/

	/**
	 * First attempt to read the setting from system property. if not found, read from properties file, and both attempts fail, use default
	 * 
	 * @param settingName
	 * @param defaultValue
	 * @return
	 */
	public String getSetting(String settingName, String defaultValue) {
		String value = System.getProperty(settingName);
		//logger.info("Setting "+settingName+ "Value taken "+value);
		if (value == null) {
			//logger.info("Setting "+settingName+ "Value taken "+defaultValue);
			value = m_properties.getProperty(settingName, defaultValue);
		}

		return value;
	}

	String createScreenshotPath() {
		m_screenshotPath = getSetting(SCREENSHOT_PATH, null);

		if (m_screenshotPath != null) {
			File path = new File(m_screenshotPath);
			if (path.exists() && !path.isDirectory()) {
				throw new RuntimeException("Screenshot path " + m_screenshotPath + "must be folder");
			}
			path.mkdirs();
		}

		return m_screenshotPath;
	}

	public String getScreenshotPath() {
		return m_screenshotPath;
	}

	public void setScreenshotPath(String screenshotPath) {
		m_screenshotPath = screenshotPath;
	}

	public void setUrl(String url) {
		m_url = url;
	}
	
	public void seUdesignerUrl(String uDesignerUrl) {
		m_udesignerUrl = uDesignerUrl;
	}
	

	public void setUsername(String username) {
		m_username = username;
	}
	
	public void setUdesignerUsername(String username) {
		m_udesignerUsername = username;
	}
	
	public void setPassword(String password) {
		m_password = password;
	}
	
	public void setUdesignerPassword(String password) {
		m_udesignerPassword = password;
	}
	public String getIntgUrl() {
		return m_intgUrl;
	}

	public void setIntgUrl(String intgUrl) {
		m_intgUrl = intgUrl;
	}

	public String getIntgUser() {
		return m_intgUser;
	}

	public void setIntgUser(String intgUser) {
		m_intgUser = intgUser;
	}

	public String getIntgPass() {
		return m_intgPass;
	}

	public void setIntgPass(String intgPass) {
		m_intgPass = intgPass;
	}

	public Properties getProperties() {
		return m_properties;
	}

	public WebDriver createAndGetDriver() {
		if (m_gridEnabled) {
			setGridDriver();
		} else {
			setLocalDriver();
		}

		// Set Timeouts
		setTimeouts();

		return m_driver;
	}

	public WebDriver createAndGetGridDriverWithSikuliCapability() {
		setGridDriverWithSikuliCapability();
		// Set Timeouts
		setTimeouts();

		return m_driver;
	}

	
	
	public void setTimeouts(int waitTime, TimeUnit unit) {
		m_driver.manage().timeouts().implicitlyWait(waitTime, unit);
		m_driver.manage().timeouts().setScriptTimeout(waitTime, unit);
	}

	public void disableWaitTime() {
		setTimeouts(50, TimeUnit.MILLISECONDS);
	}

	public void setTimeouts() {
		setTimeouts(m_waitTime, TimeUnit.SECONDS);
	}
	
	/**
	 * Get a static instance of Application Properties. We only want to read the properties file once per run.
	 * 
	 * @return instance of this class.
	 */
	public synchronized static ApplicationProperties getInstance() {
		return getInstance(false);
	}

	public synchronized static ApplicationProperties getInstance(boolean forceNew) {
		long threadId = Thread.currentThread().getId();
		if (forceNew || s_instanceMap.get(threadId) == null) {
			s_uniqueInstance = new ApplicationProperties();
			s_instanceMap.put(threadId, s_uniqueInstance);
		}
		return s_instanceMap.get(threadId);
	}


	/**
	 * Set driver to be used by selenium grid. This method would be called when selenium grid is being used.
	 */
	private void setGridDriver() {
		logger.info("********** Browser >> "+m_browser+" *****************");
		DesiredCapabilities capability;

		switch (m_browser) {
		case HTMLUNIT:
			capability = DesiredCapabilities.htmlUnit();
			capability.setJavascriptEnabled(true);
			break;
		case FIREFOX:
			capability = DesiredCapabilities.firefox();
			FirefoxProfile profile = new FirefoxProfile();
			profile.setEnableNativeEvents(true);
			
			//Wait for 50 seconds to avoid Firefox Unresponsive warning 
			profile.setPreference("dom.max_script_run_time", 50);
			profile.setPreference("dom.max_chrome_script_run_time", 50);
			
			capability.setCapability(FirefoxDriver.PROFILE, profile);
			
			break;
		case CHROME:
			capability = DesiredCapabilities.chrome();
			break;
		case INTERNET_EXPLORER:
			capability = DesiredCapabilities.internetExplorer();
			capability.setCapability(InternetExplorerDriver.INTRODUCE_FLAKINESS_BY_IGNORING_SECURITY_DOMAINS, true);
			break;
		case SAFARI:
			capability = DesiredCapabilities.safari();
			break;
		default:
			capability = DesiredCapabilities.chrome();
		}

		try {
			m_driver = new RemoteWebDriver(new URL(m_gridHub), capability);

			if (!m_browser.equals(BrowserName.HTMLUNIT)) {
				m_driver.manage().window().maximize();
			}

		} catch (MalformedURLException e) {
			throw new RuntimeException(e);
		}
	}

	
	/**
	 * Set driver to be used by selenium grid. This method would be called when selenium grid is being used.
	 */
	private void setGridDriverWithSikuliCapability() {
		logger.info("********** Browser >> "+m_browser+" *****************");
		DesiredCapabilities capability;

		switch (m_browser) {
		case HTMLUNIT:
			capability = DesiredCapabilities.htmlUnit();
			capability.setJavascriptEnabled(true);
			break;
		case FIREFOX:
			capability = DesiredCapabilities.firefox();
			FirefoxProfile profile = new FirefoxProfile();
			profile.setEnableNativeEvents(true);
			
			//Wait for 50 seconds to avoid Firefox Unresponsive warning 
			profile.setPreference("dom.max_script_run_time", 50);
			profile.setPreference("dom.max_chrome_script_run_time", 50);
			capability.setCapability(FirefoxDriver.PROFILE, profile);
			
			break;
		case CHROME:
			capability = DesiredCapabilities.chrome();
			break;
		case INTERNET_EXPLORER:
			capability = DesiredCapabilities.internetExplorer();
			capability.setCapability(InternetExplorerDriver.INTRODUCE_FLAKINESS_BY_IGNORING_SECURITY_DOMAINS, true);
			capability.setCapability("applicationName", "sikuli");
			break;
		case SAFARI:
			capability = DesiredCapabilities.safari();
			break;
		default:
			capability = DesiredCapabilities.chrome();
		}

		try {
			m_driver = new RemoteWebDriver(new URL(m_gridHub), capability);

			if (!m_browser.equals(BrowserName.HTMLUNIT)) {
				m_driver.manage().window().maximize();
			}

		} catch (MalformedURLException e) {
			throw new RuntimeException(e);
		}
	}
	
	
	/**
	 * Sets local driver
	 */
	private void setLocalDriver() {
		logger.info("********** Browser >> "+m_browser+" *****************");
		DesiredCapabilities capabilities;

		switch (m_browser) {
		case HTMLUNIT:
			capabilities = DesiredCapabilities.htmlUnit();
			capabilities.setJavascriptEnabled(true);
			m_driver = new HtmlUnitDriver(capabilities);
			return;
		case FIREFOX:
			FirefoxProfile profile = new FirefoxProfile();
			profile.setEnableNativeEvents(true);
			//Wait for 50 seconds to avoid Firefox Unresponsive warning 
			profile.setPreference("dom.max_script_run_time", 50);
			profile.setPreference("dom.max_chrome_script_run_time", 50);
			profile.setPreference("browser.download.downloadDir", 50);
			profile.setPreference("browser.download.useDownloadDir" ,false);
			m_driver = new FirefoxDriver(profile);
			m_driver.manage().window().maximize();
			break;
		case INTERNET_EXPLORER:
			if (m_ieDriverPath != null) {
				System.setProperty("webdriver.ie.driver", m_ieDriverPath);
			}
			capabilities = DesiredCapabilities.internetExplorer();
			capabilities.setCapability(InternetExplorerDriver.INTRODUCE_FLAKINESS_BY_IGNORING_SECURITY_DOMAINS, true);
			m_driver = new InternetExplorerDriver(capabilities);
			m_driver.manage().window().maximize();
			break;
		case SAFARI:
			m_driver = new SafariDriver();
			m_driver.manage().window().maximize();
			break;
		default:
			ChromeOptions options = new ChromeOptions();
			if (m_chromePath != null && m_chromePath.length() > 0) {
				options.setBinary(new File(m_chromePath));

			}
			if (m_chromeDriverPath != null && m_chromeDriverPath.length() > 0) {
				System.setProperty("webdriver.chrome.driver", m_chromeDriverPath);
			}
			options.addArguments("start-maximized");
			m_driver = new ChromeDriver(options);
		}
	}

	public String getBrowser() {
		return m_browser.getBrowser();
	}
	
	public String getUrl() {
		return m_url;
	}
	
	public String getUdesignerUrl() {
		return m_udesignerUrl;
	}

	public String getMockUiPath() {
		return m_mockUiPath;
	}

	public String getRestUrl() {
		return m_url + REST_PATH;
	}

	public String getUsername() {
		return m_username;
	}
	
	public String getUdesignerUsername() {
		return m_udesignerUsername;
	}

	public String getPassword() {
		return m_password;
	}
	
	public String getUdesignerPassword() {
		return m_udesignerPassword;
	}

	public WebDriver getDriver() {
		return m_driver;
	}

	public int getWaitTime() {
		return m_waitTime;
	}
	
	public int getRetryCount() {
		return m_retryCount;
	}


	public void setWaitTime(int waitTime) {
		m_waitTime = waitTime;
	}

	public boolean getGridEnabled() {
		return m_gridEnabled;
	}

	public boolean getDefaultLoginEnabled() {
		return m_defaultLoginEnabled;
	}

	
	public boolean getCloseBrowserOnExit() {
		return m_closeBrowserOnExit;
	}

	public String getGridhub() {
		return m_gridHub;
	}
	
	public String getSikuliGridHostName() {
		return m_gridSikuliHostName;
	}
	
	public String getSikuliGridIPName() {
		return m_gridSikuliIPName;
	}

	public Language getLanguage() {
		return m_language;
	}

	public int getPageFactoryCompLoadTime() {
		return m_pageFactoryCompLoadTime;
	}

	public void setPageFactoryCompLoadTime(int pageFactoryCompLoadTime) {
		m_pageFactoryCompLoadTime = pageFactoryCompLoadTime;
	}

	public void setPageFactoryCompLoadTime() {
		m_pageFactoryCompLoadTime = DEFAULT_COMP_LOAD_TIMEOUT;
	}

	public boolean isContinueOnMissingEvents() {
		return m_continueOnMissingEvents;
	}

	public void setContinueOnMissingEvents(boolean continueOnMissingEvents) {
		m_continueOnMissingEvents = continueOnMissingEvents;
	}
	
	 public String getP6WebServiceUrl() {
        return getSetting(P6_WEBSERVICE_URL, null);
    }

    public String getP6WebServiceUser() {
        return getSetting(P6_WEBSERVICE_USER, null);
    }

    public String getP6WebServicePassword() {
        return getSetting(P6_WEBSERVICE_PASSWORD, null);
    }
	
    public String getMaximumTries() {
        return getSetting(MAX_TRIES, null);
    }

    public String getDefaultWaitTime() {
        return getSetting(DEFAULT_WAIT_TIME, null);
    }

    public String getLogLevel() {
        return getSetting(LOG_LEVEL, null);
    }

    public String getLocale() {
        return getSetting(LOCALE, null);
    }
    
    public String getLogfile() {
        return getSetting(LOG_FILE, null);
    }
    
    public String getP6AdminUser() {
        return getSetting(P6_ADMIN_USER, null);
    }
    
    public boolean getSampleData() {
        return Boolean.parseBoolean(getSetting(SAMPLE_DATA, null));
    }

    public String getDatabaseHost() {
        return getSetting(DATABASE_HOST, null);
    }
    
    public String getDatabaseName() {
        return getSetting(DATABASE_NAME, null);
    }

    public String getDatabasePort() {
        return getSetting(DATABASE_PORT, null);
    }

    public String getDatabaseInstance() {
        return getSetting(DATABASE_INSTANCE, null);
    }

    public String getDatabaseUsername() {
        return getSetting(DATABASE_USERNAME, null);
    }

    public String getDatabasePassword() {
        return getSetting(DATABASE_PASSWORD, null);
    }
}
