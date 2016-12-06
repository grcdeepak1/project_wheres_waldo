Rails.application.routes.draw do
  root :to => 'photos#waldo'
  get 'waldo' => 'photos#waldo'
  resources :tags, only: [:index, :create]
end
