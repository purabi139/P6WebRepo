package com.oracle.pgbu.common.support;

import java.net.URL;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.xml.ws.BindingProvider;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;

import com.primavera.ws.p6.user.User;
import com.primavera.ws.p6.user.UserFieldType;
import com.primavera.ws.p6.user.UserPortType;
import com.primavera.ws.p6.user.UserService;
import com.primavera.ws.p6.userlicense.UserLicense;
import com.primavera.ws.p6.userlicense.UserLicensePortType;
import com.primavera.ws.p6.userlicense.UserLicenseService;
//import org.apache.cxf.endpoint.Client;
//import org.apache.cxf.frontend.ClientProxy;
//import com.primavera.tm.support.Utilities;

/**
 * For data manipulation of P6 User objects.
 */
public class Users {
    // WSDLs needed for manipulation of User data.
    private static final String USER_SERVICE = "/services/UserService?wsdl";
    private static final String USER_LICENSE_SERVICE = "/services/UserLicenseService?wsdl";

    // Web Service utilities.
    private final Utilities utils;
    private final WebServiceUtils wsUtils;
    private final DatabaseUtils dbUtils;

    /**
     * Returns an instance of the Users class, for handling Users data setup.
     */
    public Users() {
        // Initialize the other utility classes needed.
        utils = Utilities.getInstance();
        wsUtils = WebServiceUtils.getInstance();
        dbUtils = DatabaseUtils.getInstance();

        // Initialize the cleanup lists.
        userCleanup = new ArrayList<Integer>();
        filterCleanup = new ArrayList<Integer>();
    }

    /**
     * For storing User object IDs for cleanup.
     */
    public List<Integer> userCleanup;

    /**
     * For storing User Filter object IDs for cleanup.
     */
    public List<Integer> filterCleanup;

    /**
     * Creates user and returns user object.
     * 
     * @param username
     *            String username to create.
     * @param password
     *            String password to assign to the user.
     * @return User object from P6.
     */
    public User createUser(String username, String password) {
        UserPortType servicePort = createUserServicePort();
        List<User> users = new ArrayList<User>();

        // Create user with required fields
        User newUser = new User();
        newUser.setName(username);
        users.add(newUser);

        try {
            // Save the ID for cleanup later.
            int objId = servicePort.createUsers(users).get(0);
            userCleanup.add(objId);

            // Calls create password function
            createUserPassword(objId, password);

            // Include the new ID on the User object and return it.
            newUser.setObjectId(objId);
            utils.log.fine("Successfully created user, ObjectId: " + objId);
            return newUser;
        } catch (com.primavera.ws.p6.user.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Provides P6 user with access to different modules, defaults to just the Team Member module.
     * 
     * @param userObjectId
     *            int identifier for the P6 User object.
     * @return boolean true if successfully assigned modules, false if not.
     */
    public boolean createUserLicense(int userObjectId) {
        String[] moduleAccess = { "Team Member Interfaces" , "Timesheet Interfaces"};
        return createUserLicense(userObjectId, moduleAccess);
    }

    /**
     * Provides P6 user with access to the specified modules.
     * 
     * @param userObjectId
     *            int identifier for the P6 User object.
     * @param modules
     *            String array of all the P6 modules to assign to the user.
     * @return boolean true if successfully assigned modules, false if not.
     */
    public boolean createUserLicense(int userObjectId, String[] modules) {
        UserLicensePortType servicePort = createUserLicenseServicePort();

        List<UserLicense> userLicenses = new ArrayList<UserLicense>();

        for (int i = 0; i < modules.length; i++) {
            UserLicense usrLicense = new UserLicense();
            usrLicense.setUserObjectId(userObjectId);
            usrLicense.setLicenseType(modules[i]);
            userLicenses.add(usrLicense);
        }

        try {
            servicePort.createUserLicenses(userLicenses).get(0);
            utils.log.fine("Successfully assigned modules: " + modules.toString() + ", to user " + userObjectId + ".");
            return true;
        } catch (com.primavera.ws.p6.userlicense.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Sets user password.
     * 
     * @param userObjectId
     *            int identifier for the P6 User object.
     * @param password
     *            String for the new password to use.
     * @return boolean true if successfully set, false if not.
     */
    public boolean createUserPassword(int userObjectId, String password) {
        UserPortType servicePort = createUserServicePort();
        try {
            boolean flag = servicePort.setUserPassword(userObjectId, password, password);
            if (flag)
                utils.log.fine("Successfully set the password on user " + userObjectId + ".");
            else
                utils.log.warning("User " + userObjectId + "'s password was not set.");
            return flag;
        } catch (com.primavera.ws.p6.user.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Creates a User Filter object in a limited manner, on a single user, with a single activity code value.
     * 
     * @param userId
     *            int ID for the user to set up the filter for.
     * @param activityCodeTypeId
     *            int ID for the Activity Code type to filter on.
     * @param activityCodeValueId
     *            int ID for the Activity Code value to use.
     * @return boolean true if (probably) successful, false if the next maxId can't be found.
     */
    public boolean createUserFilterCode(int userId, int activityCodeTypeId, int activityCodeValueId) {
        // Build the criteria needed to create a filter on an activity code.
        String criteria = "ActivityCodeTypeId_" + activityCodeTypeId + "=" + activityCodeValueId;

        // Pass this off to the helper method.
        return createUserFilter(userId, criteria);
    }

    /**
     * Creates a User Filter object based on the given resource.
     * 
     * @param userId
     *            int ID for the user to set up the filter for.
     * @param resourceId
     *            int ID for the resource to filter on.
     * @return boolean true if (probably) successful, false if the next maxId can't be found.
     */
    public boolean createUserFilterResource(int userId, int resourceId) {
        // Build the criteria needed to create a filter on a Resource.
        String criteria = "PrimaryResourceId=" + resourceId;

        // Pass this off to the helper method.
        return createUserFilter(userId, criteria);
    }

    /**
     * Creates a User Filter object based on the given role.
     * 
     * @param userId
     *            int ID for the user to set up the filter for.
     * @param roleId
     *            int ID for the role to filter on.
     * @return boolean true if (probably) successful, false if the next maxId can't be found.
     */
    public boolean createUserFilterRole(int userId, int roleId) {
        // Build the criteria needed to create a filter on a Role.
        String criteria = "RoleId=" + roleId;

        // Pass this off to the helper method.
        return createUserFilter(userId, criteria);
    }

    /**
     * Internal-only method for performing the actual SQL that creates a User Filter.
     * 
     * @param userId
     *            int ID for the user to create the filter on.
     * @param criteria
     *            String representing the field and value for the filter to use.
     */
    private boolean createUserFilter(int userId, String criteria) {
        // This is rather unclean, but without BO access, getting proper object IDs is difficult.
        ResultSet results = dbUtils.executeSQL("select max(view_pref_id) from viewpref");
        int maxId = 0;
        try {
            while (results.next()) {
                maxId = results.getInt(1) + 5;
            }
        } catch (SQLException e) {
            utils.log.severe("Unable to get new filter ID. Reason:\n" + e.getMessage());
            return false;
        }

        // Build the various SQL needed to create a filter, set the criteria, and link it with the user.
        //TODO
        String filterPart1 = "insert into viewpref (view_pref_id, view_pref_name, view_pref_type) values (" + maxId + ", 'tm-filter-" + "test"
                + "', 'VT_TMUSER_FILTER')";
        //		String filterPart1 = "insert into viewpref (view_pref_id, view_pref_name, view_pref_type) values (" + maxId + ", 'tm-filter-" + utils.randomChars(5) + "', 'VT_TMUSER_FILTER')";
        String filterPart2 = "insert into vwprefdata (view_pref_id, view_pref_key, view_pref_value) values (" + maxId + ", 'VT_FILTER.FilterCriteria', '" + criteria
                + "')";
        String filterPart3 = "insert into vwprefdata (view_pref_id, view_pref_key, view_pref_value) values (" + maxId + ", 'VT_FILTER.ShowInToolbar', 'false')";
        String filterPart4 = "insert into userset (namespace, setting_name, setting_value, user_id) values ('Users', 'TeamMemberActivityFilters', " + maxId + ", "
                + userId + ")";

        // Log the SQL for debugging...
        utils.log.fine("SQL 1 of 4: " + filterPart1);
        utils.log.fine("SQL 2 of 4: " + filterPart2);
        utils.log.fine("SQL 3 of 4: " + filterPart3);
        utils.log.fine("SQL 4 of 4: " + filterPart4);

        // Create the view preference.
        dbUtils.executeSQL(filterPart1);
        filterCleanup.add(maxId);

        // Create the view filter criteria.
        dbUtils.executeSQL(filterPart2);

        // The filter should not display in the list.
        dbUtils.executeSQL(filterPart3);

        // Link the filter to the user.
        dbUtils.executeSQL(filterPart4);
        utils.sleep(1);

        // Sadly, just assume it was all successful.
        return true;
    }

    /**
     * Reads user by user id, returns user object
     * 
     * @param userId
     *            String identifier for the user to read.
     * @return User object from P6.
     */
    public User readUser(String userId) {
        UserPortType servicePort = createUserServicePort();

        // Read all fields.
        List<UserFieldType> fields = new ArrayList<UserFieldType>();
        fields.addAll(Arrays.asList(UserFieldType.values()));

        try {
            User user = servicePort.readUsers(fields, "Name = '" + userId + "'", null).get(0);
            utils.log.fine("Successfully read user " + userId);
            return user;
        } catch (Exception e) {
            utils.log.severe(e.getMessage());
            return null;
        }
    }

    /**
     * Updates user, accepts user object
     * 
     * @param user
     *            User object to update.
     * @return boolean true if update was successful, false if not.
     */
    public boolean updateUser(User user) {
        UserPortType servicePort = createUserServicePort();
        List<User> users = new ArrayList<User>();

        users.add(user);

        try {
            boolean flag = servicePort.updateUsers(users);
            if (flag)
                utils.log.fine("Successfully updated user " + user.getObjectId());
            else
                utils.log.warning("User " + user.getObjectId() + " was NOT updated.");
            return flag;
        } catch (com.primavera.ws.p6.user.IntegrationFault e) {
            utils.log.severe("User " + user.getObjectId() + " was NOT updated.");
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes user by specified user object id
     * 
     * @param userObjectId
     *            int identifier for the User object to deleted.
     * @return boolean true if the user was deleted, false if not.
     */
    public boolean deleteUser(int userObjectId) {
        List<Integer> singleId = new ArrayList<Integer>();
        singleId.add(userObjectId);
        return deleteUsers(singleId);
    }

    /**
     * Deletes users by specified user object ids
     * 
     * @param userObjectIds
     *            int identifiers for all the User objects to delete.
     * @return boolean true if the users were deleted, false if not.
     */
    public boolean deleteUsers(List<Integer> userObjectIds) {
        // Force any P6 sessions to close first.
        String sql = "DELETE FROM USESSION WHERE USER_ID IN (";
        for (int id : userObjectIds)
            sql = sql + id + ", ";
        sql = sql.substring(0, sql.length() - 2) + ")";
        dbUtils.executeSQL(sql);

        UserPortType servicePort = createUserServicePort();

        try {
            boolean flag = servicePort.deleteUsers(userObjectIds);
            if (flag)
                utils.log.fine("Users " + userObjectIds + " were successfully deleted.");
            else
                utils.log.warning("Users " + userObjectIds + " were NOT deleted.");
            return flag;
        } catch (com.primavera.ws.p6.user.IntegrationFault e) {
            utils.log.severe(e.getMessage());
            return false;
        }
    }

    /**
     * Deletes user filters by specified preference object ids
     * 
     * @param filterObjectIds
     *            int identifiers for all the User Filter objects to delete.
     * @return boolean true, always, sadly.
     */
    public boolean deleteUserFilters(List<Integer> filterObjectIds) {
        for (int id : filterObjectIds) {
            // Unlink the filter from the user.
            String sql = "delete from userset where setting_name = 'TeamMemberActivityFilters' and setting_value = '" + id + "'";
            utils.log.fine(sql); // For debugging.
            dbUtils.executeSQL(sql);

            // Delete the view preference data
            sql = "delete from vwprefdata where view_pref_id = " + id;
            utils.log.fine(sql); // For debugging.
            dbUtils.executeSQL(sql);

            // Delete the view preference
            sql = "delete from viewpref where view_pref_id = " + id;
            utils.log.fine(sql); // For debugging.
            dbUtils.executeSQL(sql);
        }

        // No real validation, just return true.
        return true;
    }

    /**
     * Creates an instance of the UserLicenseService.
     * 
     * @return UserLicensePortType
     */
    private UserLicensePortType createUserLicenseServicePort() {
        URL wsdlURL = wsUtils.createURL(USER_LICENSE_SERVICE);
        UserLicenseService service = new UserLicenseService(wsdlURL);
        UserLicensePortType servicePort = service.getUserLicensePort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }

    /**
     * Creates an instance of the UserService.
     * 
     * @return UserPortType
     */
    private UserPortType createUserServicePort() {
        URL wsdlURL = wsUtils.createURL(USER_SERVICE);
        UserService service = new UserService(wsdlURL);
        UserPortType servicePort = service.getUserPort();
        Client client = ClientProxy.getClient(servicePort);
        wsUtils.addMessageInterceptors(client);
        wsUtils.addCookieToHeader((BindingProvider) servicePort);

        return servicePort;
    }
}
