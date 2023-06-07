// Misskeyからのリクエストで実行
function doPost(e) {
    try {

        // POST Bodyの内容を取得 & JSON化
        const data = JSON.parse(e.postData.contents);
        //JSONをコンソール出力
        console.log(data);

        // なんのメッセージか判別してDiscordに送信
        // レスポンス
        return result(switchMessage(data));

    } catch (err) {
        //エラーの場合の処理

        //エラー内容をコンソール出力
        console.log(err);
        //レスポンス
        return result(false);
    }
}

function switchMessage(data) {
    switch (data.type) {

        //サーバー起動時
        case "ServerStart":
            sendDiscord(`サーバーが起動しました`);
            return true;

        //サーバー停止時
        case "ServerStop":
            sendDiscord(`サーバーが停止しました`);
            return true;


        //プレイヤー接続時
        case "PlayerConnect":
            sendDiscord(`${data.username} さんがサーバーに参加しました。`);
            return true;


        //プレイヤー切断時
        case "PlayerDisconnect":
            sendDiscord(`${data.username} さんがサーバーから切断しました。`);
            return true;


        //それ以外
        default:
            return false;
    }
}