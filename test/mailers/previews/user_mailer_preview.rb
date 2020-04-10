# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
    def order_email
        lastname = "Zhijie"
        firstname = "Zhao"
        order_id = "12541254125"
        money = 5412
        email = "179527026@qq.com"
        UserMailer.order_email(lastname, firstname, order_id, money, email)
    end
end
