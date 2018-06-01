<%--
  Created by IntelliJ IDEA.
  User: 心安
  Date: 2018/4/4
  Time: 17:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<div id="tree">
    移动到：
    <el-cascader :options="options2" @active-item-change="handleItemChange" :props="props"></el-cascader>
</div>
<script type="application/javascript">
    new Vue({
        el: "#tree",
        data: {
            options2: [{
                label: '江苏',
                cities: []
            }, {
                label: '浙江',
                cities: []
            }],
            props: {
                props: {
                    value: 'label',
                    children: 'cities'
                }
            }
        },
        methods: {
            handleItemChange(val) {
                console.log('active item:', val);
                setTimeout(_ => {
                    if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
                        this.options2[0].cities = [{
                            label: '南京'
                        }];
                    } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
                        this.options2[1].cities = [{
                            label: '杭州'
                        }];
                    }
                }, 300);
            }
        }
    });
    <%--var zNodes = [{id: 0, name: '...', isParent: true}];--%>
    <%--var fileId = ${fileIdArray};--%>
    <%--var zTree;--%>
    <%--var setting = {--%>
    <%--data: {--%>
    <%--simpleData: {--%>
    <%--enable: true,--%>
    <%--idKey: "id",--%>
    <%--pIdKey: "fatherId",--%>
    <%--rootPId: 0--%>
    <%--}--%>
    <%--},--%>
    <%--view: {--%>
    <%--dblClickExpand: true,--%>
    <%--selectedMulti: false--%>
    <%--},--%>
    <%--callback: {--%>
    <%--onExpand: getNodes(),--%>
    <%--}--%>
    <%--}--%>
    <%--$(function () {--%>
    <%--zTree = $.fn.zTree.init($("#ztree"), setting, zNodes);--%>
    <%--// $.ajax({--%>
    <%--//     type: 'post',--%>
    <%--//     url: '/files/get/tree/nodes',--%>
    <%--//     success: function (data) {--%>
    <%--//         for (var i = 0; i < data.length; i++) {--%>
    <%--//--%>
    <%--//         }--%>
    <%--//     }--%>
    <%--// });--%>

    <%--});--%>

    <%--function getNodes() {--%>
    <%--// debugger--%>
    <%--// var node = zTree.getNodeByTId(0);--%>
    <%--// console.info("...");--%>
    <%--// $.post('/files/get/tree/nodes', {fatherId: node.id}, function (data) {--%>
    <%--//    console.info(data);--%>
    <%--// });--%>
    <%--}--%>
</script>
</body>
</html>
