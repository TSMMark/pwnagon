class UserSessionsController < Devise::SessionsController
  before_action :before_login, only: :create
  after_action :after_login, only: :create

  def before_login
    @guest_user = guest_user
  end

  def after_login
    if @guest_user != current_user
      Pwnagon::Guests.migrate_from_guest_to_user(@guest_user, current_user)
    end
  end

  def after_sign_in_path_for(user)
    if user.decks.any? || Deck.where(author_id: guest_user.id).any?
      my_decks_path
    else
      root_path
    end
  end
end
