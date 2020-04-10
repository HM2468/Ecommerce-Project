

class OrderController < ApplicationController
    skip_before_action :verify_authenticity_token

    def order_page
        goods = parse_order_goods(params[:goodlist])
        gon.goods = goods
        ids = goods_id(goods)
        gon.goods_basic = goods_basic(ids)
    end

    def check
        lastname = params[:lastname]
        firstname = params[:firstname]
        address = params[:address]
        zipcode = params[:zipcode]
        email = params[:email]
        goods = params[:goods].values
        res = check_order(lastname, firstname, address, zipcode, email)
        if res[:status] == 0
            if !save_order(lastname, firstname, address, zipcode, email, goods)
                res[:status] = 5
                res[:msg] = 'save order error, please try later!'
            else
                del_cart_goods(goods)
            end
        end
        res[:msg] = "order saved successfully!"
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    #save user order
    def save_order(lastname, firstname, address, zipcode, email, goods)
        user_id = session[:user_id]
        islogin = !!user_id
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
        record.lastname = lastname
        record.firstname = firstname
        record.address = address
        record.zipcode = zipcode
        record.email = email
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
            UserMailer.order_email(lastname, firstname, order_id, total, email).deliver_now #deliver_later
            #send_order_email(lastname, firstname, order_id, total)
        end
        return saveres
    end


    def create_order_id
        time = Time.new
        order_id = "%4d%02d%02d%02d%02d%02d%03d" % [time.year, time.month, time.day, time.hour, time.min, time.sec, Integer(time.usec/1000)]
        return order_id
    end

    def check_order(lastname, firstname, address, zipcode, email)
        namelen = 30
        addresslen = 300
        res = {:status=>0, :msg=>""}
        if !check_len(lastname, namelen) || !check_len(firstname, namelen)
            res[:status] = 1
            res[:msg] = "name length can't exceed #{namelen} characters!"
        elsif !check_len(address, addresslen)
            res[:status] = 2
            res[:msg] = "address length can't exceed #{addresslen} characters!"
        elsif !check_zipcode(zipcode)
            res[:status] = 3
            res[:msg] = "the zip code is incorrect!"
        elsif !check_email(email)
            res[:status] = 4
            res[:msg] = "the email format is incorrect!"
        end
        return res
    end

    #check zipcode
    def check_zipcode(zipcode)
        return true
    end

    #check email format
    def check_email(email)
        return true
    end

    def check_len(str, max=50, min=1)
        return str.length <= max || str.length > min
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





