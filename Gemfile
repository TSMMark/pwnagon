source "https://rubygems.org"
ruby "2.2.4"


# Bundle edge Rails instead: gem "rails", github: "rails/rails"
gem "rails", "4.2.5.2"
# Use postgresql as the database for Active Record
gem "pg", "~> 0.15"
# Use SCSS for stylesheets
gem "sass-rails", "~> 5.0" # TODO: kill?
# Use Uglifier as compressor for JavaScript assets
gem "uglifier", ">= 1.3.0"
# See https://github.com/rails/execjs#readme for more supported runtimes
gem "therubyracer", platforms: :ruby

# Use jquery as the JavaScript library
gem "jquery-rails"
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem "turbolinks"
gem "jquery-turbolinks", "~> 2.1.0"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder", "~> 2.0"
# bundle exec rake doc:rails generates the API under doc/api.
gem "sdoc", "~> 0.4.0", group: :doc

gem "devise", "= 3.5.6"
gem "devise-guests", "= 0.4.0", github: "davidkus/devise-guests", ref: "f9e4ea6e1dd6c10ff941f93d2f011a5656bc8f1e" # Fixes undefined callbacks. https://github.com/cbeer/devise-guests/pull/19
gem "cancancan", "~> 1.13.1"

# Use ActiveModel has_secure_password
# gem "bcrypt", "~> 3.1.7"

gem "puma", "= 3.2.0"

# Use Capistrano for deployment
# gem "capistrano-rails", group: :development

# Not just development and test because we use it for crawler task.
gem "capybara", :require => false
gem "poltergeist", :require => false

group :development, :test do
  gem "rspec-rails", "~> 3.0"

  # Call "byebug" anywhere in the code to stop execution and get a debugger console
  gem "byebug"
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem "web-console", "~> 2.0"

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"

  # Better Errors
  gem "binding_of_caller"
  gem "better_errors"
end

group :test do
  gem "factory_girl_rails"
end

group :production do
  gem "rails_12factor"
end

gem "materialize-sass", "= 0.97.5"
gem "rails-timeago", "~> 2.0"
gem "lodash-rails" # TODO: kill
gem "react_on_rails", "= 5.2.0"
gem "classnames-rails" # TODO: kill

gem "paperclip", "= 4.3.6"
gem "aws-sdk", "< 2.0"
gem "fog-aws", "= 0.9.2"
gem "acts_as_votable", "= 0.10.0"
gem "kaminari", "= 0.16.3"
gem "acts_as_tree", "= 2.4.0"

gem "faker", "= 1.6.3", require: false

# Monitoring / Analytics
gem "skylight"

# SEO
gem "meta-tags", "= 2.1.0"
gem "sitemap_generator", "= 5.1.0"
