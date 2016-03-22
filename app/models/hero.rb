class Hero < ActiveRecord::Base
  self.inheritance_column = nil

  has_many :decks

  has_attached_file :avatar,
    styles: { thumb: "111x111#", medium: "700x490#" },
    :s3_protocol => Rails.env.production? ? :https : :http
  validates_presence_of :avatar
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  has_attached_file :banner,
    styles: { large: "1920x1024#" },
    :s3_protocol => Rails.env.production? ? :https : :http
  validates_presence_of :banner
  validates_attachment_content_type :banner, content_type: /\Aimage\/.*\Z/
end
