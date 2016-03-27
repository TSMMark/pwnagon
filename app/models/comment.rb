class Comment < ActiveRecord::Base
  acts_as_tree order: "created_at"

  belongs_to :deck, counter_cache: true
  belongs_to :author, :class_name => "User"

  validates :body, presence: true
end
