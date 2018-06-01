package com.java.myh.cloud.core.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author 心安 QWQ
 */
@Entity
@Table(name = "roles_permissions")
@DynamicInsert()
@DynamicUpdate()
public class RolesPermissions extends AbstractIdEntity implements Serializable {
    private static final long serialVersionUID = 4434189840862369645L;
    private Long rolesId;
    private Long permissionsId;


    @Column(name = "roles_id")
    public Long getRolesId() {
        return rolesId;
    }

    public void setRolesId(Long rolesId) {
        this.rolesId = rolesId;
    }


    @Column(name = "permissions_id")
    public Long getPermissionsId() {
        return permissionsId;
    }

    public void setPermissionsId(Long permissionsId) {
        this.permissionsId = permissionsId;
    }


    @Override
    public String toString() {
        return "RolesPermissions{" +
                "rolesId=" + rolesId +
                ", permissionsId=" + permissionsId +
                '}';
    }
}
