function extFileRead() {
    var imgReader = function (item) {
        var blob = item.getAsFile(),
            reader = new FileReader();
        reader.onload = function (e) {
            var imgSrc = e.target.result;
            layer.confirm('是否要发送该截图?', {icon: 3, title: '发送截图'}, function (index) {
                $.post('/user/lay/im/ext/image/upload', {imageBase64Content: imgSrc}, function (result) {
                    if (result.success) {
                        setTimeout(function () {
                            $('.layim-chat-textarea textarea').val($('.layim-chat-textarea textarea').val() + 'img[' + "http://pay.3vpay.com" + result.msg + ']');
                            $('.layim-send-btn').trigger("click");
                            layer.close(index);
                        }, 5000);
                        layer.msg("截图发送中,请稍等几秒!")
                    } else {
                        alert(result.msg);
                    }
                }, 'json');
                layer.close(index);
            });
        };
        reader.readAsDataURL(blob);
    };

    try {
        $('body').unbind('paste', ".layim-chat-textarea textarea").bind('paste', ".layim-chat-textarea textarea", function (e) {
            var clipboardData = event.clipboardData || window.clipboardData || event.originalEvent.clipboardData;
            var items, item, types;
            if (clipboardData) {
                items = clipboardData.items;
                if (!items) {
                    return;
                }
                item = items[0];
                types = clipboardData.types || [];
                for (var i = 0; i < types.length; i++) {
                    if (types[i] === 'Files') {
                        item = items[i];
                        break;
                    }
                }
                if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
                    imgReader(item);
                }
            }
        });
    } catch (e) {
        console.log(e)
    }
}