class CreateVisits < ActiveRecord::Migration[5.2]
  def change
    create_table :visits do |t|
      t.text :ip
      t.bigint :time
      t.text :path
      t.text :timestr

      t.timestamps
    end
  end
end
