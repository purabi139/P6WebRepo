package com.oracle.pgbu.common.support;

import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.xml.bind.JAXBElement;
import javax.xml.ws.BindingProvider;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;

import com.primavera.ws.p6.obs.OBS;
import com.primavera.ws.p6.obs.OBSFieldType;
import com.primavera.ws.p6.obs.OBSPortType;
import com.primavera.ws.p6.obs.OBSService;
import com.primavera.ws.p6.project.Project;
import com.primavera.ws.p6.project.ProjectFieldType;
import com.primavera.ws.p6.project.ProjectPortType;
import com.primavera.ws.p6.project.ProjectService;
import com.primavera.ws.p6.user.User;
import com.primavera.ws.p6.userobs.UserOBS;
import com.primavera.ws.p6.userobs.UserOBSPortType;
import com.primavera.ws.p6.userobs.UserOBSService;
//import org.apache.cxf.endpoint.Client;
//import org.apache.cxf.frontend.ClientProxy;
//import com.primavera.tm.support.Utilities;

/**
 * For data manipulation of P6 Project objects.
 */
public class Projects {
    // WSDLs needed for manipulation of Project data.
    private static final String PROJECT_SERVICE = "/services/ProjectService?wsdl";
    private static final String OBS_SERVICE = "/services/OBSService?wsdl";
    private static final String USER_OBS_SERVICE = "/services/UserOBSService?wsdl";

    // Web Service utilities.
    private final Utilities utils;
    private final WebServiceUtils wsUtils;
    private final DatabaseUtils dbUtils;

    /**
     * For storing Project object IDs for cleanup.
     */
    public List<Integer> projectCleanup;

    /**
     * For storing OBS object IDs for cleanup.
     */
    public List<Integer> obsCleanup;

    /**
     * Returns an instance of the Projects class, for handling Projects data setup.
     */
    public Projects() {
        // Initialize the other utility classes needed.
        utils = Utilities.getInstance();
        wsUtils = WebServiceUtils.getInstance();
        dbUtils = DatabaseUtils.getInstance();

        // Initialize the cleanup lists.
        projectCleanup = new ArrayList<Integer>();
        obsCleanup = new ArrayList<Integer>();
    }

    /**
     * Creates a project in P6; returns P6 Project object. Defaults to root EPS.
     * 
     * @param projectId
     *            String to use as new ProjectId.
     * @return Project object from P6.
     */
    public Project createProject(String projectId, String projStatus) {
        EPSs epsData = new EPSs();
        System.out.println(epsData.readEPS().getName());
        // Hand off to the core method.
        return createProject(Integer.valueOf(epsData.readEPS().getObjectId()), projectId, projStatus);
    }
    
    /**
     * Creates a project in P6; returns P6 Project object. Defaults to root EPS.
     * 
     * @param projectId
     *            String to use as new ProjectId.
     * @return Project object from P6 with Log Additional time.
     */
    public Project createProjectWithLogAdditionalTime(String projectId, String projStatus) {
        EPSs epsData = new EPSs();
        // Hand off to the core method.
        return createProjectWithLogAdditionalTime(Integer.valueOf(epsData.readEPS().getObjectId()), projectId, projStatus);
    }

    /**
     * Creates a project in P6 with status reviewer; returns P6 Project object. Defaults to root EPS.
     * 
     * @param projectId
     *            String to use as new ProjectId.
     * @return Project object from P6.
     */
    public Project createProjectWithStatusReviewer(String projectId, String projStatus) {
        EPSs epsData = new EPSs();
        // Hand off to the core method.
        return createProjectWithStatusReviewer(Integer.valueOf(epsData.readEPS().getObjectId()), projectId, projStatus);
    }
    
    /**
     * Creates a project with Diff Id and Name in P6 with status reviewer; returns P6 Project object. Defaults to root EPS.
     * 
     * @param projectId
     *            String to use as new ProjectId.
     * @return Project object from P6.
     */
    public Project createProjectWithStatusReviewerAndDiffProjIdName(String projectId, String projStatus) {
        EPSs epsData = new EPSs();
        // Hand off to the core method.
        return createProjectWithStatusReviewerAndDiffProjIdName(Integer.valueOf(epsData.readEPS().getObjectId()), projectId, projStatus);
    }
    
    public Project createProject(String projectId, String projStatus, String projType) {
        EPSs epsData = new EPSs();
        // Hand off to the core method.
        return createProject(Integer.valueOf(epsData.readEPS().getObjectId()), projectId, projStatus, projType);
    }

    public Project createProjectWithNonWorkingDays(String projectId, String projStatus, JAXBElement<Integer> calID) {
        EPSs epsData = new EPSs();
        // Hand off to the core method.
        return createProjectHavingNonWorkingDayCal(Integer.valueOf(epsData.readEPS().getObjectId()), projectId, projStatus, calID);
    }

    /**
     * Creates a project in P6; returns P6 Project object.
     * 
     * @param epsObjectId
     *            int identifier for parent EPS object.
     * @param projectId
     *            String to use as new ProjectId.
     * @return Project object from P6.
     */
    public Project createProject(int epsObjectId, String projectId, String projStatus) {
        // Create project with required fields
        Project proj = new Project();

        // These are the defaults used for creating a project when nothing else
        // is specified.
        proj.setParentEPSObjectId(Integer.valueOf(epsObjectId));
        proj.setId(projectId);
        proj.setName(projectId);
        proj.setStatus(projStatus);

        // Default to allowing team members to edit/edit/delete steps and showing both assignment types.
        proj.setTeamMemberStepsAddDeletable(true);
        proj.setTeamMemberAssignmentOption("TMAO_RESASSN_AND_ACTOWNR");
        
        // Create the project.
        return createProject(proj);
    }
    
    public Project createProjectWithLogAdditionalTime(int epsObjectId, String projectId, String projStatus) {
        // Create project with required fields
        Project proj = new Project();

        // These are the defaults used for creating a project when nothing else
        // is specified.
        proj.setParentEPSObjectId(Integer.valueOf(epsObjectId));
        proj.setId(projectId);
        proj.setName(projectId);
        proj.setStatus(projStatus);

        // Default to allowing team members to edit/edit/delete steps and showing both assignment types.
        proj.setTeamMemberStepsAddDeletable(true);
        proj.setTeamMemberAssignmentOption("TMAO_RESASSN_AND_ACTOWNR");
        
        proj.setTeamMemberAddNewActualUnits(true);

        // Create the project.
        return createProject(proj);
    }

    public Project createProjectHavingNonWorkingDayCal(int epsObjectId, String projectId, String projStatus, JAXBElement<Integer> calID) {
        // Create project with required fields
        Project proj = new Project();

        // These are the defaults used for creating a project when nothing else
        // is specified.
        proj.setParentEPSObjectId(Integer.valueOf(epsObjectId));
        proj.setId(projectId);
        proj.setName(projectId);
        proj.setStatus(projStatus);
        proj.setActivityDefaultCalendarObjectId(calID);

        // Default to allowing team members to edit/edit/delete steps and showing both assignment types.
        proj.setTeamMemberStepsAddDeletable(true);
        proj.setTeamMemberAssignmentOption("TMAO_RESASSN_AND_ACTOWNR");

        // Create the project.
        return createProject(proj);
    }

    public Project createProject(int epsObjectId, String projectId, String projStatus, String projType) {
        // Create project with required fields
        Project proj = new Project();

        // These are the defaults used for creating a project when nothing else
        // is specified.
        proj.setParentEPSObjectId(Integer.valueOf(epsObjectId));
        proj.setId(projectId);
        proj.setName(projectId);
        proj.setStatus(projStatus);

        // Default to allowing team members to edit/edit/delete steps and showing both assignment types.
        proj.setTeamMemberStepsAddDeletable(true);
        proj.setTeamMemberAssignmentOption("TMAO_RESASSN_AND_ACTOWNR");


        // Create the project.
        return createProject(proj);
    }

    /**
     * Creates a project in P6; returns P6 Project object.
     * 
     * @param proj
     *            Project object to create in P6.
     * @return Project object from P6.
     */
    public Project createProject(Project proj) {
        ProjectPortType servicePort = createProjectServicePort();
        List<Project> projects = new ArrayList<Project>();
        projects.add(proj);

        try {
            // Create the project, save the ID for cleanup later.
            int objId = servicePort.createProjects(projects).get(0);
            utils.sleep(1.0);
            projectCleanup.add(objId);

            // Include the new object ID with the original project object and
            // return it.
            proj.setObjectId(objId);
            utils.log.fine("Successfully created project, ObjectId: " + objId);
            return proj;
        } catch (com.primavera.ws.p6.project.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    public int createBaselineProject(int OriginalProjectObjectId, int TargetProjectObjectId) {
        ProjectPortType servicePort = createProjectServicePort();
        List<Project> projects = new ArrayList<Project>();

        try {
            // Create the project, save the ID for cleanup later.
            int objId = servicePort.convertProjectToBaseline(OriginalProjectObjectId, TargetProjectObjectId);
            utils.sleep(1.0);
            projectCleanup.add(objId);

            // Include the new object ID with the original project object and
            // return it.
            utils.log.fine("Successfully created project, ObjectId: " + objId);
            return OriginalProjectObjectId;
        } catch (com.primavera.ws.p6.project.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return 0;
        }
    }

    /**
     * Creates an OBS in P6 from the specified OBS object.
     * 
     * @param obs
     *            OBS object to create in P6.
     * @return int identifier for the OBS.
     */
    public int createOBS(OBS obs) {
        OBSPortType servicePort = createOBSServicePort();
        List<OBS> obses = new ArrayList<OBS>();
        obses.add(obs);

        try {
            int obsId = servicePort.createOBS(obses).get(0).intValue();
            utils.sleep(1);
            utils.log.fine("Successfully created OBS, ObjectId: " + obsId);
            obsCleanup.add(obsId);
            return obsId;
        } catch (com.primavera.ws.p6.obs.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return 0;
        }
    }

    /**
     * Creates a User OBS link in P6 from the specified UserOBS
     * 
     * @param userObs
     *            UserOBS object to create link in P6.
     * @return boolean true is OBS and User linked. False if not.
     */
    public boolean createUserOBS(UserOBS userObs) {
        UserOBSPortType servicePort = createUserOBSServicePort();
        List<UserOBS> userObses = new ArrayList<UserOBS>();
        userObses.add(userObs);

        try {
            int objId = servicePort.createUserOBS(userObses).get(0).getOBSObjectId();
            utils.sleep(1);
            utils.log.fine("Successfully created OBS / User relationship for OBS: " + objId);
            return true;
        } catch (com.primavera.ws.p6.userobs.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Linking a project, user, and OBS requires a lot of data manipulation, and is required for User Filters.
     * Provide a single method for linking a user and project with a new, generic OBS.
     */
    public void createProjectOBS(User user, Project project) {
        // Create a new OBS object, under the root "Enterprise" node, set the required fields.
        OBS obs = new OBS();
        //TODO
        //		obs.setDescription("Test-OBS-" + utils.randomChars(6));
        //		obs.setName(utils.randomChars(6));
        obs.setDescription("Test-OBS-" + project);
        obs.setName("OBS-"+project.getName());
        obs.setParentObjectId(wsUtils.getJAXBInteger(readOBS("Enterprise").getObjectId(), "OBS", "ParentObjectId"));

        // Create the OBS in P6.
        int obsId = createOBS(obs);

        // Update the project, tell it what OBS it falls under.
        project.setOBSObjectId(obsId);
        updateProject(project);

        // Link the User to the OBS object.
        UserOBS userObs = new UserOBS();
        userObs.setOBSObjectId(obsId);
        userObs.setUserObjectId(user.getObjectId());

        createUserOBS(userObs);
    }
    
    /**
     * Linking a user with OBS object.
     */
    public void linkOBSForUser(User user) {
        // Link the User to the OBS object.
        UserOBS userObs = new UserOBS();
        userObs.setOBSObjectId(readOBS("Enterprise").getObjectId());
        userObs.setUserObjectId(user.getObjectId());
        userObs.setProfileName("Project Manager");
        createUserOBS(userObs);
    }

    /**
     * Reads OBS by provided name
     * 
     * @param obsName
     *            String identifier for the OBS to read.
     * @return OBS object from P6.
     */
    public OBS readOBS(String obsName) {
        OBSPortType servicePort = createOBSServicePort();

        // Read all fields
        List<OBSFieldType> fields = new ArrayList<OBSFieldType>();
        fields.addAll(Arrays.asList(OBSFieldType.values()));

        // Load OBS with specific name
        try {
            OBS obs = servicePort.readOBS(fields, "Name = '" + obsName + "'", null).get(0);
            utils.log.fine("Successfully read OBS " + obsName);
            return obs;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Reads project by provided project id
     * 
     * @param projectId
     *            String identifier for the Project to read.
     * @return Project object from P6.
     */
    public Project readProject(String projectId) {
        ProjectPortType servicePort = createProjectServicePort();

        // Read all fields
        List<ProjectFieldType> fields = new ArrayList<ProjectFieldType>();
        fields.addAll(Arrays.asList(ProjectFieldType.values()));

        // Load project with specific Id
        try {
            Project proj = servicePort.readProjects(fields, "Id = '" + projectId + "'", null).get(0);
            utils.log.fine("Successfully read project " + projectId);
            return proj;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Updates project
     * 
     * @param prj
     *            Project object to update.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateProject(Project prj) {
        ProjectPortType servicePort = createProjectServicePort();
        List<Project> projects = new ArrayList<Project>();

        projects.add(prj);

        try {
            boolean flag = servicePort.updateProjects(projects);
            if (flag)
                utils.log.fine("Successfully updated project " + prj.getObjectId());
            else
                utils.log.warning("Project " + prj.getObjectId() + " was NOT updated.");
            utils.sleep(1.0);
            return flag;
        } catch (com.primavera.ws.p6.project.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes project; Project object Id must be provided
     * 
     * @param projectObjectId
     *            int identifier for the P6 Project to delete.
     * @return boolean true if the project was successfully deleted, false if not.
     */
    public boolean deleteProject(int projectObjectId) {
        List<Integer> singleId = new ArrayList<Integer>();
        singleId.add(projectObjectId);
        return deleteProjects(singleId);
    }

    /**
     * Deletes projects; Project object Ids must be provided
     * 
     * @param projectObjectIds
     *            int identifiers for the P6 Projects to delete.
     * @return boolean true if the projects were successfully deleted, false if not.
     */
    public boolean deleteProjects(List<Integer> projectObjectIds) {
        // Make sure none of the projects are checked out first.
        String sql = "UPDATE PROJECT SET CHECKOUT_FLAG='N' WHERE PROJ_ID IN (";
        for (int id : projectObjectIds)
            sql = sql + id + ", ";
        sql = sql.substring(0, sql.length() - 2) + ")";
        dbUtils.executeSQL(sql);

        ProjectPortType servicePort = createProjectServicePort();

        try {
            boolean flag = servicePort.deleteProjects(projectObjectIds);
            if (flag)
                utils.log.fine("Projects " + projectObjectIds + " were successfully deleted.");
            else
                utils.log.warning("Projects " + projectObjectIds + " were NOT deleted.");
            return flag;
        } catch (com.primavera.ws.p6.project.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes OBS by provided OBS object id
     * 
     * @param obsObjectId
     *            int identifier for the P6 OBS object to delete.
     * @return boolean true if it was successfully deleted, false if not.
     */
    public boolean deleteOBS(int obsObjectId) {
        List<Integer> singleId = new ArrayList<Integer>();
        singleId.add(obsObjectId);
        return deleteOBS(singleId);
    }

    /**
     * Deletes OBSes by provided OBS object ids
     * 
     * @param obsObjectIds
     *            int identifiers for all the P6 OBS objects to delete.
     * @return boolean true if the OBSes were successfully deleted, false if not.
     */
    public boolean deleteOBS(List<Integer> obsObjectIds) {
        OBSPortType servicePort = createOBSServicePort();

        try {
            boolean flag = servicePort.deleteOBS(obsObjectIds, null);
            if (flag)
                utils.log.fine("OBSes " + obsObjectIds + " were successfully deleted.");
            else
                utils.log.warning("OBSes " + obsObjectIds + " were NOT deleted.");
            return flag;
        } catch (com.primavera.ws.p6.obs.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Creates an instance of the ProjectService.
     * 
     * @return ProjectPortType
     */
    private ProjectPortType createProjectServicePort() {
        URL wsdlURL = wsUtils.createURL(PROJECT_SERVICE);
        ProjectService service = new ProjectService(wsdlURL);
        ProjectPortType servicePort = service.getProjectPort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the OBSService.
     * 
     * @return OBSPortType
     */
    private OBSPortType createOBSServicePort() {
        URL wsdlURL = wsUtils.createURL(OBS_SERVICE);
        OBSService service = new OBSService(wsdlURL);
        OBSPortType servicePort = service.getOBSPort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the UserOBSService.
     * 
     * @return UserOBSPortType
     */
    private UserOBSPortType createUserOBSServicePort() {
        URL wsdlURL = wsUtils.createURL(USER_OBS_SERVICE);
        UserOBSService service = new UserOBSService(wsdlURL);
        UserOBSPortType servicePort = service.getUserOBSPort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }
    
    /**
     * Creates a project in P6 with status reviewer; returns P6 Project object.
     * 
     * @param epsObjectId
     *            int identifier for parent EPS object.
     * @param projectId
     *            String to use as new ProjectId.
     * @return Project object from P6.
     */
    public Project createProjectWithStatusReviewer(int epsObjectId, String projectId, String projStatus) {
        // Create project with required fields
        Project proj = new Project();

        // These are the defaults used for creating a project when nothing else
        // is specified.
        proj.setParentEPSObjectId(Integer.valueOf(epsObjectId));
        proj.setId(projectId);
        proj.setName(projectId);
        proj.setStatus(projStatus);
        
        //Additional settings related to review while creating a project
        proj.setAllowStatusReview(true);
        proj.setActivityDefaultReviewRequired(true);
        Users user = new Users();
        String userName= DatabaseUtils.appProperties.getP6AdminUser();
        JAXBElement<Integer> reviewerObjId = wsUtils.getJAXBInteger(user.readUser(userName).getObjectId(), "ProjectService", "StatusReviewerObjectId");
        proj.setStatusReviewerObjectId(reviewerObjId);
        proj.setStatusReviewerName(userName);
        
        // Default to allowing team members to edit/edit/delete steps and showing both assignment types.
        proj.setTeamMemberStepsAddDeletable(true);
        proj.setTeamMemberAssignmentOption("TMAO_RESASSN_AND_ACTOWNR");
        
        //Additional settings related to resources
        proj.setTeamMemberIncludePrimaryResources(true);
        proj.setTeamMemberCanStatusOtherResources(true);
        proj.setTeamMemberAddNewActualUnits(true);

        // Create the project.
        return createProject(proj);
    }
    
    /**
     * Creates a project in P6 having different project Id and Name with status reviewer; returns P6 Project object.
     * 
     * @param epsObjectId
     *            int identifier for parent EPS object.
     * @param projectId
     *            String to use as new ProjectId.
     * @return Project object from P6.
     */
    public Project createProjectWithStatusReviewerAndDiffProjIdName(int epsObjectId, String projectId, String projStatus) {
        // Create project with required fields
        Project proj = new Project();

        // These are the defaults used for creating a project when nothing else
        // is specified.
        proj.setParentEPSObjectId(Integer.valueOf(epsObjectId));
        proj.setId(projectId+"Id");
        proj.setName(projectId+"Name");
        proj.setStatus(projStatus);
        
        //Additional settings related to review while creating a project
        proj.setAllowStatusReview(true);
        proj.setActivityDefaultReviewRequired(true);
        Users user = new Users();
        String userName= DatabaseUtils.appProperties.getP6AdminUser();
        JAXBElement<Integer> reviewerObjId = wsUtils.getJAXBInteger(user.readUser(userName).getObjectId(), "ProjectService", "StatusReviewerObjectId");
        proj.setStatusReviewerObjectId(reviewerObjId);
        proj.setStatusReviewerName(userName);
        
        // Default to allowing team members to edit/edit/delete steps and showing both assignment types.
        proj.setTeamMemberStepsAddDeletable(true);
        proj.setTeamMemberAssignmentOption("TMAO_RESASSN_AND_ACTOWNR");
        
        //Additional settings related to resources
        proj.setTeamMemberIncludePrimaryResources(true);
        proj.setTeamMemberCanStatusOtherResources(true);
        proj.setTeamMemberAddNewActualUnits(true);

        // Create the project.
        return createProject(proj);
    }
    
    
}