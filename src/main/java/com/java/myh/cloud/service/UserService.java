package com.java.myh.cloud.service;

import com.java.myh.cloud.core.entity.FilesDO;
import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.core.entity.enumeration.AbstractStatusEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;


/**
 * @author 心安 QWQ
 */
public interface UserService extends BaseService<User, Integer> {
    /**
     * 根据用户密码查找
     *
     * @param username 用户名
     * @return 用户
     */
    User findByUserName(String username);

    /**
     * 注册
     *
     * @param username 用户名
     * @param password 密码
     * @param email    邮箱
     */
    void registerUser(String username, String password, String email);

    /**
     * 上传文件时需要对用户的容量进行改变
     *
     * @param userId 用户id
     * @param size   文件大小
     */
    void changeCapacityWhenUpload(Integer userId, long size);

    /**
     * 检查用户的剩余空间是否足够
     *
     * @param user 用户
     * @param size 文件大小
     * @return 是否足够
     */
    boolean checkUserCapacity(User user, long size);

    /**
     * 在用户删除文件的时候改变用户的容量
     *
     * @param filesDO 文件
     * @param user    用户
     */
    void changeCapacityWhenDelete(FilesDO filesDO, User user);

    /**
     * 检查用户密码是否正确
     *
     * @param username 用户名
     * @param password 密码
     * @return 是否正确
     */
    boolean checkPassword(String username, String password);

    /**
     * 根据条件查询用户
     *
     * @param username  用户名  模糊查询
     * @param status    状态
     * @param startDate 注册开始时间
     * @param endDate   注册结束时间
     * @param pageable  分页
     * @return 满足条件的用户
     */
    Page<User> findAllUserByCondition(String username, AbstractStatusEntity.Status status, Date startDate, Date endDate, Pageable pageable);

    /**
     * 改变用户状态
     *
     * @param userIds 用户id数组
     * @param status  状态
     */
    void changeUserStatusByUserIds(Integer[] userIds, User.Status status);
}
