class AddTriggerToCards < ActiveRecord::Migration
  def change
    add_column :cards, :trigger, :string
  end
end
