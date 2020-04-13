

class OrderController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_cache_headers
    def order_page
        goods = parse_order_goods(params[:goodlist])
        gon.goods = goods
        ids = goods_id(goods)
        gon.goods_basic = goods_basic(ids)
        if log_in?
            gon.basic = Userbasic.where(user_id:get_user_id())[0]
        else
            gon.basic = nil
        end
    end

    def check
        params[:goods] = params[:goods].values
        res = check_order(params)
        if res[:status] == 0
            if !save_order(params)
                res[:status] = 5
                res[:msg] = 'save order error, please try later!'
            else
                del_cart_goods(params[:goods])
                res[:status] = 0
                res[:msg] = "order saved successfully!"
            end
        end
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    def delete
        res = {:status=>0, :msg=>""}
        id = params[:order_id]
        Order.where(order_id:id).destroy_all
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    #save user order
    def save_order(params)
        user_id = get_user_id()
        islogin = log_in?()
        goods = params[:goods]
        order_id = create_order_id()
        total = 0
        msg = "order_id:#{order_id}, order goods:#{goods.to_json}, islogin:#{islogin}, user_id:#{user_id}"
        ids = goods_id(goods)
        basics = goods_basic(ids)
        if basics.length != goods.length
            puts "order information is incorrect, " + msg
            return false;
        end
        #save order goods
        goods.each do |good|
            gid = Integer(good["good_id"])
            price = 0
            record = Ordergood.new
            record.order_id = order_id
            record.good_id = gid
            record.num = Integer(good["num"])
            for i in 0..basics.length-1
                if basics[i]["id"] == gid
                    record.price = basics[i]["price"]
                    break;
                end
            end
            total += record.num * record.price
            if !record.save
                puts "save order goods failed, " + msg
                return false
            end
        end
        #save order
        record = Order.new
        record.lastname = params[:lastname]
        record.firstname = params[:firstname]
        record.province = params[:province]
        record.city = params[:city]
        record.address = params[:address]
        record.zipcode = params[:zipcode]
        record.email = params[:email]
        record.time = Time.now
        record.timestr = Time.at record.time
        record.islogin = islogin
        record.user_id = user_id
        record.order_id = create_order_id()
        record.money = total
        saveres = !!record.save
        if !saveres
            puts "save order failed, " + msg
        elsif
            UserMailer.order_email(params[:lastname], params[:firstname], order_id, total, params[:email]).deliver_now #deliver_later
            #send_order_email(lastname, firstname, order_id, total)
        end
        return saveres
    end


    def create_order_id
        time = Time.new
        order_id = "%4d%02d%02d%02d%02d%02d%03d" % [time.year, time.month, time.day, time.hour, time.min, time.sec, Integer(time.usec/1000)]
        return order_id
    end

    def check_order(params)
        namelen = 30
        addresslen = 300
        provincelen = 10
        citylen = 10
        res = {:status=>0, :msg=>""}

        if(checkres = check_input("name", params[:lastname], nil, namelen, 1)) != ""
            res[:status] = 1
            res[:msg] = checkres
        elsif (checkres = check_input("name", params[:firstname], nil, namelen, 1)) != ""
            res[:status] = 1
            res[:msg] = checkres
        elsif (checkres = check_input("province", params[:province], nil, provincelen, 1)) != ""
            res[:status] = 2
            res[:msg] = checkres
        elsif (checkres = check_input("city", params[:city], nil, citylen, 1)) != ""
            res[:status] = 3
            res[:msg] = checkres
        elsif (checkres = check_input("address", params[:address], nil, addresslen, 1)) != ""
            res[:status] = 4
            res[:msg] = checkres
        elsif (checkres = check_input("zipcode", params[:zipcode], /^[0-9a-zA-Z ]+$/, 30, 1)) != ""
            res[:status] = 5
            res[:msg] = checkres
        elsif (checkres = check_input("email", params[:email], /^[0-9A-Za-z_]+@[0-9A-Za-z_.]+$/, 50, 1)) != ""
            res[:status] = 6
            res[:msg] = checkres
        end
        return res
    end

    #del some goods of cart
    def del_cart_goods(goods)
        ids = goods_id(goods)
        user_id = session[:user_id]
        #user is logged in
        if(user_id)
            Cart.where("user_id = #{user_id} AND good_id IN (#{ids.join(',')})").destroy_all
        end
    end

end





