package com.java.myh.cloud.service;

import com.java.myh.cloud.core.entity.ShareFiles;
import com.java.myh.cloud.core.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;

/**
 * @author 心安 QWQ
 */
public interface ShareFilesService extends BaseService<ShareFiles, Integer> {

    /**
     * 保存分享的文件
     *
     * @param shareFiles 分享的文件
     */
    void saveShareFiles(ShareFiles shareFiles);

    /**
     * 根据sign来查找文件
     *
     * @param sign 文件的标记
     * @return 文件
     */
    ShareFiles findBySign(String sign);

    /**
     * 根据条件查询已分享的文件
     *
     * @param user      用户
     * @param filename  文件名称
     * @param startDate 分享开始时间
     * @param endDate   分享结束时间
     * @param pageable  分页添加
     * @return 满足添加的文件page
     */
    Page<ShareFiles> findAllByCondition(User user, String filename, Date startDate, Date endDate, Pageable pageable);
}
