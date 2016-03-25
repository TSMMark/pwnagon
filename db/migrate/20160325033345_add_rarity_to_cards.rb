class AddRarityToCards < ActiveRecord::Migration
  def change
    add_column :cards, :rarity, :string, null: false, default: Card::DEFAULT_RARITY
  end
end
