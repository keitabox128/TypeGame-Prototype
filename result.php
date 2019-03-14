<?php

//ajax送信でPOSTされたデータを受け取る
$post_data_1 = $_POST['post_data_1'];
$post_data_2 = $_POST['post_data_2'];
//受け取ったデータを配列に格納
$return_array = array($post_data_1, $post_data_2);
//「$return_array」をjson_encodeして出力

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" type="text/css" href="css.css">
    <meta charset="UTF-8">

    <meta http-equiv="x-ua-compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <title>TypeGame</title>


    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
<div class="body">
    <h1>GAME OVER</h1>
    <p class="info"><? echo json_encode($return_array); ?></p>


    <a id = "restart" href="index.html">スタートに戻る</a>

    <script type="text/javascript" src="typeGame.js"></script>
</div>

</body>
</html>
