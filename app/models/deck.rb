class Deck < ActiveRecord::Base
  acts_as_votable

  belongs_to :hero
  has_many :slots
  has_many :cards, through: :slots
  belongs_to :author, :class_name => "User"

  validates :name, presence: true
  validates :author, presence: true
end
