<jsp:useBean id="fileId" scope="request" type="java.lang.Integer"/>
<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/1
  Time: 20:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<div id="sharePage">
    <el-container>
        <el-form :model="shareForm"
                 ref="shareForm"
                 status-icon
                 class="demo-ruleForm"
                 style="margin-right: auto;margin-left: auto;margin-top: 10px">
            <el-col :xl="0" :span="0">
                <el-form-item prop="fileId">
                    <el-input type="hidden" v-model="shareForm.fileId" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-form-item label="有效期">
                <el-select v-model="shareForm.termOfValidity" placeholder="请选择分享文件有效期">
                    <el-option label="七天" value="SEVEN_DAY"></el-option>
                    <el-option label="十五天" value="FIFTEEN_DAY"></el-option>
                    <el-option label="三十天" value="ONE_MONTH"></el-option>
                    <el-option label="永久" value="FOREVER"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分享形式">
                <el-radio-group v-model="shareForm.isEncrypt">
                    <el-radio label="加密"></el-radio>
                    <el-radio label="共开"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="createLink(shareForm)">创建链接</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</div>
<script type="application/javascript">
    let index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    let shareFormData;
    new Vue({
        el: "#sharePage",
        data: {
            shareForm: {
                fileId: "${fileId}",
                termOfValidity: "",
                isEncrypt: "加密",
            },
            activeIndex: "/files/share/page"
        },
        methods: {
            createLink() {
                if (shareFormData.termOfValidity === "") {
                    this.$message({
                        message: "请选择有效期",
                        type: 'error'
                    });
                    return;
                }
                $.ajax({
                    type: "post",
                    url: "/files/share/file",
                    data: shareFormData,
                    success: function (data) {
                        let sign = data.data;
                        let password = data.msg;
                        $("#sharePage").remove();
                        changePageContent(sign, password);
                    }
                });
            },
            cancel() {
                parent.layer.close(index);
            }
        },
        mounted: function () {
            shareFormData = this.shareForm;
        }
    });

    //当用户点击创建链接之后通过jquery来对页面进行改变
    function changePageContent(sign, password) {
        let link = window.location.host + "/files/share/link/sign/" + sign;
        let body_div = $("<div></div>").appendTo("body");
        $("<div style='margin-left: 10px;color: rgb(241, 37, 84);margin-top: 20px'>创建加密链接成功，复制链接分享给您的好友吧！</div>").appendTo(body_div);
        let div_div_sign = $("<div style='margin-top: 30px;margin-left: 15%'></div>").appendTo(body_div);
        $("<input id='signInput' readonly value='" + link + "'/>").css("width", "80%").addClass("form-control").appendTo(div_div_sign);
        if (password !== "") {
            let div_div_password = $("<div style='margin-top: 30px;margin-left: 15%'><div>").appendTo(body_div);
            $("<input id='passwordInput' readonly value='" + password + "'/>").css("width", "80%").addClass("form-control").appendTo(div_div_password);
        }
        let div_div_btn = $("<div style='margin-left: 30%;margin-top: 30px'></div>").appendTo(body_div);
        $("<input/>").attr({
            id: "copyInput",
            type: "button",
            class: "btn btn-success",
            value: "复制链接",
            onclick: "copyLink()"
        }).appendTo(div_div_btn);
        $("<input/>").attr({
            type: "button",
            class: "btn btn-default",
            value: "取消",
            onclick: "cancel()",
            style: "margin-left: 20px;"
        }).appendTo(div_div_btn);
    }

    //复制链接
    let flag = false;

    function copyLink() {
        if (flag) {
            return;
        }
        flag = true;
        let signInput = $("#signInput");
        let link = signInput.val();
        let password = $("#passwordInput").val();
        let copyContent = "链接：" + link;
        if (password !== undefined) {
            copyContent = copyContent + "  密码:" + password;
        }
        signInput.val(copyContent);
        signInput.select();
        document.execCommand("copy");
        layer.msg("复制链接成功", {icon: 1});
    }

    //取消
    function cancel() {
        parent.layer.close(index);
    }
</script>
</body>
</html>
