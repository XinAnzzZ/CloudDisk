package com.java.myh.cloud.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.java.myh.cloud.core.entity.enumeration.AbstractStatusEntity;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author 心安 QWQ
 */
@Entity
@Table(name = "user")
@DynamicInsert
@DynamicUpdate
public class User extends AbstractStatusEntity implements Serializable {
    private static final long serialVersionUID = -6167430238294568174L;
    private String username;
    @JsonIgnore
    private String password;
    private Date createDate;
    private String email;
    private String availableCapacity;
    private String totalCapacity;
    private String usedCapacity;

    @JsonIgnore
    private UserType userType;

    @Column(name = "username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "total_capacity")
    public String getTotalCapacity() {
        return totalCapacity;
    }

    public void setTotalCapacity(String totalCapacity) {
        this.totalCapacity = totalCapacity;
    }

    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "create_date")
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    @Basic
    @Column(name = "available_capacity")
    public String getAvailableCapacity() {
        return availableCapacity;
    }

    public void setAvailableCapacity(String availableCapacity) {
        this.availableCapacity = availableCapacity;
    }

    @Column(name = "used_capacity")
    public String getUsedCapacity() {
        return usedCapacity;
    }

    public void setUsedCapacity(String usedCapacity) {
        this.usedCapacity = usedCapacity;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type")
    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", createDate=" + createDate +
                ", email='" + email + '\'' +
                ", availableCapacity='" + availableCapacity + '\'' +
                ", totalCapacity='" + totalCapacity + '\'' +
                ", usedCapacity='" + usedCapacity + '\'' +
                ", userType=" + userType +
                '}';
    }

    public enum UserType {
        /**
         * 角色
         */
        USER, ADMIN
    }
}
