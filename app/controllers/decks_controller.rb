class DecksController < ApplicationController
  before_action :set_deck, only: [:show, :edit, :update, :destroy]

  # GET /decks
  # GET /decks.json
  def index
    @decks = Deck.all
  end

  # GET /decks/1
  # GET /decks/1.json
  def show
  end

  # GET /decks/new
  def new
    @deck = Deck.new
  end

  # GET /decks/1/edit
  def edit
  end

  # POST /decks
  # POST /decks.json
  def create
    @deck = Deck.new(deck_params)

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

  # PATCH/PUT /decks/1
  # PATCH/PUT /decks/1.json
  def update
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

  # DELETE /decks/1
  # DELETE /decks/1.json
  def destroy
    @deck.destroy
    respond_to do |format|
      format.html { redirect_to decks_url, notice: 'Deck was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_deck
      @deck = Deck.find(params[:id])
    end

    def deck_params
      params.require(:deck).permit(:name)
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
