
function setGoodsListeners(selected, goods, goods_basic){
    $(".goods-box").on("click", ".good-tick", function(){
        var gid = $(this).attr("gid") || $(this).closest(".list-good-item").attr("gid");
        obj = gid == "all" ? $(".good-tick") : $(this);
        console.log("current good id is ", gid)
        if(selected[gid]){
            obj.css("background-image", 'none');
            obj.attr("tick", "no");
        } else {
            obj.css("background-image", 'url("/images/icons/tick.png")');
            obj.attr("tick", "yes");
        }
        if(selected[gid]){
            if(gid == "all"){
                //set all unselected;
                var keys = Object.keys(selected);
                for(var i = 0; i < keys.length; i++){
                    delete selected[keys[i]];
                }
            } else {
                selected[gid] = false;
                selected["all"] = false;
                $(".tick-all").css("background-image", 'none');
                $(".tick-all").attr("tick", "no");
            }
        } else {
            if(gid == "all"){
                setAllSelected(selected, goods);
            } else {
                selected[gid] = true;
            }
        }
        var selected_goods = []
        for(var i = 0; i < goods.length; i++){
            var good = goods[i];
            if(selected[good.good_id]){
                selected_goods.push(good)
            }
        }
        showGoodsSummay(selected_goods, goods_basic)
    })
}

//set all selected
function setAllSelected(selected, goods){
    for(var i = 0; i < goods.length; i++){
        selected[goods[i].good_id] = true;
    }
    selected["all"] = true;
}

//get goods brief data from server and display
function showGoods(goods, goods_basic){
    if(goods.length == 0){
        $(".empty-goods-info").css("display", "block");
    } else {
        displayGoods(goods, goods_basic)
    }
}

//show goods list in cart
function displayGoods(goods, goods_basic){
    //count good num
    var goodsnum = {}
    for(var i = 0; i < goods.length; i++){
        var item = goods[i];
        gid = item.good_id
        if(!goodsnum[gid]){
            goodsnum[gid] = 0;
        }
        goodsnum[gid] += item.num;
    }
    var htmlstr = "";
    for(var i = 0; i < goods_basic.length; i++){
        var basic = goods_basic[i];
        if(goodsnum[basic.id]){
            num = goodsnum[basic.id];
            var unitstr = '<p class="list-good-item"  gid=$good_id>'+
                            '<span class="list-good col-tickbox"><label class="good-tick"  tick="no"></label></span>'+
                            '<a href="$link"><img class="list-good col-cover" src=$cover gid=$good_id/></a>'+
                            '<a href="$link"><span class="list-good col-product">$titles</span></a>'+
                            '<span class="list-good col-price">￥$price</span>'+
                            '<span class="list-good col-num">$num</span>'+
                            '<span class="list-good col-total pink-color">￥$total</span>'+
                        '</p>';
                        unitstr = unitstr.replace("$cover", basic.cover);            
            unitstr = unitstr.replace("$good_id", basic.id);
            unitstr = unitstr.replace("$titles", basic.titles);
            unitstr = unitstr.replace("$price", basic.price);
            unitstr = unitstr.replace("$num", num);
            unitstr = unitstr.replace("$total", basic.price*num);
            unitstr = unitstr.replace(/\$link/g, "/good/detail?good_id="+basic.id);
            htmlstr += unitstr;
        }
    }
    $(".goods-list").html(htmlstr);
}

//get selected goods
function getSelectedGoods(goods, selected){
    var targoods = []
    for(var i = 0; i < goods.length; i++){
        var good = goods[i];
        var gid = good.good_id
        if(selected[gid] && gid != 'all'){
            targoods.push(good);
        }
    }
    return targoods;
}


//count total price
function totalPrice(goods, goods_basic){
    var fee = 0;
    var goodsnum = {};
    for(var i = 0; i < goods.length; i++){
        var good = goods[i];
        goodsnum[good.good_id] = good.num;
    }
    for(var i = 0; i <goods_basic.length; i++){
        var basic = goods_basic[i];
        num = goodsnum[basic.id];
        if(num){
            fee += num * basic.price;
        }
    }
    return fee
}

function showGoodsSummay(goods, goods_basic){
    var count = goods.length;
    fee = totalPrice(goods, goods_basic)
    $(".goods-fee-val").html(fee);
    $(".goods-counts-val").html(count)
}






