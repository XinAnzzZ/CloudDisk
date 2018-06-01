package com.java.myh.cloud.common.mvc.dto;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import java.io.Serializable;

/**
 * 基础dto类
 *
 * @author the author
 */
public abstract class BaseDto implements Serializable {
    private static final long serialVersionUID = 7600855425716392509L;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this);
    }
}
