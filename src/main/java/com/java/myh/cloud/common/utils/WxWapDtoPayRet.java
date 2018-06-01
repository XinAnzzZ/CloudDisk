package com.java.myh.cloud.common.utils;

import java.util.Map;

public class WxWapDtoPayRet {
    private int return_code;
    private String return_msg;
    private Map payParam;
    private String orderId;

    public int getReturn_code() {
        return return_code;
    }

    public void setReturn_code(int return_code) {
        this.return_code = return_code;
    }

    public String getReturn_msg() {
        return return_msg;
    }

    public void setReturn_msg(String return_msg) {
        this.return_msg = return_msg;
    }

    public Map getPayParam() {
        return payParam;
    }

    public void setPayParam(Map payParam) {
        this.payParam = payParam;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }


    @Override
    public String toString() {
        return "WxWapDtoPayRet{" +
                "return_code=" + return_code +
                ", return_msg=" + return_msg +
                ", payParam=" + payParam +
                ", orderId=" + orderId +
                '}';
    }
}
