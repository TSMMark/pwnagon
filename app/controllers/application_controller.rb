class ApplicationController < ActionController::Base
  include SeoHelper

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :configure_permitted_parameters, if: :devise_controller?

  def all_heroes
    @_all_heroes ||= Hero.all
  end
  helper_method :all_heroes


  # https://github.com/CanCanCommunity/cancancan/wiki/Ability-for-Other-Users
  def current_ability
    current_or_guest_user.ability
  end
  delegate :authorize!, to: :current_ability

  # Return true if no user is signed in.
  def user_is_guest?
    !user_signed_in?
  end
  helper_method :user_is_guest?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
    devise_parameter_sanitizer.for(:account_update) << :username
  end

end
