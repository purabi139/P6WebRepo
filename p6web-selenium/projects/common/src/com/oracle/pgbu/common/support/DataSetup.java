package com.oracle.pgbu.common.support;

import java.net.URL;
import java.util.List;
import java.util.Map;

import javax.xml.ws.BindingProvider;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.primavera.ws.p6.authentication.AuthenticationService;
import com.primavera.ws.p6.authentication.AuthenticationServicePortType;

/**
 * Class for providing simplified access to the P6 Web Services methods for data setup and teardown.
 */
public class DataSetup {
    // WSDL URLs
    private static final String AUTHENTICATION_SERVICE = "/services/AuthenticationService?wsdl";

    /**
     * Provides access from DataSetup to P6 Activity objects.
     */
    public Activities activities;

    /**
     * Provides access from DataSetup to P6 Activity Code and UDF objects.
     */
    public CodesUDFs codesUDFs;

    /**
     * Provides access from DataSetup to P6 Document objects.
     */
    public Documents documents;

    /**
     * Provides access from DataSetup to P6 EPS objects.
     */
    public EPSs eps;

    /**
     * Provides access from DataSetup to P6 Notebook objects.
     */
    public Notebooks notebooks;

    /**
     * Provides access from DataSetup to P6 Project objects.
     */
    public Projects projects;

    /**
     * Provides access from DataSetup to P6 Resource objects.
     */
    public Resources resources;

    /**
     * Provides access from DataSetup to P6 Role objects.
     */
    public Roles roles;

    /**
     * Provides access from DataSetup to P6 User objects.
     */
    public Users users;

    /**
     * Provides access from DataSetup to P6 WBS objects.
     */
    public WBSs wbs;

    /**
     * Can be used through DataSetup for access to common utility methods.
     */
    public Utilities utils;

    /**
     * Can be used through DataSetup for access to common web service utility methods.
     */
    public WebServiceUtils wsUtils;

    /**
     * Can be used through DataSetup for executing SQL queries. Use with caution.
     */
    public DatabaseUtils dbUtils;

    protected static final Logger logger = LoggerFactory.getLogger(DataSetup.class);

    /**
     * Create a new data setup object, using the specified connection information for the P6 Web Services.
     */
    public DataSetup() {
        // Init the helper utilities.
        utils = Utilities.getInstance();

        // Get an instance of the DatabaseUtils.
        dbUtils = DatabaseUtils.getInstance();

        // Get an instance of the WebServiceUtils.
        wsUtils = WebServiceUtils.getInstance();

        // Set our log level, based on the TestEnvironment.properties.
        utils.log.fine("Successfully instantiated DataSetup object.");

        // Initialize the various P6 object accessors we'll need.
        activities = new Activities();
        ///codesUDFs = new CodesUDFs();
        documents = new Documents();
        eps = new EPSs();
        notebooks = new Notebooks();
        projects = new Projects();
        resources = new Resources();
        ///roles = new Roles();
        users = new Users();
        wbs = new WBSs();
    }

    /**
     * Logs in to the P6 Web Services using the connection info specified in the constructor.
     * 
     * @return boolean true if successful, false if not.
     */
    public boolean login() {
        URL wsdlURL = wsUtils.createURL(AUTHENTICATION_SERVICE);
        AuthenticationService service = new AuthenticationService(wsdlURL);
        AuthenticationServicePortType servicePort = service.getAuthenticationServiceSOAP12PortHttp();
        BindingProvider bp = (BindingProvider) servicePort;
        bp.getRequestContext().put(BindingProvider.SESSION_MAINTAIN_PROPERTY, true);

        // Login with user name and password, using database instance 1, and
        // verbose faults
        try {
            boolean loginFlag = servicePort.login(wsUtils.username, wsUtils.password, 1);
            Map<String, Object> responseContext = bp.getResponseContext();

            // Cookie must be used in all subsequent calls
            @SuppressWarnings("unchecked")
            Map<String, List<String>> responseHeaders = (Map<String, List<String>>) responseContext.get("javax.xml.ws.http.response.headers");
            wsUtils.m_cookieHeaders = responseHeaders.get("Set-Cookie");
            if (loginFlag)
                utils.log.fine("Successfully logged in user " + wsUtils.username + " to P6 Web Services.");
            else
                utils.log.warning("User " + wsUtils.username + " was not successfully logged in.");
            return loginFlag;
        } catch (com.primavera.ws.p6.authentication.IntegrationFault e) {
            utils.log.severe("Failed to log in to the web services, reason: " + e.getMessage());
            return false;
        }
    }

    /**
     * Logs the current session out of the P6 Web Services.
     * 
     * @return boolean true if successful, false if not.
     */
    public boolean logout() {
        try {
            URL wsdlURL = wsUtils.createURL(AUTHENTICATION_SERVICE);
            AuthenticationService service = new AuthenticationService(wsdlURL);
            AuthenticationServicePortType servicePort = service.getAuthenticationServiceSOAP12PortHttp();
            Client client = ClientProxy.getClient(servicePort);
            wsUtils.addMessageInterceptors(client);
            wsUtils.addCookieToHeader((BindingProvider) servicePort);

            servicePort.logout("");
            utils.log.fine("Successfully logged user " + wsUtils.username + " out of the P6 Web Services.");
            return true;
        } catch (Exception e) {
            utils.log.severe("Failed to log out of web services, reason: " + e.getMessage());
            return false;
        }
    }

    /**
     * Deletes all the objects that have been pushed onto the dataCleanup stack. Starts with activities, then activity code types, then UDF types, then resources, users, projects, and finally WBS.
     */
    public void cleanAll() {
        //Delete any user filters that were created.
        if (users.filterCleanup.size() > 0 && !users.deleteUserFilters(users.filterCleanup))
            utils.log.severe("Errors were encountered while trying to delete User Filters.");
        else
            users.filterCleanup.clear();

        // Delete the activities.
        if (activities.activityCleanup.size() > 0 && !activities.deleteActivities(activities.activityCleanup))
            utils.log.severe("Errors were encountered while trying to delete Activities.");
        else
            activities.activityCleanup.clear();

        // Delete the activities code types if created.
        //        if (codesUDFs.codeCleanup.size() > 0 && !codesUDFs.deleteActivityCodeTypes(codesUDFs.codeCleanup))
        //            utils.log.severe("Errors were encountered while triyng to delete Activity Code Types.");
        //        else
        ///codesUDFs.codeCleanup.clear();

        // Delete document status codes if created.
        //        if (documents.statusCodeCleanup.size() > 0 && !documents.deleteDocumentStatusCodes(documents.statusCodeCleanup))
        //            utils.log.severe("Errors were encountered while triyng to delete Document Status Codes.");
        //        else
        ///documents.statusCodeCleanup.clear();

        // Delete documents if created.
        //        if (documents.documentCleanup.size() > 0 && !documents.deleteDocuments(documents.documentCleanup))
        //            utils.log.severe("Errors were encountered while triyng to delete Documents.");
        //        else
        ///documents.documentCleanup.clear();

        // Delete the udf types if created.
        //        if (codesUDFs.udfCleanup.size() > 0 && !codesUDFs.deleteUDFTypes(codesUDFs.udfCleanup))
        //            utils.log.severe("Errors were encountered while trying to delete UDF Types.");
        //        else
        ///codesUDFs.udfCleanup.clear();

        // Delete the resources after that.
        if (resources.resourceCleanup.size() > 0 && !resources.deleteResources(resources.resourceCleanup))
            utils.log.severe("Errors were encountered while trying to delete Resources.");
        else
            resources.resourceCleanup.clear();

        // Delete the roles after that.
        //        if (roles.roleCleanup.size() > 0 && !roles.deleteRoles(roles.roleCleanup))
        //            utils.log.severe("Errors were encountered while trying to delete Roles.");
        //        else
        ///roles.roleCleanup.clear();

        // Delete the users.
        if (users.userCleanup.size() > 0 && !users.deleteUsers(users.userCleanup))
            utils.log.severe("Errors were encountered while trying to delete Users.");
        else
            users.userCleanup.clear();

        // Delete the Notebooks.
        //        if (notebooks.notebookCleanup.size() > 0 && !notebooks.deleteNotebookTopics(notebooks.notebookCleanup))
        //            utils.log.severe("Errors were encountered while trying to delete Notebook Topics.");
        //        else
        ///notebooks.notebookCleanup.clear();

        // Delete the projects.
        if (projects.projectCleanup.size() > 0 && !projects.deleteProjects(projects.projectCleanup))
            utils.log.severe("Errors were encountered while trying to delete Projects.");
        else
            projects.projectCleanup.clear();

        // Delete the OBSes after that.
        //        if (projects.obsCleanup.size() > 0 && !projects.deleteOBS(projects.obsCleanup))
        //            utils.log.severe("Errors were encountered while trying to delete the OBSes.");
        //        else
        ///projects.obsCleanup.clear();

        // Delete the WBS'
        if (wbs.wbsCleanup.size() > 0 && !wbs.deleteWBS(wbs.wbsCleanup))
            utils.log.severe("Errors were encountered while trying to delete WBS.");
        else
        	wbs.wbsCleanup.clear();
    }
}