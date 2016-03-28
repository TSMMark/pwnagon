module DecksHelper

  def prepare_decks_for_deck_glances(decks)
    decks.map(&method(:prepare_deck_for_deck_glances))
  end

  def prepare_deck_for_deck_glances(deck)
    {
      id: deck.id,
      name: deck.name,
      authorId: deck.author.id,
      authorName: deck.author.username,
      description: react_truncate(deck.description, length: 350),
      createdAt: deck.created_at.iso8601,
      updatedAt: deck.updated_at.iso8601,
      heroId: deck.hero.id,
      heroName: deck.hero.name,
      heroAvatarUrl: deck.hero.avatar.url(:thumb),
      votesScore: deck.cached_votes_score,
      hotScore: deck.hot_score.to_f, # TODO: this seems fragile because hot_score is only included via scope.
      commentsCount: deck.comments_count
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

  def prepare_cards_for_deck_editor(cards)
    cards.map(&method(:prepare_card_for_deck_editor))
  end

  def prepare_card_for_deck_editor(card)
    {
      id: card.id,
      cost: card.cost,
      name: card.name,
      type: card.type,
      imageUrl: card.image.url(:medium) # TODO: Is this the best size?
    }
  end

  def prepare_comments_for_deck_show(comments)
    comments.map(&method(:prepare_comment_for_deck_show))
  end

  def prepare_comment_for_deck_show(comment)
    {
      id: comment.id,
      createdAt: comment.created_at.iso8601,
      # updatedAt: comment.updated_at.iso8601, # Unused
      authorId: comment.author.id,
      authorName: comment.author.username,
      body: comment.body
    }
  end

end
