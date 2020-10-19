function get(ide) {

    var _get = "type=song&id=" + ide;
    Ajax( //Ajax(type, url, data, success, failed)
        'get',
        'https://api.imjad.cn/cloudmusic/',
        _get,
        function(data) {
            var url, a, filename;
            data = JSON.parse(data);


            var url = data.data[0].url;
            document.getElementById("accompany").src = url;
            play_Pause();

        },
        function(error) {
            document.getElementsByClassName("tool")[0].innerHTML += "<span style=\"color:red\"><b>读取失败</b></span>";
        });

}

function ssss() {
    var search_name = document.getElementsByName("search")[0].value;
    var _search = "keyword=" + search_name;

    Ajax(
        'get',
        'https://v1.alapi.cn/api/music/search',
        _search,
        function(data) {
            var sdata, music_id;
            sdata = JSON.parse(data);
            var music_id = sdata.data.songs[0].id;
            get(music_id);

        }

    );
}

function Ajax(type, url, data, success, failed) {
    // 创建ajax对象
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    var type = type.toUpperCase();
    // 用于清除缓存
    var random = Math.random();

    if (typeof data == 'object') {
        var str = '';
        for (var key in data) {
            str += key + '=' + data[key] + '&';
        }
        data = str.replace(/&$/, '');
    }

    if (type == 'GET') {
        if (data) {
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + random, true);
        }
        xhr.send();

    } else if (type == 'POST') {
        xhr.open('POST', url, true);
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    // 处理返回数据
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                success(xhr.responseText);
            } else {
                if (failed) {
                    failed(xhr.status);
                }
            }
        }
    }
}