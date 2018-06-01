package com.java.myh.cloud.common.utils;

public class RomeReturnUtlis {
    private boolean success;
    private String msg;


    public RomeReturnUtlis(boolean success, String msg) {
        this.success = success;
        this.msg = msg;
    }

    public RomeReturnUtlis() {
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
