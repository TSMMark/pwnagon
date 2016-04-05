class UserRegistrationsController < Devise::RegistrationsController
  before_action :before_register, only: :create
  after_action :after_register, only: :create

  def before_register
    @guest_user = guest_user
  end

  def after_register
    if @guest_user != current_user
      Pwnagon::Guests.migrate_from_guest_to_user(@guest_user, current_user)
    end
  end
end
