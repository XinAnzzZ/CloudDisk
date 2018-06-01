package com.java.myh.cloud.service;

import com.java.myh.cloud.core.entity.FilesDO;
import com.java.myh.cloud.core.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @author 心安 QWQ
 */
public interface FilesService extends BaseService<FilesDO, Integer> {

    /**
     * 获取根目录下全部的文件夹和文件
     *
     * @param user          当前用户
     * @param fatherId      父目录id
     * @param searchContent 搜索内容
     * @param pageable      分页条件
     * @return 符合添加的文件page
     */
    Page<FilesDO> findAllFiles(User user, Integer fatherId, String searchContent, Pageable pageable);

    /**
     * 根据文件名称获取文件
     *
     * @param userId   用户id
     * @param fatherId 文件父id
     * @param whether  是否为文件夹
     * @param fileName 文件名称
     * @return 符合条件的文件
     */
    FilesDO findFileByFileName(Integer userId, Integer fatherId, FilesDO.Whether whether, String fileName);

    /**
     * 根据文件id获取文件
     *
     * @param fileId 文件id
     * @return 符合条件的文件
     */
    FilesDO findFileById(Integer fileId);

    /**
     * 根据文件id删除文件
     *
     * @param fileId      文件id
     * @param userService userService
     * @param user        用户
     */
    void deleteFilesByFilesId(Integer fileId, UserService userService, User user);

    /**
     * 根据文件的父文件夹id获取该文件夹下全部文件
     *
     * @param fatherId 父id
     * @return 符合条件的文件list
     */
    List<FilesDO> findAllFilesByFatherId(Integer fatherId);

    /**
     * 将fileId数组中的文件移动到fatherId文件夹下
     *
     * @param fileId   文件id
     * @param fatherId 父目录id
     */
    void moveFileByFilesId(Integer[] fileId, Integer fatherId);

    /**
     * 获取该文件夹下全部的文件夹
     *
     * @param user     用户
     * @param fatherId 父目录id
     * @return 符合条件的文件list
     */
    List<FilesDO> getAllFolder(User user, Integer fatherId);

    /**
     * 得到所有的图片
     *
     * @param user 当前用户
     * @return 图片list
     */
    List<FilesDO> getAllPicture(User user);

    /**
     * 所有视频
     *
     * @param user         用户
     * @param pageable     分页
     * @param fileTypeEnum 文件类型
     * @return page
     */
    Page<FilesDO> getAllFilesByFileType(User user, FilesDO.FileTypeEnum fileTypeEnum, Pageable pageable);
}
