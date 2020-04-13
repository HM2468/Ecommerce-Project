class AddProvinceToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :province, :text
  end
end
