package com.oracle.pgbu.common.support;

import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.xml.bind.JAXBElement;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.namespace.QName;
import javax.xml.ws.BindingProvider;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;

import com.primavera.ws.p6.resource.Resource;
import com.primavera.ws.p6.resource.ResourceFieldType;
import com.primavera.ws.p6.resource.ResourcePortType;
import com.primavera.ws.p6.resource.ResourceService;
import com.primavera.ws.p6.resourceassignment.IntegrationFault;
import com.primavera.ws.p6.resourceassignment.ResourceAssignment;
import com.primavera.ws.p6.resourceassignment.ResourceAssignmentFieldType;
import com.primavera.ws.p6.resourceassignment.ResourceAssignmentPortType;
import com.primavera.ws.p6.resourceassignment.ResourceAssignmentService;
import com.primavera.ws.p6.resourcerole.ResourceRole;
import com.primavera.ws.p6.resourcerole.ResourceRolePortType;
import com.primavera.ws.p6.resourcerole.ResourceRoleService;

/**
 * For data manipulation of P6 Resource objects.
 */
public class Resources {
    // WSDLs needed for manipulation of Resource data.
    private static final String RESOURCE_SERVICE = "/services/ResourceService?wsdl";
    private static final String RESOURCE_ROLE_SERVICE = "/services/ResourceRoleService?wsdl";
    private static final String RESOURCE_ASSIGNMENT_SERVICE = "/services/ResourceAssignmentService?wsdl";

    // Private instance of the Utilities class.
    private final Utilities utils;
    private final WebServiceUtils wsUtils;

    /**
     * Returns an instance of the Resources class, for handling Resources data setup.
     */
    public Resources() {
        // Initialize the other utility classes needed.
        utils = Utilities.getInstance();
        wsUtils = WebServiceUtils.getInstance();

        // Initialize the cleanup list.
        resourceCleanup = new ArrayList<Integer>();
    }

    /**
     * For storing Resource object IDs for cleanup.
     */
    public List<Integer> resourceCleanup;

    /**
     * Creates resources with provided resource id and name
     * 
     * @param resourceId
     *            String resource Id to create.
     * @param resourceName
     *            String resource name to create.
     * @return Resource object from P6.
     */
    public Resource createResource(String resourceId, String resourceName) {
        // Create resource with required fields
        Resource res = new Resource();
        res.setId(resourceId);
        res.setName(resourceName);
        res.setResourceType("Labor");

        return createResource(res);
    }

    /**
     * Creates resources with provided resource id and name
     * 
     * @param res
     *            Resource object to create in P6.
     * @return Resource object from P6.
     */
    public Resource createResource(Resource res) {
        ResourcePortType servicePort = createResourceServicePort();
        List<Resource> resources = new ArrayList<Resource>();
        resources.add(res);

        try {
            // Create the resource, save the object ID for later cleanup.
            int objId = servicePort.createResources(resources).get(0);
            utils.sleep(1);
            resourceCleanup.add(objId);

            // Include the new ID on the resource object and return it.
            res.setObjectId(objId);
            utils.log.fine("Successfully created P6 Resource object, ObjectId: " + objId);
            return res;
        } catch (com.primavera.ws.p6.resource.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Assigns resource to activity.
     * 
     * @param activityObjectId
     *            int identifier for P6 Activity object.
     * @param resourceObjectId
     *            int identifier for P6 Resource object.
     * @return ResourceAssignment object from P6.
     */
    public ResourceAssignment createResourceAssignment(int activityObjectId, int resourceObjectId) {
        ResourceAssignment resAssign = new ResourceAssignment();
        resAssign.setActivityObjectId(Integer.valueOf(activityObjectId));
        JAXBElement<Integer> resourceIds = new JAXBElement<Integer>(new QName("http://xmlns.oracle.com/Primavera/P6/WS/ResourceAssignment/V1", "ResourceObjectId"),
                Integer.class, Integer.valueOf(resourceObjectId));
        resAssign.setResourceObjectId(resourceIds);

        return createResourceAssignment(resAssign);
    }
    
    /**
     * Assigns resource to activity but not as primary resource.
     * 
     * @param activityObjectId
     *            int identifier for P6 Activity object.
     * @param resourceObjectId
     *            int identifier for P6 Resource object.
     * @return ResourceAssignment object from P6.
     */
    public ResourceAssignment createResourceAssignmentNotAsPrimaryResource(int activityObjectId, int resourceObjectId) {
        ResourceAssignment resAssign = new ResourceAssignment();
        resAssign.setActivityObjectId(Integer.valueOf(activityObjectId));
        JAXBElement<Integer> resourceIds = new JAXBElement<Integer>(new QName("http://xmlns.oracle.com/Primavera/P6/WS/ResourceAssignment/V1", "ResourceObjectId"),
                Integer.class, Integer.valueOf(resourceObjectId));
        resAssign.setResourceObjectId(resourceIds);
        resAssign.setIsPrimaryResource(new JAXBElement<Boolean>(new QName("http://xmlns.oracle.com/Primavera/P6/WS/ResourceAssignment/V1", "IsPrimaryResource"),
                Boolean.class, false));
        return createResourceAssignment(resAssign);
    }
    
    public ResourceAssignment createResourceAssignment(int activityObjectId, int resourceObjectId, JAXBElement<XMLGregorianCalendar> actualStart) {
        ResourceAssignment resAssign = new ResourceAssignment();
        resAssign.setActivityObjectId(Integer.valueOf(activityObjectId));
        JAXBElement<Integer> resourceIds = new JAXBElement<Integer>(new QName("http://xmlns.oracle.com/Primavera/P6/WS/ResourceAssignment/V1", "ResourceObjectId"),
                Integer.class, Integer.valueOf(resourceObjectId));
        resAssign.setResourceObjectId(resourceIds);
        resAssign.setActualStartDate(actualStart);

        return createResourceAssignment(resAssign);
    }

    public ResourceAssignment createResourceAssignment(int activityObjectId, int resourceObjectId, JAXBElement<XMLGregorianCalendar> actualStart,
            JAXBElement<XMLGregorianCalendar> actualFinish) {
        ResourceAssignment resAssign = new ResourceAssignment();
        resAssign.setActivityObjectId(Integer.valueOf(activityObjectId));
        JAXBElement<Integer> resourceIds = new JAXBElement<Integer>(new QName("http://xmlns.oracle.com/Primavera/P6/WS/ResourceAssignment/V1", "ResourceObjectId"),
                Integer.class, Integer.valueOf(resourceObjectId));
        resAssign.setResourceObjectId(resourceIds);
        resAssign.setActualStartDate(actualStart);
        resAssign.setActualFinishDate(actualFinish);

        return createResourceAssignment(resAssign);
    }

    /**
     * Assigns resource to activity.
     * 
     * @param resAssign
     *            ResourceAssignment object to create in P6.
     * @return ResourceAssignment object from P6.
     */
    public ResourceAssignment createResourceAssignment(ResourceAssignment resAssign) {
        ResourceAssignmentPortType servicePort = createResourceAssignmentServicePort();
        List<ResourceAssignment> resourceassignments = new ArrayList<ResourceAssignment>();
        resourceassignments.add(resAssign);

        try {
            // Create the resource, include the new ID on the resource
            // assignment object.
            int objId = servicePort.createResourceAssignments(resourceassignments).get(0);
            utils.sleep(1);
            resAssign.setObjectId(objId);
            utils.log.fine("Successfully assigned resource " + resAssign.getResourceId() + " to the activity " + resAssign.getActivityId() + ".");
            return resAssign;
        } catch (IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Assigns user to resource (update resource function is used); Resource object id and user object is must be provided
     * 
     * @param resourceObjectId
     *            int identifier for P6 Resource object.
     * @param userObjectId
     *            int identifier for P6 User object.
     * @return boolean true if assignment was successfully created, false if not.
     */
    public boolean createResourceUserAssignment(int resourceObjectId, int userObjectId) {
        // Update resource with required fields
        Resource res = new Resource();
        JAXBElement<Integer> userIds = new JAXBElement<Integer>(new QName("http://xmlns.oracle.com/Primavera/P6/WS/Resource/V1", "UserObjectId"), Integer.class,
                userObjectId);
        res.setObjectId(resourceObjectId);
        res.setUserObjectId(userIds);

        return createResourceUserAssignment(res);
    }

    /**
     * Assigns user to resource (update resource function is used); Resource object must be provided
     * 
     * @param res
     *            P6 Resource object to create the user assignment from.
     * @return boolean true if assignment was successfully created, false if not.
     */
    public boolean createResourceUserAssignment(Resource res) {
        ResourcePortType servicePort = createResourceServicePort();
        List<Resource> resources = new ArrayList<Resource>();
        resources.add(res);

        try {
            boolean flag = servicePort.updateResources(resources);
            if (flag)
                utils.log.fine("Successfully created resource assignment for user " + res.getUserObjectId() + " on resource " + res.getObjectId() + ".");
            else
                utils.log.warning("User " + res.getUserObjectId() + " was NOT assigned to resource " + res.getObjectId() + ".");
            return flag;
        } catch (com.primavera.ws.p6.resource.IntegrationFault e) {
            //            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Assigns a resource to a role.
     * 
     * @param resourceObjectId
     *            int identifier for P6 Resource object.
     * @param roleObjectId
     *            int identifier for P6 Role object.
     * @return boolean true if assignment was successfully created, false if not.
     */
    public boolean createResourceRoleAssignment(int resourceObjectId, int roleObjectId) {
        ResourceRolePortType servicePort = createResourceRoleServicePort();
        List<ResourceRole> roles = new ArrayList<ResourceRole>();

        ResourceRole role = new ResourceRole();
        role.setResourceObjectId(resourceObjectId);
        role.setRoleObjectId(roleObjectId);
        roles.add(role);

        try {
            // This line will fail if a proper Object Id is not returned,
            // jumping to the "catch"
            com.primavera.ws.p6.resourcerole.CreateResourceRolesResponse.ObjectId objId = servicePort.createResourceRoles(roles).get(0);
            utils.log.fine("Successfully assigned resource " + objId.getResourceObjectId() + " to role " + objId.getRoleObjectId() + ".");
            return true;
        } catch (com.primavera.ws.p6.resourcerole.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Reads resource; accepts resource Id, returns resource object
     * 
     * @param resourceId
     *            String identifier for the resource to read.
     * @return Resource object from P6.
     */
    public Resource readResource(String resourceId) {
        ResourcePortType servicePort = createResourceServicePort();
        List<ResourceFieldType> fields = new ArrayList<ResourceFieldType>();

        // Read all fields.
        fields.addAll(Arrays.asList(ResourceFieldType.values()));

        // Load resource with specific Id
        try {
            Resource res = servicePort.readResources(fields, "Id = '" + resourceId + "'", null).get(0);
            utils.log.fine("Successfully read reasource " + resourceId);
            return res;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads resource assignment; returns resource assignment object
     * 
     * @param activityObjectId
     *            int identifier for the Activity object.
     * @param resourceObjectId
     *            int identifier for the Resource object.
     * @return ResourceAssignmentObject from P6.
     */
    public ResourceAssignment readResourceAssignment(int activityObjectId, int resourceObjectId) {
        ResourceAssignmentPortType servicePort = createResourceAssignmentServicePort();

        // Read all fields.
        List<ResourceAssignmentFieldType> fields = new ArrayList<ResourceAssignmentFieldType>();
        fields.addAll(Arrays.asList(ResourceAssignmentFieldType.values()));

        // Load resource assignment with specific Id
        try {
            ResourceAssignment resAssignment = servicePort.readResourceAssignments(fields,
                    "(ActivityObjectId = '" + activityObjectId + "') and (ResourceObjectId = '" + resourceObjectId + "')", "").get(0);
            utils.log.fine("Successfully read assignment for resource " + resourceObjectId + " on activity " + activityObjectId);
            return resAssignment;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Updates resource
     * 
     * @param res
     *            Resource object to update.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateResource(Resource res) {
        ResourcePortType servicePort = createResourceServicePort();
        List<Resource> resources = new ArrayList<Resource>();

        resources.add(res);

        try {
            boolean flag = servicePort.updateResources(resources);
            if (flag)
                utils.log.fine("Successfully updated resource " + res.getObjectId());
            else
                utils.log.warning("Resource " + res.getObjectId() + " was NOT updated.");
            return flag;
        } catch (com.primavera.ws.p6.resource.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes resource by provided resource object id
     * 
     * @param resourceObjectId
     *            int identifier for the P6 Resource object to delete.
     * @return boolean true if the resource was successfully deleted, false if not.
     */
    public boolean deleteResource(int resourceObjectId) {
        List<Integer> singleId = new ArrayList<Integer>();
        singleId.add(resourceObjectId);
        return deleteResources(singleId);
    }

    /**
     * Deletes resources by provided resource object ids
     * 
     * @param resourceObjectIds
     *            int identifiers for all the P6 Resource objects to delete.
     * @return boolean true if the resources were successfully deleted, false if not.
     */
    public boolean deleteResources(List<Integer> resourceObjectIds) {
        ResourcePortType servicePort = createResourceServicePort();

        try {
            boolean flag = servicePort.deleteResources(resourceObjectIds, null);
            if (flag)
                utils.log.fine("Resources " + resourceObjectIds + " were successfully deleted.");
            else
                utils.log.warning("Resources " + resourceObjectIds + " were NOT deleted.");
            return flag;
        } catch (com.primavera.ws.p6.resource.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes resource assignment; resource assignment object id must be provided
     * 
     * @param resourceAssignmentObjectId
     *            int identifier for the P6 ResourceAssignment object.
     * @return boolean true if the resource assignment was successfully broken, false if not.
     */
    public boolean deleteResourceAssignment(int resourceAssignmentObjectId) {
        ResourceAssignmentPortType servicePort = createResourceAssignmentServicePort();
        List<Integer> delIds = new ArrayList<Integer>();
        delIds.add(Integer.valueOf(resourceAssignmentObjectId));
        try {
            boolean flag = servicePort.deleteResourceAssignments(delIds);
            utils.sleep(1);
            if (flag)
                utils.log.fine("Resource assignment " + resourceAssignmentObjectId + " was successfully deleted.");
            else
                utils.log.warning("Resource assignment " + resourceAssignmentObjectId + " was NOT deleted.");
            return flag;
        } catch (IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Creates an instance of the ResourceAssignmentService.
     * 
     * @return ResourceAssignmentPortType
     */
    private ResourceAssignmentPortType createResourceAssignmentServicePort() {
        URL wsdlURL = wsUtils.createURL(RESOURCE_ASSIGNMENT_SERVICE);
        ResourceAssignmentService service = new ResourceAssignmentService(wsdlURL);
        ResourceAssignmentPortType servicePort = service.getResourceAssignmentPort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the ResourceService.
     * 
     * @return ResourcePortType
     */
    private ResourcePortType createResourceServicePort() {
        URL wsdlURL = wsUtils.createURL(RESOURCE_SERVICE);
        ResourceService service = new ResourceService(wsdlURL);
        ResourcePortType servicePort = service.getResourcePort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the ResourceRoleService.
     * 
     * @return ResourceRolePortType
     */
    private ResourceRolePortType createResourceRoleServicePort() {
        URL wsdlURL = wsUtils.createURL(RESOURCE_ROLE_SERVICE);
        ResourceRoleService service = new ResourceRoleService(wsdlURL);
        ResourceRolePortType servicePort = service.getResourceRolePort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }
}