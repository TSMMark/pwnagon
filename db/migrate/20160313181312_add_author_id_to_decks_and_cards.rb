class AddAuthorIdToDecksAndCards < ActiveRecord::Migration
  def change
    add_column :decks, :author_id, :integer, null: false
    add_foreign_key :decks, :users, column: :author_id, primary_key: :id

    add_column :cards, :author_id, :integer, null: false
    add_foreign_key :cards, :users, column: :author_id, primary_key: :id
  end
end
