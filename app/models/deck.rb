class Deck < ActiveRecord::Base
  has_many :slots
  has_many :cards, through: :slots

  validates :name, presence: true
end
