package com.java.myh.cloud.service;

import com.java.myh.cloud.core.entity.Safety;
import com.java.myh.cloud.core.entity.User;

import java.util.List;

/**
 * @author 心安 QWQ
 */
public interface SafetyService extends BaseService<Safety, Integer> {
    /**
     * 校验密保问题
     *
     * @param user     用户
     * @param question 问题
     * @param answer   答案
     * @return 校验结果
     */
    boolean checkSecurityQuestion(User user, String question, String answer);

    /**
     * 查询用户的全部密保问题和答案
     *
     * @param user 用户
     * @return 用户密保问题list
     */
    List<Safety> findByUserId(User user);

    /**
     * 保存全部的密保问题
     *
     * @param arr 密保问题数组
     */
    void saveAllSecurityQuestion(Safety[] arr);
}
