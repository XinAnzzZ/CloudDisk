package com.java.myh.cloud.common.utils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

/**
 * @author 心安 QWQ
 * @date 2018/5/11 17:57
 */
public class MailUtils {
    public static Properties properties;
    public static Message message;
    public static Transport transport;

    private static void init() {
        properties = new Properties();
        //调试模式发送
        properties.setProperty("mail.debug", "true");
        //身份验证设置
        properties.setProperty("mail.smtp.auth", "true");
        //发件人邮箱主机名
        properties.setProperty("mail.host", "smtp.163.com");
        //发件协议
        properties.setProperty("mail.transport.protocol", "smtp");
        Session session = Session.getInstance(properties);
        message = new MimeMessage(session);
        try {
            message.setSubject("快云网盘邮箱验证邮件");
            //设置发件人
            message.setFrom(new InternetAddress("13023195022@163.com"));
            transport = session.getTransport();
            //设置发件人在该邮箱主机上的用户名密码
            transport.connect("13023195022@163.com", "xinan9508060");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    /**
     * 发送随机验证码邮件
     *
     * @param emailAddress 邮箱地址
     * @param code         随机验证码
     */
    public static void sendEmail(String emailAddress, String code) {
        init();
        String emailContent = "感谢您使用快云网盘，您的验证码是" + code
                + "，请勿将该验证码告知别人！";
        try {
            message.setText(emailContent);
            transport.sendMessage(message, new Address[]{new InternetAddress(emailAddress)});
            transport.close();
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
