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
    <el-tree :load="loadNode()"
             :props="props1"
             :highlight-current="true"
             :check-on-click-node="true" lazy></el-tree>
</div>
<script type="application/javascript">
    new Vue({
        el: "#tree",
        data: {
            props1: [{
                label: '/',
                fileId: 0
            }]
        },
        methods: {
            loadNode(node, resolve) {
                let flag = true;
                if (flag) {
                    flag = false;
                    return resolve([{"name": '/'}]);
                }
                console.log(node);
                setTimeout(() => {
                    const data = [{
                        name: 'leaf',
                        leaf: true
                    }, {
                        name: 'zone'
                    }];
                    resolve(data);
                }, 500);
            }
        }
    });
</script>
</body>
</html>
