Rails.application.routes.draw do
  get 'good/detail'
  get 'good/search_page'
  get 'user/register_page'
  post 'user/register'
  get 'user/login_page'
  post 'user/login'
  get 'user/logout'
  get 'user/center'
  post "user/update_basic"
  post "user/change_pwd"
  get 'cart/add2cart'
  get 'cart/cart_page'
  post 'cart/delete_goods'
  get 'order/order_page'
  post 'order/check'
  post 'order/delete'
  get "home/main"
  get "home/records"
  root "home#main"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
