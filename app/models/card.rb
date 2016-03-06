class Card < ActiveRecord::Base
  has_many :decks
  has_many :decks, through: :slots

  validates :name, presence: true
  validates :cost, presence: true
  validates :affinity, presence: true
end
