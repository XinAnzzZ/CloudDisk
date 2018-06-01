package com.java.myh.cloud.core.entity.base;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.java.myh.cloud.common.data.AbstractPersistableEntity;

import javax.persistence.MappedSuperclass;
import java.io.Serializable;

/**
 * @author 心安 QWQ
 */
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "javassistLazyInitializer", "revisionEntity", "handler"}, ignoreUnknown = true)
@MappedSuperclass
abstract class BaseEntityAbstract<ID extends Serializable> extends AbstractPersistableEntity<ID> implements Serializable {
    private static final long serialVersionUID = -3955995788404980021L;
}
