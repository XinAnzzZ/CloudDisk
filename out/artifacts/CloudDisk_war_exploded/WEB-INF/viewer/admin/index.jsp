<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/8
  Time: 13:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>后台管理</title>
</head>
<body>
<div id="index">
    <el-container style="height: 100%">
        <%@include file="common/menu.jsp" %>
        <el-container>
            <%@include file="common/header.jsp" %>
            <el-main>
                <div>
                    <el-form :model="userListForm" ref="userListForm" :inline="true" class="demo-form-inline">
                        <el-form-item label="用户名">
                            <el-input v-model="userListForm.username" placeholder="请输入用户名关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="userListForm.status" clearable placeholder="请选择用户状态">
                                <el-option label="正常" value="Normal"></el-option>
                                <el-option label="冻结" value="Disabled"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="startDate" label="注册时间">
                            <el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss"
                                            v-model="userListForm.startDate" placeholder="起始时间"></el-date-picker>
                        </el-form-item>
                        <el-form-item prop="endDate">
                            <el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss"
                                            v-model="userListForm.endDate" placeholder="终止时间"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="search()">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" plain @click="unfreeze()">解冻</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" plain @click="freeze()">冻结</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div>
                    <table id="tableId">
                        <thead class="text-center">
                        <tr>
                            <th>
                                <input id="selectAllInput" type="checkbox" class=".checkall" onclick="selectAll()"
                                       title=""/>
                            </th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </el-main>
        </el-container>
    </el-container>
</div>
<script type="text/javascript">
    let formData;
    // let userIds = getSelectedIds();
    let app = new Vue({
        el: "#index",
        data: {
            userListForm: {
                username: "",
                status: "",
                startDate: "",
                endDate: "",
            },
            activeIndex: "/admin/index"
        },
        methods: {
            jumpToPath: function (p) {
                jumpToPage(p);
            },
            search() {
                dataTable.ajax.reload();
            },
            freeze() {
                let userIds = getSelectedIds();
                if (userIds.length === 0 || userIds === undefined) {
                    app.$message.error("请选择你要冻结的用户！");
                    return;
                }
                layer.confirm("确定要冻结已选择的全部用户吗？", {
                    btn: ["确认", "取消"]
                }, function () {
                    $.ajax({
                        type: "post",
                        data: {userIds: userIds},
                        url: "/admin/freeze/user",
                        success: function () {
                            layer.closeAll('dialog');
                            app.$message({message: "成功！", type: "success"});
                            dataTable.ajax.reload();
                        }
                    });
                });
            },
            unfreeze() {
                let userIds = getSelectedIds();
                if (userIds.length === 0 || userIds === undefined) {
                    app.$message.error("请选择你要解冻的用户！");
                    return;
                }
                layer.confirm("确定要解冻已选择的全部用户吗？", {
                    btn: ["确认", "取消"]
                }, function () {
                    $.ajax({
                        type: "post",
                        data: {userIds: userIds},
                        url: "/admin/unfreeze/user",
                        success: function () {
                            layer.closeAll('dialog');
                            app.$message({message: "成功！", type: "success"});
                            dataTable.ajax.reload();
                        }
                    });
                });
            }
        },
        mounted: function () {
            formData = this.userListForm;
        }
    });
    let dataTable;
    $(function () {
        dataTable = $('#tableId').DataTable({
            ajax: {
                url: "/admin/index/data",
                type: "post",
                data: function (data) {
                    $.extend(data, formData);
                }
            },
            processing: true,
            order: [[2, 'asc']],
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
                    sClass: "text-center",
                    width: '80px',
                    data: "id",
                    render: function (data) {
                        return '<input type="checkbox"  class="check-child"  value="' + data + '" />';
                    },
                    "bSortable": false
                },
                {
                    title: "序号", data: null, bSortable: false, width: '30px',
                    render: function (data, type, row, meta) {
                        let startIndex = meta.settings._iDisplayStart;
                        return startIndex + meta.row + 1;
                    }
                },
                {
                    title: "用户名", data: "username"
                },
                {
                    title: "注册时间", data: "createDate",
                    render: function (data) {
                        return new Date(data).Format("yyyy-MM-dd hh:mm:ss");
                    }
                },
                {
                    title: "状态", data: "status",
                    render: function (data) {
                        if (data === "Normal") {
                            return "正常";
                        }
                        return "<span style='color: red'>冻结</span>";
                    }
                },
                {
                    title: "邮箱", data: "email"
                }
            ]
        });
    });
</script>
</body>
</html>
