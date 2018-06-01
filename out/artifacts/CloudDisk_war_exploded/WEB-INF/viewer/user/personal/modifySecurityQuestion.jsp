<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/9
  Time: 17:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<div id="modify">
    <div style="margin-top: 50px;margin-left: 5%;margin-right: 5%">
        <el-form :model="modifyForm" ref="modifyForm" label-width="80px">
            <el-form-item label="问题一" prop="questionOne">
                <el-input v-model="modifyForm.questionOne" disabled></el-input>
            </el-form-item>
            <el-form-item label="答案" prop="answerOne">
                <el-input v-model="modifyForm.answerOne"></el-input>
            </el-form-item>
            <el-form-item label="问题二" prop="questionTwo">
                <el-input v-model="modifyForm.questionTwo" disabled></el-input>
            </el-form-item>
            <el-form-item label="答案" prop="answerTwo">
                <el-input v-model="modifyForm.answerTwo"></el-input>
            </el-form-item>
            <el-form-item label="问题三" prop="questionThree">
                <el-input v-model="modifyForm.questionThree" disabled></el-input>
            </el-form-item>
            <el-form-item label="答案" prop="answerThree">
                <el-input v-model="modifyForm.answerThree"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">确定</el-button>
                <el-button type="primary" plain @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
<script type="text/javascript">
    let index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    let formData;
    let app = new Vue({
        el: "#modify",
        data: {
            modifyForm: {
                questionOne: "我的生日是哪天？",
                answerOne: "",
                questionTwo: "我父亲的名字是什么？",
                answerTwo: "",
                questionThree: "我的学号是多少？",
                answerThree: ""
            }
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            },
            submitForm() {
                if (this.answerOne === "" || this.answerTwo === "" || this.answerThree === "") {
                    this.$message.error("密保答案不能为空！");
                    return;
                }
                $.ajax({
                    type: 'post',
                    data: formData,
                    url: '/user/modify/security/question',
                    success: function () {
                        app.$message({message: "恭喜您，修改成功！", type: "success"})
                    }
                });
            },
            cancel() {
                parent.layer.close(index);
            }
        },
        mounted: function () {
            formData = this.modifyForm;
        }
    })
</script>
</body>
</html>
