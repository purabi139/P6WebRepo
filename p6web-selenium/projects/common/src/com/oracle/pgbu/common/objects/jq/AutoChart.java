package com.oracle.pgbu.common.objects.jq;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.WebElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.oracle.pgbu.common.By;
import com.oracle.pgbu.common.objects.BaseElement;

public class AutoChart extends BaseElement {

	private static final Logger logger = LoggerFactory.getLogger(AutoChart.class);

	public AutoChart(WebElement element) {
		super(element);
	}

	public void setCellValue(int colNumber, String value) {
		logger.debug("Executing: $('div#chartInputs input[data-id=+colNumber+]').attr('value',+value+).change()");
		m_jsDriver.executeScript("$('div#chartInputs input[data-id=" + colNumber + "]').attr('value'," + value + ").change()");
	}

	public String getCellValue(int colNumber) {
		return (String) (m_jsDriver.executeScript("return $('div#chartInputs input[data-id=" + colNumber + "]').val()"));
	}

	public boolean selectItem(int colName) {
		return (Boolean) (m_jsDriver.executeScript("return $('input')[" + colName + "]"));
	}

	public List<String> getCellValues() {
		return (List<String>) m_jsDriver.executeScript("var a = $('#chartInputs > input'); var b = []; _.each(a, function(element) { b.push($(element).val()) }); return b;");
	}

	public String getTotal() {
		return (String) m_jsDriver.executeScript("return $('div#chartTotal').text()");
	}

	public Boolean isDisabled(int colNumer) {
		return (Boolean) m_jsDriver.executeScript("return $('input')[" + colNumer + "].disabled");
	}
	
	public List<Double> getBarHeights() {
		List<WebElement> elements = m_driver.findElements(By.className("bar"));
		List<Double> heights = new ArrayList<Double>();
		for (WebElement element : elements) {
			heights.add(Double.parseDouble(element.getAttribute("height").toString()));
		}
		return heights;
	}

}
