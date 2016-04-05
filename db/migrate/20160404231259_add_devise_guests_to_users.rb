class AddDeviseGuestsToUsers < ActiveRecord::Migration
  def change
    change_table(:users) do |t|
      t.boolean :guest, :null => false, :default => false
    end
  end
end
