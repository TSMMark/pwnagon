class Ability
  include CanCan::Ability

  C = :create.freeze
  R = :read.freeze
  U = :update.freeze
  D = :destroy.freeze
  CRUD = [C, R, U, D].freeze
  CUD = [C, U, D].freeze
  CR = [C, R].freeze
  UD = [U, D].freeze

  def initialize(user)
    @user = user

    rules_for_decks
    rules_for_cards
    rules_for_comments

    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end

  private

  def rules_for_decks
    if @user
      can([:upvote, :downvote], Deck) unless @user.guest?

      if @user.admin?
        can(CRUD, Deck)
      else
        can(CR, Deck)
        can(UD, Deck, :author_id => @user.id)
      end
    else
      can(R, Deck)
    end
  end

  def rules_for_cards
    if @user && @user.admin?
      can(CRUD, Card)
    else
      can(R, Card)
    end
  end

  def rules_for_comments
    can(R, Comment) # Unused, but accurate.

    if @user && !@user.guest?
      can(C, Comment)
    end
  end

end
