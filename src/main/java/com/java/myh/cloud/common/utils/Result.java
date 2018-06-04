package com.java.myh.cloud.common.utils;

/**
 * 定义返回成功与否的标志
 *
 * @author author
 */
public class Result {

    private boolean success;
    private String message;
    private Object data;


    public Result() {
    }

    public Result(boolean success, String msg) {
        this.success = success;
        this.message = msg;
    }

    public static Result ok() {
        Result result = new Result();
        result.setSuccess(true);
        result.setMessage("成功");
        return result;
    }

    public static Result ok(String msg) {
        Result result = new Result();
        result.setSuccess(true);
        result.setMessage(msg);
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
        result.setMessage("失败");
        return result;
    }

    public static Result fail(String msg) {
        Result result = new Result();
        result.setSuccess(false);
        result.setMessage(msg);
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

    public String getMessage() {
        return message;
    }

    public Result setMessage(String msg) {
        this.message = msg;
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
