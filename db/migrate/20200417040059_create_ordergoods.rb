class CreateOrdergoods < ActiveRecord::Migration[5.2]
  def change
    create_table :ordergoods do |t|
      t.integer :num
      t.integer :price
      t.text :order_id
      t.references :good, foreign_key: true

      t.timestamps
    end
  end
end
