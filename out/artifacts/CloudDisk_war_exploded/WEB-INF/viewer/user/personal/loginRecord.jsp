<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/4
  Time: 18:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>登录日志</title>
</head>
<body>
<div id="record">
    <el-container style="height: 100%">
        <%@ include file="/WEB-INF/viewer/user/common/menu.jsp" %>
        <el-container>
            <%@ include file="/WEB-INF/viewer/user/common/header.jsp" %>
            <el-main>
                <el-form :model="recordForm" status-icon ref="recordForm" label-width="100px" :inline="true"
                         class="demo-form-inline">
                    <el-form-item label="开始时间">
                        <el-form-item prop="loginDateStart">
                            <el-date-picker type="datetime" v-model="recordForm.loginDateStart"
                                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-form-item prop="loginDateEnd">
                            <el-date-picker type="datetime" v-model="recordForm.loginDateEnd"
                                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                        </el-form-item>
                        <el-button type="primary" @click="submitForm()">查询</el-button>
                    </el-form-item>
                </el-form>
                <table id="JustATable"></table>
            </el-main>
        </el-container>
    </el-container>
</div>
<script type="application/javascript">
    let formData;
    let dataTable;
    new Vue({
        el: "#record",
        data: {
            recordForm: {
                loginDateStart: "",
                loginDateEnd: ""
            },
            activeIndex: "/user/login/record"
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            },
            submitForm() {
                dataTable.ajax.reload();
            }
        },
        mounted: function () {
            formData = this.recordForm;
        }
    });
    $(function () {
        dataTable = $('#JustATable').DataTable({
            ajax: {
                url: "/user/login/record/data",
                type: "post",
                data: function (data) {
                    $.extend(data, formData);
                }
            },
            processing: true,
            order: [[3, 'desc']],
            paging: true,
            iDisplayLength: 10,
            pagingType: "full_numbers",
            serverSide: true,
            bSort: true,
            ordering: true,
            autoWidth: true,
            scrollCollapse: true,
            columns: [
                {
                    title: "序号", data: null, bSortable: false, width: '100px',
                    render: function (data, type, row, meta) {
                        let startIndex = meta.settings._iDisplayStart;
                        return startIndex + meta.row + 1;
                    }
                },
                {
                    title: "登录IP", data: "ip"
                },
                {
                    title: "参考地", data: "loginLocation"
                },
                {
                    title: "登录日期", data: "loginDate",
                    render: function (data) {
                        return new Date(data).Format("yyyy-MM-dd hh:mm:ss");
                    }
                }
            ]
        });
    });
</script>
</body>
</html>
