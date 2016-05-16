package com.oracle.pgbu.common.support;

import java.util.logging.Filter;
import java.util.logging.LogRecord;

/**
 * Small helper class that implements the logging Filter interface, in order to remove messages from the test log we do not need or want to see.
 */
public class TestLogFilter implements Filter {
    /**
     * String array of items to filter out from the log output. To add more, place a comma after the last item and add your new String.
     */
    public String[] filters = { "WARNING:webdriver_session.cc(1368)" };

    /**
     * This method is called automatically when the Logger attempts to write a message. If the message contains the item we want to filter out, it gets dropped.
     */
    public boolean isLoggable(LogRecord record) {
        String msg = record.getMessage();

        for (String drop : filters) {
            if (msg.contains(drop))
                return false;
        }
        return true;
    }
}
