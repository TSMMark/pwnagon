# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = ENV["DEFAULT_URL"]

# IMPORTANT: if any of this information changes, be sure to update `Sitemap:` in config/sitemaps.public.txt

# Store on S3 using Fog.
SitemapGenerator::Sitemap.adapter = SitemapGenerator::S3Adapter.new(
  fog_provider: "AWS",
  aws_access_key_id: ENV["AWS_ACCESS_KEY_ID"],
  aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
  fog_directory: ENV["S3_BUCKET_NAME"],
  fog_region: ENV["AWS_REGION"]
)

# Pick a place safe to write the files.
SitemapGenerator::Sitemap.public_path = "tmp/"
# Inform the map cross-linking where to find the other maps.
SitemapGenerator::Sitemap.sitemaps_host = "http://s3-#{ENV["AWS_REGION"]}.amazonaws.com/#{ENV["S3_BUCKET_NAME"]}"
# Pick a namespace within your bucket to organize your maps.
SitemapGenerator::Sitemap.sitemaps_path = "sitemaps/"

SitemapGenerator::Sitemap.create(compress: true) do
  # Put links creation logic here.
  #
  # The root path '/' and sitemap index file are added automatically for you.
  # Links are added to the Sitemap in the order they are specified.
  #
  # Usage: add(path, options={})
  #        (default options are used if you don't specify)
  #
  # Defaults: :priority => 0.5, :changefreq => 'weekly',
  #           :lastmod => Time.now, :host => default_host
  #
  # Examples:
  #
  # Add '/articles'
  #
  #   add articles_path, :priority => 0.7, :changefreq => 'daily'
  #
  # Add all articles:
  #
  #   Article.find_each do |article|
  #     add article_path(article), :lastmod => article.updated_at
  #   end

  add choose_hero_for_new_deck_path, priority: 0.9
  add random_deck_path, lastmod: Deck.order("updated_at DESC").first.updated_at

  Deck
    .select("decks.*")
    .select_hot_score
    .order("hot_score DESC")
    .find_each do |deck|
      add deck_path(deck), changefreq: "hourly", lastmod: deck.updated_at
    end
end
