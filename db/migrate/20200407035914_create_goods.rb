class CreateGoods < ActiveRecord::Migration[5.2]
  def change
    create_table :goods do |t|
      t.integer :cid
      t.string :desc
      t.decimal :price
      t.integer :sold
      t.string :titles
      t.string :cover

      t.timestamps
    end
  end
end
