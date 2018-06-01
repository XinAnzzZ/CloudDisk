<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/4
  Time: 16:17
  To change this template use File | Settings | File Templates.
--%>
<%--@elvariable id="fileId" type="java.lang.Integer"--%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<div id="divId">
    <el-container>
        <el-form :model="renameForm" status-icon ref="renameForm" style="margin-right: auto;margin-left: auto">
            <el-form-item prop="fileId">
                <el-input type="hidden" v-model="renameForm.fileId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item lable="" prop="filename">
                <el-input type="text" v-model="renameForm.filename" auto-complete="off"
                          placeholder="请输入新名称"></el-input>
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
            renameForm: {
                filename: '',
                fileId: '${fileId}'
            }
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            },
            confirm: function () {
                if (formData.filename === "") {
                    app.$message({
                        message: '请输入新文件（夹）名称！',
                        //弹窗存在的时间，单位毫秒,
                        center: true,
                        duration: 1000,
                        type: 'error'
                    });
                } else {
                    $.ajax({
                        type: 'post',
                        data: formData,
                        url: '/files/rename',
                        success: function (data) {
                            // app.$message({
                            //     message: data.msg,
                            //     type: 'success'
                            // });
                            parent.renameMsg(data.msg);
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
            formData = this.renameForm;
        }
    });
</script>
</body>
</html>
