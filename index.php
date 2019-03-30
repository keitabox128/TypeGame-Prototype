<?php
//ランキング表示呼び出し
require_once('database.php');

//score高い順に表示
$sql = 'SELECT * FROM typegame.users ORDER BY score DESC';
//SQL実行
$statement = $database->query($sql);
//結果を配列に変換する
$ranking = $statement->fetchAll();
//ステートメント破棄
$statement = null;
//MySQL切断
$database = null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" type="text/css" href="css.css">
    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <title>SimpleCodeTypeGame</title>
</head>
    <body>
        <div class="body">
            <!-- ブラウザタイトル -->
            <h1 class="game-title">The Simple Code Typing Game</h1>
            <!-- タイプ -->
            <p id="typed" class="typing"></p><p id="target" class="typing"></p>
            <!-- ゲーム終了後表示　-->
            <form id="userName">
                <input type="text" id="name" class="user-form">
                <input type="submit" id="ajax" value="Submit" class="submit-button">
            </form>
            <!-- ゲーム終了後表示　-->
            <p class="info">
                Letters count: <span id="score"></span>,
                Miss count: <span id="miss"></span>,
                Remaining Time: <span id="timer"></span>
            </p>
            <br>

        </div>
        <script type="text/javascript" src="typeGame.js"></script>
        <div class="body">
            <table border="1" align="center" >
                <tr>
                    <th>RANK</th>
                    <th>NAME</th>
                    <th>SCORE</th>
                    <th>ACCURACY</th>
                </tr>
                <?php if ($ranking): ?>
                    <?php $i = 1;?>
                    <?php foreach($ranking as $rank): ?>
                    <tr>
                        <?php      $num = $i;
                                    $user = $rank['user'];
                                    $score = $rank['score'];
                                    $accuracy = $rank['accuracy'];?>
                        <td><?php echo htmlspecialchars($num, ENT_QUOTES, 'UTF-8') ?></td>
                        <td><?php echo htmlspecialchars($user, ENT_QUOTES, 'UTF-8') ?></td>
                        <td><?php echo htmlspecialchars($score, ENT_QUOTES, 'UTF-8') ?> Points</td>
                        <td><?php echo htmlspecialchars($accuracy, ENT_QUOTES, 'UTF-8') ?> %</td>
                        <?php $i++;?>
                    </tr>
                        <?php endforeach ?>

                <?php endif ?>
            </table>
        </div>
</body>
</html>
