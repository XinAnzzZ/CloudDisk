<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/5/4
  Time: 16:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>其他</title>
</head>
<body>
<div id="other">
    <el-container style="height: 100%">
        <%@ include file="/WEB-INF/viewer/user/common/menu.jsp" %>
        <el-container>
            <%@ include file="/WEB-INF/viewer/user/common/header.jsp" %>
            <el-main>
                <div style="margin-top: 5%;">
                    <table id="tableId"></table>
                </div>
            </el-main>
        </el-container>
    </el-container>
</div>
<script type="text/javascript">
    let dataTables;
    new Vue({
        el: "#other",
        data: {
            activeIndex: "/files/to/other/page"
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            }
        }
    });

    $(function () {
        dataTables = $('#tableId').DataTable({
            ajax: {
                url: '/files/other/data',
                type: 'post',
            },
            processing: true,
            order: [[1, 'desc']],
            paging: true,
            iDisplayLength: 10,
            pagingType: "full_numbers",
            serverSide: true,
            bSort: true,
            ordering: true,
            autoWidth: true,
            scrollCollapse: false,
            columns: [
                {
                    title: "序号", data: null, bSortable: false, width: '30px',
                    render: function (data, type, row, meta) {
                        let startIndex = meta.settings._iDisplayStart;
                        return startIndex + meta.row + 1;
                    }
                },
                {
                    title: "文件名", data: 'fileName'
                },
                {
                    title: '文件大小', data: 'fileSize',
                    render: function (data) {
                        return calculateFilesSize(data);
                    }
                },
                {
                    title: '修改日期', data: 'modifyDate',
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
