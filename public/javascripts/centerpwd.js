
$(function(){
    var checklist = [
        {name:"password", func:check_password, identify:"#edit-password", err_identify:"#password-error"},
        {name:"password", func:check_constent, identify:"#edit-confirm-password", ref_identify:"#edit-password", err_identify:"#confirm-error"}
    ];

    setFormListener(checklist);

    $("#commit-password").click(function(){
        var res = check_form(checklist);
        if(res != ""){
            alert(res)
            return;
        }
        var data = form_pack(checklist)
        $.post("/user/change_pwd", data, function(data, status){
            if(status != "success"){
                alert("Server Error!")
                return;
            }
            if(data.status != 0){
                alert(data.msg)
                return;
            }
            alert(data.msg);
            window.location.href="/user/center?page=basic&rand="+(+new Date());
        })
    })
})
















