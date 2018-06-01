var Common = {
    /**
     * 金钱转大写
     * exp : 150.05  -> 壹佰伍拾元零伍分
     * @param numberValue
     * @returns {*}
     */
    moneyToCapital: function (numberValue) {
        numberValue = numberValue.replace(",", "");
        numberValue = numberValue.replace("-", "");
        numberValue = parseFloat(numberValue).toFixed(2);
        if (numberValue < 0) numberValue = -numberValue;
        numberValue = String(Math.round(numberValue * 100));
        var chineseValue = "";
        var String1 = "零壹贰叁肆伍陆柒捌玖";
        var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分";
        var len = numberValue.length;
        var Ch1;
        var Ch2;
        var nZero = 0;
        var String3;
        if (len > 15) {
            return "超出计算范围";
        }
        if (numberValue == 0) {
            chineseValue = "零元整";
            return chineseValue;
        }
        String2 = String2.substr(String2.length - len, len);
        for (var i = 0; i < len; i++) {
            String3 = parseInt(numberValue.substr(i, 1), 10);
            if (i != (len - 3) && i != (len - 7) && i != (len - 11) && i != (len - 15)) {
                if (String3 == 0) {
                    Ch1 = "";
                    Ch2 = "";
                    nZero = nZero + 1;
                } else if (String3 != 0 && nZero != 0) {
                    Ch1 = "零" + String1.substr(String3, 1);
                    Ch2 = String2.substr(i, 1);
                    nZero = 0;
                } else {
                    Ch1 = String1.substr(String3, 1);
                    Ch2 = String2.substr(i, 1);
                    nZero = 0;
                }
            } else {
                if (String3 != 0 && nZero != 0) {
                    Ch1 = "零" + String1.substr(String3, 1);
                    Ch2 = String2.substr(i, 1);
                    nZero = 0;
                } else if (String3 != 0 && nZero == 0) {
                    Ch1 = String1.substr(String3, 1);
                    Ch2 = String2.substr(i, 1);
                    nZero = 0;
                } else if (String3 == 0 && nZero >= 3) {
                    Ch1 = "";
                    Ch2 = "";
                    nZero = nZero + 1;
                } else {
                    Ch1 = "";
                    Ch2 = String2.substr(i, 1);
                    nZero = nZero + 1;
                }
                if (i == (len - 11) || i == (len - 3)) {
                    Ch2 = String2.substr(i, 1);
                }
            }
            chineseValue = chineseValue + Ch1 + Ch2;
        }
        if (String3 == 0) {
            chineseValue = chineseValue + "整";
        }
        return chineseValue;
    },
    /**
     * 修改peridpicker选择器时间
     * @param iptObj 输入框对象
     * @param date 时间   exp: 2016/11/11 11:11:11
     */
    changePeriodpickerDate: function (iptObj, date) {
        $(iptObj).val(date).trigger("change");
        $(iptObj).periodpicker("change");
        var time = date.split(" ")[1];
        var iptName = $(iptObj).attr("name");
        var picker = $("[data-period-picker-for='" + iptName + "']");
        picker.find(".period_picker_from_time").val(time).trigger("change");
    },
    /** 得到系统时间
     ** @param type 字符串 date time datatime
     */
    getDateTime: function (type) {
        var idate = new Date();
        var dateTime = {};
        if (type == 'msec') {
            return idate.getTime();
        }

        dateTime.date = idate.getFullYear() + "-" + (idate.getMonth() + 1) + "-" + idate.getDate();
        dateTime.time = idate.getHours() + ":" + idate.getMinutes() + ":" + idate.getSeconds();
        dateTime.datetime = dateTime.date + " " + dateTime.time;

        return type ? dateTime[type] : dateTime;
    },

    /**
     * 快捷获取开始时间,比如传入today  返回今天开始 0:0:0
     * today        今天        yesterday      昨天
     * sevenDaysAgo 七天前     thirtyDaysAgo   三十天前
     * thisMonth    这个月     lastMonth       上个月
     * thisYear     今年      lastYear         去年
     * @param shortcutText
     */
    shortcutGetStartDateTime: function (shortcutText) {
        var startDate;
        switch (shortcutText) {
            case "today":
                // 今天
                startDate = moment();
                break;
            case "yesterday":
                // 昨天
                startDate = moment().subtract(1, 'days');
                break;
            case "sevenDaysAgo":
                // 七天前
                startDate = moment().subtract(6, 'days');
                break;
            case "thirtyDaysAgo":
                // 三十天前
                startDate = moment().subtract(29, 'days');
                break;
            case "thisMonth":
                // 这个月
                startDate = moment().startOf('month');
                break;
            case "lastMonth":
                // 上个月
                startDate = moment().subtract(1, 'month').startOf('month');
                break;
            case "beforeThreeMonth":
                // 前三个月
                startDate = moment().subtract(2, 'month').startOf('month');
                break;
            case "thisYear":
                // 今年
                startDate = moment().startOf('year');
                break;
            case "lastYear":
                // 去年
                startDate = moment().subtract(1, 'year').startOf('year');
                break;
            case "all":
                // 全部
                startDate = moment('1970/01/01', 'YYYY/MM/DD');
                break;
        }

        return startDate;
    },

    /**
     * 快捷获取结束时间,比如传入today  返回今天开始 0:0:0
     * today        今天        yesterday      昨天
     * sevenDaysAgo 七天前     thirtyDaysAgo   三十天前
     * thisMonth    这个月     lastMonth       上个月
     * thisYear     今年      lastYear         去年
     * @param shortcutText
     */
    shortcutGetEndDateTime: function (shortcutText) {
        var endDate;
        switch (shortcutText) {
            case "today":
                // 今天
                endDate = moment();
                break;
            case "yesterday":
                // 昨天
                endDate = moment().subtract(1, 'days');
                break;
            case "sevenDaysAgo":
                // 七天前
                endDate = moment();
                break;
            case "thirtyDaysAgo":
                // 三十天前
                endDate = moment();
                break;
            case "thisMonth":
                // 这个月
                endDate = moment().endOf('month');
                break;
            case "lastMonth":
                // 上个月
                endDate = moment().subtract(1, 'month').endOf('month');
                break;
            case "beforeThreeMonth":
                // 前三个月
                endDate = moment().endOf('month');
                break;
            case "thisYear":
                // 今年
                endDate = moment().endOf('year');
                break;
            case "lastYear":
                // 去年
                endDate = moment().subtract(1, 'year').endOf('year');
                break;
            case "all":
                endDate = moment('2050/01/01', 'YYYY/MM/DD');
                break;
        }
        return endDate;
    },
    /**
     * 检测对象是否含有某个属性
     * @param obj obj
     * @param attr attr
     */
    isAttr: function (obj, attr) {
        return typeof($(obj).attr(attr)) != "undefined";
    },

    /**
     * 判断对象里是否有 null 或者 ""
     * @param obj obj
     */
    checkHaveBlank: function (obj) {
        if ($.isEmptyObject(obj)) {
            return true
        }
        var result = false;
        $.each(obj, function (index, value) {
            if (!value || value == "") {
                result = true;
                return false;
            }
        });
        return result;
    },

    /**
     * 禁用按钮
     * @param buttonObj 按钮对象
     * @param paramObj  禁用参数
     *         disableText (string)(default:"加载中")禁止后显示的文字
     *         disableShowIcon (boolean)(default:true) 禁止后是否有个icon滚动
     */
    disableButton: function (buttonObj, paramObj) {
        var paramObjExtend = $.extend({disableText: "加载中", disableShowIcon: true}, paramObj);
        buttonObj.prop("disabled", true);
        buttonObj.attr("data-normal-text", buttonObj.text());
        var disableButtonText;
        if (paramObjExtend.disableShowIcon) {
            disableButtonText = "<i class='fa fa-spinner fa-pulse'></i>" + paramObjExtend.disableText;
        } else {
            disableButtonText = paramObjExtend.disableText;
        }
        buttonObj.html(disableButtonText);

    },

    /**
     * 恢复按钮
     * @param buttonObj 按钮对象
     */
    enableButton: function (buttonObj) {
        buttonObj.prop("disabled", false);
        var disableButtonText = buttonObj.attr("data-normal-text");
        if (disableButtonText) {
            buttonObj.html(disableButtonText);
        }
    },

    /**
     * 判断元素是否属于禁用状态
     * @param Obj jquery object
     */
    checkDisable: function (Obj) {
        return $(Obj).prop("disabled");
    },
};

var Login = {
    /**
     * 加载登录modal
     */
    loadLoginModal: function () {
        if (loginModal) {
            loginModal.close();
        }
        loginModal = new BootstrapDialog({
            message: Dialog.generateHtmlMessage($("[data-name='loginModal']").html()),
            title: "登录超时,请重新登录",
            size: BootstrapDialog.SIZE_SMALL,
            draggable: false,
            closable: false,
            closeByBackdrop: false,
            closeByKeyboard: false,
            buttons: [
                {
                    label: "退出登录",
                    cssClass: "push-button stateless",
                    action: function (dialogRef) {
                        // 确定要退出?
                        BootstrapDialog.confirm({
                            message: "确定要退出登录?可能会丢失当前未保存的数据.",
                            title: "提示信息",
                            callback: function (result) {
                                if (result) {
                                    var logoutUrl = "http://" + window.location.host + "/logout";
                                    window.location.href = logoutUrl;
                                    dialogRef.close();
                                }
                            }

                        });
                    }
                },
                Dialog.generateSaveBtn(function (dialog) {
                    Common.disableButton(dialog.getButton("save"), {disableText: "登录中"});
                    var dialogHtml = dialog.getModalBody();
                    var loginUrl = "http://" + window.location.host + "/login";
                    var loginPostData = {
                        "username": dialogHtml.find("#timeoutLoginUsernameIpt").val(),
                        "password": dialogHtml.find("#timeoutLoginPasswordIpt").val()
                    };
                    $.ajax({
                        url: loginUrl,
                        method: "post",
                        dataType: "json",
                        data: loginPostData,
                        complete: function () {
                            Common.enableButton(dialog.getButton("save"));
                        },
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function (data) {
                            if (data.success) {
                                layer.msg("重新登陆成功,请再次操作!");
                                dialog.close();
                            } else {
                                Common.enableButton(dialog.getButton("save"));
                                layer.msg("登录失败," + data.msg);
                            }
                        }
                    });

                }, "登录")
            ]
        });
        loginModal.open();
        var username = $("[name='loginUsername']").attr("content");
        setTimeout(function () {
            ranDomYzm();
        }, 500);
        if (username) {
            var usernameInput = $(loginModal.getModalBody()).find("#timeoutLoginUsernameIpt");
            var passwordInput = $(loginModal.getModalBody()).find("#timeoutLoginPasswordIpt");
            usernameInput.val(username);
            usernameInput.prop("readonly", true);
            passwordInput.focus();
        }
    }
};

/**
 * 弹窗辅助
 */
var Dialog = {
    /**
     * 生成关闭按钮
     * @param label 按钮上的文字 default:"关闭"
     * @param css 自定义css      default:"push-button stateless"
     */
    generateCloseBtn: function (label, css) {
        label = label || "关闭";
        css = css || "push-button stateless";

        return {
            id: "close",
            label: label,
            cssClass: css,
            action: function (dialogRef) {
                dialogRef.close();
            }
        };
    },

    /**
     * 生成message
     * 别问我为啥这样写,说多了都是泪
     * mlgb, jquery的同步连gif都要阻塞,日
     * @param url 读取的url地址
     * @param data 参数
     * @param successCallback 成功后callback
     */
    generateMessage: function (url, data, successCallback) {
        var $message = $.Deferred();
        var ajaxData = {
            url: url,
            complete: function (xhr) {
                $message.resolve($(xhr['responseText']));
            }
        };
        if (data) {
            ajaxData['data'] = data
        }
        if (successCallback) {
            ajaxData['success'] = successCallback
        }
        $.ajax(ajaxData);
        return $message.promise();
    },

    /**
     * 生成html 对象message
     * @param htmlObj  html message
     */
    generateHtmlMessage: function (htmlObj) {
        var $message = $('<div></div>');
        $message.append($(htmlObj));
        return $message;
    },

    /**
     * 生成保存按钮
     * @param actionCallback     callback执行函数
     * @param label              保存按钮上的文字
     * @param css                css
     * @returns {{label: *, cssClass: *, action: *}}
     */
    generateSaveBtn: function (actionCallback, label, css) {
        label = label || "保存";
        css = css || "push-button submit";
        return {
            id: 'save',
            label: label,
            cssClass: css,
            action: function (dialog) {
                actionCallback(dialog);
            }
        }
    },

    /**
     * 生成提交表单保存按钮
     * @param formName           表单名称
     * @param label              保存按钮上的文字
     * @param css                css
     * @returns {{label: *, cssClass: *, action: *}}
     */
    generateSubmitSaveBtn: function (formName, label, css) {
        label = label || "保存";
        css = css || "push-button submit";

        return {
            id: "save",
            label: label,
            cssClass: css,
            action: function () {
                $("[data-form-name='" + formName + "']").submit();
            }
        }
    },

    /**
     * 提交操作完成后 执行一些基本方法:
     * 1. 判断data中的result来提示信息
     * 2. 关闭dialog
     * 3. 刷新table
     */
    basicSuccessOperate: function (data, param) {
        if (data.result) {
            if (param.defaultSuccessCallback) {
                Alert.success(data.message);
                if (param.dialog != null) {
                    param.dialog.close();
                }
                if (param.table != null) {
                    param.table.ajax.reload();
                }
            }
            if (param.successCallback) {
                param.successCallback(data);
            }

        } else {
            if (param.defaultErrorCallback) {
                layer.msg(data.message);
            }
            if (param.errorCallback) {
                param.errorCallback(data);
            }


        }
    },

    /**
     * 采用post的方式打开一个远程窗口
     * @param url   url 地址
     * @param data  传入的数据
     * @param name  name
     */
    openPostWindow: function (url, data, name) {
        var tempForm = document.createElement("form");
        tempForm.id = "tempForm1";
        tempForm.method = "post";
        tempForm.action = url;
        tempForm.target = name;
        var hideInput = document.createElement("input");
        hideInput.type = "hidden";
        hideInput.name = "content";
        hideInput.value = data;
        tempForm.appendChild(hideInput);
        //监听事件的方法        打开页面window.open(name);
        tempForm.addEventListener("onsubmit", function () {
            window.open(name);
        });
        document.body.appendChild(tempForm);
        tempForm.submit();
        document.body.removeChild(tempForm);
    }
};

var topParent = window;
$(function () {
    topParent = getTopParentWindowFun(topParent);
    Alert = topParent.Alert;
    Login = topParent.Login;
});

function getTopParentWindowFun(topParent) {
    if (topParent.parent !== topParent) {
        topParent = topParent.parent;
        return getTopParentWindowFun(topParent)
    } else {
        return topParent;
    }
};