class CommentsController < ApplicationController
  before_action :set_deck, only: [:create]

  def create
    begin
      authorize!(:create, Comment)
    rescue
      return redirect_to new_user_session_path, notice: "You have to sign in before you can post a comment."
    end

    @comment = @deck.comments.new(comment_params.merge(
      :deck_id => @deck.id,
      :author_id => current_or_guest_user.id
    ))

    respond_to do |format|
      if @comment.save
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
