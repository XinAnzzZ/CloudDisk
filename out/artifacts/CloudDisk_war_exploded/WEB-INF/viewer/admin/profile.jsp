<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/10
  Time: 17:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>后台管理</title>
</head>
<body>
<div id="profile">
    <el-container style="height: 100%">
        <%@ include file="/WEB-INF/viewer/admin/common/menu.jsp" %>
        <el-container>
            <%@ include file="/WEB-INF/viewer/admin/common/header.jsp" %>
            <el-main>
                <el-form ref="profileForm" :model="profileForm" label-width="80px" disabled style="margin-left: 5%;margin-top: 3%">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="profileForm.username" :disabled="true" style="width: 20%"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="profileForm.email" :disabled="true" style="width: 20%"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" prop="createDate">
                        <el-input v-model="profileForm.createDate" :disabled="true" style="width: 20%"></el-input>
                    </el-form-item>
                    <el-form-item label="全部空间" prop="totalCapacity">
                        <el-input v-model="profileForm.totalCapacity" :disabled="true" style="width: 20%"></el-input>
                    </el-form-item>
                    <el-form-item label="已用空间" prop="usedCapacity">
                        <el-input v-model="profileForm.usedCapacity" :disabled="true" style="width: 20%"></el-input>
                    </el-form-item>
                    <el-form-item label="剩余空间" prop="availableCapacity">
                        <el-input v-model="profileForm.availableCapacity" :disabled="true" style="width: 20%"></el-input>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </el-container>
</div>
<script type="text/javascript">
    let formData;
    new Vue({
        el: "#profile",
        data: {
            profileForm: {
                username: "${user.username}",
                email: "${user.email}",
                createDate: "<fmt:formatDate value='${user.createDate}' pattern='yyyy-MM-dd HH:mm:ss'/>",
                totalCapacity: "${user.totalCapacity}",
                usedCapacity: "${user.usedCapacity}",
                availableCapacity: "${user.availableCapacity}"
            },
            activeIndex: "/admin/personal/profile"
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            }
        },
        mounted: function () {
            formData = this.profileForm;
        }
    });
    $(function () {
        formData.totalCapacity = calculateFilesSize(formData.totalCapacity);
        formData.usedCapacity = calculateFilesSize(formData.usedCapacity);
        formData.availableCapacity = calculateFilesSize(formData.availableCapacity);
    });
</script>
</body>
</html>
