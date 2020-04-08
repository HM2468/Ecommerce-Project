

$(function(){
    var results = gon.search_results;
    var keywords = gon.keywords;
    show_search_results(results)

    function show_search_results(results){
        htmlstr = ""
        for(var i = 0; i < results.length; i++){
            var good = results[i];
            unitstr = '<a href="/good/detail?good_id=$good_id">'+
                            '<div class="good-unit-box">'+
                                '<img src="$src" class="good-list-img"/>'+
                                '<p class="unit-titles">$titles</p>'+
                                '<p class="unit-sales"><span class="unit-price-span">¥</span><span class="unit-price-span">$price</span><span class="unit-sold-span">$sold</span><span class="unit-sold-span">sold</span></p>'+
                            '</div>'+
                        '</a>';
            unitstr = unitstr.replace("$good_id", good.id);
            unitstr = unitstr.replace("$src", good.cover);
            unitstr = unitstr.replace("$titles", good.titles);
            unitstr = unitstr.replace("$price", good.price);
            unitstr = unitstr.replace("$sold", good.sold);
            htmlstr += unitstr;
        }
        $("#goods-list").html(htmlstr)
        $("#results-counts").html(results.length)
        $("#search-keywords").html(keywords)
    }
})






















