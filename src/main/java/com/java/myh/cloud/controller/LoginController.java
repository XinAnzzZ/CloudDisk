package com.java.myh.cloud.controller;


import com.java.myh.cloud.common.data.PayWebConfig;
import com.java.myh.cloud.common.utils.Result;
import com.java.myh.cloud.common.utils.img.VerifyCodeUtils;
import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.security.SecuritySupport;
import com.java.myh.cloud.service.LoginLogService;
import com.java.myh.cloud.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 登录控制层
 *
 * @author 心安 QWQ
 */
@Controller
@CrossOrigin(origins = "*", maxAge = 3600)
public class LoginController extends BaseController {
    @Resource
    private LoginLogService loginLogService;
    @Resource
    private UserService userService;

    @GetMapping("/test")
    public String test() {

        return "/login/test";
    }

    /**
     * 首页
     */
    @GetMapping(value = {"/", "", "/index"})
    public String index() {
        return "redirect:/login";
    }

    @GetMapping(value = "/login")
    public String loginIndex() {
        Subject subject = SecurityUtils.getSubject();
        if (subject.isAuthenticated()) {
            if (getUser().getUserType() == User.UserType.ADMIN) {
                return "/admin/index";
            } else {
                return "/user/home";
            }
        }
        //未登录状态，返回登录页面
        return "/login/login";
    }

    /**
     * post登录接口
     */
    @PostMapping("/login")
    @ResponseBody
    public Result login(
            @RequestParam(FormAuthenticationFilter.DEFAULT_USERNAME_PARAM) String username,
            @RequestParam(FormAuthenticationFilter.DEFAULT_PASSWORD_PARAM) String password,
            @RequestParam(value = FormAuthenticationFilter.DEFAULT_REMEMBER_ME_PARAM, defaultValue = "false") boolean rememberMe,
            @RequestParam(required = false) String validateCode,
            HttpServletRequest request
    ) {
        if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password)) {
            return Result.fail("用户名或密码不能为空！");
        }
        if (!PayWebConfig.getIsDev()) {
            if (StringUtils.isEmpty(validateCode)) {
                return Result.fail("请输入验证码！");
            } else {
                String randCode;
                try {
                    randCode = request.getSession().getAttribute(VerifyCodeUtils.RANDOM_CODE_KEY).toString();
                } catch (Exception e) {
                    return Result.fail("验证码错误！");
                }

                if (!validateCode.equalsIgnoreCase(randCode)) {
                    return Result.fail("验证码错误！");
                }
            }
        }
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        token.setRememberMe(rememberMe);
        if (subject.isAuthenticated()) {
            try {
                subject.logout();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        try {
            subject.login(token);

            String successUrl = "/user/home";
            User user = SecuritySupport.getUser();
            if (user.getUserType() == User.UserType.ADMIN) {
                successUrl = "/admin/index";
            }
            loginLogService.saveLoginLog(userService.findByUserName(username), request.getRemoteAddr());
            return Result.ok("登录成功!").setData(successUrl);
        } catch (LockedAccountException lae) {
            token.clear();
            return Result.fail("用户已经被锁定不能登录，请与管理员联系！");
        } catch (UnknownAccountException e) {
            token.clear();
            return Result.fail("用户不存在！");
        } catch (AuthenticationException e) {
            token.clear();
            return Result.fail("用户或密码不正确！");
        }
    }

}
