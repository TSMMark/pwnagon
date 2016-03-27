class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:create]
  before_action :set_deck, only: [:create]

  def create
    authorize!(:create, Comment)
    @comment = @deck.comments.new(comment_params.merge(
      :deck_id => @deck.id,
      :author_id => current_user.id
    ))

    respond_to do |format|
      if @comment.save
        # TODO: include hash to link to comment.
        format.html { redirect_to @deck, notice: 'Comment was successfully posted.' }
        format.json { render :show, status: :created, location: @comment }
      else
        format.html { redirect_to @deck, alert: 'You have to type a comment first.' }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  private

    def set_deck
      @deck = Deck.find(params[:deck_id])
    end

    def comment_params
      params.require(:comment).permit(:body)
    end
end
