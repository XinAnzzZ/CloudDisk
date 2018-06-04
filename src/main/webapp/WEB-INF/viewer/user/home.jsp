<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/1/31
  Time: 19:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>首页</title>
</head>
<body>
<div id="home">
    <el-container style="height: 100%">
        <%@ include file="/WEB-INF/viewer/user/common/menu.jsp" %>
        <el-container>
            <%@ include file="/WEB-INF/viewer/user/common/header.jsp" %>
            <el-main>
                <div>
                    <el-form :inline="true" :model="dataForm" ref="dataForm" class="demo-form-inline">
                        <el-form-item>
                            <el-button type="primary" size="medium" icon="el-icon-upload2" @click="openUploadPage">上传
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-tooltip class="item" effect="dark" content="暂时只提供单个文件下载哦~" placement="top-start">
                                <el-button type="primary" size="medium" plain icon="el-icon-download"
                                           @click="downloadFile">下载
                                </el-button>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item>
                            <el-tooltip class="item" effect="dark" content="暂时只提供单个文件分享哦~" placement="top-start">
                                <el-button type="primary" size="medium" plain icon="el-icon-share" @click="shareFiles">
                                    分享
                                </el-button>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" size="medium" round icon="el-icon-edit-outline"
                                       @click="newFolder">新建文件夹
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" size="medium" plain icon="el-icon-delete" @click="deleteFiles">删除
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="medium" plain icon="el-icon-edit" @click="rename">重命名
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="medium" plain icon="el-icon-rank" @click="moveTo">移动到
                            </el-button>
                        </el-form-item>
                        <el-form-item prop="fatherId">
                            <el-input v-model="dataForm.fatherId" id="fatherIdInput" type="hidden"></el-input>
                        </el-form-item>
                        <el-form-item prop="searchContent">
                            <el-input placeholder="请输入内容" v-model="dataForm.searchContent"
                                      style="width: 150px;margin-left: 10%" size="medium">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="medium" icon="el-icon-search" @click="search">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div>
                    <button id="allFileBtn" class="btn-link" onclick="toRootFolder()">全部文件</button>
                    <button id="goBackBtn" class="btn-link" onclick="goBack()">
                        <i class="el-icon-arrow-left"></i>上一级
                    </button>
                </div>
                <table id="FileListTable">
                    <thead class="text-center ">
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
                <input type="hidden" id="hiddenInput">
            </el-main>
        </el-container>
    </el-container>
</div>
<script type="application/javascript">
    let formData;
    let layer = parent.layer;
    let dataTable;
    let app = new Vue({
        el: "#home",
        data: {
            dataForm: {
                searchContent: "",
                fatherId: "",
            },
            activeIndex: "/user/home"
        },
        methods: {
            jumpToPath: function (path) {
                jumpToPage(path);
            },
            search: function () {
                dataTable.ajax.reload();
            },
            openUploadPage() {
                layer.open({
                    type: 2,
                    title: "上传文件",
                    scrollbar: false,
                    area: ['400px', '300px'],
                    content: "/user/upload/page?" + 'fatherId=' + $("#fatherIdInput").val(),
                    end: function () {
                        setTimeout(function () {
                            dataTable.ajax.reload();
                        }, 1500);
                    }
                });
            },
            newFolder() {
                let flag = false;
                layer.open({
                    type: 2,
                    title: "新建文件夹",
                    scrollbar: false,
                    area: ['400px', '280px'],
                    content: ["/user/new/folder/page?" + 'fatherId=' + $("#fatherIdInput").val(), 'no'],
                    end: function () {
                        setTimeout(function () {
                            if (flag) {
                                //这一步没什么用，就是为了消除msg方法没有被使用的警告。强迫症就这么倔强。
                                message();
                                renameMsg();
                            }
                            dataTable.ajax.reload();
                        }, 1000);
                    }
                });
            },
            downloadFile() {
                let fileId = getSelectedIds();
                if (fileId === undefined || fileId.length === 0) {
                    this.$message('老铁，请选择你要下载的文件！');
                    return;
                }
                if (fileId.length > 1) {
                    this.$message('不好意思老铁，暂不提供批量下载，请等待下个版本！');
                    return;
                }
                $.ajax({
                    data: {fileId: fileId.toString()},
                    url: '/user/check/file/is/folder',
                    success: function (data) {
                        if (data.success) {
                            window.location.href = "/user/file/download?fileId=" + fileId.toString();
                        } else {
                            app.$message('不好意思老铁，暂不提供整个文件夹下载，请等待下个版本！');
                        }
                    }
                });
            },
            deleteFiles() {
                let fileId = getSelectedIds();
                if (fileId === undefined || fileId.length === 0) {
                    this.$message('老铁，请选择你要删除的文件！');
                    return;
                }
                layer.confirm('老铁，您确定要删除选中的全部文件吗？', {
                    btn: ['确定', '不是很确定']
                }, function () {
                    layer.confirm('老铁，请再次确认，您确定要删除选中的文件吗？文件一旦删除，无法恢复！', {
                        btn: ['确定', '算了，不删了']
                    }, function () {
                        layer.confirm('老铁，重要的问题问三遍，确定删除？', {
                            btn: ['别废话，删了', '那还是不删了吧！']
                        }, function () {
                            $.ajax({
                                type: 'post',
                                data: {fileId: fileId},
                                url: "/user/delete/file",
                                success: function (data) {
                                    if (data.success) {
                                        layer.closeAll('dialog');
                                        app.$message({message: "轻轻的我走了，正如我轻轻的来。删除成功！", type: "success"});
                                        setTimeout(function () {
                                            dataTable.ajax.reload();
                                        }, 1500);
                                    } else {
                                        app.message.error("老铁，系统不舍得删除你的文件，所以它抛出了一个BUG！");
                                    }
                                }
                            });
                        });
                    });
                });
            },
            shareFiles() {
                let fileId = getSelectedIds();
                if (fileId === undefined || fileId.length === 0) {
                    this.$message('老铁，请选择你要分享的文件！');
                    return;
                }
                if (fileId.length > 1) {
                    this.$message('只支持单个文件分享哦！');
                    return;
                }
                $.ajax({
                    data: {fileId: fileId.toString()},
                    url: '/user/check/file/is/folder',
                    success: function (data) {
                        if (data.success) {
                            layer.open({
                                type: 2,
                                title: "文件分享",
                                scrollbar: false,
                                area: ['400px', '300px'],
                                content: ["/files/share/page?" + 'fileId=' + fileId.toString(), 'no'],
                            });
                        } else {
                            app.$message('不好意思老铁，暂不提供整个文件夹分享，请等待下个版本！');
                        }
                    }
                });
            },
            rename() {
                let fileId = getSelectedIds();
                if (fileId === undefined || fileId.length === 0) {
                    this.$message('老铁，请选择你要重命名的的文件/文件夹！');
                    return;
                }
                if (fileId.length > 1) {
                    this.$message('老铁，一次只能改一个名字哇！');
                    return;
                }
                layer.open({
                    type: 2,
                    title: "重命名",
                    area: ['400px', '300px'],
                    scrollbar: false,
                    content: ["/files/open/rename/page?" + 'fileId=' + fileId.toString(), 'no'],
                    end: function () {
                        setTimeout(function () {
                            dataTable.ajax.reload();
                        }, 1000);
                    }
                });
            },
            moveTo() {
                let fileId = getSelectedIds();
                if (fileId === undefined || fileId.length === 0) {
                    this.$message('老铁，请选择你要移动的的文件/文件夹！');
                    return;
                }
                layer.open({
                    type: 2,
                    title: "移动到",
                    scrollbar: false,
                    area: ['400px', '300px'],
                    content: ['/files/open/move/page?fileId[]=' + fileId, 'no'],
                    end: function () {
                        setTimeout(function () {
                            dataTable.ajax.reload();
                        }, 1000);
                    }
                });
            }
        },
        mounted: function () {
            formData = this.dataForm;
        }
    });

    //重命名成功后子窗口会回调这个函数
    function renameMsg(message) {
        app.$message({message: message, type: "success"});
    }

    //新建文件夹成功后子窗口会回调这个函数
    function message() {
        app.$message({message: "新建文件夹成功！", type: "success"});
    }

    $(function () {
        dataTable = $('#FileListTable').DataTable({
            ajax: {
                url: "/user/home/data",
                type: "post",
                data: function (data) {
                    $.extend(data, formData);
                }
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
                    sClass: "text-center",
                    width: '80px',
                    data: "id",
                    render: function (data) {
                        return '<input type="checkbox"  class="check-child"  value="' + data + '" />';
                    },
                    "bSortable": false
                },
                {
                    title: '', data: 'isFolder', bVisible: false
                },
                {
                    title: "文件名", data: "fileName",
                    render: function (data, type, row) {
                        if (row['isFolder'] === "YES") {
                            return '<input type="button" class="btn btn-link" value="' + data + '" onclick="enterTheFolder(' + row.id + ')">';
                        } else {
                            return data;
                        }
                    }
                },
                {
                    title: "文件类型", data: "type",
                    render: function (data) {
                        if (data === 'Folder') {
                            return '文件夹'
                        } else if (data === 'Picture') {
                            return '图片';
                        } else if (data === 'Document') {
                            return '文档';
                        } else if (data === 'Video') {
                            return '视频';
                        } else if (data === 'Music') {
                            return '音乐';
                        } else {
                            return '未知';
                        }
                    }
                },
                {
                    title: "文件大小", data: "fileSize",
                    render: function (data) {
                        return calculateFilesSize(data);
                    }
                },
                {
                    title: "修改日期", data: "modifyDate",
                    render: function (data) {
                        return new Date(data).Format("yyyy-MM-dd hh:mm:ss");
                    }
                }
            ]
        });
    });

    //进入该文件夹
    function enterTheFolder(fatherId) {
        $("#fatherIdInput").val(fatherId);
        formData['fatherId'] = fatherId;
        hideOrShow(fatherId);
        dataTable.ajax.reload();
    }

    //返回上一级目录
    function goBack() {
        //拿到这一级的目录
        let sonId = $("#fatherIdInput").val();
        if (sonId !== 0 && sonId !== "") {
            $.ajax({
                type: 'post',
                data: {sonId: sonId},
                url: "/user/get/upper/folder/id",
                success: function (data) {
                    let fatherId = data.data;
                    $("#fatherIdInput").val(fatherId);
                    formData['fatherId'] = fatherId;
                    hideOrShow(fatherId);
                    dataTable.ajax.reload();
                }
            });
        }
    }

    //全部文件
    function toRootFolder() {
        $("#fatherIdInput").val(0);
        formData['fatherId'] = 0;
        hideOrShow(0);
        dataTable.ajax.reload();
    }

    //对全部文件和上一级这两个按钮的处理
    $(document).ready(function () {
        let fatherId = $("#fatherIdInput").val();
        hideOrShow(fatherId);
    });

    //根据当前目录的id来影藏和显示按钮
    function hideOrShow(id) {
        if (id === 0 || id === "") {
            $("#allFileBtn").hide();
            $("#goBackBtn").hide();
        } else {
            $("#allFileBtn").show();
            $("#goBackBtn").show();
        }
    }
</script>
</body>
</html>
