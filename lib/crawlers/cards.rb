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

      CARD_TYPE_MAP = {
        "Prime Helix" => "PrimeHelix",
        "Equipment" => "Equipment",
        "Upgrade" => "Upgrade"
      }.freeze

      module_function

      def print_json

        visit "/Cards"

        cards = []

        within("#mw-content-text") do
          puts "we made it inside"

          all("h2", visible: false).each do |card_type_header|
            card_type_header_text = card_type_header.text
            card_type = CARD_TYPE_MAP.fetch(card_type_header_text.sub("Cards", "").strip)
            puts "Card type: #{card_type.inspect}"

            # Commented out so we can find using the details page instead.
            # card_affinity = adjacent_node(card_type_header, "p")
            # if (card_affinity.find(".mw-redirect") rescue nil)
            #   puts "FIRST", card_affinity.find(".mw-redirect").text
            # else card_affinity = adjacent_node(card_affinity, "p")
            #   puts "SECOND", card_affinity.find(".mw-redirect").text
            # end
            # puts "Card affinity: #{card_affinity.inspect}"

            cards_list = adjacent_node(card_type_header, "ul")

            cards_list.all("li.gallerybox").each do |card_gallerybox|
              img_node = card_gallerybox.find(".thumb img")

              card_name = card_gallerybox.find(".gallerytext").text
              card_thumb_120 = img_node[:src]
              card_thumb_180, card_thumb_240 = parse_srcset(img_node[:srcset])

              puts "Name: #{card_name.inspect}"
              puts "Thumb 120: #{card_thumb_120.inspect}"
              puts "Thumb 180: #{card_thumb_180.inspect}"
              puts "Thumb 240: #{card_thumb_240.inspect}"

              # TODO: Get 175, 263, 350 thumb sizes from each card detail page.
              # TODO: Get cost and other details from card detail page.

              card = {
                name: card_name,
                type: card_type,
                thumb_120: card_thumb_120,
                thumb_180: card_thumb_180,
                thumb_240: card_thumb_240
              }

              cards << card
            end
            puts "\n\n\n\n\n--------------"
          end
        end

        puts "Found #{cards.count} Cards..."
        puts "\n\nJSON:", cards.to_json

        # From provided example:
        # all(".posts .post").each do |post|
        #   title = post.find("h3 a").text
        #   url   = post.find("h3 a")["href"]
        #   date  = post.find("h3 small").text
        #   summary = post.find("p.preview").text

        #   puts title
        #   puts url
        #   puts date
        #   puts summary
        #   puts ""
        # end
      end

      # private

      def parent_node(node)
        node.first(:xpath, ".//..")
      end

      def adjacent_node(node, tag)
        node.first(:xpath, ".//following-sibling::#{tag}") or raise "Could not find #{tag.inspect} adjacent to #{node.inspect}"
      end

      def parse_srcset(srcset)
        srcset.split(",").map do |set_with_scale|
          set_with_scale.sub(/\d(\.\d)?x$/, "").strip
        end
      end

    end
  end
end
