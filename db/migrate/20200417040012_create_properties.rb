class CreateProperties < ActiveRecord::Migration[5.2]
  def change
    create_table :properties do |t|
      t.string :attr_name
      t.string :attr_val
      t.references :good, foreign_key: true

      t.timestamps
    end
  end
end
