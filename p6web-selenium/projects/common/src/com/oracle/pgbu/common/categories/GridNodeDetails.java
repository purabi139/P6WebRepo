/**
 * Class to get the details of the node running on Selenium Grid
 * 
 */

package com.oracle.pgbu.common.categories;
import org.json.JSONObject;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.WebDriver;

import java.io.*;
import java.net.URL;

import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHttpEntityEnclosingRequest;


public class GridNodeDetails {
       
         public static JSONObject extractObject(HttpResponse resp) throws Exception {
                  BufferedReader rd = new BufferedReader(new InputStreamReader(resp.getEntity().getContent()));
                  StringBuilder s = new StringBuilder();
                  String line;
                  while ((line = rd.readLine()) != null) {
                    s.append(line);
                  }
                  rd.close();
                  return new JSONObject(s.toString());
                }


     public static String getGridNode(String hubHost, String hubPort, WebDriver driver)
     {
    	 String myNode = "";
    	 try{
                URL url = new URL("http://"+hubHost+":"+hubPort+"/grid/api/testsession?session="+((RemoteWebDriver)driver).getSessionId().toString());
             BasicHttpEntityEnclosingRequest request = new BasicHttpEntityEnclosingRequest("POST", url.toExternalForm());
          DefaultHttpClient client = new DefaultHttpClient();
          HttpHost host = new HttpHost(url.getHost(), url.getPort());
          HttpResponse response = client.execute(host, request);
          JSONObject object = extractObject(response);
          URL nodeUrl = new URL(object.getString("proxyId"));
          myNode = nodeUrl.getHost();
          
    	 }catch(Exception e){
    		 
    	 }
    	 return myNode;
     }
}
