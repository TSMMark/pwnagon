class AddTypeToCards < ActiveRecord::Migration
  def change
    add_column :cards, :type, :string, null: false, default: "Equipment"
  end
end
