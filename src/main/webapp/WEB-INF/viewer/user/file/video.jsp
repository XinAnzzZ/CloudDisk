<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/27
  Time: 16:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<jsp:useBean id="id" scope="request" type="java.lang.Integer"/>
<!DOCTYPE html>
<html>
<head>
    <title>视频播放</title>
</head>
<body>
<div style="text-align: center;">
    <video controls="controls" preload width="75%" style="margin-top: 50px">
        Your browser does not support the video tag.
    </video>
</div>
<script type="application/javascript">
    $(function () {
        $.ajax({
            url: "/files/video/player/${id}",
            type: 'post',
            success: function (data) {
                if (data.success) {
                    let location = data.message;
                    let one = location.substring(0, 1);
                    let two = location.substring(2, 3);
                    let fileName = location.substring(4, location.length);
                    let src = "/shareFolder/" + one + "/" + two + "/" + fileName;
                    $("video").attr("src", src);
                }
            }
        });
    });
</script>
</body>
</html>
