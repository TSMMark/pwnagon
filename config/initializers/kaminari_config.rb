Kaminari.configure do |config|
  config.default_per_page = 30
  config.max_per_page = 30 # TODO: When queries are optimized, this can be increased.

  # Defaults:
  # config.window = 4
  # config.outer_window = 0
  # config.left = 0
  # config.right = 0
  # config.page_method_name = :page
  # config.param_name = :page
end
