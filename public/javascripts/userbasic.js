


$(function(){
    var basic = gon.basic;
    console.log("当前的basic:",JSON.stringify(basic))
    showBasic();

    $("#basic-edit-action span").click(function(){
        window.location.href="/user/center?"+$.param({page:"basic", act:"edit"});
    });

    function showBasic(){
        if(basic){
            $("#basic-firstname").html(basic.firstname || "None");
            $("#basic-lastname").html(basic.lastname || "None");
            $("#basic-province").html(basic.province || "None");
            $("#basic-city").html(basic.city || "None");
            $("#basic-address").html(basic.address || "None");
            $("#basic-zipcode").html(basic.zipcode || "None");
            $("#basic-email").html(basic.email || "None");
        }
    }
})