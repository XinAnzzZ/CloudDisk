package com.java.myh.cloud.service;

import com.java.myh.cloud.core.entity.LoginLog;
import com.java.myh.cloud.core.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;

public interface LoginLogService extends BaseService<LoginLog, Integer> {
    /**
     * 保存一条登录日志
     *
     * @param user 用户
     * @param ip   ip
     */
    void saveLoginLog(User user, String ip);

    /**
     * 条件查找登录日志
     *
     * @param user           用户
     * @param loginDateStart 登录起始日期
     * @param loginDateEnd   登录终止日期
     * @param pageable       分页
     * @return 登录日志page
     */
    Page<LoginLog> findAllLoginLog(User user, Date loginDateStart, Date loginDateEnd, Pageable pageable);
}
