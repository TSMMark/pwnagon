class CreateSlots < ActiveRecord::Migration
  def change
    create_table :slots do |t|
      t.integer :deck_id, null: false
      t.integer :card_id, null: false

      t.index [:deck_id, :card_id], unique: true
      t.timestamps null: false
    end
  end
end
