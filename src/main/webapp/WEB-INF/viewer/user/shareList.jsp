<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/7
  Time: 20:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>分享列表</title>
</head>
<body>
<div id="shareList">
    <el-container style="height: 100%">
        <%@ include file="/WEB-INF/viewer/user/common/menu.jsp" %>
        <el-container>
            <%@ include file="/WEB-INF/viewer/user/common/header.jsp" %>
            <el-main>
                <el-form :model="shareListForm" status-icon ref="shareListForm" label-width="100px" :inline="true"
                         class="demo-form-inline">
                    <el-form-item label="标题" prop="noticeName">
                        <el-input v-model="shareListForm.noticeName"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-form-item prop="startDate">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                                            v-model="shareListForm.startDate"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-form-item prop="endDate">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                                            v-model="shareListForm.endDate"></el-date-picker>
                        </el-form-item>
                        <el-button type="primary" @click="submitForm()">查询</el-button>
                    </el-form-item>
                </el-form>
                <table id="JustATable"></table>
            </el-main>
        </el-container>
    </el-container>
</div>
<script type="text/javascript">
    let formData;
    let app = new Vue({
        el: "#shareList",
        data: {
            shareListForm: {
                noticeName: "",
                startDate: "",
                endDate: ""
            },
            activeIndex: "/files/share/list/page"
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
            formData = this.shareListForm;
        }
    });

    let dataTable;
    $(function () {
        dataTable = $('#JustATable').DataTable({
            ajax: {
                url: "/files/share/list/data",
                type: "post",
                data: function (data) {
                    $.extend(data, formData);
                }
            },
            processing: true,
            order: [[2, 'desc']],
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
                    title: "序号", data: null, bSortable: false, width: '30px',
                    render: function (data, type, row, meta) {
                        let startIndex = meta.settings._iDisplayStart;
                        return startIndex + meta.row + 1;
                    }
                },
                {
                    title: "文件名称", data: "files.fileName"
                },
                {
                    title: "分享日期", data: "shareDate",
                    render: function (data) {
                        return new Date(data).Format("yyyy-MM-dd hh:mm:ss");
                    }
                },
                {
                    title: "有效期", data: "termOfValidity",
                    render: function (data) {
                        if (data === "SEVEN_DAY") {
                            return "7天";
                        } else if (data === "FIFTEEN_DAY") {
                            return "15天";
                        } else if (data === "ONE_MONTH") {
                            return "30天";
                        } else {
                            return "永久";
                        }
                    }
                },
                {
                    title: "是否过期", data: "expiryDate",
                    render: function (data) {
                        if (new Date(data) > new Date() || data === "" || !data) {
                            return "未过期";
                        } else {
                            return "<span style='color: red'>已过期</span>";
                        }
                    }
                },
                {
                    title: "操作", data: "expiryDate",
                    render: function (data, type, row) {
                        if (new Date(data) > new Date() || data === "" || !data) {
                            return "<button class='btn btn-info' onclick='cancelShare(" + row.id + ")'>取消分享</button>";
                        } else {
                            return "<button class='btn btn-default' disabled>取消分享</button>";
                        }
                    }
                }
            ]
        });
    });

    //取消分享
    function cancelShare(id) {
        layer.confirm("确定取消分享吗？", {
            btn: ["确认", "取消"]
        }, function () {
            $.ajax({
                type: "post",
                data: {id: id},
                url: "/files/cancel/share",
                success: function () {
                    layer.closeAll('dialog');
                    app.$message({message: "已取消！", type: "success"});
                    dataTable.ajax.reload();
                }
            });
        });
    }
</script>
</body>
</html>
