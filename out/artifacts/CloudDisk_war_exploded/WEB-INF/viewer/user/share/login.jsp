<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/5/8
  Time: 10:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<div id="login">
    <el-form :model="loginForm" status-icon ref="loginForm" style="margin-top: 50px;width: 90%;margin-left: 5%">
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
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="primary" plain @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</div>
<script type="text/javascript">
    let index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    let app = new Vue({
        el: "#login",
        data: {
            loginForm: {
                username: '',
                password: '',
                validateCode: ''
            },
            yzmUrl: "/common/pub/getRandCode"
        },
        methods: {
            changeValidateCode() {
                app.yzmUrl = ("/common/pub/getRandCode?") + Math.random();
            },
            login: function () {
                if (app.username === '' || app.password === '' || app.validateCode === '') {
                    this.$alert('用户名、密码或验证码不能为空', '提示', {
                        confirmButtonText: '确定'
                    });
                    return;
                }
                $.ajax({
                    type: 'post',
                    data: app.loginForm,
                    url: '/login',
                    success: function (data) {
                        if (data.data === '/user/home') {
                            app.$message({type: 'success', msg: '登录成功！'});
                            setTimeout(function () {
                                cancel();
                            }, 1000);
                            parent.window.location.reload();
                        } else {
                            app.$alert('登录失败', '提示', {
                                confirmButtonText: '确定'
                            });
                        }
                    }
                })
            },
            cancel: function () {
                parent.layer.close(index);
            }
        }
    });
</script>
</body>
</html>
