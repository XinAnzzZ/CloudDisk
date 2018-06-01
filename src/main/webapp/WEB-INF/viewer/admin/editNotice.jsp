<jsp:useBean id="notice" scope="request" type="com.java.myh.cloud.core.entity.Notice"/>
<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/10
  Time: 18:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>后台管理</title>
</head>
<body>
<div>
    <div id="content" style="width: 90%;margin-left: auto;margin-right: auto">
        <el-form :model="contentForm" ref="contentForm">
            <el-form-item label="公告标题" prop="title">
                <el-input v-model="contentForm.title" placeholder="长度限制20个字符"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" prop="content">
                <el-input type="textarea" :rows="10" v-model="contentForm.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="modify">更新</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
<script type="text/javascript">
    let index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    let formData;
    let app = new Vue({
        el: "#content",
        data: {
            contentForm: {
                id: "${notice.id}",
                title: "${notice.noticeName}",
                content: "${notice.content}"
            }
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path)
            },
            modify() {
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
                    url: '/admin/edit/notice',
                    success: function () {
                        app.$message({message: "更新成功！", type: "success"});
                        setTimeout(function () {
                            parent.layer.close(index);
                        }, 1000);
                    }
                })
            },
            cancel() {
                parent.layer.close(index);
            }
        },
        mounted: function () {
            formData = this.contentForm;
        }
    });
</script>
</body>
</html>
