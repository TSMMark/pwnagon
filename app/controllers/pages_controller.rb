class PagesController < ApplicationController

  def home
    @decks = Deck
      .not_guest_author
      .preload(:hero, :author, :cards)
      .select("decks.*")
      .select_hot_score
      .order("hot_score DESC")
      .page(params[:page] || 1)
      .all
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
