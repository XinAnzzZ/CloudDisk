<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/1/31
  Time: 19:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html id="myhtml" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script type="text/javascript" defer="" async="" src="https://track.uc.cn/uaest.js"></script>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <title>登录</title>
    <script type="text/javascript">/*<![CDATA[*/
    location.hash && (location.href = location.href.replace(location.hash, ""));
    /*]]>*/</script>
    <script>var DV_ARG = {};
    DV_ARG.token = "netdisk:" + new Date().getTime() + ":" + Math.random();</script>
    <link href="https://pan.baidu.com/static/css/login-all-min.css" rel="stylesheet" type="text/css">
    <style>@font-face {
        font-family: uc-nexus-iconfont;
        src: url(chrome-extension://pogijhnlcfmcppgimcaccdkmbedjkmhi/res/font_9qmmi8b8jsxxbt9.woff) format('woff'), url(chrome-extension://pogijhnlcfmcppgimcaccdkmbedjkmhi/res/font_9qmmi8b8jsxxbt9.ttf) format('truetype')
    }</style>
    <script type="text/javascript" charset="UTF-8"
            src="https://ss0.bdstatic.com/5LMZfyabBhJ3otebn9fN2DJv/passApi/js/login_tangram_f458414.js"></script>

    <script type="text/javascript" charset="UTF-8"
            src="https://ss0.bdstatic.com/5LMZfyabBhJ3otebn9fN2DJv/passApi/js/loginWLtoPC_fc928b0.js"></script>
    <link rel="stylesheet" type="text/css" href="https://passport.baidu.com/passApi/css/uni_login_merge_0dc54d0.css">
</head>
<body>
<div id="login-container" class="">
    <div class="ibg-bg index-banner-0" style="transform: matrix(1, 0, 0, 1, 0, 0); transition: all 500ms linear;"></div>
    <div class="header-container">
        <div id="login-header">

        </div>
    </div>
    <div class="login-main">
        <div class="all-index-banner">
            <div class="index-body-content">
                <p><span class="left-quote"></span><span>安全存储</span></p>
                <p><span>生活井井有条</span><span class="right-quote"></span></p>
            </div>
        </div>
        <div class="all-index-banner hidden">
            <div class="index-body-content">
                <p><span class="left-quote"></span><span>在线预览</span></p>
                <p><span>文件即开即看</span><span class="right-quote"></span></p>
            </div>
        </div>
        <div class="all-index-banner hidden">
            <div class="index-body-content">
                <p><span class="left-quote"></span><span>多端并用</span></p>
                <p><span>数据随身携带</span><span class="right-quote"></span></p>
            </div>
        </div>
        <div class="all-index-banner hidden">
            <div class="index-body-content">
                <p><span class="left-quote"></span><span>好友分享</span></p>
                <p><span>共度幸福时光</span><span class="right-quote"></span></p>
            </div>
        </div>
        <div class="yunbg">
            <ul class="focus-content clearfix">
                <li class="focus-content-item"><a class="focus-anchor current" hidefocus="true" href="javascript:;"
                                                  idx="0"></a></li>
                <li class="focus-content-item"><a class="focus-anchor" hidefocus="true" href="javascript:;" idx="1"></a>
                </li>
                <li class="focus-content-item"><a class="focus-anchor" hidefocus="true" href="javascript:;" idx="2"></a>
                </li>
                <li class="focus-content-item"><a class="focus-anchor" hidefocus="true" href="javascript:;" idx="3"></a>
                </li>
            </ul>
        </div>
        <div id="login-middle">
            <el-row :gutter="10">
                <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="8">
                    <div class="grid-content "></div>
                </el-col>
                <el-col :xs="8" :sm="12" :md="16" :lg="12" :xl="8">
                    <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm"
                             class="demo-ruleForm">
                        <div class="grid-content ">
                            <el-form-item label="" prop="username">
                                <el-input type="text" v-model="loginForm.username" auto-complete="off"
                                          placeholder="用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="" prop="password">
                                <el-input type="password" v-model="loginForm.password" auto-complete="off"
                                          placeholder="密码"></el-input>
                            </el-form-item>
                            <el-form-item label="" prop="validateCode">
                                <el-row>
                                    <el-col :xl="14">
                                        <el-input v-model.number="loginForm.validateCode" placeholder="验证码">
                                        </el-input>
                                    </el-col>
                                    <el-col :xl="10">
                                        <img :src="yzmUrl" @click="changeValidateCode" alt="验证码"/>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item prop="rememberMe">
                                <el-checkbox border color="red" name="rememberMe" v-model="loginForm.rememberMe"><span
                                        style="color: #ffffff">记住我</span></el-checkbox>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                                <el-button @click="register('/user/register/page')">注册</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="8">
                    <div class="grid-content -light"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</div>
<div class="canvas-bg hidden"></div>
<div style="height:0;width:0">
    <span class="index-banner-1"></span>
    <span class="index-banner-2"></span>
    <span class="index-banner-3"></span>
</div>
<script src="${pageContext.request.contextPath}/statics/systemjs/login-all.js?t=20140427000"
        type="text/javascript"></script>
<div id="FP_USERDATA" fp_uid="fbf19dd53831a288a335c76c8c753d58" style="visibility: hidden; position: absolute;"></div>
<script>
    new Vue({
        el: "#login-middle",
        data: {
            loginForm: {
                username: '',
                password: '',
                validateCode: '',
                rememberMe: false
            },
            rules2: {
                username: [
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入用户名'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }
                ],
                password: [
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入密码'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                validateCode: [
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                return callback(new Error('请输入验证码'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }
                ]
            },
            yzmUrl: "/common/pub/getRandCode"
        },
        methods: {
            submitForm(formName) {
                var isPass = false;
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        isPass = true;
                        console.info(valid);
                    }
                });
                if (isPass) {
                    return;
                }
                var vueThis = this;
                vueThis.$http.post(
                    '/login', vueThis.loginForm,
                    {emulateJSON: true}
                ).then(function (response) {
                    if ((response.data + "").indexOf("<html") >= 0) {
                        vueThis.submitForm("loginForm");
                    } else {
                        var messageType = "error";
                        if (response.data.success) {
                            messageType = "success"
                        }
                        vueThis.$message({
                            showClose: true,
                            message: response.data.message,
                            type: messageType
                        });
                        vueThis.yzmUrl = ("/common/pub/getRandCode?") + Math.random();
                        if (response.data.success) {
                            setTimeout(function () {
                                window.location.href = (response.data.data);
                            }, 1500);
                        }
                    }
                })
            },
            register(path) {
                jumpToPage(path);
            },
            changeValidateCode() {
                this.yzmUrl = ("/common/pub/getRandCode?") + Math.random();
            }
        }
    })
</script>
</body>
</html>
