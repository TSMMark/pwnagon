class Deck < ActiveRecord::Base
  acts_as_votable

  belongs_to :hero
  has_many :slots, dependent: :destroy
  has_many :cards, through: :slots
  has_many :comments
  belongs_to :author, :class_name => "User"

  validates :name, presence: true
  validates :author, presence: true

  scope :select_hot_score, -> {
    select("hot_score(decks.cached_votes_up, decks.cached_votes_down, decks.created_at) AS hot_score")
  }
  scope :not_guest_author, -> { joins(:author).where.not(:users => { :guest => true }) }

  def card_type_values
    return {} if cards.empty?
    cards.map(&:effect_type_values).inject do |memo, card_type_values|
      memo.merge(card_type_values) do |_key, previous_value, next_value|
        previous_value + next_value
      end
    end
  end
end
