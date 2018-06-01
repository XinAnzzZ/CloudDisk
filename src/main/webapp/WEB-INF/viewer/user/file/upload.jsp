<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/3/24
  Time: 20:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<div id="upload">
    <el-container>
        <el-upload class="upload-demo" drag
                   style="margin-right: auto;margin-left: auto;margin-top: 10px"
                   action="/user/upload"
                   :limit="10"
                   :on-preview="handlePreview"
                   :on-exceed="handleExceed"
                   :on-success="handleSuccess"
                   multiple
                   :file-list="file">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
    </el-container>
</div>
<script>
    var app = new Vue({
        el: "#upload",
        data: {
            file: [],
            activeIndex: "/user/upload/page"
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                <%--this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);--%>
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleSuccess(data) {
                if (data.success) {
                    this.$message({
                        message: data.msg,
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: data.msg,
                        type: 'error'
                    });
                }
            }
        }
    });
</script>
</body>
</html>
