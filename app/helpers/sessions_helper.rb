module SessionsHelper


    def log_in?
        !!session[:user_id]
    end

end











