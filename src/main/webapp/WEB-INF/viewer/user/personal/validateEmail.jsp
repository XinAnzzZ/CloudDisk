<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/9
  Time: 13:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<div id="validateEmail">
    <div id="divId" style="margin: 15px auto;">
    </div>
    <div style="margin: 0 auto;">
        <el-form :model="randomCodeForm" ref="randomCodeForm" label-width="100px" style="margin-top: 30px;width: 390px">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="randomCodeForm.email" placeholder="请输入您绑定的邮箱"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="sendRandomCode">发送验证码</el-button>
            </el-form-item>
            <el-form-item label="验证码" prop="randomCode">
                <el-input v-model="randomCodeForm.randomCode" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
<script type="text/javascript">
    let formData;
    let app = new Vue({
        el: "#validateEmail",
        data: {
            randomCodeForm: {
                email: "",
                randomCode: ""
            }
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            },
            sendRandomCode() {
                if (formData.email === "") {
                    app.$message.error("请输入您的邮箱！");
                    return;
                }
                $.ajax({
                    type: 'post',
                    data: formData,
                    url: '/user/send/email',
                    success: function (data) {
                        if (data.success) {
                            app.$message("验证码已发送！");
                        } else {
                            app.$message.error("您输入的邮箱不正确！");
                        }
                    }
                });
            },
            submitForm() {
                if (formData.randomCode === "") {
                    app.$message.error("请输入验证码！");
                }
                $.ajax({
                    type: 'post',
                    data: formData,
                    url: '/user/check/random/code',
                    success: function (data) {
                        if (data.success) {
                            app.$message({message: "恭喜您，验证成功！", type: "success"});
                            setTimeout(function () {
                                parent.location.href = "/user/safety/page";
                            }, 1500);
                        } else {
                            app.$message.error("您输入的验证码不正确！");
                        }
                    }
                });
            }
        },
        mounted: function () {
            formData = this.randomCodeForm;
        }
    });
</script>
</body>
</html>
