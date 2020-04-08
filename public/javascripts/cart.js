
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

    //测试cookie问题
    $.removeCookie("zzj")
    var val = JSON.stringify([{good_id:121212,num:1854}, {good_id:435353,num:114}])
    console.log("cart当前的cookie ", document.cookie)
    console.log("用jquery获取的cookie ", $.cookie("zzj"))
    $.cookie("zzj", val, {path:"/"})
    console.log("cart修改后的cookie ", document.cookie)
    console.log("用jquery获取的cookie ", $.cookie("zzj"))
})

























