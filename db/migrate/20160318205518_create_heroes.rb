class CreateHeroes < ActiveRecord::Migration
  def change
    create_table :heroes do |t|
      t.string :name, null: false
      t.string :tagline, null: false
      t.string :role, null: false
      t.string :type, null: false
      t.string :primary, null: false
      t.string :attack_type, null: false
      t.text :affinities, array: true, null: false

      t.timestamps null: false
    end

    add_column :decks, :hero_id, :integer, null: false
    add_foreign_key :decks, :heroes
  end
end
