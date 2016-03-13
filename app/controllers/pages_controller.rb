class PagesController < ApplicationController
  def home
    # TODO: pagination.
    @decks = Deck.limit(30).all
  end
end
