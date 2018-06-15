<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/6/10
  Time: 16:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Title</title>
    <style>
        .el-carousel__item h3 {
            color: #475669;
            font-size: 18px;
            opacity: 0.75;
            line-height: 300px;
            margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
        }
    </style>
</head>
<body>
<div class="block">
    <el-carousel :interval="5000" arrow="always" height="720px">
        <el-carousel-item v-for="item in items" :key="item">
            <img :src="item" style="width: 100%; height: 100%">
        </el-carousel-item>
        <div>
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
                                <el-checkbox border color="red" name="rememberMe"
                                             v-model="loginForm.rememberMe"><span
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
    </el-carousel>
</div>
<script type="application/javascript">
    new Vue({
        el: ".block",
        data: {
            items: [
                "/statics/img/background/bg1.jpg",
                "/statics/img/background/bg2.jpg",
                "/statics/img/background/bg3.jpg",
                "/statics/img/background/bg4.jpg"
            ],
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
                let isPass = false;
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        isPass = true;
                        console.info(valid);
                    }
                });
                if (isPass) {
                    return;
                }
                let vueThis = this;
                vueThis.$http.post(
                    '/login', vueThis.loginForm,
                    {emulateJSON: true}
                ).then(function (response) {
                    if ((response.data + "").indexOf("<html") >= 0) {
                        vueThis.submitForm("loginForm");
                    } else {
                        let messageType = "error";
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
    });
</script>
</body>
</html>
