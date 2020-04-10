$(function(){
    //console.log("订单页面的cookie商品", $.cookie("order"));
    var goods = gon.goods;
    var goods_basic = gon.goods_basic;//basic info of goods in cart
    console.log("current goods is ",JSON.stringify(goods))
    showGoods(goods, goods_basic);
    showGoodsSummay(goods, goods_basic);

    var checklist = [
        {func:check_name, identify:"#order-last-name", err_identify:"#last-name-error"},
        {func:check_name, identify:"#order-first-name", err_identify:"#first-name-error"},
        {func:check_address, identify:"#order-address-detail", err_identify:"#address-detail-error"},
        {func:check_zipcode, identify:"#order-zip-code", err_identify:"#zip-code-error"},
        {func:check_email, identify:"#order-email", err_identify:"#address-email-error"}
    ];

    setFormListener(checklist);

    //After the request is responsed, the cookie order can be removed
    $(".goods-commit").click(function(){
        var checkres = check_form(checklist);
        if(checkres != ""){
            alert(checkres);
            return;
        }
        var lastname = $("#order-last-name").val();
        var firstname = $("#order-first-name").val();
        var address = $("#order-address-detail").val();
        var zipcode = $("#order-zip-code").val();
        var email = $("#order-email").val();
        var params = {goods:goods, address: address, zipcode:zipcode, email:email, firstname:firstname, lastname:lastname};

        $.post("/order/check", params, function(data, status){
            if(status != 'success'){
                alert("Server Error!");
                return;
            }
            if(data.status != 0){
                alert(data.msg)
                return;
            }
            alert(data.msg)
            //if user is not logged int, delete order goods in local cart
            var ids = getGoodsId(goods);
            //console.log("删除前cookie cart ",JSON.stringify(getCookieCart()));
            deleteCookieCartGoods(ids);
            //console.log("删除后cookie cart ",JSON.stringify(getCookieCart()));
            toCart();
        });
    });
})























