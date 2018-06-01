package com.java.myh.cloud.service;

import com.java.myh.cloud.core.entity.Notice;
import com.java.myh.cloud.core.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;

/**
 * @author 心安 QWQ
 */
public interface NoticeService extends BaseService<Notice, Integer> {
    /**
     * 管理员端获取全部的公告
     *
     * @param noticeName 公告名称 模糊查询
     * @param startDate  开始时间
     * @param endDate    结束时间
     * @param pageable   分页条件
     * @return 返回满足条件的数据
     */
    Page<Notice> getAllNoticeByCondition(String noticeName, Date startDate, Date endDate, Pageable pageable);

    /**
     * 用户端获取全部未删除的公告
     *
     * @param noticeName 公告名称 模糊查询
     * @param startDate  开始时间
     * @param endDate    结束时间
     * @param pageable   分页条件
     * @return 返回满足条件的数据
     */
    Page<Notice> getNotDeleteNoticeByCondition(String noticeName, Date startDate, Date endDate, Pageable pageable);

    /**
     * 添加新公告
     *
     * @param title   公告标题
     * @param content 公告内容
     * @param user    用户
     */
    void addNotice(String title, String content, User user);
}
