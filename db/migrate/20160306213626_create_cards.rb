class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name
      t.integer :mana_cost
      t.string :affinity
      t.json :abilities

      t.timestamps null: false

      t.index :mana_cost
      t.index :affinity
      t.index :name, unique: true
    end
  end
end
