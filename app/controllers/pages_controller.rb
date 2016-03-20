class PagesController < ApplicationController
  def home
    # TODO: pagination.
    @decks = Deck
      .select("decks.*")
      .select_hot_score
      .eager_load(:hero, :author)
      .order("hot_score DESC")
      .limit(30)
      .all
  end
end
