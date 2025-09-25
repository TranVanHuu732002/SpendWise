class TransactionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_transaction, only: [ :edit, :update, :destroy ]

  def index
    @transactions = current_user.transactions.includes(:category).order(date: :desc)
  end

  def new
    @transaction = current_user.transactions.new
    @categories = current_user.categories
  end

  def create
    @transaction = current_user.transactions.new(transaction_params)
    if @transaction.save
      redirect_to transactions_path, notice: "Tạo giao dịch thành công!"
    else
      @categories = current_user.categories
      render :new
    end
  end

  def edit
    @categories = current_user.categories
  end

  def update
    if @transaction.update(transaction_params)
      redirect_to transactions_path, notice: "Cập nhật giao dịch thành công!"
    else
      @categories = current_user.categories
      render :edit
    end
  end

  def destroy
    @transaction.destroy
    redirect_to transactions_path, notice: "Xóa giao dịch thành công!"
  end

  private
  def set_transaction
    @transaction = current_user.transactions.find(params[:id])
  end

  def transaction_params
    params.require(:transaction).permit(:amount, :description, :date, :category_id)
  end
end
