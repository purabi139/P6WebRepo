package com.oracle.pgbu.common.support;

import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.xml.bind.JAXBElement;
import javax.xml.ws.BindingProvider;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;

import com.primavera.ws.p6.activity.Activity;
import com.primavera.ws.p6.document.Document;
import com.primavera.ws.p6.document.DocumentFieldType;
import com.primavera.ws.p6.document.DocumentPortType;
import com.primavera.ws.p6.document.DocumentService;
import com.primavera.ws.p6.documentstatuscode.DocumentStatusCode;
import com.primavera.ws.p6.documentstatuscode.DocumentStatusCodeFieldType;
import com.primavera.ws.p6.documentstatuscode.DocumentStatusCodePortType;
import com.primavera.ws.p6.documentstatuscode.DocumentStatusCodeService;
import com.primavera.ws.p6.projectdocument.ProjectDocument;
import com.primavera.ws.p6.projectdocument.ProjectDocumentFieldType;
import com.primavera.ws.p6.projectdocument.ProjectDocumentPortType;
import com.primavera.ws.p6.projectdocument.ProjectDocumentService;

/**
 * For data manipulation of P6 Document objects.
 */
public class Documents {
	// WSDLs needed for manipulation of Document data.
	private static final String DOCUMENT_SERVICE = "/services/DocumentService?wsdl";
	private static final String DOCUMENT_STATUS_CODE_SERVICE = "/services/DocumentStatusCodeService?wsdl";
	private static final String PROJECT_DOCUMENT_SERVICE = "/services/ProjectDocumentService?wsdl";
	
	// Private instance of the Utilities class.
	private Utilities utils;
	private WebServiceUtils wsUtils;

	/**
	 * For storing Document object IDs for cleanup.
	 */
	public List<Integer> documentCleanup;
	
	/**
	 * For storing Document Status Code object IDs for cleanup.
	 */
	public List<Integer> statusCodeCleanup;
	
	/**
	 * Returns an instance of the Documents class, for handling Documents data setup.
	 */
	public Documents() {
		// Initialize the other utility classes needed.
		utils = Utilities.getInstance();
		wsUtils = WebServiceUtils.getInstance();
		
		// Initialize the cleanup lists.
		documentCleanup = new ArrayList<Integer>();
		statusCodeCleanup = new ArrayList<Integer>();
	}
	
	/**
	 * Assigns document to activity. 3 Steps are executed. Step 1: Creates document status code Step 2: Creates P6 document which is tied to project. Step 3: Assigns document to activity.
	 * 
	 * @param documentStatusCode
	 *            String to use for the new document status code.
	 * @param documentTitle
	 *            String to use for the new document title.
	 * @param projectObjectId
	 *            int identifier for the P6 Project object.
	 * @param activityObjectId
	 *            int identifier for the P6 Activity object.
	 * @return ProjectDocument object from P6.
	 * 
	 */
	public ProjectDocument createActivityDocumentAssignment(String documentStatusCode, String documentTitle, String documentLocation, int projectObjectId, int activityObjectId) {

		// create new document status code
		DocumentStatusCode myDocumentStatusCode = createDocumentStatusCode(documentStatusCode);
		// create new document
		Document myDocument = createDocument(projectObjectId, myDocumentStatusCode.getObjectId(), documentTitle, documentLocation);
		// assign document to activity
		ProjectDocument myProjectDocument = createProjectDocument(myDocument.getObjectId(), activityObjectId);

		return myProjectDocument;
	}

	/**
	 * P6 WS method which assigns document to either Project, WBS, or Activity, depends on the passed id value and populated field.
	 * 
	 * @param documentObjectId
	 *            int identifier for the Document object.
	 * @param activityObjectId
	 *            int identifier for the Activity object. return Project Document object from P6.
	 */
	public ProjectDocument createProjectDocument(int documentObjectId, int activityObjectId) {
		ProjectDocumentPortType servicePort = createProjectDocumentServicePort();
		List<ProjectDocument> projectDocuments = new ArrayList<ProjectDocument>();

		// Create Project Document
		ProjectDocument projDocument = new ProjectDocument();
		projDocument.setDocumentObjectId(documentObjectId);
		JAXBElement<Integer> activityObjectIds = wsUtils.getJAXBInteger(activityObjectId, "ProjectDocument", "ActivityObjectId");
		projDocument.setActivityObjectId(activityObjectIds);

		projectDocuments.add(projDocument);

		try {
			int objId = servicePort.createProjectDocuments(projectDocuments).get(0);
			projDocument.setObjectId(objId);
			utils.log.fine("Successfully created project document for activity " + activityObjectId + " and document " + documentObjectId + ".");
			return projDocument;
		}
		catch (com.primavera.ws.p6.projectdocument.IntegrationFault e) {
			utils.log.severe(e.getMessage());
			return null;
		}
	}

	/**
	 * Creates Document; document status code object id, project object id and document title must be provided.
	 * 
	 * @param projectObjectId
	 *            int to identify project.
	 * @param docStatusCodeObjectId
	 *            int to identify document status code.
	 * @param docTitle
	 *            String title of document.
	 * @param documentLocation
	 *            String Location of document.
	 * @return Document object from P6.
	 */
	public Document createDocument(int projectObjectId, int docStatusCodeObjectId, String docTitle, String documentLocation) {
		DocumentPortType servicePort = createDocumentServicePort();
		List<Document> documents = new ArrayList<Document>();

		// Create document with required fields
		Document document = new Document();
		JAXBElement<Integer> projectObjectIds = wsUtils.getJAXBInteger(projectObjectId, "Document", "ProjectObjectId");
		document.setProjectObjectId(projectObjectIds);
		JAXBElement<Integer> docStatusCodeObjectIds = wsUtils.getJAXBInteger(docStatusCodeObjectId, "Document", "DocumentStatusCodeObjectId");
		document.setDocumentStatusCodeObjectId(docStatusCodeObjectIds);
		document.setTitle(docTitle);
		document.setPublicLocation(documentLocation);

		documents.add(document);

		try {
			int objId = servicePort.createDocuments(documents).get(0);
			documentCleanup.add(objId);
			document.setObjectId(objId);
			utils.log.fine("Successfully created document: " + objId);
			return document;
		}
		catch (com.primavera.ws.p6.document.IntegrationFault e) {
			utils.log.severe(e.getMessage());
			return null;
		}
	}

	/**
	 * Creates Document Status Code (The current status of the document.) This object is necessary for creating of documents.
	 * 
	 * @param documentStatusCode
	 *            String for the new document status code name.
	 * @return DocumentStatusCode P6 object.
	 */
	public DocumentStatusCode createDocumentStatusCode(String documentStatusCode) {
		DocumentStatusCodePortType servicePort = createDocumentStatusCodeServicePort();
		List<DocumentStatusCode> documentStatusCodes = new ArrayList<DocumentStatusCode>();

		// Create document status code with required fields
		DocumentStatusCode docStatusCode = new DocumentStatusCode();
		docStatusCode.setName(documentStatusCode);

		documentStatusCodes.add(docStatusCode);

		try {
			int objId = servicePort.createDocumentStatusCodes(documentStatusCodes).get(0);
			statusCodeCleanup.add(objId);
			docStatusCode.setObjectId(objId);
			utils.log.fine("Successfully created document status code, ObjectId: " + objId);
			return docStatusCode;
		}
		catch (com.primavera.ws.p6.documentstatuscode.IntegrationFault e) {
			utils.log.severe(e.getMessage());
			return null;
		}
	}

	/**
	 * Deletes Document
	 * 
	 * @param documentObjectId
	 *            int identifier for the P6 Document object.
	 * @return boolean true if the document was successfully deleted, false if not.
	 */
	public boolean deleteDocument(int documentObjectId) {
		List<Integer> singleId = new ArrayList<Integer>();
		singleId.add(documentObjectId);
		return deleteDocuments(singleId);
	}

	/**
	 * Deletes Documents
	 * 
	 * @param documentObjectIds
	 *            int identifiers for all the P6 Document objects to delete.
	 * @return boolean true if the documents were successfully deleted, false if not.
	 */
	public boolean deleteDocuments(List<Integer> documentObjectIds) {
		DocumentPortType servicePort = createDocumentServicePort();

		try {
			boolean flag = servicePort.deleteDocuments(documentObjectIds);
			if (flag)
				utils.log.fine("Successfully deleted document: " + documentObjectIds);
			else
				utils.log.warning("Documents: " + documentObjectIds + " were not deleted.");
			return flag;
		}
		catch (com.primavera.ws.p6.document.IntegrationFault e) {
			utils.log.severe(e.getMessage());
			return false;
		}
	}

	/**
	 * Reads Document
	 * 
	 * @param docTitle
	 *            String identifier for the document to read.
	 * @return Document object from P6.
	 */
	public Document readDocument(String docTitle) {
		DocumentPortType servicePort = createDocumentServicePort();

		// Read all fields
		List<DocumentFieldType> fields = new ArrayList<DocumentFieldType>();
		fields.addAll(Arrays.asList(DocumentFieldType.values()));

		// Load document with specific name
		try {
			Document document = servicePort.readDocuments(fields, "Title = '" + docTitle + "'", "").get(0);
			utils.log.fine("Successfully read document " + docTitle);
			return document;
		}
		catch (Exception e) {
			utils.log.severe(e.getMessage());
			return null;
		}
	}

	/**
	 * Reads Document Status Code
	 * 
	 * @param docStatusCodeName
	 *            String identifier for the DocumentStatusCode.
	 * @return DocumentStatusCode object from P6.
	 */
	public DocumentStatusCode readDocumentStatusCode(String docStatusCodeName) {
		DocumentStatusCodePortType servicePort = createDocumentStatusCodeServicePort();

		// Read all fields
		List<DocumentStatusCodeFieldType> fields = new ArrayList<DocumentStatusCodeFieldType>();
		fields.addAll(Arrays.asList(DocumentStatusCodeFieldType.values()));

		// Load document status code with specific name
		try {
			DocumentStatusCode docStatusCode = servicePort.readDocumentStatusCodes(fields, "Name = '" + docStatusCodeName + "'", "").get(0);
			utils.log.fine("Successfully read document status code " + docStatusCodeName);
			return docStatusCode;
		}
		catch (Exception e) {
			utils.log.severe(e.getMessage());
			return null;
		}
	}

	/**
	 * Reads activity document assignment
	 * 
	 * @param activityObjectId
	 *            int identifier for the Activity object from P6.
	 * @param docTitle
	 *            String Title of the Document object from P6.
	 * 
	 * @return Activity Document Assignment (Project Document) Object.
	 */
	public ProjectDocument readActivityDocumentAssignment(int activityObjectId, String docTitle) {
		Document myDocument = readDocument(docTitle);
		return readProjectDocument(activityObjectId, myDocument.getObjectId());
	}

	/**
	 * Updates Document
	 * 
	 * @param document
	 *            Document object to update.
	 * @return boolean true if update was successful, false if not.
	 */
	public boolean updateDocument(Document document) {
		DocumentPortType servicePort = createDocumentServicePort();
		List<Document> documents = new ArrayList<Document>();
		documents.add(document);
		try {
			boolean flag = servicePort.updateDocuments(documents);
			if (flag)
				utils.log.fine("Successfully updated document " + document.getObjectId());
			else
				utils.log.warning("Document " + document.getObjectId() + " was NOT updated.");
			return flag;
		}
		catch (com.primavera.ws.p6.document.IntegrationFault e) {
			utils.log.severe(e.getMessage());
			return false;
		}
	}

	/**
	 * Updates Document Status Code
	 * 
	 * @param docStatusCode
	 *            DocumentStatusCode object to update.
	 * @return boolean true if update was successful, false if not.
	 */
	public boolean updateDocumentStatusCode(DocumentStatusCode docStatusCode) {
		DocumentStatusCodePortType servicePort = createDocumentStatusCodeServicePort();
		List<DocumentStatusCode> dosStatusCodes = new ArrayList<DocumentStatusCode>();
		dosStatusCodes.add(docStatusCode);
		try {
			boolean flag = servicePort.updateDocumentStatusCodes(dosStatusCodes);
			if (flag)
				utils.log.fine("Successfully updated document status code " + docStatusCode.getObjectId());
			else
				utils.log.warning("Document status code " + docStatusCode.getObjectId() + " was NOT updated.");
			return flag;
		}
		catch (com.primavera.ws.p6.documentstatuscode.IntegrationFault e) {
			utils.log.severe(e.getMessage());
			return false;
		}
	}

	/**
	 * Reads project document
	 * 
	 * @param activityObjectId
	 *            int identifier for the Activity object from P6.
	 * @param documentObjectId
	 *            int identifier for the Document object from P6.
	 * 
	 * @return Project Document Object.
	 */
	public ProjectDocument readProjectDocument(int activityObjectId, int documentObjectId) {
		ProjectDocumentPortType servicePort = createProjectDocumentServicePort();

		// Read all fields.
		List<ProjectDocumentFieldType> fields = new ArrayList<ProjectDocumentFieldType>();
		fields.addAll(Arrays.asList(ProjectDocumentFieldType.values()));

		// Load activity document assignment with specific activity and document
		// object Ids
		try {
			ProjectDocument projDocument = servicePort.readProjectDocuments(fields, "(ActivityObjectId = '" + activityObjectId + "') and (DocumentObjectId = '" + documentObjectId + "')", "").get(0);
			utils.log.fine("Successflly read activity document assignment for activity " + activityObjectId + " and document " + documentObjectId);
			return projDocument;
		}
		catch (Exception e) {
			utils.log.severe(e.getMessage());
			return null;
		}
	}

	/**
	 * Reads Project Documents of specific activity
	 * 
	 * @param myActivity
	 *            Activity object from P6.
	 * 
	 * @return List of Project Document Objects.
	 */
	public List<ProjectDocument> readProjectDocuments(Activity myActivity) {
		ProjectDocumentPortType servicePort = createProjectDocumentServicePort();

		// Read all fields.
		List<ProjectDocumentFieldType> fields = new ArrayList<ProjectDocumentFieldType>();
		fields.addAll(Arrays.asList(ProjectDocumentFieldType.values()));

		// Load list of activity document assignments for specific activity
		// object Id
		try {
			List<ProjectDocument> projDocumentList = servicePort.readProjectDocuments(fields, "ActivityObjectId = '" + myActivity.getObjectId() + "'", "");
			utils.log.fine("Successflly read all activity document assignments for activity " + myActivity.getObjectId());
			return projDocumentList;
		}
		catch (Exception e) {
			utils.log.severe(e.getMessage());
			return null;
		}
	}

	/**
	 * Updates Project Document
	 * 
	 * @param projDocument
	 *            Project Document object to update.
	 * @return boolean true if update was successful, false if not.
	 */
	public boolean updateProjectDocument(ProjectDocument projDocument) {
		ProjectDocumentPortType servicePort = createProjectDocumentServicePort();
		List<ProjectDocument> projDocuments = new ArrayList<ProjectDocument>();
		projDocuments.add(projDocument);
		try {
			boolean flag = servicePort.updateProjectDocuments(projDocuments);
			if (flag)
				utils.log.fine("Successfully updated project document " + projDocument.getObjectId());
			else
				utils.log.warning("Project document " + projDocument.getObjectId() + " was NOT updated.");
			return flag;
		}
		catch (com.primavera.ws.p6.projectdocument.IntegrationFault e) {
			utils.log.severe(e.getMessage());
			return false;
		}
	}

	/**
	 * Updates Activity Document assignment
	 * 
	 * @param projDocument
	 *            Activity Document assignment object to update.
	 * @return boolean true if update was successful, false if not.
	 */
	public boolean updateActivityDocumentAssignment(ProjectDocument projDocument) {
		try {
			boolean flag = updateProjectDocument(projDocument);
			if (flag)
				utils.log.fine("Successfully updated activity document assignment" + projDocument.getObjectId());
			else
				utils.log.warning("Activity Document assignment " + projDocument.getObjectId() + " was NOT updated.");
			return flag;
		}
		catch (Exception e) {
			utils.log.severe(e.getMessage());
			return false;
		}
	}

	/**
	 * Deletes Document Status Code
	 * 
	 * @param docStatusCodeObjectId
	 *            int identifier for the P6 DocumentStatusCode object.
	 * @return boolean true if the document status code was successfully deleted, false if not.
	 */
	public boolean deleteDocumentStatusCode(int docStatusCodeObjectId) {
		List<Integer> singleId = new ArrayList<Integer>();
		singleId.add(docStatusCodeObjectId);
		return deleteDocumentStatusCodes(singleId);
	}

	/**
	 * Deletes Document Status Codes
	 * 
	 * @param docStatusCodeObjectIds
	 *            int identifiers for all the P6 DocumentStatusCode objects to delete.
	 * @return boolean true if the document status codes were successfully deleted, false if not.
	 */
	public boolean deleteDocumentStatusCodes(List<Integer> docStatusCodeObjectIds) {
		DocumentStatusCodePortType servicePort = createDocumentStatusCodeServicePort();

		try {
			boolean flag = servicePort.deleteDocumentStatusCodes(docStatusCodeObjectIds);
			if (flag)
				utils.log.fine("Successfully deleted document status codes: " + docStatusCodeObjectIds);
			else
				utils.log.warning("DocumentStatusCodes: " + docStatusCodeObjectIds + " were not deleted.");
			return flag;
		}
		catch (com.primavera.ws.p6.documentstatuscode.IntegrationFault e) {
			utils.log.severe(e.getMessage());
			return false;
		}
	}

	/**
	 * Delete Activity Document assignment;
	 * 
	 * @param projectDocument
	 *            the P6 activity document assignment object.
	 * @return boolean true if assignment was deleted, false if not.
	 */
	public boolean deleteActivityDocumentAssignment(ProjectDocument projectDocument) {
		try {
			boolean flag = deleteProjectDocument(projectDocument.getObjectId());
			if (flag)
				utils.log.fine("Activity Document assignment " + projectDocument.getObjectId() + " was successfully deleted.");
			return flag;
		}
		catch (Exception e) {
			utils.log.severe(e.getMessage());
			return false;
		}
	}

	/**
	 * Delete project document;
	 * 
	 * @param projectDocumentObjectId
	 *            int identifier for the P6 Project Document (activity document assignment in our case) object.
	 * @return boolean true if project document was deleted, false if not.
	 */
	public boolean deleteProjectDocument(int projectDocumentObjectId) {
		ProjectDocumentPortType servicePort = createProjectDocumentServicePort();
		List<Integer> delIds = new ArrayList<Integer>();
		delIds.add(Integer.valueOf(projectDocumentObjectId));
		try {
			boolean flag = servicePort.deleteProjectDocuments(delIds);
			if (flag)
				utils.log.fine("Activity Document assignment " + projectDocumentObjectId + " was successfully deleted.");
			else
				utils.log.warning("Activity Document assignment  " + projectDocumentObjectId + " was NOT deleted.");
			return flag;
		}
		catch (com.primavera.ws.p6.projectdocument.IntegrationFault e) {
			utils.log.severe(e.getMessage());
			return false;
		}
	}

	/**
	 * Creates an instance of the DocumentService.
	 * 
	 * @return DocumentPortType
	 */
	private DocumentPortType createDocumentServicePort() {
		URL wsdlURL = wsUtils.createURL(DOCUMENT_SERVICE);
		DocumentService service = new DocumentService(wsdlURL);
		DocumentPortType servicePort = service.getDocumentPort();
		Client client = ClientProxy.getClient(servicePort);
		wsUtils.addMessageInterceptors(client);
		wsUtils.addCookieToHeader((BindingProvider) servicePort);

		return servicePort;
	}

	/**
	 * Creates an instance of the DocumentStatusCodeService.
	 * 
	 * @return DocumentStatusCodePortType
	 */
	private DocumentStatusCodePortType createDocumentStatusCodeServicePort() {
		URL wsdlURL = wsUtils.createURL(DOCUMENT_STATUS_CODE_SERVICE);
		DocumentStatusCodeService service = new DocumentStatusCodeService(wsdlURL);
		DocumentStatusCodePortType servicePort = service.getDocumentStatusCodePort();
		Client client = ClientProxy.getClient(servicePort);
		wsUtils.addMessageInterceptors(client);
		wsUtils.addCookieToHeader((BindingProvider) servicePort);

		return servicePort;
	}
	
	/**
	 * Creates an instance of the ProjectDocumentService.
	 * 
	 * @return ProjectDocumentPortType
	 */
	private ProjectDocumentPortType createProjectDocumentServicePort() {
		URL wsdlURL = wsUtils.createURL(PROJECT_DOCUMENT_SERVICE);
		ProjectDocumentService service = new ProjectDocumentService(wsdlURL);
		ProjectDocumentPortType servicePort = service.getProjectDocumentPort();
		Client client = ClientProxy.getClient(servicePort);
		wsUtils.addMessageInterceptors(client);
		wsUtils.addCookieToHeader((BindingProvider) servicePort);

		return servicePort;
	}
}
