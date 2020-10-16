class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.text :order_id
      t.text :lastname
      t.text :firstname
      t.text :address
      t.text :zipcode
      t.bigint :money
      t.bigint :time
      t.text :timestr
      t.text :email
      t.boolean :islogin
      t.integer :user_id

      t.timestamps
    end
  end
end
