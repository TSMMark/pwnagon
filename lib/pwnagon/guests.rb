module Pwnagon::Guests

  module_function

  def migrate_from_guest_to_user(guest, user)
    return unless guest && user
    Deck.where(author_id: guest.id).update_all(author_id: user.id)
  end

end
