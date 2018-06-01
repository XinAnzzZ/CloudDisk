<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/11
  Time: 15:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>play</title>
</head>

<body>
<div id="profile">
    <el-container style="height: 100%">
        <%@ include file="/WEB-INF/viewer/user/common/menu.jsp" %>
        <el-container>
            <%@ include file="/WEB-INF/viewer/user/common/header.jsp" %>
            <el-main style="height: 600px">
                <h1 align="center" style="margin-top: 5%;color: #2aabd2">既然来了，就玩一会吧~~~</h1>
                <video controls="controls">
                    <source src="${pageContext.request.contextPath}/files/video/player/60" type="video/mp4">
                </video>
            </el-main>
        </el-container>
    </el-container>
</div>
<script type="text/javascript">
    new Vue({
        el: "#profile",
        data: {
            activeIndex: "/user/just/play"
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            }
        }
    });
</script>
<script type="text/javascript" color="0,0,255" zindex="-1"
        opacity="2" count="99" src="${pageContext.request.contextPath}/statics/systemjs/canvas-nest.min.js"
        charset="utf-8">
</script>
</body>
</html>

