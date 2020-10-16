class CreateUserbasics < ActiveRecord::Migration[5.2]
  def change
    #create_table :userbasics do |t|
    create_table :userbasics, id: false, primary_key: :user_id do |t|

      t.text :lastname
      t.text :firstname
      t.text :province
      t.text :city
      t.text :address
      t.text :zipcode
      t.text :email
      t.integer :user_id

      t.timestamps
    end
  end
end
