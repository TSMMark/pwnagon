class Deck < ActiveRecord::Base
  acts_as_votable

  belongs_to :hero
  has_many :slots
  has_many :cards, through: :slots
  has_many :comments
  belongs_to :author, :class_name => "User"

  validates :name, presence: true
  validates :author, presence: true

  scope :select_hot_score, -> {
    select("hot_score(decks.cached_votes_up, decks.cached_votes_down, decks.created_at) AS hot_score")
  }
end
