class AddFullyUpgradedEffectsToCards < ActiveRecord::Migration
  def change
    add_column :cards, :fully_upgraded_effects, :json
  end
end
