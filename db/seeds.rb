def insert_cards
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
    Card.create!(card.slice(*fields)) unless Card.where(:name => card[:name]).any?
  end
end

ActiveRecord::Base.transaction do
  insert_cards
end
