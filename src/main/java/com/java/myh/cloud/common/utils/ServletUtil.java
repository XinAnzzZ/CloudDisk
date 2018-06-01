package com.java.myh.cloud.common.utils;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletRequest;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;

/**
 * Http相关的工具类
 * Date: 2015/6/4
 * Time: 15:46
 */
@SuppressWarnings("unused")
public class ServletUtil {
    /**
     * 转换为HttpServletRequest
     *
     * @param servletRequest servletRequest
     * @return HttpServletRequest
     */
    public static HttpServletRequest toRequest(ServletRequest servletRequest) {
        return (HttpServletRequest) servletRequest;
    }

    /**
     * 是否ajax请求
     *
     * @return true or false
     */
    public static Boolean isAjax(HttpServletRequest request) {
        return "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
    }

    /**
     * 获取当前request请求
     *
     * @return httpservletRequest
     */
    public static HttpServletRequest getRequest() {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes();
        return servletRequestAttributes.getRequest();
    }

    /**
     * 清空用户cookie
     */
    public static void clearCookies() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes()).getRequest();
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes()).getResponse();
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }
    }

    /**
     * 清除cookie
     *
     * @param cookieName cookie名
     */
    public static void clearCookie(String cookieName) {
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
        Cookie newCookie = new Cookie(cookieName, null);
        newCookie.setMaxAge(0);
        newCookie.setPath("/");
        response.addCookie(newCookie);
    }

    /**
     * 获取当前请求用户的Http头信息
     * 获取useragent  exp: getHeader("user-agent");
     *
     * @param header 需要获取的Http头Key
     * @return header info
     */
    public static String getHeader(String header) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes()).getRequest();
        return request.getHeader(header);
    }


    /**
     * 获取当前请求用户的Http头信息
     * 获取useragent  exp: getHeader("user-agent");
     *
     * @param header 需要获取的Http头Key
     * @return header info
     */
    public static String getHeader(HttpServletRequest request, String header) {
        return request.getHeader(header);
    }

    /**
     * 获取当前请求用户的ip
     *
     * @return ip
     */
    public static String getIp() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes()).getRequest();
        return getIp(request);
    }

    /**
     * 获取当前请求用户的ip
     *
     * @return ip
     */
    public static String getIp(HttpServletRequest request) {
        return request.getRemoteAddr();
    }

    /**
     * 从http头中读取ip
     *
     * @return ip地址
     */
    public static String getIpFromHeader() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes()).getRequest();
        // 百度加速乐的头
        String ip = getHeader("cf-connecting-ip");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = getHeader("x-forwarded-for");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            request.getRemoteAddr();
        }
        return ip;
    }


    /**
     * 获取客户端IP地址，支持代理服务器
     *
     * @param request
     * @return
     */
    public static String getRemoteIpAddress(HttpServletRequest request) {
        String ip = "";
        //匹配大小写，保证无论Nginx如何配置代理参数，系统都能正常获取代理IP
        Enumeration<?> enumeration = request.getHeaderNames();
        while (enumeration.hasMoreElements()) {
            String paraName = (String) enumeration.nextElement();
            if ("x-forward-for".equalsIgnoreCase(paraName) || "x-forwarded-for".equalsIgnoreCase(paraName)) {
                ip = request.getHeader(paraName);
                break;
            }
        }
        String localIP = "127.0.0.1";
        if ((ip == null) || (ip.length() == 0) || (ip.equalsIgnoreCase(localIP)) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if ((ip == null) || (ip.length() == 0) || (ip.equalsIgnoreCase(localIP)) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if ((ip == null) || (ip.length() == 0) || (ip.equalsIgnoreCase(localIP)) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }


    /**
     * 读取当前请求用户的useragent
     *
     * @return userAgent
     */
    public static String getUseragent() {
        return getHeader("user-agent");
    }


    /**
     * 读取当前请求用户的useragent
     *
     * @return userAgent
     */
    public static String getUseragent(HttpServletRequest request) {
        return getHeader(request, "user-agent");
    }


}
