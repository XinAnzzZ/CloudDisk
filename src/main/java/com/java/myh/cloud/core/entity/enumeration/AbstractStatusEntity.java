package com.java.myh.cloud.core.entity.enumeration;

import com.google.common.base.Objects;
import com.java.myh.cloud.common.data.MetaData;
import com.java.myh.cloud.common.data.OrdinalEnum;
import com.java.myh.cloud.core.entity.base.BaseNativeEntityAbstract;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.MappedSuperclass;

/**
 * @author 心安 QWQ
 */
@MappedSuperclass
public abstract class AbstractStatusEntity extends BaseNativeEntityAbstract {

    private static final long serialVersionUID = 7439902507292153899L;
    protected Status status = Status.Normal;

    public AbstractStatusEntity() {
    }

    @SuppressWarnings("unused")
    public AbstractStatusEntity(Integer id) {
        super.setId(id);
    }

    @Column(name = "status", nullable = false)
    @Enumerated(value = EnumType.STRING)
    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AbstractStatusEntity)) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        AbstractStatusEntity that = (AbstractStatusEntity) o;
        return Objects.equal(status, that.status);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(super.hashCode(), status);
    }

    public enum Status implements OrdinalEnum {
        /**
         * 状态
         */
        @MetaData("正常")
        Normal {
            @Override
            public String getName() {
                return "正常";
            }
        },
        @MetaData("禁止")
        Disabled {
            @Override
            public String getName() {
                return "禁止";
            }
        }

    }
}
