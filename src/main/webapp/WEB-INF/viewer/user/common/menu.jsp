<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/1/8 0008
  Time: 0:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<head>
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

<el-aside width="200px" style="background-color: rgb(240, 244, 247);">
    <div class="disk-cloud">
        <p style="margin-left: 20px">
            <img src="${pageContext.request.contextPath}/statics/img/cloud_disk.ico" style="margin-top: -4px;"/>
            <span>快云网盘</span>
        </p>
    </div>
    <el-menu :default-active="activeIndex" @select="jumpToPath" style="background-color: rgb(240,244,247)">
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>我的空间</template>
            <el-menu-item-group class="bg-color">
                <el-menu-item index="/user/home"><i class="el-icon-tickets"></i>全部文件</el-menu-item>
                <el-menu-item index="/files/to/picture/page"><i class="el-icon-picture"></i>图片</el-menu-item>
                <el-menu-item index="/files/to/document/page"><i class="el-icon-document"></i>文档</el-menu-item>
                <el-menu-item index="/files/to/music/page"><i class="el-icon-service"></i>音乐</el-menu-item>
                <el-menu-item index="/files/to/video/page"><i class="el-icon-view"></i>视频</el-menu-item>
                <el-menu-item index="/files/to/other/page"><i class="el-icon-more"></i>其他</el-menu-item>
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
