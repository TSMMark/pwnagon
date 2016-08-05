class PagesController < ApplicationController
  include DecksIndex

  def home
    load_decks_index! { |dataset| dataset.not_guest_author }
  end

  def exit_guest_mode
    redirect_to new_user_session_path, notice: "Sign in or create an account to transfer your guest-mode decks into your real account."
  end

  def robots
    env = ENV["ROBOTS"] || "private"
    robots = File.read(File.join(Rails.root, "config/robots.#{env}.txt"))
    render text: robots, layout: false, content_type: "text/plain"
  end

end
