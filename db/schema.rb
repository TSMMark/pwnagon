# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160306232641) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "cost",       null: false
    t.string   "affinity"
    t.json     "effects"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "cards", ["affinity"], name: "index_cards_on_affinity", using: :btree
  add_index "cards", ["cost"], name: "index_cards_on_cost", using: :btree
  add_index "cards", ["name"], name: "index_cards_on_name", unique: true, using: :btree

  create_table "decks", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "slots", force: :cascade do |t|
    t.integer  "deck_id",    null: false
    t.integer  "card_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "slots", ["deck_id", "card_id"], name: "index_slots_on_deck_id_and_card_id", unique: true, using: :btree

end
