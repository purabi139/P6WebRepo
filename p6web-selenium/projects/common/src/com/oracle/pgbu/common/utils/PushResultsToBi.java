package com.oracle.pgbu.common.utils;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.NotDirectoryException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class PushResultsToBi {

	final static String BROWSER = "browser";
	final static String JOBID = "build.id";
	final static String PROJECT_ID = "project.id";
	final static String TEST_TYPE = "testtype";
	final static String BIServer_URL = "biserver.url";
	final static String REPORT_PATH = "reports.path";

	String m_testResultPath = null;
	String m_projectId = null;
	String m_testType = null;
	String m_browser = null;
	String m_jobID = null;

	public PushResultsToBi() {
		m_projectId = System.getProperty(PROJECT_ID);
		m_testType = System.getProperty(TEST_TYPE);
		m_browser = System.getProperty(BROWSER);
		m_jobID = System.getProperty(JOBID);

		if (m_projectId == null || m_testType == null || m_browser == null || m_jobID == null) {
			throw new RuntimeException("one of the required parameters is missing: " + BROWSER + "," + JOBID + "," + PROJECT_ID + "," + TEST_TYPE + "," + BIServer_URL);
		}
	}

	/**
	 * Return an array list of all .xml files available in a given folder.
	 * 
	 * @param dir
	 * @return
	 */
	public static ArrayList<Path> getFiles(Path dir) throws IOException, NotDirectoryException {
		ArrayList<Path> arrList = new ArrayList<Path>();

		if (Files.isDirectory(dir)) {
			try (DirectoryStream<Path> files = Files.newDirectoryStream(dir)) {
				for (Path file : files) {
					if (Files.isRegularFile(file) || Files.isSymbolicLink(file)) {
						int dotPos = file.toString().lastIndexOf(".");
						if (dotPos > 0) {
							if (file.toString().substring(dotPos).equals(".xml")) {
								arrList.add(file);
							}
						}

					}
				}
			}
		} else
			throw new NotDirectoryException(dir + " is not directory");

		return arrList;
	}

	/**
	 * Return a json array string which contains list information of test cases
	 * i.e; date of execution ,job id, test case name ,pass count,fail
	 * count,project id,BI server url,platform and test type.
	 * 
	 * @param sDir
	 * @return
	 */
	public String returnJSONString(String sDir) throws NotDirectoryException, IOException, ParserConfigurationException, SAXException, JSONException {
		int iCount;
		JSONObject array;
		JSONArray jArray;
		String testName = null;

		ArrayList<Path> arrList = getFiles(Paths.get(sDir));

		Map<String, Results> tests = new HashMap<>();

		for (iCount = 0; iCount < arrList.size(); iCount++) {
			File fXmlFile = new File(arrList.get(iCount).toFile().toString());
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(fXmlFile);
			doc.getDocumentElement().normalize();

			NodeList nList = doc.getElementsByTagName("testcase");

			for (int temp = 0; temp < nList.getLength(); temp++) {
				Node nNode = nList.item(temp);
				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element) nNode;
					testName = eElement.getAttribute("classname");

					Results result = tests.get(testName);
					if (result == null) {
						result = new Results();
					}

					if (eElement.getElementsByTagName("skipped").getLength() > 0) {
						result.setSkipped(result.getSkipped() + 1);
					} else if (eElement.hasChildNodes() || eElement.getAttribute("name").equals("initializationError")) {
						result.setFailed(result.getFailed() + 1);
					} else {
						result.setPassed(result.getPassed() + 1);
					}
					tests.put(testName, result);
				}
			}

		}

		jArray = new JSONArray();
		long date = new Date().getTime();
		for (Entry<String, Results> temp : tests.entrySet()) {
			array = new JSONObject();
			array.put("date", date);
			array.put("id", m_jobID);
			array.put("projectID", m_projectId);
			array.put("testType", m_testType);
			array.put("platform", m_browser);
			array.put("testGroup", temp.getKey());
			array.put("passCount", temp.getValue().getPassed());
			array.put("failCount", temp.getValue().getFailed());
			array.put("noRunCount", temp.getValue().getSkipped());
			jArray.put(array);
		}
		System.out.println(jArray.toString());
		return jArray.toString(); // returning a json array into string
	}

	/*
	 * Appraoch 2 :Post json array data on server
	 */

	/**
	 * Post json array string on BI dashboard server and return a response
	 * string after posting result data on BI Dashboard Server
	 * 
	 * @param targetURL
	 * @param strMessage
	 * @return
	 */
	public String submitDataToBIDashboard(String targetURL, String urlParameters) {
		URL url;
		HttpURLConnection connection = null;
		try {
			// Create connection
			url = new URL(targetURL);
			connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("POST");
			connection.setRequestProperty("Content-Type", "application/json");
			connection.setRequestProperty("Content-Length", "" + Integer.toString(urlParameters.getBytes().length));
			connection.setRequestProperty("Content-Language", "en-US");

			connection.setUseCaches(false);
			connection.setDoInput(true);
			connection.setDoOutput(true);

			// Send request
			DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
			wr.writeBytes(urlParameters.trim());
			wr.flush();
			wr.close();

			// Get Response

			InputStream is = connection.getInputStream();
			BufferedReader rd = new BufferedReader(new InputStreamReader(is));

			String line;
			StringBuffer response = new StringBuffer();
			while ((line = rd.readLine()) != null) {
				response.append(line);
				response.append('\r');
			}
			rd.close();
			return response.toString();

		} catch (Exception e) {

			e.printStackTrace();
			return null;

		} finally {

			if (connection != null) {
				connection.disconnect();
			}
		}
	}

	/**
	 * Post json array string on BI dashboard server and return a response
	 * string after posting result data on BI Dashboard Server
	 * 
	 * @param targetURL
	 * @param strMessage
	 * @return
	 */
	public String postDataToBIDashboard(String targetURL, String strMessage) throws NotDirectoryException, IOException, ParserConfigurationException, SAXException, JSONException {
		HttpClient httpClient = null;

		try {
			httpClient = new DefaultHttpClient();
			HttpPost request = new HttpPost(targetURL);
			StringEntity params = new StringEntity(strMessage, StandardCharsets.UTF_8);
			request.addHeader("content-type", "application/json");
			request.addHeader("Content-Language", "en-US");
			request.setEntity(params);
			HttpResponse response = httpClient.execute(request);
			return response.toString();

		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
			httpClient.getConnectionManager().shutdown();
		}
		return null;
	}

	public static void main(String aa[]) throws IOException, ParserConfigurationException, SAXException, JSONException {
		String biServerURL = System.getProperty(BIServer_URL);
		String resultsPath = System.getProperty(REPORT_PATH);

		PushResultsToBi json = new PushResultsToBi();
		String message = json.returnJSONString(resultsPath);
		// Approach 1
		String responce = json.submitDataToBIDashboard(biServerURL, message);
		System.out.println(responce);
		// Approach 2
		// responce = json.postDataToBIDashboard(m_biServerURL, message);
		// System.out.println(responce);
	}

	protected class Results {
		int m_passed;
		int m_failed;
		int m_skipped;

		Results() {
			m_passed = 0;
			m_failed = 0;
			m_skipped = 0;
		}

		public int getPassed() {
			return m_passed;
		}

		public void setPassed(int passed) {
			m_passed = passed;
		}

		public int getFailed() {
			return m_failed;
		}

		public void setFailed(int failed) {
			m_failed = failed;
		}

		public int getSkipped() {
			return m_skipped;
		}

		public void setSkipped(int skipped) {
			m_skipped = skipped;
		}

	}
}
