package com.oracle.pgbu.common.support;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.oracle.pgbu.common.utils.ApplicationProperties;
import com.oracle.pgbu.p615v2.*;

/**
 * Database utilities for connection handling, and executing SQL statements.
 */
public class DatabaseUtils {
    // Database connection.
    private Connection m_connection = null;
    public static ApplicationProperties appProperties = P615v2.getInstance();
    // For getting config info.
    private final Utilities m_utils;

    // The singleton
    private static DatabaseUtils m_instance;

    /**
     * Default constructor for the DatabaseUtils, creates a connection to the database and gets it's own instance of the Utilities class.
     */
    protected DatabaseUtils() {
        // Get an instance of the utils for logging and config file reading.
        m_utils = Utilities.getInstance();
    }

    /**
     * Executes the given SQL statement and returns any results in a ResultSet. Be very careful when doing insert, update, or delete statements.
     * 
     * @param sql
     *            String for the SQL statement to execute. Example: "select * from usession"
     * @return ResultSet from the statement.
     */
    public ResultSet executeSQL(String sql) {
        // Connect if necessary.
        if (isClosed())
            connect();

        // Try to create a statement using our connection.
        Statement statement = null;
        try {
            statement = m_connection.createStatement();
        } catch (SQLException e) {
            m_utils.log.severe("Could not create statement.");
            m_utils.log.severe(e.getMessage());
        }

        // Try to execute our SQL statement.
        boolean resultType = false;
        try {
            resultType = statement.execute(sql);
        } catch (SQLException e) {
            m_utils.log.severe("Could not execute SQL.");
            m_utils.log.severe(e.getMessage());
        }

        // Grab and return the result set.
        ResultSet results = null;
        if (resultType) {
            try {
                results = statement.getResultSet();
            } catch (SQLException e) {
                m_utils.log.severe("Could not retrieve a result set. Reason:\n" + e.getMessage());
            }
        }
        return results;
    }

    /**
     * For getting an instance of this DatabaseUtils class.
     * 
     * @return DatabaseUtils instance
     */
    public static DatabaseUtils getInstance() {
        if (m_instance == null) {
            m_instance = new DatabaseUtils();
        }
        return m_instance;
    }

    /**
     * Open a database connection, uses information from application.properties. Automatically called in the constructor.
     */
    public void connect() {
        Connection connection = null;
        try {
        	
        	String serverName = appProperties.getDatabaseHost();
            String portNumber = appProperties.getDatabasePort();
            String service = appProperties.getDatabaseInstance();
            String username = appProperties.getDatabaseUsername();
            String password = appProperties.getDatabasePassword();
            String databaseName = appProperties.getDatabaseName().toLowerCase();
            String url;
            
            switch (databaseName) {
            case "oracle":
            	// Try to load the JDBC driver
            	String driverName = "oracle.jdbc.driver.OracleDriver";
            	Class.forName(driverName);
            	url = "jdbc:oracle:thin:@//" + serverName + ":" + portNumber + "/" + service;
            	// Connect.
            	connection = DriverManager.getConnection(url, username, password);
            	break;
            case "mssqlserver":
            	url = "jdbc:sqlserver://" + serverName + "; databaseName="+service+"; user="+username+"; password="+password+";";
            	// Connect.
            	connection = DriverManager.getConnection(url);
            	break;
            }
            
        } catch (ClassNotFoundException e) {
            m_utils.log.severe("Could not find the database driver.");
            m_utils.log.severe(e.getMessage());
        } catch (SQLException e) {
            m_utils.log.severe("Could not connect to the database");
            m_utils.log.severe(e.getMessage());
        }

        // Try to set the connection properties to auto-commit.
        try {
            connection.setAutoCommit(true);
        } catch (SQLException e) {
            m_utils.log.severe("Unable to set connection properties.");
            m_utils.log.severe(e.getMessage());
        }

        // Specify the member variable.
        m_connection = connection;
    }

    /**
     * Close the database connection.
     */
    public void disconnect() {
        // Try to close our connection.
        try {
            m_connection.close();
        } catch (SQLException e) {
            m_utils.log.severe("Unable to close the connection.");
            m_utils.log.severe(e.getMessage());
        }
    }

    /**
     * Determines if the Database connection is closed.
     * 
     * @return boolean true if closed, false if not.
     */
    public boolean isClosed() {
        // Determines whether the database is connected or not.
        try {
            return m_connection.isClosed();
        } catch (Exception e) {
            return true;
        }
    }
}
