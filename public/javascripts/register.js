

$(function(){
    $("#reg-submit").click(function(data, status){
        var param = {username:$("#username").val(), password:$("#password").val(), email:$("#email").val()};
        console.log("参数信息", param)
        $.post("/user/register", param, function(data, status){
            if(status != "success"){
                console.error("submit error:"+status)
                alert("Server Error!")
                return;
            }
            if(data.status != 0){
                alert("Login error, "+data.msg)
                return;
            }
            alert(data.msg)
            window.location.href="/";  
        })
    })
})













