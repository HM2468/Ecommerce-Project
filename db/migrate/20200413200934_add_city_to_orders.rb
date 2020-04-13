class AddCityToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :city, :text
  end
end
