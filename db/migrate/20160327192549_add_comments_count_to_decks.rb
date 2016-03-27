class AddCommentsCountToDecks < ActiveRecord::Migration
  def change
    add_column :decks, :comments_count, :integer, null: false, default: 0
  end
end
