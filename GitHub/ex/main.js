window.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById('button');
    // ボタン押下時の処理
    button.addEventListener("click", function () {
        // document.location.reload()
        //htmlのul要素（id = 'messages'）を呼び出し
        var messageList = $('#messages');

        //openweathermap（天気予報API）に接続
        var request = new XMLHttpRequest();
        var cityName = document.getElementById("keyword");
        var keyword = cityName.value
        var owmApiKey = "2c4ebbe0bcd9dbfaafd6f17a37d27b2d&lang=ja&units=metric";
        var owmURL = "http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(keyword) + "&APPID=" + owmApiKey + "";
        // 呼び出した後に script タグを削除
        $('il').remove()

        // script タグを生成
        var script = document.createElement('script');
        // src にFlickr API のURL を指定
        // キーワードをURL エンコードしてtags パラメーターに指定
        script.src =
            "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="
            + encodeURIComponent(keyword);
        // Flickr API の呼び出し
        document.body.appendChild(script);
        // 呼び出した後に script タグを削除
        document.body.removeChild(script);

        request.open('GET', owmURL, true);
        //結果をjson型で受け取る
        request.responseType = 'json';

        request.onload = function () {
            var data = this.response;
            console.log(data);
            if(data["weather"][0]["icon"] == "02d"){
                var weatherName = "晴れ";
             }else if(data["weather"][0]["icon"] == "01d"){
                var weatherName = "快晴";
             }else if(data["weather"][0]["icon"] == "03d" || data["weather"][0]["icon"] == "04d"){
                var weatherName = "曇り";
             }else if(data["weather"][0]["icon"] == "09d"){
                var weatherName = "小雨";
             }else if(data["weather"][0]["icon"] == "10d"){
                var weatherName = "雨";
             }else if(data["weather"][0]["icon"] == "11d"){
                var weatherName = "雷雨";
             }else if(data["weather"][0]["icon"] == "13d"){
                var weatherName = "雪";
             }else if(data["weather"][0]["icon"] == "50d"){
                var weatherName = "霧";
             }
             var messageElement = $("<il><p class='weather'>"+ keyword + "の現在の天気は" + weatherName　+ "です。</p></il>");
            //HTMLに取得したデータを追加する
            messageList.append(messageElement);


        };
        request.send();
    });
});

// JSON データを受け取る関数
function jsonFlickrFeed(data) {
    // 結果表示領域をクリア
    var photo_list = document.getElementById("photo_list");
    photo_list.innerHTML = "";
    // items キーで検索結果を取得
    for (i = 0; i < 1; i++) {
        // 検索結果内の画像情報を取得
        var item = data.items[i];
        // img 要素を生成
        var img = document.createElement("img");
        // img 要素の src に検索結果の画像の URL を指定
        img.src = item.media.m;
        photo_list.appendChild(img);
    }
}