class AddRarityToCards < ActiveRecord::Migration
  def change
    add_column :cards, :rarity, :string, null: false, default: "common"
  end
end
