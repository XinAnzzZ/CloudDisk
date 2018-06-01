package com.java.myh.cloud.common.utils;

/**
 * 定义返回成功与否的标志
 *
 * @author author
 */
public class Result {

    private boolean success;
    private String msg;
    private Object data;


    public Result() {
    }

    public Result(boolean success, String msg) {
        this.success = success;
        this.msg = msg;
    }

    public static Result ok() {
        Result result = new Result();
        result.setSuccess(true);
        result.setMsg("成功");
        return result;
    }

    public static Result ok(String msg) {
        Result result = new Result();
        result.setSuccess(true);
        result.setMsg(msg);
        return result;
    }

    public static Result ok(Object obj) {
        Result result = new Result();
        result.setSuccess(true);
        result.setData(obj);
        return result;
    }

    public static Result fail() {
        Result result = new Result();
        result.setSuccess(false);
        result.setMsg("失败");
        return result;
    }

    public static Result fail(String msg) {
        Result result = new Result();
        result.setSuccess(false);
        result.setMsg(msg);
        return result;
    }

    public boolean isSuccess() {
        return success;
    }

    public boolean getSuccess() {

        return this.success;
    }

    public Result setSuccess(boolean success) {
        this.success = success;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public Result setMsg(String msg) {
        this.msg = msg;
        return this;
    }

    public Object getData() {
        return data;
    }

    public Result setData(Object data) {
        this.data = data;
        return this;
    }
}
