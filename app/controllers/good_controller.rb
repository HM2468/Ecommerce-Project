
class GoodController < ApplicationController
    skip_before_action :verify_authenticity_token
    @Per_page = 24
    def detail
        good_id = params[:good_id]
        puts "客户端商品id是#{good_id}"
        record = Good.find(good_id)
        good_properties = get_good_config(good_id)
        gon.data = {"good"=>record, "properties"=>good_properties}
    end

    #获取商品的属性配置信息
    def get_good_config(id)
        records = Property.select("attr_name, attr_val").where("good_id=?", id)
        return records
    end
    
    #/get search goods by keywords 
    def search_page
        @keywords = params[:keywords]
        @page = params[:page]
        puts "user's keywords is #{@keywords}"
        if not @page
            @page = 1
        end
        gon.search_results = search(@keywords, @page)
        gon.keywords = @keywords
        gon.page = @page
    end

    def search(keywords, page=1)
        data = []
        words = keywords.split(" ")
        records = Good.where("titles like ?", "%"+keywords+"%").paginate(:page => page, :per_page => @Per_page)
        return records
    end
end




























