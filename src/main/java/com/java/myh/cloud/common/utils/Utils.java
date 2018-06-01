package com.java.myh.cloud.common.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.Random;

public final class Utils {

//    /**
//     * 设定安全的密码，生成随机的salt并经过1024次 sha-1 hash
//     */
//    public static void entryptUserPassword(User user) {
//        byte[] salt = Digests.generateSalt(Constants.PASSWORD_SALT_SIZE);
//        user.setSalt(Encodes.encodeHex(salt));
//        byte[] hashPassword = Digests.sha1(user.getPlainPassword().getBytes(), salt, Constants
//                .PASSWORD_HASH_INTERATIONS);
//        user.setPassword(Encodes.encodeHex(hashPassword));
//    }


    /**
     * 密码加密
     */
    public static String encodePwd(String pwd, String salt) {
        byte[] hashPassword = Digests.sha1(pwd.getBytes(), Encodes.decodeHex(salt), Constants
                .PASSWORD_HASH_INTERATIONS);
        return Encodes.encodeHex(hashPassword);
    }

    /**
     * 生成验证码-随机数.
     */
    public static String random(int count) {
        StringBuffer sb = new StringBuffer();
        String str = "0123456789";
        Random r = new Random();
        for (int i = 0; i < count; i++) {
            int num = r.nextInt(str.length());
            sb.append(str.charAt(num));
            str = str.replace((str.charAt(num) + ""), "");
        }
        return sb.toString();
    }

    /**
     * 创建分页请求.
     */
    public static PageRequest buildPageRequest(int pageNo) {
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        return new PageRequest(pageNo - 1, Constants.DEFAULT_PAGE_SIZE, sort);
    }

}
