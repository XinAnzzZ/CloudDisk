// 更改datables默认属性
$.extend(true, $.fn.DataTable.defaults, {
    // datables 默认语言
    "language": {
        searchPlaceholder: "搜索",
        sProcessing: "加载中...",
        sLengthMenu: "显示 _MENU_ 项结果",
        sZeroRecords: "没有匹配结果",
        sInfo: "总 _MAX_ 条",
        sInfoEmpty: "总 0 条",
        sInfoFiltered: "(由 _MAX_ 项结果过滤)",
        sInfoPostFix: "",
        sSearch: "",
        sUrl: "",
        sEmptyTable: "表中数据为空",
        sLoadingRecords: "载入中...",
        sInfoThousands: ",",
        oPaginate: {
            sFirst: "首页",
            sPrevious: "上页",
            sNext: "下页",
            sLast: "末页"
        },
        oAria: {
            sSortAscending: ": 以升序排列此列",
            sSortDescending: ": 以降序排列此列"
        }
    },
    aLengthMenu: [10],
    bLengthChange: false,
    searching: false,
    pagingType: "full_numbers",
    processing: true,
    bAutoWidth: false,
    // 不需要默认排序的字段
    order: []
});

$.fn.dataTable.ext.errMode = function (settings, tn, msg) {
    if (settings['ajax']) {
        if (settings['ajax']['url']) {
            msg = "datatable请求:" + settings['ajax']['url'] + "错误<br/>" + msg;
        }
    }
    console.error(msg);
    layer.msg(msg, "datatable错误");
    onerror(msg, settings.nTable.baseURI, 0, 0, msg);
};

window.DatatableExt = {};
/**
 * 修改表格的serverSide状态
 */
DatatableExt.changeServerSide = function (table, isServerSide) {
    if (typeof isServerSide == "undefined") {
        isServerSide = true;
    }
    table.settings()[0].oFeatures.bServerSide = isServerSide;
};
/**
 * 选择表格的第一行
 * @param tableName 表格名
 */
DatatableExt.clickFirstTr = function (tableName) {
    var $tableFirst = $("[data-table-name='" + tableName + "']").find("tbody tr:first");
    if (!$tableFirst.find("td:first").hasClass("dataTables_empty")) {
        $tableFirst.trigger("click");
    }
};

/**
 * 清空表格数据 并且改成本地模式
 * @param table
 */
DatatableExt.clearData = function (table) {
    DatatableExt.changeServerSide(table, false);
    table.clear().draw();
};
DatatableExt.SingleTableSetting = {
    serverSide: true,
    bLengthChange: false,
    bInfo: false,
    searching: true,
    bPaginate: false,
    classes: {
        sWrapper: "dataTable_single_column"
    },
    dom: "<'row'<'col-sm-12'f>>" +
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-3'i><'col-sm-9'p>>",
    bScrollInfinite: true,
    bScrollCollapse: true,
    sScrollY: "68%"
};