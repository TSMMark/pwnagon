class Card < ActiveRecord::Base
  self.inheritance_column = nil

  has_many :decks
  has_many :decks, through: :slots
  belongs_to :author, :class_name => "User"

  validates :name, presence: true
  validates :cost, presence: true
  # TODO validates :affinity inclusion in list
end
