package com.java.myh.cloud.core.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author 心安 QWQ
 */
@Entity
@Table(name = "roles")
@DynamicInsert()
@DynamicUpdate()
public class Roles extends AbstractIdEntity implements Serializable {
    private static final long serialVersionUID = -4186045823106040898L;
    private String name;
    private String remark;
    private Date createDate;
    private List<Permissions> permissionsList;

    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinTable(name = "roles_permissions",
            joinColumns = {@JoinColumn(name = "roles_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "permissions_id", referencedColumnName = "id")})
    public List<Permissions> getPermissionsList() {
        return permissionsList;
    }

    public void setPermissionsList(List<Permissions> permissionsList) {
        this.permissionsList = permissionsList;
    }


    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Column(name = "remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


    @Column(name = "create_date")
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    @Override
    public boolean equals(Object o) {
        return super.equals(o);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public String toString() {
        return "Roles{" +
                "name='" + name + '\'' +
                ", remark='" + remark + '\'' +
                ", createDate=" + createDate +
                ", permissionsList=" + permissionsList +
                '}';
    }
}
