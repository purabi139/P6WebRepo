package com.oracle.pgbu.common.support;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Properties;
import java.util.Random;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.Actions;

import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.oracle.pgbu.p615v2.*;

//import com.primavera.tm.tests.BaseTest;

/**
 * Utilities for creating strings, dates, new browsers, etc., for assisting tests.
 */
public class Utilities {
    /**
     * For doing our logging. Can be accessed from anywhere.
     */
    public Logger log;

    /**
     * Holds all the TestEnvironment.properties settings.
     */
    public Properties config;

    /**
     * Holds all the localized strings for the application.
     */
    public Properties localeStrings;

    /**
     * Holds example character data for all the locales.
     */
    public Properties localeData;

    /**
     * Holds example character data for the current locale only.
     */
    public String characters = "";

    /**
     * Useful for limiting forced retries.
     */
    public int maxTries = 10;

    /**
     * Default wait time when page loads.
     */
    public int defaultWaitTime;

    /**
     * String that holds the simplified language code of the current locale.
     */
    public String locale = "";

    /**
     * Actual Locale object for the simplified language code.
     */
    public Locale Locale;

    /**
     * Utilizing the singleton pattern, to avoid file/logger write overlaps.
     */
    private static Utilities instance = null;

    public static ApplicationProperties appProperties = P615v2.getInstance();

    /**
     * Default constructor for the Utilities, loads config and setups up logger.
     */
    protected Utilities() {
        // Load the TestEnvironment.properties file and initialize the logging.
        log = Logger.getLogger("");
        this.loadConfig();
        this.initializeLogging();

        // Load the localized strings for the configured locale.
        localeStrings = this.loadLocalizedStrings(LanguageCode.valueOf(appProperties.getLocale()));
    }

    /**
     * For getting an instance of this Utilities class.
     * 
     * @return Utilities instance
     */
    public static Utilities getInstance() {
        if (instance == null) {
            instance = new Utilities();
        }
        return instance;
    }

    //    /**
    //     * Creates a new WebDriver (browser) object of the default type specified in your TestEnvironment.properties.
    //     * 
    //     * @return WebDriver object of the default type.
    //     */
    //    public WebDriver newBrowser() {
    //        return newBrowser(BrowserType.valueOf(config.getProperty("TargetBrowser").toLowerCase().trim()));
    //    }

    //    /**
    //     * Creates a new WebDriver (browser) object of the specified type.
    //     * 
    //     * @param browserType
    //     *            enum containing the currently supported drivers. See BrowserType enum.
    //     * @return WebDriver object of the specified type.
    //     */
    //    public WebDriver newBrowser(BrowserType browserType) {
    //        WebDriver newBrowser = null;
    //
    //        // If browserType is "random", randomly pick one of the first 3 browsers
    //        // Firefox, Chrome, or IE.
    //        if (browserType.equals(BrowserType.random)) {
    //            browserType = BrowserType.values()[new Random().nextInt(3)];
    //        }
    //
    //        // Work around for WebDriver issues regarding browser start exceptions.
    //        for (int i = 0; i < maxTries; i++) {
    //            try {
    //                // Which browser are we testing with?
    //                switch (browserType) {
    //                case chrome:
    //                    String chromeDriverExePath = System.getProperty("chrome.driver.exe.location");
    //                    if (chromeDriverExePath == null) {
    //                        chromeDriverExePath = "";
    //                    }
    //
    //                    System.setProperty("webdriver.chrome.driver", chromeDriverExePath + "../extras/chromedriver.exe");
    //                    // Next 2 lines are necessary to run Chrome browser
    //                    // maximized
    //                    ChromeOptions options = new ChromeOptions();
    //                    options.addArguments("--start-maximized");
    //                    newBrowser = new ChromeDriver(options);
    //                    log.fine("Testing with the Chrome browser.");
    //                    break;
    //                case htmlunit:
    //                    newBrowser = new HtmlUnitDriver(true);
    //                    log.fine("Testing with the HTMLUnit browser emulator.");
    //                    break;
    //                case ie:
    //                    // To test with IE, enable "Protected Mode" in the Security
    //                    // tab of
    //                    // the Internet Options
    //                    DesiredCapabilities ieCapabilities = DesiredCapabilities.internetExplorer();
    //                    ieCapabilities.setCapability(InternetExplorerDriver.INTRODUCE_FLAKINESS_BY_IGNORING_SECURITY_DOMAINS, true);
    //                    newBrowser = new InternetExplorerDriver(ieCapabilities);
    //                    // Workaround to maximize, until WebDriver issue 174 is
    //                    // resolved.
    //                    Selenium selenium = new WebDriverBackedSelenium(newBrowser, "");
    //                    selenium.windowMaximize();
    //                    log.fine("Testing with the IE browser.");
    //                    break;
    //                case opera:
    //                    newBrowser = new OperaDriver();
    //                    log.fine("Testing with the Opera browser.");
    //                    break;
    //                case firefox:
    //                default:
    //                    newBrowser = new FirefoxDriver();
    //                    // Workaround to maximize, until WebDriver issue 174 is
    //                    // resolved.
    //                    newBrowser.findElement(By.xpath("//html")).sendKeys(Keys.F11);
    //                    log.fine("Testing with the Firefox browser.");
    //                    break;
    //                }
    //                break;
    //            } catch (WebDriverException wde) {
    //                // Each WebDriver has it's own starting issues... If
    //                // encountered, wait a moment and try again.
    //                sleep(0.5);
    //            }
    //        }
    //
    //        // Set the default implicit timeout, how long it will wait before
    //        // failing when you look for an element that doesn't exist.
    //        newBrowser.manage().timeouts().implicitlyWait(maxTries, TimeUnit.SECONDS);
    //        return newBrowser;
    //    }

    //    /**
    //     * Helper method for enabling and disabling the browser's implicit wait time.
    //     * 
    //     * @param wait
    //     *            boolean true to enable the implicit wait, false to disable.
    //     */
    //    public void browserWait(boolean wait) {
    //        if (wait)
    //            BaseTest.browser.manage().timeouts().implicitlyWait(maxTries, TimeUnit.SECONDS);
    //        else
    //            BaseTest.browser.manage().timeouts().implicitlyWait(0, TimeUnit.SECONDS);
    //    }

    //    /**
    //     * Provides an easy method for capturing a screenshot of the current browser.
    //     * 
    //     * @param pathAndFilename
    //     *            String that contains the path and filename for the desired screenshot.
    //     */
    //    public void captureSreenshot(String pathAndFilename) {
    //        try {
    //            // Use the browser object to capture a screenshot, pass it off to
    //            // the FileUtils
    //            // to save it as a file in the specified location.
    //            FileUtils.copyFile(((TakesScreenshot) BaseTest.browser).getScreenshotAs(OutputType.FILE), new File(pathAndFilename));
    //        } catch (IOException ioException) {
    //            // Dump info about the failure to save the file.
    //            log.warning("Unable to save screenshot, reason: " + ioException.getMessage());
    //        }
    //    }

    /**
     * Provides a quick and easy way to get a date relative to today/now.
     * 
     * @param offset
     *            Integer offset for the number to add/subtract from the current date.
     * @param units
     *            What Calendar units to add/subtract. Examples: Get the day 3 days from now: getDate(3, Calendar.DATE); Get a date 6 months from now: getDate(6, Calendar.MONTH); Get the date from a year ago: getDate(-1, Calendar.YEAR);
     * 
     * @return Date object for the given offset from today/now.
     */
    public Date getDate(int offset, int units) {
        Calendar cal = Calendar.getInstance(Locale);
        cal.add(units, offset);
        return cal.getTime();
    }

    /**
     * Provides a quick and easy way to get a date relative to the given date.
     * 
     * @param date
     *            Date value to be the starting point.
     * @param offset
     *            Integer offset for the number to add/subtract from the current date.
     * @param units
     *            What Calendar units to add/subtract. Examples: Get the day 3 days from now: getDate(3, Calendar.DATE); Get a date 6 months from now: getDate(6, Calendar.MONTH); Get the date from a year ago: getDate(-1, Calendar.YEAR);
     * 
     * @return Date object for the given offset from today/now.
     */
    public Date getDate(Date date, int offset, int units) {
        Calendar cal = Calendar.getInstance(Locale);
        cal.setTime(date);
        cal.add(units, offset);
        return cal.getTime();
    }

    /**
     * Provides a quick and easy way to get a business date relative to today/now. If it's a Saturday or Sunday, it'll skip forward to Monday.
     * 
     * @param offset
     *            Integer offset for the number to add/subtract from the current date.
     * @param units
     *            What java.util.Calendar units to add/subtract. Examples: Calendar.MONTH, Calendar.DAY_OF_WEEK, Calendar.DATE etc. Get the next business day 3 days from now: getBusinessDate(3, Calendar.DATE); Get a date 6 months in the past
     *            getBusinessDate(-6, Calendar.MONTH); Get the date 2 years from now: getBusinessDate(2, Calendar.YEAR);
     *            
     * @return Date object for the given offset from today/now.
     */
    public Date getBusinessDate(int offset, int units) {
        Calendar cal = Calendar.getInstance(Locale);
        cal.add(units, offset);
        while (cal.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY || cal.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY)
            cal.add(Calendar.DATE, 1);
        return cal.getTime();
    }

    /**
     * Give us a random locale-specific string for unique test data.
     * 
     * @param length
     *            How many random characters to return.
     *            
     * @return String of random characters the specified length.
     */
    public String randomChars(int length) {
        // Fire up a new random generator.
        Random random = new Random();

        // Fill the String with random characters.
        String randomText = "";
        for (int currentSize = 0; currentSize < length; currentSize++) {
            int character = random.nextInt(characters.length());
            randomText += characters.substring(character, character + 1);
        }

        return randomText;
    }

    //    /**
    //     * The browsers we can support currently. Others to potentially include are android, htmlunit, and iphone
    //     */
    //    public enum BrowserType {
    //        /**
    //         * Uses your system's default Firefox browser.
    //         */
    //        firefox,
    //        /**
    //         * Uses your system's default Chrome browser.
    //         */
    //        chrome,
    //        /**
    //         * Uses your system's default Internet Explorer browser.
    //         */
    //        ie,
    //        /**
    //         * Uses the HTMLUnit browser emulator.
    //         */
    //        htmlunit,
    //        /**
    //         * Uses your system's default Opera browser.
    //         */
    //        opera,
    //        /**
    //         * Picks a random browser for each test, choosing between Firefox, IE, and Chrome currently.
    //         */
    //        random
    //    }

    /**
     * The locales currently supported by Team Member Web
     */
    public enum LanguageCode {
        /**
         * German
         */
        de,
        /**
         * Spanish
         */
        es,
        /**
         * English
         */
        en,
        /**
         * French
         */
        fr,
        /**
         * Italian
         */
        it,
        /**
         * Japanese
         */
        ja,
        /**
         * Korean
         */
        ko,
        /**
         * Brazilian Portuguese
         */
        pt_BR,
        /**
         * Russian
         */
        ru,
        /**
         * Simplified Chinese
         */
        zh_CN,
        /**
         * Traditional Chinese
         */
        zh_TW,
        /**
         * Default for current system
         */
        current
    }

    //    /**
    //     * Explicitly waits for the specified element (instead of the implicit wait set at the driver level). Can be used to wait for objects to be available, even if they finish loading after the page load returns.
    //     * 
    //     * @param locator
    //     *            The "By" locator for the element, xpath, id, class, name, etc...
    //     * @return WebElement identified by the specified locator.
    //     */
    //    public WebElement waitFor(final By locator) {
    //        WebElement element = null;
    //
    //        // Retry for a *total* of the default wait time, decrease the implicit
    //        // wait temporarily.
    //        browserWait(false);
    //
    //        for (int i = 0; i < maxTries; i++) {
    //            // If the element is found, immediately break out and return it,
    //            // otherwise, wait a second and try again.
    //            try {
    //                element = BaseTest.browser.findElement(locator);
    //                break;
    //            } catch (NoSuchElementException nse) {
    //                // Not found
    //                log.fine("Element not found, attempt #" + i);
    //            }
    //            // Wait and try again...
    //            sleep(1);
    //        }
    //        // Set the implicit timeout back.
    //        browserWait(true);
    //
    //        return element;
    //    }

    /**
     * Sleeps for the specified number of seconds. Only use as a last resort, for example, on components that are performing asynchronous actions that WebDriver has no visibility into.
     * 
     * @param seconds
     *            Int value for the number of seconds to sleep.
     */
    public void sleep(int seconds) {
        sleep(seconds * 1.0);
    }

    /**
     * Sleeps for the specified number of seconds. Only use as a last resort, for example, on components that are performing asynchronous actions that WebDriver has no visibility into.
     * 
     * @param seconds
     *            Double value for the number of seconds to sleep.
     */
    public void sleep(Double seconds) {
        try {
            Thread.sleep((long) (seconds * 1000));
        } catch (InterruptedException e) {
            log.warning("Sleep time was interrupted. Reason: " + e.getMessage());
        }
    }

    //        /**
    //         * Helper to get environment config info for items that don't extend BaseTest
    //         * 
    //         * @param key
    //         *            as a String from the TestEnvironment.properties key=value config file.
    //         * @return The value of the specified key, as a String.
    //         */
    //        public String getConfigValue(String key) {
    //            return config.getProperty(key);
    //        }

    /**
     * Helper to get the localized String for the specified key.
     * 
     * @param key
     *            String from the localized properties file to pull.
     * @return The value of the specified key, as a String.
     */
    public final String getString(String key) {
        return localeStrings.getProperty(key).trim();
    }

    /**
     * Reviews a date and verifies it is in the specified format and is a valid date
     * 
     * @param format
     *            string containing the desired date format (i.e. MM-dd-yyyy, MMM-dd-yy, yy.MMM.dd )
     * @param date
     *            string containing the date to be verified
     * @return true if date is in designated format, false if not in correct format or is invalid date
     */
    public boolean isValidDate(String format, String date) {
        SimpleDateFormat sdf = new SimpleDateFormat(format, Locale);
        Date testDate = null;

        // try to parse the string into date form using formatter
        try {
            testDate = sdf.parse(date);
        } catch (ParseException e) {
            return false;
        }

        // test that the date is still the date that was entered
        if (!sdf.format(testDate).equals(date)) {
            return false;
        }

        return true;
    }

    /**
     * Formats the date object into a string using the specified string format.
     * 
     * @param date
     *            string containing the date to be formatted
     * @param format
     *            string containing the desired date format (i.e. MM-dd-yyyy, MMM-dd-yy, yy.MMM.dd )
     * @return String containing the date in the desired format.
     */
    public String formatDate(Date date, String format) {
        SimpleDateFormat formatter = new SimpleDateFormat(format, Locale);

        // Format the date as specified.
        return formatter.format(date);
    }

    /**
     * Types in the specified field the specified text, with a delay of about 100 ms in between keystrokes. Better mimics actual typing. Only use when necessary, it's slow!
     * 
     * @param element
     *            The WebElement to type in.
     * @param text
     *            The text to type.
     */
    public void slowType(WebElement element, String text) {
        // Clear the field first.
        element.sendKeys(Keys.chord(Keys.CONTROL, "a"), Keys.DELETE, Keys.BACK_SPACE, Keys.BACK_SPACE);

        // Tab out of the fields as well at the end, to trigger actions.
        text += Keys.TAB;

        // For each character specified, type it, and wait...
        for (int i = 0; i < text.length(); i++) {
            element.sendKeys("" + text.charAt(i));
            sleep(.05);
        }
    }

    /**
     * Method to load our TestEnvironment.properties file.
     */
    public void loadConfig() {
        try {
            // Load the test environment properties.
            String filePath = System.getProperty("test.env.prop.file");
            if (filePath == null) {
                filePath = "";
            }

            // Populate the properties object from the file.
            maxTries = Integer.parseInt(appProperties.getMaximumTries());
            defaultWaitTime = Integer.parseInt(appProperties.getDefaultWaitTime());
        } catch (Exception e1) {
            try {
                // A second attempt, in the TeamMemberWeb folder.
                //config.load(new FileInputStream("TeamMemberWeb/TestEnvironment.properties"));
            } catch (Exception e2) {
                // Dump info about not finding the properties file.
                log.severe(e1.getMessage() + "\n" + e2.getMessage());
            }
        }
    }

    /**
     * Method to load the localized strings for all application text in the specified locale. Called internally on the default Utilities instance.
     * 
     * @param languageCode
     *            LanguageCode representing the desired locale to load.
     * @return Properties object containing all the localized application text.
     */
    public Properties loadLocalizedStrings(LanguageCode languageCode) {
        Properties strings = new Properties();
        localeData = new Properties();
        String fileName = "";

        // Build the property file name using the passed in locale. If empty, use the default.
        if (languageCode.equals(LanguageCode.current)) {
            locale = java.util.Locale.getDefault().getLanguage();

            // "en" is the application default and doesn't have an extension.
            if (locale == "en")
                fileName = "LocalizableResource.properties";
            else
                fileName = "LocalizableResource_" + locale + ".properties";
        }
        // If the locale is English, no extension.
        else if (languageCode.equals(LanguageCode.en)) {
            locale = "en";
            fileName = "LocalizableResource.properties";
        } else {
            locale = languageCode.toString();
            fileName = "LocalizableResource_" + languageCode + ".properties";
        }

        try {
            // Load the correct properties file for the specified locale.
				strings.load(Utilities.class.getResourceAsStream("locales/"+fileName));
				localeData.load(new BufferedReader(new InputStreamReader(Utilities.class.getResourceAsStream("locales/LocaleData.properties"), "UTF-16")));

        } catch (Exception e1) {
            log.info(e1.getMessage() + "\nTrying from a different location...");
            try {
                // Runtime path varies between running from Eclipse and from Hudson/Ant, thus the second try.
                //                strings.load(BaseTest.class.getResourceAsStream("/com/oracle/pgbu/common/support/locales/" + fileName));
                //                localeData.load(new BufferedReader(new InputStreamReader(BaseTest.class
                //                        .getResourceAsStream("/com/oracle/pgbu/common/support/locales/LocaleData.properties"), "UTF-16")));
            } catch (Exception e2) {
                // Dump info about not finding the properties file.
                log.severe(e2.getMessage());
            }
        }

        // Set the locale character example data.
        characters = localeData.getProperty("Characters_" + locale) + "0123456789";
        Locale = new Locale(locale);
        localeStrings = strings;

        // Return the properties.
        return strings;
    }

    /**
     * Method to initialize our logging based on TestEnvironment.properties.
     */
    public void initializeLogging() {
        // Log to the console by default, write to a log file if one is set in
        // the TestEvironment.properties.
        if (appProperties.getLogfile() != null) {
            try {
                // Add the file handler, create directory if it doesn't exist.
                String logFile = appProperties.getLogfile();
                new File(logFile).getParentFile().mkdir();
                FileHandler fileHandler = new FileHandler(logFile, true);
                fileHandler.setFormatter(new SimpleFormatter());
                log.addHandler(fileHandler);
            } catch (Exception e) {
                // Log to the default log handler.
                log.severe("Failed to add file handler, reason: " + e.getMessage());
            }
        }

        // Set the filter on our logger.
        log.setFilter(new TestLogFilter());

        // Set our log level based on the TestEnvironment.properties.
        log.setLevel(Level.parse(appProperties.getLogLevel()));
    }

    /**
     * Method to manually click on an element, instead of using the WebElement.click() method. Workaround for Selenium issue 2750.
     * 
     * @param browser
     *            WebDriver to act in.
     * @param element
     *            WebElement to click on.
     */
    public void manualClick(WebDriver browser, WebElement element) {
        Actions builder = new Actions(browser);
        Action manualClick = builder.click(element).build();
        log.warning("A workaround for Selenium issue 2750, Chrome complaining another element would receive the click. This clicks the element a different way.");
        manualClick.perform();
    }

    /**
     * Method to press keyboard keys, without specifying a WebElement.
     * 
     * @param browser
     *            WebDriver to act in.
     * @param keys
     *            String of keys to send.
     */
    public void sendKeys(WebDriver browser, String keys) {
        Actions builder = new Actions(browser);
        builder.sendKeys(keys);
        Action keyPresses = builder.build();
        keyPresses.perform();
    }
}