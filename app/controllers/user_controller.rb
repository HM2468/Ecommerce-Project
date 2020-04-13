class UserController < ApplicationController
    skip_before_action :verify_authenticity_token

    def center
        user_id = get_user_id()
        gon.page = @page = params[:page] || "basic"
        gon.act = @act = params[:act] || "show"
        if @page == "basic"
            gon.basic = Userbasic.where(user_id:user_id)[0]
        elsif @page == "orders"
            gon.orders = Order.where(user_id:user_id)
        end
        puts "page:#{@page}, act:#{@act}, basic:#{gon.basic.to_json}"
    end

    def update_basic
        res = {:status=>0, :msg=>""}
        if (checkres = check_user_basic(params)) != ""
            res[:status] = 1
            res[:msg] = checkres
        elsif
            if Userbasic.where(user_id:get_user_id()).length == 0
                record = Userbasic.new
                record.user_id=get_user_id()
                record.lastname=params[:lastname]
                record.firstname=params[:firstname]
                record.province=params[:province]
                record.city=params[:city]
                record.address=params[:address]
                record.zipcode=params[:zipcode]
                record.email=params[:email]
                if !record.save
                    res[:status] = 2
                    res[:status] = "update data error"
                end
            elsif
                Userbasic.update(
                    get_user_id(), 
                    :lastname=>params[:lastname], 
                    :firstname=>params[:firstname],
                    :province=>params[:province],
                    :city=>params[:city],
                    :address=>params[:address],
                    :zipcode=>params[:zipcode],
                    :email=>params[:email]
                )
            end 
        end
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    def change_pwd
        res = {:status=>0, :msg=>"change password successfully!"}
        if !log_in?()
            res[:status] = 1
            res[:msg] = "invalid operation!"
        else
            password = params[:password]
            checkres = check_input("password", password, nil, 12, 4)
            if checkres != ""
                res[:status] = 2
                res[:msg] = checkres
            elsif
                User.update(get_user_id(), :password=>Digest::MD5.hexdigest(password))
            end 
        end
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    #register
    def register
        username = params[:username]
        #check if username is exists
        res = {:status=>0, :msg=>"reigster sucessfully!"}
        if User.where("username=?",username).length != 0
            res[:status] = 1
            res[:msg] = "Username is already registered!"
            puts res[:msg]
        else
            password = params[:password]
            email = params[:email]

            if (checkres = check_input("username", username, nil, 30, 1)) != ""
                res[:status] = 2
                res[:msg] = checkres
            elsif (checkres = check_input("password", password, nil, 12, 4)) != ""
                res[:status] = 3
                res[:msg] = checkres
            elsif (checkres = check_input("email", email, /^[0-9A-Za-z_]+@[0-9A-Za-z_.]+$/, 50, 1)) != ""
                res[:status] = 4
                res[:msg] = checkres
            end

            if res[:status] == 0
                newuser = User.new
                newuser.username = username
                newuser.password = Digest::MD5.hexdigest(password)
                if newuser.save
                    log_in(newuser)
                else
                    res[:status] = 5
                    res[:msg] = "Regist error, please try again later!"
                end
            end
        end
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    #login
    def login
        res = {:status=>0, :msg=>"Login Sucessfully!"}
        username = params[:username]
        password = params[:password]
        password = Digest::MD5.hexdigest(password)
        users = User.where(username:username, password:password)
        if users.length == 0
            res[:status] = 1
            res[:msg] = "Username or password is incorrect!"
        else
            log_in(users[0])
        end
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    def logout
        session.delete(:user_id)
        session.delete(:username)
        puts "当前退出登录后登录id:#{session[:user_id]}"
        res = {:status=>0}
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    private
        #获取商品的属性配置信息
        def get_good_config(id)
            records = Property.select("attr_name, attr_val").where("good_id=?", id)
            return records
        end

        def log_in(user)
            puts "处理用户登录信息"
            session[:user_id] = user.user_id
            cookies[:user_id] = user.user_id
            cookies[:username] = user.username
        end

        def check_user_basic(basic)
            if basic[:firstname] && (res = check_input("firstname", basic[:firstname], nil, 30, 1)) != ""
                return res;
            end
            if basic[:lastname] && (res = check_input("lastname", basic[:lastname], nil, 30, 1)) != ""
                return res;
            end
            if basic[:city] && !check_city(basic[:city])
                return "city does not exist!"
            end
            if basic[:province] && !check_province(basic[:province])
                return "province does not exist!"
            end
            return ""
        end

        def check_city(str)
            return true
        end

        def check_province(str)
            return true
        end
end




























