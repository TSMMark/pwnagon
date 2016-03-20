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
end
