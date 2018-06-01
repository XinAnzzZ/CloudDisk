package com.java.myh.cloud.repository;

import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.core.entity.enumeration.AbstractStatusEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * @author 心安 QWQ
 */
public interface UserRepository extends BaseRepository<User, Integer> {
    /**
     * 更新用户状态
     *
     * @param userIds 用户id
     * @param status  状态
     */
    @Modifying
    @Query("update User u set u.status = :status where u.id in :userIds")
    void updateUserStatusByUserIds(@Param("userIds") Integer[] userIds, @Param("status") AbstractStatusEntity.Status status);

    /**
     * 根据用户名查询用户
     *
     * @param username 用户名
     * @return 用户
     */
    User findByUsername(String username);
}
