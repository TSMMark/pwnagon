class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # When you want to add username and/or name, check out:
  # http://devise.plataformatec.com.br/#strong-parameters

  def all_heroes
    @_all_heroes ||= Hero.all
  end

  helper_method :all_heroes
end
