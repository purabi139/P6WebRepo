package com.oracle.pgbu.common.support;

import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.xml.bind.JAXBElement;
import javax.xml.ws.BindingProvider;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;

import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.primavera.ws.p6.eps.EPS;
import com.primavera.ws.p6.eps.EPSFieldType;
import com.primavera.ws.p6.eps.EPSPortType;
import com.primavera.ws.p6.eps.EPSService;

/**
 * For data manipulation of P6 EPS objects.
 */
public class EPSs {
    // WSDLs needed for manipulation of EPS data.
    private static final String EPS_SERVICE = "/services/EPSService?wsdl";

    // Web Service utilities.
    private final Utilities utils;
    private final WebServiceUtils wsUtils;

    /**
     * Returns an instance of the EPSs class, for handling EPSs data setup.
     */
    public EPSs() {
        // Initialize the other utility classes needed.
        utils = Utilities.getInstance();
        wsUtils = WebServiceUtils.getInstance();

        // Initialize the cleanup list.
        epsCleanup = new ArrayList<Integer>();
    }

    /**
     * For storing EPS object IDs for cleanup.
     */
    public List<Integer> epsCleanup;

    /**
     * For creating a new EPS node under the specified parent. If null, under "All Initiatives".
     * 
     * @param epsName
     *            String name for the new EPS.
     * @param parent
     *            String name of the parent EPS. "All Initiatives" if null
     * 
     * @return EPS object from P6.
     */
    public EPS createEPS(String epsName, String parent) {
        // Set the fields we can.
        EPS newEPS = new EPS();
        newEPS.setId(epsName);
        newEPS.setName(epsName);

        // Read the parent EPS ID by name, add to our object.
        JAXBElement<Integer> parentId;
        if (parent != null)
            parentId = wsUtils.getJAXBInteger(readEPS(parent).getObjectId(), "EPS", "ParentObjectId");
        else
            parentId = wsUtils.getJAXBInteger(readEPS().getObjectId(), "EPS", "ParentObjectId");
        newEPS.setParentObjectId(parentId);

        return createEPS(newEPS);
    }

    /**
     * For creating a new EPS node via EPS object.
     * 
     * @param newEPS
     *            EPS object to create in P6.
     * 
     * @return EPS object from P6.
     */
    public EPS createEPS(EPS newEPS) {
        List<EPS> epslist = new ArrayList<EPS>();
        epslist.add(newEPS);

        // If an EPS parent isn't specified, use the root.
        JAXBElement<Integer> parentId;
        if (newEPS.getParentObjectId() == null) {
            parentId = wsUtils.getJAXBInteger(readEPS().getObjectId(), "EPS", "ParentObjectId");
            newEPS.setParentObjectId(parentId);
        }

        EPSPortType servicePort = createEPSServicePort();

        // Try to create the new EPS.
        try {
            // Save the ID for cleanup later.
            int objId = servicePort.createEPS(epslist).get(0);
            epsCleanup.add(objId);

            // Include the new object ID on the WBS object and return it.
            newEPS.setObjectId(objId);
            utils.log.fine("Successfully created EPS object " + objId + " under parent " + newEPS.getParentObjectId() + ".");
            return newEPS;
        } catch (com.primavera.ws.p6.eps.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads the EPS with a null parent object ID, the root EPS node. Defaults to "All Initiatives"
     * 
     * @return EPS object from P6.
     */
    public EPS readEPS() {
        EPSPortType servicePort = createEPSServicePort();

        // Read all fields.
        List<EPSFieldType> epsFields = new ArrayList<EPSFieldType>();
        epsFields.addAll(Arrays.asList(EPSFieldType.values()));

        // ParentObjectId will be null for all root level EPS
        try {
            EPS eps = null;
 
            if(ApplicationProperties.getInstance().getSampleData())
            	eps = servicePort.readEPS(epsFields, "(ParentObjectId is null) and (Name='All  Initiatives')", null).get(0);
            else
            	eps = servicePort.readEPS(epsFields, null, null).get(0);
            utils.log.fine("Successfully read root EPS node.");
            return eps;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads the EPS with the specified name.
     * 
     * @param name of the EPS to read, as a String.
     * 
     * @return EPS object from P6.
     */
    public EPS readEPS(String name) {
        EPSPortType servicePort = createEPSServicePort();

        // Read all fields.
        List<EPSFieldType> epsFields = new ArrayList<EPSFieldType>();
        epsFields.addAll(Arrays.asList(EPSFieldType.values()));

        // Try to read by the EPS name.
        try {
            EPS eps = servicePort.readEPS(epsFields, "Name='" + name + "'", null).get(0);
            utils.log.fine("Successfully read specified EPS node.");
            return eps;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Deletes EPS by EPS object ID.
     * 
     * @param epsObjectId
     *            int identifier for the P6 EPS to delete.
     * @return boolean true if the EPS was successfully deleted, false if not.
     */
    public boolean deleteEPS(int epsObjectId) {
        List<Integer> singleId = new ArrayList<Integer>();
        singleId.add(epsObjectId);
        return deleteEPS(singleId);
    }

    /**
     * Deletes EPSs by List of EPS object IDs.
     * 
     * @param epsObjectIds
     *            int identifiers for the P6 EPSs to delete.
     * @return boolean true if the EPS were successfully deleted, false if not.
     */
    public boolean deleteEPS(List<Integer> epsObjectIds) {
        EPSPortType servicePort = createEPSServicePort();

        try {
            boolean flag = servicePort.deleteEPS(epsObjectIds);
            if (flag)
                utils.log.fine("EPSs " + epsObjectIds + " were successfully deleted.");
            else
                utils.log.warning("EPSs " + epsObjectIds + " were NOT deleted.");
            return flag;
        } catch (com.primavera.ws.p6.eps.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Creates an instance of the EPSService.
     * 
     * @return EPSPortType
     */
    private EPSPortType createEPSServicePort() {
        URL wsdlURL = wsUtils.createURL(EPS_SERVICE);
        EPSService service = new EPSService(wsdlURL);
        EPSPortType servicePort = service.getEPSPort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }
}