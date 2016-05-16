package com.oracle.pgbu.common.objects.jq;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.oracle.pgbu.common.objects.BaseElement;
import com.oracle.pgbu.common.utils.ApplicationProperties;

public class DatePicker extends BaseElement {

	public final static String DATE_FORMAT_MDY = "MM-dd-yyyy";
	private final static Logger logger = LoggerFactory.getLogger(DatePicker.class);

	final static HashMap<String, Integer> monthNameMap;
	static {
		monthNameMap = new HashMap<String, Integer>();
		monthNameMap.put("January", 1);
		monthNameMap.put("February", 2);
		monthNameMap.put("March", 3);
		monthNameMap.put("April", 4);
		monthNameMap.put("May", 5);
		monthNameMap.put("June", 6);
		monthNameMap.put("July", 7);
		monthNameMap.put("August", 8);
		monthNameMap.put("September", 9);
		monthNameMap.put("October", 10);
		monthNameMap.put("November", 11);
		monthNameMap.put("December", 12);

	}

	public DatePicker(WebElement element) {
		super(element);
	}

	@Override
	public String getText() {
		return m_element.getAttribute("value");
	}

	public void setText(String text) {
		click();
		m_element.clear();
		m_element.sendKeys(text);
	}

	public boolean isReadOnly() {
		if (m_element.getAttribute("readonly") != null && (m_element.getAttribute("readonly").equalsIgnoreCase("true")))
			return true;
		else
			return false;
	}

	// click on Today button in Date button
	public void clickTodayButton() {
		m_element.findElement(By.cssSelector("button.today")).click();
	}

	// click on Cancel button in Date button
	public void clickCancelButton() {
		m_element.findElement(By.cssSelector("button.cancel")).click();
	}

	// click on Next month/year button in Date button
	public void clickNextButton(int index) {
		m_element.findElements(By.cssSelector(".next-buttons button")).get(index).click();
	}

	// click on Previous month/year button in Date button
	public void clickPrevButton(int index) {
		m_element.findElements(By.cssSelector(".prev-buttons button")).get(index).click();
	}

	// get title
	public String getTitle() {
		String Title = m_element.findElement(By.cssSelector("div.calendar .title")).getText();
		return Title;
	}

	public void selectDate(String date, String format) {
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		try {
			Calendar cal = Calendar.getInstance();
			cal.setTime(dateFormat.parse(date));
			int day = cal.get(Calendar.DAY_OF_MONTH);
			int month = cal.get(Calendar.MONTH) + 1;
			int year = cal.get(Calendar.YEAR);
			String time = new SimpleDateFormat("HH:mm").format(cal.getTime());
			logger.debug("Selecting Day: " + day + " Month: " + month + " Year: " + year + " Time: " + time);
			selectDate(day, month, year, time);
		} catch (ParseException e) {
			throw new RuntimeException("Failed to Parse " + date + " with format " + format, e);
		}
	}

	public void selectDate(int day, int month, int year) {
		WebElement dateTitle = m_element.findElement(By.cssSelector("div.calendar .title"));
		String[] parts = dateTitle.getText().split(" ");

		int currentMonth = monthNameMap.get(parts[0]);
		int currentYear = Integer.parseInt(parts[1]);

		// actual month greater than desired month. decrease an actual month
		while (currentMonth > month) {
			clickPrevButton(1);
			currentMonth--;
		}
		// actual month smaller than a desired month. increase an actual month
		while (currentMonth < month) {
			clickNextButton(0);
			currentMonth++;
		}
		// actual year greater than desired year. decrease an actual year
		while (currentYear > year) {
			clickPrevButton(0);
			currentYear--;
		}

		// actual year smaller than a desired year. increase an actual year
		while (currentYear < year) {
			clickNextButton(1);
			currentYear++;
		}

		List<WebElement> days = getDays();
		for (WebElement element : days) {
			if (element.getText().equals(Integer.toString(day))) {
				new Actions(m_driver).doubleClick(element).build().perform();
				break;
			}
		}

	}

	public void selectDate(int day, int month, int year, String time) {
		try {
			ApplicationProperties.getInstance().disableWaitTime();
			TextBox timeBox = new TextBox(m_driver.findElement(com.oracle.pgbu.common.By.jQuery(".today-cancel .spinner input")));
			if (timeBox.isDisplayed()) {
				m_jsDriver.executeScript("$('.today-cancel .spinner input').val(\"" + time + "\").change()");
			}
		} catch (NoSuchElementException e) {
			logger.debug("Time textbox not found in date control");
		} finally {
			ApplicationProperties.getInstance().setTimeouts();
		}

		selectDate(day, month, year);
	}

	public List<WebElement> getDays() {
		List<WebElement> days = getElement().findElements(By.cssSelector("td.current-month"));
		return days;
	}
}