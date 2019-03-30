<?php

//mysql接続
$username = 'root';
$password = '';

// PDO のインスタンスを生成して、MySQLサーバに接続
$database = new PDO('mysql:host=localhost;dbname=typegame;charset=UTF8;', $username, $password);
