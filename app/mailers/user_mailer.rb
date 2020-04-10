class UserMailer < ApplicationMailer
    default from: 'coursetest168@gmail.com'

    def order_email(lastname, firstname, order_id, money, email)
        @lastname = lastname
        @firstname = firstname
        @order_id = order_id
        @money = money
        mail(to: email, subject: 'Order Confirmation')
    end
end
