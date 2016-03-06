class Card < ActiveRecord::Base
  validates :name, presence: true
  validates :cost, presence: true
  validates :affinity, presence: true
end
