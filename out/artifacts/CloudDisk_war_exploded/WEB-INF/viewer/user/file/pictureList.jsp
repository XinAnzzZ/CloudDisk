<%--
  Created by IntelliJ IDEA.
  User: MIUI
  Date: 2018/4/27
  Time: 10:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>图片</title>
    <style type="text/css">
        .pic {
            width: 200px;
            height: 200px;
        }
    </style>
</head>
<body>
<div id="picture">
    <el-container style="height: 100%">
        <%@ include file="/WEB-INF/viewer/user/common/menu.jsp" %>
        <el-container>
            <%@ include file="/WEB-INF/viewer/user/common/header.jsp" %>
            <el-main>
                <div id="pictureDiv" class="layer-photos-demo">
                    <%--@elvariable id="pictureList" type="java.util.List"--%>
                    <c:forEach items="${pictureList}" var="item">
                        <%--@elvariable id="item" type="com.java.myh.cloud.core.entity.FilesDO"--%>
                        <img class="pic" src="/files/pic/${item.id}" layer-src="/files/pic/${item.id}"
                             alt="${item.fileName}">
                    </c:forEach>
                </div>
            </el-main>
        </el-container>
    </el-container>
</div>
<script type="text/javascript">
    new Vue({
        el: "#picture",
        data: {
            activeIndex: '/files/to/picture/page'
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            }
        }
    });

    layer.ready(function () { //为了layer.ext.js加载完毕再执行
        layer.photos({
            photos: '#pictureDiv'
            , shift: 5 //0-6的选择，指定弹出图片动画类型，默认随机
        });
    });
</script>
</body>
</html>
