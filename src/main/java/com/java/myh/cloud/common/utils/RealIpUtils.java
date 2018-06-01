package com.java.myh.cloud.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

/**
 * @author the author
 */
public class RealIpUtils {
    private static Logger log = LoggerFactory.getLogger(RealIpUtils.class);

    public static void main(String[] args) throws SocketException {
        log.info(RealIpUtils.getRealIp());
    }

    private static String getRealIp() throws SocketException {
        // 本地IP，如果没有配置外网IP则返回它
        String localIp = null;
        // 外网IP
        String netIp = null;

        Enumeration<NetworkInterface> netInterfaces =
                NetworkInterface.getNetworkInterfaces();
        InetAddress ip;
        // 是否找到外网IP
        boolean find = false;
        while (netInterfaces.hasMoreElements() && !find) {
            NetworkInterface ni = netInterfaces.nextElement();
            Enumeration<InetAddress> address = ni.getInetAddresses();
            while (address.hasMoreElements()) {
                ip = address.nextElement();
                if (!ip.isSiteLocalAddress()
                        && !ip.isLoopbackAddress()
                        // 外网IP
                        && !ip.getHostAddress().contains(":")) {
                    netIp = ip.getHostAddress();
                    find = true;
                    break;
                } else if (ip.isSiteLocalAddress()
                        && !ip.isLoopbackAddress()
                        // 内网IP
                        && !ip.getHostAddress().contains(":")) {
                    localIp = ip.getHostAddress();
                }
            }
        }

        log.info(netIp);
        log.info(localIp);
        if (netIp != null && !"".equals(netIp)) {
            return netIp;
        } else {
            return localIp;
        }
    }

}
