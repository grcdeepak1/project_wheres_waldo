Rails.application.routes.draw do
  root :to => 'photos#waldo'
  get 'waldo' => 'photos#waldo'
end
