'use strict';

    let words = [
        'for(i = 0;i < 100;i++)',
        'int a;',
        'while(i < 5)',
        'void main()',
        'double enshuritsu',
        'char c;',
        'return 0;',
        'switch (i === 3)',
        'int array[MAX];',
        '#define MAX_LENGTH 10',
        'printf("Hello World");'
    ];

    let currentWord;
    let currentLocation;
    let score;
    let miss;
    let accuracy;
    let timer;
    let target = document.getElementById('target');
    let typed = document.getElementById('typed');
    let scoreLabel = document.getElementById('score');
    let missLabel = document.getElementById('miss');
    let timerLabel = document.getElementById('timer');
    let changedWord = '';
    let isStarted;
    let timerId;
    let rateAccuracy;
    let POINT;
    let entry = document.getElementById('ajax');

    function init() {
        currentWord = 'Push any key to start';
        currentLocation = 0;
        score = 0;
        miss = 0;
        timer = 30;
        target.innerHTML = currentWord;
        scoreLabel.innerHTML = score;
        missLabel.innerHTML = miss;
        timerLabel.innerHTML = timer;
        typed.innerHTML = currentWord.substring(-5, currentLocation);
        isStarted = false;
        POINT = true;
        entryName();
    }

    init();

    function updateTimer() {
        timerId = setTimeout(function(){
            timer--;
            timerLabel.innerHTML = timer;
            if (timer <= 0) {
                accuracy =(score + miss) === 0 ? '0.00' : (( score /  (score + miss)) * 100).toFixed(2);
                rateAccuracy = Math.ceil(accuracy);
                alert('Time Up!\n\nYour performance is...\n\nType score: '+ score + ' Points, Miss type: '+ miss + ' Points, Accuracy: ' + rateAccuracy +' %');
                POINT = false;
                currentWord = 'Enter Your Name';
                currentLocation = 0;
                typed.innerHTML = currentWord.substring(-5, currentLocation);
                target.innerHTML = currentWord;
                //名前入力
                entryName();
                return;
            }
            updateTimer();
        }, 1000);
    }

    function setTarget(){
     currentWord = words[Math.floor(Math.random() * words.length)];

     target.innerHTML = currentWord;
     currentLocation = 0;
     typed.innerHTML = currentWord.substring(-5, currentLocation);
    }

    function entryName(){
        if (timer <= 0) {
            document.getElementById('userName').style.display = "";
        }else {
            document.getElementById('userName').style.display = "none";
        }
    }

    //submit後のajax通信（クリック時）
    entry.addEventListener('click',function(){
    //ユーザー名取得
    let user = document.getElementById('name').value;
    //ajax通信
    console.log("ajax通信開始");
    jQuery(function($){
        $.ajax({
            url: "ajax.php",
            type: "POST",
            data: {user: user, score: score, rateAccuracy: rateAccuracy},
            success : function(response){
                console.log("ajax通信に成功しました");
                location.reload();
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log("ajax通信に失敗しました");
                }
            });
        });

    });

    //submit後のajax通信（Enter時）
entry.addEventListener('keyup',function(ev){
    if(ev.which === 13){
    //ユーザー名取得
    let user = document.getElementById('name').value;
    //ajax通信
    console.log("ajax通信開始");
    jQuery(function($){
        $.ajax({
            url: "ajax.php",
            type: "POST",
            data: {user: user, score: score, rateAccuracy: rateAccuracy},
            success : function(response){
                console.log("ajax通信に成功しました");
                location.reload();
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
                console.log("ajax通信に失敗しました");
                }
            });
        });

    }
});


    window.addEventListener('keyup', function(){
        if (!isStarted) {
            isStarted = true;
            setTarget();
            updateTimer();
        }
    });

    window.addEventListener('keyup',function (e) {

        if (!isStarted) {
            return;
        }

    //console.log(e.key)

    if(!POINT){
        return;
    }else {
        if (e.key === currentWord[currentLocation]) {


            currentLocation++;
            changedWord = currentWord.substring(-5, currentLocation);
            typed.style.color = "red";
            typed.innerHTML = changedWord;
            target.innerHTML = currentWord.substring(currentLocation);

            score++;
            scoreLabel.innerHTML = score;

            if (currentLocation === currentWord.length) {
                setTarget();
            }
        } else {
            miss++;
            missLabel.innerHTML = miss;
        }
    }
    });

