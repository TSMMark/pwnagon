require "faker"
require "json"

def seed_data_json(seed_data_file)
  json_file_path = Rails.root.join("db", "seed_data", "#{seed_data_file}.json")
  JSON.parse(File.read(json_file_path))
end

def generate_unique_username
  username = nil

  loop do
    username = Faker::Internet.user_name
    break unless User.where(:username => username).any?
  end

  username
end

def random_timestamps
  {
    created_at: created_at = Faker::Time.backward(30),
    updated_at: Faker::Time.between(created_at, Time.now)
  }
end

def random_cards_ids(count, hero)
  all_cards_ids = Card.available_to_hero(hero).pluck(:id)
  (0...count).map { all_cards_ids.sample }
end

def random_hero
  Hero.limit(1).order("RANDOM()").first
end

def insert_admin
  attrs = {
    :email => User::ADMIN_EMAIL,
    :username => "Admin",
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
      :email => Faker::Internet.email,
      :username => generate_unique_username,
      :password => "asdasdasd"
    }
    existing_user = User.where(:email => attrs[:email]).first
    return existing_user if existing_user

    User.create!(attrs)
  end
end

def insert_cards(author_id)
  cards = seed_data_json(:cards)
  puts "#{cards.count} cards"

  fields = %i[cost type name rarity affinity trigger effects fully_upgraded_effects]

  cards.each do |attrs|
    print "."

    attrs = attrs.symbolize_keys
    card = Card.where(:name => attrs[:name]).first
    image = attrs[:image]

    attrs = attrs.slice(*fields).merge(:author_id => author_id)
    attrs.merge!(random_timestamps)

    if card
      card.update_attributes!(attrs)
    else
      card = Card.create!(attrs)
    end

    begin
      card.image = image if image
    rescue OpenURI::HTTPError => error
      puts "Could not upload image: #{image.inspect}", error.inspect
    end

    card
  end

  puts "done"
end

def insert_heroes
  heroes = [{
    :name => "Sevarog",
    :tagline => "Reap what they sow.",
    :role => "jungler",
    :type => "tank",
    :primary => "physical-damage",
    :attack_type => "melee",
    :affinities => %w[corruption growth],
    :avatar => File.new("#{Rails.root}/public/images/heroes/sevarog_700x490.jpg"),
    :banner => File.new("#{Rails.root}/public/images/heroes/headers/sevarog_1920x1024.jpg")
  },{
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

def insert_decks(count)
  count.times do
    hero = random_hero
    deck = {
      name: Faker::Commerce.product_name,
      description: Faker::Lorem.paragraph(2, false, 4),
      card_ids: random_cards_ids(40, hero),
      hero_id: hero.id,
      author_id: User.limit(1).order("RANDOM()").first.id
    }

    deck.merge!(random_timestamps)

    Deck.create!(deck)
  end
end

def insert_votes(count)
  count.times do
    deck = Deck.limit(1).order("RANDOM()").first
    user = User.limit(1).order("RANDOM()").first

    if rand(0...1).zero?
      deck.upvote_from user
    else
      deck.downvote_from user
    end
  end
end

def insert_comments(count)
  count.times do
    deck = Deck.limit(1).order("RANDOM()").first
    user = User.limit(1).order("RANDOM()").first

    comment = {
      body: Faker::Lorem.paragraph(1, true, 4),
      deck_id: deck.id,
      author_id: user.id
    }

    comment.merge!(random_timestamps)

    Comment.create!(comment)
  end
end

ActiveRecord::Base.transaction do
  puts "Inserting admin..."
  admin = insert_admin

  puts "Inserting heroes..."
  insert_heroes

  puts "Inserting cards..."
  insert_cards(admin.id)

  if Rails.env.production?
    puts "Skipping users, decks, votes in production."
  else
    puts "Inserting users..."
    insert_users(50)

    puts "Inserting decks..."
    insert_decks(200)

    puts "Inserting votes..."
    insert_votes(1000)

    puts "Inserting comments..."
    insert_comments(1000)
  end
end
