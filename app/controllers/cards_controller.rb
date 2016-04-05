class CardsController < ApplicationController
  before_action :set_card, only: [:show, :edit, :update, :destroy]

  def index
    # TODO: Need any authorization here?
    @cards = Card.all
  end

  def show
    authorize!(:read, @card)
  end

  def new
    authorize!(:create, Card)
    @card = Card.new
  end

  def edit
    authorize!(:update, @card)
  end

  def create
    authorize!(:create, Card)
    @card = Card.new(card_params.merge(:author_id => current_user.id))

    respond_to do |format|
      if @card.save
        format.html { redirect_to @card, notice: 'Card was successfully created.' }
        format.json { render :show, status: :created, location: @card }
      else
        format.html { render :new }
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    authorize!(:update, @card)
    respond_to do |format|
      if @card.update(card_params)
        format.html { redirect_to @card, notice: 'Card was successfully updated.' }
        format.json { render :show, status: :ok, location: @card }
      else
        format.html { render :edit }
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    authorize!(:destroy, @card)
    @card.destroy
    respond_to do |format|
      format.html { redirect_to cards_url, notice: 'Card was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def set_card
      @card = Card.find(params[:id])
    end

    def card_params
      params.require(:card).permit(:name, :cost, :type, :trigger, :affinity, :rarity, :image) # TODO: :effects => {}
    end
end
