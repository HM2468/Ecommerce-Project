class ApplicationController < ActionController::Base
    before_action :record_visit

    def goods_basic(ids)
        if ids.length == 0
            return []
        end
        idstr = ids.join(",")
        conditionstr = "("+idstr+")"
        sql = "SELECT * FROM goods WHERE id IN #{conditionstr}";
        records = ActiveRecord::Base.connection.select_all(sql)
        return records
    end

    def goods_id(goods)
        ids = []
        goods.each do |good|
            ids<<Integer(good[:good_id])
        end
        return ids
    end

    #parse order goods
    def parse_order_goods(goodlist)
        goods = []
        goodlist.split("|").each do |item|
            strs = item.split("-")
            good_id = Integer(strs[0])
            num = Integer(strs[1])
            goods<<{:good_id=>good_id, :num=>num}
        end
        return goods
    end

    def log_in?
        !!session[:user_id]
    end

    def check_input(name, str, reg, maxlen=30, minlen=0)
        if reg && !(str =~ reg)
            return name + " format is incorrect!";
        end
        if str.length > maxlen
            return name + " length can't exceed " + maxlen.to_s;
        end
        if str.length < minlen
            return name + " length cant't be less than "+minlen.to_s;
        end
        return "";
    end

    private
        def record_visit
            record = Visit.new
            record.ip = request.remote_ip
            record.time = Time.now
            record.path = request.path
            record.timestr = Time.at record.time
            record.save
        end
end
