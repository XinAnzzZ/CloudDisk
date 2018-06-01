<jsp:useBean id="shareFiles" scope="request" type="com.java.myh.cloud.core.entity.ShareFiles"/>
<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/11
  Time: 11:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>提取文件</title>
    <style type="text/css">
        .main {
            width: 30%;
            height: 300px;
            border-radius: 15px;
            background-color: #eef1f1;
            position: absolute;
            top: 200px;
            left: 50%;
            margin: 0 auto 0 -15%;
        }
    </style>
</head>
<body>
<div id="validate" class="validate">
    <div class="main">
        <div style="margin: 30px;"></div>
        <div style="text-align: center;font-size: large;width: 100%">您的好友 <b>${shareFiles.user.username}</b> 给您分享了文件</div>
        <div style="margin-left: auto;margin-right: auto; margin-top: 50px;width: 90%">
            <el-form :model="passForm" ref="passForm">
                <el-form-item label="请输入提取密码：">
                    <el-input v-model="passForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="validatePassword">提取文件</el-button>
                </el-form-item>
            </el-form>
        </div>
        <p id="errorMsg" style="margin: 25px auto;width: 90%;color: #F56C6C"></p>
    </div>
</div>
<script type="text/javascript">
    let app = new Vue({
        el: "#validate",
        data: {
            passForm: {
                password: "",
                fileId: "${shareFiles.id}"
            }
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            },
            validatePassword() {
                if (app.passForm.password === "") {
                    $("#errorMsg").text("请输入密码");
                    return;
                }
                $.ajax({
                    type: 'post',
                    data: app.passForm,
                    url: '/files/validate/file/password',
                    success: function (data) {
                        if (data.success) {
                            window.location.reload();
                        } else {
                            $("#errorMsg").text("密码错误");
                        }
                    }
                });
            }
        }
    });
</script>
</body>
</html>
