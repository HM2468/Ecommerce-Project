class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    #create_table :users do |t|
    create_table :users, id: false, primary_key: :user_id do |t|
      t.serial :user_id
      t.string :username
      t.string :password
      t.string :email

      t.timestamps
    end
  end
end
