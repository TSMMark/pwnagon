def random_cards_ids(count)
  all_cards_ids = Card.all.pluck(:id)
  (0...count).map { all_cards_ids.sample }
end

def random_hero_id
  Hero.limit(1).order("RANDOM()").pluck(:id).first
end

def insert_admin
  attrs = {
    :email => User::ADMIN_EMAIL,
    :password => "asdasdasd"
    # TODO: Actually make this user an admin once admin becomes a thing.
  }
  existing_admin = User.where(:email => attrs[:email]).first
  return existing_admin if existing_admin

  User.create!(attrs)
end

def insert_users(count)
  count.times do |i|
    attrs = {
      :email => "user#{i}@example.com",
      :password => "asdasdasd"
    }
    existing_user = User.where(:email => attrs[:email]).first
    return existing_user if existing_user

    User.create!(attrs)
  end
end

def insert_cards(author_id)
  cards = [
    { cost: 0, type: "PrimeHelix", name: "The Centurion", count: 1 },

    { cost: 3, type: "Equipment", name: "Guardian's Key", count: 1 },
    { cost: 3, type: "Equipment", name: "Tempered Plate", count: 2 },
    { cost: 3, type: "Equipment", name: "Tuned Barrier", count: 1 },
    { cost: 3, type: "Equipment", name: "Adamant Edge", count: 2 },
    { cost: 3, type: "Equipment", name: "Amulet of the Veteran", count: 1 },
    { cost: 3, type: "Equipment", name: "Windcarver Blade", count: 1 },
    { cost: 1, type: "Equipment", name: "Scout's Ward", count: 1 },
    { cost: 1, type: "Equipment", name: "Harverster's Key", count: 1 },
    { cost: 1, type: "Equipment", name: "Mana Potion", count: 1 },
    { cost: 1, type: "Equipment", name: "Health Potion", count: 1 },

    { cost: 2, type: "Upgrade", name: "Strike", count: 3 },
    { cost: 1, type: "Upgrade", name: "Minor Strike", count: 2 },
    { cost: 1, type: "Upgrade", name: "Minor Barrier", count: 3 },
    { cost: 3, type: "Upgrade", name: "Greater Health", count: 3 },
    { cost: 2, type: "Upgrade", name: "Health", count: 7 },
    { cost: 1, type: "Upgrade", name: "Lesser Health", count: 3 },
    { cost: 2, type: "Upgrade", name: "Guard", count: 3 },
    { cost: 1, type: "Upgrade", name: "Minor Guard", count: 3 }
  ]

  fields = %i[cost type name]

  cards.each do |card|
    next if Card.where(:name => card[:name]).any?
    Card.create!(card.slice(*fields).merge(:author_id => author_id))
  end
end

def insert_heroes
  heroes = [{
    :name => "Sparrow",
    :tagline => "Move with grace. Strike with precision.",
    :role => "carry",
    :type => "ranger",
    :primary => "physical-damage",
    :attack_type => "ranged",
    :affinities => %w[order growth],
    :avatar => File.new("#{Rails.root}/public/images/heroes/sparrow_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/sparrow_1920x1024.jpg")
  },{
    :name => "Howitzer",
    :tagline => "Small package. Big guns.",
    :role => "pusher",
    :type => "caster",
    :primary => "energy-damage",
    :attack_type => "ranged",
    :affinities => %w[intellect fury],
    :avatar => File.new("#{Rails.root}/public/images/heroes/howitzer_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/howitzer_1920x1024.jpg")
  },{
    :name => "Twinblast",
    :tagline => "Go in. Both guns blazing.",
    :role => "carry",
    :type => "ranger",
    :primary => "physical-damage",
    :attack_type => "ranged",
    :affinities => %w[fury],
    :avatar => File.new("#{Rails.root}/public/images/heroes/twinblast_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/twinblast_1920x1024.jpg")
  },{
    :name => "Dekker",
    :tagline => "Clarity in chaos.",
    :role => "support",
    :type => "caster",
    :primary => "energy-damage",
    :attack_type => "ranged",
    :affinities => %w[order growth],
    :avatar => File.new("#{Rails.root}/public/images/heroes/dekker_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/dekker_1920x1024.jpg")
  },{
    :name => "Grux",
    :tagline => "Shatter their will.",
    :role => "ganker",
    :type => "fighter",
    :primary => "physical-damage",
    :attack_type => "melee",
    :affinities => %w[fury corruption],
    :avatar => File.new("#{Rails.root}/public/images/heroes/grux_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/grux_1920x1024.jpg")
  },{
    :name => "Rampage",
    :tagline => "Break free. Break them.",
    :role => "jungler",
    :type => "tank",
    :primary => "physical-damage",
    :attack_type => "melee",
    :affinities => %w[fury growth],
    :avatar => File.new("#{Rails.root}/public/images/heroes/rampage_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/rampage_1920x1024.jpg")
  },{
    :name => "Gideon",
    :tagline => "Moving heaven and earth for victory.",
    :role => "pusher",
    :type => "caster",
    :primary => "energy-damage",
    :attack_type => "ranged",
    :affinities => %w[intellect corruption],
    :avatar => File.new("#{Rails.root}/public/images/heroes/gideon_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/gideon_1920x1024.jpg")
  },{
    :name => "Murdock",
    :tagline => "No hiding from justice.",
    :role => "carry",
    :type => "ranger",
    :primary => "energy-damage",
    :attack_type => "ranged",
    :affinities => %w[intellect fury],
    :avatar => File.new("#{Rails.root}/public/images/heroes/murdock_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/murdock_1920x1024.jpg")
  },{
    :name => "Muriel",
    :tagline => "Shelter in the storm.",
    :role => "support",
    :type => "caster",
    :primary => "energy-damage",
    :attack_type => "ranged",
    :affinities => %w[order growth],
    :avatar => File.new("#{Rails.root}/public/images/heroes/muriel_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/muriel_1920x1024.jpg")
  },{
    :name => "Feng Mao",
    :tagline => "Balance fate on a blade's edge.",
    :role => "jungler",
    :type => "fighter",
    :primary => "physical-damage",
    :attack_type => "melee",
    :affinities => %w[fury order],
    :avatar => File.new("#{Rails.root}/public/images/heroes/fengmao_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/fengmao_1920x1024.jpg")
  },{
    :name => "Gadget",
    :tagline => "Destruction. Upgraded.",
    :role => "area-control",
    :type => "caster",
    :primary => "energy-damage",
    :attack_type => "ranged",
    :affinities => %w[intellect],
    :avatar => File.new("#{Rails.root}/public/images/heroes/gadget_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/gadget_1920x1024.jpg")
  },{
    :name => "Kallari",
    :tagline => "They'll never see it coming.",
    :role => "ganker",
    :type => "assassin",
    :primary => "physical-damage",
    :attack_type => "melee",
    :affinities => %w[corruption],
    :avatar => File.new("#{Rails.root}/public/images/heroes/kallari_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/kallari_1920x1024.jpg")
  },{
    :name => "Steel",
    :tagline => "Level the field. Or level them all.",
    :role => "support",
    :type => "tank",
    :primary => "physical-damage",
    :attack_type => "melee",
    :affinities => %w[intellect order],
    :avatar => File.new("#{Rails.root}/public/images/heroes/steel_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/steel_1920x1024.jpg")
  }]

  heroes.each do |hero|
    next if Hero.where(:name => hero[:name]).any?
    Hero.create!(hero)
  end
end

def insert_decks
  decks = [
    { name: "My First Deck!",
      description: "This is my first deck ever!",
      card_ids: random_cards_ids(40),
      hero_id: random_hero_id },
    { name: "My Second Deck",
      description: "This is my second deck ever!",
      card_ids: random_cards_ids(40),
      hero_id: random_hero_id },
    { name: "Crit Sparrow",
      description: "This is my first deck ever!",
      card_ids: random_cards_ids(40),
      hero_id: random_hero_id },
    { name: "Tanky Grux",
      description: "This is my first deck ever!",
      card_ids: random_cards_ids(40),
      hero_id: random_hero_id },
    { name: "Bruiser Grux",
      description: "This is my first deck ever!",
      card_ids: random_cards_ids(40),
      hero_id: random_hero_id },
    { name: "All abilities all day Dekker",
      description: "This is my first deck ever!",
      card_ids: random_cards_ids(40),
      hero_id: random_hero_id },
    { name: "Ultimate Dekker Support",
      description: "This is my first deck ever!",
      card_ids: random_cards_ids(40),
      hero_id: random_hero_id },
    { name: "Twinblast for days",
      description: "This is my first deck ever!",
      card_ids: random_cards_ids(40),
      hero_id: random_hero_id },
    { name: "Crit Twinblast",
      description: "This is my first deck ever!",
      card_ids: random_cards_ids(40),
      hero_id: random_hero_id },
    { name: "#1 Legend NA Gideon",
      description: "This is my first deck ever!",
      card_ids: random_cards_ids(40),
      hero_id: random_hero_id },
    { name: "CDR Gideon",
      description: "This is my first deck ever!",
      card_ids: random_cards_ids(40),
      hero_id: random_hero_id },
    { name: "Full AP Murdock",
      description: "This is my first deck ever!",
      card_ids: random_cards_ids(40),
      hero_id: random_hero_id }
  ]

  decks.each do |deck|
    next if Deck.where(:name => deck[:name]).any?
    Deck.create!(deck.merge(:author_id => User.limit(1).order("RANDOM()").first.id))
  end
end

ActiveRecord::Base.transaction do
  admin = insert_admin
  insert_cards(admin.id)
  insert_users(5)
  insert_heroes
  insert_decks
end
