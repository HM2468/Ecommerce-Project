
$(function(){
    var goods = gon.goods;
    var goods_basic = gon.goods_basic;//basic info of goods in cart

    var selected = {};

    setGoodsListeners(selected, goods, goods_basic);
    showGoods(goods, goods_basic);

    //redict to order page
    $(".goods-commit").click(function(){
        var selectedgoods = getSelectedGoods(goods, selected);
        if(selectedgoods.length == 0){
            alert("You must select at least one product to order!");
            return;
        }
        orderGoods(selectedgoods);
    });

    $(".goods-delete-text").click(function(){
        deleteSelectedCartGoods();
    })

    //delete some goods in the cart
    function deleteSelectedCartGoods(){
        var ids = getSelectedGoodsId(selected);
        if(ids.length == 0){
            return;
        }
        if(isLogin()){
            $.post("/cart/delete_goods", {ids:ids}, function(data, status){
                if(status != 'success'){
                    alert("Server Error!");
                    return;
                }
                if(data.status != 0){
                    alert(data.msg);
                    return;
                }
                updatePageAfterDelete(ids);
            });
        } else {
            deleteCookieCartGoods(ids);
            updatePageAfterDelete(ids);
        }
    }

    //update page display after user delete some goods in the cart
    function updatePageAfterDelete(ids){
        deletePageGoods(ids, goods, selected);
        var selected_goods = getSelectedGoods(goods, selected);
        showGoodsSummay(selected_goods, goods_basic)
    }
})

























