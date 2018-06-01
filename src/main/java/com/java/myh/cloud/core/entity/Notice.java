package com.java.myh.cloud.core.entity;

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
@Table(name = "notice")
@DynamicInsert
@DynamicUpdate
public class Notice extends BaseNativeEntityAbstract implements Serializable {
    private static final long serialVersionUID = 8217506507471706002L;
    private String noticeName;
    private String content;
    private Date createDate;
    private Whether isDelete;
    private User user;

    @Column(name = "notice_name")
    public String getNoticeName() {
        return noticeName;
    }

    public void setNoticeName(String noticeName) {
        this.noticeName = noticeName;
    }

    @Column(name = "content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Column(name = "create_date")
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    @Column(name = "is_delete")
    @Enumerated(EnumType.STRING)
    public Whether getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Whether isDelete) {
        this.isDelete = isDelete;
    }

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Notice{" +
                "noticeName='" + noticeName + '\'' +
                ", content='" + content + '\'' +
                ", createDate=" + createDate +
                ", isDelete=" + isDelete +
                ", user=" + user +
                '}';
    }

    public enum Whether {
        /**
         * 是否
         */
        YES, NO
    }
}
