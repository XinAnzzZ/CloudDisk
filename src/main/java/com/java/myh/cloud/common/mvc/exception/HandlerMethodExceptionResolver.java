package com.java.myh.cloud.common.mvc.exception;

import com.google.common.collect.Maps;
import com.java.myh.cloud.common.utils.ServletUtil;
import com.java.myh.cloud.common.utils.WxExceptions;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.shiro.authz.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.accept.ContentNegotiationManager;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author the author
 */
public class HandlerMethodExceptionResolver implements HandlerExceptionResolver, Ordered {

    private Logger logger = LoggerFactory.getLogger(HandlerMethodExceptionResolver.class);
    private ContentNegotiationManager contentNegotiationManager;

    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        String errorMessage;
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        //构建和记录友好和详细的错误信息及消息
        //生成一个异常流水号，追加到错误消息上显示到前端用户，用户反馈问题时给出此流水号给运维或开发人员快速定位对应具体异常细节
        String errorCode = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHHmmss")) + RandomStringUtils.randomNumeric(3);

        Boolean isAuthError = false;
        if (ex instanceof HttpRequestMethodNotSupportedException) {
            // http 请求方式不对
            errorMessage = ex.getMessage();
            status = HttpStatus.BAD_REQUEST;

            //此时还未到Controller方法，无法基于ResponseBody注解判断响应类型，则基于contentNegotiationManager进行判断
            try {
                //先处理特定类型相应
                ServletWebRequest webRequest = new ServletWebRequest(request);
                List<MediaType> mediaTypes = contentNegotiationManager.resolveMediaTypes(webRequest);
                for (MediaType mediaType : mediaTypes) {
                    //JSON类型请求响应
                    if (mediaType.equals(MediaType.APPLICATION_JSON)) {
                        return generateJsonView("错误编号:" + errorCode + "," + errorMessage, ex);
                    }
                }
            } catch (HttpMediaTypeNotAcceptableException e1) {
                logger.error(e1.getMessage(), e1);
            }
        } else {

            errorMessage = "系统运行错误，请联系管理员 ";

            // 先判断明确子类异常，优先匹配后则终止其他判断
            //对一些数据库异常进行友好转义处理，以便前端用户可以理解
            boolean continueProcess = true;

            // 判断是否jsr 303验证错误
            if (continueProcess) {
                ConstraintViolationException e = parseSpecException(ex, ConstraintViolationException.class);
                if (e != null) {
                    continueProcess = false;
                    errorMessage = "违反约束:" + e.getConstraintViolations().stream().map(ConstraintViolation::getMessage).collect(Collectors.joining(","));
                }
            }

            // 判断是否数据库异常
            if (continueProcess) {
                SQLException e = parseSpecException(ex, SQLException.class);
                if (e != null) {
                    continueProcess = false;
                    String sqlMessage = ex.getMessage();
                    if (sqlMessage != null && (sqlMessage.contains("FK") || sqlMessage.startsWith("ORA-02292"))) {
                        errorMessage = "该数据已被关联使用：" + sqlMessage;
                    } else if (sqlMessage != null
                            && (sqlMessage.contains("Duplicate") || sqlMessage.contains("UNIQUE") || sqlMessage.startsWith("ORA-02292"))) {
                        errorMessage = "违反唯一性约束：" + sqlMessage;
                    } else {
                        errorMessage = "数据库执行错误";
                    }
                }
            }

            // 判断是否权限异常
            if (continueProcess) {
                UnauthorizedException e = parseSpecException(ex, UnauthorizedException.class);
                if (e != null) {
                    continueProcess = false;
                    isAuthError = true;
                    errorMessage = "你没有权限访问本地址," + e.getMessage().replace("Subject does not have role", "你必须拥有角色:");
                }
            }

            // 判断是否WX异常
            if (continueProcess) {
                WxExceptions e = parseSpecException(ex, WxExceptions.class);
                if (e != null) {
                    continueProcess = false;
                    errorMessage = "下单过程报错:" + e.getMessage();
                }
            }
            logger.error(errorCode + ":" + errorMessage, ex);
        }

        //设置http status错误代码
        response.setStatus(status.value());
        //其余按照标准的error-page处理
        request.setAttribute("javax.servlet.error.message", errorMessage);

        boolean json = false;
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            ResponseBody responseBody = handlerMethod.getMethod().getAnnotation(ResponseBody.class);
            RestController restController = handlerMethod.getBeanType().getAnnotation(RestController.class);
            if (responseBody != null || restController != null) {
                json = true;
            }
        }

        if (json) {
            return generateJsonView(String.format("%s,错误编号:%s", errorMessage, errorCode), ex);
        }

        ModelAndView modelAndView = new ModelAndView();

        modelAndView.addObject("info", new ExceptionModel(request.getRequestURL().toString(), errorMessage, errorMessage, errorCode, 500, ex));
        if (isAuthError) {
            modelAndView.setViewName("/error/auth");
        } else if (ServletUtil.isAjax(request)) {
            modelAndView.setViewName("/error/error");
        } else {
            modelAndView.setViewName("/error/error");
        }

        return modelAndView;
    }

    @Override
    public int getOrder() {
        return Integer.MIN_VALUE;
    }


    /**
     * 取当前异常及递归其root case示例，判定是否特定异常类型的示例或子类示例
     * 如果是则直接返回强制类型转换后的异常示例，否则返回null
     */
    @SuppressWarnings("unchecked")
    private <X> X parseSpecException(final Exception e, final Class<X> clazz) {
        if (clazz.isAssignableFrom(e.getClass())) {
            return (X) e;
        }
        Throwable cause = e.getCause();
        while (cause != null) {
            if (clazz.isAssignableFrom(cause.getClass())) {
                return (X) cause;
            }
            cause = cause.getCause();
        }
        return null;
    }

    private ModelAndView generateJsonView(final String errorMessage, final Exception ex) {
        ModelAndView mv = new ModelAndView();
        MappingJackson2JsonView view = new MappingJackson2JsonView();
        Map<String, Object> attributes = Maps.newHashMap();
        attributes.put("message", errorMessage + "(" + ex.getMessage() + ")");
        attributes.put("exception", ex.getMessage());
        view.setAttributesMap(attributes);
        mv.setView(view);
        return mv;
    }

    public void setContentNegotiationManager(final ContentNegotiationManager contentNegotiationManager) {
        this.contentNegotiationManager = contentNegotiationManager;
    }

}
