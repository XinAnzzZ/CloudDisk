<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/5/18
  Time: 10:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<jsp:useBean id="id" scope="request" type="java.lang.Integer"/>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<div style="text-align: center;">
    <img src="${pageContext.request.contextPath}/statics/img/music_sunqiao.jpg" width="550px">
    <audio controls="controls">
        Your browser does not support the audio element.
    </audio>
</div>
<script type="application/javascript">
    $(function () {
        $.ajax({
            url: "/files/video/player/${id}",
            type: 'post',
            success: function (data) {
                if (data.success) {
                    let location = data.msg;
                    let one = location.substring(0, 1);
                    let two = location.substring(2, 3);
                    let fileName = location.substring(4, location.length);
                    let src = "/shareFolder/" + one + "/" + two + "/" + fileName;
                    $("audio").attr("src", src);
                }
            }
        });
    });
</script>
</body>
</html>
