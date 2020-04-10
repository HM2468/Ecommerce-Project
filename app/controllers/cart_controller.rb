

class CartController < ApplicationController
    skip_before_action :verify_authenticity_token
    def add2cart
        user_id = session[:user_id]
        res = {:status=>0, :msg=>"Add to cart successfully!"}
        if not user_id
            res[:status] = 1
            res[:msg] = "Illegal operation!"
        else
            #if record is already exist, update, or create new
            good_id = params[:good_id]
            num = Integer(params[:num])
            records = Cart.where(user_id:user_id, good_id:good_id)
            if records.length == 0
                record = Cart.new
                record.user_id = user_id
                record.good_id = good_id
                record.num = num
                if not record.save
                    res[:status] = 2
                    res[:msg] = "Failed to add item to cart!"
                end
            else
                ActiveRecord::Base.connection.execute("UPDATE carts SET num = num + #{num} WHERE user_id = #{user_id} AND good_id = #{good_id}") 
            end
        end
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    def cart_page
        if log_in?()
            user_id = get_user_id()
            puts "当前是当做已登录用户处理，登录名是#{user_id}"
            gon.goods = Cart.where(user_id: user_id)
        else
            puts "当前的参数是#{params[:goodlist]}"
            gon.goods = parse_order_goods(params[:goodlist])
            puts "转换后的数据是#{gon.goods}"
        end
        ids = goods_id(gon.goods)
        gon.goods_basic = goods_basic(ids)
    end

    def delete_goods
        res = {:status=>0, :msg=>""}
        if !log_in?()
            res[:status] = 1
            res[:msg] = "Illegal operation"
        elsif
            Cart.where("user_id = #{get_user_id()} AND good_id IN (#{params[:ids].join(',')})").destroy_all
        end
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end
end






























