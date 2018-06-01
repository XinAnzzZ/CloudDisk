<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/7
  Time: 14:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>公告列表</title>
</head>
<body>
<div id="notice">
    <el-container style="height: 100%">
        <%@ include file="/WEB-INF/viewer/user/common/menu.jsp" %>
        <el-container>
            <%@ include file="/WEB-INF/viewer/user/common/header.jsp" %>
            <el-main>
                <el-form :model="noticeForm" status-icon ref="noticeForm" label-width="100px" :inline="true"
                         class="demo-form-inline">
                    <el-form-item label="标题" prop="noticeName">
                        <el-input v-model="noticeForm.noticeName"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-form-item prop="startDate">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                                            v-model="noticeForm.startDate"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-form-item prop="endDate">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                                            v-model="noticeForm.endDate"></el-date-picker>
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
    let dataTable;
    new Vue({
        el: "#notice",
        data: {
            noticeForm: {
                noticeName: "",
                startDate: "",
                endDate: ""
            },
            activeIndex: "/user/to/notice/page"
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

    $(function () {
        dataTable = $('#JustATable').DataTable({
            ajax: {
                url: "/user/notice/data",
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
                    title: "发布人", data: "user.username"
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
            area: ['600px', '400px'],
            content: ["/user/notice/content/page?noticeId=" + id, 'no']
        });
    }
</script>
</body>
</html>
