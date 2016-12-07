Rails.application.routes.draw do
  root :to => 'photos#waldo'
  get 'waldo' => 'photos#waldo'
  resources :tags, only: [:index, :create, :destroy] do
    collection do
      delete :destroy_all
    end
  end
  resources :scores, only: [:index, :create]
end
