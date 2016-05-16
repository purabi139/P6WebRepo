package com.oracle.pgbu.common.support;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBElement;
import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;

import com.primavera.ws.p6.resourceassignment.ResourceAssignment;
import com.primavera.ws.p6.role.Role;
import com.primavera.ws.p6.role.RolePortType;
import com.primavera.ws.p6.role.RoleService;

/**
 * For data manipulation of P6 Role objects.
 */
public class Roles {
    // WSDLs needed for manipulation of Roles data.
    private static final String ROLE_SERVICE = "/services/RoleService?wsdl";

    // Web Service utilities.
    private final Utilities utils;
    private final WebServiceUtils wsUtils;

    /**
     * For storing Role object IDs for cleanup.
     */
    public List<Integer> roleCleanup;

    /**
     * Returns an instance of the Roles class, for handling Roles data setup.
     */
    public Roles() {
        // Initialize the other utility classes needed.
        utils = Utilities.getInstance();
        wsUtils = WebServiceUtils.getInstance();

        // Initialize the cleanup list.
        roleCleanup = new ArrayList<Integer>();
    }

    /**
     * Creates a role with provided role id and name
     * 
     * @param roleId
     *            String role Id to create.
     * @param roleName
     *            String role name to create.
     * @return Role object from P6.
     */
    public Role createRole(String roleId, String roleName) {
        // Create role with required fields
        Role role = new Role();
        role.setId(roleId);
        role.setName(roleName);

        return createRole(role);
    }

    /**
     * Creates a role based on the provided Role object.
     * 
     * @param role
     *            Role object to create in P6.
     * @return Role object from P6.
     */
    public Role createRole(Role role) {
        RolePortType servicePort = createRoleServicePort();
        List<Role> roles = new ArrayList<Role>();
        roles.add(role);

        try {
            // Create the role, save the object ID for later cleanup.
            int objId = servicePort.createRoles(roles).get(0);
            roleCleanup.add(objId);

            // Include the new ID on the role object and return it.
            role.setObjectId(objId);
            utils.log.fine("Successfully created P6 Role object, ObjectId: " + objId);
            return role;
        } catch (com.primavera.ws.p6.role.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Assigns role to activity.
     * 
     * @param activityObjectId
     *            int identifier for P6 Activity object.
     * @param roleObjectId
     *            int identifier for P6 Role object.
     * @return ResourceAssignment object from P6.
     */
    public ResourceAssignment createRoleAssignment(int activityObjectId, int roleObjectId) {
        // Role assignments still go through the resource assignment service.
        ResourceAssignment roleAssign = new ResourceAssignment();
        roleAssign.setActivityObjectId(Integer.valueOf(activityObjectId));
        JAXBElement<Integer> roleIds = new JAXBElement<Integer>(new QName("http://xmlns.oracle.com/Primavera/P6/WS/ResourceAssignment/V1", "RoleObjectId"),
                Integer.class, Integer.valueOf(roleObjectId));
        roleAssign.setRoleObjectId(roleIds);

        Resources resources = new Resources();
        return resources.createResourceAssignment(roleAssign);
    }

    /**
     * Deletes role by provided role object id
     * 
     * @param roleObjectId
     *            int identifier for the P6 Role object to delete.
     * @return boolean true if the role was successfully deleted, false if not.
     */
    public boolean deleteRole(int roleObjectId) {
        List<Integer> singleId = new ArrayList<Integer>();
        singleId.add(roleObjectId);
        return deleteRoles(singleId);
    }

    /**
     * Deletes roles by provided role object ids
     * 
     * @param roleObjectIds
     *            int array of identifiers for all the P6 Role objects to delete.
     * @return boolean true if the roles were successfully deleted, false if not.
     */
    public boolean deleteRoles(List<Integer> roleObjectIds) {
        RolePortType servicePort = createRoleServicePort();

        try {
            boolean flag = servicePort.deleteRoles(roleObjectIds, null);
            if (flag)
                utils.log.fine("Roles " + roleObjectIds + " were successfully deleted.");
            else
                utils.log.warning("Roles " + roleObjectIds + " were NOT deleted.");
            return flag;
        } catch (com.primavera.ws.p6.role.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Creates an instance of the RoleService.
     * 
     * @return RolePortType
     */
    private RolePortType createRoleServicePort() {
        URL wsdlURL = wsUtils.createURL(ROLE_SERVICE);
        RoleService service = new RoleService(wsdlURL);
        RolePortType servicePort = service.getRolePort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }
}