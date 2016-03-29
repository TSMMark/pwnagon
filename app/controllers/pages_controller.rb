class PagesController < ApplicationController

  def home
    @decks = Deck
      .preload(:hero, :author)
      .select("decks.*")
      .select_hot_score
      .order("hot_score DESC")
      .page(params[:page] || 1)
      .all
  end

  def robots
    env = ENV["ROBOTS"] || "private"
    robots = File.read(File.join(Rails.root, "config/robots.#{env}.txt"))
    render text: robots, layout: false, content_type: "text/plain"
  end

end
