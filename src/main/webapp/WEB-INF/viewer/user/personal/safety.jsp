<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/8
  Time: 13:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>安全中心</title>
    <style>
        .bottom {
            margin-top: 13px;
            line-height: 12px;
        }

        .button {
            padding: 0;
            float: right;
        }

        .image {
            width: 100%;
            display: block;
        }

        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }

        .clearfix:after {
            clear: both
        }
    </style>
</head>
<body>
<div id="safety">
    <el-container style="height: 100%">
        <%@ include file="/WEB-INF/viewer/user/common/menu.jsp" %>
        <el-container>
            <%@ include file="/WEB-INF/viewer/user/common/header.jsp" %>
            <el-main>
                <el-row>
                    <el-col :span="8">
                        <el-card :body-style="{ padding: '20px' }">
                            <img src="${pageContext.request.contextPath}/statics/img/BI_1ZR%7D%7DYJ6OWJ%60%7D51D%5B%2536.png"
                                 class="image">
                            <div style="padding: 14px;">
                                <div class="bottom clearfix">
                                    <el-button type="text" class="button" @click="changePassword">修改密码</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card :body-style="{ padding: '20px' }">
                            <img src="${pageContext.request.contextPath}/statics/img/JL%5BAHNLJ9%7D~NW%7BNYJ%5B1J19T.png"
                                 class="image">
                            <div style="padding: 14px;">
                                <div class="bottom clearfix">
                                    <el-button type="text" class="button" @click="safetyTools">密保工具</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card :body-style="{ padding: '20px' }">
                            <img src="${pageContext.request.contextPath}/statics/img/Z@735@HBL52V6%60()ZO1G7I5.png"
                                 class="image">
                            <div style="padding: 14px;">
                                <div class="bottom clearfix">
                                    <el-button type="text" class="button" @click="validateEmail">验证邮箱</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </el-container>
</div>
<script>
    let app = new Vue({
        el: "#safety",
        data: {
            currentDate: new Date(),
            activeIndex: '/user/safety/page',
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            },
            changePassword() {
                layer.open({
                    type: 2,
                    area: ['600px', '400px'],
                    scrollbar: false,
                    title: "修改密码",
                    content: ["/user/change/password/page", 'no']
                });
            },
            safetyTools() {
                $.ajax({
                    type: 'post',
                    url: "/user/check/validate",
                    success: function (data) {
                        if (data.success) {
                            layer.open({
                                type: 2,
                                area: ['400px', '600px'],
                                scrollbar: false,
                                title: "重置密保问题",
                                content: ["/user/modify/security/question/page", 'no']
                            });
                        } else {
                            app.$message.error("请先验证邮箱,即将跳转至验证邮箱页面！");
                            setTimeout(function () {
                                app.validateEmail();
                            }, 1000);
                        }
                    }
                });
            },
            validateEmail() {
                layer.open({
                    type: 2,
                    area: ['420px', '350px'],
                    scrollbar: false,
                    title: "校验邮箱",
                    content: ["/user/validate/email/page", 'no']
                });
            }
        }
    });
</script>
</body>
</html>
