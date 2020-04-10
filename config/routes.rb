Rails.application.routes.draw do
  get 'good/detail'
  get 'good/search_page'
  get 'user/register_page'
  post 'user/register'
  get 'user/login_page'
  post 'user/login'
  get 'user/logout'
  get 'cart/add2cart'
  get 'cart/cart_page'
  get 'order/order_page'
  post 'order/check'
  get "home/main"
  get "home/records"
  root "home#main"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
