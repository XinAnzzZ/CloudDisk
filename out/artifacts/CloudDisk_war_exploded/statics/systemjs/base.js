var loginModal;
$(function () {
    // ajax基本配置
    // ajax基本配置
    $.ajaxSetup({
        error: function (jqXHR, textStatus, errorThrown) {
            var responseType = jqXHR.getResponseHeader("content-type");
            if (jqXHR.status === 404) {
                layer.msg("请求的页面未找到");
            }

            if (responseType) {
                if (responseType.indexOf('json') > -1) {
                    if (jqXHR.status === 500) {
                        layer.msg(jqXHR['responseJSON']['message']);
                    }
                    if (jqXHR.status === 400) {
                        layer.msg("参数错误,请重试");
                    }
                }
            }

        }
    });
    $(document).ajaxComplete(function (event, jqXHR, ajaxOptions) {
        if (jqXHR.status === 403) {
            // 未登录 或者登录超时 弹出登陆框
            Login.loadLoginModal();
            return false;
        }
    });


    // 异常捕捉
    window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, error) {

        //没有URL不上报！上报也不知道错误
        if (errorMessage != "Script error." && !scriptURI) {
            return true;
        }
        //采用异步的方式
        //我遇到过在window.onunload进行ajax的堵塞上报
        //由于客户端强制关闭webview导致这次堵塞上报有Network Error
        //我猜测这里window.onerror的执行流在关闭前是必然执行的
        //而离开文章之后的上报对于业务来说是可丢失的
        //所以这里的执行流放到异步事件去执行
        setTimeout(function () {
            var data = {};
            //不一定所有浏览器都支持columnNumber参数
            columnNumber = columnNumber || (window.event && window.event.errorCharacter) || 0;
            data.scriptURI = scriptURI;
            data.lineNumber = lineNumber;
            data.columnNumber = columnNumber;
            if (!!error && !!error.stack) {
                //如果浏览器有堆栈信息
                //直接使用
                data.errorMessage = error.stack.toString();
            } else if (!!arguments.callee) {
                //尝试通过callee拿堆栈信息
                var ext = [];
                var f = arguments.callee.caller, c = 3;
                //这里只拿三层堆栈信息
                while (f && (--c > 0)) {
                    ext.push(f.toString());
                    if (f === f.caller) {
                        break;//如果有环
                    }
                    f = f.caller;
                }
                ext = ext.join(",");
                data.errorMessage = ext;
            }
            //把data上报到后台！
            // $.post("/common/log/js/error", data);
        }, 0);
        // return false 让控制台继续报错
        return false;
    };


});
//
///**
// * 初始化组建
// * @param obj    需要初始化的对象
// * @param type   对象类型
// */
window.initModule = function (obj, type) {

};




//String.format
//V1 method
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function (m, i) {
            return args[i];
        });
};

//V2 static
String.format = function () {
    if (arguments.length === 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
jQuery.extend({
    postJSON: function (url, data, callback) {
        return jQuery.post(url, data, callback, "json");
    },
    getSyncJSON: function (url, data, callback) {
        return jQuery.getSync(url, data, callback, "json");
    },
    postSyncJSON: function (url, data, callback) {
        return jQuery.postSync(url, data, callback, "json");
    }
});
(function ($) {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };
})(jQuery);

$(function () {
    //初始化插件
    //只能输入数字
    $("[hmp-input-number]").keyup(function () {
        $(this).val($(this).val().replace(/\D/g, ''));

    });

    $("[hmp-input-price]").keyup(function () {
        var price = $(this).val();
        var decimalReg = /^[+-]?\d*\.?\d{1,2}$/;
        if (price != "" && price.test(decimalReg)) {
            $(this).val(price);
        } else {
            $(this).val("");
        }
    });
    try {
        $.each($("input[type='number']"), function (index, obj) {
            $(obj).keyup(function () {
                if ($(this).val().length > 8) {
                    $(this).val($(this).val().slice(0, 7));
                }
            })
        })
    } catch (e) {

    }
});

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};