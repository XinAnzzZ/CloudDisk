<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/11
  Time: 10:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%--@elvariable id="shareFiles" type="com.java.myh.cloud.core.entity.ShareFiles"--%>
<!DOCTYPE html>
<html>
<head>
    <title>提取文件</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/statics/layui/css/layui.css"/>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/layui/layui.js"></script>
    <style>
        .bg-color {
            background-color: rgb(240, 244, 247);
        }

        .disk-cloud {
            font-size: x-large;
            font-weight: bold;
            height: 60px;
            line-height: 60px;
        }
    </style>
</head>
<body>
<div id="app">
    <el-container style="height: 100%">
        <el-aside width="200px" style="background-color: rgb(240, 244, 247);">
            <div class="disk-cloud">
                <p style="margin-left: 20px">
                    <img src="${pageContext.request.contextPath}/statics/img/cloud_disk.ico" style="margin-top: -4px;"/>
                    <span>快云网盘</span>
                </p>
            </div>
            <el-menu @select="jumpToPath" style="background-color: rgb(240,244,247)">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-menu"></i>我的空间</template>
                    <el-menu-item-group class="bg-color">
                        <el-menu-item index="/user/home"><i class="el-icon-tickets"></i>全部文件</el-menu-item>
                        <el-menu-item index="/user/editPassword"><i class="el-icon-picture"></i>图片</el-menu-item>
                        <el-menu-item index="/user/editPassword"><i class="el-icon-document"></i>文档</el-menu-item>
                        <el-menu-item index="/user/editPassword"><i class="el-icon-service"></i>音乐</el-menu-item>
                        <el-menu-item index="/user/editPassword"><i class="el-icon-view"></i>视频</el-menu-item>
                        <el-menu-item index="/user/editPassword"><i class="el-icon-more"></i>其他</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-info"></i>个人中心</template>
                    <el-menu-item-group class="bg-color">
                        <el-menu-item index="/user/personal/profile"><i class="el-icon-setting"></i>个人资料</el-menu-item>
                        <el-menu-item index="/user/to/notice/page"><i class="el-icon-news"></i>系统公告</el-menu-item>
                        <el-menu-item index="/user/safety/page"><i class="el-icon-warning"></i>安全中心</el-menu-item>
                        <el-menu-item index="/user/login/record"><i class="el-icon-view"></i>登录记录</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-share"></i>我的分享</template>
                    <el-menu-item-group class="bg-color">
                        <el-menu-item index="/files/share/list/page"><i class="el-icon-date"></i>分享列表</el-menu-item>
                        <el-menu-item index="/user/just/play"><i class="el-icon-star-on"></i>玩一下吧</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="bg-color" style="height: 61px;text-align: right">
                <el-menu default-active="1" class="el-menu-demo" mode="horizontal"
                         style="background-color: rgb(240, 244, 247)">
                    <el-menu-item index="1" style="background-color: rgb(240, 244, 247);">我的网盘</el-menu-item>
                    <%--@elvariable id="user" type="com.java.myh.cloud.core.entity.User"--%>
                    <c:if test="${not empty user}">
                        <el-dropdown style="line-height: 60px;">
                            <span style="font-size: inherit;">${user.username}</span>
                            <i class="el-icon-arrow-down" style="margin-right: 20px"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <a href="${pageContext.request.contextPath}/user/safety/page">安全中心</a>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <a onclick="logout()">退出</a>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </c:if>
                    <c:if test="${empty user}">
                        <span>
                            <el-button type="text" style="margin-top: 10px;" @click="login">登录</el-button>
                            <el-button type="text" style="margin-top: 10px;margin-right: 10px" @click="register">
                                注册
                            </el-button>
                        </span>
                    </c:if>
                </el-menu>
            </el-header>
            <el-main>
                <el-form ref="shareFileForm" :model="shareFileForm" label-width="80px"
                         style="margin-left: 5%;margin-top: 3%">
                    <el-form-item label="文件名称" prop="fileName">
                        <el-input v-model="shareFileForm.fileName" style="width: 20%"></el-input>
                    </el-form-item>
                    <el-form-item label="分享人" prop="username">
                        <el-input v-model="shareFileForm.username" style="width: 20%"></el-input>
                    </el-form-item>
                    <el-form-item label="分享时间" prop="shareDate">
                        <el-input v-model="shareFileForm.shareDate" style="width: 20%"></el-input>
                    </el-form-item>
                    <el-form-item label="过期时间" prop="expiryDate">
                        <el-input v-model="shareFileForm.expiryDate" style="width: 20%"></el-input>
                    </el-form-item>
                    <el-form-item label="文件大小" prop="fileSize">
                        <el-input v-model="shareFileForm.fileSize" style="width: 20%"></el-input>
                    </el-form-item>
                    <el-form-item label="查看次数" prop="count">
                        <el-input v-model="shareFileForm.count" style="width: 20%"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="save">保存</el-button>
                        <el-button @click="download">下载</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </el-container>
</div>
<script type="text/javascript">
    let app = new Vue({
        el: "#app",
        data: {
            shareFileForm: {
                id: '${shareFiles.id}',
                fileName: '${shareFiles.filesDO.fileName}',
                username: '${shareFiles.user.username}',
                shareDate: '${shareFiles.shareDate}',
                expiryDate: '${shareFiles.expiryDate}',
                fileSize: '${shareFiles.filesDO.fileSize}',
                count: '${shareFiles.count}'
            }
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            },
            register: function () {
                window.open("/user/register/page");
            },
            login: function () {
                console.info("...");
                layer.open({
                    type: 2,
                    title: '用户登录',
                    area: ['500px', '400px'],
                    scrollbar: false,
                    content: '/user/login/page'
                });
            },
            save: function () {
                let u = ${empty user};
                if (u) {
                    app.$alert('请先登录', '提示', {
                        confirmButtonText: '确定'
                    });
                    return;
                }
                $.ajax({
                    type: 'post',
                    data: {id: app.shareFileForm.id},
                    url: '/user/save/file',
                    success: function (data) {
                        if (data.success) {
                            app.$alert('保存成功', '提示', {
                                confirmButtonText: '确定'
                            });
                        } else {
                            app.$alert(data.msg, '提示', {
                                confirmButtonText: '确定'
                            });
                        }
                    }
                });
            },
            download: function () {
                window.location.href = "/files/file/download?fileId=" + app.shareFileForm.id;
            }
        }
    });
</script>
</body>
</html>
