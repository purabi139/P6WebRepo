package com.oracle.pgbu.common.support;

import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.xml.ws.BindingProvider;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;

import com.primavera.ws.p6.wbs.WBS;
import com.primavera.ws.p6.wbs.WBSFieldType;
import com.primavera.ws.p6.wbs.WBSPortType;
import com.primavera.ws.p6.wbs.WBSService;

/**
 * For data manipulation of P6 WBS objects.
 */
public class WBSs {
    // WSDLs needed for manipulation of User data.
    private static final String WBS_SERVICE = "/services/WBSService?wsdl";

    // Web Service utilities.
    private final Utilities utils;
    private final WebServiceUtils wsUtils;

    /**
     * Returns an instance of the WBSs class, for handling WBSs data setup.
     */
    public WBSs() {
        // Initialize the other utility classes needed.
        utils = Utilities.getInstance();
        wsUtils = WebServiceUtils.getInstance();

        // Initialize the cleanup list.
        wbsCleanup = new ArrayList<Integer>();
    }

    /**
     * For storing WBS object IDs for cleanup.
     */
    public List<Integer> wbsCleanup;

    /**
     * Creates WBS under specified project object id.
     * 
     * @param projectObjectId
     *            int identifier for the P6 Project object.
     * @param wbsName
     *            String to use for the new WBS name.
     * @param wbsCode
     *            String to use for the new WBS code.
     * @return WBS object from P6.
     */
    public WBS createWBS(int projectObjectId, String wbsName, String wbsCode) {
        // loads WBS with provided fields
        WBS wbs = new WBS();
        wbs.setProjectObjectId(projectObjectId);
        wbs.setName(wbsName);
        wbs.setCode(wbsCode);

        return createWBS(wbs);
    }
    
    /**
     * Creates Inactive WBS under specified project object id.
     * @param projectObjectId
     * @param wbsName
     * @param wbsCode
     * @return WBS object from P6.
     */
    public WBS createInactiveWBS(int projectObjectId, String wbsName, String wbsCode) {
        // loads WBS with provided fields
        WBS wbs = new WBS();
        wbs.setProjectObjectId(projectObjectId);
        wbs.setName(wbsName);
        wbs.setCode(wbsCode);
        wbs.setStatus("Inactive");

        return createWBS(wbs);
    }

    /**
     * Creates WBS under specified project object id.
     * 
     * @param wbs
     *            WBS object to create in P6.
     * @return WBS object from P6.
     */
    public WBS createWBS(WBS wbs) {
        WBSPortType servicePort = createWBSServicePort();
        List<WBS> wbslist = new ArrayList<WBS>();
        wbslist.add(wbs);

        try {
            // Save the ID for cleanup later.
            int objId = servicePort.createWBS(wbslist).get(0);
            wbsCleanup.add(objId);

            // Include the new object ID on the WBS object and return it.
            wbs.setObjectId(objId);
            utils.log.fine("Successfully created WBS object " + objId + " under project " + wbs.getProjectObjectId() + ".");
            return wbs;
        } catch (com.primavera.ws.p6.wbs.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads activity WBS path; activity object id must be provided
     * 
     * @param activityObjectId
     *            int identifier for the Activity object to read WBS path from.
     * @return String representing the WBS path.
     */
    public String readActivityWBSPath(int activityObjectId) {
        WBSPortType servicePort = createWBSServicePort();
        List<WBSFieldType> fields = new ArrayList<WBSFieldType>();
        fields.add(WBSFieldType.OBJECT_ID);
        List<Integer> actIds = new ArrayList<Integer>();
        actIds.add(activityObjectId);

        try {
            String wbsPath = servicePort.readActivityWBSPath(actIds, fields).get(0).getObjectId().toString();
            utils.log.fine("Successfully read WBS path from activity " + activityObjectId);
            return wbsPath;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads WBS; returns WBS object
     * 
     * @param projectObjectId
     *            int identifier for the Project to read from.
     * @param wbsName
     *            String identifier for the WBS to read.
     * @return WBS object from P6.
     */
    public WBS readWBS(int projectObjectId, String wbsName) {
        WBSPortType servicePort = createWBSServicePort();

        // Read all fields.
        List<WBSFieldType> fields = new ArrayList<WBSFieldType>();
        fields.addAll(Arrays.asList(WBSFieldType.values()));

        try {
            WBS wbs = servicePort.readWBS(fields, "(ProjectObjectId = '" + projectObjectId + "') and (Name = '" + wbsName + "')", null).get(0);
            utils.log.fine("Successfully read WBS " + wbsName + " from project " + projectObjectId);
            return wbs;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Updates WBS
     * 
     * @param wbs
     *            WBS object to update.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateWBS(WBS wbs) {
        WBSPortType servicePort = createWBSServicePort();
        List<WBS> listWBS = new ArrayList<WBS>();
        listWBS.add(wbs);
        try {
            boolean flag = servicePort.updateWBS(listWBS);
            if (flag)
                utils.log.fine("Successfully updated WBS " + wbs.getObjectId());
            else
                utils.log.warning("WBS " + wbs.getObjectId() + " was NOT updated.");
            return flag;
        } catch (com.primavera.ws.p6.wbs.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes WBS
     * 
     * @param wbsObjectId
     *            int identifier for the WBS object to deleted.
     * @return boolean true if the WBS was deleted, false if not.
     */
    public boolean deleteWBS(int wbsObjectId) {
        List<Integer> singleId = new ArrayList<Integer>();
        singleId.add(wbsObjectId);
        return deleteWBS(singleId);
    }

    /**
     * Deletes WBSs
     * 
     * @param wbsObjectIds
     *            int identifiers for all the WBS objects to deleted.
     * @return boolean true if the WBSs were deleted, false if not.
     */
    public boolean deleteWBS(List<Integer> wbsObjectIds) {
        WBSPortType servicePort = createWBSServicePort();

        try {
            boolean flag = servicePort.deleteWBS(wbsObjectIds, null);
            if (flag)
                utils.log.fine("WBS " + wbsObjectIds + " were successfully deleted.");
            else
                utils.log.warning("WBS " + wbsObjectIds + " were NOT deleted.");
            return flag;
        } catch (com.primavera.ws.p6.wbs.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Creates an instance of the WBSService.
     * 
     * @return WBSPortType
     */
    private WBSPortType createWBSServicePort() {
        URL wsdlURL = wsUtils.createURL(WBS_SERVICE);
        WBSService service = new WBSService(wsdlURL);
        WBSPortType servicePort = service.getWBSPort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }
}