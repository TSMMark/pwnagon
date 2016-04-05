class Card < ActiveRecord::Base
  self.inheritance_column = nil

  DEFAULT_RARITY = "common".freeze

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

  EFFECT_TYPE_OFFENSE = "offense".freeze
  EFFECT_TYPE_DEFENSE = "defense".freeze
  EFFECT_TYPE_UTILITY = "utility".freeze

  EFFECT_TYPE_MAP = {
    :energy_damage =>            EFFECT_TYPE_OFFENSE,
    :energy_penetration =>       EFFECT_TYPE_OFFENSE,
    :lifesteal =>                EFFECT_TYPE_UTILITY, # ?
    :unique_active =>            EFFECT_TYPE_UTILITY, # ?
    :charges =>                  EFFECT_TYPE_UTILITY, # ?
    :active =>                   EFFECT_TYPE_UTILITY,
    :crit_chance =>              EFFECT_TYPE_OFFENSE,
    :physical_damage =>          EFFECT_TYPE_OFFENSE,
    :cooldown_reduction =>       EFFECT_TYPE_UTILITY,
    :unique_passive =>           EFFECT_TYPE_UTILITY, # ?
    :physical_penetration =>     EFFECT_TYPE_OFFENSE,
    :crit_bonus =>               EFFECT_TYPE_OFFENSE,
    :attack_speed =>             EFFECT_TYPE_OFFENSE,
    :max_mana =>                 EFFECT_TYPE_UTILITY, # ?
    :cooldown =>                 EFFECT_TYPE_UTILITY,
    :max_health =>               EFFECT_TYPE_DEFENSE,
    :health_regeneration =>      EFFECT_TYPE_UTILITY, # ?
    :mana_renegeration =>        EFFECT_TYPE_UTILITY, # ?
    :physical_armor =>           EFFECT_TYPE_DEFENSE,
    :energy_armor =>             EFFECT_TYPE_DEFENSE,
    :damage_bonus =>             EFFECT_TYPE_OFFENSE,
    :max_movement_speed =>       EFFECT_TYPE_UTILITY,
    :passive =>                  EFFECT_TYPE_UTILITY,
    :harvester_placement_time => EFFECT_TYPE_UTILITY
  }.freeze

  has_many :decks
  has_many :decks, through: :slots
  belongs_to :author, :class_name => "User"

  scope :available_to_hero, ->(hero) { where(affinity: hero.affinities | %w[universal]) }

  validates :author, presence: true
  validates :name, presence: true
  validates :cost,
    numericality: { # 1-10 TODO: Close enough?
      only_integer: true,
      greater_than_or_equal_to: 1,
      less_than_or_equal_to: 10
    },
    if: ->{ !prime_helix? }
  validates :cost,
    numericality: {
      only_integer: true,
      equal_to: 0
    },
    if: ->{ prime_helix? }

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

  def fully_upgraded_effects
    super || self.fully_upgraded_effects = {}
  end

  def prime_helix?
   type.to_s == "PrimeHelix"
  end

  def equipment?
   type.to_s == "Equipment"
  end

  def upgrade?
   type.to_s == "Upgrade"
  end

  def effect_type_values
    [effects, fully_upgraded_effects].each_with_object(Hash.new{0}) do |effects_hash, type_values|
      effects_hash.each do |key, _value|
        effect_type = EFFECT_TYPE_MAP.fetch(key.to_sym)
        type_values[effect_type] += cost
      end
    end
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
