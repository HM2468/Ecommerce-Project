


$(function(){
    var quantity = 1;
    var gooddata = gon.data;
    showDetail(gooddata)

    $("#buy-quantity-sub").click(function(){
        if(quantity > 1){
            quantity-=1;
        }
        $("#buy-quantity").html(quantity)
    })

    $("#buy-quantity-add").click(function(){
        quantity+=1;
        $("#buy-quantity").html(quantity)
    })

    $(".tabs").click(function(){
        var tarId = $(this).attr("tar");
        $(".detail-box").css("display","none");
        $("#"+tarId).css("display","block");
    })

    $("#add-cart").click(function(){
        //If the user is already logged in, send msg to server, or save data to cookie
        var good_id = gooddata.good.id;
        var num = quantity;
        //cookie has username means that user is logged in
        if($.cookie("username")){
            addServerCart(good_id, num);
        } else {
            addCookieCart(good_id, num);
        }
        cart = getCookieCart();
        console.log("add to local cart"+JSON.stringify(cart));
    })

    $("#buy-now").click(function(){
        var goods = [{good_id:gooddata.good.id, num:quantity}];
        orderGoods(goods);
    })



    //update cart data to server for user logged in
    function addServerCart(good_id, num){
        var data = {good_id:good_id, num:num};
        $.get("/cart/add2cart?"+$.param(data), function(data, status){
            if(status != "success"){
                alert("Server Error!");
                return;
            }
            if(data.status != 0){
                alert(data.msg);
                return;
            }
            alert(data.msg);
        })
    }

    //show good detail
    function showDetail(data){
        var good = data.good;
        var properties = data.properties;
        var desc = good.desc.replace(/<br>/g,"");
        $("#good-name").html(good.titles);
        var htmlstr = '<img id="good-img" src="$src"/>';
        htmlstr = htmlstr.replace("$src", good.cover);
        $("#good-detail-img-wrap").html(htmlstr);
        $("#good-name2").html(good.titles);
        $("#good-price-val").html(good.price);
        $("#good-desc-content").html(desc);
        console.log("good attributes"+JSON.stringify(properties));
        setConfiguration(properties);
    }

    function setConfiguration(properties){
        var text = "";
        var unit = "<p class='good-attr'><span class='attr-name'>$attr_name: </span><span class='attr-val'>$attr_val</span></p>";
        for(var i = 0; i < properties.length; i++){
            cur = unit.replace("$attr_name", properties[i].attr_name);
            cur = cur.replace("$attr_val", properties[i].attr_val);
            text += cur;
        }
        $("#good-configuration-content").html(text);
    }
})




















