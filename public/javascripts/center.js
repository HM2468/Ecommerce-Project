
$(function(){
    setCurTag();
    var linklist = [
        {href:"/user/center?page=basic", sid:"#center-tag-basic"},
        {href:"/user/center?page=orders", sid:"#center-tag-orders"},
        {href:"/user/center?page=reviews", sid:"#center-tag-reviews"},
        {href:"/user/center?page=password", sid:"#center-tag-password"}
    ];

    initLinks(linklist);

    function initLinks(linklist){
        for(var i = 0; i < linklist.length; i++){
            setLinkListener(linklist[i])
        }
    }

    function setLinkListener(link){
        $(link.sid).click(function(){
            window.location.href = link.href + "&rand="+(+new Date());
        });
    }

    function setCurTag(){
        var page = gon.page;
        var tagid = "#center-tag-basic";
        if(page == "orders"){
            tagid = "#center-tag-orders";
        } else if(page == "reviews"){
            tagid = "#center-tag-reviews";
        } else if(page == "password"){
            tagid = "#center-tag-password";
        }
        $(tagid).css("background", "rgb(66,53,246)").css("color","red");
    }

})
















