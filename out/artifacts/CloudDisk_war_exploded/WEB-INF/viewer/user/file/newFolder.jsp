<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/3/26
  Time: 0:29
  To change this template use File | Settings | File Templates.
--%>
<jsp:useBean id="fatherId" scope="request" type="java.lang.Integer"/>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<div id="divId">
    <el-container>
        <el-form :model="newFolderForm" status-icon ref="newFolderForm" style="margin-right: auto;margin-left: auto">
            <el-form-item prop="fatherId">
                <el-input type="hidden" v-model="newFolderForm.fatherId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item lable="文件夹名称" prop="folderName">
                <el-input type="text" v-model="newFolderForm.folderName" auto-complete="off"
                          placeholder="请输入文件夹名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="confirm">确认</el-button>
                <el-button type="danger" size="medium" plain @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</div>
<script type="application/javascript">
    let index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    let formData;
    let app = new Vue({
        el: '#divId',
        data: {
            newFolderForm: {
                folderName: '',
                fatherId: '${fatherId}'
            }
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            },
            confirm: function () {
                if (formData.folderName === "") {
                    app.$message({
                        message: '请输入文件夹名称',
                        //弹窗存在的时间，单位毫秒,
                        center: true,
                        duration: 1000,
                        type: 'error'
                    });
                } else {
                    $.ajax({
                        type: 'post',
                        data: formData,
                        url: '/user/new/folder',
                        success: function () {
                            parent.msg();
                            parent.layer.close(index);
                        }
                    });
                }
            },
            cancel: function () {
                parent.layer.close(index);
            }
        },
        mounted: function () {
            formData = this.newFolderForm;
        }
    });
</script>
</body>
</html>
