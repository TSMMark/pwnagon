Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  devise_for :users, controllers: {
    sessions: "user_sessions",
    registrations: "user_registrations"
  }

  get "deckbuilder" => "decks#choose_hero", as: :choose_hero_for_new_deck
  get "my_decks" => "decks#mine", as: :my_decks
  get "decks/new/choose_hero" => "decks#choose_hero", as: :deprecated_choose_hero_for_new_deck
  get "decks/new/:hero_id" => "decks#new", as: :new_deck_with_hero
  get "decks/random" => "decks#random", as: :random_deck
  resources :decks do
    post "upvote"
    post "downvote"

    resources :comments, only: [:create]
  end

  resources :cards
  get "exit_guest_mode" => "pages#exit_guest_mode", as: :exit_guest_mode

  # TODO: Cache robots.txt
  get "robots.txt" => "pages#robots"

  root to: "pages#home"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
