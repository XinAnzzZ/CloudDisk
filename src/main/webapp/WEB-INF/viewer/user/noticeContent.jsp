<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/7
  Time: 18:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<div>
    <h3 align="center" style="margin-top: 20px">${notice.noticeName}</h3>
    <div style="margin: 20px;"></div>
    <div id="content" style="width: 90%;margin-left: auto;margin-right: auto">
        <el-form :model="contentForm" ref="contentForm">
            <el-form-item label="公告内容" prop="content">
                <el-input type="textarea" :rows="10" v-model="contentForm.content" readonly></el-input>
            </el-form-item>
        </el-form>
    </div>
</div>
<script type="text/javascript">
    new Vue({
        el: "#content",
        data: {
            contentForm: {
                content: "${notice.content}"
            },
            activeIndex: "/user/notice/content/page"
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path)
            }
        }
    });
</script>
</body>
</html>
