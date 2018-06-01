<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
    <title>快云网盘-<sitemesh:title/></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <meta http-equiv="Cache-Control" content="no-store"/>
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Expires" content="0"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <%-- 加入标题栏的小图标 --%>
    <link href="${pageContext.request.contextPath}/statics/img/cloud_disk.ico" type="image/x-icon" rel="shortcut icon"/>
    <%-- import js and css static files --%>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/vue/vue.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/vue/vue-resource@1.3.4"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/vue/element/index.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/jquery/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/jquery/blockUI/2.70.0/jquery.blockUI.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/jQuery-dataTables/DataTables-1.10.15/js/jquery.dataTables.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/statics/jQuery-dataTables/DataTables-1.10.15/js/dataTables.bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/jQuery-dataTables/jQuery.dataTables.ext.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/layer/layer.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/layer/extend/layer.ext.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/systemjs/base.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/systemjs/common.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/layimext/layim.ext.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/statics/bootstrap/js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/statics/jQuery-dataTables/DataTables-1.10.15/css/jquery.dataTables.min.css"
          type="text/css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/statics/jQuery-dataTables/DataTables-1.10.15/css/dataTables.bootstrap.min.css"
          type="text/css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/statics/bootstrap/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/statics/vue/css/element.css" type="text/css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/statics/layui/css/layui.css" type="text/css">
    <%-- import js and css static files  end--%>
    <sitemesh:head/>
    <script type="application/javascript">
        function ranDomYzm() {
            $("#yzm").each(function (index, obj) {
                $(obj).attr("src", "/common/pub/getRandCode?" + Math.random());
            });
        }

        let ctxPath = "${ctx}";
        var _vds = _vds || [];
        window._vds = _vds;
        (function () {
            _vds.push(['setCS1', 'userId', '${user.id}']);
            _vds.push(['setCS2', 'userName', '${user.username}']);
        })();

        /**
         * 登出系统
         */
        function logout() {
            layer.confirm("您确认要退出吗?", {
                btn: ['确定', '取消']
            }, function () {
                window.location.href = "/logout";
            });
        }

        /**
         * 复选框实现全选
         */
        function selectAll() {
            let isCheck = $("#selectAllInput").is(':checked');  //获得全选复选框是否选中
            $("input[type='checkbox']").each(function () {
                this.checked = isCheck;       //循环赋值给每个复选框是否选中
            });
        }

        function jumpToPage(url) {
            window.location.href = url;
        }

        $(function () {
            if (window.location.href.indexOf("/login") <= 0 && (window.location.href.indexOf("/order/pay/page")) <= 0) {
                setInterval(function () {
                    var heightVar = $(window).height();
                    $("body").css("height", heightVar);
                    $("#app").css("height", heightVar);
                }, 500);
            }
        });

        //计算文件大小
        function calculateFilesSize(size) {
            if (size == "-") {
                return size;
            }
            var fileSize = size.substring(0, size.indexOf("B"));
            if (fileSize < 1024) {
                return size;
            }
            if (fileSize < 1024 * 1024) {
                fileSize = fileSize / 1024;
                return fileSize.toFixed(2) + "KB";
            }
            if (fileSize < 1024 * 1024 * 1024) {
                fileSize = fileSize / (1024 * 1024);
                return fileSize.toFixed(2) + "MB";
            }
            fileSize = fileSize / (1024 * 1024 * 1024);
            return fileSize.toFixed(2) + "GB";
        }

        //返回选中用户进行批量操作得到的用户id组成的字符串
        function getSelectedIds() {
            let ids = [];
            $("tbody>tr>td>input[type='checkbox']:checked").each(function (index, obj) {
                ids.push($(obj).val());
            });
            return ids;
        }
    </script>
    <style>
        .el-col {
            border-radius: 4px;
        }

        .grid-content {
            border-radius: 4px;
            min-height: 36px;
        }

        body {
            margin: 0 0 0 0;
            padding: 0 0 0 0;
            height: 100%;
        }

        #app {
            height: 100%;
        }

        table {
            text-align: center;
        }

        a {
            color: black;
        }

        table > thead > tr > th {
            text-align: center;
        }

        table.dataTable thead .sorting,
        table.dataTable thead .sorting_asc,
        table.dataTable thead .sorting_desc {
            background-image: none;
        }
    </style>
</head>
<body>
<sitemesh:body/>
</body>
</html>