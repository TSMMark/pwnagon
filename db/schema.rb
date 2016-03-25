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

ActiveRecord::Schema.define(version: 20160325033345) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.string   "name",                             null: false
    t.integer  "cost",                             null: false
    t.string   "affinity"
    t.json     "effects"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "type",       default: "Equipment", null: false
    t.integer  "author_id",                        null: false
    t.string   "rarity",     default: "common",    null: false
  end

  add_index "cards", ["affinity"], name: "index_cards_on_affinity", using: :btree
  add_index "cards", ["cost"], name: "index_cards_on_cost", using: :btree
  add_index "cards", ["name"], name: "index_cards_on_name", unique: true, using: :btree

  create_table "decks", force: :cascade do |t|
    t.string   "name",                                  null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.integer  "author_id",                             null: false
    t.string   "description"
    t.integer  "hero_id",                               null: false
    t.integer  "cached_votes_total",      default: 0
    t.integer  "cached_votes_score",      default: 0
    t.integer  "cached_votes_up",         default: 0
    t.integer  "cached_votes_down",       default: 0
    t.integer  "cached_weighted_score",   default: 0
    t.integer  "cached_weighted_total",   default: 0
    t.float    "cached_weighted_average", default: 0.0
  end

  add_index "decks", ["cached_votes_down"], name: "index_decks_on_cached_votes_down", using: :btree
  add_index "decks", ["cached_votes_score"], name: "index_decks_on_cached_votes_score", using: :btree
  add_index "decks", ["cached_votes_total"], name: "index_decks_on_cached_votes_total", using: :btree
  add_index "decks", ["cached_votes_up"], name: "index_decks_on_cached_votes_up", using: :btree
  add_index "decks", ["cached_weighted_average"], name: "index_decks_on_cached_weighted_average", using: :btree
  add_index "decks", ["cached_weighted_score"], name: "index_decks_on_cached_weighted_score", using: :btree
  add_index "decks", ["cached_weighted_total"], name: "index_decks_on_cached_weighted_total", using: :btree

  create_table "heroes", force: :cascade do |t|
    t.string   "name",                null: false
    t.string   "tagline",             null: false
    t.string   "role",                null: false
    t.string   "type",                null: false
    t.string   "primary",             null: false
    t.string   "attack_type",         null: false
    t.text     "affinities",          null: false, array: true
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "banner_file_name"
    t.string   "banner_content_type"
    t.integer  "banner_file_size"
    t.datetime "banner_updated_at"
  end

  create_table "slots", force: :cascade do |t|
    t.integer  "deck_id",    null: false
    t.integer  "card_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "username"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "votes", force: :cascade do |t|
    t.integer  "votable_id"
    t.string   "votable_type"
    t.integer  "voter_id"
    t.string   "voter_type"
    t.boolean  "vote_flag"
    t.string   "vote_scope"
    t.integer  "vote_weight"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "votes", ["votable_id", "votable_type", "vote_scope"], name: "index_votes_on_votable_id_and_votable_type_and_vote_scope", using: :btree
  add_index "votes", ["voter_id", "voter_type", "vote_scope"], name: "index_votes_on_voter_id_and_voter_type_and_vote_scope", using: :btree

  add_foreign_key "cards", "users", column: "author_id"
  add_foreign_key "decks", "heroes"
  add_foreign_key "decks", "users", column: "author_id"
end
