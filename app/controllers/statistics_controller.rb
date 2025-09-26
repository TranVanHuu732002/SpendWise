class StatisticsController < ApplicationController
  before_action :authenticate_user!

  def index
    @total_amount = current_user.transactions.sum(:amount)
    @category_stats = current_user.transactions.joins(:category)
      .group("categories.name")
      .sum(:amount)
    @monthly_stats = current_user.transactions
      .group_by_month(:date, format: "%m/%Y")
      .sum(:amount)
    @yearly_stats = current_user.transactions
      .group_by_year(:date, format: "%Y")
      .sum(:amount)
  end
end
