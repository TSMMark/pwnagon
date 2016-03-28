class Card < ActiveRecord::Base
  self.inheritance_column = nil

  DEFAULT_RARITY = "common"

  TYPE_MAP = {
    :PrimeHelix => "Prime Helix",
    :Equipment => "Equipment",
    :Upgrade => "Upgrade"
  }.freeze

  RARITY_MAP = {
    :basic => "Basic",
    :common => "Common",
    :uncommon => "Uncommon"
  }.freeze

  AFFINITY_MAP = {
    :universal => "Universal",
    :corruption => "Corruption",
    :fury => "Fury",
    :growth => "Growth",
    :intellect => "Intellect",
    :order => "Order"
  }.freeze

  TRIGGER_MAP = {
    :active => "Active",
    :passive => "Passive"
  }.freeze

  has_many :decks
  has_many :decks, through: :slots
  belongs_to :author, :class_name => "User"

  validates :author, presence: true
  validates :name, presence: true
  validates :cost,
    numericality: { # 1-10 TODO: Close enough?
      only_integer: true,
      greater_than_or_equal_to: 1,
      less_than_or_equal_to: 10
    },
    if: ->{ type.to_s != "PrimeHelix" }
  validates :cost,
    numericality: {
      only_integer: true,
      equal_to: 0
    },
    if: ->{ type.to_s == "PrimeHelix" }

  validates :type, :inclusion => TYPE_MAP.keys.map(&:to_s)
  validates :rarity, :inclusion => RARITY_MAP.keys.map(&:to_s)
  validates :affinity, :inclusion => AFFINITY_MAP.keys.map(&:to_s)
  validates :trigger, :inclusion => TRIGGER_MAP.keys.map(&:to_s), if: :equipment?
  validate :trigger_when_equipment_only

  has_attached_file :image,
    styles: { small: "120x160#", medium: "175x233#", large: "350x467#" },
    s3_protocol: Rails.env.production? ? :https : :http,
    default_url: "/images/cards/default_image.png" # TODO: You can do stuff like "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def prime_helix?
   type.to_s == "PrimeHelix"
  end

  def equipment?
   type.to_s == "Equipment"
  end

  def upgrade?
   type.to_s == "Upgrade"
  end

  private

  def trigger_when_equipment_only
    if !equipment? && !trigger.nil?
      errors.add(:trigger, "is only for Equipment cards.")
    end
  end

  before_validation :intialize_defaults
  def intialize_defaults
    self.cost ||= 0 if prime_helix?
    self.affinity ||= "universal"
    self.trigger ||= "passive" if equipment?
  end

end
