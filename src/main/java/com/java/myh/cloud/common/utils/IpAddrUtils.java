package com.java.myh.cloud.common.utils;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;

/**
 * @author 心安 QWQ
 */
public class IpAddrUtils {
//    private static final String[] HEADERS_TO_TRY = {
//            "X-Forwarded-For",
//            "Proxy-Client-IP",
//            "WL-Proxy-Client-IP",
//            "HTTP_X_FORWARDED_FOR",
//            "HTTP_X_FORWARDED",
//            "HTTP_X_ CLUSTER_CLIENT_IP",
//            "HTTP_CLIENT_IP",
//            "HTTP_FORWARDED_FOR",
//            "HTTP_FORWARDED",
//            "HTTP_VIA",
//            "REMOTE_ADDR",
//            "X-Real-IP"};
//    private static final String UNKNOWN = "unknown";
//
//    /**
//     * 获取客户端ip地址(可以穿透代理)
//     *
//     * @param request request
//     * @return ip
//     */
//    public static String getRemoteAddr(HttpServletRequest request) {
//        String ip = request.getHeader("X-Forwarded-For");
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("Proxy-Client-IP");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("WL-Proxy-Client-IP");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("HTTP_CLIENT_IP");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getRemoteAddr();
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            return "unknown:" + System.currentTimeMillis();
//        }
//        return ip;
//    }
//
//    /***
//     * 获取客户端ip地址(可以穿透代理)
//     * @param request request
//     * @return ip
//     */
//    public static String getClientIpAddress(HttpServletRequest request) {
//        for (String header : HEADERS_TO_TRY) {
//            String ip = request.getHeader(header);
//            if (ip != null && ip.length() != 0 && !UNKNOWN.equalsIgnoreCase(ip)) {
//                return ip;
//            }
//        }
//        return request.getRemoteAddr();
//    }
//
//    /***
//     * 获取客户端ip地址(可以穿透代理)
//     * @param request request
//     * @return IP
//     */
//    public static String getClientIpAddr(HttpServletRequest request) {
//        String ip = request.getHeader("X-Forwarded-For");
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("Proxy-Client-IP");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("WL-Proxy-Client-IP");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("HTTP_X_FORWARDED");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("HTTP_X_CLUSTER_CLIENT_IP");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("HTTP_CLIENT_IP");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("HTTP_FORWARDED_FOR");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("HTTP_FORWARDED");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("HTTP_VIA");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getHeader("REMOTE_ADDR");
//        }
//        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
//            ip = request.getRemoteAddr();
//        }
//        return ip;
//    }
//
//    public static String getIpAddr(HttpServletRequest request) {
//        String ip = request.getHeader("X-Real-IP");
//        if (null != ip && !"".equals(ip.trim())
//                && !UNKNOWN.equalsIgnoreCase(ip)) {
//            return ip;
//        }
//        ip = request.getHeader("X-Forwarded-For");
//        if (null != ip && !"".equals(ip.trim())
//                && !UNKNOWN.equalsIgnoreCase(ip)) {
//            // get first ip from proxy ip
//            int index = ip.indexOf(',');
//            if (index != -1) {
//                return ip.substring(0, index);
//            } else {
//                return ip;
//            }
//        }
//        return request.getRemoteAddr();
//    }

    /**
     * 根据ip获取ip归属地
     *
     * @param ip ip
     * @return 归属地
     * http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=
     * <p>
     * 内网ip有三种形式
     * 10.xx.xx.xx
     * 172.16.xx.xx ~ 172.31.xx.xx
     * 192.168.xx.xx
     */
    public static String getAddrByIp(String ip) {
        String local = "127.0.0.1";
        if (local.equalsIgnoreCase(ip)) {
            return "本地ip";
        }
        OkHttpClient okHttpClient = new OkHttpClient();
        Request request = new Request.Builder()
                .url("http://apis.juhe.cn/ip/ip2addr?dtype=&key=ba45af0845c3cc763b2326e5b5a4ad06&ip=" + ip)
                .build();
        Response response;
        String responseBody;
        try {
            response = okHttpClient.newCall(request).execute();
            responseBody = response.body().string();
            String result = responseBody.substring(responseBody.indexOf("{"), responseBody.length() - 1);
            String area = result.substring(result.indexOf("\"area\":\"") + 8, result.indexOf("\",\"location\""));
            String location = result.substring(result.indexOf("\"location\":\"") + 12, result.indexOf("\"},\"error_code\""));
            return area + " " + location;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "未知地址";
    }

    public static void main(String[] args) {
        System.out.println(getAddrByIp("116.226.243.87"));
    }

}
