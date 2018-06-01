package com.java.myh.cloud.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.java.myh.cloud.core.entity.base.BaseNativeEntityAbstract;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author 心安 QWQ
 */
@Entity
@Table(name = "login_log")
@DynamicUpdate
@DynamicInsert
public class LoginLog extends BaseNativeEntityAbstract implements Serializable {
    private static final long serialVersionUID = 1584519156590322756L;
    @JsonIgnore
    private User user;
    private String ip;
    private Date loginDate;
    private String loginLocation;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Basic
    @Column(name = "ip")
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Basic
    @Column(name = "login_date")
    public Date getLoginDate() {
        return loginDate;
    }

    public void setLoginDate(Date loginDate) {
        this.loginDate = loginDate;
    }

    @Basic
    @Column(name = "login_location")
    public String getLoginLocation() {
        return loginLocation;
    }

    public void setLoginLocation(String loginLocation) {
        this.loginLocation = loginLocation;
    }

    @Override
    public String toString() {
        return "LoginLog{" +
                "user=" + user +
                ", ip='" + ip + '\'' +
                ", loginDate=" + loginDate +
                ", loginLocation='" + loginLocation + '\'' +
                '}';
    }
}
