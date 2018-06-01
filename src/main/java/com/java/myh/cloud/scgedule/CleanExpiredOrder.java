package com.java.myh.cloud.scgedule;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * @author 心安 QWQ
 */
@Component("cleanExpiredOrder")
@SuppressWarnings("unused")
public class CleanExpiredOrder {
    private static Logger log = LoggerFactory.getLogger(CleanExpiredOrder.class);

    public void cleanExpiredOrderMethod() {
    }
}
