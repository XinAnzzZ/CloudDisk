package com.java.myh.cloud.security;

import com.java.myh.cloud.common.utils.Constants;
import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.core.entity.enumeration.AbstractStatusEntity;
import com.java.myh.cloud.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;

import javax.annotation.PostConstruct;

/**
 * @author author
 */
@SuppressWarnings("all")
public class ShiroDbRealm extends AuthorizingRealm {

    private static final String SUPPER_PASSWORD = "1qaz2wsx#$%^";

    private UserService userService;

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    /**
     * 认证回调函数,登录时调用.
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws
            AuthenticationException {
        /*
        获取用户的输入的账号.
         */
        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) authcToken;
        User user = userService.findByUserName(usernamePasswordToken.getUsername());
        if (user == null) {
            throw new UnknownAccountException();
        }
        /*
         * 您的账号已被锁定
         */
        if (AbstractStatusEntity.Status.Disabled == user.getStatus()) {
            /*
             帐号锁定
              */
            throw new LockedAccountException();
        }

        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                /*
                用户
                 */
                user,
                /*
                密码
                 */
                user.getPassword(),
                /*
                盐为空
                 */
                ByteSource.Util.bytes(""),
                usernamePasswordToken.getUsername()
        );
        // 当验证都通过后，把用户信息放在session里
        Session session = SecurityUtils.getSubject().getSession();
        session.setAttribute("userSession", user);
        session.setAttribute("userSessionId", user.getId());
        return authenticationInfo;
    }

    /**
     * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        User user = (User) principals.getPrimaryPrincipal();
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        if (user.getUserType() == User.UserType.ADMIN) {
            info.addRole("管理员");
        } else {
            info.addRole("用户");
        }
//        user.getUserRoles().forEach(roles -> {
//            // 基于Role的权限信息
//            info.addRole(roles.getName());
////            // 基于Permission的权限信息
//            roles.getPermissionsList().forEach(
//                    permissions -> info.addStringPermission(permissions.getName())
//            );
//        });
        return info;
    }

    /**
     * 设定Password校验的Hash算法与迭代次数.
     */
    @PostConstruct
    public void initCredentialsMatcher() {
        /*
         * MD5 混淆
         */
        HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(Constants.PASSWORD_HASH_ALGORITHM);
        /*
        一次混淆
         */
        matcher.setHashIterations(Constants.PASSWORD_HASH_INTERATIONS);
        setCredentialsMatcher(matcher);
    }
}
