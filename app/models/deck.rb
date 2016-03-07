class Deck < ActiveRecord::Base
  has_many :slots
  has_many :cards, through: :slots

  validates :name, presence: true
  validate do
    errors.add(:cards, :blank) unless cards.any?
  end
end
