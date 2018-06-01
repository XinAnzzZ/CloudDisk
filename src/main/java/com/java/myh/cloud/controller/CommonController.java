package com.java.myh.cloud.controller;


import com.java.myh.cloud.common.utils.Result;
import com.java.myh.cloud.common.utils.img.VerifyCodeUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * @author 心安 QWQ
 */
@Controller
@RequestMapping("/common")
public class CommonController extends BaseController {

    /**
     * 获取图片验证码
     */
    @RequestMapping("/pub/getRandCode")
    public void getRandCode(HttpServletRequest request, HttpServletResponse response) {

        response.setContentType("image/jpeg");
        // 禁止图像缓存。
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        VerifyCodeUtils.outputVerifyImage(90, 36, request, response, 4);
    }

    /**
     * 验证码是否填写正确
     */
    @RequestMapping(value = "/pub/isRandCode")
    @ResponseBody
    public Result isRandCode(@RequestParam(value = "identifyCode") String identifyCode, HttpServletRequest request) {
        if (null != identifyCode) {
            String randCode = request.getSession().getAttribute(VerifyCodeUtils.RANDOM_CODE_KEY).toString();
            if (identifyCode.equalsIgnoreCase(randCode)) {
                return Result.ok();
            }
        }
        return Result.fail("你输入的验证码不正确！");
    }
}

