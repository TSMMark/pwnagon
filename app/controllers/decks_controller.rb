class DecksController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  before_action :set_deck, only: [:show, :edit, :update, :destroy]

  def index
    # TODO: Need any authorization here?
    @decks = Deck.limit(30).all
  end

  def random
    random_deck = Deck.limit(1).order("RANDOM()").first
    redirect_to deck_path(random_deck)
  end

  def show
    authorize!(:read, @deck)
  end

  def new
    authorize!(:create, Deck)
    @deck = Deck.new
  end

  def edit
    authorize!(:update, @deck)
  end

  def create
    authorize!(:create, Deck)
    @deck = Deck.new(deck_params.merge(:author_id => current_user.id))

    respond_to do |format|
      if save_deck_with_slots
        format.html { redirect_to @deck, notice: 'Deck was successfully created.' }
        format.json { render :show, status: :created, location: @deck }
      else
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

  private
    def set_deck
      @deck = Deck.find(params[:id])
    end

    def deck_params
      params.require(:deck).permit(:name, :description)
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
