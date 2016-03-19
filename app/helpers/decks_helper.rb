module DecksHelper

  def prepare_decks_for_deck_glances(decks)
    decks.map(&method(:prepare_deck_for_deck_glances))
  end

  def prepare_deck_for_deck_glances(deck)
    {
      id: deck.id,
      name: deck.name,
      authorId: deck.author.id, # TODO: use username
      authorName: deck.author.email, # TODO: use username
      description: deck.description,
      createdAt: deck.created_at.iso8601,
      updatedAt: deck.updated_at.iso8601,
      heroName: deck.hero.name,
      heroAvatarUrl: deck.hero.avatar.url(:thumb)
    }
  end

end
