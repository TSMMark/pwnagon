require "capybara"
require "capybara/dsl"
require "capybara/poltergeist"

Capybara.configure do |config|
  config.run_server = false
  config.default_driver = :poltergeist
  config.app_host = "http://paragon.wiki"
end

module Pwnagon
  module Crawlers
    module Cards
      extend Capybara::DSL

      module_function

      def print_json

        visit "/Cards"

        cards = []
        distinct_infobox_keys = []

        within("#mw-content-text") do
          all("li.gallerybox").each do |card_gallerybox|
            img_node = card_gallerybox.find(".thumb img")

            card_name = card_gallerybox.find(".gallerytext").text
            card_thumb_120 = img_node[:src]
            card_thumb_180, card_thumb_240 = parse_srcset(img_node[:srcset])

            card_details_path = card_gallerybox.find(".thumb a")[:href]

            puts "Name: #{card_name.inspect}"
            puts "Thumb 120: #{card_thumb_120.inspect}"
            puts "Thumb 180: #{card_thumb_180.inspect}"
            puts "Thumb 240: #{card_thumb_240.inspect}"
            puts "Details Path: #{card_details_path.inspect}"

            # TODO: Get 175, 263, 350 thumb sizes from each card detail page.
            # TODO: Get type, cost, affinity and other details from card detail page.

            card = {
              name: card_name,
              thumb_120: card_thumb_120,
              thumb_180: card_thumb_180,
              thumb_240: card_thumb_240,
              details_path: card_details_path
            }

            cards << card
          end
          puts "\n\n\n\n\n--------------"
        end

        puts "Found #{cards.count} Cards..."

        cards.each do |card|
          visit card[:details_path]
          within(".infobox.wikitable") do
            img_node = find(".image img")
            card_thumb_175 = img_node[:src]
            card_thumb_263, card_thumb_350 = parse_srcset(img_node[:srcset] || "") # TODO: Better handle missing srcset?

            card[:thumb_175] = card_thumb_175
            card[:thumb_263] = card_thumb_263
            card[:thumb_350] = card_thumb_350

            # for each tr, if there are 2 tds in it, it's a key and a value. Use a mapper and coerce data.
            infobox_data = get_infobox_key_value_pairs
            distinct_infobox_keys |= infobox_data.keys
            puts "distinct_infobox_keys: \n#{distinct_infobox_keys.to_yaml}\n\n"
            puts "infobox_data: \n#{infobox_data.to_yaml}\n\n"

            puts card.to_yaml
            puts "\n.......\n"
          end
        end

        puts "Found #{cards.count} Cards..."
        puts "\n\nYAML:", cards.to_yaml
        puts "\n\nJSON:", cards.to_json
      end

      # private

      def parse_srcset(srcset)
        srcset.split(",").map do |set_with_scale|
          set_with_scale.sub(/\d(\.\d)?x$/, "").strip
        end
      end

      def get_infobox_key_value_pairs
        all("tr").each_with_object({}) do |tr, hash|
          all_tds = tr.all("td")
          next unless all_tds.size == 2 # One key + one value.
          key = all_tds[0].text.tr(":", "")
          value = all_tds[1].text
          hash[key] = value
        end
      end

    end
  end
end

# All distinct_infobox_keys discovered:
# TODO: Just dump most of these into a JSON column on each card record.
# Special keys:
#  - type (active / passive / upgrade) - split into upgrade vs equipment + trigger_type active|passive
#  - affinity
#  - cost (strip non-\d)
#  - rarity (basic, common, uncommon)
# Type
# Affinity
# Cost
# Rarity


# Energy Damage
# Damage Bonus
# Unique Passive
# Max Health
# Physical Damage
# Crit Bonus
# Max Movement Speed
# Charges
# Unique Active
# Passive
# Harvester Placement Time
# Max Mana
# Active
# Cooldown Reduction
# Cooldown
# Crit Chance
# Physical Armor
# Energy Armor
# Attack Speed
# Physical Penetration
# Lifesteal
# Energy Penetration
# Health Regeneration
# Mana Renegeration
