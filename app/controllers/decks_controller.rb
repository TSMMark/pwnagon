class DecksController < ApplicationController
  include DecksIndex

  before_action :set_deck, only: [:show, :edit, :update, :destroy, :upvote, :downvote]

  def index
    load_decks_index! { |dataset| dataset.not_guest_author }
  end

  def mine
    load_decks_index! { |dataset| dataset.where(:author_id => current_or_guest_user.id) }
  end

  def random
    random_deck = Deck.limit(1).order("RANDOM()").first
    redirect_to deck_path(random_deck)
  end

  def show
    authorize!(:read, @deck)
    reverse_meta_title!
    @page_title = ["#{@deck.hero.name} Deck by #{@deck.author.username}", @deck.name]
    @page_description = @deck.description
  end

  def choose_hero
    @heroes = all_heroes
    @skip_new_deck_button = true

    reverse_meta_title!
    @page_title = ["Share your deck!", "Paragon Deck Builder"]
    @page_description =
      "Build a Paragon deck for #{@heroes.pluck(:name).join(", ")}"
  end

  def new
    # TODO: hero slug name
    if params[:hero_id]
      authorize!(:create, Deck)
      hero = Hero.find(params[:hero_id])
      @deck = Deck.new(hero: hero)
      @skip_new_deck_button = true

      reverse_meta_title!
      @page_title = ["Paragon Deck Builder", "Share your #{hero.name} deck"]
      @page_description =
        "Build a Paragon deck for #{hero.name}. Share the best #{hero.name} deck you have. Top #{hero.name} decks Paragon."
    else
      redirect_to choose_hero_for_new_deck_path
    end
  end

  def edit
    authorize!(:update, @deck)
    @skip_new_deck_button = true
  end

  def create
    authorize!(:create, Deck)
    @deck = Deck.new(deck_params.merge(:author_id => current_or_guest_user.id))

    respond_to do |format|
      if save_deck_with_slots
        format.html { redirect_to @deck, notice: 'Deck was successfully created.' }
        format.json { render :show, status: :created, location: @deck }
      else
        @skip_new_deck_button = true
        format.html { render :new }
        format.json { render json: @deck.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    authorize!(:update, @deck)
    @deck.assign_attributes(deck_params)

    respond_to do |format|
      if save_deck_with_slots
        format.html { redirect_to @deck, notice: 'Deck was successfully updated.' }
        format.json { render :show, status: :ok, location: @deck }
      else
        @skip_new_deck_button = true
        format.html { render :edit }
        format.json { render json: @deck.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    authorize!(:destroy, @deck)
    @deck.destroy
    respond_to do |format|
      format.html { redirect_to decks_url, notice: 'Deck was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def upvote
    begin
      authorize!(:upvote, @deck)
    rescue
      return redirect_to new_user_session_path, notice: "You have to sign in before you can vote on decks."
    end

    @deck.upvote_from current_or_guest_user

    # TODO: handle errors?
    respond_to do |format|
      format.js
    end
  end

  def downvote
    begin
      authorize!(:downvote, @deck)
    rescue
      return redirect_to new_user_session_path, notice: "You have to sign in before you can vote on decks."
    end

    @deck.downvote_from current_or_guest_user

    # TODO: handle errors?
    respond_to do |format|
      format.js
    end
  end


  private
    def set_deck
      @deck = Deck.find(params[:id] || params[:deck_id])
    end

    def deck_params
      params.require(:deck).permit(:name, :description, :hero_id)
    end

    def deck_card_ids
      params.require(:deck).permit(:card_ids => []).tap do |params|
        params[:card_ids] ||= []
        params[:card_ids].map!(&:to_i).select! { |id| id > 0 }
      end.fetch(:card_ids)
    end

    def save_deck_with_slots
      Deck.transaction do
        Slot.where(:deck_id => @deck.id).delete_all
        deck_card_ids.each do |card_id|
          @deck.slots.build(:card_id => card_id)
        end
        @deck.save!
      end

      true
    rescue ActiveRecord::RecordInvalid
      false
    end
end
