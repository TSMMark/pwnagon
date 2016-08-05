module DecksIndex
  extend ActiveSupport::Concern

  def load_decks_index!(&block)
    @hero_id = params[:hero_id] && params[:hero_id].to_i
    @decks = Deck
    @decks = @decks.where(:hero_id => @hero_id) if @hero_id
    @decks = yield(@decks) if block_given?

    @decks = @decks
      .preload(:hero, :author, :cards)
      .select("decks.*")
      .select_hot_score
      .order("hot_score DESC")
      .page(params[:page] || 1)
      .all
  end
end
