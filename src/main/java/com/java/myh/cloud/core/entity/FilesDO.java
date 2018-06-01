package com.java.myh.cloud.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "files")
@DynamicInsert
@DynamicUpdate
public class FilesDO extends BaseNativeEntityAbstract implements Serializable {
    private static final long serialVersionUID = 6114220984170696844L;
    @JsonIgnore
    private User user;
    private Integer fatherId;
    private String fileName;
    private String extensionName;
    private Date modifyDate;
    private Date createDate;
    private String fileSize;
    private FileTypeEnum type;
    private String location;
    private Whether isDelete;
    private Whether isFolder;

    @Enumerated(EnumType.STRING)
    @Column(name = "is_delete")
    public Whether getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Whether isDelete) {
        this.isDelete = isDelete;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "is_folder")
    public Whether getIsFolder() {
        return isFolder;
    }

    public void setIsFolder(Whether isFolder) {
        this.isFolder = isFolder;
    }

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "father_id")
    public Integer getFatherId() {
        return fatherId;
    }

    public void setFatherId(Integer fatherId) {
        this.fatherId = fatherId;
    }

    @Basic
    @Column(name = "file_name")
    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    @Basic
    @Column(name = "extension_name")
    public String getExtensionName() {
        return extensionName;
    }

    public void setExtensionName(String extensionName) {
        this.extensionName = extensionName;
    }

    @Basic
    @Column(name = "modify_date")
    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    @Basic
    @Column(name = "create_date")
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    @Basic
    @Column(name = "file_size")
    public String getFileSize() {
        return fileSize;
    }

    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    public FileTypeEnum getType() {
        return type;
    }

    public void setType(FileTypeEnum type) {
        this.type = type;
    }

    @Basic
    @Column(name = "location")
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "FilesDO{" +
                "user=" + user +
                ", fatherId=" + fatherId +
                ", fileName='" + fileName + '\'' +
                ", extensionName='" + extensionName + '\'' +
                ", modifyDate=" + modifyDate +
                ", createDate=" + createDate +
                ", fileSize='" + fileSize + '\'' +
                ", type=" + type +
                ", location='" + location + '\'' +
                ", isDelete=" + isDelete +
                ", isFolder=" + isFolder +
                '}';
    }


    public enum FileTypeEnum implements OrdinalEnum {
        /**
         * 文件类型
         */
        @MetaData("文件夹")
        Folder {
            @Override
            public String getName() {
                return "文件夹";
            }
        },
        @MetaData("图片")
        Picture {
            @Override
            public String getName() {
                return "图片";
            }
        },
        @MetaData("文档")
        Document {
            @Override
            public String getName() {
                return "文档";
            }
        },
        @MetaData("视频")
        Video {
            @Override
            public String getName() {
                return "视频";
            }
        },
        @MetaData("音乐")
        Music {
            @Override
            public String getName() {
                return "音乐";
            }
        },
        @MetaData("其他")
        Other {
            @Override
            public String getName() {
                return "其他";
            }
        }
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
}
