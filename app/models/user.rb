class User < ActiveRecord::Base
  acts_as_voter
  validates_uniqueness_of :username, :case_sensitive => false

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :decks, foreign_key: "author_id"
  has_many :authored_cards, foreign_key: "author_id", class_name: "Card"

  ADMIN_EMAIL = "admin@pwnagon.com"

  def admin?
    # TODO: better way of determining admin.
    email == ADMIN_EMAIL
  end

  def ability
    @ability ||= Ability.new(self)
  end

end
