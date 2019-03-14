<?php


//ajax送信でPOSTされたデータを受け取る
$post_data_1 = htmlspecialchars($_GET['score'], ENT_QUOTES, "utf-8");
$post_data_2 = htmlspecialchars($_GET['miss'], ENT_QUOTES, "utf-8");
//受け取ったデータを配列に格納
$return_array = array($post_data_1, $post_data_2);
//「$return_array」をjson_encodeして出力
echo json_encode($return_array);
?>