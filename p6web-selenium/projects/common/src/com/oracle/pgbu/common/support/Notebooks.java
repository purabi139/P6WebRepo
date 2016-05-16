package com.oracle.pgbu.common.support;

import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.xml.ws.BindingProvider;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;

import com.primavera.ws.p6.notebooktopic.NotebookTopic;
import com.primavera.ws.p6.notebooktopic.NotebookTopicFieldType;
import com.primavera.ws.p6.notebooktopic.NotebookTopicPortType;
import com.primavera.ws.p6.notebooktopic.NotebookTopicService;

/**
 * For data manipulation of P6 Notebook objects.
 */
public class Notebooks {
	// WSDLs needed for manipulation of Notebook data.
	private static final String NOTEBOOK_TOPIC_SERVICE = "/services/NotebookTopicService?wsdl";

	// Web Service utilities.
	private Utilities utils;
	private WebServiceUtils wsUtils;

	/**
	 * For storing Notebook object IDs for cleanup.
	 */
	public List<Integer> notebookCleanup;
	
	/**
	 * Returns an instance of the Notebooks class, for handling Notebook data setup.
	 */
	public Notebooks() {
		// Initialize the other utility classes needed.
		utils = Utilities.getInstance();
		wsUtils = WebServiceUtils.getInstance();
		
		// Initialize the cleanup list.
		notebookCleanup = new ArrayList<Integer>();
	}

	/**
	 * Creates notebook topic for activity; returns notebook topic object.
	 * 
	 * @param notebookTopicName
	 *            String to use as Notebook Topic name.
	 * @return NotebookTopic object from P6.
	 */
	public NotebookTopic createNotebookTopic(String notebookTopicName) {
		// Create notebook topic with required fields
		NotebookTopic notebookTopic = new NotebookTopic();
		notebookTopic.setName(notebookTopicName);
		notebookTopic.setAvailableForActivity(true);
		return createNotebookTopic(notebookTopic);
	}

	/**
	 * Creates note book topic; returns notebook topic object.
	 * 
	 * @param notebookTopic
	 *            notebookTopic object to create in P6.
	 * @return notebookTopic object from P6.
	 */
	public NotebookTopic createNotebookTopic(NotebookTopic notebookTopic) {
		NotebookTopicPortType servicePort = createNotebookTopicServicePort();
		List<NotebookTopic> notebookTopics = new ArrayList<NotebookTopic>();
		notebookTopics.add(notebookTopic);

		try {
			// Create the notebook topic, save the ID for cleanup later.
			int objId = servicePort.createNotebookTopics(notebookTopics).get(0);
			notebookCleanup.add(objId);

			// Include the new object ID with the original notebook topic object
			// and
			// return it.
			notebookTopic.setObjectId(objId);
			utils.log.fine("Successfully created notebook topic, ObjectId: " + objId);
			return notebookTopic;
		}
		catch (com.primavera.ws.p6.notebooktopic.IntegrationFault e) {
			utils.log.severe(e.getMessage());
			return null;
		}
	}

	/**
	 * Reads Notebook topic by provided name
	 * 
	 * @param notebookTopicName
	 *            String identifier for the Notebook Topic to read.
	 * @return NotebookTopic object from P6.
	 */
	public NotebookTopic readNotebookTopic(String notebookTopicName) {
		NotebookTopicPortType servicePort = createNotebookTopicServicePort();

		// Read all fields
		List<NotebookTopicFieldType> fields = new ArrayList<NotebookTopicFieldType>();
		fields.addAll(Arrays.asList(NotebookTopicFieldType.values()));

		// Load Notebook topic with specific name
		try {
			NotebookTopic notebookTopic = servicePort.readNotebookTopics(fields, "Name = '" + notebookTopicName + "'", null).get(0);
			utils.log.fine("Successfully read notebook " + notebookTopicName);
			return notebookTopic;
		}
		catch (Exception e) {
			utils.log.severe(e.getMessage());
			return null;
		}
	}

	/**
	 * Updates NotebookTopic
	 * 
	 * @param notebookTopic
	 *            Notebook Topic object to update.
	 * @return boolean true if update was successful, false if not.
	 */
	public boolean updateNotebookTopic(NotebookTopic notebookTopic) {
		NotebookTopicPortType servicePort = createNotebookTopicServicePort();
		List<NotebookTopic> notebookTopics = new ArrayList<NotebookTopic>();

		notebookTopics.add(notebookTopic);

		try {
			boolean flag = servicePort.updateNotebookTopics(notebookTopics);
			if (flag)
				utils.log.fine("Successfully updated notebook topic " + notebookTopic.getObjectId());
			else
				utils.log.warning("Notebook Topic " + notebookTopic.getObjectId() + " was NOT updated.");
			return flag;
		}
		catch (com.primavera.ws.p6.notebooktopic.IntegrationFault e) {
			utils.log.severe(e.getMessage());
			return false;
		}
	}

	/**
	 * Deletes Notebook topic by provided Notebook topic object id
	 * 
	 * @param notebookTopicObjectId
	 *            int identifier for the P6 Notebook topic object to delete.
	 * @return boolean true if it was successfully deleted, false if not.
	 */
	public boolean deleteNotebookTopic(int notebookTopicObjectId) {
		List<Integer> singleId = new ArrayList<Integer>();
		singleId.add(notebookTopicObjectId);
		return deleteNotebookTopics(singleId);
	}

	/**
	 * Deletes Notebook by provided Notebook object ids
	 * 
	 * @param notebookTopicObjectIds
	 *            int identifiers for all the P6 Notebook topic objects to delete.
	 * @return boolean true if the notebook topic were successfully deleted, false if not.
	 */
	public boolean deleteNotebookTopics(List<Integer> notebookTopicObjectIds) {
		NotebookTopicPortType servicePort = createNotebookTopicServicePort();

		try {
			boolean flag = servicePort.deleteNotebookTopics(notebookTopicObjectIds);
			if (flag)
				utils.log.fine("Notebook " + notebookTopicObjectIds + " were successfully deleted.");
			else
				utils.log.warning("Notebook " + notebookTopicObjectIds + " were NOT deleted.");
			return flag;
		}
		catch (com.primavera.ws.p6.notebooktopic.IntegrationFault e) {
			utils.log.severe(e.getMessage());
			return false;
		}
	}

	/**
	 * Creates an instance of the NotebookTopicService.
	 * 
	 * @return NotebooktopicPortType
	 */
	private NotebookTopicPortType createNotebookTopicServicePort() {
		URL wsdlURL = wsUtils.createURL(NOTEBOOK_TOPIC_SERVICE);
		NotebookTopicService service = new NotebookTopicService(wsdlURL);
		NotebookTopicPortType servicePort = service.getNotebookTopicPort();
		Client client = ClientProxy.getClient(servicePort);
		wsUtils.addMessageInterceptors(client);
		wsUtils.addCookieToHeader((BindingProvider) servicePort);

		return servicePort;
	}
}