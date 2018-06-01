/*@cc_on(function(m,c){var z="abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video";function n(d){for(var a=-1;++a<o;)d.createElement(i[a])}function p(d,a){for(var e=-1,b=d.length,j,q=[];++e<b;){j=d[e];if((a=j.media||a)!="screen")q.push(p(j.imports,a),j.cssText)}return q.join("")}var g=c.createElement("div");g.innerHTML="<z>i</z>";if(g.childNodes.length!==1){var i=z.split("|"),o=i.length,s=RegExp("(^|\\s)("+z+")",
"gi"),t=RegExp("<(/*)("+z+")","gi"),u=RegExp("(^|[^\\n]*?\\s)("+z+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),r=c.createDocumentFragment(),k=c.documentElement;g=k.firstChild;var h=c.createElement("body"),l=c.createElement("style"),f;n(c);n(r);g.insertBefore(l,
g.firstChild);l.media="print";m.attachEvent("onbeforeprint",function(){var d=-1,a=p(c.styleSheets,"all"),e=[],b;for(f=f||c.body;(b=u.exec(a))!=null;)e.push((b[1]+b[2]+b[3]).replace(s,"$1.iepp_$2")+b[4]);for(l.styleSheet.cssText=e.join("\n");++d<o;){a=c.getElementsByTagName(i[d]);e=a.length;for(b=-1;++b<e;)if(a[b].className.indexOf("iepp_")<0)a[b].className+=" iepp_"+i[d]}r.appendChild(f);k.appendChild(h);h.className=f.className;h.innerHTML=f.innerHTML.replace(t,"<$1font")});m.attachEvent("onafterprint",
function(){h.innerHTML="";k.removeChild(h);k.appendChild(f);l.styleSheet.cssText=""})}})(this,document);@*/
var baidu = baidu || {version: "1-3"};
baidu.guid = "$BAIDU$";
window[baidu.guid] = window[baidu.guid] || {};
baidu.browser = baidu.browser || {};
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
if ((/(\d+\.\d)(\.\d)?\s+safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent))) {
    baidu.browser.safari = parseFloat(RegExp["\x241"])
}
if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.opera = parseFloat(RegExp["\x241"])
}
if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.chrome = parseFloat(RegExp["\x241"])
}
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.ie = baidu.browser.ie = document.documentMode || parseFloat(RegExp["\x241"])
}
try {
    if (/(\d+\.\d)/.test(external.max_version)) {
        baidu.browser.maxthon = parseFloat(RegExp["\x241"])
    }
} catch (e) {
}
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.firefox = parseFloat(RegExp["\x241"])
}
baidu.number = baidu.number || {};
baidu.number.pad = function (d, f) {
    var c = "", g = (d < 0), a = String(Math.abs(d));
    if (a.length < f) {
        c = (new Array(f - a.length + 1)).join("0")
    }
    return (g ? "-" : "") + c + a
};
baidu.number.comma = function (d, f) {
    var c = String(d).split("."), a = c[0].split("").reverse().join(""), g;
    if (!f || f < 1) {
        f = 3
    }
    g = new RegExp("\\d{" + f + "}", "g");
    a = a.replace(g, function (h) {
        return h + ","
    }).split("").reverse().join("");
    if (a.charAt(0) == ",") {
        a = a.slice(1)
    }
    c[0] = a;
    return c.join(".")
};
baidu.url = baidu.url || {};
baidu.url.escapeSymbol = function (a) {
    return String(a).replace(/\%/g, "%25").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(/\ /g, "%20").replace(/\//g, "%2F").replace(/\#/g, "%23").replace(/\=/g, "%3D")
};
baidu.string = baidu.string || {};
baidu.string.escapeReg = function (a) {
    return String(a).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"), "\\\x241")
};
baidu.url.getQueryValue = function (f, d) {
    var c = new RegExp("(^|&|\\?|#)" + baidu.string.escapeReg(d) + "=([^&]*)(&|\x24)", "");
    var a = f.match(c);
    if (a) {
        return a[2]
    }
    return null
};
baidu.url.jsonToQuery = function (f, g) {
    var j = [], a = 0, h, c, d;
    g = g || function (k) {
        return baidu.url.escapeSymbol(k)
    };
    for (h in f) {
        if (f.hasOwnProperty(h)) {
            c = f[h];
            if (Object.prototype.toString.call(c) == "[object Array]") {
                d = c.length;
                while (d--) {
                    j[a++] = h + "=" + g(c[d], h)
                }
            } else {
                j[a++] = h + "=" + g(c, h)
            }
        }
    }
    return j.join("&")
};
baidu.url.queryToJson = function (f) {
    var l = f.substr(f.indexOf("?") + 1), c = l.split("&"), a = c.length, g = {}, j, k, h, d;
    for (i = 0; i < a; i++) {
        d = c[i].split("=");
        j = d[0];
        k = d[1];
        h = g[j];
        if ("undefined" == typeof h) {
            g[j] = k
        } else {
            if (Object.prototype.toString.call(h) == "[object Array]") {
                h.push(k)
            } else {
                g[j] = [h, k]
            }
        }
    }
    return g
};
baidu.cookie = baidu.cookie || {};
baidu.cookie._isValidKey = function (a) {
    return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24')).test(a)
};
baidu.cookie.setRaw = function (d, c, f) {
    if (!baidu.cookie._isValidKey(d)) {
        return
    }
    f = f || {};
    var a = f.expires;
    if ("number" == typeof f.expires) {
        a = new Date();
        a.setTime(a.getTime() + f.expires)
    }
    document.cookie = d + "=" + c + (f.path ? "; path=" + f.path : "") + (a ? "; expires=" + a.toGMTString() : "") + (f.domain ? "; domain=" + f.domain : "") + (f.secure ? "; secure" : "")
};
baidu.cookie.getRaw = function (d) {
    if (baidu.cookie._isValidKey(d)) {
        var c = new RegExp("(^| )" + d + "=([^;]*)(;|\x24)"), a = c.exec(document.cookie);
        if (a) {
            return a[2] || null
        }
    }
    return null
};
baidu.cookie.get = function (a) {
    var c = baidu.cookie.getRaw(a);
    if ("string" == typeof c) {
        c = decodeURIComponent(c);
        return c
    }
    return null
};
baidu.cookie.set = function (d, c, a) {
    baidu.cookie.setRaw(d, encodeURIComponent(c), a)
};
baidu.cookie.remove = function (c, a) {
    a = a || {};
    a.expires = new Date(0);
    baidu.cookie.setRaw(c, "", a)
};
baidu.json = baidu.json || {};
baidu.json.parse = function (a) {
    if (!/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
        return null
    }
    return window.JSON && window.JSON.parse ? window.JSON.parse(a) : (new Function("return " + a))()
};
baidu.json.stringify = (function () {
    var g = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};

    function a(h) {
        if (/["\\\x00-\x1f]/.test(h)) {
            h = h.replace(/["\\\x00-\x1f]/g, function (k) {
                var j = g[k];
                if (j) {
                    return j
                }
                j = k.charCodeAt();
                return "\\u00" + Math.floor(j / 16).toString(16) + (j % 16).toString(16)
            })
        }
        return '"' + h + '"'
    }

    function d(h) {
        var m = ["["], l = h.length, n, k, j;
        for (k = 0; k < l; k++) {
            j = h[k];
            switch (typeof j) {
                case"undefined":
                case"function":
                case"unknown":
                    break;
                default:
                    if (n) {
                        m.push(",")
                    }
                    m.push(baidu.json.stringify(j));
                    n = 1
            }
        }
        m.push("]");
        return m.join("")
    }

    function f(h) {
        return h < 10 ? "0" + h : h
    }

    function c(h) {
        return '"' + h.getFullYear() + "-" + f(h.getMonth() + 1) + "-" + f(h.getDate()) + "T" + f(h.getHours()) + ":" + f(h.getMinutes()) + ":" + f(h.getSeconds()) + '"'
    }

    return function (h) {
        switch (typeof h) {
            case"undefined":
                return "undefined";
            case"number":
                return isFinite(h) ? String(h) : "null";
            case"string":
                return a(h);
            case"boolean":
                return String(h);
            default:
                if (h === null) {
                    return "null"
                } else {
                    if (h instanceof Array) {
                        return d(h)
                    } else {
                        if (h instanceof Date) {
                            return c(h)
                        } else {
                            var l = ["{"], j = baidu.json.stringify, m, k;
                            for (key in h) {
                                if (h.hasOwnProperty(key)) {
                                    k = h[key];
                                    switch (typeof k) {
                                        case"undefined":
                                        case"unknown":
                                        case"function":
                                            break;
                                        default:
                                            if (m) {
                                                l.push(",")
                                            }
                                            m = 1;
                                            l.push(j(key) + ":" + j(k))
                                    }
                                }
                            }
                            l.push("}");
                            return l.join("")
                        }
                    }
                }
        }
    }
})();
baidu.json.encode = function (a) {
    return baidu.json.stringify(a)
};
baidu.json.decode = function (a) {
    return baidu.json.parse(a)
};
baidu.date = baidu.date || {};
baidu.date.format = function (f, l) {
    if ("string" != typeof l) {
        return f.toString()
    }

    function a(n, o) {
        l = l.replace(n, o)
    }

    var d = baidu.number.pad, k = f.getFullYear(), m = f.getMonth() + 1, g = f.getDate(), j = f.getHours(),
        c = f.getMinutes(), h = f.getSeconds();
    a(/yyyy/g, d(k, 4));
    a(/yy/g, d(k.toString().slice(2), 2));
    a(/MM/g, d(m, 2));
    a(/M/g, m);
    a(/dd/g, d(g, 2));
    a(/d/g, g);
    a(/HH/g, d(j, 2));
    a(/H/g, j);
    a(/hh/g, d(j % 12, 2));
    a(/h/g, j % 12);
    a(/mm/g, d(c, 2));
    a(/m/g, c);
    a(/ss/g, d(h, 2));
    a(/s/g, h);
    return l
};
baidu.date.parse = function (f) {
    var a = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if ("string" == typeof f) {
        if (a.test(f) || isNaN(Date.parse(f))) {
            var c = f.split(/ |T/), g = c.length > 1 ? c[1].split(/[^\d]/) : [0, 0, 0], d = c[0].split(/[^\d]/);
            return new Date(d[0] - 0, d[1] - 1, d[2] - 0, g[0] - 0, g[1] - 0, g[2] - 0)
        } else {
            return new Date(f)
        }
    }
    return new Date()
};
baidu.dom = baidu.dom || {};
baidu.dom._styleFilter = baidu.dom._styleFilter || [];
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
    get: function (f, d) {
        if (/color/i.test(f) && d.indexOf("rgb(") != -1) {
            var c = d.split(",");
            d = "#";
            for (var g = 0, a; a = c[g]; g++) {
                a = parseInt(a.replace(/[^\d]/gi, ""), 10).toString(16);
                d += a.length == 1 ? "0" + a : a
            }
            d = d.toUpperCase()
        }
        return d
    }
};
baidu.dom._styleFilter.filter = function (h, d, c) {
    for (var a = 0, f = baidu.dom._styleFilter, g; g = f[a]; a++) {
        if (g = g[c]) {
            d = g(h, d)
        }
    }
    return d
};
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
    set: function (a, c) {
        if (c.constructor == Number && !/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(a)) {
            c = c + "px"
        }
        return c
    }
};
baidu.dom._styleFixer = baidu.dom._styleFixer || {};
baidu.dom._styleFixer.display = baidu.browser.ie && baidu.browser.ie < 8 ? {
    set: function (a, c) {
        a = a.style;
        if (c == "inline-block") {
            a.display = "inline";
            a.zoom = 1
        } else {
            a.display = c
        }
    }
} : baidu.browser.firefox && baidu.browser.firefox < 3 ? {
    set: function (a, c) {
        a.style.display = c == "inline-block" ? "-moz-inline-box" : c
    }
} : null;
baidu.dom._styleFixer["float"] = baidu.browser.ie ? "styleFloat" : "cssFloat";
baidu.dom._styleFixer.opacity = baidu.browser.ie ? {
    get: function (a) {
        var c = a.style.filter;
        c && c.indexOf("opacity=") >= 0 ? (parseFloat(c.match(/opacity=([^)]*)/)[1]) / 100) + "" : "1"
    }, set: function (a, c) {
        var d = a.style;
        d.filter = (d.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (c == 1 ? "" : "alpha(opacity=" + c * 100 + ")");
        d.zoom = 1
    }
} : null;
baidu.dom._styleFixer.textOverflow = (function () {
    var f = {};

    function a(h) {
        var g = h.length;
        if (g > 0) {
            g = h[g - 1];
            h.length--
        } else {
            g = null
        }
        return g
    }

    function d(h, g) {
        h[baidu.browser.firefox ? "textContent" : "innerText"] = g
    }

    function c(n, s, j) {
        var q = baidu.browser.ie ? n.currentStyle || n.style : getComputedStyle(n, null), k = q.fontWeight,
            l = "font-family:" + q.fontFamily + ";font-size:" + q.fontSize + ";word-spacing:" + q.wordSpacing + ";font-weight:" + ((parseInt(k) || 0) == 401 ? 700 : k) + ";font-style:" + q.fontStyle + ";font-variant:" + q.fontVariant,
            v = f[l];
        if (!v) {
            q = n.appendChild(document.createElement("div"));
            q.style.cssText = "float:left;" + l;
            v = f[l] = [];
            for (o = 0; o < 256; o++) {
                o == 32 ? (q.innerHTML = "&nbsp;") : d(q, String.fromCharCode(o));
                v[o] = q.offsetWidth
            }
            d(q, "涓€");
            v[256] = q.offsetWidth;
            d(q, "涓€涓€");
            v[257] = q.offsetWidth - v[256] * 2;
            v[258] = v[".".charCodeAt(0)] * 3 + v[257] * 3;
            n.removeChild(q)
        }
        for (var p = n.firstChild, m = v[256], t = v[257], u = v[258], g = [], j = j ? u : 0; p; p = p.nextSibling) {
            if (s < j) {
                n.removeChild(p)
            } else {
                if (p.nodeType == 3) {
                    for (var o = 0, h = p.nodeValue, r = h.length; o < r; o++) {
                        q = h.charCodeAt(o);
                        g[g.length] = [s, p, o];
                        s -= (o ? t : 0) + (q < 256 ? v[q] : m);
                        if (s < j) {
                            break
                        }
                    }
                } else {
                    q = p.tagName;
                    if (q == "IMG" || q == "TABLE") {
                        q = p;
                        p = p.previousSibling;
                        n.removeChild(q)
                    } else {
                        g[g.length] = [s, p];
                        s -= p.offsetWidth
                    }
                }
            }
        }
        if (s < j) {
            while (q = a(g)) {
                s = q[0];
                p = q[1];
                q = q[2];
                if (p.nodeType == 3) {
                    if (s >= u) {
                        p.nodeValue = p.nodeValue.substring(0, q) + "...";
                        return true
                    } else {
                        if (!q) {
                            n.removeChild(p)
                        }
                    }
                } else {
                    if (c(p, s, true)) {
                        return true
                    } else {
                        n.removeChild(p)
                    }
                }
            }
            n.innerHTML = ""
        }
    }

    return {
        get: function (h, g) {
            var j = baidu.browser;
            return (j.opera ? g.OTextOverflow : j.firefox ? h._baiduOverflow : g.textOverflow) || "clip"
        }, set: function (k, h) {
            var l = baidu.browser;
            if (k.tagName == "TD" || k.tagName == "TH" || l.firefox) {
                k._baiduHTML && (k.innerHTML = k._baiduHTML);
                if (h == "ellipsis") {
                    k._baiduHTML = k.innerHTML;
                    var g = document.createElement("div"), j = k.appendChild(g).offsetWidth;
                    k.removeChild(g);
                    c(k, j)
                } else {
                    k._baiduHTML = ""
                }
            }
            g = k.style;
            l.opera ? (g.OTextOverflow = h) : l.firefox ? (k._baiduOverflow = h) : (g.textOverflow = h)
        }
    }
})();
baidu.dom.g = function (a) {
    if ("string" == typeof a || a instanceof String) {
        return document.getElementById(a)
    } else {
        if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
            return a
        }
    }
    return null
};
baidu.g = baidu.G = baidu.dom.g;
baidu.dom._NAME_ATTRS = (function () {
    var a = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        rowspan: "rowSpan",
        valign: "vAlign",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    if (baidu.browser.ie < 8) {
        a["for"] = "htmlFor";
        a["class"] = "className"
    } else {
        a.htmlFor = "for";
        a.className = "class"
    }
    return a
})();
baidu.dom.setAttr = function (d, a, c) {
    d = baidu.dom.g(d);
    if ("style" == a) {
        d.style.cssText = c
    } else {
        a = baidu.dom._NAME_ATTRS[a] || a;
        d.setAttribute(a, c)
    }
    return d
};
baidu.setAttr = baidu.dom.setAttr;
baidu.dom.setAttrs = function (c, a) {
    c = baidu.dom.g(c);
    for (var d in a) {
        baidu.dom.setAttr(c, d, a[d])
    }
    return c
};
baidu.setAttrs = baidu.dom.setAttrs;
baidu.dom.getAttr = function (c, a) {
    c = baidu.dom.g(c);
    if ("style" == a) {
        return c.style.cssText
    }
    a = baidu.dom._NAME_ATTRS[a] || a;
    return c.getAttribute(a)
};
baidu.getAttr = baidu.dom.getAttr;
baidu.dom._matchNode = function (a, d, c) {
    a = baidu.dom.g(a);
    for (var f = a[c]; f; f = f[d]) {
        if (f.nodeType == 1) {
            return f
        }
    }
    return null
};
baidu.dom.prev = function (a) {
    return baidu.dom._matchNode(a, "previousSibling", "previousSibling")
};
(function () {
    var a = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
    baidu.string.trim = function (c) {
        return String(c).replace(a, "")
    }
})();
baidu.trim = baidu.string.trim;
baidu.dom.addClass = function (d, c) {
    d = baidu.dom.g(d);
    var g = baidu.string.trim, f = g(c).split(/\s+/), a = f.length;
    c = d.className.split(/\s+/).join(" ");
    while (a--) {
        (new RegExp("(^| )" + f[a] + "( |\x24)")).test(c) && f.splice(a, 1)
    }
    d.className = g(c + " " + f.join(" "));
    return d
};
baidu.addClass = baidu.dom.addClass;
baidu.dom.hasClass = function (d, c) {
    d = baidu.dom.g(d);
    var f = baidu.string.trim(c).split(/\s+/), a = f.length;
    c = d.className.split(/\s+/).join(" ");
    while (a--) {
        if (!(new RegExp("(^| )" + f[a] + "( |\x24)")).test(c)) {
            return false
        }
    }
    return true
};
baidu.dom.contains = function (a, d) {
    var c = baidu.dom.g;
    a = c(a);
    d = c(d);
    return a.contains ? a != d && a.contains(d) : !!(a.compareDocumentPosition(d) & 16)
};
baidu.dom.getDocument = function (a) {
    a = baidu.dom.g(a);
    return a.nodeType == 9 ? a : a.ownerDocument || a.document
};
baidu.dom.removeClass = function (d, c) {
    d = baidu.dom.g(d);
    var a = baidu.string.trim;
    d.className = a(d.className.split(/\s+/).join("  ").replace(new RegExp("(^| )(" + a(c).split(/\s+/).join("|") + ")( |\x24)", "g"), " ").replace(/\s+/g, " "));
    return d
};
baidu.removeClass = baidu.dom.removeClass;
baidu.dom.children = function (d) {
    d = baidu.dom.g(d);
    for (var a = [], c = d.firstChild; c; c = c.nextSibling) {
        if (c.nodeType == 1) {
            a.push(c)
        }
    }
    return a
};
baidu.string.toCamelCase = function (a) {
    if (a.indexOf("-") < 0 && a.indexOf("_") < 0) {
        return a
    }
    return a.replace(/[-_][^-_]/g, function (c) {
        return c.charAt(1).toUpperCase()
    })
};
baidu.dom.setStyle = function (f, g, d) {
    var c = baidu.dom, a;
    f = c.g(f);
    g = baidu.string.toCamelCase(g);
    if (a = c._styleFilter) {
        d = a.filter(g, d, "set")
    }
    a = c._styleFixer[g];
    (a && a.set) ? a.set(f, d) : (f.style[a || g] = d);
    return f
};
baidu.setStyle = baidu.dom.setStyle;
baidu.dom.setStyles = function (d, c) {
    d = baidu.dom.g(d);
    for (var a in c) {
        baidu.dom.setStyle(d, a, c[a])
    }
    return d
};
baidu.setStyles = baidu.dom.setStyles;
baidu.dom.q = function (h, l, d) {
    var g = [], a = baidu.string.trim, j, k, f, c;
    if (!(h = a(h))) {
        return null
    }
    if ("undefined" == typeof l) {
        l = document
    } else {
        l = baidu.dom.g(l);
        if (!l) {
            return g
        }
    }
    d && (d = a(d).toUpperCase());
    if (l.getElementsByClassName) {
        f = l.getElementsByClassName(h);
        j = f.length;
        for (k = 0; k < j; k++) {
            c = f[k];
            if (d && c.tagName != d) {
                continue
            }
            g[g.length] = c
        }
    } else {
        h = new RegExp("(^|\\s)" + baidu.string.escapeReg(h) + "(\\s|\x24)");
        f = d ? l.getElementsByTagName(d) : (l.all || l.getElementsByTagName("*"));
        j = f.length;
        for (k = 0; k < j; k++) {
            c = f[k];
            h.test(c.className) && (g[g.length] = c)
        }
    }
    return g
};
baidu.q = baidu.Q = baidu.dom.q;
baidu.dom.getStyle = function (g, h) {
    var c = baidu.dom;
    g = c.g(g);
    h = baidu.string.toCamelCase(h);
    var d = g.style[h];
    if (!d) {
        var a = c._styleFixer[h], f = g.currentStyle || (baidu.browser.ie ? g.style : getComputedStyle(g, null));
        if ("string" == typeof a) {
            d = f[a]
        } else {
            if (a && a.get) {
                d = a.get(g, f)
            } else {
                d = f[h]
            }
        }
    }
    if (a = c._styleFilter) {
        d = a.filter(h, d, "get")
    }
    return d
};
baidu.getStyle = baidu.dom.getStyle;
baidu.dom.getPosition = function (c) {
    var j = baidu.dom.getDocument(c), o = baidu.browser, m = baidu.dom.getStyle;
    c = baidu.dom.g(c);
    var p = o.isGecko > 0 && j.getBoxObjectFor && m(c, "position") == "absolute" && (c.style.top === "" || c.style.left === "");
    var l = {left: 0, top: 0};
    var n = (o.ie && !o.isStrict) ? j.body : j.documentElement;
    if (c == n) {
        return l
    }
    var h = null;
    var a, k, d, g;
    if (c.getBoundingClientRect) {
        a = c.getBoundingClientRect();
        l.left = Math.floor(a.left) + Math.max(j.documentElement.scrollLeft, j.body.scrollLeft);
        l.top = Math.floor(a.top) + Math.max(j.documentElement.scrollTop, j.body.scrollTop);
        l.left -= j.documentElement.clientLeft;
        l.top -= j.documentElement.clientTop;
        k = j.body;
        d = parseInt(m(k, "border-left-width"));
        g = parseInt(m(k, "border-top-width"));
        if (o.ie && !o.isStrict) {
            l.left -= isNaN(d) ? 2 : d;
            l.top -= isNaN(g) ? 2 : g
        }
    } else {
        if (j.getBoxObjectFor && !p) {
            a = j.getBoxObjectFor(c);
            var f = j.getBoxObjectFor(n);
            l.left = a.screenX - f.screenX;
            l.top = a.screenY - f.screenY
        } else {
            h = c;
            do {
                l.left += h.offsetLeft;
                l.top += h.offsetTop;
                if (o.isWebkit > 0 && m(h, "position") == "fixed") {
                    l.left += j.body.scrollLeft;
                    l.top += j.body.scrollTop;
                    break
                }
                h = h.offsetParent
            } while (h && h != c);
            if (o.opera > 0 || (o.isWebkit > 0 && m(c, "position") == "absolute")) {
                l.top -= j.body.offsetTop
            }
            h = c.offsetParent;
            while (h && h != j.body) {
                l.left -= h.scrollLeft;
                if (!b.opera || h.tagName != "TR") {
                    l.top -= h.scrollTop
                }
                h = h.offsetParent
            }
        }
    }
    return l
};
baidu.dom.intersect = function (c, d) {
    var f = baidu.dom.g, g = baidu.dom.getPosition, a = Math.max, j = Math.min;
    c = f(c);
    d = f(d);
    var h = g(c), k = g(d);
    return a(h.left, k.left) <= j(h.left + c.offsetWidth, k.left + d.offsetWidth) && a(h.top, k.top) <= j(h.top + c.offsetHeight, k.top + d.offsetHeight)
};
baidu.dom.last = function (a) {
    return baidu.dom._matchNode(a, "previousSibling", "lastChild")
};
baidu.dom.ready = function () {
    var f = false, c = false, d = [];

    function a() {
        if (!f) {
            f = true;
            for (var h = 0, j = d.length; h < j; h++) {
                d[h]()
            }
        }
    }

    function g() {
        if (c) {
            return
        }
        c = true;
        var h = document, k = window, l = baidu.browser.opera;
        if (h.addEventListener && !l) {
            h.addEventListener("DOMContentLoaded", l ? function () {
                if (f) {
                    return
                }
                for (var m = 0; m < h.styleSheets.length; m++) {
                    if (h.styleSheets[m].disabled) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                }
                a()
            } : a, false)
        } else {
            if (baidu.browser.ie && k == top) {
                (function () {
                    if (f) {
                        return
                    }
                    try {
                        h.documentElement.doScroll("left")
                    } catch (m) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    a()
                })()
            } else {
                if (baidu.browser.safari) {
                    var j;
                    (function () {
                        if (f) {
                            return
                        }
                        if (h.readyState != "loaded" && h.readyState != "complete") {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        if (j === undefined) {
                            j = 0;
                            var p = h.getElementsByTagName("style");
                            var n = h.getElementsByTagName("link");
                            if (p) {
                                j += p.length
                            }
                            if (n) {
                                for (var m = 0, o = n.length; m < o; m++) {
                                    if (n[m].getAttribute("rel") == "stylesheet") {
                                        j++
                                    }
                                }
                            }
                        }
                        if (h.styleSheets.length != j) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        a()
                    })()
                }
            }
        }
        k.attachEvent ? k.attachEvent("onload", a) : k.addEventListener("load", a, false)
    }

    return function (h) {
        g();
        f ? h() : (d[d.length] = h)
    }
}();
baidu.dom.getAncestorByTag = function (c, a) {
    c = baidu.dom.g(c);
    a = a.toUpperCase();
    while ((c = c.parentNode) && c.nodeType == 1) {
        if (c.tagName == a) {
            return c
        }
    }
    return null
};
baidu.dom.getWindow = function (a) {
    a = baidu.dom.g(a);
    var c = baidu.dom.getDocument(a);
    return c.parentWindow || c.defaultView || null
};
baidu.dom.getAncestorBy = function (a, c) {
    a = baidu.dom.g(a);
    while ((a = a.parentNode) && a.nodeType == 1) {
        if (c(a)) {
            return a
        }
    }
    return null
};
baidu.dom.hide = function (a) {
    a = baidu.dom.g(a);
    a.style.display = "none";
    return a
};
baidu.hide = baidu.dom.hide;
baidu.dom.next = function (a) {
    return baidu.dom._matchNode(a, "nextSibling", "nextSibling")
};
baidu.dom.show = function (a) {
    a = baidu.dom.g(a);
    a.style.display = "";
    return a
};
baidu.show = baidu.dom.show;
baidu.dom.toggle = function (a) {
    a = baidu.dom.g(a);
    a.style.display = a.style.display == "none" ? "" : "none";
    return a
};
baidu.dom._g = function (a) {
    if ("string" == typeof a || a instanceof String) {
        return document.getElementById(a)
    }
    return a
};
baidu._g = baidu.dom._g;
baidu.dom.insertAfter = function (c, d) {
    var f, a;
    f = baidu.dom._g;
    c = f(c);
    d = f(d);
    a = d.parentNode;
    if (a) {
        a.insertBefore(c, d.nextSibling)
    }
    return c
};
baidu.dom.first = function (a) {
    return baidu.dom._matchNode(a, "nextSibling", "firstChild")
};
baidu.dom.insertBefore = function (c, d) {
    var f, a;
    f = baidu.dom._g;
    c = f(c);
    d = f(d);
    a = d.parentNode;
    if (a) {
        a.insertBefore(c, d)
    }
    return c
};
baidu.dom.insertHTML = function (f, a, g) {
    f = baidu.dom.g(f);
    if (f.insertAdjacentHTML) {
        f.insertAdjacentHTML(a, g)
    } else {
        var j = f.ownerDocument.createRange();
        j.setStartBefore(f);
        var h = j.createContextualFragment(g), c = f.parentNode, d;
        switch (a.toUpperCase()) {
            case"BEFOREBEGIN":
                c.insertBefore(h, f);
                break;
            case"AFTERBEGIN":
                f.insertBefore(h, f.firstChild);
                break;
            case"BEFOREEND":
                f.appendChild(h);
                break;
            case"AFTEREND":
                (d = f.nextSibling) ? c.insertBefore(h, d) : c.appendChild(h)
        }
    }
    return f
};
baidu.insertHTML = baidu.dom.insertHTML;
baidu.dom.remove = function (a) {
    a = baidu.dom.g(a);
    (tmpEl = a.parentNode) && tmpEl.removeChild(a)
};
baidu.dom.getAncestorByClass = function (a, c) {
    a = baidu.dom.g(a);
    c = new RegExp("(^|\\s)" + baidu.string.trim(c) + "(\\s|\x24)");
    while ((a = a.parentNode) && a.nodeType == 1) {
        if (c.test(a.className)) {
            return a
        }
    }
    return null
};
baidu.lang = baidu.lang || {};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.instance = function (a) {
    return window[baidu.guid]._instances[a] || null
};
baidu.lang.isNumber = function (a) {
    return "[object Number]" == Object.prototype.toString.call(a)
};
baidu.lang.guid = function () {
    return "TANGRAM__" + (window[baidu.guid]._counter++).toString(36)
};
window[baidu.guid]._counter = window[baidu.guid]._counter || 1;
baidu.lang.Class = function (a) {
    this.guid = a || baidu.lang.guid();
    window[baidu.guid]._instances[this.guid] = this
};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class.prototype.dispose = function () {
    delete window[baidu.guid]._instances[this.guid];
    for (var a in this) {
        if (typeof this[a] != "function") {
            delete this[a]
        }
    }
    this.disposed = true
};
baidu.lang.Class.prototype.toString = function () {
    return "[object " + (this._className || "Object") + "]"
};
baidu.lang.inherits = function (c, f, g) {
    var h, d, a = c.prototype, j = new Function();
    j.prototype = f.prototype;
    d = c.prototype = new j();
    for (h in a) {
        d[h] = a[h]
    }
    c.prototype.constructor = c;
    c.superClass = f.prototype;
    if ("string" == typeof g) {
        d._className = g
    }
};
baidu.inherits = baidu.lang.inherits;
baidu.lang.isElement = function (a) {
    return !!(a && a.nodeName && a.nodeType == 1)
};
baidu.lang.module = function (name, module, owner) {
    var packages = name.split("."), len = packages.length - 1, packageName, i = 0;
    if (!owner) {
        try {
            if (!(new RegExp("^[a-zA-Z_\x24][a-zA-Z0-9_\x24]*\x24")).test(packages[0])) {
                throw""
            }
            owner = eval(packages[0]);
            i = 1
        } catch (e) {
            owner = window
        }
    }
    for (; i < len; i++) {
        packageName = packages[i];
        if (!owner[packageName]) {
            owner[packageName] = {}
        }
        owner = owner[packageName]
    }
    if (!owner[packages[len]]) {
        owner[packages[len]] = module
    }
};
baidu.lang.decontrol = function (c) {
    var a = window[baidu.guid];
    a._instances && (delete a._instances[c])
};
baidu.lang.isArray = function (a) {
    return "[object Array]" == Object.prototype.toString.call(a)
};
baidu.lang.Event = function (a, c) {
    this.type = a;
    this.returnValue = true;
    this.target = c || null;
    this.currentTarget = null
};
baidu.lang.Class.prototype.addEventListener = function (d, f, g) {
    if (typeof f != "function") {
        return
    }
    !this.__listeners && (this.__listeners = {});
    var a = this.__listeners, c;
    if (typeof g == "string" && g) {
        if (/[^\w\-]/.test(g)) {
            throw ("nonstandard key:" + g)
        } else {
            f.hashCode = g;
            c = g
        }
    }
    d.indexOf("on") != 0 && (d = "on" + d);
    typeof a[d] != "object" && (a[d] = {});
    c = c || baidu.lang.guid();
    f.hashCode = c;
    a[d][c] = f
};
baidu.lang.Class.prototype.removeEventListener = function (c, d) {
    if (typeof d == "function") {
        d = d.hashCode
    } else {
        if (typeof d != "string") {
            return
        }
    }
    !this.__listeners && (this.__listeners = {});
    c.indexOf("on") != 0 && (c = "on" + c);
    var a = this.__listeners;
    if (!a[c]) {
        return
    }
    a[c][d] && delete a[c][d]
};
baidu.lang.Class.prototype.dispatchEvent = function (d, a) {
    if ("string" == typeof d) {
        d = new baidu.lang.Event(d)
    }
    !this.__listeners && (this.__listeners = {});
    a = a || {};
    for (var f in a) {
        typeof d[f] == "undefined" && (d[f] = a[f])
    }
    var f, g = this.__listeners, c = d.type;
    d.target = d.target || this;
    d.currentTarget = this;
    c.indexOf("on") != 0 && (c = "on" + c);
    typeof this[c] == "function" && this[c].apply(this, arguments);
    if (typeof g[c] == "object") {
        for (f in g[c]) {
            g[c][f].apply(this, arguments)
        }
    }
    return d.returnValue
};
baidu.lang.isObject = function (a) {
    return "function" == typeof a || !!(a && "object" == typeof a)
};
baidu.isObject = baidu.lang.isObject;
baidu.lang.isString = function (a) {
    return "[object String]" == Object.prototype.toString.call(a)
};
baidu.isString = baidu.lang.isString;
baidu.event = baidu.event || {};
baidu.event.getPageX = function (d) {
    var a = d.pageX, c = document;
    if (!a && a !== 0) {
        a = (d.clientX || 0) + (c.documentElement.scrollLeft || c.body.scrollLeft)
    }
    return a
};
baidu.event.getPageY = function (d) {
    var a = d.pageY, c = document;
    if (!a && a !== 0) {
        a = (d.clientY || 0) + (c.documentElement.scrollTop || c.body.scrollTop)
    }
    return a
};
baidu.event.stopPropagation = function (a) {
    if (a.stopPropagation) {
        a.stopPropagation()
    } else {
        a.cancelBubble = true
    }
};
baidu.event.preventDefault = function (a) {
    if (a.preventDefault) {
        a.preventDefault()
    } else {
        a.returnValue = false
    }
};
baidu.event.stop = function (a) {
    var c = baidu.event;
    c.stopPropagation(a);
    c.preventDefault(a)
};
baidu.event.getTarget = function (a) {
    return a.target || a.srcElement
};
baidu.event.EventArg = function (f, c) {
    c = c || window;
    f = f || c.event;
    var d = c.document;
    this.target = f.target || f.srcElement;
    this.keyCode = f.which || f.keyCode;
    for (var a in f) {
        var g = f[a];
        if ("function" != typeof g) {
            this[a] = g
        }
    }
    if (!this.pageX && this.pageX !== 0) {
        this.pageX = (f.clientX || 0) + (d.documentElement.scrollLeft || d.body.scrollLeft);
        this.pageY = (f.clientY || 0) + (d.documentElement.scrollTop || d.body.scrollTop)
    }
    this._event = f
};
baidu.event.EventArg.prototype.preventDefault = function () {
    if (this._event.preventDefault) {
        this._event.preventDefault()
    } else {
        this._event.returnValue = false
    }
    return this
};
baidu.event.EventArg.prototype.stopPropagation = function () {
    if (this._event.stopPropagation) {
        this._event.stopPropagation()
    } else {
        this._event.cancelBubble = true
    }
    return this
};
baidu.event.EventArg.prototype.stop = function () {
    return this.stopPropagation().preventDefault()
};
baidu.event._unload = function () {
    var f = baidu.event._listeners, a = f.length, g = !!window.removeEventListener, c, d;
    while (a--) {
        c = f[a];
        if (c[1] == "unload") {
            continue
        }
        d = c[0];
        if (d.removeEventListener) {
            d.removeEventListener(c[1], c[3], false)
        } else {
            if (d.detachEvent) {
                d.detachEvent("on" + c[1], c[3])
            }
        }
    }
    if (g) {
        window.removeEventListener("unload", baidu.event._unload, false)
    } else {
        window.detachEvent("onunload", baidu.event._unload)
    }
};
if (window.attachEvent) {
    window.attachEvent("onunload", baidu.event._unload)
} else {
    window.addEventListener("unload", baidu.event._unload, false)
}
baidu.event._listeners = baidu.event._listeners || [];
baidu.event.on = function (g, d, c) {
    d = d.replace(/^on/i, "");
    g = baidu.dom._g(g);
    var f = function (h) {
        c.call(g, h)
    }, a = baidu.event._listeners;
    a[a.length] = [g, d, c, f];
    if (g.addEventListener) {
        g.addEventListener(d, f, false)
    } else {
        if (g.attachEvent) {
            g.attachEvent("on" + d, f)
        }
    }
    return g
};
baidu.on = baidu.event.on;
baidu.event.get = function (a, c) {
    return new baidu.event.EventArg(a, c)
};
baidu.event.un = function (h, g, d) {
    h = baidu.dom.g(h);
    g = g.replace(/^on/i, "");
    var j = baidu.event._listeners, a = j.length, c = !d, f;
    while (a--) {
        f = j[a];
        if (f[1] === g && f[0] === h && (c || f[2] === d)) {
            if (h.removeEventListener) {
                h.removeEventListener(g, f[3], false)
            } else {
                if (h.detachEvent) {
                    h.detachEvent("on" + g, f[3])
                }
            }
            j.splice(a, 1)
        }
    }
    return h
};
baidu.un = baidu.event.un;
baidu.event.getKeyCode = function (a) {
    return a.which || a.keyCode
};
baidu.ajax = baidu.ajax || {};
baidu.ajax.request = function (a, g) {
    function m() {
        if (h.readyState == 4) {
            try {
                var s = h.status
            } catch (t) {
                r("failure");
                return
            }
            r(s);
            if ((s >= 200 && s < 300) || s == 304 || s == 1223) {
                r("success")
            } else {
                r("failure")
            }
            window.setTimeout(function () {
                h.onreadystatechange = new Function();
                if (p) {
                    h = null
                }
            }, 0)
        }
    }

    function c() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP")
            } catch (s) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (s) {
                }
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        }
    }

    function r(t) {
        t = "on" + t;
        var u = d[t], s = baidu.ajax[t];
        if (u) {
            if (t != "onsuccess") {
                u(h)
            } else {
                u(h, h.responseText)
            }
        } else {
            if (s) {
                if (t == "onsuccess") {
                    return
                }
                s(h)
            }
        }
    }

    g = g || {};
    var n = g.data || "", p = !(g.async === false), o = g.username || "", j = g.password || "",
        f = (g.method || "GET").toUpperCase(), q = g.headers || {}, d = {}, k, h;
    for (k in g) {
        d[k] = g[k]
    }
    q["X-Request-By"] = "baidu.ajax";
    try {
        h = c();
        if (f == "GET") {
            a += (a.indexOf("?") >= 0 ? "&" : "?");
            if (n) {
                a += n + "&";
                n = null
            }
            if (g.noCache) {
                a += "b" + (new Date()).getTime() + "=1"
            }
        }
        if (o) {
            h.open(f, a, p, o, j)
        } else {
            h.open(f, a, p)
        }
        if (p) {
            h.onreadystatechange = m
        }
        if (f == "POST") {
            h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        }
        for (k in q) {
            if (q.hasOwnProperty(k)) {
                h.setRequestHeader(k, q[k])
            }
        }
        r("beforerequest");
        h.send(n);
        if (!p) {
            m()
        }
    } catch (l) {
        r("failure")
    }
    return h
};
baidu.ajax.post = function (d, c, a) {
    return baidu.ajax.request(d, {onsuccess: a, method: "POST", data: c})
};
baidu.ajax.get = function (c, a) {
    return baidu.ajax.request(c, {onsuccess: a})
};
baidu.ajax.form = function (v, t) {
    t = t || {};
    var q = v.elements, j = q.length, u = v.getAttribute("method"), r = v.getAttribute("action"),
        a = t.replacer || function (w, x) {
            return w
        }, f = {}, c = [], l, g, d, k, s, p, o, m, n;

    function h(x, w) {
        c.push(x + "=" + w)
    }

    for (l in t) {
        if (t.hasOwnProperty(l)) {
            f[l] = t[l]
        }
    }
    for (l = 0; l < j; l++) {
        g = q[l];
        k = g.name;
        if (!g.disabled && k) {
            d = g.type;
            s = g.value;
            switch (d) {
                case"radio":
                case"checkbox":
                    if (!g.checked) {
                        break
                    }
                case"textarea":
                case"text":
                case"password":
                case"hidden":
                case"select-one":
                    h(k, a(s, k));
                    break;
                case"select-multiple":
                    p = g.options;
                    m = p.length;
                    for (o = 0; o < m; o++) {
                        n = p[o];
                        if (n.selected) {
                            h(k, a(n.value, k))
                        }
                    }
                    break
            }
        }
    }
    f.data = c.join("&");
    f.method = v.getAttribute("method") || "POST";
    return baidu.ajax.request(r, f)
};
baidu.sio = baidu.sio || {};
baidu.sio._removeScriptTag = function (c) {
    if (c.clearAttributes) {
        c.clearAttributes()
    } else {
        for (var a in c) {
            if (c.hasOwnProperty(a)) {
                delete c[a]
            }
        }
    }
    if (c && c.parentNode) {
        c.parentNode.removeChild(c)
    }
    c = null
};
baidu.sio.callByBrowser = function (g, c, h) {
    h = h || {};
    var f = document.createElement("SCRIPT"), j = 0, a, d = h.charset;
    f.onload = f.onreadystatechange = function () {
        if (j) {
            return
        }
        var k = f.readyState;
        if ("undefined" == typeof k || k == "loaded" || k == "complete") {
            j = 1;
            try {
                ("function" == typeof c) && c()
            } finally {
                baidu.sio._removeScriptTag(f)
            }
        }
    };
    f.setAttribute("type", "text/javascript");
    d && f.setAttribute("charset", d);
    f.setAttribute("src", g);
    document.getElementsByTagName("head")[0].appendChild(f)
};
baidu.sio.callByServer = function (f, h, g) {
    g = g || {};
    var l = document.createElement("SCRIPT"), a = "bd__cbs__", c = typeof h, j, k, d = g.charset;
    if ("string" == c) {
        j = h
    } else {
        if ("function" == c) {
            while (1) {
                j = a + Math.floor(Math.random() * 2147483648).toString(36);
                if (!window[j]) {
                    window[j] = function () {
                        try {
                            h.apply(window, arguments)
                        } finally {
                            baidu.sio._removeScriptTag(l);
                            window[j] = null
                        }
                    };
                    break
                }
            }
        }
    }
    if ("string" == typeof j) {
        f = f.replace(/(\?|&)callback=[^&]*/, "\x241callback=" + j);
        if (f.search(/(\?|&)callback=/) < 0) {
            f += (f.indexOf("?") < 0 ? "?" : "&");
            f += "callback=" + j
        }
    }
    l.setAttribute("type", "text/javascript");
    d && l.setAttribute("charset", d);
    l.setAttribute("src", f);
    document.getElementsByTagName("head")[0].appendChild(l)
};
baidu.swf = baidu.swf || {};
baidu.swf.version = (function () {
    var c = navigator;
    if (c.plugins && c.mimeTypes.length) {
        var g = c.plugins["Shockwave Flash"];
        if (g && g.description) {
            return g.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
        }
    } else {
        if (window.ActiveXObject && !window.opera) {
            for (var h = 10; h >= 2; h--) {
                try {
                    var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + h);
                    if (d) {
                        var a = d.GetVariable("$version");
                        return a.replace(/WIN/g, "").replace(/,/g, ".")
                    }
                } catch (f) {
                }
            }
        }
    }
})();
baidu.swf.createHTML = function (g) {
    g = g || {};
    var o = baidu.swf.version, q = g.ver || "6.0.0", r, a, s, c, p, h, f = {};
    for (c in g) {
        f[c] = g[c]
    }
    g = f;
    if (o) {
        o = o.split(".");
        q = q.split(".");
        for (s = 0; s < 3; s++) {
            r = parseInt(o[s], 10);
            a = parseInt(q[s], 10);
            if (a < r) {
                break
            } else {
                if (a > r) {
                    return ""
                }
            }
        }
    } else {
        return ""
    }
    var m = g.vars, n = ["classid", "codebase", "id", "width", "height", "align"];
    g.align = g.align || "middle";
    g.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
    g.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
    g.movie = g.url || "";
    delete g.vars;
    delete g.url;
    if ("string" == typeof m) {
        g.flashvars = m
    } else {
        var k = [];
        for (c in m) {
            h = m[c];
            if (h) {
                k.push(c + "=" + encodeURIComponent(h))
            }
        }
        g.flashvars = k.join("&")
    }
    var l = ["<object "];
    for (s = 0, p = n.length; s < p; s++) {
        h = n[s];
        l.push(" ", h, '="', g[h], '"')
    }
    l.push(">");
    var d = {
        wmode: 1,
        scale: 1,
        quality: 1,
        play: 1,
        loop: 1,
        menu: 1,
        salign: 1,
        bgcolor: 1,
        base: 1,
        allowscriptaccess: 1,
        allownetworking: 1,
        allowfullscreen: 1,
        seamlesstabbing: 1,
        devicefont: 1,
        swliveconnect: 1,
        flashvars: 1,
        movie: 1
    };
    for (c in g) {
        h = g[c];
        c = c.toLowerCase();
        if (d[c] && h) {
            l.push('<param name="' + c + '" value="' + h + '" />')
        }
    }
    g.src = g.movie;
    g.name = g.id;
    delete g.id;
    delete g.movie;
    delete g.classid;
    delete g.codebase;
    g.type = "application/x-shockwave-flash";
    g.pluginspage = "http://www.macromedia.com/go/getflashplayer";
    l.push("<embed");
    var j;
    for (c in g) {
        h = g[c];
        if (h) {
            if ((new RegExp("^salign\x24", "i")).test(c)) {
                j = h;
                continue
            }
            l.push(" ", c, '="', h, '"')
        }
    }
    if (j) {
        l.push(' salign="', j, '"')
    }
    l.push("></embed></object>");
    return l.join("")
};
baidu.swf.getMovie = function (a) {
    return document[a] || window[a]
};
baidu.swf.create = function (a, c) {
    a = a || {};
    var d = baidu.swf.createHTML(a) || a.errorMessage || "";
    if (c && "string" == typeof c) {
        c = document.getElementById(c)
    }
    if (c) {
        c.innerHTML = d
    } else {
        document.write(d)
    }
};
baidu.object = baidu.object || {};
baidu.object.extend = function (c, a) {
    for (var d in a) {
        if (a.hasOwnProperty(d)) {
            c[d] = a[d]
        }
    }
    return c
};
baidu.extend = baidu.object.extend;
baidu.object.each = function (c, f) {
    var g, a, d;
    if ("function" == typeof f) {
        for (a in c) {
            if (c.hasOwnProperty(a)) {
                d = c[a];
                g = f.call(c, d, a);
                if (g === false) {
                    break
                }
            }
        }
    }
    return c
};
baidu.object.keys = function (c) {
    var a = [], d = 0, f;
    for (f in c) {
        if (c.hasOwnProperty(f)) {
            a[d++] = f
        }
    }
    return a
};
baidu.object.values = function (c) {
    var a = [], d = 0, f;
    for (f in c) {
        if (c.hasOwnProperty(f)) {
            a[d++] = c[f]
        }
    }
    return a
};
baidu.object.clone = (function (a) {
    return function (c) {
        var g = c, f, h;
        if (!c || c instanceof Number || c instanceof String || c instanceof Boolean) {
            return g
        } else {
            if (c instanceof Array) {
                g = [];
                var d = 0;
                for (f = 0, h = c.length; f < h; f++) {
                    g[d++] = baidu.object.clone(c[f])
                }
            } else {
                if ("object" == typeof c) {
                    if (a[Object.prototype.toString.call(c)]) {
                        return g
                    }
                    g = {};
                    for (f in c) {
                        if (c.hasOwnProperty(f)) {
                            g[f] = baidu.object.clone(c[f])
                        }
                    }
                }
            }
        }
        return g
    }
})({"[object Function]": 1, "[object RegExp]": 1, "[object Date]": 1, "[object Error]": 1});
baidu.string.getByteLength = function (a) {
    return String(a).replace(/[^\x00-\xff]/g, "ci").length
};
baidu.string.decodeHTML = function (a) {
    var c = String(a).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    return c.replace(/&#([\d]+);/g, function (d, f) {
        return String.fromCharCode(parseInt(f, 10))
    })
};
baidu.decodeHTML = baidu.string.decodeHTML;
baidu.string.format = function (d, a) {
    d = String(d);
    var f = Array.prototype.slice.call(arguments, 1), c = Object.prototype.toString;
    if (f.length) {
        f = f.length == 1 ? (a !== null && (/\[object Array\]|\[object Object\]/.test(c.call(a))) ? a : f) : f;
        return d.replace(/#\{(.+?)\}/g, function (j, g) {
            var h = f[g];
            if ("[object Function]" == c.call(h)) {
                h = h(g)
            }
            return ("undefined" == typeof h ? "" : h)
        })
    }
    return d
};
baidu.format = baidu.string.format;
baidu.string.wbr = function (a) {
    return String(a).replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, "$&<wbr>").replace(/><wbr>/g, ">")
};
baidu.string.subByte = function (c, a) {
    c = String(c);
    if (a < 0 || baidu.string.getByteLength(c) <= a) {
        return c
    }
    c = c.substr(0, a).replace(/([^\x00-\xff])/g, "\x241 ").substr(0, a).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "\x241");
    return c
};
baidu.string.toHalfWidth = function (a) {
    return String(a).replace(/[\uFF01-\uFF5E]/g, function (c) {
        return String.fromCharCode(c.charCodeAt(0) - 65248)
    }).replace(/\u3000/g, " ")
};
baidu.string.encodeHTML = function (a) {
    return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
};
baidu.encodeHTML = baidu.string.encodeHTML;
baidu.page = baidu.page || {};
baidu.page.getHeight = function () {
    var c = document, a = c.body, d = c.documentElement, f = c.compatMode == "BackCompat" ? a : c.documentElement;
    return Math.max(d.scrollHeight, a.scrollHeight, f.clientHeight)
};
baidu.page.loadCssFile = function (c) {
    var a = document.createElement("link");
    a.setAttribute("rel", "stylesheet");
    a.setAttribute("type", "text/css");
    a.setAttribute("href", c);
    document.getElementsByTagName("head")[0].appendChild(a)
};
baidu.page.getScrollLeft = function () {
    var a = document;
    return a.documentElement.scrollLeft || a.body.scrollLeft
};
baidu.page.getViewWidth = function () {
    var c = document, a = c.compatMode == "BackCompat" ? c.body : c.documentElement;
    return a.clientWidth
};
baidu.page.loadJsFile = function (c) {
    var a = document.createElement("script");
    a.setAttribute("type", "text/javascript");
    a.setAttribute("src", c);
    a.setAttribute("defer", "defer");
    document.getElementsByTagName("head")[0].appendChild(a)
};
baidu.page.getWidth = function () {
    var c = document, a = c.body, d = c.documentElement, f = c.compatMode == "BackCompat" ? a : c.documentElement;
    return Math.max(d.scrollWidth, a.scrollWidth, f.clientWidth)
};
baidu.page.getScrollTop = function () {
    var a = document;
    return a.documentElement.scrollTop || a.body.scrollTop
};
baidu.page.getViewHeight = function () {
    var c = document, a = c.compatMode == "BackCompat" ? c.body : c.documentElement;
    return a.clientHeight
};
baidu.array = baidu.array || {};
baidu.array.filter = function (c, f) {
    var h = [], j = 0, a = c.length, d, g;
    if ("function" == typeof f) {
        for (g = 0; g < a; g++) {
            d = c[g];
            if (true === f.call(c, d, g)) {
                h[j++] = d
            }
        }
    }
    return h
};
baidu.array.unique = function (d, c) {
    var h = d.length, a = d.slice(0), f, g;
    if ("function" != typeof c) {
        c = function (j, k) {
            return j === k
        }
    }
    while (--h > 0) {
        g = a[h];
        f = h;
        while (f--) {
            if (c(g, a[f])) {
                a.splice(h, 1);
                break
            }
        }
    }
    return a
};
baidu.array.indexOf = function (d, c, g) {
    var a = d.length, f = c;
    g = Number(g) || 0;
    g = g < 0 ? Math.ceil(g) : Math.floor(g);
    g = Math.min(Math.max(g, 0), a);
    if ("function" != typeof c) {
        f = function (h) {
            return c === h
        }
    }
    for (; g < a; g++) {
        if (true === f.call(d, d[g], g)) {
            return g
        }
    }
    return -1
};
baidu.array.remove = function (d, c) {
    var a = d.length, f = c;
    if ("function" != typeof c) {
        f = function (g) {
            return c === g
        }
    }
    while (a--) {
        if (true === f.call(d, d[a], a)) {
            d.splice(a, 1)
        }
    }
};
baidu.array.each = function (c, f) {
    var g, d, h, a = c.length;
    if ("function" == typeof f) {
        for (h = 0; h < a; h++) {
            d = c[h];
            g = f.call(c, d, h);
            if (g === false) {
                break
            }
        }
    }
    return c
};
baidu.each = baidu.array.each;
baidu.array.find = function (c, f) {
    var d, g, a = c.length;
    if ("function" == typeof f) {
        for (g = 0; g < a; g++) {
            d = c[g];
            if (true === f.call(c, d, g)) {
                return d
            }
        }
    }
    return null
};
baidu.array.lastIndexOf = function (d, c) {
    var a = d.length, f = c;
    if ("function" != typeof c) {
        f = function (g) {
            return c === g
        }
    }
    while (a--) {
        if (true === f.call(d, d[a], a)) {
            return a
        }
    }
    return -1
};
baidu.array.removeAt = function (c, a) {
    return c.splice(a, 1)[0]
};
baidu.lang.createClass = function (f, k) {
    k = k || {};
    var g = k.superClass || baidu.lang.Class;
    var h = function () {
        g.call(this);
        f.apply(this, arguments);
        for (var m = 0, l = h["\x06r"].length; m < l; m++) {
            h["\x06r"][m](this)
        }
    };
    h.options = k.options || {};
    h["\x06r"] = [];
    h.regist = function (l) {
        if (typeof l == "function") {
            h["\x06r"].push(l)
        }
    };
    var c = function () {
    }, d = f.prototype;
    c.prototype = g.prototype;
    var a = h.prototype = new c();
    for (var j in d) {
        a[j] = d[j]
    }
    typeof k.className == "string" && (a._className = k.className);
    a.constructor = d.constructor;
    h.extend = function (l) {
        for (var m in l) {
            h.prototype[m] = l[m]
        }
        return h
    };
    return h
};
baidu.lang.createSingle = function (d) {
    var c = new baidu.lang.Class();
    for (var a in d) {
        c[a] = d[a]
    }
    return c
};
baidu.string.filterFormat = function (d, a) {
    var f = Array.prototype.slice.call(arguments, 1), c = Object.prototype.toString;
    if (f.length) {
        f = f.length == 1 ? (a !== null && (/\[object Array\]|\[object Object\]/.test(c.call(a))) ? a : f) : f;
        return d.replace(/#\{(.+?)\}/g, function (m, j) {
            var g, k, l, n, h;
            if (!f) {
                return ""
            }
            g = j.split("|");
            k = f[g[0]];
            if ("[object Function]" == c.call(k)) {
                k = k(g[0])
            }
            for (l = 1, n = g.length; l < n; ++l) {
                h = baidu.string.filterFormat[g[l]];
                if ("[object Function]" == c.call(h)) {
                    k = h(k)
                }
            }
            return (("undefined" == typeof k || k === null) ? "" : k)
        })
    }
    return d
};
baidu.string.filterFormat.escapeJs = function (c) {
    if (!c || "string" != typeof c) {
        return c
    }
    var d, a, g, f = [];
    for (d = 0, a = c.length; d < a; ++d) {
        g = c.charCodeAt(d);
        if (g > 255) {
            f.push(c.charAt(d))
        } else {
            f.push("\\x" + g.toString(16))
        }
    }
    return f.join("")
};
baidu.string.filterFormat.js = baidu.string.filterFormat.escapeJs;
baidu.string.filterFormat.escapeString = function (a) {
    if (!a || "string" != typeof a) {
        return a
    }
    return a.replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;").replace(/>/g, "&#62;").replace(/\\/g, "&#92;").replace(/\//g, "&#47;")
};
baidu.string.filterFormat.e = baidu.string.filterFormat.escapeString;
baidu.string.filterFormat.toInt = function (a) {
    return parseInt(a, 10) || 0
};
baidu.string.filterFormat.i = baidu.string.filterFormat.toInt;
(function () {
    baidu.page.getMousePosition = function () {
        return {x: baidu.page.getScrollLeft() + a.x, y: baidu.page.getScrollTop() + a.y}
    };
    var a = {x: 0, y: 0};
    baidu.event.on(document, "onmousemove", function (c) {
        c = window.event || c;
        a.x = c.clientX;
        a.y = c.clientY
    })
})();
(function () {
    var k, l, a, c, d, h, o, g;
    baidu.dom.drag = function (q, r) {
        if (!(k = baidu.dom.g(q))) {
            return false
        }
        l = baidu.object.extend({autoStop: true, capture: true, interval: 20}, r);
        h = parseInt(baidu.dom.getStyle(k, "top")) || 0;
        o = parseInt(baidu.dom.getStyle(k, "left")) || 0;
        var p = baidu.page.getMousePosition();
        a = p.x;
        c = p.y;
        clearTimeout(d);
        d = setInterval(f, l.interval);
        l.autoStop && baidu.event.on(document, "mouseup", m);
        baidu.event.on(document.body, "selectstart", n);
        if (l.capture && k.setCapture) {
            k.setCapture()
        } else {
            if (l.capture && window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
            }
        }
        g = document.body.style.MozUserSelect;
        document.body.style.MozUserSelect = "none";
        typeof l.ondragstart == "function" && l.ondragstart(k, l);
        return {stop: j}
    };

    function j() {
        clearTimeout(d);
        if (l.capture && k.releaseCapture) {
            k.releaseCapture()
        } else {
            if (l.capture && window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
            }
        }
        document.body.style.MozUserSelect = g;
        baidu.event.un(document.body, "selectstart", n);
        typeof l.ondragend == "function" && l.ondragend(k, l)
    }

    function f(p) {
        var t = l.range, q = baidu.page.getMousePosition(), s = o + q.x - a, r = h + q.y - c;
        if (typeof t == "object" && t && t.length == 4) {
            s = Math.max(t[3], s);
            s = Math.min(t[1] - k.offsetWidth, s);
            r = Math.max(t[0], r);
            r = Math.min(t[2] - k.offsetHeight, r)
        }
        k.style.top = r + "px";
        k.style.left = s + "px";
        typeof l.ondrag == "function" && l.ondrag(k, l)
    }

    function m(p) {
        j();
        baidu.event.un(document, "mouseup", m)
    }

    function n(p) {
        return baidu.event.preventDefault(p, false)
    }
})();
baidu.dom.draggable = function (c, a) {
    a = baidu.object.extend({
        toggle: function () {
            return true
        }
    }, a || {});
    a.autoStop = true;
    if ((c = baidu.dom.g(c)) && baidu.dom.getStyle(c, "position") != "static") {
        baidu.event.on(a.handler || c, "onmousedown", function () {
            if (typeof a.toggle == "function" && !a.toggle()) {
                return
            }
            baidu.dom.drag(c, a)
        })
    }
    return c
};
(function () {
    var h = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        o = 0, a = Object.prototype.toString, j = false, p = true;
    [0, 0].sort(function () {
        p = false;
        return 0
    });
    var d = function (x, E, u, t) {
        u = u || [];
        E = E || document;
        var I = E;
        if (E.nodeType !== 1 && E.nodeType !== 9) {
            return []
        }
        if (!x || typeof x !== "string") {
            return u
        }
        var w = [], B, G, A, C, y = true, z = d.isXML(E), J = x, H, D, F, v;
        do {
            h.exec("");
            B = h.exec(J);
            if (B) {
                J = B[3];
                w.push(B[1]);
                if (B[2]) {
                    C = B[3];
                    break
                }
            }
        } while (B);
        if (w.length > 1 && n.exec(x)) {
            if (w.length === 2 && s.relative[w[0]]) {
                G = q(w[0] + w[1], E)
            } else {
                G = s.relative[w[0]] ? [E] : d(w.shift(), E);
                while (w.length) {
                    x = w.shift();
                    if (s.relative[x]) {
                        x += w.shift()
                    }
                    G = q(x, G)
                }
            }
        } else {
            if (!t && w.length > 1 && E.nodeType === 9 && !z && s.match.ID.test(w[0]) && !s.match.ID.test(w[w.length - 1])) {
                H = d.find(w.shift(), E, z);
                E = H.expr ? d.filter(H.expr, H.set)[0] : H.set[0]
            }
            if (E) {
                H = t ? {
                    expr: w.pop(),
                    set: f(t)
                } : d.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && E.parentNode ? E.parentNode : E, z);
                G = H.expr ? d.filter(H.expr, H.set) : H.set;
                if (w.length > 0) {
                    A = f(G)
                } else {
                    y = false
                }
                while (w.length) {
                    D = w.pop();
                    F = D;
                    if (!s.relative[D]) {
                        D = ""
                    } else {
                        F = w.pop()
                    }
                    if (F == null) {
                        F = E
                    }
                    s.relative[D](A, F, z)
                }
            } else {
                A = w = []
            }
        }
        if (!A) {
            A = G
        }
        if (!A) {
            d.error(D || x)
        }
        if (a.call(A) === "[object Array]") {
            if (!y) {
                u.push.apply(u, A)
            } else {
                if (E && E.nodeType === 1) {
                    for (v = 0; A[v] != null; v++) {
                        if (A[v] && (A[v] === true || A[v].nodeType === 1 && d.contains(E, A[v]))) {
                            u.push(G[v])
                        }
                    }
                } else {
                    for (v = 0; A[v] != null; v++) {
                        if (A[v] && A[v].nodeType === 1) {
                            u.push(G[v])
                        }
                    }
                }
            }
        } else {
            f(A, u)
        }
        if (C) {
            d(C, I, u, t);
            d.uniqueSort(u)
        }
        return u
    };
    d.uniqueSort = function (t) {
        if (c) {
            j = p;
            t.sort(c);
            if (j) {
                for (var u = 1; u < t.length; u++) {
                    if (t[u] === t[u - 1]) {
                        t.splice(u--, 1)
                    }
                }
            }
        }
        return t
    };
    d.matches = function (u, t) {
        return d(u, null, null, t)
    };
    d.find = function (u, B, t) {
        var v;
        if (!u) {
            return []
        }
        for (var y = 0, z = s.order.length; y < z; y++) {
            var w = s.order[y], x;
            if ((x = s.leftMatch[w].exec(u))) {
                var A = x[1];
                x.splice(1, 1);
                if (A.substr(A.length - 1) !== "\\") {
                    x[1] = (x[1] || "").replace(/\\/g, "");
                    v = s.find[w](x, B, t);
                    if (v != null) {
                        u = u.replace(s.match[w], "");
                        break
                    }
                }
            }
        }
        if (!v) {
            v = B.getElementsByTagName("*")
        }
        return {set: v, expr: u}
    };
    d.filter = function (I, J, F, y) {
        var A = I, B = [], u = J, w, E, v = J && J[0] && d.isXML(J[0]);
        while (I && J.length) {
            for (var t in s.filter) {
                if ((w = s.leftMatch[t].exec(I)) != null && w[2]) {
                    var C = s.filter[t], D, G, z = w[1];
                    E = false;
                    w.splice(1, 1);
                    if (z.substr(z.length - 1) === "\\") {
                        continue
                    }
                    if (u === B) {
                        B = []
                    }
                    if (s.preFilter[t]) {
                        w = s.preFilter[t](w, u, F, B, y, v);
                        if (!w) {
                            E = D = true
                        } else {
                            if (w === true) {
                                continue
                            }
                        }
                    }
                    if (w) {
                        for (var x = 0; (G = u[x]) != null; x++) {
                            if (G) {
                                D = C(G, w, x, u);
                                var H = y ^ !!D;
                                if (F && D != null) {
                                    if (H) {
                                        E = true
                                    } else {
                                        u[x] = false
                                    }
                                } else {
                                    if (H) {
                                        B.push(G);
                                        E = true
                                    }
                                }
                            }
                        }
                    }
                    if (D !== undefined) {
                        if (!F) {
                            u = B
                        }
                        I = I.replace(s.match[t], "");
                        if (!E) {
                            return []
                        }
                        break
                    }
                }
            }
            if (I === A) {
                if (E == null) {
                    d.error(I)
                } else {
                    break
                }
            }
            A = I
        }
        return u
    };
    d.error = function (t) {
        throw"Syntax error, unrecognized expression: " + t
    };
    var s = d.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {"class": "className", "for": "htmlFor"},
        attrHandle: {
            href: function (t) {
                return t.getAttribute("href")
            }
        },
        relative: {
            "+": function (t, y) {
                var w = typeof y === "string", u = w && !/\W/.test(y), A = w && !u;
                if (u) {
                    y = y.toLowerCase()
                }
                for (var x = 0, z = t.length, v; x < z; x++) {
                    if ((v = t[x])) {
                        while ((v = v.previousSibling) && v.nodeType !== 1) {
                        }
                        t[x] = A || v && v.nodeName.toLowerCase() === y ? v || false : v === y
                    }
                }
                if (A) {
                    d.filter(y, t, true)
                }
            }, ">": function (t, y) {
                var v = typeof y === "string", u, x = 0, z = t.length;
                if (v && !/\W/.test(y)) {
                    y = y.toLowerCase();
                    for (; x < z; x++) {
                        u = t[x];
                        if (u) {
                            var w = u.parentNode;
                            t[x] = w.nodeName.toLowerCase() === y ? w : false
                        }
                    }
                } else {
                    for (; x < z; x++) {
                        u = t[x];
                        if (u) {
                            t[x] = v ? u.parentNode : u.parentNode === y
                        }
                    }
                    if (v) {
                        d.filter(y, t, true)
                    }
                }
            }, "": function (v, x, t) {
                var w = o++, y = g, u;
                if (typeof x === "string" && !/\W/.test(x)) {
                    x = x.toLowerCase();
                    u = x;
                    y = k
                }
                y("parentNode", x, w, v, u, t)
            }, "~": function (v, x, t) {
                var w = o++, y = g, u;
                if (typeof x === "string" && !/\W/.test(x)) {
                    x = x.toLowerCase();
                    u = x;
                    y = k
                }
                y("previousSibling", x, w, v, u, t)
            }
        },
        find: {
            ID: function (v, u, t) {
                if (typeof u.getElementById !== "undefined" && !t) {
                    var w = u.getElementById(v[1]);
                    return w ? [w] : []
                }
            }, NAME: function (w, t) {
                if (typeof t.getElementsByName !== "undefined") {
                    var x = [], u = t.getElementsByName(w[1]);
                    for (var v = 0, y = u.length; v < y; v++) {
                        if (u[v].getAttribute("name") === w[1]) {
                            x.push(u[v])
                        }
                    }
                    return x.length === 0 ? null : x
                }
            }, TAG: function (u, t) {
                return t.getElementsByTagName(u[1])
            }
        },
        preFilter: {
            CLASS: function (w, y, x, z, t, A) {
                w = " " + w[1].replace(/\\/g, "") + " ";
                if (A) {
                    return w
                }
                for (var v = 0, u; (u = y[v]) != null; v++) {
                    if (u) {
                        if (t ^ (u.className && (" " + u.className + " ").replace(/[\t\n]/g, " ").indexOf(w) >= 0)) {
                            if (!x) {
                                z.push(u)
                            }
                        } else {
                            if (x) {
                                y[v] = false
                            }
                        }
                    }
                }
                return false
            }, ID: function (t) {
                return t[1].replace(/\\/g, "")
            }, TAG: function (t, u) {
                return t[1].toLowerCase()
            }, CHILD: function (u) {
                if (u[1] === "nth") {
                    var t = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(u[2] === "even" && "2n" || u[2] === "odd" && "2n+1" || !/\D/.test(u[2]) && "0n+" + u[2] || u[2]);
                    u[2] = (t[1] + (t[2] || 1)) - 0;
                    u[3] = t[3] - 0
                }
                u[0] = o++;
                return u
            }, ATTR: function (v, y, x, z, u, t) {
                var w = v[1].replace(/\\/g, "");
                if (!t && s.attrMap[w]) {
                    v[1] = s.attrMap[w]
                }
                if (v[2] === "~=") {
                    v[4] = " " + v[4] + " "
                }
                return v
            }, PSEUDO: function (u, x, w, y, t) {
                if (u[1] === "not") {
                    if ((h.exec(u[3]) || "").length > 1 || /^\w/.test(u[3])) {
                        u[3] = d(u[3], null, null, x)
                    } else {
                        var v = d.filter(u[3], x, w, true ^ t);
                        if (!w) {
                            y.push.apply(y, v)
                        }
                        return false
                    }
                } else {
                    if (s.match.POS.test(u[0]) || s.match.CHILD.test(u[0])) {
                        return true
                    }
                }
                return u
            }, POS: function (t) {
                t.unshift(true);
                return t
            }
        },
        filters: {
            enabled: function (t) {
                return t.disabled === false && t.type !== "hidden"
            }, disabled: function (t) {
                return t.disabled === true
            }, checked: function (t) {
                return t.checked === true
            }, selected: function (t) {
                t.parentNode.selectedIndex;
                return t.selected === true
            }, parent: function (t) {
                return !!t.firstChild
            }, empty: function (t) {
                return !t.firstChild
            }, has: function (t, u, v) {
                return !!d(v[3], t).length
            }, header: function (t) {
                return (/h\d/i).test(t.nodeName)
            }, text: function (t) {
                return "text" === t.type
            }, radio: function (t) {
                return "radio" === t.type
            }, checkbox: function (t) {
                return "checkbox" === t.type
            }, file: function (t) {
                return "file" === t.type
            }, password: function (t) {
                return "password" === t.type
            }, submit: function (t) {
                return "submit" === t.type
            }, image: function (t) {
                return "image" === t.type
            }, reset: function (t) {
                return "reset" === t.type
            }, button: function (t) {
                return "button" === t.type || t.nodeName.toLowerCase() === "button"
            }, input: function (t) {
                return (/input|select|textarea|button/i).test(t.nodeName)
            }
        },
        setFilters: {
            first: function (t, u) {
                return u === 0
            }, last: function (u, v, w, t) {
                return v === t.length - 1
            }, even: function (t, u) {
                return u % 2 === 0
            }, odd: function (t, u) {
                return u % 2 === 1
            }, lt: function (t, u, v) {
                return u < v[3] - 0
            }, gt: function (t, u, v) {
                return u > v[3] - 0
            }, nth: function (t, u, v) {
                return v[3] - 0 === u
            }, eq: function (t, u, v) {
                return v[3] - 0 === u
            }
        },
        filter: {
            PSEUDO: function (z, u, v, t) {
                var B = u[1], A = s.filters[B];
                if (A) {
                    return A(z, v, u, t)
                } else {
                    if (B === "contains") {
                        return (z.textContent || z.innerText || d.getText([z]) || "").indexOf(u[3]) >= 0
                    } else {
                        if (B === "not") {
                            var y = u[3];
                            for (var w = 0, x = y.length; w < x; w++) {
                                if (y[w] === z) {
                                    return false
                                }
                            }
                            return true
                        } else {
                            d.error("Syntax error, unrecognized expression: " + B)
                        }
                    }
                }
            }, CHILD: function (C, z) {
                var w = z[1], B = C;
                switch (w) {
                    case"only":
                    case"first":
                        while ((B = B.previousSibling)) {
                            if (B.nodeType === 1) {
                                return false
                            }
                        }
                        if (w === "first") {
                            return true
                        }
                        B = C;
                    case"last":
                        while ((B = B.nextSibling)) {
                            if (B.nodeType === 1) {
                                return false
                            }
                        }
                        return true;
                    case"nth":
                        var A = z[2], t = z[3];
                        if (A === 1 && t === 0) {
                            return true
                        }
                        var x = z[0], u = C.parentNode;
                        if (u && (u.sizcache !== x || !C.nodeIndex)) {
                            var y = 0;
                            for (B = u.firstChild; B; B = B.nextSibling) {
                                if (B.nodeType === 1) {
                                    B.nodeIndex = ++y
                                }
                            }
                            u.sizcache = x
                        }
                        var v = C.nodeIndex - t;
                        if (A === 0) {
                            return v === 0
                        } else {
                            return (v % A === 0 && v / A >= 0)
                        }
                }
            }, ID: function (t, u) {
                return t.nodeType === 1 && t.getAttribute("id") === u
            }, TAG: function (t, u) {
                return (u === "*" && t.nodeType === 1) || t.nodeName.toLowerCase() === u
            }, CLASS: function (t, u) {
                return (" " + (t.className || t.getAttribute("class")) + " ").indexOf(u) > -1
            }, ATTR: function (u, w) {
                var x = w[1], z = s.attrHandle[x] ? s.attrHandle[x](u) : u[x] != null ? u[x] : u.getAttribute(x),
                    t = z + "", v = w[2], y = w[4];
                return z == null ? v === "!=" : v === "=" ? t === y : v === "*=" ? t.indexOf(y) >= 0 : v === "~=" ? (" " + t + " ").indexOf(y) >= 0 : !y ? t && z !== false : v === "!=" ? t !== y : v === "^=" ? t.indexOf(y) === 0 : v === "$=" ? t.substr(t.length - y.length) === y : v === "|=" ? t === y || t.substr(0, y.length + 1) === y + "-" : false
            }, POS: function (u, x, w, t) {
                var y = x[2], v = s.setFilters[y];
                if (v) {
                    return v(u, w, x, t)
                }
            }
        }
    };
    var n = s.match.POS, r = function (t, u) {
        return "\\" + (u - 0 + 1)
    };
    for (var l in s.match) {
        s.match[l] = new RegExp(s.match[l].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
        s.leftMatch[l] = new RegExp(/(^(?:.|\r|\n)*?)/.source + s.match[l].source.replace(/\\(\d+)/g, r))
    }
    var f = function (t, u) {
        t = Array.prototype.slice.call(t, 0);
        if (u) {
            u.push.apply(u, t);
            return u
        }
        return t
    };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
    } catch (m) {
        f = function (t, u) {
            var w = u || [], v = 0;
            if (a.call(t) === "[object Array]") {
                Array.prototype.push.apply(w, t)
            } else {
                if (typeof t.length === "number") {
                    for (var x = t.length; v < x; v++) {
                        w.push(t[v])
                    }
                } else {
                    for (; t[v]; v++) {
                        w.push(t[v])
                    }
                }
            }
            return w
        }
    }
    var c;
    if (document.documentElement.compareDocumentPosition) {
        c = function (u, v) {
            if (!u.compareDocumentPosition || !v.compareDocumentPosition) {
                if (u == v) {
                    j = true
                }
                return u.compareDocumentPosition ? -1 : 1
            }
            var t = u.compareDocumentPosition(v) & 4 ? -1 : u === v ? 0 : 1;
            if (t === 0) {
                j = true
            }
            return t
        }
    } else {
        if ("sourceIndex" in document.documentElement) {
            c = function (u, v) {
                if (!u.sourceIndex || !v.sourceIndex) {
                    if (u == v) {
                        j = true
                    }
                    return u.sourceIndex ? -1 : 1
                }
                var t = u.sourceIndex - v.sourceIndex;
                if (t === 0) {
                    j = true
                }
                return t
            }
        } else {
            if (document.createRange) {
                c = function (u, w) {
                    if (!u.ownerDocument || !w.ownerDocument) {
                        if (u == w) {
                            j = true
                        }
                        return u.ownerDocument ? -1 : 1
                    }
                    var v = u.ownerDocument.createRange(), x = w.ownerDocument.createRange();
                    v.setStart(u, 0);
                    v.setEnd(u, 0);
                    x.setStart(w, 0);
                    x.setEnd(w, 0);
                    var t = v.compareBoundaryPoints(Range.START_TO_END, x);
                    if (t === 0) {
                        j = true
                    }
                    return t
                }
            }
        }
    }
    d.getText = function (w) {
        var v = "", t;
        for (var u = 0; w[u]; u++) {
            t = w[u];
            if (t.nodeType === 3 || t.nodeType === 4) {
                v += t.nodeValue
            } else {
                if (t.nodeType !== 8) {
                    v += d.getText(t.childNodes)
                }
            }
        }
        return v
    };
    (function () {
        var u = document.createElement("div"), t = "script" + (new Date()).getTime();
        u.innerHTML = "<a name='" + t + "'/>";
        var v = document.documentElement;
        v.insertBefore(u, v.firstChild);
        if (document.getElementById(t)) {
            s.find.ID = function (y, x, w) {
                if (typeof x.getElementById !== "undefined" && !w) {
                    var z = x.getElementById(y[1]);
                    return z ? z.id === y[1] || typeof z.getAttributeNode !== "undefined" && z.getAttributeNode("id").nodeValue === y[1] ? [z] : undefined : []
                }
            };
            s.filter.ID = function (w, y) {
                var x = typeof w.getAttributeNode !== "undefined" && w.getAttributeNode("id");
                return w.nodeType === 1 && x && x.nodeValue === y
            }
        }
        v.removeChild(u);
        v = u = null
    })();
    (function () {
        var t = document.createElement("div");
        t.appendChild(document.createComment(""));
        if (t.getElementsByTagName("*").length > 0) {
            s.find.TAG = function (y, u) {
                var v = u.getElementsByTagName(y[1]);
                if (y[1] === "*") {
                    var w = [];
                    for (var x = 0; v[x]; x++) {
                        if (v[x].nodeType === 1) {
                            w.push(v[x])
                        }
                    }
                    v = w
                }
                return v
            }
        }
        t.innerHTML = "<a href='#'></a>";
        if (t.firstChild && typeof t.firstChild.getAttribute !== "undefined" && t.firstChild.getAttribute("href") !== "#") {
            s.attrHandle.href = function (u) {
                return u.getAttribute("href", 2)
            }
        }
        t = null
    })();
    if (document.querySelectorAll) {
        (function () {
            var v = d, t = document.createElement("div");
            t.innerHTML = "<p class='TEST'></p>";
            if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0) {
                return
            }
            d = function (w, x, z, y) {
                x = x || document;
                if (!y && x.nodeType === 9 && !d.isXML(x)) {
                    try {
                        return f(x.querySelectorAll(w), z)
                    } catch (A) {
                    }
                }
                return v(w, x, z, y)
            };
            for (var u in v) {
                d[u] = v[u]
            }
            t = null
        })()
    }
    (function () {
        var t = document.createElement("div");
        t.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if (!t.getElementsByClassName || t.getElementsByClassName("e").length === 0) {
            return
        }
        t.lastChild.className = "e";
        if (t.getElementsByClassName("e").length === 1) {
            return
        }
        s.order.splice(1, 0, "CLASS");
        s.find.CLASS = function (w, v, u) {
            if (typeof v.getElementsByClassName !== "undefined" && !u) {
                return v.getElementsByClassName(w[1])
            }
        };
        t = null
    })();

    function k(B, w, x, t, v, u) {
        for (var z = 0, A = t.length; z < A; z++) {
            var C = t[z];
            if (C) {
                C = C[B];
                var y = false;
                while (C) {
                    if (C.sizcache === x) {
                        y = t[C.sizset];
                        break
                    }
                    if (C.nodeType === 1 && !u) {
                        C.sizcache = x;
                        C.sizset = z
                    }
                    if (C.nodeName.toLowerCase() === w) {
                        y = C;
                        break
                    }
                    C = C[B]
                }
                t[z] = y
            }
        }
    }

    function g(B, w, x, t, v, u) {
        for (var z = 0, A = t.length; z < A; z++) {
            var C = t[z];
            if (C) {
                C = C[B];
                var y = false;
                while (C) {
                    if (C.sizcache === x) {
                        y = t[C.sizset];
                        break
                    }
                    if (C.nodeType === 1) {
                        if (!u) {
                            C.sizcache = x;
                            C.sizset = z
                        }
                        if (typeof w !== "string") {
                            if (C === w) {
                                y = true;
                                break
                            }
                        } else {
                            if (d.filter(w, [C]).length > 0) {
                                y = C;
                                break
                            }
                        }
                    }
                    C = C[B]
                }
                t[z] = y
            }
        }
    }

    d.contains = document.compareDocumentPosition ? function (t, u) {
        return !!(t.compareDocumentPosition(u) & 16)
    } : function (t, u) {
        return t !== u && (t.contains ? t.contains(u) : true)
    };
    d.isXML = function (u) {
        var t = (u ? u.ownerDocument || u : 0).documentElement;
        return t ? t.nodeName !== "HTML" : false
    };
    var q = function (z, A) {
        var w = [], v = "", u, x = A.nodeType ? [A] : A;
        while ((u = s.match.PSEUDO.exec(z))) {
            v += u[0];
            z = z.replace(s.match.PSEUDO, "")
        }
        z = s.relative[z] ? z + "*" : z;
        for (var t = 0, y = x.length; t < y; t++) {
            d(z, x[t], w)
        }
        return d.filter(v, w)
    };
    baidu.dom.query = d
})();
baidu.page.createStyleSheet = function (a) {
    var c = a || {}, f = c.document || document, g;
    if (baidu.browser.ie) {
        return f.createStyleSheet(c.url, c.index)
    } else {
        g = "<style type='text/css'></style>";
        c.url && (g = "<link type='text/css' rel='stylesheet' href='" + c.url + "'/>");
        baidu.dom.insertHTML(f.getElementsByTagName("HEAD")[0], "beforeEnd", g);
        if (c.url) {
            return null
        }
        var h = f.styleSheets[f.styleSheets.length - 1], d = h.rules || h.cssRules;
        return {
            self: h, rules: h.rules || h.cssRules, addRule: function (l, j, k) {
                if (h.addRule) {
                    return h.addRule(l, j, k)
                } else {
                    if (h.insertRule) {
                        isNaN(k) && (k = d.length);
                        return h.insertRule(l + "{" + j + "}", k)
                    }
                }
            }, removeRule: function (j) {
                if (h.removeRule) {
                    h.removeRule(j)
                } else {
                    if (h.deleteRule) {
                        isNaN(j) && (j = 0);
                        h.deleteRule(j)
                    }
                }
            }
        }
    }
};
baidu.lang.isFunction = function (a) {
    return "[object Function]" == Object.prototype.toString.call(a)
};
baidu.dom.create = function (d, a) {
    a = a || {};
    var c = document.createElement(d);
    return baidu.dom.setAttrs(c, a)
};
baidu.dom.empty = function (a) {
    a = baidu.dom.g(a);
    while (a.firstChild) {
        a.removeChild(a.firstChild)
    }
    return a
};
baidu.dom.getText = function (d) {
    var g = "", c, f = 0, a;
    d = baidu._g(d);
    if (d.nodeType === 3 || d.nodeType === 4) {
        g += d.nodeValue
    } else {
        if (d.nodeType !== 8) {
            c = d.childNodes;
            for (a = c.length; f < a; f++) {
                g += baidu.dom.getText(c[f])
            }
        }
    }
    return g
};
baidu.dom.hasAttr = function (c, d) {
    c = baidu.g(c);
    var a = c.attributes.getNamedItem(d);
    return !!(a && a.specified)
};
baidu.dom.toggleClass = function (a, c) {
    if (baidu.dom.hasClass(a, c)) {
        baidu.dom.removeClass(a, c)
    } else {
        baidu.dom.addClass(a, c)
    }
};
(function () {
    var c = {}, h = baidu.lang.isArray, d = baidu.lang.isElement, g = function (j) {
        var k = this;
        if (h(j)) {
            baidu.each(j, function (l, m) {
                k[m] = l
            })
        } else {
            k[0] = j
        }
    };
    c.each = function (j) {
        baidu.object.each(this, function (k) {
            j.call(this, (new g(k)))
        })
    };
    baidu.each(("addClass draggable empty hide show insertAfter insertBefore insertHTML removeClass setAttr setAttrs setStyle setStyles show toggleClass toggle children next first getAncestorByClass getAncestorBy getAncestorByTag getDocument getParent getWindow last next prev contains getAttr getPosition getStyle g q query hasClass intersect remove").split(" "), function (j) {
        c[j] = c[j.replace(/^get[A-Z]/g, f)] = a(j, "dom")
    });
    baidu.each(("on un").split(" "), function (j) {
        c[j] = a(j, "event")
    });
    baidu.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error").split(" "), function (j) {
        c[j] = function (k) {
            return this.on(j, k)
        }
    });
    g.prototype = c;

    function a(j, k) {
        return function () {
            var l = [], m = arguments;
            baidu.object.each(this, function (n, o) {
                Array.prototype.unshift.call(m, n);
                if (!baidu.lang.isFunction(k)) {
                    k = baidu[k][j]
                }
                l.push(k.apply(this, m));
                Array.prototype.shift.call(m, n)
            });
            return (d(l) || (h(l) && d(l[0]))) ? new g(l) : l
        }
    }

    function f(j) {
        return j.charAt(3).toLowerCase()
    }

    baidu.e = baidu.element = function (j) {
        return new g(baidu.g(j))
    };
    baidu.element.extend = function (j) {
        baidu.object.each(j, function (k, l) {
            g.prototype[l] = a(l, k)
        })
    }
})();
baidu.lang.toArray = function (d) {
    if (d === null || d === undefined) {
        return []
    }
    if (baidu.lang.isArray(d)) {
        return d
    }
    if (typeof d.length !== "number" || typeof d === "string" || baidu.lang.isFunction(d)) {
        return [d]
    }
    if (d.item) {
        var a = d.length, c = new Array(a);
        while (a--) {
            c[a] = d[a]
        }
        return c
    }
    return [].slice.call(d)
};
baidu.lang.Class.prototype.addEventListeners = function (f, d) {
    if (typeof d == "undefined") {
        for (var g in f) {
            this.addEventListener(g, f[g])
        }
    } else {
        f = f.split(",");
        var g = 0, a = f.length, c;
        for (; g < a; g++) {
            this.addEventListener(baidu.trim(f[g]), d)
        }
    }
};
var CONFIG_HOST_URL = "baohe.baidu.com";
var CONFIG_HOST_PORT = "80";
var CONFIG_PASSPORT_URL = "passport.baidu.com";
var CONFIG_PASSPORT_URL_JS = "http://" + CONFIG_PASSPORT_URL;
var DOWNLOAD_URL = ["http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduYunGuanjia_5.4.4.exe", "http://issuecdn.baidupcs.com/issue/netdisk/apk/BaiduYun_7.13.0.apk", "http://itunes.apple.com/cn/app/bai-du-wang-pan/id547166701?mt=8", "http://itunes.apple.com/cn/app/bai-du-yun-hd/id554602005?mt=8", "http://www.windowsphone.com/zh-cn/store/app/%E7%99%BE%E5%BA%A6%E4%BA%91/59bf5640-85ae-4a6e-84f1-a61c074e667c", "", "http://issuecdn.baidupcs.com/issue/netdisk/macapk/BaiduYun_2.4.4.dmg"];
var DOWNLOAD_URL_LOGIN = ["", "http://itunes.apple.com/cn/app/bai-du-wang-pan/id547166701?mt=8", "http://itunes.apple.com/cn/app/bai-du-yun-hd/id554602005?mt=8", "http://www.windowsphone.com/zh-cn/store/app/%E7%99%BE%E5%BA%A6%E4%BA%91/59bf5640-85ae-4a6e-84f1-a61c074e667c", ""];
var DOWNLOAD_DES = [["澶у皬锛�5.78MB", "鐗堟湰锛歅C鐗� V2.0.0", "閫傚簲绯荤粺锛歸indows XP/vista/win7/win8", "鏇存柊鏃堕棿锛�2013-02-25"], ["澶у皬锛�1.6M", "鐗堟湰锛欰ndroid鐗�3.0.0", "閫傚簲绯荤粺锛欰ndroid2.2銆丄ndroid2.3<br/><i>Android4.0</i>", "鏇存柊鏃堕棿锛�2012/6/13"], ["澶у皬锛�2.5M", "鐗堟湰锛欼phone鐗�2.0.0", "閫傚簲绯荤粺锛欼OS 4.0 鍙婁互涓�<br/><i>锛堥渶瓒婄嫳鍚庢墠鑳藉畨瑁咃級</i>", "鏇存柊鏃堕棿锛�2012/6/7"], ["澶у皬锛�5.6M", "鐗堟湰锛歩Pad鐗� V2.0.0", "閫傚簲绯荤粺锛欼OS 4.3 鍙婁互涓�<br/><i>锛堥渶瓒婄嫳鍚庢墠鑳藉畨瑁咃級</i>", "鏇存柊鏃堕棿锛�2012/8/15"], ["澶у皬锛�5M", "鐗堟湰锛歐inPhone鐗坴2.0.0", "閫傚簲绯荤粺锛歐indows Phone 7.5 鍙婁互涓�", "鏇存柊鏃堕棿锛�2013/03/29"], ["澶у皬锛�5.51MB", "鐗堟湰锛歐indow鐗�3.0.0", "閫傚簲绯荤粺锛歸indows XP/vista/win7", "鏇存柊鏃堕棿锛�2012/6/19"], ["澶у皬锛�5M", "鐗堟湰锛歁ac鐗� V2.0.0", "閫傚簲绯荤粺锛歁ac OS 10.7 鍙婁互涓�", "鏇存柊鏃堕棿锛�2013/04/25"]];
var DOWNLOAD_UPDATE = [false, false, false, false, false, false];
var DOWNLOAD_LIST = ["windows", "android", "iphone", "ipad", "wphone", "tongbupan"];
var CO_APK = [{
    src: "http://s1.pan.bdstatic.com/static/images/plug/fex48.png?r=201801241105",
    width: "56px",
    title: "ES鏂囦欢娴忚鍣ㄧ櫨搴︿簯鐗瑰埆鐗�",
    desc: "涓€閿浠斤紝绠€鍗曟柟渚匡紝鏈夋潯鏈夌悊锛屾案涓嶄涪澶便€�",
    level: 5,
    url: "http://bs.baidu.com/appstore/apk_c5a8e927c1768f0778ede7d4b40ee535.apk"
}, {
    src: "http://s1.pan.bdstatic.com/static/images/plug/icon.png?r=201801241105",
    title: "鏂囦欢澶у笀",
    width: "56px",
    desc: "鏈€浣矨ndroid璧勬簮绠＄悊鏂囦欢鍚屾瑙ｅ喅鏂规銆�",
    level: 5,
    url: "http://www.xageek.com/software/FileExpertLatest.apk"
}, {
    src: "http://s1.pan.bdstatic.com/static/images/plug/icon72.png?r=201801241105",
    width: "54px",
    title: "浜戣垷娴忚鍣�",
    desc: "浜戣垷娴忚鍣紝璁╀笂缃戝彉寰楃畝娲佸揩閫熴€�",
    level: 5,
    url: "http://www.yzbrowser.com/download/boatcn.apk"
}];
var T, baidu = T = baidu || {version: "1.3.9"};
baidu.guid = "$BAIDU$";
window[baidu.guid] = window[baidu.guid] || {};
baidu.fx = baidu.fx || {};
baidu.lang = baidu.lang || {};
(function () {
    var c = window[baidu.guid];
    baidu.lang.guid = function () {
        return "TANGRAM__" + (c._counter++).toString(36)
    };
    c._counter = c._counter || 1
})();
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.isFunction = function (c) {
    return "[object Function]" == Object.prototype.toString.call(c)
};
baidu.lang.Class = function (c) {
    this.guid = c || baidu.lang.guid();
    window[baidu.guid]._instances[this.guid] = this
};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class.prototype.dispose = function () {
    delete window[baidu.guid]._instances[this.guid];
    for (var c in this) {
        if (!baidu.lang.isFunction(this[c])) {
            delete this[c]
        }
    }
    this.disposed = true
};
baidu.lang.Class.prototype.toString = function () {
    return "[object " + (this._className || "Object") + "]"
};
baidu.lang.isString = function (c) {
    return "[object String]" == Object.prototype.toString.call(c)
};
baidu.isString = baidu.lang.isString;
baidu.lang.Event = function (d, c) {
    this.type = d;
    this.returnValue = true;
    this.target = c || null;
    this.currentTarget = null
};
baidu.lang.Class.prototype.addEventListener = function (j, k, f) {
    if (!baidu.lang.isFunction(k)) {
        return
    }
    !this.__listeners && (this.__listeners = {});
    var g = this.__listeners, h;
    if (typeof f == "string" && f) {
        if (/[^\w\-]/.test(f)) {
            throw ("nonstandard key:" + f)
        } else {
            k.hashCode = f;
            h = f
        }
    }
    j.indexOf("on") != 0 && (j = "on" + j);
    typeof g[j] != "object" && (g[j] = {});
    h = h || baidu.lang.guid();
    k.hashCode = h;
    g[j][h] = k
};
baidu.lang.Class.prototype.removeEventListener = function (h, j) {
    if (typeof j != "undefined") {
        if ((baidu.lang.isFunction(j) && !(j = j.hashCode)) || (!baidu.lang.isString(j))) {
            return
        }
    }
    !this.__listeners && (this.__listeners = {});
    h.indexOf("on") != 0 && (h = "on" + h);
    var f = this.__listeners;
    if (!f[h]) {
        return
    }
    if (typeof j != "undefined") {
        f[h][j] && delete f[h][j]
    } else {
        for (var g in f[h]) {
            delete f[h][g]
        }
    }
};
baidu.lang.Class.prototype.dispatchEvent = function (j, g) {
    if (baidu.lang.isString(j)) {
        j = new baidu.lang.Event(j)
    }
    !this.__listeners && (this.__listeners = {});
    g = g || {};
    for (var k in g) {
        j[k] = g[k]
    }
    var k, f = this.__listeners, h = j.type;
    j.target = j.target || this;
    j.currentTarget = this;
    h.indexOf("on") != 0 && (h = "on" + h);
    baidu.lang.isFunction(this[h]) && this[h].apply(this, arguments);
    if (typeof f[h] == "object") {
        for (k in f[h]) {
            f[h][k].apply(this, arguments)
        }
    }
    return j.returnValue
};
baidu.lang.createClass = function (n, j) {
    j = j || {};
    var o = j.superClass || baidu.lang.Class;
    var p = function () {
        if (o != baidu.lang.Class) {
            o.apply(this, arguments)
        } else {
            o.call(this)
        }
        n.apply(this, arguments)
    };
    p.options = j.options || {};
    var l = function () {
    }, m = n.prototype;
    l.prototype = o.prototype;
    var k = p.prototype = new l();
    for (var q in m) {
        k[q] = m[q]
    }
    typeof j.className == "string" && (k._className = j.className);
    k.constructor = m.constructor;
    p.extend = function (a) {
        for (var c in a) {
            p.prototype[c] = a[c]
        }
        return p
    };
    return p
};
baidu.object = baidu.object || {};
baidu.extend = baidu.object.extend = function (g, f) {
    for (var d in f) {
        if (f.hasOwnProperty(d)) {
            g[d] = f[d]
        }
    }
    return g
};
baidu.fx.Timeline = baidu.lang.createClass(function (c) {
    baidu.object.extend(this, baidu.fx.Timeline.options);
    baidu.object.extend(this, c)
}, {
    className: "baidu.fx.Timeline",
    options: {interval: 16, duration: 500, dynamic: true}
}).extend({
    launch: function () {
        var c = this;
        c.dispatchEvent("onbeforestart");
        typeof c.initialize == "function" && c.initialize();
        c["\x06btime"] = new Date().getTime();
        c["\x06etime"] = c["\x06btime"] + (c.dynamic ? c.duration : 0);
        c["\x06pulsed"]();
        return c
    }, "\x06pulsed": function () {
        var c = this;
        var d = new Date().getTime();
        c.percent = (d - c["\x06btime"]) / c.duration;
        c.dispatchEvent("onbeforeupdate");
        if (d >= c["\x06etime"]) {
            typeof c.render == "function" && c.render(c.transition(c.percent = 1));
            typeof c.finish == "function" && c.finish();
            c.dispatchEvent("onafterfinish");
            c.dispose();
            return
        }
        typeof c.render == "function" && c.render(c.transition(c.percent));
        c.dispatchEvent("onafterupdate");
        c["\x06timer"] = setTimeout(function () {
            c["\x06pulsed"]()
        }, c.interval)
    }, transition: function (c) {
        return c
    }, cancel: function () {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];
        typeof this.restore == "function" && this.restore();
        this.dispatchEvent("oncancel");
        this.dispose()
    }, end: function () {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];
        this["\x06pulsed"]()
    }
});
baidu.dom = baidu.dom || {};
baidu.dom.g = function (c) {
    if ("string" == typeof c || c instanceof String) {
        return document.getElementById(c)
    } else {
        if (c && c.nodeName && (c.nodeType == 1 || c.nodeType == 9)) {
            return c
        }
    }
    return null
};
baidu.g = baidu.G = baidu.dom.g;
baidu.dom.hide = function (c) {
    c = baidu.dom.g(c);
    c.style.display = "none";
    return c
};
baidu.hide = baidu.dom.hide;
baidu.fx.create = function (j, f, k) {
    var h = new baidu.fx.Timeline(f);
    h.element = j;
    h._className = k || h._className;
    h["\x06original"] = {};
    var g = "baidu_current_effect";
    h.addEventListener("onbeforestart", function () {
        var a = this, c;
        a.attribName = "att_" + a._className.replace(/\W/g, "_");
        c = a.element.getAttribute(g);
        a.element.setAttribute(g, (c || "") + "|" + a.guid + "|", 0);
        if (!a.overlapping) {
            (c = a.element.getAttribute(a.attribName)) && window[baidu.guid]._instances[c].cancel();
            a.element.setAttribute(a.attribName, a.guid, 0)
        }
    });
    h["\x06clean"] = function (a) {
        var c = this, d;
        if (a = c.element) {
            a.removeAttribute(c.attribName);
            d = a.getAttribute(g);
            d = d.replace("|" + c.guid + "|", "");
            if (!d) {
                a.removeAttribute(g)
            } else {
                a.setAttribute(g, d, 0)
            }
        }
    };
    h.addEventListener("oncancel", function () {
        this["\x06clean"]();
        this["\x06restore"]()
    });
    h.addEventListener("onafterfinish", function () {
        this["\x06clean"]();
        this.restoreAfterFinish && this["\x06restore"]()
    });
    h.protect = function (a) {
        this["\x06original"][a] = this.element.style[a]
    };
    h["\x06restore"] = function () {
        var a = this["\x06original"], c = this.element.style, l;
        for (var d in a) {
            l = a[d];
            if (typeof l == "undefined") {
                continue
            }
            c[d] = l;
            if (!l && c.removeAttribute) {
                c.removeAttribute(d)
            } else {
                if (!l && c.removeProperty) {
                    c.removeProperty(d)
                }
            }
        }
    };
    return h
};
baidu.fx.collapse = function (p, j) {
    if (!(p = baidu.dom.g(p))) {
        return null
    }
    var l = p, n, k, m = {
        vertical: {
            value: "height",
            offset: "offsetHeight",
            stylesValue: ["paddingBottom", "paddingTop", "borderTopWidth", "borderBottomWidth"]
        },
        horizontal: {
            value: "width",
            offset: "offsetWidth",
            stylesValue: ["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"]
        }
    };
    var o = baidu.fx.create(l, baidu.object.extend({
        orientation: "vertical", initialize: function () {
            k = m[this.orientation];
            this.protect(k.value);
            this.protect("overflow");
            this.restoreAfterFinish = true;
            n = l[k.offset];
            l.style.overflow = "hidden"
        }, transition: function (a) {
            return Math.pow(1 - a, 2)
        }, render: function (a) {
            l.style[k.value] = Math.floor(a * n) + "px"
        }, finish: function () {
            baidu.dom.hide(l)
        }
    }, j || {}), "baidu.fx.expand_collapse");
    return o.launch()
};
baidu.fx.current = function (j) {
    if (!(j = baidu.dom.g(j))) {
        return null
    }
    var a, g, h = /\|([^\|]+)\|/g;
    do {
        if (g = j.getAttribute("baidu_current_effect")) {
            break
        }
    } while ((j = j.parentNode) && j.nodeType == 1);
    if (!g) {
        return null
    }
    if ((a = g.match(h))) {
        h = /\|([^\|]+)\|/;
        for (var k = 0; k < a.length; k++) {
            h.test(a[k]);
            a[k] = window[baidu.guid]._instances[RegExp["\x241"]]
        }
    }
    return a
};
baidu.dom.show = function (c) {
    c = baidu.dom.g(c);
    c.style.display = "";
    return c
};
baidu.show = baidu.dom.show;
baidu.array = baidu.array || {};
baidu.each = baidu.array.forEach = baidu.array.each = function (k, m, h) {
    var n, l, o, j = k.length;
    if ("function" == typeof m) {
        for (o = 0; o < j; o++) {
            l = k[o];
            n = m.call(h || k, l, o);
            if (n === false) {
                break
            }
        }
    }
    return k
};
baidu.dom._g = function (c) {
    if (baidu.lang.isString(c)) {
        return document.getElementById(c)
    }
    return c
};
baidu._g = baidu.dom._g;
baidu.dom.getDocument = function (c) {
    c = baidu.dom.g(c);
    return c.nodeType == 9 ? c : c.ownerDocument || c.document
};
baidu.browser = baidu.browser || {};
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.ie = baidu.ie = document.documentMode || +RegExp["\x241"]
}
baidu.dom.getComputedStyle = function (f, g) {
    f = baidu.dom._g(f);
    var h = baidu.dom.getDocument(f), j;
    if (h.defaultView && h.defaultView.getComputedStyle) {
        j = h.defaultView.getComputedStyle(f, null);
        if (j) {
            return j[g] || j.getPropertyValue(g)
        }
    }
    return ""
};
baidu.dom._styleFixer = baidu.dom._styleFixer || {};
baidu.dom._styleFilter = baidu.dom._styleFilter || [];
baidu.dom._styleFilter.filter = function (g, k, j) {
    for (var h = 0, l = baidu.dom._styleFilter, m; m = l[h]; h++) {
        if (m = m[j]) {
            k = m(g, k)
        }
    }
    return k
};
baidu.string = baidu.string || {};
baidu.string.toCamelCase = function (c) {
    if (c.indexOf("-") < 0 && c.indexOf("_") < 0) {
        return c
    }
    return c.replace(/[-_][^-_]/g, function (a) {
        return a.charAt(1).toUpperCase()
    })
};
baidu.dom.getStyle = function (k, f) {
    var h = baidu.dom;
    k = h.g(k);
    f = baidu.string.toCamelCase(f);
    var j = k.style[f] || (k.currentStyle ? k.currentStyle[f] : "") || h.getComputedStyle(k, f);
    if (!j) {
        var g = h._styleFixer[f];
        if (g) {
            j = g.get ? g.get(k) : baidu.dom.getStyle(k, g)
        }
    }
    if (g = h._styleFilter) {
        j = g.filter(f, j, "get")
    }
    return j
};
baidu.getStyle = baidu.dom.getStyle;
baidu.lang.isNumber = function (c) {
    return "[object Number]" == Object.prototype.toString.call(c) && isFinite(c)
};
baidu.fx.expand = function (p, j) {
    if (!(p = baidu.dom.g(p))) {
        return null
    }
    var l = p, n, k, m = {
        vertical: {
            value: "height",
            offset: "offsetHeight",
            stylesValue: ["paddingBottom", "paddingTop", "borderTopWidth", "borderBottomWidth"]
        },
        horizontal: {
            value: "width",
            offset: "offsetWidth",
            stylesValue: ["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"]
        }
    };
    var o = baidu.fx.create(l, baidu.object.extend({
        orientation: "vertical", initialize: function () {
            k = m[this.orientation];
            baidu.dom.show(l);
            this.protect(k.value);
            this.protect("overflow");
            this.restoreAfterFinish = true;
            n = l[k.offset];

            function a(c, d) {
                var f = parseInt(baidu.getStyle(c, d));
                f = isNaN(f) ? 0 : f;
                f = baidu.lang.isNumber(f) ? f : 0;
                return f
            }

            baidu.each(k.stylesValue, function (c) {
                n -= a(l, c)
            });
            l.style.overflow = "hidden";
            l.style[k.value] = "1px"
        }, transition: function (a) {
            return Math.sqrt(a)
        }, render: function (a) {
            l.style[k.value] = Math.floor(a * n) + "px"
        }
    }, j || {}), "baidu.fx.expand_collapse");
    return o.launch()
};
baidu.fx.opacity = function (f, g) {
    if (!(f = baidu.dom.g(f))) {
        return null
    }
    g = baidu.object.extend({from: 0, to: 1}, g || {});
    var h = f;
    var j = baidu.fx.create(h, baidu.object.extend({
        initialize: function () {
            baidu.dom.show(f);
            if (baidu.browser.ie) {
                this.protect("filter")
            } else {
                this.protect("opacity");
                this.protect("KHTMLOpacity")
            }
            this.distance = this.to - this.from
        }, render: function (c) {
            var a = this.distance * c + this.from;
            if (!baidu.browser.ie) {
                h.style.opacity = a;
                h.style.KHTMLOpacity = a
            } else {
                h.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity:" + Math.floor(a * 100) + ")"
            }
        }
    }, g), "baidu.fx.opacity");
    return j.launch()
};
baidu.fx.fadeIn = function (d, f) {
    if (!(d = baidu.dom.g(d))) {
        return null
    }
    var g = baidu.fx.opacity(d, baidu.object.extend({from: 0, to: 1, restoreAfterFinish: true}, f || {}));
    g._className = "baidu.fx.fadeIn";
    return g
};
baidu.fx.fadeOut = function (d, f) {
    if (!(d = baidu.dom.g(d))) {
        return null
    }
    var g = baidu.fx.opacity(d, baidu.object.extend({from: 1, to: 0, restoreAfterFinish: true}, f || {}));
    g.addEventListener("onafterfinish", function () {
        baidu.dom.hide(this.element)
    });
    g._className = "baidu.fx.fadeOut";
    return g
};
baidu.fx.getTransition = function (d) {
    var a = baidu.fx.transitions;
    if (!d || typeof a[d] != "string") {
        d = "linear"
    }
    return new Function("percent", a[d])
};
baidu.fx.transitions = {
    none: "return 0",
    full: "return 1",
    linear: "return percent",
    reverse: "return 1 - percent",
    parabola: "return Math.pow(percent, 2)",
    antiparabola: "return 1 - Math.pow(1 - percent, 2)",
    sinoidal: "return (-Math.cos(percent * Math.PI)/2) + 0.5",
    wobble: "return (-Math.cos(percent * Math.PI * (9 * percent))/2) + 0.5",
    spring: "return 1 - (Math.cos(percent * 4.5 * Math.PI) * Math.exp(-percent * 6))"
};
(function () {
    var g = /^\#[\da-f]{6}$/i, d = /^rgb\((\d+), (\d+), (\d+)\)$/, f = {
        black: "#000000",
        silver: "#c0c0c0",
        gray: "#808080",
        white: "#ffffff",
        maroon: "#800000",
        red: "#ff0000",
        purple: "#800080",
        fuchsia: "#ff00ff",
        green: "#008000",
        lime: "#00ff00",
        olive: "#808000",
        yellow: "#ffff0",
        navy: "#000080",
        blue: "#0000ff",
        teal: "#008080",
        aqua: "#00ffff"
    };
    baidu.string.formatColor = function (m) {
        if (g.test(m)) {
            return m
        } else {
            if (d.test(m)) {
                for (var a, c = 1, m = "#"; c < 4; c++) {
                    a = parseInt(RegExp["\x24" + c]).toString(16);
                    m += ("00" + a).substr(a.length)
                }
                return m
            } else {
                if (/^\#[\da-f]{3}$/.test(m)) {
                    var k = m.charAt(1), l = m.charAt(2), n = m.charAt(3);
                    return "#" + k + k + l + l + n + n
                } else {
                    if (f[m]) {
                        return f[m]
                    }
                }
            }
        }
        return ""
    }
})();
baidu.fx.highlight = function (f, g) {
    if (!(f = baidu.dom.g(f))) {
        return null
    }
    var h = f;
    var j = baidu.fx.create(h, baidu.object.extend({
        initialize: function () {
            var c = this, d = baidu.dom.getStyle, m = baidu.string.formatColor, o = m(d(h, "color")) || "#000000",
                p = m(d(h, "backgroundColor"));
            c.beginColor = c.beginColor || p || "#FFFF00";
            c.endColor = c.endColor || p || "#FFFFFF";
            c.finalColor = c.finalColor || c.endColor || c.element.style.backgroundColor;
            c.textColor == o && (c.textColor = "");
            this.protect("color");
            this.protect("backgroundColor");
            c.c_b = [];
            c.c_d = [];
            c.t_b = [];
            c.t_d = [];
            for (var a, n = 0; n < 3; n++) {
                a = 2 * n + 1;
                c.c_b[n] = parseInt(c.beginColor.substr(a, 2), 16);
                c.c_d[n] = parseInt(c.endColor.substr(a, 2), 16) - c.c_b[n];
                if (c.textColor) {
                    c.t_b[n] = parseInt(o.substr(a, 2), 16);
                    c.t_d[n] = parseInt(c.textColor.substr(a, 2), 16) - c.t_b[n]
                }
            }
        }, render: function (c) {
            for (var d = this, m = "#", n = "#", a, l = 0; l < 3; l++) {
                a = Math.round(d.c_b[l] + d.c_d[l] * c).toString(16);
                m += ("00" + a).substr(a.length);
                if (d.textColor) {
                    a = Math.round(d.t_b[l] + d.t_d[l] * c).toString(16);
                    n += ("00" + a).substr(a.length)
                }
            }
            h.style.backgroundColor = m;
            d.textColor && (h.style.color = n)
        }, finish: function () {
            this.textColor && (h.style.color = this.textColor);
            h.style.backgroundColor = this.finalColor
        }
    }, g || {}), "baidu.fx.highlight");
    return j.launch()
};
baidu.fx.mask = function (n, j) {
    if (!(n = baidu.dom.g(n)) || baidu.dom.getStyle(n, "position") != "absolute") {
        return null
    }
    var k = n, h = {};
    j = j || {};
    var l = /^(\d+px|\d?\d(\.\d+)?%|100%|left|center|right)(\s+(\d+px|\d?\d(\.\d+)?%|100%|top|center|bottom))?/i;
    !l.test(j.startOrigin) && (j.startOrigin = "0px 0px");
    var j = baidu.object.extend({restoreAfterFinish: true, from: 0, to: 1}, j || {});
    var m = baidu.fx.create(k, baidu.object.extend({
        initialize: function () {
            k.style.display = "";
            this.protect("clip");
            h.width = k.offsetWidth;
            h.height = k.offsetHeight;
            l.test(this.startOrigin);
            var c = RegExp["\x241"].toLowerCase(), d = RegExp["\x244"].toLowerCase(), f = this.element.offsetWidth,
                a = this.element.offsetHeight, g, o;
            if (/\d+%/.test(c)) {
                g = parseInt(c, 10) / 100 * f
            } else {
                if (/\d+px/.test(c)) {
                    g = parseInt(c)
                } else {
                    if (c == "left") {
                        g = 0
                    } else {
                        if (c == "center") {
                            g = f / 2
                        } else {
                            if (c == "right") {
                                g = f
                            }
                        }
                    }
                }
            }
            if (!d) {
                o = a / 2
            } else {
                if (/\d+%/.test(d)) {
                    o = parseInt(d, 10) / 100 * a
                } else {
                    if (/\d+px/.test(d)) {
                        o = parseInt(d)
                    } else {
                        if (d == "top") {
                            o = 0
                        } else {
                            if (d == "center") {
                                o = a / 2
                            } else {
                                if (d == "bottom") {
                                    o = a
                                }
                            }
                        }
                    }
                }
            }
            h.x = g;
            h.y = o
        }, render: function (c) {
            var a = this.to * c + this.from * (1 - c), d = h.y * (1 - a) + "px ", f = h.x * (1 - a) + "px ",
                g = h.x * (1 - a) + h.width * a + "px ", o = h.y * (1 - a) + h.height * a + "px ";
            k.style.clip = "rect(" + d + g + o + f + ")"
        }, finish: function () {
            if (this.to < this.from) {
                k.style.display = "none"
            }
        }
    }, j), "baidu.fx.mask");
    return m.launch()
};
baidu.fx.move = function (d, f) {
    if (!(d = baidu.dom.g(d)) || baidu.dom.getStyle(d, "position") == "static") {
        return null
    }
    f = baidu.object.extend({x: 0, y: 0}, f || {});
    if (f.x == 0 && f.y == 0) {
        return null
    }
    var g = baidu.fx.create(d, baidu.object.extend({
        initialize: function () {
            this.protect("top");
            this.protect("left");
            this.originX = parseInt(baidu.dom.getStyle(d, "left")) || 0;
            this.originY = parseInt(baidu.dom.getStyle(d, "top")) || 0
        }, transition: function (a) {
            return 1 - Math.pow(1 - a, 2)
        }, render: function (a) {
            d.style.top = (this.y * a + this.originY) + "px";
            d.style.left = (this.x * a + this.originX) + "px"
        }
    }, f), "baidu.fx.move");
    return g.launch()
};
baidu.fx.moveBy = function (d, h, g) {
    if (!(d = baidu.dom.g(d)) || baidu.dom.getStyle(d, "position") == "static" || typeof h != "object") {
        return null
    }
    var j = {};
    j.x = h[0] || h.x || 0;
    j.y = h[1] || h.y || 0;
    var k = baidu.fx.move(d, baidu.object.extend(j, g || {}));
    return k
};
baidu.fx.moveTo = function (n, h, o) {
    if (!(n = baidu.dom.g(n)) || baidu.dom.getStyle(n, "position") == "static" || typeof h != "object") {
        return null
    }
    var l = [h[0] || h.x || 0, h[1] || h.y || 0];
    var j = parseInt(baidu.dom.getStyle(n, "left")) || 0;
    var k = parseInt(baidu.dom.getStyle(n, "top")) || 0;
    var m = baidu.fx.move(n, baidu.object.extend({x: l[0] - j, y: l[1] - k}, o || {}));
    return m
};
baidu.fx.scale = function (k, g) {
    if (!(k = baidu.dom.g(k))) {
        return null
    }
    g = baidu.object.extend({from: 0.1, to: 1}, g || {});
    var h = /^(-?\d+px|\d?\d(\.\d+)?%|100%|left|center|right)(\s+(-?\d+px|\d?\d(\.\d+)?%|100%|top|center|bottom))?/i;
    !h.test(g.transformOrigin) && (g.transformOrigin = "0px 0px");
    var f = {}, j = baidu.fx.create(k, baidu.object.extend({
        fade: true, initialize: function () {
            baidu.dom.show(k);
            var q = this, v = f, a = k.style, r = function (l) {
                q.protect(l)
            };
            if (baidu.browser.ie) {
                r("top");
                r("left");
                r("position");
                r("zoom");
                r("filter");
                this.offsetX = parseInt(baidu.dom.getStyle(k, "left")) || 0;
                this.offsetY = parseInt(baidu.dom.getStyle(k, "top")) || 0;
                if (baidu.dom.getStyle(k, "position") == "static") {
                    a.position = "relative"
                }
                h.test(this.transformOrigin);
                var s = RegExp["\x241"].toLowerCase(), t = RegExp["\x244"].toLowerCase(), o = this.element.offsetWidth,
                    u = this.element.offsetHeight, c, d;
                if (/\d+%/.test(s)) {
                    c = parseInt(s, 10) / 100 * o
                } else {
                    if (/\d+px/.test(s)) {
                        c = parseInt(s)
                    } else {
                        if (s == "left") {
                            c = 0
                        } else {
                            if (s == "center") {
                                c = o / 2
                            } else {
                                if (s == "right") {
                                    c = o
                                }
                            }
                        }
                    }
                }
                if (!t) {
                    d = u / 2
                } else {
                    if (/\d+%/.test(t)) {
                        d = parseInt(t, 10) / 100 * u
                    } else {
                        if (/\d+px/.test(t)) {
                            d = parseInt(t)
                        } else {
                            if (t == "top") {
                                d = 0
                            } else {
                                if (t == "center") {
                                    d = u / 2
                                } else {
                                    if (t == "bottom") {
                                        d = u
                                    }
                                }
                            }
                        }
                    }
                }
                a.zoom = this.from;
                v.cx = c;
                v.cy = d
            } else {
                r("WebkitTransform");
                r("WebkitTransformOrigin");
                r("MozTransform");
                r("MozTransformOrigin");
                r("OTransform");
                r("OTransformOrigin");
                r("transform");
                r("transformOrigin");
                r("opacity");
                r("KHTMLOpacity");
                a.WebkitTransform = a.MozTransform = a.OTransform = a.transform = "scale(" + this.from + ")";
                a.WebkitTransformOrigin = a.MozTransformOrigin = a.OTransformOrigin = a.transformOrigin = this.transformOrigin
            }
        }, render: function (c) {
            var l = k.style, m = this.to == 1, m = typeof this.opacityTrend == "boolean" ? this.opacityTrend : m,
                d = m ? this.percent : 1 - this.percent, a = this.to * c + this.from * (1 - c);
            if (baidu.browser.ie) {
                l.zoom = a;
                if (this.fade) {
                    l.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity:" + Math.floor(d * 100) + ")"
                }
                l.top = this.offsetY + f.cy * (1 - a);
                l.left = this.offsetX + f.cx * (1 - a)
            } else {
                l.WebkitTransform = l.MozTransform = l.OTransform = l.transform = "scale(" + a + ")";
                if (this.fade) {
                    l.KHTMLOpacity = l.opacity = d
                }
            }
        }
    }, g), "baidu.fx.scale");
    return j.launch()
};
baidu.fx.zoomOut = function (d, f) {
    if (!(d = baidu.dom.g(d))) {
        return null
    }
    f = baidu.object.extend({
        to: 0.1, from: 1, opacityTrend: false, restoreAfterFinish: true, transition: function (a) {
            return 1 - Math.pow(1 - a, 2)
        }
    }, f || {});
    var g = baidu.fx.scale(d, f);
    g.addEventListener("onafterfinish", function () {
        baidu.dom.hide(this.element)
    });
    return g
};
baidu.fx.puff = function (c, d) {
    return baidu.fx.zoomOut(c, baidu.object.extend({to: 1.8, duration: 800, transformOrigin: "50% 50%"}, d || {}))
};
baidu.fx.pulsate = function (l, h, g) {
    if (!(l = baidu.dom.g(l))) {
        return null
    }
    if (isNaN(h) || h == 0) {
        return null
    }
    var j = l;
    var k = baidu.fx.create(j, baidu.object.extend({
        initialize: function () {
            this.protect("visibility")
        }, transition: function (a) {
            return Math.cos(2 * Math.PI * a)
        }, render: function (a) {
            j.style.visibility = a > 0 ? "visible" : "hidden"
        }, finish: function () {
            setTimeout(function () {
                baidu.fx.pulsate(l, --h, g)
            }, 10)
        }
    }, g), "baidu.fx.pulsate");
    return k.launch()
};
baidu.dom.remove = function (d) {
    d = baidu.dom._g(d);
    var c = d.parentNode;
    c && c.removeChild(d)
};
baidu.fx.remove = function (d, f) {
    var g = f.onafterfinish ? f.onafterfinish : new Function();
    return baidu.fx.fadeOut(d, baidu.object.extend(f || {}, {
        onafterfinish: function () {
            baidu.dom.remove(this.element);
            g.call(this)
        }
    }))
};
baidu.fx.scrollBy = function (d, j, h) {
    if (!(d = baidu.dom.g(d)) || typeof j != "object") {
        return null
    }
    var k = {}, l = {};
    k.x = j[0] || j.x || 0;
    k.y = j[1] || j.y || 0;
    var m = baidu.fx.create(d, baidu.object.extend({
        initialize: function () {
            var a = l.sTop = d.scrollTop;
            var c = l.sLeft = d.scrollLeft;
            l.sx = Math.min(d.scrollWidth - d.clientWidth - c, k.x);
            l.sy = Math.min(d.scrollHeight - d.clientHeight - a, k.y)
        }, transition: function (a) {
            return 1 - Math.pow(1 - a, 2)
        }, render: function (a) {
            d.scrollTop = (l.sy * a + l.sTop);
            d.scrollLeft = (l.sx * a + l.sLeft)
        }, restore: function () {
            d.scrollTop = l.sTop;
            d.scrollLeft = l.sLeft
        }
    }, h), "baidu.fx.scroll");
    return m.launch()
};
baidu.fx.scrollTo = function (h, f, d) {
    if (!(h = baidu.dom.g(h)) || typeof f != "object") {
        return null
    }
    var g = {};
    g.x = (f[0] || f.x || 0) - h.scrollLeft;
    g.y = (f[1] || f.y || 0) - h.scrollTop;
    return baidu.fx.scrollBy(h, g, d)
};
baidu.fx.shake = function (h, k, j) {
    if (!(h = baidu.dom.g(h))) {
        return null
    }
    var l = h;
    k = k || [];

    function n() {
        for (var a = 0; a < arguments.length; a++) {
            if (!isNaN(arguments[a])) {
                return arguments[a]
            }
        }
    }

    var m = baidu.fx.create(l, baidu.object.extend({
        initialize: function () {
            this.protect("top");
            this.protect("left");
            this.protect("position");
            this.restoreAfterFinish = true;
            if (baidu.dom.getStyle(l, "position") == "static") {
                l.style.position = "relative"
            }
            var a = this["\x06original"];
            this.originX = parseInt(a.left || 0);
            this.originY = parseInt(a.top || 0);
            this.offsetX = n(k[0], k.x, 16);
            this.offsetY = n(k[1], k.y, 5)
        }, transition: function (a) {
            var c = 1 - a;
            return Math.floor(c * 16) % 2 == 1 ? c : a - 1
        }, render: function (a) {
            l.style.top = (this.offsetY * a + this.originY) + "px";
            l.style.left = (this.offsetX * a + this.originX) + "px"
        }
    }, j || {}), "baidu.fx.shake");
    return m.launch()
};
baidu.fx.zoomIn = function (c, d) {
    if (!(c = baidu.dom.g(c))) {
        return null
    }
    d = baidu.object.extend({
        to: 1, from: 0.1, restoreAfterFinish: true, transition: function (a) {
            return Math.pow(a, 2)
        }
    }, d || {});
    return baidu.fx.scale(c, d)
};
/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function (a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cv(a) {
        if (!ck[a]) {
            var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                cl || (cl = c.createElement("iframe"), cl.frameBorder = cl.width = cl.height = 0), b.appendChild(cl);
                if (!cm || !cl.createElement) {
                    cm = (cl.contentWindow || cl.contentDocument).document, cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), cm.close()
                }
                d = cm.createElement(a), cm.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cl)
            }
            ck[a] = e
        }
        return ck[a]
    }

    function cu(a, b) {
        var c = {};
        f.each(cq.concat.apply([], cq.slice(0, b)), function () {
            c[this] = a
        });
        return c
    }

    function ct() {
        cr = b
    }

    function cs() {
        setTimeout(ct, 0);
        return cr = f.now()
    }

    function cj() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    function ci() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function cc(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1) {
                for (h in a.converters) {
                    typeof h == "string" && (e[h.toLowerCase()] = a.converters[h])
                }
            }
            l = k, k = d[g];
            if (k === "*") {
                k = l
            } else {
                if (l !== "*" && l !== k) {
                    m = l + " " + k, n = e[m] || e["* " + k];
                    if (!n) {
                        p = b;
                        for (o in e) {
                            j = o.split(" ");
                            if (j[0] === l || j[0] === "*") {
                                p = e[j[1] + " " + k];
                                if (p) {
                                    o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                    break
                                }
                            }
                        }
                    }
                    !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
                }
            }
        }
        return c
    }

    function cb(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g) {
            i in d && (c[g[i]] = d[i])
        }
        while (f[0] === "*") {
            f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"))
        }
        if (h) {
            for (i in e) {
                if (e[i] && e[i].test(h)) {
                    f.unshift(i);
                    break
                }
            }
        }
        if (f[0] in d) {
            j = f[0]
        } else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function ca(a, b, c, d) {
        if (f.isArray(b)) {
            f.each(b, function (b, e) {
                c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
            })
        } else {
            if (!c && b != null && typeof b == "object") {
                for (var e in b) {
                    ca(a + "[" + e + "]", b[e], c, d)
                }
            } else {
                d(a, b)
            }
        }
    }

    function b_(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) {
            c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d])
        }
        e && f.extend(!0, a, e)
    }

    function b$(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === bT, l;
        for (; i < j && (k || !l); i++) {
            l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = b$(a, c, d, e, l, g)))
        }
        (k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g));
        return l
    }

    function bZ(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bP), e = 0, g = d.length, h, i, j;
                for (; e < g; e++) {
                    h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
                }
            }
        }
    }

    function bC(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? bx : by, g = 0, h = e.length;
        if (d > 0) {
            if (c !== "border") {
                for (; g < h; g++) {
                    c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0
                }
            }
            return d + "px"
        }
        d = bz(a, b, b);
        if (d < 0 || d == null) {
            d = a.style[b] || 0
        }
        d = parseFloat(d) || 0;
        if (c) {
            for (; g < h; g++) {
                d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0)
            }
        }
        return d + "px"
    }

    function bp(a, b) {
        b.src ? f.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
    }

    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio") {
            a.defaultChecked = a.checked
        }
    }

    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        if (b.nodeType === 1) {
            b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
            if (c === "object") {
                b.outerHTML = a.outerHTML
            } else {
                if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
                    if (c === "option") {
                        b.selected = a.defaultSelected
                    } else {
                        if (c === "input" || c === "textarea") {
                            b.defaultValue = a.defaultValue
                        }
                    }
                } else {
                    a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)
                }
            }
            b.removeAttribute(f.expando)
        }
    }

    function bj(a, b) {
        if (b.nodeType === 1 && !!f.hasData(a)) {
            var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i) {
                    for (d = 0, e = i[c].length; d < e; d++) {
                        f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
                    }
                }
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"), c = a.createDocumentFragment();
        if (c.createElement) {
            while (b.length) {
                c.createElement(b.pop())
            }
        }
        return c
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) {
            return f.grep(a, function (a, d) {
                var e = !!b.call(a, d, a);
                return e === c
            })
        }
        if (b.nodeType) {
            return f.grep(a, function (a, d) {
                return a === b === c
            })
        }
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (O.test(b)) {
                return f.filter(b, d, !c)
            }
            b = f.filter(b, d)
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function K() {
        return !0
    }

    function J() {
        return !1
    }

    function n(a, b, c) {
        var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) {
                continue
            }
            if (b !== "toJSON") {
                return !1
            }
        }
        return !0
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {
                }
                f.data(a, c, d)
            } else {
                d = b
            }
        }
        return d
    }

    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) {
            b[a[c]] = !0
        }
        return b
    }

    var c = a.document, d = a.navigator, e = a.location, f = function () {
        function J() {
            if (!e.isReady) {
                try {
                    c.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(J, 1);
                    return
                }
                e.ready()
            }
        }

        var e = function (a, b) {
                return new e.fn.init(a, b, h)
            }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/,
            m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g,
            r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/,
            u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function (a, b) {
                return (b + "").toUpperCase()
            }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty,
            E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf,
            I = {};
        e.fn = e.prototype = {
            constructor: e, init: function (a, d, f) {
                var g, h, j, k;
                if (!a) {
                    return this
                }
                if (a.nodeType) {
                    this.context = this[0] = a, this.length = 1;
                    return this
                }
                if (a === "body" && !d && c.body) {
                    this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                    return this
                }
                if (typeof a == "string") {
                    a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                    if (g && (g[1] || !d)) {
                        if (g[1]) {
                            d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                            return e.merge(this, a)
                        }
                        h = c.getElementById(g[2]);
                        if (h && h.parentNode) {
                            if (h.id !== g[2]) {
                                return f.find(a)
                            }
                            this.length = 1, this[0] = h
                        }
                        this.context = c, this.selector = a;
                        return this
                    }
                    return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                }
                if (e.isFunction(a)) {
                    return f.ready(a)
                }
                a.selector !== b && (this.selector = a.selector, this.context = a.context);
                return e.makeArray(a, this)
            }, selector: "", jquery: "1.7.1", length: 0, size: function () {
                return this.length
            }, toArray: function () {
                return F.call(this, 0)
            }, get: function (a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
            }, pushStack: function (a, b, c) {
                var d = this.constructor();
                e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                return d
            }, each: function (a, b) {
                return e.each(this, a, b)
            }, ready: function (a) {
                e.bindReady(), A.add(a);
                return this
            }, eq: function (a) {
                a = +a;
                return a === -1 ? this.slice(a) : this.slice(a, a + 1)
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, slice: function () {
                return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
            }, map: function (a) {
                return this.pushStack(e.map(this, function (b, c) {
                    return a.call(b, c, b)
                }))
            }, end: function () {
                return this.prevObject || this.constructor(null)
            }, push: E, sort: [].sort, splice: [].splice
        }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
            for (; j < k; j++) {
                if ((a = arguments[j]) != null) {
                    for (c in a) {
                        d = i[c], f = a[c];
                        if (i === f) {
                            continue
                        }
                        l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
                    }
                }
            }
            return i
        }, e.extend({
            noConflict: function (b) {
                a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
                return e
            }, isReady: !1, readyWait: 1, holdReady: function (a) {
                a ? e.readyWait++ : e.ready(!0)
            }, ready: function (a) {
                if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                    if (!c.body) {
                        return setTimeout(e.ready, 1)
                    }
                    e.isReady = !0;
                    if (a !== !0 && --e.readyWait > 0) {
                        return
                    }
                    A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                }
            }, bindReady: function () {
                if (!A) {
                    A = e.Callbacks("once memory");
                    if (c.readyState === "complete") {
                        return setTimeout(e.ready, 1)
                    }
                    if (c.addEventListener) {
                        c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1)
                    } else {
                        if (c.attachEvent) {
                            c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                            var b = !1;
                            try {
                                b = a.frameElement == null
                            } catch (d) {
                            }
                            c.documentElement.doScroll && b && J()
                        }
                    }
                }
            }, isFunction: function (a) {
                return e.type(a) === "function"
            }, isArray: Array.isArray || function (a) {
                return e.type(a) === "array"
            }, isWindow: function (a) {
                return a && typeof a == "object" && "setInterval" in a
            }, isNumeric: function (a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            }, type: function (a) {
                return a == null ? String(a) : I[C.call(a)] || "object"
            }, isPlainObject: function (a) {
                if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) {
                    return !1
                }
                try {
                    if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) {
                        return !1
                    }
                } catch (c) {
                    return !1
                }
                var d;
                for (d in a) {
                }
                return d === b || D.call(a, d)
            }, isEmptyObject: function (a) {
                for (var b in a) {
                    return !1
                }
                return !0
            }, error: function (a) {
                throw new Error(a)
            }, parseJSON: function (b) {
                if (typeof b != "string" || !b) {
                    return null
                }
                b = e.trim(b);
                if (a.JSON && a.JSON.parse) {
                    return a.JSON.parse(b)
                }
                if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) {
                    return (new Function("return " + b))()
                }
                e.error("Invalid JSON: " + b)
            }, parseXML: function (c) {
                var d, f;
                try {
                    a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                } catch (g) {
                    d = b
                }
                (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                return d
            }, noop: function () {
            }, globalEval: function (b) {
                b && j.test(b) && (a.execScript || function (b) {
                    a.eval.call(a, b)
                })(b)
            }, camelCase: function (a) {
                return a.replace(w, "ms-").replace(v, x)
            }, nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
            }, each: function (a, c, d) {
                var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
                if (d) {
                    if (i) {
                        for (f in a) {
                            if (c.apply(a[f], d) === !1) {
                                break
                            }
                        }
                    } else {
                        for (; g < h;) {
                            if (c.apply(a[g++], d) === !1) {
                                break
                            }
                        }
                    }
                } else {
                    if (i) {
                        for (f in a) {
                            if (c.call(a[f], f, a[f]) === !1) {
                                break
                            }
                        }
                    } else {
                        for (; g < h;) {
                            if (c.call(a[g], g, a[g++]) === !1) {
                                break
                            }
                        }
                    }
                }
                return a
            }, trim: G ? function (a) {
                return a == null ? "" : G.call(a)
            } : function (a) {
                return a == null ? "" : (a + "").replace(k, "").replace(l, "")
            }, makeArray: function (a, b) {
                var c = b || [];
                if (a != null) {
                    var d = e.type(a);
                    a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                }
                return c
            }, inArray: function (a, b, c) {
                var d;
                if (b) {
                    if (H) {
                        return H.call(b, a, c)
                    }
                    d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (; c < d; c++) {
                        if (c in b && b[c] === a) {
                            return c
                        }
                    }
                }
                return -1
            }, merge: function (a, c) {
                var d = a.length, e = 0;
                if (typeof c.length == "number") {
                    for (var f = c.length; e < f; e++) {
                        a[d++] = c[e]
                    }
                } else {
                    while (c[e] !== b) {
                        a[d++] = c[e++]
                    }
                }
                a.length = d;
                return a
            }, grep: function (a, b, c) {
                var d = [], e;
                c = !!c;
                for (var f = 0, g = a.length; f < g; f++) {
                    e = !!b(a[f], f), c !== e && d.push(a[f])
                }
                return d
            }, map: function (a, c, d) {
                var f, g, h = [], i = 0, j = a.length,
                    k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                if (k) {
                    for (; i < j; i++) {
                        f = c(a[i], i, d), f != null && (h[h.length] = f)
                    }
                } else {
                    for (g in a) {
                        f = c(a[g], g, d), f != null && (h[h.length] = f)
                    }
                }
                return h.concat.apply([], h)
            }, guid: 1, proxy: function (a, c) {
                if (typeof c == "string") {
                    var d = a[c];
                    c = a, a = d
                }
                if (!e.isFunction(a)) {
                    return b
                }
                var f = F.call(arguments, 2), g = function () {
                    return a.apply(c, f.concat(F.call(arguments)))
                };
                g.guid = a.guid = a.guid || g.guid || e.guid++;
                return g
            }, access: function (a, c, d, f, g, h) {
                var i = a.length;
                if (typeof c == "object") {
                    for (var j in c) {
                        e.access(a, j, c[j], f, g, d)
                    }
                    return a
                }
                if (d !== b) {
                    f = !h && f && e.isFunction(d);
                    for (var k = 0; k < i; k++) {
                        g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h)
                    }
                    return a
                }
                return i ? g(a[0], c) : b
            }, now: function () {
                return (new Date).getTime()
            }, uaMatch: function (a) {
                a = a.toLowerCase();
                var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                return {browser: b[1] || "", version: b[2] || "0"}
            }, sub: function () {
                function a(b, c) {
                    return new a.fn.init(b, c)
                }

                e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                    f && f instanceof e && !(f instanceof a) && (f = a(f));
                    return e.fn.init.call(this, d, f, b)
                }, a.fn.init.prototype = a.fn;
                var b = a(c);
                return a
            }, browser: {}
        }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
            I["[object " + b + "]"] = b.toLowerCase()
        }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
            c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
        } : c.attachEvent && (B = function () {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
        });
        return e
    }(), g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m = function (b) {
            var d, e, g, h, i;
            for (d = 0, e = b.length; d < e; d++) {
                g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
            }
        }, n = function (b, f) {
            f = f || [], e = !a.memory || [b, f], i = !0, l = j || 0, j = 0, k = c.length;
            for (; c && l < k; l++) {
                if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
                    e = !0;
                    break
                }
            }
            i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])))
        }, o = {
            add: function () {
                if (c) {
                    var a = c.length;
                    m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]))
                }
                return this
            }, remove: function () {
                if (c) {
                    var b = arguments, d = 0, e = b.length;
                    for (; d < e; d++) {
                        for (var f = 0; f < c.length; f++) {
                            if (b[d] === c[f]) {
                                i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
                                if (a.unique) {
                                    break
                                }
                            }
                        }
                    }
                }
                return this
            }, has: function (a) {
                if (c) {
                    var b = 0, d = c.length;
                    for (; b < d; b++) {
                        if (a === c[b]) {
                            return !0
                        }
                    }
                }
                return !1
            }, empty: function () {
                c = [];
                return this
            }, disable: function () {
                c = d = e = b;
                return this
            }, disabled: function () {
                return !c
            }, lock: function () {
                d = b, (!e || e === !0) && o.disable();
                return this
            }, locked: function () {
                return !d
            }, fireWith: function (b, c) {
                d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c));
                return this
            }, fire: function () {
                o.fireWith(this, arguments);
                return this
            }, fired: function () {
                return !!e
            }
        };
        return o
    };
    var i = [].slice;
    f.extend({
        Deferred: function (a) {
            var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"),
                e = "pending", g = {resolve: b, reject: c, notify: d}, h = {
                    done: b.add, fail: c.add, progress: d.add, state: function () {
                        return e
                    }, isResolved: b.fired, isRejected: c.fired, then: function (a, b, c) {
                        i.done(a).fail(b).progress(c);
                        return this
                    }, always: function () {
                        i.done.apply(i, arguments).fail.apply(i, arguments);
                        return this
                    }, pipe: function (a, b, c) {
                        return f.Deferred(function (d) {
                            f.each({done: [a, "resolve"], fail: [b, "reject"], progress: [c, "notify"]}, function (a, b) {
                                var c = b[0], e = b[1], g;
                                f.isFunction(c) ? i[a](function () {
                                    g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                }) : i[a](d[e])
                            })
                        }).promise()
                    }, promise: function (a) {
                        if (a == null) {
                            a = h
                        } else {
                            for (var b in h) {
                                a[b] = h[b]
                            }
                        }
                        return a
                    }
                }, i = h.promise({}), j;
            for (j in g) {
                i[j] = g[j].fire, i[j + "With"] = g[j].fireWith
            }
            i.done(function () {
                e = "resolved"
            }, c.disable, d.lock).fail(function () {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(i, i);
            return i
        }, when: function (a) {
            function m(a) {
                return function (b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                }
            }

            function l(a) {
                return function (c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                }
            }

            var b = i.call(arguments, 0), c = 0, d = b.length, e = Array(d), g = d, h = d,
                j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
            if (d > 1) {
                for (; c < d; c++) {
                    b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g
                }
                g || j.resolveWith(j, b)
            } else {
                j !== a && j.resolveWith(j, d ? [a] : [])
            }
            return k
        }
    }), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"), r = c.documentElement;
        q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) {
            return {}
        }
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
            leadingWhitespace: q.firstChild.nodeType === 3,
            tbody: !q.getElementsByTagName("tbody").length,
            htmlSerialize: !!q.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: q.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete q.test
        } catch (s) {
            b.deleteExpando = !1
        }
        !q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {marginRight: 0}).marginRight, 10) || 0) === 0);
        if (q.attachEvent) {
            for (o in {submit: 1, change: 1, focusin: 1}) {
                n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p
            }
        }
        k.removeChild(q), k = g = h = j = q = i = null, f(function () {
            var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
            !r || (j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div><table " + n + " cellpadding='0' cellspacing='0'><tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
                doesNotAddBorder: e.offsetTop !== 5,
                doesAddBorderForTableAndCells: h.offsetTop === 5
            }, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0},
        hasData: function (a) {
            a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
            return !!a && !m(a)
        },
        data: function (a, c, d, e) {
            if (!!f.acceptData(a)) {
                var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a,
                    n = l ? a[j] : a[j] && j, o = c === "events";
                if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) {
                    return
                }
                n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
                if (typeof c == "object" || typeof c == "function") {
                    e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c)
                }
                g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
                if (o && !h[c]) {
                    return g.events
                }
                k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
                return i
            }
        },
        removeData: function (a, b, c) {
            if (!!f.acceptData(a)) {
                var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
                if (!j[k]) {
                    return
                }
                if (b) {
                    d = c ? j[k] : j[k].data;
                    if (d) {
                        f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                        for (e = 0, g = b.length; e < g; e++) {
                            delete d[b[e]]
                        }
                        if (!(c ? m : f.isEmptyObject)(d)) {
                            return
                        }
                    }
                }
                if (!c) {
                    delete j[k].data;
                    if (!m(j[k])) {
                        return
                    }
                }
                f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
            }
        },
        _data: function (a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) {
                    return b !== !0 && a.getAttribute("classid") === b
                }
            }
            return !0
        }
    }), f.fn.extend({
        data: function (a, c) {
            var d, e, g, h = null;
            if (typeof a == "undefined") {
                if (this.length) {
                    h = f.data(this[0]);
                    if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
                        e = this[0].attributes;
                        for (var i = 0, j = e.length; i < j; i++) {
                            g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]))
                        }
                        f._data(this[0], "parsedAttrs", !0)
                    }
                }
                return h
            }
            if (typeof a == "object") {
                return this.each(function () {
                    f.data(this, a)
                })
            }
            d = a.split("."), d[1] = d[1] ? "." + d[1] : "";
            if (c === b) {
                h = this.triggerHandler("getData" + d[1] + "!", [d[0]]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h));
                return h === b && d[1] ? this.data(d[0]) : h
            }
            return this.each(function () {
                var b = f(this), e = [d[0], c];
                b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
            })
        }, removeData: function (a) {
            return this.each(function () {
                f.removeData(this, a)
            })
        }
    }), f.extend({
        _mark: function (a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
        }, _unmark: function (a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
            }
        }, queue: function (a, b, c) {
            var d;
            if (a) {
                b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                return d || []
            }
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = f.queue(a, b), d = c.shift(), e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
                f.dequeue(a, b)
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
        }
    }), f.fn.extend({
        queue: function (a, c) {
            typeof a != "string" && (c = a, a = "fx");
            if (c === b) {
                return f.queue(this[0], a)
            }
            return this.each(function () {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                f.dequeue(this, a)
            })
        }, delay: function (a, b) {
            a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }

            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
            while (g--) {
                if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) {
                    h++, l.add(m)
                }
            }
            m();
            return d.promise()
        }
    });
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i,
        s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i,
        u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({
        attr: function (a, b) {
            return f.access(this, a, b, !0, f.attr)
        }, removeAttr: function (a) {
            return this.each(function () {
                f.removeAttr(this, a)
            })
        }, prop: function (a, b) {
            return f.access(this, a, b, !0, f.prop)
        }, removeProp: function (a) {
            a = f.propFix[a] || a;
            return this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {
                }
            })
        }, addClass: function (a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) {
                return this.each(function (b) {
                    f(this).addClass(a.call(this, b, this.className))
                })
            }
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1) {
                        if (!e.className && b.length === 1) {
                            e.className = a
                        } else {
                            g = " " + e.className + " ";
                            for (h = 0, i = b.length; h < i; h++) {
                                ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ")
                            }
                            e.className = f.trim(g)
                        }
                    }
                }
            }
            return this
        }, removeClass: function (a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) {
                return this.each(function (b) {
                    f(this).removeClass(a.call(this, b, this.className))
                })
            }
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className) {
                        if (a) {
                            h = (" " + g.className + " ").replace(o, " ");
                            for (i = 0, j = c.length; i < j; i++) {
                                h = h.replace(" " + c[i] + " ", " ")
                            }
                            g.className = f.trim(h)
                        } else {
                            g.className = ""
                        }
                    }
                }
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a, d = typeof b == "boolean";
            if (f.isFunction(a)) {
                return this.each(function (c) {
                    f(this).toggleClass(a.call(this, c, this.className, b), b)
                })
            }
            return this.each(function () {
                if (c === "string") {
                    var e, g = 0, h = f(this), i = b, j = a.split(p);
                    while (e = j[g++]) {
                        i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
                    }
                } else {
                    if (c === "undefined" || c === "boolean") {
                        this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
                    }
                }
            })
        }, hasClass: function (a) {
            var b = " " + a + " ", c = 0, d = this.length;
            for (; c < d; c++) {
                if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) {
                    return !0
                }
            }
            return !1
        }, val: function (a) {
            var c, d, e, g = this[0];
            if (!!arguments.length) {
                e = f.isFunction(a);
                return this.each(function (d) {
                    var g = f(this), h;
                    if (this.nodeType === 1) {
                        e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                            return a == null ? "" : a + ""
                        })), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
                        if (!c || !("set" in c) || c.set(this, h, "value") === b) {
                            this.value = h
                        }
                    }
                })
            }
            if (g) {
                c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type];
                if (c && "get" in c && (d = c.get(g, "value")) !== b) {
                    return d
                }
                d = g.value;
                return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
            }
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            }, select: {
                get: function (a) {
                    var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
                    if (g < 0) {
                        return null
                    }
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) {
                                return b
                            }
                            h.push(b)
                        }
                    }
                    if (j && !h.length && i.length) {
                        return f(i[g]).val()
                    }
                    return h
                }, set: function (a, b) {
                    var c = f.makeArray(b);
                    f(a).find("option").each(function () {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1);
                    return c
                }
            }
        },
        attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0},
        attr: function (a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!!a && j !== 3 && j !== 8 && j !== 2) {
                if (e && c in f.attrFn) {
                    return f(a)[c](d)
                }
                if (typeof a.getAttribute == "undefined") {
                    return f.prop(a, c, d)
                }
                i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
                if (d !== b) {
                    if (d === null) {
                        f.removeAttr(a, c);
                        return
                    }
                    if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) {
                        return g
                    }
                    a.setAttribute(c, "" + d);
                    return d
                }
                if (h && "get" in h && i && (g = h.get(a, c)) !== null) {
                    return g
                }
                g = a.getAttribute(c);
                return g === null ? b : g
            }
        },
        removeAttr: function (a, b) {
            var c, d, e, g, h = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; h < g; h++) {
                    e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1))
                }
            }
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (r.test(a.nodeName) && a.parentNode) {
                        f.error("type property can't be changed")
                    } else {
                        if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                            var c = a.value;
                            a.setAttribute("type", b), c && (a.value = c);
                            return b
                        }
                    }
                }
            }, value: {
                get: function (a, b) {
                    if (w && f.nodeName(a, "button")) {
                        return w.get(a, b)
                    }
                    return b in a ? a.value : null
                }, set: function (a, b, c) {
                    if (w && f.nodeName(a, "button")) {
                        return w.set(a, b, c)
                    }
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!!a && i !== 3 && i !== 8 && i !== 2) {
                h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
                return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
            }
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function (a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        }, set: function (a, b, c) {
            var d;
            b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
            return c
        }
    }, v || (y = {name: !0, id: !0}, w = f.valHooks.button = {
        get: function (a, c) {
            var d;
            d = a.getAttributeNode(c);
            return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        }, set: function (a, b, d) {
            var e = a.getAttributeNode(d);
            e || (e = c.createAttribute(d), a.setAttributeNode(e));
            return e.nodeValue = b + ""
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function (a, c) {
                if (c === "") {
                    a.setAttribute(b, "auto");
                    return c
                }
            }
        })
    }), f.attrHooks.contenteditable = {
        get: w.get, set: function (a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c)
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }), f.support.style || (f.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b
        }, set: function (a, b) {
            return a.style.cssText = "" + b
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
            return null
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {
            get: function (a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function (a, b) {
                if (f.isArray(b)) {
                    return a.checked = f.inArray(f(a).val(), b) >= 0
                }
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /\bhover(\.\S+)?\b/, C = /^key/,
        D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/,
        F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function (a) {
            var b = F.exec(a);
            b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
            return b
        }, H = function (a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
        }, I = function (a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
    f.event = {
        add: function (a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                    return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                }, i.elem = a), c = f.trim(I(c)).split(" ");
                for (k = 0; k < c.length; k++) {
                    l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                        type: m,
                        origType: l[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: g,
                        quick: G(g),
                        namespace: n.join(".")
                    }, p), r = j[m];
                    if (!r) {
                        r = j[m] = [], r.delegateCount = 0;
                        if (!s.setup || s.setup.call(a, e, n, i) === !1) {
                            a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                        }
                    }
                    s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
                }
                a = null
            }
        },
        global: {},
        remove: function (a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
            if (!!g && !!(o = g.events)) {
                b = f.trim(I(b || "")).split(" ");
                for (h = 0; h < b.length; h++) {
                    i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                    if (!j) {
                        for (j in o) {
                            f.event.remove(a, j + b[h], c, d, !0)
                        }
                        continue
                    }
                    p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    for (n = 0; n < r.length; n++) {
                        s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s))
                    }
                    r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
                }
                f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
            }
        },
        customEvent: {getData: !0, setData: !0, changeData: !0},
        trigger: function (c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered)) {
                    return
                }
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h]) {
                    return
                }
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j) {
                        j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0)
                    }
                    return
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1) {
                    return
                }
                r = [[e, p.bindType || h]];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (; m; m = m.parentNode) {
                        r.push([m, s]), n = m
                    }
                    n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++) {
                    m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault()
                }
                c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
                return c.result
            }
        },
        dispatch: function (c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0),
                h = !c.exclusive && !c.namespace, i = [], j, k, l, m, n, o, p, q, r, s, t;
            g[0] = c, c.delegateTarget = this;
            if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
                m = f(this), m.context = this.ownerDocument || this;
                for (l = c.target; l != this; l = l.parentNode || this) {
                    o = {}, q = [], m[0] = l;
                    for (j = 0; j < e; j++) {
                        r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r)
                    }
                    q.length && i.push({elem: l, matches: q})
                }
            }
            d.length > e && i.push({elem: this, matches: d.slice(e)});
            for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                p = i[j], c.currentTarget = p.elem;
                for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
                    r = p.matches[k];
                    if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) {
                        c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()))
                    }
                }
            }
            return c.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, d) {
                var e, f, g, h = d.button, i = d.fromElement;
                a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                return a
            }
        },
        fix: function (a) {
            if (a[f.expando]) {
                return a
            }
            var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d;) {
                e = i[--d], a[e] = g[e]
            }
            a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
            return h.filter ? h.filter(a, g) : a
        },
        special: {
            ready: {setup: f.bindReady},
            load: {noBubble: !0},
            focus: {delegateType: "focusin"},
            blur: {delegateType: "focusout"},
            beforeunload: {
                setup: function (a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c)
                }, teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = f.extend(new f.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, f.Event = function (a, b) {
        if (!(this instanceof f.Event)) {
            return new f.Event(a, b)
        }
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
    }, f.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        }, stopPropagation: function () {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = K, this.stopPropagation()
        }, isDefaultPrevented: J, isPropagationStopped: J, isImmediatePropagationStopped: J
    }, f.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        f.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
                if (!d || d !== c && !f.contains(c, d)) {
                    a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b
                }
                return h
            }
        }
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function () {
            if (f.nodeName(this, "form")) {
                return !1
            }
            f.event.add(this, "click._submit keypress._submit", function (a) {
                var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                    this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0)
                }), d._submit_attached = !0)
            })
        }, teardown: function () {
            if (f.nodeName(this, "form")) {
                return !1
            }
            f.event.remove(this, "._submit")
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function () {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") {
                    f.event.add(this, "propertychange._change", function (a) {
                        a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                    }), f.event.add(this, "click._change", function (a) {
                        this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                    })
                }
                return !1
            }
            f.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                }), b._change_attached = !0)
            })
        }, handle: function (a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") {
                return a.handleObj.handler.apply(this, arguments)
            }
        }, teardown: function () {
            f.event.remove(this, "._change");
            return z.test(this.nodeName)
        }
    }), f.support.focusinBubbles || f.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var d = 0, e = function (a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0)
        };
        f.event.special[b] = {
            setup: function () {
                d++ === 0 && c.addEventListener(a, e, !0)
            }, teardown: function () {
                --d === 0 && c.removeEventListener(a, e, !0)
            }
        }
    }), f.fn.extend({
        on: function (a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = c, c = b);
                for (i in a) {
                    this.on(i, c, d, a[i], g)
                }
                return this
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) {
                e = J
            } else {
                if (!e) {
                    return this
                }
            }
            g === 1 && (h = e, e = function (a) {
                f().off(a);
                return h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = f.guid++));
            return this.each(function () {
                f.event.add(this, a, e, d, c)
            })
        }, one: function (a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1)
        }, off: function (a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
                return this
            }
            if (typeof a == "object") {
                for (var g in a) {
                    this.off(g, c, a[g])
                }
                return this
            }
            if (c === !1 || typeof c == "function") {
                d = c, c = b
            }
            d === !1 && (d = J);
            return this.each(function () {
                f.event.remove(this, a, d, c)
            })
        }, bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, live: function (a, b, c) {
            f(this.context).on(a, this.selector, b, c);
            return this
        }, die: function (a, b) {
            f(this.context).off(a, this.selector || "**", b);
            return this
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
        }, trigger: function (a, b) {
            return this.each(function () {
                f.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            if (this[0]) {
                return f.event.trigger(a, b, this[0], !0)
            }
        }, toggle: function (a) {
            var b = arguments, c = a.guid || f.guid++, d = 0, e = function (c) {
                var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
                return b[e].apply(this, arguments) || !1
            };
            e.guid = c;
            while (d < b.length) {
                b[d++].guid = c
            }
            return this.click(e)
        }, hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        f.fn[b] = function (a, c) {
            c == null && (c = a, a = null);
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }), function () {
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else {
                                if (m.filter(b, [j]).length > 0) {
                                    k = j;
                                    break
                                }
                            }
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1,
            i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [0, 0].sort(function () {
            i = !1;
            return 0
        });
        var m = function (b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9) {
                return []
            }
            if (!b || typeof b != "string") {
                return e
            }
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b)) {
                if (w.length === 2 && o.relative[w[0]]) {
                    j = y(w[0] + w[1], d, f)
                } else {
                    j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                    while (w.length) {
                        b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
                    }
                }
            } else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {
                        expr: w.pop(),
                        set: s(f)
                    } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                    while (w.length) {
                        q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                    }
                } else {
                    k = w = []
                }
            }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]") {
                if (!u) {
                    e.push.apply(e, k)
                } else {
                    if (d && d.nodeType === 1) {
                        for (t = 0; k[t] != null; t++) {
                            k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t])
                        }
                    } else {
                        for (t = 0; k[t] != null; t++) {
                            k[t] && k[t].nodeType === 1 && e.push(j[t])
                        }
                    }
                }
            } else {
                s(k, e)
            }
            l && (m(l, h, e, f), m.uniqueSort(e));
            return e
        };
        m.uniqueSort = function (a) {
            if (u) {
                h = i, a.sort(u);
                if (h) {
                    for (var b = 1; b < a.length; b++) {
                        a[b] === a[b - 1] && a.splice(b--, 1)
                    }
                }
            }
            return a
        }, m.matches = function (a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a) {
                return []
            }
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
            return {set: d, expr: a}
        }, m.filter = function (a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter) {
                    if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                        k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                        if (l.substr(l.length - 1) === "\\") {
                            continue
                        }
                        s === r && (r = []);
                        if (o.preFilter[h]) {
                            f = o.preFilter[h](f, s, d, r, e, t);
                            if (!f) {
                                g = i = !0
                            } else {
                                if (f === !0) {
                                    continue
                                }
                            }
                        }
                        if (f) {
                            for (n = 0; (j = s[n]) != null; n++) {
                                j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0))
                            }
                        }
                        if (i !== b) {
                            d || (s = r), a = a.replace(o.match[h], "");
                            if (!g) {
                                return []
                            }
                            break
                        }
                    }
                }
                if (a === q) {
                    if (g == null) {
                        m.error(a)
                    } else {
                        break
                    }
                }
                q = a
            }
            return s
        }, m.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        };
        var n = m.getText = function (a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9) {
                    if (typeof a.textContent == "string") {
                        return a.textContent
                    }
                    if (typeof a.innerText == "string") {
                        return a.innerText.replace(k, "")
                    }
                    for (a = a.firstChild; a; a = a.nextSibling) {
                        e += n(a)
                    }
                } else {
                    if (d === 3 || d === 4) {
                        return a.nodeValue
                    }
                }
            } else {
                for (b = 0; c = a[b]; b++) {
                    c.nodeType !== 8 && (e += n(c))
                }
            }
            return e
        }, o = m.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {"class": "className", "for": "htmlFor"},
            attrHandle: {
                href: function (a) {
                    return a.getAttribute("href")
                }, type: function (a) {
                    return a.getAttribute("type")
                }
            },
            relative: {
                "+": function (a, b) {
                    var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f = 0, g = a.length, h; f < g; f++) {
                        if (h = a[f]) {
                            while ((h = h.previousSibling) && h.nodeType !== 1) {
                            }
                            a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                        }
                    }
                    e && m.filter(b, a, !0)
                }, ">": function (a, b) {
                    var c, d = typeof b == "string", e = 0, f = a.length;
                    if (d && !l.test(b)) {
                        b = b.toLowerCase();
                        for (; e < f; e++) {
                            c = a[e];
                            if (c) {
                                var g = c.parentNode;
                                a[e] = g.nodeName.toLowerCase() === b ? g : !1
                            }
                        }
                    } else {
                        for (; e < f; e++) {
                            c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b)
                        }
                        d && m.filter(b, a, !0)
                    }
                }, "": function (a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                }, "~": function (a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                }
            },
            find: {
                ID: function (a, b, c) {
                    if (typeof b.getElementById != "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [d] : []
                    }
                }, NAME: function (a, b) {
                    if (typeof b.getElementsByName != "undefined") {
                        var c = [], d = b.getElementsByName(a[1]);
                        for (var e = 0, f = d.length; e < f; e++) {
                            d[e].getAttribute("name") === a[1] && c.push(d[e])
                        }
                        return c.length === 0 ? null : c
                    }
                }, TAG: function (a, b) {
                    if (typeof b.getElementsByTagName != "undefined") {
                        return b.getElementsByTagName(a[1])
                    }
                }
            },
            preFilter: {
                CLASS: function (a, b, c, d, e, f) {
                    a = " " + a[1].replace(j, "") + " ";
                    if (f) {
                        return a
                    }
                    for (var g = 0, h; (h = b[g]) != null; g++) {
                        h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1))
                    }
                    return !1
                }, ID: function (a) {
                    return a[1].replace(j, "")
                }, TAG: function (a, b) {
                    return a[1].replace(j, "").toLowerCase()
                }, CHILD: function (a) {
                    if (a[1] === "nth") {
                        a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                    } else {
                        a[2] && m.error(a[0])
                    }
                    a[0] = e++;
                    return a
                }, ATTR: function (a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(j, "");
                    !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
                    return a
                }, PSEUDO: function (b, c, d, e, f) {
                    if (b[1] === "not") {
                        if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) {
                            b[3] = m(b[3], null, null, c)
                        } else {
                            var g = m.filter(b[3], c, d, !0 ^ f);
                            d || e.push.apply(e, g);
                            return !1
                        }
                    } else {
                        if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) {
                            return !0
                        }
                    }
                    return b
                }, POS: function (a) {
                    a.unshift(!0);
                    return a
                }
            },
            filters: {
                enabled: function (a) {
                    return a.disabled === !1 && a.type !== "hidden"
                }, disabled: function (a) {
                    return a.disabled === !0
                }, checked: function (a) {
                    return a.checked === !0
                }, selected: function (a) {
                    a.parentNode && a.parentNode.selectedIndex;
                    return a.selected === !0
                }, parent: function (a) {
                    return !!a.firstChild
                }, empty: function (a) {
                    return !a.firstChild
                }, has: function (a, b, c) {
                    return !!m(c[3], a).length
                }, header: function (a) {
                    return /h\d/i.test(a.nodeName)
                }, text: function (a) {
                    var b = a.getAttribute("type"), c = a.type;
                    return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                }, radio: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                }, checkbox: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                }, file: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "file" === a.type
                }, password: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "password" === a.type
                }, submit: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "submit" === a.type
                }, image: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "image" === a.type
                }, reset: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "reset" === a.type
                }, button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && "button" === a.type || b === "button"
                }, input: function (a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                }, focus: function (a) {
                    return a === a.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function (a, b) {
                    return b === 0
                }, last: function (a, b, c, d) {
                    return b === d.length - 1
                }, even: function (a, b) {
                    return b % 2 === 0
                }, odd: function (a, b) {
                    return b % 2 === 1
                }, lt: function (a, b, c) {
                    return b < c[3] - 0
                }, gt: function (a, b, c) {
                    return b > c[3] - 0
                }, nth: function (a, b, c) {
                    return c[3] - 0 === b
                }, eq: function (a, b, c) {
                    return c[3] - 0 === b
                }
            },
            filter: {
                PSEUDO: function (a, b, c, d) {
                    var e = b[1], f = o.filters[e];
                    if (f) {
                        return f(a, c, b, d)
                    }
                    if (e === "contains") {
                        return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0
                    }
                    if (e === "not") {
                        var g = b[3];
                        for (var h = 0, i = g.length; h < i; h++) {
                            if (g[h] === a) {
                                return !1
                            }
                        }
                        return !0
                    }
                    m.error(e)
                }, CHILD: function (a, b) {
                    var c, e, f, g, h, i, j, k = b[1], l = a;
                    switch (k) {
                        case"only":
                        case"first":
                            while (l = l.previousSibling) {
                                if (l.nodeType === 1) {
                                    return !1
                                }
                            }
                            if (k === "first") {
                                return !0
                            }
                            l = a;
                        case"last":
                            while (l = l.nextSibling) {
                                if (l.nodeType === 1) {
                                    return !1
                                }
                            }
                            return !0;
                        case"nth":
                            c = b[2], e = b[3];
                            if (c === 1 && e === 0) {
                                return !0
                            }
                            f = b[0], g = a.parentNode;
                            if (g && (g[d] !== f || !a.nodeIndex)) {
                                i = 0;
                                for (l = g.firstChild; l; l = l.nextSibling) {
                                    l.nodeType === 1 && (l.nodeIndex = ++i)
                                }
                                g[d] = f
                            }
                            j = a.nodeIndex - e;
                            return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                    }
                }, ID: function (a, b) {
                    return a.nodeType === 1 && a.getAttribute("id") === b
                }, TAG: function (a, b) {
                    return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
                }, CLASS: function (a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                }, ATTR: function (a, b) {
                    var c = b[1],
                        d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                        e = d + "", f = b[2], g = b[4];
                    return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                }, POS: function (a, b, c, d) {
                    var e = b[2], f = o.setFilters[e];
                    if (f) {
                        return f(a, c, b, d)
                    }
                }
            }
        }, p = o.match.POS, q = function (a, b) {
            return "\\" + (b - 0 + 1)
        };
        for (var r in o.match) {
            o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q))
        }
        var s = function (a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b
            }
            return a
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function (a, b) {
                var c = 0, d = b || [];
                if (g.call(a) === "[object Array]") {
                    Array.prototype.push.apply(d, a)
                } else {
                    if (typeof a.length == "number") {
                        for (var e = a.length; c < e; c++) {
                            d.push(a[c])
                        }
                    } else {
                        for (; a[c]; c++) {
                            d.push(a[c])
                        }
                    }
                }
                return d
            }
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                return a.compareDocumentPosition ? -1 : 1
            }
            return a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (a.sourceIndex && b.sourceIndex) {
                return a.sourceIndex - b.sourceIndex
            }
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i) {
                return v(a, b)
            }
            if (!g) {
                return -1
            }
            if (!i) {
                return 1
            }
            while (j) {
                e.unshift(j), j = j.parentNode
            }
            j = i;
            while (j) {
                f.unshift(j), j = j.parentNode
            }
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++) {
                if (e[k] !== f[k]) {
                    return v(e[k], f[k])
                }
            }
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }, v = function (a, b, c) {
            if (a === b) {
                return c
            }
            var d = a.nextSibling;
            while (d) {
                if (d === b) {
                    return -1
                }
                d = d.nextSibling
            }
            return 1
        }), function () {
            var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), e.removeChild(a), e = a = null
        }(), function () {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) {
                        c[e].nodeType === 1 && d.push(c[e])
                    }
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), c.querySelectorAll && function () {
            var a = m, b = c.createElement("div"), d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                m = function (b, e, f, g) {
                    e = e || c;
                    if (!g && !m.isXML(e)) {
                        var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                            if (h[1]) {
                                return s(e.getElementsByTagName(b), f)
                            }
                            if (h[2] && o.find.CLASS && e.getElementsByClassName) {
                                return s(e.getElementsByClassName(h[2]), f)
                            }
                        }
                        if (e.nodeType === 9) {
                            if (b === "body" && e.body) {
                                return s([e.body], f)
                            }
                            if (h && h[3]) {
                                var i = e.getElementById(h[3]);
                                if (!i || !i.parentNode) {
                                    return s([], f)
                                }
                                if (i.id === h[3]) {
                                    return s([i], f)
                                }
                            }
                            try {
                                return s(e.querySelectorAll(b), f)
                            } catch (j) {
                            }
                        } else {
                            if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                                var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode,
                                    q = /^\s*[+~]/.test(b);
                                l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                                try {
                                    if (!q || p) {
                                        return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                                    }
                                } catch (r) {
                                } finally {
                                    l || k.removeAttribute("id")
                                }
                            }
                        }
                    }
                    return a(b, e, f, g)
                };
                for (var e in a) {
                    m[e] = a[e]
                }
                b = null
            }
        }(), function () {
            var a = c.documentElement,
                b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"), e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle")
                } catch (f) {
                    e = !0
                }
                m.matchesSelector = function (a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a)) {
                        try {
                            if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                                var f = b.call(a, c);
                                if (f || !d || a.document && a.document.nodeType !== 11) {
                                    return f
                                }
                            }
                        } catch (g) {
                        }
                    }
                    return m(c, null, null, [a]).length > 0
                }
            }
        }(), function () {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1) {
                    return
                }
                o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c) {
                        return b.getElementsByClassName(a[1])
                    }
                }, a = null
            }
        }(), c.documentElement.contains ? m.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        } : m.contains = function () {
            return !1
        }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var y = function (a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [b] : b;
            while (d = o.match.PSEUDO.exec(a)) {
                f += d[0], a = a.replace(o.match.PSEUDO, "")
            }
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++) {
                m(a, g[h], e, c)
            }
            return m.filter(f, e)
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
    }();
    var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice,
        Q = f.expr.match.POS, R = {children: !0, contents: !0, next: !0, prev: !0};
    f.fn.extend({
        find: function (a) {
            var b = this, c, d;
            if (typeof a != "string") {
                return f(a).filter(function () {
                    for (c = 0, d = b.length; c < d; c++) {
                        if (f.contains(b[c], this)) {
                            return !0
                        }
                    }
                })
            }
            var e = this.pushStack("", "find", a), g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0) {
                    for (h = g; h < e.length; h++) {
                        for (i = 0; i < g; i++) {
                            if (e[i] === e[h]) {
                                e.splice(h--, 1);
                                break
                            }
                        }
                    }
                }
            }
            return e
        }, has: function (a) {
            var b = f(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; a < c; a++) {
                    if (f.contains(this, b[a])) {
                        return !0
                    }
                }
            })
        }, not: function (a) {
            return this.pushStack(T(this, a, !1), "not", a)
        }, filter: function (a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        }, is: function (a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        }, closest: function (a, b) {
            var c = [], d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) {
                        f(g).is(a[d]) && c.push({selector: a[d], elem: g, level: h})
                    }
                    g = g.parentNode, h++
                }
                return c
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) {
                        break
                    }
                }
            }
            c = c.length > 1 ? f.unique(c) : c;
            return this.pushStack(c, "closest", a)
        }, index: function (a) {
            if (!a) {
                return this[0] && this[0].parentNode ? this.prevAll().length : -1
            }
            if (typeof a == "string") {
                return f.inArray(this[0], f(a))
            }
            return f.inArray(a.jquery ? a[0] : a, this)
        }, add: function (a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a), d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        }, andSelf: function () {
            return this.add(this.prevObject)
        }
    }), f.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        }, parents: function (a) {
            return f.dir(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return f.dir(a, "parentNode", c)
        }, next: function (a) {
            return f.nth(a, 2, "nextSibling")
        }, prev: function (a) {
            return f.nth(a, 2, "previousSibling")
        }, nextAll: function (a) {
            return f.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return f.dir(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return f.dir(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return f.dir(a, "previousSibling", c)
        }, siblings: function (a) {
            return f.sibling(a.parentNode.firstChild, a)
        }, children: function (a) {
            return f.sibling(a.firstChild)
        }, contents: function (a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({
        filter: function (a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        }, dir: function (a, c, d) {
            var e = [], g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) {
                g.nodeType === 1 && e.push(g), g = g[c]
            }
            return e
        }, nth: function (a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c]) {
                if (a.nodeType === 1 && ++e === b) {
                    break
                }
            }
            return a
        }, sibling: function (a, b) {
            var c = [];
            for (; a; a = a.nextSibling) {
                a.nodeType === 1 && a !== b && c.push(a)
            }
            return c
        }
    });
    var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/,
        Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i,
        _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i,
        bc = new RegExp("<(?:" + V + ")", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, be = /\/(java|ecma)script/i,
        bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function (a) {
            if (f.isFunction(a)) {
                return this.each(function (b) {
                    var c = f(this);
                    c.text(a.call(this, b, c.text()))
                })
            }
            if (typeof a != "object" && a !== b) {
                return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
            }
            return f.text(this)
        }, wrapAll: function (a) {
            if (f.isFunction(a)) {
                return this.each(function (b) {
                    f(this).wrapAll(a.call(this, b))
                })
            }
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) {
                        a = a.firstChild
                    }
                    return a
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            if (f.isFunction(a)) {
                return this.each(function (b) {
                    f(this).wrapInner(a.call(this, b))
                })
            }
            return this.each(function () {
                var b = f(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            var b = f.isFunction(a);
            return this.each(function (c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        }, before: function () {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, !1, function (a) {
                    this.parentNode.insertBefore(a, this)
                })
            }
            if (arguments.length) {
                var a = f.clean(arguments);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        }, after: function () {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, !1, function (a) {
                    this.parentNode.insertBefore(a, this.nextSibling)
                })
            }
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, f.clean(arguments));
                return a
            }
        }, remove: function (a, b) {
            for (var c = 0, d; (d = this[c]) != null; c++) {
                if (!a || f.filter(a, [d]).length) {
                    !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d)
                }
            }
            return this
        }, empty: function () {
            for (var a = 0, b; (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) {
                    b.removeChild(b.firstChild)
                }
            }
            return this
        }, clone: function (a, b) {
            a = a == null ? !1 : a, b = b == null ? a : b;
            return this.map(function () {
                return f.clone(this, a, b)
            })
        }, html: function (a) {
            if (a === b) {
                return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null
            }
            if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; c < d; c++) {
                        this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                    }
                } catch (e) {
                    this.empty().append(a)
                }
            } else {
                f.isFunction(a) ? this.each(function (b) {
                    var c = f(this);
                    c.html(a.call(this, b, c.html()))
                }) : this.empty().append(a)
            }
            return this
        }, replaceWith: function (a) {
            if (this[0] && this[0].parentNode) {
                if (f.isFunction(a)) {
                    return this.each(function (b) {
                        var c = f(this), d = c.html();
                        c.replaceWith(a.call(this, b, d))
                    })
                }
                typeof a != "string" && (a = f(a).detach());
                return this.each(function () {
                    var b = this.nextSibling, c = this.parentNode;
                    f(this).remove(), b ? f(b).before(a) : f(c).append(a)
                })
            }
            return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        }, detach: function (a) {
            return this.remove(a, !0)
        }, domManip: function (a, c, d) {
            var e, g, h, i, j = a[0], k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) {
                return this.each(function () {
                    f(this).domManip(a, c, d, !0)
                })
            }
            if (f.isFunction(j)) {
                return this.each(function (e) {
                    var g = f(this);
                    a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
                })
            }
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {fragment: i} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) {
                        d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                    }
                }
                k.length && f.each(k, bp)
            }
            return this
        }
    }), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return {fragment: e, cacheable: g}
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        f.fn[a] = function (c) {
            var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({
        clone: function (a, b, c) {
            var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h), d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g) {
                    e[g] && bk(d[g], e[g])
                }
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a), e = bl(h);
                    for (g = 0; d[g]; ++g) {
                        bj(d[g], e[g])
                    }
                }
            }
            d = e = null;
            return h
        }, clean: function (a, b, d, e) {
            var g;
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            var h = [], i;
            for (var j = 0, k; (k = a[j]) != null; j++) {
                typeof k == "number" && (k += "");
                if (!k) {
                    continue
                }
                if (typeof k == "string") {
                    if (!_.test(k)) {
                        k = b.createTextNode(k)
                    } else {
                        k = k.replace(Y, "<$1></$2>");
                        var l = (Z.exec(k) || ["", ""])[1].toLowerCase(), m = bg[l] || bg._default, n = m[0],
                            o = b.createElement("div");
                        b === c ? bh.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
                        while (n--) {
                            o = o.lastChild
                        }
                        if (!f.support.tbody) {
                            var p = $.test(k),
                                q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
                            for (i = q.length - 1; i >= 0; --i) {
                                f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
                            }
                        }
                        !f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes
                    }
                }
                var r;
                if (!f.support.appendChecked) {
                    if (k[0] && typeof(r = k.length) == "number") {
                        for (i = 0; i < r; i++) {
                            bn(k[i])
                        }
                    } else {
                        bn(k)
                    }
                }
                k.nodeType ? h.push(k) : h = f.merge(h, k)
            }
            if (d) {
                g = function (a) {
                    return !a.type || be.test(a.type)
                };
                for (j = 0; h[j]; j++) {
                    if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) {
                        e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j])
                    } else {
                        if (h[j].nodeType === 1) {
                            var s = f.grep(h[j].getElementsByTagName("script"), g);
                            h.splice.apply(h, [j + 1, 0].concat(s))
                        }
                        d.appendChild(h[j])
                    }
                }
            }
            return h
        }, cleanData: function (a) {
            var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
            for (var h = 0, i; (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) {
                    continue
                }
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) {
                            e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle)
                        }
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                }
            }
        }
    });
    var bq = /alpha\([^)]*\)/i, br = /opacity=([^)]*)/, bs = /([A-Z]|^ms)/g, bt = /^-?\d+(?:px)?$/i, bu = /^-?\d/,
        bv = /^([\-+])=([\-+.\de]+)/, bw = {position: "absolute", visibility: "hidden", display: "block"},
        bx = ["Left", "Right"], by = ["Top", "Bottom"], bz, bA, bB;
    f.fn.css = function (a, c) {
        if (arguments.length === 2 && c === b) {
            return this
        }
        return f.access(this, a, c, !0, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        })
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = bz(a, "opacity", "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": f.support.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (a, c, d, e) {
            if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
                c = f.cssProps[i] || i;
                if (d === b) {
                    if (k && "get" in k && (g = k.get(a, !1, e)) !== b) {
                        return g
                    }
                    return j[c]
                }
                h = typeof d, h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
                if (d == null || h === "number" && isNaN(d)) {
                    return
                }
                h === "number" && !f.cssNumber[i] && (d += "px");
                if (!k || !("set" in k) || (d = k.set(a, d)) !== b) {
                    try {
                        j[c] = d
                    } catch (l) {
                    }
                }
            }
        },
        css: function (a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) {
                return e
            }
            if (bz) {
                return bz(a, c)
            }
        },
        swap: function (a, b, c) {
            var d = {};
            for (var e in b) {
                d[e] = a.style[e], a.style[e] = b[e]
            }
            c.call(a);
            for (e in b) {
                a.style[e] = d[e]
            }
        }
    }), f.curCSS = f.css, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {
            get: function (a, c, d) {
                var e;
                if (c) {
                    if (a.offsetWidth !== 0) {
                        return bC(a, b, d)
                    }
                    f.swap(a, bw, function () {
                        e = bC(a, b, d)
                    });
                    return e
                }
            }, set: function (a, b) {
                if (!bt.test(b)) {
                    return b
                }
                b = parseFloat(b);
                if (b >= 0) {
                    return b + "px"
                }
            }
        }
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function (a, b) {
            return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        }, set: function (a, b) {
            var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) {
                    return
                }
            }
            c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e
        }
    }), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function (a, b) {
                var c;
                f.swap(a, {display: "inline-block"}, function () {
                    b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight
                });
                return c
            }
        })
    }), c.defaultView && c.defaultView.getComputedStyle && (bA = function (a, b) {
        var c, d, e;
        b = b.replace(bs, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b)));
        return c
    }), c.documentElement.currentStyle && (bB = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        f === null && g && (e = g[b]) && (f = e), !bt.test(f) && bu.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }), bz = bA || bB, f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function (a) {
        return !f.expr.filters.hidden(a)
    });
    var bD = /%20/g, bE = /\[\]$/, bF = /\r?\n/g, bG = /#.*$/, bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bK = /^(?:GET|HEAD)$/, bL = /^\/\//,
        bM = /\?/, bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bO = /^(?:select|textarea)/i, bP = /\s+/,
        bQ = /([?&])_=[^&]*/, bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bS = f.fn.load, bT = {}, bU = {},
        bV, bW, bX = ["*/"] + ["*"];
    try {
        bV = e.href
    } catch (bY) {
        bV = c.createElement("a"), bV.href = "", bV = bV.href
    }
    bW = bR.exec(bV.toLowerCase()) || [], f.fn.extend({
        load: function (a, c, d) {
            if (typeof a != "string" && bS) {
                return bS.apply(this, arguments)
            }
            if (!this.length) {
                return this
            }
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            f.ajax({
                url: a, type: h, dataType: "html", data: c, complete: function (a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function (a) {
                        c = a
                    }), i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)), d && i.each(d, [c, b, a])
                }
            });
            return this
        }, serialize: function () {
            return f.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type))
            }).map(function (a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                    return {name: b.name, value: a.replace(bF, "\r\n")}
                }) : {name: b.name, value: c.replace(bF, "\r\n")}
            }).get()
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({type: c, url: a, data: d, success: e, dataType: g})
        }
    }), f.extend({
        getScript: function (a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function (a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function (a, b) {
            b ? b_(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b_(a, b);
            return a
        },
        ajaxSettings: {
            url: bV,
            isLocal: bJ.test(bW[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bX
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText"},
            converters: {"* text": a.String, "text html": !0, "text json": f.parseJSON, "text xml": f.parseXML},
            flatOptions: {context: !0, url: !0}
        },
        ajaxPrefilter: bZ(bT),
        ajaxTransport: bZ(bU),
        ajax: function (a, c) {
            function w(a, c, l, m) {
                if (s !== 2) {
                    s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                    var o, r, u, w = c, x = l ? cb(d, v, l) : b, y, z;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (d.ifModified) {
                            if (y = v.getResponseHeader("Last-Modified")) {
                                f.lastModified[k] = y
                            }
                            if (z = v.getResponseHeader("Etag")) {
                                f.etag[k] = z
                            }
                        }
                        if (a === 304) {
                            w = "notmodified", o = !0
                        } else {
                            try {
                                r = cc(d, x), w = "success", o = !0
                            } catch (A) {
                                w = "parsererror", u = A
                            }
                        }
                    } else {
                        u = w;
                        if (!w || a) {
                            w = "error", a < 0 && (a = 0)
                        }
                    }
                    v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
                }
            }

            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c), e = d.context || d,
                g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(),
                i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u,
                v = {
                    readyState: 0, setRequestHeader: function (a, b) {
                        if (!s) {
                            var c = a.toLowerCase();
                            a = m[c] = m[c] || a, l[a] = b
                        }
                        return this
                    }, getAllResponseHeaders: function () {
                        return s === 2 ? n : null
                    }, getResponseHeader: function (a) {
                        var c;
                        if (s === 2) {
                            if (!o) {
                                o = {};
                                while (c = bH.exec(n)) {
                                    o[c[1].toLowerCase()] = c[2]
                                }
                            }
                            c = o[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    }, overrideMimeType: function (a) {
                        s || (d.mimeType = a);
                        return this
                    }, abort: function (a) {
                        a = a || "abort", p && p.abort(a), w(0, a);
                        return this
                    }
                };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
                if (a) {
                    var b;
                    if (s < 2) {
                        for (b in a) {
                            j[b] = [j[b], a[b]]
                        }
                    } else {
                        b = a[v.status], v.then(b, b)
                    }
                }
                return this
            }, d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP), d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), b$(bT, d, c, v);
            if (s === 2) {
                return !1
            }
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bK.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(), y = d.url.replace(bQ, "$1_=" + x);
                    d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "")
                }
            }
            (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) {
                v.setRequestHeader(u, d.headers[u])
            }
            if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                v.abort();
                return !1
            }
            for (u in {success: 1, error: 1, complete: 1}) {
                v[u](d[u])
            }
            p = b$(bU, d, c, v);
            if (!p) {
                w(-1, "No Transport")
            } else {
                v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                    v.abort("timeout")
                }, d.timeout));
                try {
                    s = 1, p.send(l, w)
                } catch (z) {
                    if (s < 2) {
                        w(-1, z)
                    } else {
                        throw z
                    }
                }
            }
            return v
        },
        param: function (a, c) {
            var d = [], e = function (a, b) {
                b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) {
                f.each(a, function () {
                    e(this.name, this.value)
                })
            } else {
                for (var g in a) {
                    ca(g, a[g], c, e)
                }
            }
            return d.join("&").replace(bD, "+")
        }
    }), f.extend({active: 0, lastModified: {}, etag: {}});
    var cd = f.now(), ce = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            return f.expando + "_" + cd++
        }
    }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h],
                j = b.url, k = b.data, l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(ce, l), b.url === j && (e && (k = k.replace(ce, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a]
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function () {
                g || f.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return "script"
        }
    }), f.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /javascript|ecmascript/},
        converters: {
            "text script": function (a) {
                f.globalEval(a);
                return a
            }
        }
    }), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function (f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) {
                            d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                        }
                    }, e.insertBefore(d, e.firstChild)
                }, abort: function () {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var cf = a.ActiveXObject ? function () {
        for (var a in ch) {
            ch[a](0, 1)
        }
    } : !1, cg = 0, ch;
    f.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return !this.isLocal && ci() || cj()
    } : ci, function (a) {
        f.extend(f.support, {ajax: !!a, cors: !!a && "withCredentials" in a})
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function (e, g) {
                    var h = c.xhr(), i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields) {
                        for (j in c.xhrFields) {
                            h[j] = c.xhrFields[j]
                        }
                    }
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e) {
                            h.setRequestHeader(j, e[j])
                        }
                    } catch (k) {
                    }
                    h.send(c.hasContent && c.data || null), d = function (a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, cf && delete ch[i]);
                                if (e) {
                                    h.readyState !== 4 && h.abort()
                                } else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
                                    try {
                                        k = h.statusText
                                    } catch (o) {
                                        k = ""
                                    }
                                    !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                }
                            }
                        } catch (p) {
                            e || g(-1, p)
                        }
                        m && g(j, k, m, l)
                    }, !c.async || h.readyState === 4 ? d() : (i = ++cg, cf && (ch || (ch = {}, f(a).unload(cf)), ch[i] = d), h.onreadystatechange = d)
                }, abort: function () {
                    d && d(0, 1)
                }
            }
        }
    });
    var ck = {}, cl, cm, cn = /^(?:toggle|show|hide)$/, co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, cp,
        cq = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]],
        cr;
    f.fn.extend({
        show: function (a, b, c) {
            var d, e;
            if (a || a === 0) {
                return this.animate(cu("show", 3), a, b, c)
            }
            for (var g = 0, h = this.length; g < h; g++) {
                d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)))
            }
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") {
                        d.style.display = f._data(d, "olddisplay") || ""
                    }
                }
            }
            return this
        }, hide: function (a, b, c) {
            if (a || a === 0) {
                return this.animate(cu("hide", 3), a, b, c)
            }
            var d, e, g = 0, h = this.length;
            for (; g < h; g++) {
                d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e))
            }
            for (g = 0; g < h; g++) {
                this[g].style && (this[g].style.display = "none")
            }
            return this
        }, _toggle: f.fn.toggle, toggle: function (a, b, c) {
            var d = typeof a == "boolean";
            f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(cu("toggle", 3), a, b, c);
            return this
        }, fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        }, animate: function (a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m,
                    n, o;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) {
                        return b.complete.call(this)
                    }
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) {
                    j = new f.fx(this, b, i), h = a[i], cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = co.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""))
                }
                return !0
            }

            var e = f.speed(b, c, d);
            if (f.isEmptyObject(a)) {
                return this.each(e.complete, [!1])
            }
            a = f.extend({}, a);
            return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
        }, stop: function (a, c, d) {
            typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
            return this.each(function () {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d)
                }

                var b, c = !1, e = f.timers, g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null) {
                    for (b in g) {
                        g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b)
                    }
                } else {
                    g[b = a + ".run"] && g[b].stop && h(this, g, b)
                }
                for (b = e.length; b--;) {
                    e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1))
                }
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }), f.each({
        slideDown: cu("show", 1),
        slideUp: cu("hide", 1),
        slideToggle: cu("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({
        speed: function (a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) {
                d.queue = "fx"
            }
            d.old = d.complete, d.complete = function (a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            };
            return d
        }, easing: {
            linear: function (a, b, c, d) {
                return c + d * a
            }, swing: function (a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + 0.5) * d + c
            }
        }, timers: [], fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), f.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
        }, cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop]
            }
            var a, b = f.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
        }, custom: function (a, c, d) {
            function h(a) {
                return e.step(a)
            }

            var e = this, g = f.fx;
            this.startTime = cr || cs(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
                e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
            }, h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval))
        }, show: function () {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
        }, hide: function () {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        }, step: function (a) {
            var b, c, d, e = cr || cs(), g = !0, h = this.elem, i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) {
                    i.animatedProperties[b] !== !0 && (g = !1)
                }
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show) {
                        for (b in i.animatedProperties) {
                            f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0)
                        }
                    }
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
            return !0
        }
    }, f.extend(f.fx, {
        tick: function () {
            var a, b = f.timers, c = 0;
            for (; c < b.length; c++) {
                a = b[c], !a() && b[c] === a && b.splice(c--, 1)
            }
            b.length || f.fx.stop()
        }, interval: 13, stop: function () {
            clearInterval(cp), cp = null
        }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (a) {
                f.style(a.elem, "opacity", a.now)
            }, _default: function (a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), f.each(["width", "height"], function (a, b) {
        f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        }
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers, function (b) {
            return a === b.elem
        }).length
    });
    var cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? f.fn.offset = function (a) {
        var b = this[0], c;
        if (a) {
            return this.each(function (b) {
                f.offset.setOffset(this, a, b)
            })
        }
        if (!b || !b.ownerDocument) {
            return null
        }
        if (b === b.ownerDocument.body) {
            return f.offset.bodyOffset(b)
        }
        try {
            c = b.getBoundingClientRect()
        } catch (d) {
        }
        var e = b.ownerDocument, g = e.documentElement;
        if (!c || !f.contains(g, b)) {
            return c ? {top: c.top, left: c.left} : {top: 0, left: 0}
        }
        var h = e.body, i = cy(e), j = g.clientTop || h.clientTop || 0, k = g.clientLeft || h.clientLeft || 0,
            l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop,
            m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft, n = c.top + l - j,
            o = c.left + m - k;
        return {top: n, left: o}
    } : f.fn.offset = function (a) {
        var b = this[0];
        if (a) {
            return this.each(function (b) {
                f.offset.setOffset(this, a, b)
            })
        }
        if (!b || !b.ownerDocument) {
            return null
        }
        if (b === b.ownerDocument.body) {
            return f.offset.bodyOffset(b)
        }
        var c, d = b.offsetParent, e = b, g = b.ownerDocument, h = g.documentElement, i = g.body, j = g.defaultView,
            k = j ? j.getComputedStyle(b, null) : b.currentStyle, l = b.offsetTop, m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (f.support.fixedPosition && k.position === "fixed") {
                break
            }
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
        }
        if (k.position === "relative" || k.position === "static") {
            l += i.offsetTop, m += i.offsetLeft
        }
        f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft));
        return {top: l, left: m}
    }, f.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop, c = a.offsetLeft;
            f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
            return {top: b, left: c}
        }, setOffset: function (a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"),
                j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
        }
    }, f.fn.extend({
        position: function () {
            if (!this[0]) {
                return null
            }
            var a = this[0], b = this.offsetParent(), c = this.offset(),
                d = cx.test(b[0].nodeName) ? {top: 0, left: 0} : b.offset();
            c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
            return {top: c.top - d.top, left: c.left - d.left}
        }, offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") {
                    a = a.offsetParent
                }
                return a
            })
        }
    }), f.each(["Left", "Top"], function (a, c) {
        var d = "scroll" + c;
        f.fn[d] = function (c) {
            var e, g;
            if (c === b) {
                e = this[0];
                if (!e) {
                    return null
                }
                g = cy(e);
                return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]
            }
            return this.each(function () {
                g = cy(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
            })
        }
    }), f.each(["Height", "Width"], function (a, c) {
        var d = c.toLowerCase();
        f.fn["inner" + c] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
        }, f.fn["outer" + c] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
        }, f.fn[d] = function (a) {
            var e = this[0];
            if (!e) {
                return a == null ? null : this
            }
            if (f.isFunction(a)) {
                return this.each(function (b) {
                    var c = f(this);
                    c[d](a.call(this, b, c[d]()))
                })
            }
            if (f.isWindow(e)) {
                var g = e.document.documentElement["client" + c], h = e.document.body;
                return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
            }
            if (e.nodeType === 9) {
                return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c])
            }
            if (a === b) {
                var i = f.css(e, d), j = parseFloat(i);
                return f.isNumeric(j) ? j : i
            }
            return this.css(d, typeof a == "string" ? a : a + "px")
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f
    })
})(window);
(function (d) {
    var a = "channel=chunlei&clienttype=0&web=1";
    var c = function () {
        a += "&logid=" + f();
        d(document).ajaxSend(function (j, k, h) {
            if ("script" === h.dataType) {
                return
            }
            var g = h.url || "";
            if (/\?/.test(g)) {
                if (g.indexOf(a) === -1) {
                    g = g + "&" + a
                }
            } else {
                g = g + "?" + a
            }
            h.url = g
        })
    };
    var f = function () {
        var j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~ï¼@#ï¿¥%â€¦â€¦&";
        var q = String.fromCharCode;
        var k = function (s) {
            if (s.length < 2) {
                var r = s.charCodeAt(0);
                return r < 128 ? s : r < 2048 ? (q(192 | (r >>> 6)) + q(128 | (r & 63))) : (q(224 | ((r >>> 12) & 15)) + q(128 | ((r >>> 6) & 63)) + q(128 | (r & 63)))
            } else {
                var r = 65536 + (s.charCodeAt(0) - 55296) * 1024 + (s.charCodeAt(1) - 56320);
                return (q(240 | ((r >>> 18) & 7)) + q(128 | ((r >>> 12) & 63)) + q(128 | ((r >>> 6) & 63)) + q(128 | (r & 63)))
            }
        };
        var l = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
        var p = function (r) {
            return (r + "" + Math.random()).replace(l, k)
        };
        var h = function (u) {
            var t = [0, 2, 1][u.length % 3];
            var r = u.charCodeAt(0) << 16 | ((u.length > 1 ? u.charCodeAt(1) : 0) << 8) | ((u.length > 2 ? u.charCodeAt(2) : 0));
            var s = [j.charAt(r >>> 18), j.charAt((r >>> 12) & 63), t >= 2 ? "=" : j.charAt((r >>> 6) & 63), t >= 1 ? "=" : j.charAt(r & 63)];
            return s.join("")
        };
        var o = function (r) {
            return r.replace(/[\s\S]{1,3}/g, h)
        };
        var g = function (r) {
            return o(p(new Date().getTime()))
        };
        var m = function (r, s) {
            return !s ? g(String(r)) : g(String(r)).replace(/[+\/]/g, function (t) {
                return t === "+" ? "-" : "_"
            }).replace(/=/g, "")
        };
        var n = function () {
            var r;
            var s = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (r = document.cookie.match(s)) {
                return unescape(r[2])
            } else {
                return null
            }
        };
        return m(n("BAIDUID"))
    };
    c()
})(jQuery);
baidu.dom.ready(function () {
    var a = {iData: false};

    function c() {
        var m = navigator.appVersion.split("MSIE");
        var n = parseFloat(m[1]);
        if ((n >= 5.5) && (document.body.filters)) {
            for (var h = 0; h < document.images.length; h++) {
                var k = document.images[h];
                var p = k.src.toUpperCase();
                if (p.substring(p.length - 3, p.length) == "PNG") {
                    var l = (k.id) ? "id='" + k.id + "' " : "";
                    var q = (k.className) ? "class='" + k.className + "' " : "";
                    var g = (k.title) ? "title='" + k.title + "' " : "title='" + k.alt + "' ";
                    var o = "display:inline-block;" + k.style.cssText;
                    if (k.align == "left") {
                        o = "float:left;" + o
                    }
                    if (k.align == "right") {
                        o = "float:right;" + o
                    }
                    if (k.parentElement.href) {
                        o = "cursor:hand;" + o
                    }
                    var f = "<span " + l + q + g + ' style="float:left; width:' + k.width + "px; height:" + k.height + "px;" + o + ";filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + k.src + "', sizingMethod='scale');\"></span>";
                    k.outerHTML = f;
                    h = h - 1
                }
            }
        }
    }

    $.ajax({
        url: "https://pan.baidu.com/disk/cmsdata?do=client&t=" + new Date().getTime(),
        type: "GET",
        timeout: 10 * 1000,
        success: function (g, f) {
            var o = null;
            try {
                o = $.parseJSON(g)
            } catch (h) {
            }
            if (o != null && o.errorno == 0) {
                if (o.android) {
                    var l = o.android;
                    DOWNLOAD_DES[0] = ["å¤§å°ï¼š" + l.size, "ç‰ˆæœ¬ï¼š" + l.version, "é€‚åº”ç³»ç»Ÿï¼š" + l.system, "æ›´æ–°æ—¶é—´ï¼š" + l.publish.split(" ")[0]];
                    DOWNLOAD_URL_LOGIN[0] = "http://bcscdn.baidu.com/netdisk/BaiduYun_" + l.version.match(/V(.+$)/)[1] + ".apk"
                }
                if (o.iphone) {
                    var j = a.iData = o.iphone;
                    DOWNLOAD_DES[1] = ["å¤§å°ï¼š" + j.size, "ç‰ˆæœ¬ï¼š" + j.version, "é€‚åº”ç³»ç»Ÿï¼š" + j.system, "æ›´æ–°æ—¶é—´ï¼š" + j.publish.split(" ")[0]]
                }
                if (o.ipad) {
                    var k = o.ipad;
                    DOWNLOAD_DES[2] = ["å¤§å°ï¼š" + k.size, "ç‰ˆæœ¬ï¼š" + k.version, "é€‚åº”ç³»ç»Ÿï¼š" + k.system, "æ›´æ–°æ—¶é—´ï¼š" + k.publish.split(" ")[0]]
                }
                if (o.winphone) {
                    var n = o.winphone;
                    DOWNLOAD_DES[3] = ["å¤§å°ï¼š" + n.size, "ç‰ˆæœ¬ï¼š" + n.version, "é€‚åº”ç³»ç»Ÿï¼š" + n.system, "æ›´æ–°æ—¶é—´ï¼š" + n.publish.split(" ")[0]]
                }
                if (o.windows) {
                    var m = o.windows;
                    DOWNLOAD_DES[4] = ["å¤§å°ï¼š" + m.size, "ç‰ˆæœ¬ï¼š" + m.version.match(/V(.+$)/)[0], "é€‚åº”ç³»ç»Ÿï¼š" + m.system, "æ›´æ–°æ—¶é—´ï¼š" + m.publish.split(" ")[0]];
                    DOWNLOAD_URL_LOGIN[4] = "http://bcscdn.baidu.com/netdisk/BaiduYun_" + m.version.match(/V(.+$)/)[1] + ".exe"
                }
            }
            d()
        },
        error: function () {
            d()
        }
    });
    var d = function () {
        baidu.array.each(baidu.dom.query("#download-ul div"), function (g, f) {
            var j = baidu.dom.getAttr(g, "id");
            if (DOWNLOAD_URL_LOGIN[f] != "") {
                baidu.dom.setAttr(baidu.dom.query("#" + j + " a")[0], "href", DOWNLOAD_URL_LOGIN[f]);
                var h = f;
                baidu.array.each(baidu.dom.query("#" + j + " p"), function (l, k) {
                    l.innerHTML = DOWNLOAD_DES[f][k]
                })
            } else {
                baidu.dom.query("#" + j + " p")[0].innerHTML = DOWNLOAD_DES[f][0]
            }
        })
    };
    baidu.array.each(baidu.dom.q("baohe-li"), function (h, g) {
        var f = baidu.dom.children(h);
        baidu.dom.setAttr(f[0], "src", CO_APK[g].src);
        baidu.dom.setStyle(f[0], "width", CO_APK[g].width);
        baidu.dom.setStyle(f[0], "height", CO_APK[g].width);
        f[1].innerHTML = CO_APK[g].title;
        f[2].innerHTML = CO_APK[g].desc;
        baidu.dom.setAttr(f[3], "class", "star" + CO_APK[g].level);
        if (CO_APK[g].url != "") {
            f[4].href = CO_APK[g].url
        }
    });
    if (baidu.dom.g("signout") != null) {
        baidu.event.on("signout", "click", function (f) {
            var g = location.protocol + "//" + location.host + "/";
            window.location.href = "https://passport.baidu.com/?logout&u=" + g
        })
    }
    c();
    $("#download-ul a").mousedown(function () {
        var f = "", g = "infocenter";
        if ($(this).hasClass("clint-pc")) {
            f = "win"
        } else {
            if ($(this).hasClass("clint-android")) {
                f = "android"
            } else {
                if ($(this).hasClass("clint-ios")) {
                    f = "iphone"
                } else {
                    if ($(this).hasClass("clint-ipad")) {
                        f = "ipad"
                    } else {
                        if ($(this).hasClass("clint-winphone")) {
                            f = "winphone"
                        }
                    }
                }
            }
        }
        setTimeout(function () {
            var h = new Image();
            h.src = "/api/analytics?_lsix=1&page=1&clienttype=0&type=downloadclient&ttype=" + f + "&pos=" + g
        }, 500);
        return true
    })
});

function getRequest(a) {
    baidu.ajax.get("/api/analytics?index=" + a + "&type=downloadclient&t=" + (new Date().getTime()))
}

$(window).ready(function () {
    var a = {
        imgLog: function (h, k) {
            for (var j in k) {
                h += (h.match(/\?/) ? "&" : "?") + encodeURIComponent(j) + "=" + encodeURIComponent("" + k[j])
            }
            h += (h.match(/\?/) ? "&" : "?") + "t=" + (+new Date());
            var g = new Image();
            g.onload = function () {
            };
            g.src = h
        }, whatPage: function (l) {
            var j = l.txt.split("$");
            var k = l.url.split("$");
            if (j.length === 1 && k.length === 1) {
                return l
            }
            var g = /^https?\:\/\/(pan|yun)\.baidu\.com\/?(\#.*)?$/;
            var h = /^https?\:\/\/(pan|yun)\.baidu\.com\/(s\/[A-Za-z0-9]{6,16}|share\/.*uk\=\d{6,12}.*)(\#.*)?$/;
            var m = {};
            if (g.test(location.href)) {
                m.txt = j[1];
                m.url = k[1]
            }
            return m
        }
    };
    var c = {
        adExist: {
            adtxt: function (g) {
                txtElem = document.getElementById("top_menu_other");
                if (!txtElem) {
                    return
                }
                var h = a.whatPage(g);
                txtElem.href = h.url || txtElem.href;
                txtElem.innerHTML = h.txt || txtElem.innerHTML
            }, adimg: function (g) {
                imgElemWrap = document.getElementById("share_aside");
                if (!imgElemWrap) {
                    return
                }
                imgElem = document.createElement("a");
                imgElem.className = "ad-img-wrap";
                imgElem.hidefocus = "true";
                imgElemWrap.appendChild(imgElem);
                imgElem.style.cssText = "background:url(%src%) center center no-repeat; display:block;".replace(/%src%/, g.src);
                imgElem.href = g.url
            }
        }, adNotUse: {
            adtxt: function (h) {
                txtElem = document.getElementById("top_menu_other");
                if (!txtElem) {
                    return
                }
                txtElem.style.display = "none";
                var g = document.getElementById("departForAd");
                g && (g.style.display = "none")
            }
        }
    };
    var d = function () {
        var k = document.getElementById("top_menu_other"), g = document.getElementById("share_aside"), h = +!!g + "";
        h = h + (+!!k);
        h = parseInt(h, 2);
        var j = j || {};
        j.api = j.api || {};
        j.api.RestAPI = j.api.RestAPI || {};
        j.api.RestAPI.CMS_DATA_SIMPLE = j.api.RestAPI.CMS_DATA_SIMPLE || "/disk/cmsdata";
        $.get("https://pan.baidu.com" + j.api.RestAPI.CMS_DATA_SIMPLE + "?do=piece&ad=" + h + "&t=" + (+new Date()), {}, function (o) {
            var q, n, m;
            try {
                q = $.parseJSON(o)
            } catch (p) {
            }
            if (q != null && q.errorno == 0) {
                for (var l in q.content) {
                    if (!!+q.content[l].used) {
                        c.adExist[l] && c.adExist[l](q.content[l])
                    } else {
                        c.adNotUse[l] && c.adNotUse[l](q.content[l])
                    }
                }
            }
        });
        k.onclick = function () {
            var l = {type: "adtxtclick", clienttype: "0", currentUrl: window.location.href};
            window.FileUtils && FileUtils._mDiskLog.send(l);
            !window.FileUtils && a.imgLog("//pan.baidu.com/api/analytics", l)
        };
        f()
    };
    var f = function () {
        var g = $(".img-content").children();
        var h = h || {};
        h.api = h.api || {};
        h.api.RestAPI = h.api.RestAPI || {};
        h.api.RestAPI.CMS_DATA_SIMPLE = h.api.RestAPI.CMS_DATA_SIMPLE || "/disk/cmsdata";
        $.get(h.api.RestAPI.CMS_DATA_SIMPLE + "?do=manual&ch=pan_focuspic&t=" + (+new Date()), {}, function (k) {
            var m;
            try {
                m = $.parseJSON(k)
            } catch (l) {
            }
            if (m != null && m.errorno == 0) {
                for (var j in m.content) {
                    if ($(".img-content").children().length && m.content[j].imgid === "focus" && !!+m.content[j].used) {
                        g[j].children[0].src = m.content[j].src
                    } else {
                        if (m.content[j].imgid === "logo" && !!+m.content[j].used) {
                            $(".yun-logo").css("background", "url('" + m.content[j].src + "')")
                        }
                    }
                }
            }
        })
    };
    d()
});
!function (a) {
    var c = {strength: 25, scale: 1.05, animationSpeed: "500ms", contain: true, wrapContent: false};
    a.fn.interactiveBg = function (d) {
        return this.each(function () {
            var m = a.extend({}, c, d);
            var l = a(this);
            var k = l.outerHeight();
            var g = l.outerWidth();
            var j = m.strength / k;
            var f = m.strength / g;
            l.mousemove(function (p) {
                if (!l.hasClass("ibg-entering") && !l.hasClass("exiting")) {
                    var n = p.pageX || p.clientX;
                    var h = p.pageY || p.clientY;
                    var n = (n - l.offset().left) - (g / 2);
                    var h = (h - l.offset().top) - (k / 2);
                    var q = ((f * n)) * -1;
                    var o = ((j * h)) * -1;
                    l.find("> .ibg-bg").css({
                        "-webkit-transform": "matrix(" + m.scale + ",0,0," + m.scale + "," + q + "," + o + ")",
                        "-moz-transform": "matrix(" + m.scale + ",0,0," + m.scale + "," + q + "," + o + ")",
                        "-o-transform": "matrix(" + m.scale + ",0,0," + m.scale + "," + q + "," + o + ")",
                        transform: "matrix(" + m.scale + ",0,0," + m.scale + "," + q + "," + o + ")",
                        "-webkit-transition": "-webkit-transform " + m.animationSpeed + " linear",
                        "-moz-transition": "-moz-transform " + m.animationSpeed + " linear",
                        "-o-transition": "-o-transform " + m.animationSpeed + " linear",
                        transition: "all " + m.animationSpeed + " linear"
                    })
                }
            }).mouseleave(function (h) {
                if (m.scale !== 1) {
                    l.addClass("ibg-exiting")
                }
                l.addClass("ibg-exiting").find("> .ibg-bg").css({
                    "-webkit-transform": "matrix(1,0,0,1,0,0)",
                    "-moz-transform": "matrix(1,0,0,1,0,0)",
                    "-o-transform": "matrix(1,0,0,1,0,0)",
                    transform: "matrix(1,0,0,1,0,0)",
                    "-webkit-transition": "-webkit-transform " + m.animationSpeed + " linear",
                    "-moz-transition": "-moz-transform " + m.animationSpeed + " linear",
                    "-o-transition": "-o-transform " + m.animationSpeed + " linear",
                    transition: "all " + m.animationSpeed + " linear"
                }).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    l.removeClass("ibg-exiting")
                })
            })
        })
    }
}(window.jQuery);
(function () {
    var d = null;
    var c = {
        client: function () {
            if (d) {
                return d
            }
            var j = {ie: 0, gecko: 0, webkit: 0, khtml: 0, opera: 0, ver: null};
            var g = {ie: 0, firefox: 0, safari: 0, konq: 0, opera: 0, chrome: 0, ver: null};
            var l = "";
            var h = window.navigator.userAgent;
            if (window.opera) {
                j.ver = window.opera.version();
                j.opera = parseFloat(j.ver);
                l = "opera" + j.opera
            } else {
                if (/AppleWebKit\/(\S+)/.test(h)) {
                    j.ver = RegExp["$1"];
                    j.webkit = parseFloat(j.ver);
                    if (/Chrome\/(\S+)/.test(h)) {
                        g.ver = RegExp["$1"];
                        g.chrome = parseFloat(g.ver);
                        l = "chrome" + g.chrome
                    } else {
                        if (/Version\/(\S)/.test(h)) {
                            g.ver = RegExp["$1"];
                            g.safari = parseFloat(g.ver);
                            l = "safari" + g.safari
                        } else {
                            var k = 1;
                            if (j.webkit < 100) {
                                k = 1
                            } else {
                                if (j.webkit < 312) {
                                    k = 1.2
                                } else {
                                    if (j.webkit < 412) {
                                        k = 1.3
                                    } else {
                                        k = 2
                                    }
                                }
                            }
                            g.safari = g.ver = k;
                            l = "safari" + g.safari
                        }
                    }
                } else {
                    if (/KHTML\/(\S+)/.test(h) || /Konqueror\/(\S+)/.test(h)) {
                        j.ver = RegExp["$1"];
                        j.khtml = parseFloat(j.ver)
                    } else {
                        if (/rv:([^\)]+)[)] Gecko\/\d{8}/.test(h)) {
                            j.ver = RegExp["$1"];
                            j.gecko = parseFloat(j.ver);
                            if (/Firefox\/(\S+)/.test(h)) {
                                g.ver = RegExp["$1"];
                                g.firefox = parseFloat(g.ver);
                                l = "firefox" + g.firefox
                            }
                        } else {
                            if (/MSIE\s([^;]+)/.test(h)) {
                                j.ver = RegExp["$1"];
                                j.ie = parseFloat(j.ver);
                                l = "ie" + j.ie
                            } else {
                                if (/WOW64\;\sTrident\/7.0/i.test(h)) {
                                    j.ver = 11;
                                    j.ie = 11;
                                    l = "ie11"
                                } else {
                                    if (/Edge\/(\d+)/.test(h)) {
                                        j.ver = RegExp["$1"];
                                        j.ie = "edge";
                                        l = "edge"
                                    }
                                }
                            }
                        }
                    }
                }
            }
            g.ie = j.ie;
            g.opera = j.opera;
            d = {engine: j, browser: g, browserString: l};
            return d
        }, setCookie: function (j, m, g, o, l) {
            var n = new Date(), h = "", k = "";
            n.setDate(n.getDate() + g);
            if (l) {
                h = ";domain=" + l
            }
            if (o) {
                k = ";path=" + o
            }
            document.cookie = j + "=" + escape(m) + ((g == null) ? "" : ";expires=" + n.toGMTString()) + k + h
        }
    };
    var f = c.client();
    if (location.protocol === "http:" && f.engine && f.engine.ie != null && (f.browserString === "ie11" || f.browserString === "edge")) {
        var a = function (k, j, h) {
            var g = new Image();
            g.onload = function (l) {
                typeof j === "function" && j.call(null, l)
            };
            g.onerror = function (l) {
                typeof h === "function" && h.call(null, l)
            };
            g.src = k
        };
        a("https://" + location.host + "/yun-static/common/images/default.gif", function (g) {
            c.setCookie("secu", 1, 365, "/");
            new Image().src = "/api/analytics?_lsix=1&page=1&clienttype=0&type=httpsAccess" + f.browserString
        })
    }
})();
(function () {
    var f = 3000;
    var s = 0;
    var q = 0;
    var h = 500;
    var g = 500;
    var a = 0;
    var c = $("#login-container");
    var j = c.find(".all-index-banner").length - 1;
    var t = function (u) {
        c.find(".all-index-banner").addClass("hidden");
        var w = c.find(".ibg-bg").attr("class");
        var v = parseInt(w.match(/\d/ig));
        w = "index-banner-" + v;
        v++;
        if (u > 0 || u === 0) {
            v = u
        }
        if (v > j) {
            v = 0
        }
        c.find(".ibg-bg").removeClass(w);
        c.find(".ibg-bg").addClass("index-banner-" + v);
        $(".focus-content").find("a").removeClass("current").eq(v).addClass("current");
        c.find(".all-index-banner").eq(v).removeClass("hidden")
    };
    var n = function () {
        setTimeout(function () {
            t();
            setTimeout(n, f)
        }, f)
    };
    var p = function (v, x) {
        var w = new RegExp("(?:^|\\?|#|&)" + v + "=([^&#]*)(?:$|&|#)", "i");
        var u = w.exec(x || location.href);
        return u ? u[1] : ""
    };
    var k = function () {
        var v = "frm", u = p(v);
        if (u) {
            if (u == "hao123") {
                $(".yun-logo").css({
                    background: "url('/static/images/new/login-all.gif') -954px 0 no-repeat",
                    width: 120
                }).attr({
                    title: "hao123ä¸Šç½‘å¯¼èˆª",
                    href: "http://hao123.com/",
                    target: "_blank"
                }).next().css({
                    background: "url('/static/images/new/login-all.gif') -1073px 0 no-repeat ",
                    width: 113,
                    "margin-left": 0
                }).attr({
                    title: "ç™¾åº¦ç½‘ç›˜",
                    href: "http://yun.baidu.com/",
                    target: "_blank"
                }).parent().css({width: 250, background: "none", filter: "none"})
            }
        }
    };
    var d = function () {
        var v = p("fr");
        if (v) {
            var u = $(".two-dimension-code");
            if (v === "fengchao") {
                u.addClass("fr_fengchao")
            } else {
                if (v === "wangmeng") {
                    u.addClass("fr_wangmeng")
                }
            }
        }
    };
    $(".focus-content").bind({
        click: function (w) {
            var v = $(w.target);
            if (v.context.tagName.toLowerCase() === "a") {
                w.stopPropagation();
                var u = parseInt(v.attr("idx"), 10);
                t(u)
            }
            return false
        }
    });
    n();
    k();
    d();
    var o = ["http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_5.5.1.exe", "http://issuecdn.baidupcs.com/issue/netdisk/apk/BaiduNetdisk_7.15.1.apk", "http://itunes.apple.com/cn/app/bai-du-wang-pan/id547166701?mt=8", "http://itunes.apple.com/cn/app/bai-du-yun-hd/id554602005?mt=8", "http://www.windowsphone.com/zh-cn/store/app/%E7%99%BE%E5%BA%A6%E4%BA%91/59bf5640-85ae-4a6e-84f1-a61c074e667c", "http://issuecdn.baidupcs.com/issue/netdisk/MACguanjia/BaiduNetdisk_mac_2.0.1.dmg"];
    $.ajax({
        url: "https://pan.baidu.com/disk/cmsdata?do=client&t=" + new Date().getTime(),
        type: "GET",
        timeout: 10 * 1000,
        success: function (y, B) {
            var v = null;
            try {
                v = $.parseJSON(y)
            } catch (A) {
            }
            if (v != null && v.errorno == 0) {
                if (v.android) {
                    var x = v.android;
                    var u = p("fr");
                    if (x && x.url) {
                        o[1] = x.url
                    }
                }
                if (v.windows) {
                    var z = v.guanjia;
                    if (z && z.url) {
                        o[0] = z.url
                    }
                }
                if (v.mac) {
                    var w = v.mac;
                    if (w && w.url) {
                        o[5] = w.url
                    }
                }
            }
            r()
        },
        error: function () {
            r()
        }
    });
    var r = function () {
        $("#tab-download a").each(function (v) {
            if (o[v] !== "") {
                $(this).attr("target-href", o[v])
            }
        });
        $(".close, .canvas-bg").on("click", function () {
            $(".canvas-bg").addClass("hidden");
            $(".qrcode-dialog").addClass("hidden");
            if ($(".dialog-content").hasClass("android-qrcode")) {
                $(".dialog-content").removeClass("android-qrcode")
            }
            if ($(".dialog-content").hasClass("iphone-qrcode")) {
                $(".dialog-content").removeClass("iphone-qrcode")
            }
        });
        $(".download-open, .iphone-target").on("click", function () {
            var v = $(this).attr("target-href");
            window.open(v)
        });
        $(".download-target, .android-target").on("click", function () {
            var v = $(this).attr("target-href");
            location.href = v
        });
        $(".tab-download").delegate("#android-download", "click", function (v) {
            $(".android-target").attr("target-href", o[1]);
            $(".android-target").removeClass("hidden");
            $(".iphone-target").addClass("hidden");
            $(".dialog-content").addClass("android-qrcode");
            $(".canvas-bg").removeClass("hidden");
            $(".qrcode-dialog").removeClass("hidden")
        }).delegate("#iphone-download", "click", function (v) {
            $(".iphone-target").attr("target-href", o[2]);
            $(".iphone-target").removeClass("hidden");
            $(".android-target").addClass("hidden");
            $(".dialog-content").addClass("iphone-qrcode");
            $(".canvas-bg").removeClass("hidden");
            $(".qrcode-dialog").removeClass("hidden")
        });
        $(".qcode-title").on("click", function () {
            $(this).addClass("active");
            if ($(".account-title").hasClass("active")) {
                $(".account-title").removeClass("active")
            }
            $("#netdisk_pass_login_form").addClass("login-form-hide");
            if ($(".netdisk-qrcode-container").hasClass("hidden")) {
                $(".netdisk-qrcode-container").removeClass("hidden")
            }
            if ($(".login-header-title").length > 0) {
                $(".login-header-title > h3").removeClass("hidden");
                $(".login-header-title > h4").addClass("hidden")
            }
            if ($("#pass-phoenix-list-login").hasClass("special-move")) {
                $("#pass-phoenix-list-login").removeClass("special-move")
            }
        });
        $(".account-title").on("click", function () {
            new Image().src = "/api/analytics?_lsix=1&page=1&clienttype=0&type=pan_switch_account";
            $(this).addClass("active");
            if ($(".qcode-title").hasClass("active")) {
                $(".qcode-title").removeClass("active")
            }
            if ($("#netdisk_pass_login_form").hasClass("login-form-hide")) {
                $("#netdisk_pass_login_form").removeClass("login-form-hide")
            }
            $(".netdisk-qrcode-container").addClass("hidden");
            $("#pass-phoenix-list-login").addClass("special-move");
            if ($(".login-header-title").length > 0) {
                $(".login-header-title > h3").addClass("hidden");
                $(".login-header-title > h4").removeClass("hidden")
            }
        });
        var u = function () {
            var v = /pan_login_way=\d/ig;
            if (document.cookie.match(v)) {
                $(".account-title").addClass("active");
                $("#netdisk_pass_login_form").removeClass("login-form-hide");
                if ($(".login-header-title").length > 0) {
                    $(".qcode-title").removeClass("active");
                    $(".login-header-title > h3").addClass("hidden");
                    $(".login-header-title > h4").removeClass("hidden")
                }
            } else {
                $(".qcode-title").addClass("active");
                $(".netdisk-qrcode-container").removeClass("hidden");
                if ($(".login-header-title").length > 0) {
                    $(".account-title").removeClass("active");
                    $(".login-header-title > h3").removeClass("hidden");
                    $(".login-header-title > h4").addClass("hidden")
                }
            }
        };
        u()
    };
    var m = function () {
        $(".tab-download a").mousedown(function () {
            var u = "", v = "infocenter";
            if ($(this).hasClass("windows")) {
                u = "win"
            } else {
                if ($(this).hasClass("android")) {
                    u = "android"
                } else {
                    if ($(this).hasClass("iphone")) {
                        u = "iphone"
                    } else {
                        if ($(this).hasClass("ipad")) {
                            u = "ipad"
                        } else {
                            if ($(this).hasClass("wphone")) {
                                u = "winphone"
                            }
                        }
                    }
                }
            }
            setTimeout(function () {
                var w = new Image();
                w.src = "/api/analytics?_lsix=1&page=1&clienttype=0&type=downloadclient&ttype=" + u + "&pos=" + v
            }, 500);
            return true
        })
    };
    m();
    var l = function () {
        var u = /BDSFRCVID=([^;]+)/gi;
        if (u.test(document.cookie)) {
            var v = RegExp.$1;
            setTimeout(function () {
                var w = new Image();
                w.src = "/api/analytics?_lsix=1&page=1&clienttype=0&type=alading_src&hash=" + v
            }, 500)
        }
    };
    l()
})();
(function (a, c) {
    a.getScript("https://passport.baidu.com/passApi/js/wrapper.js?cdnversion=" + new Date().getTime(), function () {
        function d(g, f) {
            f.children("li").each(function (h) {
                a(this).click(function (j) {
                    j.preventDefault();
                    f.children("li").children("a").removeClass("on");
                    f.children("li").removeClass("tab-selected");
                    a(this).addClass("tab-selected");
                    a(this).children("a").addClass("on");
                    g.switchTo(["normal", "phone"][h])
                })
            })
        }

        passport.use("login", {tangram: true}, function (f) {
            var h = new f.passport.login({
                product: "netdisk",
                subpro: "netdisk_web",
                staticPage: location.protocol + "//" + location.host + "/res/static/thirdparty/pass_v3_jump.html",
                u: location.protocol + "//" + location.host + "/disk/home" + location.search + location.hash,
                charset: "utf-8",
                overseas: 1,
                memberPass: true,
                hasPlaceholder: true,
                loginMerge: true,
                authsiteLogin: ["tsina", "qzone"],
                authsiteCfgLogin: {act: "implicit"},
                safeFlag: 0
            });
            h.on("loginSuccess", function (k) {
                new Image().src = "/api/analytics?_lsix=1&page=1&clienttype=0&type=pan_login_account_success";
                document.cookie = "pan_login_way=1;max-age=" + 30 * 24 * 60 * 60 * 1000;
                try {
                    top.location.href = "/disk/home" + top.location.search + top.location.hash
                } catch (l) {
                    location.href = "/disk/home" + location.search + location.hash
                }
                if (localStorage) {
                    localStorage.setItem("login-time", +new Date)
                }
            });
            a("#netdisk_pass_login_form").html("");
            h.render("netdisk_pass_login_form");
            d(h, a("#netdisk_pass_login_form").prevAll("ul.login-tab"));
            a(".pass-foreignMobile-msg").html(a(".pass-foreignMobile-msg").find("span").html());
            a(".pass-foreignMobile-link").attr("href", "javascript:;");
            a(".pass-foreignMobile-link-wrapper").on("click", function () {
                a(".login-header-title > h4").html("æµ·å¤–æ‰‹æœºå·ç™»å½•")
            });
            a(".pass-foreignMobile-link").on("click", function () {
                a(".login-header-title > h4").html("å¸å·å¯†ç ç™»å½•")
            });
            var g = /pan_login_way=\d/ig;
            if (document.cookie.match(g)) {
                a("#pass-phoenix-list-login").addClass("special-move");
                var j = new Date();
                j.setTime(j.getTime() - 1);
                document.cookie = "pan_login_way=1;expires=" + j.toGMTString()
            }
        })
    });
    if (typeof indexedDB === "object") {
        indexedDB.deleteDatabase("FileSystem");
        indexedDB.deleteDatabase("ImageSystem")
    }
})(window.jQuery);
(function (a, c) {
    a(window).load(function () {
        a("#login-container").interactiveBg();
        a.getScript("https://passport.baidu.com/passApi/js/wrapper.js?cdnversion=" + new Date().getTime() + "1", function () {
            var f = location.protocol + "//" + location.host + "/disk/home";
            if (!!location.search && location.search.match(/\?/ig).length > 0) {
                f = f + location.search + "&panLoginType=qrcode"
            } else {
                f = f + "?panLoginType=qrcode"
            }
            passport.use("loginWLtoPC", {tangram: false}, function (h) {
                var j = new h.passport.loginWLtoPC({
                    product: "netdisk",
                    sms: false,
                    u: f + location.hash,
                    safeFlag: 0,
                    staticPage: location.protocol + "//" + location.host + "/res/static/thirdparty/pass_v3_jump.html"
                });
                j.render("netdisk_qrcode_login_form");
                a("body").delegate(".tang-pass-qrcode-img", "mouseover", function (k) {
                    a(this).addClass("animate-left");
                    a(".guide-img").addClass("animate-show")
                }).delegate(".tang-pass-qrcode-img", "mouseout", function (k) {
                    a(this).removeClass("animate-left");
                    a(".guide-img").removeClass("animate-show")
                });
                var g = function () {
                    var k = /panlogin_animate_showed/ig;
                    if (!document.cookie.match(k)) {
                        setTimeout(function () {
                            a("body").find(".tang-pass-qrcode-img").trigger("mouseover")
                        }, 1000);
                        setTimeout(function () {
                            a("body").find(".tang-pass-qrcode-img").trigger("mouseout")
                        }, 6000);
                        document.cookie = "panlogin_animate_showed=1;max-age=" + 30 * 24 * 60 * 60 * 1000
                    }
                };
                g()
            })
        });
        var d = function () {
            var f = document.createElement("script");
            f.async = "async";
            f.src = "https://passport.baidu.com/static/passpc-base/js/fld.min.js?cdnversion=1490668072176";
            document.getElementsByTagName("head")[0].appendChild(f)
        };
        d()
    })
})(window.jQuery);