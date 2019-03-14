'use strict';

    let words = [
        'for(i = 0;i < 100;i++)',
        'int a;',
        'while(i < 5)',
        'void main()',
        'double ' +
        'enshuritsu',
        '#define MAX_LENGTH 10',
        'printf("Hello World");'
    ];

    let script = document.createElement("element");
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
    let accuracyLabel = document.getElementById('accuracy');
    let changedWord = '';
    let isStarted;
    let timerId;

    function init() {
        currentWord = 'click to start';
        currentLocation = 0;
        score = 0;
        miss = 0;
        timer = 5;
        target.innerHTML = currentWord;
        scoreLabel.innerHTML = score;
        missLabel.innerHTML = miss;
        timerLabel.innerHTML = timer;
        typed.innerHTML = currentWord.substring(-5, currentLocation);
        isStarted = false;
    }

    init();

    script.src ="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
    //document.body.appendChild(script);



    function updateTimer() {
        timerId = setTimeout(function(){
            timer--;
            timerLabel.innerHTML = timer;
            if (timer <= 0) {

                location.href = 'result.php';
                //alert('game over');
                accuracy =(score + miss) === 0 ? '0.00' : (( score /  (score + miss)) * 100).toFixed(2);
                accuracyLabel.innerHTML = accuracy;
                //ajax通信
                jQuery(function($){
                    //ajax送信
                    $.ajax({
                        url : "ajax.php",
                        type : "POST",
                        dataType:"json",
                        data : {post_data_1:score, post_data_2: miss},
                        error : function(XMLHttpRequest, textStatus, errorThrown) {
                            console.log("ajax通信に失敗しました");
                        },
                        success : function(response) {
                            console.log("ajax通信に成功しました");
                            console.log(response[0]);
                            console.log(response[1]);
                        }
                    });
                });



                //
                clearTimeout(timerId);


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



    window.addEventListener('click', function(){
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


    if (e.key === currentWord[currentLocation]) {


        currentLocation++;
        changedWord = currentWord.substring(-5, currentLocation);
        typed.style.color = "red";
        typed.innerHTML = changedWord;
        target.innerHTML = currentWord.substring(currentLocation);

        score++;
        scoreLabel.innerHTML = score;

        if (currentLocation === currentWord.length){
            setTarget();
        }
    } else {
        miss++;
        missLabel.innerHTML = miss;
    }
    });

    $(function(){
        $('#restart').click(function() {
        init();
        });
    });