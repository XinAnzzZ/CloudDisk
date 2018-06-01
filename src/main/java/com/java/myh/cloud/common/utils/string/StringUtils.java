package com.java.myh.cloud.common.utils.string;

/**
 * 字符串工具类
 */
public final class StringUtils {

    /**
     * 判断字符串是否为空
     *
     * @param str
     * @return
     */
    public static boolean isEmpty(String str) {
        return (str == null || "".equals(str.trim()));
    }

    /**
     * 判断字符串是否不为空
     */
    public static boolean isNotEmpty(String str) {
        return !isEmpty(str);
    }

    /**
     * 获取名称后缀
     *
     * @param name
     * @return
     */
    public static String getExt(String name) {
        if (name == null || "".equals(name) || !name.contains("."))
            return "";
        return name.substring(name.lastIndexOf(".") + 1);
    }

}