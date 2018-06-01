package com.java.myh.cloud.controller;

import com.java.myh.cloud.common.data.PayWebConfig;
import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.security.SecuritySupport;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.beans.PropertyEditorSupport;

/**
 * @author author
 */
public abstract class BaseController {

//    private static final String FORMAT_YEAR = "yyyy";
//
//    private static final String FORMAT_YEAR_MONTH = "yyyy-MM";
//
//    private static final String FORMAT_YEAR_MONTH_DAY = "yyyy-MM-dd";
//
//    private static final String FORMAT_ALL = "yyyy-MM-dd HH:mm:ss";

    public Model model;
    protected Logger logger = LoggerFactory.getLogger(getClass());
    private User loginUser;

    public User getUser() {
        return loginUser;
    }

    @ModelAttribute
    public void pushWebConfig(Model model) {
        loginUser = SecuritySupport.getUser();
        model.addAttribute("user", SecuritySupport.getUser());
        model.addAttribute("payWebConfig", new PayWebConfig());
        this.model = model;
    }

    /**
     * 参数绑定异常
     */
    @ExceptionHandler({BindException.class})
    public String bindException() {
        return "error/500";
    }

    /**
     * 授权登录异常
     */
    @ExceptionHandler({AuthenticationException.class})
    public String authenticationException() {
        return "error/403";
    }

    /**
     * 将传递的参数进行数据绑定
     */
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        //将所有传递进来的String进行HTML编码，防止XSS攻击
        binder.registerCustomEditor(String.class, new PropertyEditorSupport() {
            @Override
            public String getAsText() {
                Object value = getValue();
                return value != null ? getValue().toString() : "";
            }

            @Override
            public void setAsText(String text) {
                setValue(text == null ? null : StringEscapeUtils.escapeHtml4(text.trim()));
            }
        });

//        对传递的日期类型数据进行数据绑定，格式化为指定格式
//        binder.registerCustomEditor(Date.class, new PropertyEditorSupport() {
//            @Override
//            public void setAsText(String text) throws IllegalArgumentException {
//                if (StringUtils.isNotEmpty(text)) {
//                    SimpleDateFormat format;
//                    int length = text.trim().length();
//                    switch (length) {
//                        case 4:
//                            format = new SimpleDateFormat(FORMAT_YEAR, Locale.CHINA);
//                            break;
//                        case 7:
//                            format = new SimpleDateFormat(FORMAT_YEAR_MONTH, Locale.CHINA);
//                            break;
//                        case 10:
//                            format = new SimpleDateFormat(FORMAT_YEAR_MONTH_DAY, Locale.CHINA);
//                            break;
//                        default:
//                            format = new SimpleDateFormat(FORMAT_ALL, Locale.CHINA);
//                            break;
//                    }
//                    try {
//                        setValue(format.parse(text.trim()));
//                    } catch (ParseException e) {
//                        e.printStackTrace();
//                    }
//                }
//            }
//        });
    }

}
