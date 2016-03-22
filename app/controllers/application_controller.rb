class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :configure_permitted_parameters, if: :devise_controller?


  # When you want to add username and/or name, check out:
  # http://devise.plataformatec.com.br/#strong-parameters

  def all_heroes
    @_all_heroes ||= Hero.all
  end

  helper_method :all_heroes

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
  end
end
