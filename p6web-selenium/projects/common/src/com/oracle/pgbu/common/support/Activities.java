package com.oracle.pgbu.common.support;

import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.xml.bind.JAXBElement;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.ws.BindingProvider;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;

import com.primavera.ws.p6.activity.Activity;
import com.primavera.ws.p6.activity.ActivityFieldType;
import com.primavera.ws.p6.activity.ActivityPortType;
import com.primavera.ws.p6.activity.ActivityService;
import com.primavera.ws.p6.activitycomment.ActivityComment;
import com.primavera.ws.p6.activitycomment.ActivityCommentFieldType;
import com.primavera.ws.p6.activitycomment.ActivityCommentPortType;
import com.primavera.ws.p6.activitycomment.ActivityCommentService;
import com.primavera.ws.p6.activitynote.ActivityNote;
import com.primavera.ws.p6.activitynote.ActivityNoteFieldType;
import com.primavera.ws.p6.activitynote.ActivityNotePortType;
import com.primavera.ws.p6.activitynote.ActivityNoteService;
import com.primavera.ws.p6.activityowner.ActivityOwner;
import com.primavera.ws.p6.activityowner.ActivityOwnerFieldType;
import com.primavera.ws.p6.activityowner.ActivityOwnerPortType;
import com.primavera.ws.p6.activityowner.ActivityOwnerService;
import com.primavera.ws.p6.activityowner.CreateActivityOwnersResponse.ObjectId;
import com.primavera.ws.p6.activityowner.DeleteActivityOwners;
import com.primavera.ws.p6.activitystep.ActivityStep;
import com.primavera.ws.p6.activitystep.ActivityStepFieldType;
import com.primavera.ws.p6.activitystep.ActivityStepPortType;
import com.primavera.ws.p6.activitystep.ActivityStepService;
import com.primavera.ws.p6.notebooktopic.NotebookTopic;
import com.primavera.ws.p6.relationship.Relationship;
import com.primavera.ws.p6.relationship.RelationshipFieldType;
import com.primavera.ws.p6.relationship.RelationshipPortType;
import com.primavera.ws.p6.relationship.RelationshipService;
import com.primavera.ws.p6.resource.Resource;
import com.primavera.ws.p6.user.User;

///import com.primavera.tm.support.Utilities;

/**
 * For data manipulation of P6 Activity objects.
 */
public class Activities {
    // WSDLs needed for manipulation of Activity data.
    private static final String ACTIVITY_SERVICE = "/services/ActivityService?wsdl";
    private static final String ACTIVITY_OWNER_SERVICE = "/services/ActivityOwnerService?wsdl";
    private static final String ACTIVITY_STEP_SERVICE = "/services/ActivityStepService?wsdl";
    private static final String ACTIVITY_COMMENT_SERVICE = "/services/ActivityCommentService?wsdl";
    private static final String ACTIVITY_NOTE_SERVICE = "/services/ActivityNoteService?wsdl";
    private static final String RELATIONSHIP_SERVICE = "/services/RelationshipService?wsdl";

    // Web Service utilities.
    private final Utilities utils;
    private final WebServiceUtils wsUtils;

    //protected static final Logger logger = LoggerFactory.getLogger(DataSetup.class);

    /**
     * Returns an instance of the Activities class, for handling Activity data setup.
     */
    public Activities() {
        // Initialize the other utility classes needed.
        utils = Utilities.getInstance();
        wsUtils = WebServiceUtils.getInstance();

        // Initialize the cleanup list.
        activityCleanup = new ArrayList<Integer>();
    }

    /**
     * For storing Activity object IDs for cleanup.
     */
    public List<Integer> activityCleanup;

    /**
     * Creates activity under the specified project, returns activity object.
     * 
     * @param projectObjectId
     *            int for the parent project object ID.
     * @param activityId
     *            string for the activity ID to create.
     * @return Activity object from P6.
     */
    public Activity createActivity(int projectObjectId, String activityId) {
        return createActivity(projectObjectId, activityId, "Activity Name " + activityId);
    }

    /**
     * Creates activity under the specified project, returns activity object.
     * 
     * @param projectObjectId
     *            int for the parent project object ID.
     * @param activityId
     *            string for the activity ID to create.
     * @param activityName
     *            string for the activity name to create.
     * @return Activity object from P6.
     */
    public Activity createActivity(int projectObjectId, String activityId, String activityName) {
        Activity act = new Activity();
        act.setProjectObjectId(projectObjectId);
        act.setId(activityId);
        act.setName(activityName);
        return createActivity(act);
    }

    public Activity createActivity(int projectObjectId, String activityId, String activityName, String actType, Resource rsrc) {
        Activity act = new Activity();
        act.setProjectObjectId(projectObjectId);
        act.setId(activityId);
        act.setName(activityName);
        act.setType(actType);
        act.setPrimaryResourceObjectId(wsUtils.getJAXBInteger(rsrc.getObjectId(), "Activity", "PrimaryResourceObjectId"));
        return createActivity(act);
    }

    public Activity createActivityOfType(int projectObjectId, String activityId, String activityName, String actType) {
        Activity act = new Activity();
        act.setProjectObjectId(projectObjectId);
        act.setId(activityId);
        act.setName(activityName);
        act.setType(actType);
        return createActivity(act);
    }

    public Activity createActivityOfType(int projectObjectId, String activityId, String activityName, String actType,
            JAXBElement<XMLGregorianCalendar> remainingEarlyStart) {
        Activity act = new Activity();
        act.setProjectObjectId(projectObjectId);
        act.setId(activityId);
        act.setName(activityName);
        act.setType(actType);
        act.setRemainingEarlyStartDate(remainingEarlyStart);
        return createActivity(act);
    }

    public Activity createActivity(int projectObjectId, String activityId, String activityName, String activityType) {
        Activity act = new Activity();
        act.setProjectObjectId(projectObjectId);
        act.setId(activityId);
        act.setName(activityName);
        act.setType(activityType);
        return createActivity(act);
    }

    public Activity createActivity(int projectObjectId, String activityId, String activityName, Enum<?> activityStatus) {
        Activity act = new Activity();
        act.setProjectObjectId(projectObjectId);
        act.setId(activityId);
        act.setName(activityName);
        act.setStatus(activityStatus.toString());
        return createActivity(act);
    }

    public Activity createActivity(int projectObjectId, String activityId, String activityName, Enum<?> activityStatus,
            JAXBElement<XMLGregorianCalendar> remainingEarlyStart, JAXBElement<XMLGregorianCalendar> remainingEarlyEnd,
            JAXBElement<XMLGregorianCalendar> actualStartDate, JAXBElement<XMLGregorianCalendar> actualFinishDate) {
        Activity act = new Activity();
        act.setProjectObjectId(projectObjectId);
        act.setId(activityId);
        act.setName(activityName);
        act.setStatus(activityStatus.toString());
        act.setRemainingEarlyStartDate(remainingEarlyStart);
        act.setRemainingEarlyFinishDate(remainingEarlyEnd);
        act.setActualStartDate(actualStartDate);
        act.setActualFinishDate(actualFinishDate);
        return createActivity(act);
    }

    public Activity createActivity(int projectObjectId, String activityId, String activityName, JAXBElement<XMLGregorianCalendar> remainingEarlyStart,
            JAXBElement<XMLGregorianCalendar> remainingEarlyEnd) {
        Activity act = new Activity();
        act.setProjectObjectId(projectObjectId);
        act.setId(activityId);
        act.setName(activityName);
        act.setRemainingEarlyStartDate(remainingEarlyStart);
        act.setRemainingEarlyFinishDate(remainingEarlyEnd);
        return createActivity(act);
    }

    /**
     * Creates activity under the specified project, returns activity object.
     * 
     * @param act
     *            Activity object to create the activity from.
     * @return Activity object from P6.
     */
    public Activity createActivity(Activity act) {
        ActivityPortType servicePort = createActivityServicePort();
        List<Activity> activities = new ArrayList<Activity>();
        activities.add(act);

        try {
            int objId = servicePort.createActivities(activities).get(0);
            utils.sleep(1);

            // Save the ID for cleanup later.
            activityCleanup.add(objId);

            // Return the Activity object, with the new ID appended.
            act.setObjectId(objId);
            utils.log.fine("Successfully created new activity, ObjectID: " + objId);
            return act;
        } catch (com.primavera.ws.p6.activity.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Assigns user to activity as an owner; Activity object Id and user object id must be provided
     * 
     * @param activityObjectId
     *            int identifier for P6 activity object.
     * @param userObjectId
     *            int identifier for P6 user object.
     * @return ObjectId for the activity/owner relationship.
     */
    public ObjectId createActivityOwner(int activityObjectId, int userObjectId) {
        // Create activity owner object with required fields
        ActivityOwner actOwner = new ActivityOwner();
        actOwner.setActivityObjectId(activityObjectId);
        actOwner.setUserObjectId(userObjectId);

        return createActivityOwner(actOwner);
    }

    /**
     * Assigns user to activity as an owner; Activity object Id and user object id must be provided
     * 
     * @param newActivityOwner
     *            ActivityOwner P6 object to create.
     * @return ObjectId for the activity/owner relationship.
     */
    public ObjectId createActivityOwner(ActivityOwner newActivityOwner) {
        ActivityOwnerPortType servicePort = createActivityOwnerServicePort();
        List<ActivityOwner> activityowners = new ArrayList<ActivityOwner>();
        activityowners.add(newActivityOwner);

        try {
            // Just get the first ObjectId returned.
            ObjectId objId = servicePort.createActivityOwners(activityowners).get(0);
            utils.sleep(1);
            utils.log.fine("Successfully assigned user " + newActivityOwner.getUserObjectId() + " as the owner of activity "
                    + newActivityOwner.getActivityObjectId() + ".");
            return objId;
        } catch (com.primavera.ws.p6.activityowner.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Creates Activity comment; Activity object, comment text, and user object must be provided
     * 
     * @param myActivity
     *            P6 Activity object.
     * @param myUser
     *            P6 User object.
     * @param myComment
     *            String to use for the new comment.
     * @return ActivityComment object from P6.
     */
    public ActivityComment createActivityComment(Activity myActivity, User myUser, String myComment) {
        ActivityCommentPortType servicePort = createActivityCommentServicePort();
        List<ActivityComment> activityComments = new ArrayList<ActivityComment>();

        // Create activity comment with required fields
        ActivityComment actComment = new ActivityComment();
        actComment.setActivityObjectId(myActivity.getObjectId());
        actComment.setCommentText(myComment);
        actComment.setUserObjectId(myUser.getObjectId());

        activityComments.add(actComment);

        try {
            int objId = servicePort.createActivityComments(activityComments).get(0);
            actComment.setObjectId(objId);
            utils.log.fine("Successfully created activity comment, ObjectId: " + objId);
            return actComment;
        } catch (com.primavera.ws.p6.activitycomment.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Creates Activity note; activity object, note text, and notebook topic object must be provided.
     * 
     * @param myActivity
     *            P6 Activity object.
     * @param myNotebookTopic
     *            P6 Notebook topic object.
     * @param myNote
     *            String to use for the new note.
     * @return ActivityNote object from P6.
     */
    public ActivityNote createActivityNote(Activity myActivity, NotebookTopic myNotebookTopic, String myNote) {
        ActivityNotePortType servicePort = createActivityNoteServicePort();
        List<ActivityNote> activityNotes = new ArrayList<ActivityNote>();

        // Create activity note with required fields
        ActivityNote actNote = new ActivityNote();
        actNote.setActivityObjectId(myActivity.getObjectId());
        actNote.setNotebookTopicObjectId(myNotebookTopic.getObjectId());
        actNote.setNote(myNote);

        activityNotes.add(actNote);

        try {
            int objId = servicePort.createActivityNotes(activityNotes).get(0);
            actNote.setObjectId(objId);
            utils.log.fine("Successfully created activity note, ObjectId: " + objId);
            return actNote;
        } catch (com.primavera.ws.p6.activitynote.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Creates Activity step; activity object id must be provided
     * 
     * @param activityObjectId
     *            int identifier for the P6 Activity object.
     * @param stepName
     *            String to use for the new step's name.
     * @return ActivityStep object from P6.
     */
    public ActivityStep createActivityStep(int activityObjectId, String stepName) {
        ActivityStepPortType servicePort = createActivityStepServicePort();
        List<ActivityStep> activitySteps = new ArrayList<ActivityStep>();

        // Create step with required fields
        ActivityStep actStep = new ActivityStep();
        actStep.setActivityObjectId(activityObjectId);
        actStep.setName(stepName);

        activitySteps.add(actStep);

        try {
            int objId = servicePort.createActivitySteps(activitySteps).get(0);
            actStep.setObjectId(objId);
            utils.log.fine("Successfully created activity step, ObjectId: " + objId);
            return actStep;
        } catch (com.primavera.ws.p6.activitystep.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Creates activity under WBS; returns activity object
     * 
     * @param projectObjectId
     *            int identifier for the P6 Project.
     * @param wbsObjectId
     *            int identifier for the WBS object to create the activity under.
     * @param activityName
     *            String to use for the new activity name.
     * @return Activity object from P6.
     */
    public Activity createWBSActivity(int projectObjectId, int wbsObjectId, String activityName) {
        // Set up the new activity using the passed in information,.
        Activity act = new Activity();
        act.setProjectObjectId(Integer.valueOf(projectObjectId));
        act.setWBSObjectId(wsUtils.getJAXBInteger(wbsObjectId, "Activity", "WBSObjectId"));
        act.setId(activityName);
        act.setName(activityName);

        return createActivity(act);
    }

    /**
     * Creates activity under WBS; returns activity object
     * 
     * @param act
     *            Activity object to create in P6.
     * @return Activity object from P6.
     */
    public Activity createWBSActivity(Activity act) {
        return createActivity(act);
    }

    /**
     * Assigns one activity as a predecessor of another activity.
     * 
     * @param activityObjectId
     *            int identifier for the "successor" P6 Activity object.
     * @param predecessorActivityObjectId
     *            int identifier for the "predecessor" P6 Activity object.
     * @return int identifier for the activity relationship.
     */
    public int createPredecessor(int activityObjectId, int predecessorActivityObjectId) {
        Relationship predecessor = new Relationship();
        predecessor.setSuccessorActivityObjectId(activityObjectId);
        predecessor.setPredecessorActivityObjectId(predecessorActivityObjectId);

        return createPredecessor(predecessor);
    }

    /**
     * Assigns one activity as a predecessor of another activity.
     * 
     * @param predecessor
     *            P6 Relationship object specifying the predecessor and successor activities.
     * @return int identifier for the activity relationship.
     */
    public int createPredecessor(Relationship predecessor) {
        RelationshipPortType servicePort = createRelationshipServicePort();
        List<Relationship> relationships = new ArrayList<Relationship>();
        relationships.add(predecessor);

        try {
            int relationshipId = servicePort.createRelationships(relationships).get(0);
            utils.log.fine("Successfully created predecessor, RelationshipId: " + relationshipId);
            return relationshipId;
        } catch (com.primavera.ws.p6.relationship.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return 0;
        }
    }

    /**
     * Assigns one activity as a successor of another activity.
     * 
     * @param activityObjectId
     *            int identifier for the "predecessor" P6 Activity object.
     * @param successorActivityObjectId
     *            int identifier for the "successor" P6 Activity object.
     * @return int identifier for the activity relationship.
     */
    public int createSuccessor(int activityObjectId, int successorActivityObjectId) {
        Relationship successor = new Relationship();
        successor.setPredecessorActivityObjectId(activityObjectId);
        successor.setSuccessorActivityObjectId(successorActivityObjectId);

        return createSuccessor(successor);
    }

    /**
     * Assigns one activity as a successor of another activity.
     * 
     * @param successor
     *            Relationship object from P6 to create.
     * @return int identifier for the activity relationship.
     */
    public int createSuccessor(Relationship successor) {
        RelationshipPortType servicePort = createRelationshipServicePort();
        List<Relationship> relationships = new ArrayList<Relationship>();
        relationships.add(successor);

        try {
            int relationshipId = servicePort.createRelationships(relationships).get(0);
            utils.log.fine("Successfully created successor, RelationshipId: " + relationshipId);
            return relationshipId;
        } catch (com.primavera.ws.p6.relationship.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return 0;
        }
    }

    /**
     * Reads activity, returns all fields in P6.
     * 
     * @param activityId
     *            String activity Id to read.
     * @return Activity object from P6.
     */
    public Activity readActivity(String activityId) {
        ActivityPortType servicePort = createActivityServicePort();

        // Read all fields.
        List<ActivityFieldType> fields = new ArrayList<ActivityFieldType>();
        fields.addAll(Arrays.asList(ActivityFieldType.values()));

        // Load activity with specific Id, assumes your criteria only gets 1
        // activity.
        try {
            Activity activity = servicePort.readActivities(fields, "Id = '" + activityId + "'", null).get(0);
            utils.log.fine("Successfully read activity " + activityId);
            return activity;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads activity owner; activity owner object is returned
     * 
     * @param activityObjectId
     *            int identifier for the ActivityOwner object.
     * @return ActivityOwner object from P6.
     */
    public ActivityOwner readActivityOwner(int activityObjectId) {
        ActivityOwnerPortType servicePort = createActivityOwnerServicePort();

        // Read all fields.
        List<ActivityOwnerFieldType> fields = new ArrayList<ActivityOwnerFieldType>();
        fields.addAll(Arrays.asList(ActivityOwnerFieldType.values()));

        // Load activity with specific object Id
        try {
            ActivityOwner actOwner = servicePort.readActivityOwners(fields, "ActivityObjectId = '" + activityObjectId + "'", "").get(0);
            utils.log.fine("Successfully read activity owner " + activityObjectId);
            return actOwner;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads activity comment
     * 
     * @param activityObjectId
     *            int identifier for the Activity object from P6.
     * @param activityCommentObjectId
     *            int identifier for the Activity Comment object from P6.
     * 
     * @return Activity Comment Object.
     */
    public ActivityComment readActivityComment(int activityObjectId, int activityCommentObjectId) {
        ActivityCommentPortType servicePort = createActivityCommentServicePort();

        // Read all fields.
        List<ActivityCommentFieldType> fields = new ArrayList<ActivityCommentFieldType>();
        fields.addAll(Arrays.asList(ActivityCommentFieldType.values()));

        // Load activity comment with specific activity and comment object Ids
        try {
            ActivityComment actComment = servicePort.readActivityComments(fields,
                    "(ActivityObjectId = '" + activityObjectId + "') and (ObjectId = '" + activityCommentObjectId + "')", "").get(0);
            utils.log.fine("Successflly read activity comment for activity " + activityObjectId + " and comment id " + activityCommentObjectId);
            return actComment;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads activity comments
     * 
     * @param myActivity
     *            Activity object from P6.
     * 
     * @return List of Activity Comment Objects.
     */
    public List<ActivityComment> readActivityComments(Activity myActivity) {
        ActivityCommentPortType servicePort = createActivityCommentServicePort();

        // Read all fields.
        List<ActivityCommentFieldType> fields = new ArrayList<ActivityCommentFieldType>();
        fields.addAll(Arrays.asList(ActivityCommentFieldType.values()));

        // Load list of activity comments with specific activity object Id
        try {
            List<ActivityComment> actCommentList = servicePort.readActivityComments(fields, "ActivityObjectId = '" + myActivity.getObjectId() + "'", "");
            utils.log.fine("Successflly read all activity comments for activity " + myActivity.getObjectId());
            return actCommentList;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads activity notes
     * 
     * @param activityObjectId
     *            int identifier for the Activity object from P6.
     * @param activityNoteTopicObjectId
     *            int identifier for the Activity Notes object from P6.
     * 
     * @return Activity Notes Object.
     */

    public ActivityNote readActivityNote(int activityObjectId, int activityNoteTopicObjectId) {
        ActivityNotePortType servicePort = createActivityNoteServicePort();

        // Read all fields.
        List<ActivityNoteFieldType> fields = new ArrayList<ActivityNoteFieldType>();
        fields.addAll(Arrays.asList(ActivityNoteFieldType.values()));

        // Load activity note with specific activity and note object Ids
        try {
            ActivityNote actNote = servicePort.readActivityNotes(fields,
                    "(ActivityObjectId = '" + activityObjectId + "') and (NotebookTopicObjectId = '" + activityNoteTopicObjectId + "')", "").get(0);
            utils.log.fine("Successflly read activity note for activity " + activityObjectId + " and note topic id " + activityNoteTopicObjectId);
            return actNote;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads activity notes
     * 
     * @param myActivity
     *            Activity object from P6.
     * 
     * @return List of Activity notes Objects.
     */
    public List<ActivityNote> readActivityNotes(Activity myActivity) {
        ActivityNotePortType servicePort = createActivityNoteServicePort();

        // Read all fields.
        List<ActivityNoteFieldType> fields = new ArrayList<ActivityNoteFieldType>();
        fields.addAll(Arrays.asList(ActivityNoteFieldType.values()));

        // Load list of activity notes with specific activity object Id
        try {
            List<ActivityNote> actNote = servicePort.readActivityNotes(fields, "ActivityObjectId = '" + myActivity.getObjectId() + "'", "");
            utils.log.fine("Successfully read all activity notebooks for activity " + myActivity.getObjectId());
            return actNote;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads activity step; returns activity step object
     * 
     * @param activityObjectId
     *            int identifier for the Activity object.
     * @param stepName
     *            String identifier for the Step object.
     * @return ActivityStep object from P6.
     */
    public ActivityStep readActivityStep(int activityObjectId, String stepName) {
        ActivityStepPortType servicePort = createActivityStepServicePort();

        // Read all fields
        List<ActivityStepFieldType> fields = new ArrayList<ActivityStepFieldType>();
        fields.addAll(Arrays.asList(ActivityStepFieldType.values()));

        // Load activity step with specific object Id and step name
        try {
            ActivityStep actStep = servicePort.readActivitySteps(fields, "(ActivityObjectId = '" + activityObjectId + "') and (Name = '" + stepName + "')", "").get(
                    0);
            utils.log.fine("Successfully read step " + stepName + " from activity " + activityObjectId);
            return actStep;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads predecessor; 2 activity object id must be provided; returns object Id of the relationship
     * 
     * @param activityObjectId
     *            int identifier for the P6 Activity object.
     * @param predecessorActivityObjectId
     *            int identifier for the predecessor Activity object.
     * @return Relationship object from P6.
     */
    public Relationship readPredecessor(int activityObjectId, int predecessorActivityObjectId) {
        RelationshipPortType servicePort = createRelationshipServicePort();

        // Read all fields.
        List<RelationshipFieldType> fields = new ArrayList<RelationshipFieldType>();
        fields.addAll(Arrays.asList(RelationshipFieldType.values()));

        // Load resource assignment with specific Id
        try {
            Relationship rel = servicePort.readRelationships(fields,
                    "(SuccessorActivityObjectId = '" + activityObjectId + "') and (PredecessorActivityObjectId = '" + predecessorActivityObjectId + "')", "").get(0);
            utils.log.fine("Successfully read the predecessor activity " + predecessorActivityObjectId + " from activity " + activityObjectId);
            return rel;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads Successor; 2 activity object id must be provided; returns object Id of the relationship
     * 
     * @param activityObjectId
     *            int identifier for the P6 Activity object.
     * @param successorActivityObjectId
     *            int identifier for the successor Activity object.
     * @return Relationship object from P6.
     */
    public Relationship readSuccessor(int activityObjectId, int successorActivityObjectId) {
        RelationshipPortType servicePort = createRelationshipServicePort();

        // Read all fields.
        List<RelationshipFieldType> fields = new ArrayList<RelationshipFieldType>();
        fields.addAll(Arrays.asList(RelationshipFieldType.values()));

        try {
            Relationship rel = servicePort.readRelationships(fields,
                    "(PredecessorActivityObjectId = '" + activityObjectId + "') and (SuccessorActivityObjectId = '" + successorActivityObjectId + "')", "").get(0);
            utils.log.fine("Successfully read the successor activity " + successorActivityObjectId + " from activity " + activityObjectId);
            return rel;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Updates relationship
     * 
     * @param relationship
     *            Relationship object to update.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateRelationship(Relationship relationship) {
        RelationshipPortType servicePort = createRelationshipServicePort();
        List<Relationship> relationships = new ArrayList<Relationship>();
        relationships.add(relationship);
        try {
            boolean flag = servicePort.updateRelationships(relationships);
            if (flag)
                utils.log.fine("Successfully updated relationship " + relationship.getObjectId());
            else
                utils.log.warning("Relationship " + relationship.getObjectId() + " was NOT updated.");
            return flag;
        } catch (com.primavera.ws.p6.relationship.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Updates activity
     * 
     * @param act
     *            Activity object to update with.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateActivity(Activity act) {
        ActivityPortType servicePort = createActivityServicePort();
        List<Activity> activities = new ArrayList<Activity>();
        activities.add(act);
        try {
            boolean flag = servicePort.updateActivities(activities);
            if (flag) {
                utils.log.fine("Successfully updated activity " + act.getObjectId());
                utils.sleep(1.0);
            } else
                utils.log.warning("Activity " + act.getObjectId() + " was NOT updated.");
            return flag;
        } catch (com.primavera.ws.p6.activity.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Updates Activity comment
     * 
     * @param actComment
     *            ActivityComment object to update.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateActivityComment(ActivityComment actComment) {
        ActivityCommentPortType servicePort = createActivityCommentServicePort();
        List<ActivityComment> actComments = new ArrayList<ActivityComment>();
        actComments.add(actComment);
        try {
            boolean flag = servicePort.updateActivityComments(actComments);
            if (flag)
                utils.log.fine("Successfully updated activity comment " + actComment.getObjectId());
            else
                utils.log.warning("Activity comment " + actComment.getObjectId() + " was NOT updated.");
            return flag;
        } catch (com.primavera.ws.p6.activitycomment.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Updates Activity note
     * 
     * @param actNote
     *            ActivityNote object to update.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateActivityNote(ActivityNote actNote) {
        ActivityNotePortType servicePort = createActivityNoteServicePort();
        List<ActivityNote> actNotes = new ArrayList<ActivityNote>();
        actNotes.add(actNote);
        try {
            boolean flag = servicePort.updateActivityNotes(actNotes);
            if (flag)
                utils.log.fine("Successfully updated activity note " + actNote.getObjectId());
            else
                utils.log.warning("Activity note " + actNote.getObjectId() + " was NOT updated.");
            return flag;
        } catch (com.primavera.ws.p6.activitynote.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Updates Activity step
     * 
     * @param actStep
     *            ActivityStep object to update.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateActivityStep(ActivityStep actStep) {
        ActivityStepPortType servicePort = createActivityStepServicePort();
        List<ActivityStep> actSteps = new ArrayList<ActivityStep>();
        actSteps.add(actStep);
        try {
            boolean flag = servicePort.updateActivitySteps(actSteps);
            if (flag)
                utils.log.fine("Successfully updated activity step " + actStep.getObjectId());
            else
                utils.log.warning("Activity step " + actStep.getObjectId() + " was NOT updated.");
            return flag;
        } catch (com.primavera.ws.p6.activitystep.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes activity
     * 
     * @param activityObjectId
     *            int identifier for the P6 Activity object to delete.
     * @return boolean true if successfully deleted, false if not.
     */
    public boolean deleteActivity(int activityObjectId) {
        List<Integer> singleId = new ArrayList<Integer>();
        singleId.add(activityObjectId);
        return deleteActivities(singleId);
    }

    /**
     * Deletes activities
     * 
     * @param activityObjectIds
     *            int identifiers for all the P6 Activity objects to delete.
     * @return boolean true if they were successfully deleted, false if not.
     */
    public boolean deleteActivities(List<Integer> activityObjectIds) {
        ActivityPortType servicePort = createActivityServicePort();

        try {
            boolean flag = servicePort.deleteActivities(activityObjectIds);
            utils.sleep(1);
            if (flag)
                utils.log.fine("Successfully deleted P6 Activity objects: " + activityObjectIds);
            else
                utils.log.warning("Activities: " + activityObjectIds + " were not deleted.");
            return flag;
        } catch (com.primavera.ws.p6.activity.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Remove the user as the owner of the specified activity.
     * 
     * @param activityObjectId
     *            int identifier for the P6 Activity object.
     * @param userObjectId
     *            int identifier for the P6 User object.
     * @return boolean true if the relationship was successfully broken, false if not.
     */
    public boolean deleteActivityOwner(int activityObjectId, int userObjectId) {
        DeleteActivityOwners.ObjectId actOwnerObjId = new DeleteActivityOwners.ObjectId();
        actOwnerObjId.setUserObjectId(userObjectId);
        actOwnerObjId.setActivityObjectId(activityObjectId);
        ActivityOwnerPortType servicePort = createActivityOwnerServicePort();
        List<DeleteActivityOwners.ObjectId> delIds = new ArrayList<DeleteActivityOwners.ObjectId>();
        delIds.add(actOwnerObjId);
        try {
            boolean flag = servicePort.deleteActivityOwners(delIds);
            if (flag)
                utils.log.fine("Successfully removed user " + userObjectId + " as the owner of activity " + activityObjectId);
            else
                utils.log.warning("User " + userObjectId + " was NOT removed as the owner of activity " + activityObjectId);
            return flag;
        } catch (com.primavera.ws.p6.activityowner.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes Activity comment
     * 
     * @param commentObjectId
     *            int identifier for the ActivityComment to delete.
     * @return boolean true if the comment was successfully deleted, false if not.
     */
    //    public boolean deleteActivityComment(int commentObjectId) {
    //        ActivityCommentPortType servicePort = createActivityCommentServicePort();
    //        List<Integer> delIds = new ArrayList<Integer>();
    //        delIds.add(Integer.valueOf(commentObjectId));
    //        try {
    //            boolean flag = servicePort.deleteActivityComments(delIds);
    //            if (flag)
    //                utils.log.fine("Activity comment " + commentObjectId + " was successfully deleted.");
    //            else
    //                utils.log.warning("Activity comment " + commentObjectId + " was NOT deleted.");
    //            return flag;
    //        } catch (com.primavera.ws.p6.activitycomment.IntegrationFault e) {
    //            utils.log.severe(e.getMessage());
    //            return false;
    //        }
    //    }

    /**
     * Deletes Activity note
     * 
     * @param noteObjectId
     *            int identifier for the ActivityNote to delete.
     * @return boolean true if the note was successfully deleted, false if not.
     */
    public boolean deleteActivityNote(int noteObjectId) {
        ActivityNotePortType servicePort = createActivityNoteServicePort();
        List<Integer> delIds = new ArrayList<Integer>();
        delIds.add(Integer.valueOf(noteObjectId));
        try {
            boolean flag = servicePort.deleteActivityNotes(delIds);
            if (flag)
                utils.log.fine("Activity note " + noteObjectId + " was successfully deleted.");
            else
                utils.log.warning("Activity note " + noteObjectId + " was NOT deleted.");
            return flag;
        } catch (com.primavera.ws.p6.activitynote.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes Activity step
     * 
     * @param stepObjectId
     *            int identifier for the ActivityStep to delete.
     * @return boolean true if the step was successfully deleted, false if not.
     */
    public boolean deleteActivityStep(int stepObjectId) {
        ActivityStepPortType servicePort = createActivityStepServicePort();
        List<Integer> delIds = new ArrayList<Integer>();
        delIds.add(Integer.valueOf(stepObjectId));
        try {
            boolean flag = servicePort.deleteActivitySteps(delIds);
            if (flag)
                utils.log.fine("Activity step " + stepObjectId + " was successfully deleted.");
            else
                utils.log.warning("Activity step " + stepObjectId + " was NOT deleted.");
            return flag;
        } catch (com.primavera.ws.p6.activitystep.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes relationship by provided relationship object id
     * 
     * @param relationshipObjectId
     *            int identifier for P6 Relationship object.
     * @return boolean true if the relationship was successfully broken, false if not.
     */
    public boolean deleteRelationship(int relationshipObjectId) {
        RelationshipPortType servicePort = createRelationshipServicePort();
        List<Integer> delIds = new ArrayList<Integer>();
        delIds.add(Integer.valueOf(relationshipObjectId));
        try {
            boolean flag = servicePort.deleteRelationships(delIds);
            if (flag)
                utils.log.fine("Relationship " + relationshipObjectId + " was successfully deleted.");
            else
                utils.log.warning("Relationship " + relationshipObjectId + " was NOT deleted.");
            return flag;
        } catch (com.primavera.ws.p6.relationship.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Creates an instance of the ActivityService.
     * 
     * @return ActivityPortType
     */
    private ActivityPortType createActivityServicePort() {
        URL wsdlURL = wsUtils.createURL(ACTIVITY_SERVICE);
        ActivityService service = new ActivityService(wsdlURL);
        ActivityPortType servicePort = service.getActivityPort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the ActivityStepService.
     * 
     * @return ActivityStepPortType
     */
    private ActivityStepPortType createActivityStepServicePort() {
        URL wsdlURL = wsUtils.createURL(ACTIVITY_STEP_SERVICE);
        ActivityStepService service = new ActivityStepService(wsdlURL);
        ActivityStepPortType servicePort = service.getActivityStepPort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the ActivityCommentService.
     * 
     * @return ActivityCommentPortType
     */
    private ActivityCommentPortType createActivityCommentServicePort() {
        URL wsdlURL = wsUtils.createURL(ACTIVITY_COMMENT_SERVICE);
        ActivityCommentService service = new ActivityCommentService(wsdlURL);
        ActivityCommentPortType servicePort = service.getActivityCommentPort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the ActivityNoteService.
     * 
     * @return ActivityNotePortType
     */
    private ActivityNotePortType createActivityNoteServicePort() {
        URL wsdlURL = wsUtils.createURL(ACTIVITY_NOTE_SERVICE);
        ActivityNoteService service = new ActivityNoteService(wsdlURL);
        ActivityNotePortType servicePort = service.getActivityNotePort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the ActivityOwnerService.
     * 
     * @return ActivityOwnerPortType
     */
    private ActivityOwnerPortType createActivityOwnerServicePort() {
        URL wsdlURL = wsUtils.createURL(ACTIVITY_OWNER_SERVICE);
        ActivityOwnerService service = new ActivityOwnerService(wsdlURL);
        ActivityOwnerPortType servicePort = service.getActivityOwnerPort();
        Client client = ClientProxy.getClient(servicePort);
        //wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the RelationshipService.
     * 
     * @return RelationshipPortType
     */
    private RelationshipPortType createRelationshipServicePort() {
        URL wsdlURL = wsUtils.createURL(RELATIONSHIP_SERVICE);
        RelationshipService service = new RelationshipService(wsdlURL);
        RelationshipPortType servicePort = service.getRelationshipPort();
        Client client = ClientProxy.getClient(servicePort);
        //wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }
}
