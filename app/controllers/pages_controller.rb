class PagesController < ApplicationController
  def home
    # TODO: pagination.
    @decks = Deck.eager_load(:hero, :author).limit(30).all
  end
end
