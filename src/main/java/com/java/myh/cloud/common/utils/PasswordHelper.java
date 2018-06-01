package com.java.myh.cloud.common.utils;


/**
 * @author 心安 QWQ
 */
public class PasswordHelper {
    /**
     * 密码加密
     */
    public static String encodePassword(String password) {
        return new LJFMD5().toMD5(password).toUpperCase();
    }
}
