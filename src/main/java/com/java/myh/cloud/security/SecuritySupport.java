package com.java.myh.cloud.security;

import com.java.myh.cloud.core.entity.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;

/**
 * @author author
 */
public class SecuritySupport extends SecurityUtils {
    public static User getUser() {
        return (User) getSubject().getPrincipal();
    }

    @SuppressWarnings("unused")
    public static Integer getUserId() {
        User user = getUser();
        if (null != user) {
            return user.getId();
        }
        return null;
    }

    /**
     * 设置session
     *
     * @param key   the key
     * @param value the value
     */
    public static void setAttribute(Object key, Object value) {
        getSubject().getSession().setAttribute(key, value);
    }

    /**
     * 设置session，并且设置过期的时间
     */
    public static void setAttribute(Object key, Object value, Long timeout) {
        Session session = getSubject().getSession();
        session.setTimeout(timeout);
        session.setAttribute(key, value);
    }

    /**
     * 获取session
     */
    public static Object getAttribute(Object key) {
        return getSubject().getSession().getAttribute(key);
    }
}
