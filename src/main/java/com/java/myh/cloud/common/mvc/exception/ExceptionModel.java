package com.java.myh.cloud.common.mvc.exception;

import java.io.Serializable;
import java.util.Map;

/**
 * 异常返回的dto
 *
 * @author the author
 */
public class ExceptionModel implements Serializable {
    private static final long serialVersionUID = -8486810059752851569L;
    private Map<String, Object> base;
    private String errorCode;
    private String url;
    private String title;
    private String text;
    private String description;
    private Integer status;
    private Exception exception;

    public ExceptionModel() {
    }

    public ExceptionModel(String url, String title, String text, String errorCode, Integer status, Exception exception) {
        this.url = url;
        this.errorCode = errorCode;
        this.text = text;
        this.title = title;
        this.status = status;
        this.exception = exception;
        this.description = "请记录下错误编码,并且联系网站管理员解决此问题";
    }


    public Map<String, Object> getBase() {
        return base;
    }

    public void setBase(Map<String, Object> base) {
        this.base = base;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Exception getException() {
        return exception;
    }

    public void setException(Exception exception) {
        this.exception = exception;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
}
