class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name, null: false
      t.integer :cost, null: false
      t.string :affinity
      t.json :effects

      t.timestamps null: false

      t.index :cost
      t.index :affinity
      t.index :name, unique: true
    end
  end
end
