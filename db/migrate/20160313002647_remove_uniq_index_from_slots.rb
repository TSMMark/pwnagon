class RemoveUniqIndexFromSlots < ActiveRecord::Migration
  def change
    remove_index :slots, [:deck_id, :card_id]
  end
end
