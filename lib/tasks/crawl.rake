require_relative "../crawlers/cards"

namespace :crawl do
  desc "Crawl the Paragon Wiki to print card data."
  task :cards, [:commit_hash, :new_time] do |_t, args|
    Pwnagon::Crawlers::Cards.print_json
  end
end
