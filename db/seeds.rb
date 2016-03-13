def random_cards_ids(count)
  all_cards_ids = Card.all.pluck(:id)
  (0...count).map { all_cards_ids.sample }
end

def insert_admin
  attrs = {
    :email => "admin@pwnagon.com",
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

def insert_decks
  decks = [
    { name: "My First Deck!", card_ids: random_cards_ids(40) },
    { name: "My Second Deck", card_ids: random_cards_ids(40) },
    { name: "Crit Sparrow", card_ids: random_cards_ids(40) },
    { name: "Tanky Gruxx", card_ids: random_cards_ids(40) },
    { name: "Bruiser Gruxx", card_ids: random_cards_ids(40) },
    { name: "All abilities all day Dekker", card_ids: random_cards_ids(40) },
    { name: "Ultimate Dekker Support", card_ids: random_cards_ids(40) },
    { name: "Twinblast for days", card_ids: random_cards_ids(40) },
    { name: "Crit Twinblast", card_ids: random_cards_ids(40) },
    { name: "#1 Legend NA Gideon", card_ids: random_cards_ids(40) },
    { name: "CDR Gideon", card_ids: random_cards_ids(40) },
    { name: "Full AP Murdock", card_ids: random_cards_ids(40) }
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
  insert_decks
end
