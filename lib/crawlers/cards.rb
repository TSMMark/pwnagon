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

        within("#mw-content-text") do
          all("li.gallerybox").each do |card_gallerybox|
            img_node = card_gallerybox.find(".thumb img")

            card_name = card_gallerybox.find(".gallerytext").text
            card_thumb_120 = img_node[:src]
            card_thumb_180, card_thumb_240 = parse_srcset(img_node[:srcset])

            puts "Name: #{card_name.inspect}"
            puts "Thumb 120: #{card_thumb_120.inspect}"
            puts "Thumb 180: #{card_thumb_180.inspect}"
            puts "Thumb 240: #{card_thumb_240.inspect}"

            # TODO: Get 175, 263, 350 thumb sizes from each card detail page.
            # TODO: Get type, cost, affinity and other details from card detail page.

            card = {
              name: card_name,
              thumb_120: card_thumb_120,
              thumb_180: card_thumb_180,
              thumb_240: card_thumb_240
            }

            cards << card
          end
          puts "\n\n\n\n\n--------------"
        end

        puts "Found #{cards.count} Cards..."
        puts "\n\nJSON:", cards.to_json
      end

      # private

      def parse_srcset(srcset)
        srcset.split(",").map do |set_with_scale|
          set_with_scale.sub(/\d(\.\d)?x$/, "").strip
        end
      end

    end
  end
end
