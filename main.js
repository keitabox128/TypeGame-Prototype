jQuery(function($){
    //ajax送信
    $.ajax({
        url : "ajax.php",
        dataType:"json",
        data : {post_data_1:score, post_data_2:miss},
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("ajax通信に失敗しました");
        },
        success : function(response) {
            console.log("ajax通信に成功しました");
            console.log(response[0]);
            console.log(response[1]);
            $('#response').html('score:'+ response[0]+', miss'+response[1]);
        }
    });
});