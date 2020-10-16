class CreateCarts < ActiveRecord::Migration[5.2]
  def change
    create_table :carts do |t|
      t.integer :num
      t.integer :user_id
      t.references :good, foreign_key: true

      t.timestamps
    end
  end
end
