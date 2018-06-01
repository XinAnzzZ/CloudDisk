package com.java.myh.cloud.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.common.base.Objects;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author the author
 */
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "javassistLazyInitializer", "revisionEntity", "handler"}, ignoreUnknown = true)
@MappedSuperclass
public abstract class AbstractIdEntity implements Serializable {

    private static final long serialVersionUID = -546679417552860481L;

    protected Long id;

    public AbstractIdEntity() {
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AbstractIdEntity)) {
            return false;
        }
        AbstractIdEntity idEntity = (AbstractIdEntity) o;
        return Objects.equal(id, idEntity.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
