class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :body, null: false
      t.integer :deck_id, null: false # TODO: Support 'polymorphism' and allow NULL.
      t.integer :author_id, null: false
      t.integer :parent_id, null: true

      t.timestamps null: false
    end

    add_foreign_key :comments, :decks, column: :deck_id, primary_key: :id
    add_foreign_key :comments, :users, column: :author_id, primary_key: :id
    add_foreign_key :comments, :comments, column: :parent_id, primary_key: :id
  end
end
