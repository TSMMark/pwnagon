require "rails_helper"

describe Card, type: :model do
  describe :"available_to_hero" do
    it "filters to universal or matching affinities" do
      included_card_1 = create(:card, affinity: "growth")
      included_card_2 = create(:card, affinity: "intellect")
      excluded_card_1 = create(:card, affinity: "corruption")
      excluded_card_2 = create(:card, affinity: "fury")
      hero = create(:hero, affinities: %w[growth intellect])

      expect(Card.available_to_hero(hero)).to include(included_card_1)
      expect(Card.available_to_hero(hero)).to include(included_card_2)
      expect(Card.available_to_hero(hero)).not_to include(excluded_card_1)
      expect(Card.available_to_hero(hero)).not_to include(excluded_card_2)
    end
  end
end
