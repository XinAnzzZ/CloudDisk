package com.java.myh.cloud.common.scgedule;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * 获取数据库未通知商户的订单信息 开始发送通知  每隔五分钟进行一次
 */
@Component("scheduleProcess")
public class SchedulePreocess {
    private static Logger log = LoggerFactory.getLogger(SchedulePreocess.class);

    public void callBackUrlToRomeService() {
        log.info("callBackUrlToRomeServie Task Start");
        log.info("callBackUrlToRomeServie Task end");
    }
}
