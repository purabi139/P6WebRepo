package com.oracle.pgbu.common.support;

import java.io.StringReader;
import java.io.StringWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;

import javax.xml.bind.JAXBElement;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.namespace.QName;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import javax.xml.ws.BindingProvider;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.interceptor.LoggingInInterceptor;
import org.apache.cxf.interceptor.LoggingOutInterceptor;

//import com.primavera.tm.support.Utilities;

/**
 * The Web Service Utilities provides shortcuts for things like formatting XML responses, adding session cookies to web service message headers, etc.
 */
public class WebServiceUtils {
    /**
     * Web Service connection info: username
     */
    public String username = null;

    /**
     * Web Service connection info: password
     */
    public String password = null;

    /**
     * Web Service connection info: url
     */
    private String url = null;

    /**
     * Cookie information is added to every request for authentication.
     */
    public List<String> m_cookieHeaders = null;

    // Utilities class for handy shortcuts.
    private final Utilities m_utils;

    /**
     * Utilizing the singleton pattern, to avoid file/logger write overlaps.
     */
    private static WebServiceUtils instance = null;

    /**
     * The Web Service Utilities provides shortcuts for things like formatting XML responses, adding session cookies to web service message headers, etc.
     */
    protected WebServiceUtils() {
        // Init the helper utilities.
        m_utils = Utilities.getInstance();

        // Set the connection info for the Web Services.
        username = DatabaseUtils.appProperties.getP6WebServiceUser();
        password = DatabaseUtils.appProperties.getP6WebServicePassword();
        url = DatabaseUtils.appProperties.getP6WebServiceUrl();
    }

    /**
     * For getting an instance of this WebServiceUtils class.
     * 
     * @return WebServiceUtils instance
     */
    public static WebServiceUtils getInstance() {
        if (instance == null) {
            instance = new WebServiceUtils();
        }
        return instance;
    }

    /**
     * Creates a URL object from the specified service String.
     * 
     * @param service
     *            String representing the service needed.
     * @return URL object for the service.
     */
    public URL createURL(String service) {
        URL wsdlURL = null;
        try {
            wsdlURL = new URL(url + service);
        } catch (MalformedURLException e) {
            m_utils.log.severe(e.getMessage());
        }
        return wsdlURL;
    }

    /**
     * If the log level is INFO or finer, this will add handlers to print the web service requests and responses.
     * 
     * @param client
     *            Client object to attach to.
     */
    public void addMessageInterceptors(Client client) {
        // Log the request/response messages if our log level is set to FINE or
        // lower.
        if (m_utils.log.getLevel().intValue() <= Level.FINE.intValue()) {
            client.getEndpoint().getOutInterceptors().add(new FormattedOutInterceptor());
            client.getEndpoint().getInInterceptors().add(new FormattedInInterceptor());
        }
    }

    /**
     * Overriding the transform message on the logging interceptor, in order to make a more easily readable, indented XML message appear in the logging.
     */
    private class FormattedOutInterceptor extends LoggingOutInterceptor {
        /**
         * Takes in the XML as a string and formats it.
         * 
         * @param inputXML
         *            String of XML to format.
         * @return String of formatted XML.
         */
        @Override
        public String transform(String inputXML) {
            return formatXML(inputXML);
        }
    }

    /**
     * Extending the logging interceptor to add our own formatting for readability.
     */
    private class FormattedInInterceptor extends LoggingInInterceptor {
        /**
         * Takes in the XML as a string and formats it.
         * 
         * @param inputXML
         *            String of XML to format.
         * @return String of formatted XML.
         */
        @Override
        public String transform(String inputXML) {
            return formatXML(inputXML);
        }
    }

    /**
     * Formats the specified XML by doing new lines and indenting for each XML node.
     * 
     * @param inputXML
     *            String of raw XML to format.
     * @return String of human-readable formatted XML.
     */
    private String formatXML(String inputXML) {
        try {
            // Pull out the message payload
            String payload = inputXML.substring(inputXML.toLowerCase().indexOf("<soap"), inputXML.toLowerCase().lastIndexOf(">") + 1);
            Source xmlInput = new StreamSource(new StringReader(payload));
            StreamResult xmlOutput = new StreamResult(new StringWriter());

            // Configure transformer, indent new tags by 2 spaces.
            Transformer transformer;
            transformer = TransformerFactory.newInstance().newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");

            // Transform the payload.
            transformer.transform(xmlInput, xmlOutput);

            // Return the original message, with the formatted payload replacing
            // the original.
            return (inputXML.replace(payload, xmlOutput.getWriter().toString()));
        } catch (Exception e) {
            // Could not format the string, just returning the original.
            m_utils.log.severe(e.getMessage());
            return inputXML;
        }
    }

    /**
     * Method for adding the session cookie to the headers to be sent to the specified web service.
     * 
     * @param servicePort
     *            service to add the session headers and cookie to.
     */
    public void addCookieToHeader(BindingProvider servicePort) {
        // Associate our user's cookie with the request
        @SuppressWarnings("unchecked")
        Map<String, List<String>> headers = (Map<String, List<String>>) servicePort.getRequestContext().get("javax.xml.ws.http.request.headers");
        if (headers == null) {
            headers = new HashMap<String, List<String>>();
            servicePort.getRequestContext().put("javax.xml.ws.http.request.headers", headers);
        }
        headers.put("cookie", m_cookieHeaders);
    }

    /**
     * Creates a JAXBElement of XMLGregorianCalendar based on the simple date and field you pass.
     * 
     * @param date
     *            You can pass in any date string that the (deprecated) Date.parse can handle.
     * @param fieldName
     *            Specify the name of the field you want to create. The names can be found in the P6WS WSDL. Example: http://slc00vqh.us.oracle .com:7001/p6ws/services/ActivityService?wsdl
     * @return JAXBElement date or null if it fails.
     */
    @SuppressWarnings("deprecation")
    public JAXBElement<XMLGregorianCalendar> getJAXBDate(String date, String fieldName) {
        return getJAXBDate(new Date(date), fieldName);
    }

    /**
     * Creates a JAXBElement of XMLGregorianCalendar based on the simple date and field you pass.
     * 
     * @param date
     *            Any valid java.util.Date object.
     * @param fieldName
     *            Specify the name of the field you want to create. The names can be found in the P6WS WSDL. Example: http://slc00vqh.us.oracle .com:7001/p6ws/services/ActivityService?wsdl
     * @return JAXBElement date, or null if it fails
     */
    public JAXBElement<XMLGregorianCalendar> getJAXBDate(Date date, String fieldName) {
        // JAXBElements need a name, here we're assuming you're dealing with
        // Activities...
        final QName NAME = new QName("http://xmlns.oracle.com/Primavera/P6/WS/Activity/V1", fieldName);

        // Initialize a "normal" calendar to start with, set the date using the
        // passed in Date object.
        //GregorianCalendar normalCalendar = (GregorianCalendar) Calendar.getInstance(java.util.Locale);
        GregorianCalendar normalCalendar = (GregorianCalendar) Calendar.getInstance();
        normalCalendar.setTime(date);

        // Create the special XMLGregorianCalendar from the normal calendar via
        // a new instance of the DatatypeFactory
        XMLGregorianCalendar xmlCalendar = null;
        try {
            xmlCalendar = DatatypeFactory.newInstance().newXMLGregorianCalendar(normalCalendar);
        } catch (DatatypeConfigurationException e) {
            // Catch display the error and return null, so the caller fails...
            //m_utils.log.severe(e.getMessage());
            return null;
        }

        // Return a new JAXBElement using the special calendar.
        return new JAXBElement<XMLGregorianCalendar>(NAME, XMLGregorianCalendar.class, xmlCalendar);
    }

    /**
     * Creates a JAXBElement of Integer based on the simple double and field you pass.
     * 
     * @param value
     *            Any valid Integer value.
     * @param namespace
     *            Name of the service to be used.
     * @param fieldName
     *            Specify the name of the field you want to create. The names can be found in the P6WS WSDL. Example: http://slc00vqh.us.oracle .com:7001/p6ws/services/ActivityService?wsdl
     * @return JAXBElement Integer.
     */
    public JAXBElement<Integer> getJAXBInteger(int value, String namespace, String fieldName) {
        // Create a namespace string
        String targetNamespace = "http://xmlns.oracle.com/Primavera/P6/WS/" + namespace + "/V1";
        final QName NAME = new QName(targetNamespace, fieldName);

        // Return a new JAXBElement using the value you passed.
        return new JAXBElement<Integer>(NAME, Integer.class, value);
    }

    /**
     * Creates a JAXBElement of Double based on the simple double and field you pass.
     * 
     * @param value
     *            Any valid Double value.
     * @param fieldName
     *            Specify the name of the field you want to create. The names can be found in the P6WS WSDL. Example: http://slc00vqh.us.oracle .com:7001/p6ws/services/ActivityService?wsdl
     * @return JAXBElement Double.
     */
    public JAXBElement<Double> getJAXBDouble(Double value, String fieldName) {
        // JAXBElements need a name, here we're assuming you're dealing with
        // Activities...
        final QName NAME = new QName("http://xmlns.oracle.com/Primavera/P6/WS/Activity/V1", fieldName);

        // Return a new JAXBElement using the value you passed.
        return new JAXBElement<Double>(NAME, Double.class, value);
    }
}