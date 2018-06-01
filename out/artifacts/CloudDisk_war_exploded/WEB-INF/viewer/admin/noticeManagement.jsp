<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/10
  Time: 17:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>后台管理</title>
</head>
<body>
<div id="notice">
    <el-container style="height: 100%">
        <%@ include file="/WEB-INF/viewer/admin/common/menu.jsp" %>
        <el-container>
            <%@ include file="/WEB-INF/viewer/admin/common/header.jsp" %>
            <el-main>
                <el-form :model="noticeForm" status-icon ref="noticeForm" label-width="100px" :inline="true"
                         class="demo-form-inline">
                    <el-form-item label="标题" prop="noticeName">
                        <el-input v-model="noticeForm.noticeName" placeholder="请输入标题关键字"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-form-item prop="startDate">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                                            v-model="noticeForm.startDate" placeholder="请选择开始时间"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-form-item prop="endDate">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                                            v-model="noticeForm.endDate" placeholder="请选择结束时间"></el-date-picker>
                        </el-form-item>
                        <el-button type="primary" @click="submitForm()">查询</el-button>
                    </el-form-item>
                </el-form>
                <table id="JustATable">
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
                        <th></th>
                    </tr>
                    </thead>
                </table>
            </el-main>
        </el-container>
    </el-container>
</div>
<script type="text/javascript">
    let formData;
    let app = new Vue({
        el: "#notice",
        data: {
            noticeForm: {
                noticeName: "",
                startDate: "",
                endDate: ""
            },
            activeIndex: "/admin/notice/management"
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
            formData = this.noticeForm;
        }
    });

    let dataTable;
    $(function () {
        dataTable = $('#JustATable').DataTable({
            ajax: {
                url: "/admin/notice/data",
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
                    title: "标题", data: "noticeName",
                    render: function (data, type, row) {
                        return '<button class="btn btn-link" onclick="openNotice(' + row.id + ')">' + data + '</button>'
                    }
                },
                {
                    title: "发布日期", data: "createDate",
                    render: function (data) {
                        return new Date(data).Format("yyyy-MM-dd hh:mm:ss");
                    }
                },
                {
                    title: "是否已删除", data: "isDelete",
                    render: function (data) {
                        if (data === "YES") {
                            return "<span style='color: red'>已删除</sapn>";
                        } else {
                            return "未删除";
                        }
                    }
                },
                {
                    title: "发布人", data: "user.username"
                },
                {
                    title: "操作", data: "isDelete",
                    render: function (data, type, row) {
                        if (data === "NO") {
                            return "<button class='layui-btn layui-btn-radius layui-btn-danger' onclick='deleteNotice(" + row.id + ")'>删除</button>";
                        } else {
                            return "<button class='layui-btn layui-btn-radius layui-btn-normal' onclick='cancelDelete(" + row.id + ")'>取消</button>";
                        }
                    }
                }
            ]
        });
    });

    //打开公告详情页面
    function openNotice(id) {
        layer.open({
            type: 2,
            title: '公告详情',
            scrollbar: false,
            area: ['600px', '500px'],
            content: ["/user/notice/content/page?noticeId=" + id, 'no'],
            end: function () {
                dataTable.ajax.reload();
            }
        });
    }

    //删除公告
    function deleteNotice(id) {
        layer.confirm("确定删除该条公告吗？", {
            btn: ["确认", "取消"]
        }, function () {
            $.ajax({
                type: "post",
                data: {id: id},
                url: "/admin/delete/notice",
                success: function () {
                    layer.closeAll('dialog');
                    app.$message({message: "已删除！", type: "success"});
                    dataTable.ajax.reload();
                }
            });
        });
    }

    //取消删除
    function cancelDelete(id) {
        layer.confirm("确定取消删除该条公告吗？", {
            btn: ["确认", "取消"]
        }, function () {
            $.ajax({
                type: "post",
                data: {id: id},
                url: "/admin/cancel/delete",
                success: function () {
                    layer.closeAll('dialog');
                    app.$message({message: "成功！", type: "success"});
                    dataTable.ajax.reload();
                }
            });
        });
    }
</script>
</body>
</html>
