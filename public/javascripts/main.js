
$(function(){

    var movieInterval = null;

    var movie_goods=[
        {good_id:581161448522, pic:"/images/others/20200418015412.png"},
        {good_id:559426810798, pic:"/images/others/O1CN01XtxnjT27LkIj8hS0f_!!2067467781.jpg"},
        {good_id:590659675546, pic:"/images/others/20200418015520.png"},
        {good_id:581981583229, pic:"/images/others/20200418015634.png"},
        {good_id:559982109687, pic:"/images/others/20200418015756.png"}
    ];


    displayGoods($("#best-sell-list"), gon.best_sell_goods);
    displayGoods($("#low-price-list"), gon.low_price_goods);
    displayGoods($("#high-price-list"), gon.high_price_goods);

    InitAndStartMovieImgs(movie_goods);

    checkMaskShow();

    $("#close-mask-btn").click(function(){
        $("#mask-box").css("display", "none");
        $.cookie("stateviewed", "yes", {path:"/"})
    });


    function InitAndStartMovieImgs(images){
        initMovieImages(images);
        startMovieImages();
    }

    function initMovieImages(goods){
        var imgbox = $(".movie-img-list");
        var nobox = $(".img-no-wrap");
        var imgunit = '<a href="/good/detail?good_id=$gid"><img class="movie-img" src="$src"/>';
        var nounit = '<span class="movie-img-no"></span>';
        for(var i = 0; i < goods.length; i++){
            var good = goods[i];
            var cur = imgunit.replace("$src", good.pic)
            cur = cur.replace("$gid", good.good_id)
            imgbox.append(cur)
            nobox.append(nounit)
        }
    }

    //start movie images
    function startMovieImages(){
        var movie_nodes = $(".movie-img-list").children();
        var movie_pic_len = movie_nodes.length;
        var cur_movie_pic = 0;
        clearInterval(movieInterval);
        movieInterval = setInterval(function(){
            //console.log("开始执行切换")
            movie_nodes.eq(cur_movie_pic).fadeOut(1000, function(){
                //console.log("开始执行退出回调")
                cur_movie_pic = (cur_movie_pic + 1)%movie_pic_len
                movie_nodes.eq(cur_movie_pic).fadeIn(1000, function(){
                    //console.log("开始执行进入回调");
                });
            });
        }, 4000);
    }

    //stop movie images
    function stopMovieImages(){
        clearInterval(movieInterval);
    }

    //display goods in different slots
    function displayGoods(boxObj, goods){
        var str = '<a href="/good/detail?good_id=$gid"><div gid=$gid class="main-img-wrap"><img src="$cover" /></div></a>';
        console.log("商品数量", goods.length)
        for(var i = 0; i < goods.length; i++){
            console.log("当前商品", goods[i].titles)
            var item = str.replace("$cover", goods[i].cover);
            item = item.replace(/\$gid/g, goods[i].id)
            boxObj.append(item);
        }
    }

    function checkMaskShow(){
        if($.cookie("stateviewed") != "yes"){
            $("#mask-box").css("display", "block");
        } else {
            $("#mask-box").css("display", "none");
        }
    }
})





















