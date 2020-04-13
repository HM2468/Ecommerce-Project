
$(function(){
    var orders = gon.orders;

    addTemplateVariable(orders);
    displayOrders(orders);

    $("#center-order-list").on("click", ".order-action-delete", function(){
        var item = $(this).closest(".single-order");
        var order_id = $(item).attr("order_id");
        var params = {order_id:order_id}
        $.post("/order/delete", params, function(data, status){
            if(status != "success"){
                alert("Server Error!");
                return;
            }
            if(data.status != 0){
                alert(msg);
                return;
            }
            $(item).remove();
        })
        
    });


    function displayOrders(orders){
        renderList("#center-order-list", ".single-order", orders);
    }

    //add total date name to order
    function addTemplateVariable(orders){
        for(var i = 0; i < orders.length; i++){
            var order = orders[i];
            order.date = getFullDate(order.time);
            order.total = order.money;
            order.name = order.firstname + " " + order.lastname;
        }
    }
})


















