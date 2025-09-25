class CategoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_category, only: [ :edit, :update, :destroy ]

  def index
    @categories = current_user.categories
  end

  def new
    @category = current_user.categories.new
  end

  def create
    @category = current_user.categories.new(category_params)
    if @category.save
      redirect_to categories_path, notice: "Tạo danh mục thành công!"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @category.update(category_params)
      redirect_to categories_path, notice: "Cập nhật danh mục thành công!"
    else
      render :edit
    end
  end

  def destroy
    @category.destroy
    redirect_to categories_path, notice: "Xóa danh mục thành công!"
  end

  private
  def set_category
    @category = current_user.categories.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name)
  end
end
