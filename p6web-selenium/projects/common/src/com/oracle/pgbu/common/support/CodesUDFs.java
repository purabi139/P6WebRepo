package com.oracle.pgbu.common.support;

import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.xml.ws.BindingProvider;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;

import com.primavera.ws.p6.activitycode.ActivityCode;
import com.primavera.ws.p6.activitycode.ActivityCodeFieldType;
import com.primavera.ws.p6.activitycode.ActivityCodePortType;
import com.primavera.ws.p6.activitycode.ActivityCodeService;
import com.primavera.ws.p6.activitycodeassignment.ActivityCodeAssignment;
import com.primavera.ws.p6.activitycodeassignment.ActivityCodeAssignmentFieldType;
import com.primavera.ws.p6.activitycodeassignment.ActivityCodeAssignmentPortType;
import com.primavera.ws.p6.activitycodeassignment.ActivityCodeAssignmentService;
import com.primavera.ws.p6.activitycodeassignment.DeleteActivityCodeAssignments;
import com.primavera.ws.p6.activitycodetype.ActivityCodeType;
import com.primavera.ws.p6.activitycodetype.ActivityCodeTypeFieldType;
import com.primavera.ws.p6.activitycodetype.ActivityCodeTypePortType;
import com.primavera.ws.p6.activitycodetype.ActivityCodeTypeService;
import com.primavera.ws.p6.udftype.UDFType;
import com.primavera.ws.p6.udftype.UDFTypeFieldType;
import com.primavera.ws.p6.udftype.UDFTypePortType;
import com.primavera.ws.p6.udftype.UDFTypeService;
import com.primavera.ws.p6.udfvalue.DeleteUDFValues;
import com.primavera.ws.p6.udfvalue.UDFValue;
import com.primavera.ws.p6.udfvalue.UDFValueFieldType;
import com.primavera.ws.p6.udfvalue.UDFValuePortType;
import com.primavera.ws.p6.udfvalue.UDFValueService;

/**
 * For data manipulation of P6 Activity Code and UDF objects.
 */
public class CodesUDFs {
    // WSDLs needed for manipulation of Activity Code and UDF data.
    private static final String ACTIVITY_CODE_SERVICE = "/services/ActivityCodeService?wsdl";
    private static final String ACTIVITY_CODE_TYPE_SERVICE = "/services/ActivityCodeTypeService?wsdl";
    private static final String ACTIVITY_CODE_ASSIGNMENT_SERVICE = "/services/ActivityCodeAssignmentService?wsdl";
    private static final String UDF_TYPE_SERVICE = "/services/UDFTypeService?wsdl";
    private static final String UDF_VALUE_SERVICE = "/services/UDFValueService?wsdl";

    // Web Service utilities.
    private final Utilities utils;
    private final WebServiceUtils wsUtils;

    /**
     * For storing UDF object IDs for cleanup.
     */
    public List<Integer> udfCleanup;

    /**
     * For storing Activity Code object IDs for cleanup.
     */
    public List<Integer> codeCleanup;

    /**
     * Returns an instance of the CodesUDFs class, for handling Activity Code and UDF data setup.
     */
    public CodesUDFs() {
        // Initialize the other utility classes needed.
        utils = Utilities.getInstance();
        wsUtils = WebServiceUtils.getInstance();

        // Initialize the cleanup lists.
        codeCleanup = new ArrayList<Integer>();
        udfCleanup = new ArrayList<Integer>();
    }

    /**
     * Creates Activity code; activity code type object id and code value must be provided.
     * 
     * @param activityCodeTypeObjectId
     *            int to identify activity code type.
     * @param actCodeValue
     *            String new value for activity code.
     * @return ActivityCode object from P6.
     */
    public ActivityCode createActivityCode(int activityCodeTypeObjectId, String actCodeValue) {
        // Create step with required fields
        ActivityCode actCode = new ActivityCode();

        // kept next line as a sample
        // actCode.setParentObjectId(null);
        actCode.setCodeTypeObjectId(activityCodeTypeObjectId);
        actCode.setCodeValue(actCodeValue);

        // Pass off to the core method.
        return createActivityCode(actCode);
    }

    /**
     * Creates Activity code from the provided ActivityCode object.
     * 
     * @param activityCode
     *            ActivityCode to create in P6.
     * @return ActivityCode object created in P6.
     */
    public ActivityCode createActivityCode(ActivityCode activityCode) {
        ActivityCodePortType servicePort = createActivityCodeServicePort();
        List<ActivityCode> activityCodes = new ArrayList<ActivityCode>();

        activityCodes.add(activityCode);

        try {
            int objId = servicePort.createActivityCodes(activityCodes).get(0);
            activityCode.setObjectId(objId);
            utils.log.fine("Successfully created activity code: " + objId);
            return activityCode;
        } catch (com.primavera.ws.p6.activitycode.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Creates Activity Code Assignment
     * 
     * @param activityObjectId
     *            int identifier for the Activity object.
     * @param activityCodeObjectId
     *            int identifier for the ActivityCode object.
     * @return boolean true if successfully created, false if not.
     */
    public boolean createActivityCodeAssignment(int activityObjectId, int activityCodeObjectId) {
        ActivityCodeAssignmentPortType servicePort = createActivityCodeAssignmentServicePort();
        List<ActivityCodeAssignment> activityCodeAssignments = new ArrayList<ActivityCodeAssignment>();

        // Create activity code assignment
        ActivityCodeAssignment actCodeAssignment = new ActivityCodeAssignment();
        actCodeAssignment.setActivityObjectId(activityObjectId);
        //actCodeAssignment.setActivityCodeObjectId(String.valueOf(activityCodeObjectId));

        activityCodeAssignments.add(actCodeAssignment);

        try {
            servicePort.createActivityCodeAssignments(activityCodeAssignments).get(0);
            utils.log.fine("Successfully assigned activity code " + activityCodeObjectId + " to object " + activityCodeObjectId + ".");
            return true;
        } catch (com.primavera.ws.p6.activitycodeassignment.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Creates Activity Code Type
     * 
     * @param actCodeTypeName
     *            String for the new activity code type name.
     * @return ActivityCodeType P6 object.
     */
    public ActivityCodeType createActivityCodeType(String actCodeTypeName) {
        ActivityCodeTypePortType servicePort = createActivityCodeTypeServicePort();
        List<ActivityCodeType> activityCodeTypes = new ArrayList<ActivityCodeType>();

        // Create activity code type with required fields
        ActivityCodeType actCodeType = new ActivityCodeType();
        actCodeType.setName(actCodeTypeName);

        activityCodeTypes.add(actCodeType);

        try {
            int objId = servicePort.createActivityCodeTypes(activityCodeTypes).get(0);
            codeCleanup.add(objId);
            actCodeType.setObjectId(objId);
            utils.log.fine("Successfully created activity code type, ObjectId: " + objId);
            return actCodeType;
        } catch (com.primavera.ws.p6.activitycodetype.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Creates a UDF type and returns the object.
     * 
     * @param udfTypeTitle
     *            String for the new UDF type title.
     * @param udfTypeDataType
     *            String for the new UDF data type. Valid values: Text, Start Date, Finish Date, Double, Integer, Indicator
     * @return UDFType object from P6.
     */
    public UDFType createUDFType(String udfTypeTitle, String udfTypeDataType) {
        UDFTypePortType servicePort = createUDFTypeServicePort();
        List<UDFType> udfTypes = new ArrayList<UDFType>();

        // Create UDF Type with required fields
        UDFType udfType = new UDFType();
        udfType.setSubjectArea("Activity");
        udfType.setTitle(udfTypeTitle);
        udfType.setDataType(udfTypeDataType);
        udfTypes.add(udfType);

        try {
            // Save the ID for cleanup later.
            int objId = servicePort.createUDFTypes(udfTypes).get(0);
            udfCleanup.add(objId);

            // Include the new ID on the UDF Type object and return it.
            udfType.setObjectId(objId);
            utils.log.fine("Successfully created UDFType, ObjectId: " + objId);
            return udfType;
        } catch (com.primavera.ws.p6.udftype.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Creates activity UDF value.
     * 
     * @param udfTypeObjectId
     *            int identifier for P6 UDFType object.
     * @param activityObjectId
     *            int identifier for the P6 Activity object.
     * @param udfMethod
     *            String name of the web service method needed for setting the UDF's value. Example 2: A StartDate UDF should pass the String "StartDate". Example 1: A Text type UDF should pass the String "Text".
     * @param udfValue
     *            Object to use for setting the UDF's value. Example 1: dataSetup.wsUtils.getJAXBDate(new Date(), "StartDate") Example 2: "String text for text UDFs"
     * @return boolean true if successfully created, false if not.
     */
    public boolean createUDFValue(int udfTypeObjectId, int activityObjectId, String udfMethod, Object udfValue) {
        UDFValuePortType servicePort = createUDFValueServicePort();
        List<UDFValue> udfValues = new ArrayList<UDFValue>();

        // Create UDF value with required fields
        UDFValue udf = new UDFValue();
        udf.setUDFTypeObjectId(udfTypeObjectId);
        udf.setForeignObjectId(activityObjectId);

        // Try to use reflection to call the proper "set" method on the UDFValue
        // class.
        try {
            java.lang.reflect.Method method = UDFValue.class.getMethod("set" + udfMethod, udfValue.getClass());
            method.invoke(udf, udfValue);
        }
        // Log a severe error message, allow test to fail normally.
        catch (Exception ex) {
            utils.log.severe(ex.getMessage());
            return false;
        }

        // Add the UDFValue to the list to send to the web service.
        udfValues.add(udf);

        try {
            servicePort.createUDFValues(udfValues).get(0);
            utils.log.fine("Successfully created UDF value " + udfValue + " on activity " + activityObjectId + ".");
            return true;
        } catch (com.primavera.ws.p6.udfvalue.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Reads activity code assignment
     * 
     * @param activityObjectId
     *            int identifier for the Activity object from P6.
     * @param activityCodeObjectId
     *            int identifier for the ActivityCode object from P6.
     * @return ActivityCodeAssignment object from P6.
     */
    public ActivityCodeAssignment readActivityCodeAssignment(int activityObjectId, int activityCodeObjectId) {
        ActivityCodeAssignmentPortType servicePort = createActivityCodeAssignmentServicePort();

        // Read all fields.
        List<ActivityCodeAssignmentFieldType> fields = new ArrayList<ActivityCodeAssignmentFieldType>();
        fields.addAll(Arrays.asList(ActivityCodeAssignmentFieldType.values()));

        // Load activity with specific object Id
        try {
            ActivityCodeAssignment actCodeAssignment = servicePort.readActivityCodeAssignments(fields,
                    "(ActivityObjectId = '" + activityObjectId + "') and (ActivityCodeObjectId = '" + activityCodeObjectId + "')", "").get(0);
            utils.log.fine("Successflly read activity code assignment for activity " + activityObjectId + " and activity code " + activityCodeObjectId);
            return actCodeAssignment;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads Activity code Type
     * 
     * @param actCodeTypeName
     *            String identifier for the ActivityCodeType.
     * @return ActivityCodeType object from P6.
     */
    public ActivityCodeType readActivityCodeType(String actCodeTypeName) {
        ActivityCodeTypePortType servicePort = createActivityCodeTypeServicePort();

        // Read all fields
        List<ActivityCodeTypeFieldType> fields = new ArrayList<ActivityCodeTypeFieldType>();
        fields.addAll(Arrays.asList(ActivityCodeTypeFieldType.values()));

        // Load activity code type with specific name
        try {
            ActivityCodeType actCodeType = servicePort.readActivityCodeTypes(fields, "Name = '" + actCodeTypeName + "'", "").get(0);
            utils.log.fine("Successfully read activity code type " + actCodeTypeName);
            return actCodeType;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads Activity code
     * 
     * @param codeValue
     *            String identifier for the activity code to read.
     * @return ActivityCode object from P6.
     */
    public ActivityCode readActivityCode(String codeValue) {
        ActivityCodePortType servicePort = createActivityCodeServicePort();

        // Read all fields
        List<ActivityCodeFieldType> fields = new ArrayList<ActivityCodeFieldType>();
        fields.addAll(Arrays.asList(ActivityCodeFieldType.values()));

        // Load activity code with specific name
        try {
            ActivityCode actCode = servicePort.readActivityCodes(fields, "CodeValue = '" + codeValue + "'", "").get(0);
            utils.log.fine("Successfully read activity code " + codeValue);
            return actCode;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads UDF Type
     * 
     * @param udfTypeTitle
     *            String title identifier for the UDFType.
     * @return UDFType object from P6.
     */
    public UDFType readUDFType(String udfTypeTitle) {
        UDFTypePortType servicePort = createUDFTypeServicePort();

        // Read all fields
        List<UDFTypeFieldType> fields = new ArrayList<UDFTypeFieldType>();
        fields.addAll(Arrays.asList(UDFTypeFieldType.values()));

        // Load udf type with specific name
        try {
            UDFType udfType = servicePort.readUDFTypes(fields, "Title = '" + udfTypeTitle + "'", "").get(0);
            utils.log.fine("Successfully read UDF type with title " + udfTypeTitle);
            return udfType;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads activity udf value; udf value object is returned
     * 
     * @param activityObjectId
     *            int identifier for Activity object.
     * @param udfTypeObjectId
     *            int identifier for UDFType object.
     * @return UDFValue from P6 for the specified activity and UDFType.
     */
    public UDFValue readUDFValue(int activityObjectId, int udfTypeObjectId) {
        UDFValuePortType servicePort = createUDFValueServicePort();

        // Read all fields.
        List<UDFValueFieldType> fields = new ArrayList<UDFValueFieldType>();
        fields.addAll(Arrays.asList(UDFValueFieldType.values()));

        // Load udf value object with specific activity object Id and UDF Type
        // object Id
        try {
            UDFValue udfValue = servicePort.readUDFValues(fields,
                    "(ForeignObjectId = '" + activityObjectId + "') and (UDFTypeObjectId = '" + udfTypeObjectId + "')", "").get(0);
            utils.log.fine("Successfully read UDF value for activity " + activityObjectId + " and UDF type " + udfTypeObjectId);
            return udfValue;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Updates activity code assignment
     * 
     * @param actCodeAssignment
     *            ActivityCodeAssignment object to update with.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateActivityCodeAssignment(ActivityCodeAssignment actCodeAssignment) {
        ActivityCodeAssignmentPortType servicePort = createActivityCodeAssignmentServicePort();
        List<ActivityCodeAssignment> actCodeAssignments = new ArrayList<ActivityCodeAssignment>();
        actCodeAssignments.add(actCodeAssignment);
        try {
            boolean flag = servicePort.updateActivityCodeAssignments(actCodeAssignments);
            if (flag)
                utils.log.fine("Activity code assignment " + actCodeAssignment.getActivityCodeObjectId() + " was successfully updated");
            else
                utils.log.warning("Activity code assignment " + actCodeAssignment.getActivityCodeObjectId() + " was NOT updated");
            return flag;
        } catch (com.primavera.ws.p6.activitycodeassignment.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Updates Activity Code Type
     * 
     * @param actCodeType
     *            ActivityCodeType object to update.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateActivityCodeType(ActivityCodeType actCodeType) {
        ActivityCodeTypePortType servicePort = createActivityCodeTypeServicePort();
        List<ActivityCodeType> actCodeTypes = new ArrayList<ActivityCodeType>();
        actCodeTypes.add(actCodeType);
        try {
            boolean flag = servicePort.updateActivityCodeTypes(actCodeTypes);
            if (flag)
                utils.log.fine("Successfully updated activity code type " + actCodeType.getObjectId());
            else
                utils.log.warning("Activity code type " + actCodeType.getObjectId() + " was NOT updated.");
            return flag;
        } catch (com.primavera.ws.p6.activitycodetype.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Updates Activity Code
     * 
     * @param actCode
     *            ActivityCode object to update.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateActivityCode(ActivityCode actCode) {
        ActivityCodePortType servicePort = createActivityCodeServicePort();
        List<ActivityCode> actCodes = new ArrayList<ActivityCode>();
        actCodes.add(actCode);
        try {
            boolean flag = servicePort.updateActivityCodes(actCodes);
            if (flag)
                utils.log.fine("Successfully updated activity code " + actCode.getObjectId());
            else
                utils.log.warning("Activity code " + actCode.getObjectId() + " was NOT updated.");
            return flag;
        } catch (com.primavera.ws.p6.activitycode.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Updates UDF Type
     * 
     * @param udfType
     *            UDFType object to update.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateUDFType(UDFType udfType) {
        UDFTypePortType servicePort = createUDFTypeServicePort();
        List<UDFType> udfTypes = new ArrayList<UDFType>();
        udfTypes.add(udfType);
        try {
            boolean flag = servicePort.updateUDFTypes(udfTypes);
            if (flag)
                utils.log.fine("Successfully updated UDF type " + udfType.getObjectId());
            else
                utils.log.warning("UDF type " + udfType.getObjectId() + " was NOT updated.");
            return flag;
        } catch (com.primavera.ws.p6.udftype.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Updates UDF Value
     * 
     * @param udfValue
     *            UDFValue object to update.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateUDFValue(UDFValue udfValue) {
        UDFValuePortType servicePort = createUDFValueServicePort();
        List<UDFValue> udfValues = new ArrayList<UDFValue>();
        udfValues.add(udfValue);
        try {
            boolean flag = servicePort.updateUDFValues(udfValues);
            if (flag)
                utils.log.fine("Successfully updated UDF value for UDF code " + udfValue.getUDFCodeObjectId());
            else
                utils.log.warning("UDF value for UDF code " + udfValue.getUDFCodeObjectId() + " was NOT updated.");
            return flag;
        } catch (com.primavera.ws.p6.udfvalue.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes Activity Code Type
     * 
     * @param actCodeTypeObjectId
     *            int identifier for the P6 ActivityCodeType object.
     * @return boolean true if the activity code type was successfully deleted, false if not.
     */
    public boolean deleteActivityCodeType(int actCodeTypeObjectId) {
        List<Integer> singleId = new ArrayList<Integer>();
        singleId.add(actCodeTypeObjectId);
        return deleteActivityCodeTypes(singleId);
    }

    /**
     * Deletes Activity Code Types
     * 
     * @param actCodeTypeObjectIds
     *            int identifiers for all the P6 ActivityCodeType objects to delete.
     * @return boolean true if the activity code types were successfully deleted, false if not.
     */
    public boolean deleteActivityCodeTypes(List<Integer> actCodeTypeObjectIds) {
        ActivityCodeTypePortType servicePort = createActivityCodeTypeServicePort();

        try {
            boolean flag = servicePort.deleteActivityCodeTypes(actCodeTypeObjectIds);
            if (flag)
                utils.log.fine("Successfully deleted activityCodeTypes: " + actCodeTypeObjectIds);
            else
                utils.log.warning("ActivityCodeTypes: " + actCodeTypeObjectIds + " were not deleted.");
            return flag;
        } catch (com.primavera.ws.p6.activitycodetype.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes Activity Code
     * 
     * @param activityCodeObjectId
     *            int identifier for the ActivityCode to delete.
     * @return boolean true if it was successfully deleted, false if not.
     */
    public boolean deleteActivityCode(int activityCodeObjectId) {
        ActivityCodePortType servicePort = createActivityCodeServicePort();
        List<Integer> delIds = new ArrayList<Integer>();
        delIds.add(Integer.valueOf(activityCodeObjectId));
        try {
            boolean flag = servicePort.deleteActivityCodes(delIds);
            if (flag)
                utils.log.fine("Successfully deleted activity code " + activityCodeObjectId + ".");
            else
                utils.log.warning("ActivityCode " + activityCodeObjectId + " was not successfully deleted.");
            return flag;
        } catch (com.primavera.ws.p6.activitycode.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Delete activity code assignment from activity;
     * 
     * @param activityObjectId
     *            int identifier for the P6 Activity object.
     * @param activityCodeTypeObjectId
     *            int identifier for the P6 ActivtyCodeType object.
     * @return boolean true of the activity code was unassigned from the activity, false if not.
     */
    public boolean deleteActivityCodeAssignment(int activityObjectId, int activityCodeTypeObjectId) {
        DeleteActivityCodeAssignments.ObjectId actCodeAssignmentObjId = new DeleteActivityCodeAssignments.ObjectId();
        actCodeAssignmentObjId.setActivityObjectId(activityObjectId);
        actCodeAssignmentObjId.setActivityCodeTypeObjectId(activityCodeTypeObjectId);
        ActivityCodeAssignmentPortType servicePort = createActivityCodeAssignmentServicePort();
        List<DeleteActivityCodeAssignments.ObjectId> delIds = new ArrayList<DeleteActivityCodeAssignments.ObjectId>();
        delIds.add(actCodeAssignmentObjId);
        try {
            boolean flag = servicePort.deleteActivityCodeAssignments(delIds);
            if (flag)
                utils.log.fine("Successfully removed activity code " + activityCodeTypeObjectId + " from activity " + activityObjectId + ".");
            else
                utils.log.warning("ActivityCode " + activityCodeTypeObjectId + " was not removed from activity " + activityObjectId + ".");
            return flag;
        } catch (com.primavera.ws.p6.activitycodeassignment.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes UDF Type
     * 
     * @param udfTypeObjectId
     *            int identifier for the P6 UDFType object.
     * @return boolean true if the UDFType was deleted, false if not.
     */
    public boolean deleteUDFType(int udfTypeObjectId) {
        List<Integer> singleId = new ArrayList<Integer>();
        singleId.add(udfTypeObjectId);
        return deleteUDFTypes(singleId);
    }

    /**
     * Deletes UDF Types
     * 
     * @param udfTypeObjectIds
     *            int identifiers for all the P6 UDFType objects to delete.
     * @return boolean true if the UDFType was deleted, false if not.
     */
    public boolean deleteUDFTypes(List<Integer> udfTypeObjectIds) {
        UDFTypePortType servicePort = createUDFTypeServicePort();

        try {
            boolean flag = servicePort.deleteUDFTypes(udfTypeObjectIds);
            if (flag)
                utils.log.fine("UDF types " + udfTypeObjectIds + " were successfully deleted.");
            else
                utils.log.warning("UDF types " + udfTypeObjectIds + " were NOT deleted.");
            return flag;
        } catch (com.primavera.ws.p6.udftype.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Delete udf value from activity ;
     * 
     * @param activityObjectId
     *            int identifier for the Activity object.
     * @param udfTypeObjectId
     *            int identifier for the UDFType object.
     * @return boolean true if the UDFValue was deleted, false if not.
     */
    public boolean deleteUDFValue(int activityObjectId, int udfTypeObjectId) {
        DeleteUDFValues.ObjectId udfValueObjId = new DeleteUDFValues.ObjectId();
        udfValueObjId.setForeignObjectId(activityObjectId);
        udfValueObjId.setUDFTypeObjectId(udfTypeObjectId);

        UDFValuePortType servicePort = createUDFValueServicePort();
        List<DeleteUDFValues.ObjectId> delIds = new ArrayList<DeleteUDFValues.ObjectId>();
        delIds.add(udfValueObjId);
        try {
            boolean flag = servicePort.deleteUDFValues(delIds);
            if (flag)
                utils.log.fine("Successfully deleted value for UDFType " + udfTypeObjectId + " from activity " + activityObjectId);
            else
                utils.log.warning("Value for UDFType " + udfTypeObjectId + " was NOT deleted from activity " + activityObjectId);
            return flag;
        } catch (com.primavera.ws.p6.udfvalue.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Creates an instance of the ActivityCodeService.
     * 
     * @return ActivityCodePortType
     */
    private ActivityCodePortType createActivityCodeServicePort() {
        URL wsdlURL = wsUtils.createURL(ACTIVITY_CODE_SERVICE);
        ActivityCodeService service = new ActivityCodeService(wsdlURL);
        ActivityCodePortType servicePort = service.getActivityCodePort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the ActivityCodeAssignmentService.
     * 
     * @return ActivityCodeAssignmentPortType
     */
    private ActivityCodeAssignmentPortType createActivityCodeAssignmentServicePort() {
        URL wsdlURL = wsUtils.createURL(ACTIVITY_CODE_ASSIGNMENT_SERVICE);
        ActivityCodeAssignmentService service = new ActivityCodeAssignmentService(wsdlURL);
        ActivityCodeAssignmentPortType servicePort = service.getActivityCodeAssignmentPort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the ActivityCodeTypeService.
     * 
     * @return ActivityCodeTypePortType
     */
    private ActivityCodeTypePortType createActivityCodeTypeServicePort() {
        URL wsdlURL = wsUtils.createURL(ACTIVITY_CODE_TYPE_SERVICE);
        ActivityCodeTypeService service = new ActivityCodeTypeService(wsdlURL);
        ActivityCodeTypePortType servicePort = service.getActivityCodeTypePort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the UDFTypeService.
     * 
     * @return UDFTypePortType
     */
    private UDFTypePortType createUDFTypeServicePort() {
        URL wsdlURL = wsUtils.createURL(UDF_TYPE_SERVICE);
        UDFTypeService service = new UDFTypeService(wsdlURL);
        UDFTypePortType servicePort = service.getUDFTypePort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the UDFValueService.
     * 
     * @return UDFValuePortType
     */
    private UDFValuePortType createUDFValueServicePort() {
        URL wsdlURL = wsUtils.createURL(UDF_VALUE_SERVICE);
        UDFValueService service = new UDFValueService(wsdlURL);
        UDFValuePortType servicePort = service.getUDFValuePort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }
}