package com.java.myh.cloud.core.entity;

import com.java.myh.cloud.common.data.MetaData;
import com.java.myh.cloud.common.data.OrdinalEnum;
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
@DynamicInsert
@DynamicUpdate
@Table(name = "share_files")
public class ShareFiles extends BaseNativeEntityAbstract implements Serializable {
    private static final long serialVersionUID = -4273058658354172386L;
    private FilesDO filesDO;
    /**
     * 是否加密
     */
    private Whether isEncrypt;
    private String password;
    private Whether isCancel;
    private Date shareDate;
    /**
     * 有效期
     */
    private DateEnum termOfValidity;
    /**
     * 到期时间
     */
    private Date expiryDate;
    /**
     * 文件的唯一标识，用于添加在分享链接之后，UUID
     */
    private String sign;
    private User user;
    /**
     * 被查看次数
     */
    private Integer count;

    @OneToOne
    @JoinColumn(name = "file_id")
    public FilesDO getFilesDO() {
        return filesDO;
    }

    public void setFilesDO(FilesDO filesDO) {
        this.filesDO = filesDO;
    }

    @Column(name = "is_encrypt")
    @Enumerated(EnumType.STRING)
    public Whether getIsEncrypt() {
        return isEncrypt;
    }

    public void setIsEncrypt(Whether isEncrypt) {
        this.isEncrypt = isEncrypt;
    }

    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "is_cancel")
    @Enumerated(EnumType.STRING)
    public Whether getIsCancel() {
        return isCancel;
    }

    public void setIsCancel(Whether isCancel) {
        this.isCancel = isCancel;
    }

    @Column(name = "share_date")
    public Date getShareDate() {
        return shareDate;
    }

    public void setShareDate(Date shareDate) {
        this.shareDate = shareDate;
    }

    @Column(name = "term_of_validity")
    @Enumerated(EnumType.STRING)
    public DateEnum getTermOfValidity() {
        return termOfValidity;
    }

    public void setTermOfValidity(DateEnum termOfValidity) {
        this.termOfValidity = termOfValidity;
    }

    @Column(name = "expiry_date")
    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    @Column(name = "sign")
    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "count")
    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "ShareFiles{" +
                "filesDO=" + filesDO +
                ", isEncrypt=" + isEncrypt +
                ", password='" + password + '\'' +
                ", isCancel=" + isCancel +
                ", shareDate=" + shareDate +
                ", termOfValidity=" + termOfValidity +
                ", expiryDate=" + expiryDate +
                ", sign='" + sign + '\'' +
                ", user=" + user +
                ", count=" + count +
                '}';
    }

    public enum Whether implements OrdinalEnum {
        /**
         * 是否
         */
        @MetaData("是")
        YES {
            @Override

            public String getName() {
                return "是";
            }
        },
        @MetaData("否")
        NO {
            @Override
            public String getName() {
                return "否";
            }
        }
    }

    public enum DateEnum {
        /**
         * 分享有效期
         */
        SEVEN_DAY,
        FIFTEEN_DAY,
        ONE_MONTH,
        FOREVER;

        public Integer getName() {
            switch (this) {
                case FOREVER:
                    return null;
                case ONE_MONTH:
                    return 30;
                case SEVEN_DAY:
                    return 7;
                case FIFTEEN_DAY:
                    return 15;
                default:
                    return null;
            }
        }
    }
}
