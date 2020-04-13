$(function(){
    var basic = gon.basic;
    initBasicInput();

    var checklist = [
        {name:"firstname", func:check_name, identify:"#edit-firstname", err_identify:"#firstname-error"},
        {name:"lastname", func:check_name, identify:"#edit-lastname", err_identify:"#lastname-error"},
        {name:"province", func:check_province, identify:"#edit-province", err_identify:"#province-error"},
        {name:"city", func:check_city, identify:"#edit-city", err_identify:"#city-error"},
        {name:"address", func:check_address, identify:"#edit-address", err_identify:"#address-error"},
        {name:"zipcode", func:check_zipcode, identify:"#edit-zipcode", err_identify:"#zipcode-error"},
        {name:"email", func:check_email, identify:"#edit-email", err_identify:"#email-error"}
    ];

    setFormListener(checklist);

    $("#basic-save-action span").click(function(){
        var checkres = check_form(checklist);
        if(checkres != ""){
            alert(checkres);
            return;
        }
        var params = form_pack(checklist)
        $.post("/user/update_basic", params, function(data, status){
            if(status != 'success'){
                alert("Server Error!")
                return;
            }
            if(data.status != 0){
                alert(data.msg)
            }else{
                alert("data is updated successfully!")
                window.location.href="/user/center";
            }
        })
    });

    function initBasicInput(){
        if(basic){
            $("#edit-firstname").val(basic.firstname);
            $("#edit-lastname").val(basic.lastname);
            $("#edit-province").val(basic.province);
            $("#edit-city").val(basic.city);
            $("#edit-address").val(basic.address);
            $("#edit-zipcode").val(basic.zipcode);
            $("#edit-email").val(basic.email);
        }
    }
})