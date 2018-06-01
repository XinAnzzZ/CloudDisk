package com.java.myh.cloud.common.data;


import com.java.myh.cloud.common.utils.PropertiesLoader;

/**
 * @author DS_100
 */
public class PayWebConfig {

    private static PropertiesLoader propertiesLoader = new PropertiesLoader("classpath:/wechat.properties");
    /**
     * 网站地址
     */
    public static String webUrl = propertiesLoader.getProperty("webUrl");
    /**
     * 网站名称
     */
    public static String webName = propertiesLoader.getProperty("webName");

    public static final String uploadingPath = propertiesLoader.getProperty("uploadingPath");
    public static final String uploadingVisitUrl = propertiesLoader.getProperty("uploadingVisitUrl");
    public static final Boolean isDev = Boolean.valueOf(propertiesLoader.getProperty("isDev"));
    public static final String appVersionCode = propertiesLoader.getProperty("appVersionCode");
    public static final String appVersionNumber = propertiesLoader.getProperty("appVersionNumber");

    public static String getAppVersionCode() {
        return appVersionCode;
    }

    public static String getAppVersionNumber() {
        return appVersionNumber;
    }

    public static Boolean getIsDev() {
        return isDev;
    }

    public static String getUploadingVisitUrl() {
        return uploadingVisitUrl;
    }

    public static String getUploadingPath() {
        return uploadingPath;
    }

    public String getWebUrl() {
        return webUrl;
    }

    public void setWebUrl(String webUrl) {
        PayWebConfig.webUrl = webUrl;
    }

    public String getWebName() {
        return webName;
    }

    public void setWebName(String webName) {
        PayWebConfig.webName = webName;
    }
}
