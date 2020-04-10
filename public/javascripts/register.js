

$(function(){

    var checklist = [
        {func:check_username, identify:"#username", err_identify:"#uname-error"},
        {func:check_password, identify:"#password", err_identify:"#upass-error"},
        {func:check_email, identify:"#email", err_identify:"#email-error"}
    ];

    setFormListener(checklist);

    $("#reg-submit").click(function(){
        var checkres = check_form(checklist);
        if(checkres != ""){
            alert(checkres);
            return;
        }
        var param = {username:$("#username").val(), password:$("#password").val(), email:$("#email").val()};
        console.log("参数信息", param)
        $.post("/user/register", param, function(data, status){
            if(status != "success"){
                console.error("submit error:"+status)
                alert("Server Error!")
                return;
            }
            if(data.status != 0){
                alert("Register error, "+data.msg)
                return;
            }
            alert(data.msg)
            window.location.href="/";  
        })
    })

})













