class Comment < ActiveRecord::Base
  # acts_as_tree order: "created_at" # TODO: This does not work for some reason.

  belongs_to :deck, counter_cache: true
  belongs_to :author, :class_name => "User"

  validates :body, presence: true
end
