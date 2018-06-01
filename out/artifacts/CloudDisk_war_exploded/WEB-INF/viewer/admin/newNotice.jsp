<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/18
  Time: 15:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>后台管理</title>
</head>
<body>
<div id="app">
    <el-container style="height: 100%">
        <%@include file="common/menu.jsp" %>
        <el-container>
            <%@include file="common/header.jsp" %>
            <el-main>
                <h2 align="center">发布公告</h2>
                <div id="content" style="width: 90%;margin-left: auto;margin-right: auto">
                    <el-form :model="contentForm" ref="contentForm">
                        <el-form-item label="公告标题" prop="title">
                            <el-input v-model="contentForm.title" placeholder="长度限制20个字符"></el-input>
                        </el-form-item>
                        <el-form-item label="公告内容" prop="content">
                            <el-input type="textarea" :rows="10" v-model="contentForm.content"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="send()">发布</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </el-container>
</div>
<script type="text/javascript">
    let formData;
    let app = new Vue({
        el: "#app",
        data: {
            contentForm: {
                title: "",
                content: ""
            },
            activeIndex: "/admin/new/notice/page"
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            },
            send() {
                if (formData.title === "" || formData.content === "") {
                    this.$alert('标题或者内容不能为空', '提示', {
                        confirmButtonText: '确定'
                    });
                    return;
                }
                if (formData.title.length > 20) {
                    this.$alert('标题长度过长', '提示', {
                        confirmButtonText: '确定'
                    });
                    return;
                }
                $.ajax({
                    type: 'post',
                    data: formData,
                    url: '/admin/publish/notice',
                    success: function () {
                        app.$message({message: "发布成功！", type: "success"});
                        setTimeout(function () {
                            formData.title = '';
                            formData.content = '';
                        }, 1000);
                    }
                })
            }
        },
        mounted: function () {
            formData = this.contentForm;
        }
    });
</script>
</body>
</html>
