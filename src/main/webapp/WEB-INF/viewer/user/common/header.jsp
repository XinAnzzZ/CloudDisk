<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/1/8 0008
  Time: 1:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<jsp:useBean id="user" scope="request" type="com.java.myh.cloud.core.entity.User"/>
<el-header class="bg-color" style="height: 61px;    text-align: right">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal"
             style="background-color: rgb(240, 244, 247)">
        <el-menu-item index="1" style="background-color: rgb(240, 244, 247);">我的网盘</el-menu-item>
        <el-menu-item index="/files/share/list/page" style="background-color: rgb(240, 244, 247);"><a
                href="${pageContext.request.contextPath}/files/share/list/page">我的分享</a></el-menu-item>
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
    </el-menu>
</el-header>
