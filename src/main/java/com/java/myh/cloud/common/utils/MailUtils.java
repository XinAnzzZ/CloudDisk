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
    private static final String ALIYUN_SMTP_HOST = "smtp.aliyun.com";

    /**
     * send mail
     *
     * @throws MessagingException E
     */
    public static void sendEmail(String sendTo, String mailContent) throws MessagingException {
        // 配置发送邮件的环境属性
        final Properties props = new Properties();
        // 表示SMTP发送邮件，需要进行身份验证
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.host", ALIYUN_SMTP_HOST);
        // 如果使用ssl，则去掉使用25端口的配置，进行如下配置,
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.port", "465");

        // 发件人的账号
        props.put("mail.user", "xinan950806@aliyun.com");
        // 访问SMTP服务时需要提供的密码(邮箱密码)
        props.put("mail.password", "xinan950806");

        // 构建授权信息，用于SMTP进行身份验证
        Authenticator authenticator = new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                // 用户名、密码
                String userName = props.getProperty("mail.user");
                String password = props.getProperty("mail.password");
                return new PasswordAuthentication(userName, password);
            }
        };
        // 使用环境属性和授权信息，创建邮件会话
        Session mailSession = Session.getInstance(props, authenticator);
        // 创建邮件消息
        MimeMessage message = new MimeMessage(mailSession);
        // 设置发件人
        InternetAddress form = new InternetAddress(props.getProperty("mail.user"));
        message.setFrom(form);

        // 设置收件人
        InternetAddress to = new InternetAddress(sendTo);
        message.setRecipient(MimeMessage.RecipientType.TO, to);

        // 设置邮件标题
        message.setSubject("快云网盘邮箱验证");
        // 设置邮件的内容体
        message.setContent("感谢您使用快云网盘，您的验证码是" + mailContent
                + "，请勿将该验证码告知别人！", "text/html;charset=UTF-8");

        // 发送
        Transport.send(message);
    }
}
