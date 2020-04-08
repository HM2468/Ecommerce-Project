
class HomeController < ApplicationController
    def main
        #找出销量最高的，最便宜的，最贵的 各5各
        gon.best_sell_goods = Good.order(price: :desc).first(5)
        gon.low_price_goods = Good.order(price: :asc).first(5)
        gon.high_price_goods = Good.order(sold: :desc).first(5)
        #puts "查询到的物品#{gon.best_sell_goods.to_json}"
    end

    def records
        #只返回最近7天的记录
        time = Integer(Time.now - 7*24*3600)
        records = Visit.where("time > ?", time).order(time: :desc)
        gon.records = records
    end
end


































