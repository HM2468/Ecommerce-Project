

$(function(){
    check_login();
    $("#curuser").click(function(){
        alert("进入个人中心");
    })

    $("#logout").click(function(){
        $.get("/user/logout", function(data, status){
            if(status == 'success'){
                alert("Logout Successfully!")
                $.removeCookie("username", {path:"/"})
                $("#curuser").html("")
                check_login()
            }else{
                alert("Logout Error!")
            }
        })
    })

    $("#cart-icon").click(function(){
        toCart();
    })

    //check if user is login
    function check_login(){
        username = $.cookie("username");
        if(username){
            $("#curuser").html(username);
            $("#login-user").css("display", "block")
            $("#login-reg").css("display", "none")
        } else {
            $("#login-user").css("display", "none")
            $("#login-reg").css("display", "block")
        }
    }
})














