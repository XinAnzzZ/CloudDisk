<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/8
  Time: 14:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<div id="changePassword">
    <div style="width: 90%;margin-right: auto;margin-left: auto">
        <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
            <el-step title="旧密码"></el-step>
            <el-step title="密保问题"></el-step>
            <el-step title="新密码"></el-step>
        </el-steps>
    </div>
    <div style="width: 90%;margin-right: auto;margin-left: auto;margin-top: 10px">
        <el-form id="elForm" ref="validateForm" :model="validateForm">
            <el-form-item id="username" label="用户名" prop="username">
                <el-input v-model="validateForm.username"></el-input>
            </el-form-item>
            <el-form-item id="password" label="旧密码" prop="oldPassword">
                <el-input type="password" v-model="validateForm.oldPassword"></el-input>
            </el-form-item>
        </el-form>
        <el-form>
            <el-form-item>
                <el-button id="elButton" @click="next()">下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
<script type="text/javascript">
    let formData;
    let app = new Vue({
        el: "#changePassword",
        data: {
            active: 0,
            validateForm: {
                username: "",
                oldPassword: "",
                question: "",
                answer: "",
                newPassword: "",
                newPasswordCheck: ""
            }
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            },
            next() {
                if (app.active === 0) {
                    let formBody = $("#elForm");
                    if (formData.username === "" || formData.oldPassword === "") {
                        this.$message.error("用户名或旧密码不能为空！");
                        return;
                    }
                    $.ajax({
                        type: 'post',
                        data: formData,
                        url: '/user/check/password',
                        success: function (data) {
                            if (data.success) {
                                $("#username").remove();
                                $("#password").remove();
                                let innerHtml = $('<div id="div1" class="layui-form-item">\n' +
                                    '    <label class="layui-form-label">问题</label>\n' +
                                    '    <div class="layui-input-block">\n' +
                                    '      <select id="question" name="question" class="form-control">\n' +
                                    '        <option value="我的生日是哪天？">我的生日是哪天？</option>\n' +
                                    '        <option value="我的父亲的名字是什么？">我的父亲的名字是什么？</option>\n' +
                                    '        <option value="我的学号是多少？">我的学号是多少？</option>\n' +
                                    '      </select>\n' +
                                    '    </div>\n' +
                                    '  </div>\n' +
                                    '  <div id="div2" class="layui-form-item">\n' +
                                    '    <label class="layui-form-label">答案</label><br/>\n' +
                                    '    <div class="layui-input-block">\n' +
                                    '      <input id="answer" name="answer" required  lay-verify="required" placeholder="请输入密保答案，若未设置则不填" class="layui-input">\n' +
                                    '    </div>\n' +
                                    '  </div>');
                                innerHtml.appendTo(formBody);
                                app.active++;
                            } else {
                                app.$message.error("用户名或旧密码输入错误！");
                            }
                        }
                    });
                    return;
                }
                if (app.active === 1) {
                    $.ajax({
                        type: 'post',
                        data: {question: $("#question").val(), answer: $("#answer").val()},
                        url: '/user/validate/question',
                        success: function (data) {
                            if (data.success) {
                                let formBody = $("#elForm");
                                $("#div1").remove();
                                $("#div2").remove();
                                let innerHtml = $('<div class="layui-form-item">\n' +
                                    '  <label class="layui-form-label">新密码</label>\n' +
                                    '  <div class="layui-input-block">\n' +
                                    '    <input id="newPassword" name="newPassword" type="password" placeholder="请输入新密码" class="layui-input">\n' +
                                    '  </div>\n' +
                                    '</div>\n' +
                                    '<div class="layui-form-item">\n' +
                                    '  <label class="layui-form-label">确认</label>\n' +
                                    '  <div class="layui-input-block">\n' +
                                    '    <input id="newPasswordCheck" type="password" placeholder="请再次输入新密码" class="layui-input">\n' +
                                    '  </div>\n' +
                                    ' </div>');
                                innerHtml.appendTo(formBody);
                                $("#elButton").text("完成");
                                app.active++;
                            } else {
                                app.$message.error("您输入的密保答案不正确！");
                            }
                        }
                    });
                    return;
                }
                if (app.active === 2) {
                    let passwordVal = $("#newPassword").val();
                    if (passwordVal === "") {
                        app.$message.error("新密码不能为空！");
                        return;
                    }
                    if ($("#newPasswordCheck").val() !== passwordVal) {
                        app.$message.error("两次输入的密码不一致！");
                        return;
                    }
                    $.ajax({
                        type: 'post',
                        data: {password: passwordVal},
                        url: '/user/reset/password',
                        success: function () {
                            app.active++;
                            app.$message({message: "恭喜您，修改密码成功！请重新登录！", type: 'success'});
                            setTimeout(function () {
                                parent.location.href = "/logout";
                            }, 1500);
                        }
                    });
                }
            }
        },
        mounted: function () {
            formData = this.validateForm;
        }
    });
</script>
</body>
</html>
