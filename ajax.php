<?php

//ajax送信でPOSTされたデータを受け取る
$user = $_POST['user'];
$score = $_POST['score'];
$rateAccuracy = $_POST['rateAccuracy'];

//database呼び出し
require_once('database.php');

//ajax送信でPOSTされたデータ(が確実にあれば)をMySQLに格納する。
if ($score && $rateAccuracy && $user ) {
    // 実行するSQLを作成
    $sql_input = 'INSERT INTO typegame.users (user, score, accuracy) VALUES(:user, :score, :accuracy)';
    // ユーザ入力に依存するSQLを実行するので、セキュリティ対策をする
    $statement_input = $database->prepare($sql_input);
    // scoreとrateAccuracyをVALUES(?)の?の部分に代入する
    $statement_input->bindParam(':user', $user);
    $statement_input->bindParam(':score', $score);
    $statement_input->bindParam(':accuracy', $rateAccuracy);
    // SQL文を実行する
    $statement_input->execute();
    // ステートメントを破棄
    $statement_input = null;
    }

//score順に並べる
$sql_desc = 'SELECT * FROM typegame.users ORDER BY score DESC';
//SQL文実行
$statement_desc = $database->query($sql_desc);
//ステートメント破棄
$statement_desc = null;

//10番までのスコアをためる
$sql_record_count = 'SELECT COUNT(*) FROM typegame.users WHERE score';
$statement_count = $database->query($sql_record_count);
$count = $statement_count->fetchColumn();

if ($count > 10) {
    //11番目のレコードを削除する
    $sql_delete = 'DELETE FROM typegame.users ORDER BY score LIMIT 1';
     $statement_delete = $database->query($sql_delete);
    //ステートメント破棄
    $statement_delete = null;
    }

//ステートメント破棄
$statement_count = null;
$count = 0;

//MySQLを使った処理が終わると、接続は不要なので切断する
$database = null;




