module DecksHelper

  def prepare_decks_for_deck_glances(decks)
    decks.map(&method(:prepare_deck_for_deck_glances))
  end

  def prepare_deck_for_deck_glances(deck)
    {
      id: deck.id,
      name: deck.name,
      authorId: deck.author.id,
      authorName: deck.author.username, # TODO: use username
      description: deck.description,
      createdAt: deck.created_at.iso8601,
      updatedAt: deck.updated_at.iso8601,
      heroId: deck.hero.id,
      heroName: deck.hero.name,
      heroAvatarUrl: deck.hero.avatar.url(:thumb),
      votesScore: deck.cached_votes_score,
      hotScore: deck.hot_score.to_f # TODO: this seems fragile because hot_score is only included via scope.
    }
  end

  def prepare_heroes_for_deck_glances(heroes)
    heroes.map(&method(:prepare_hero_for_deck_glances))
  end

  def prepare_hero_for_deck_glances(hero)
    {
      id: hero.id,
      name: hero.name,
      avatarUrl: hero.avatar.url(:thumb)
    }
  end

end
