class Transaction < ApplicationRecord
  belongs_to :category
  belongs_to :user

  # Nếu chưa có gem 'groupdate', hãy thêm vào Gemfile và bundle install
end
