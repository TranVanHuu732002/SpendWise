class StatisticsController < ApplicationController
  require "prawn"
  require "csv"
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

    Rails.logger.info "Monthly stats: #{@monthly_stats.inspect}"
    Rails.logger.info "Yearly stats: #{@yearly_stats.inspect}"

    respond_to do |format|
      format.html # Render the default HTML template
      format.csv do
        if params[:type].blank?
          render plain: "Tham số loại báo cáo bị thiếu. Vui lòng chọn một loại: categories, monthly, yearly.", status: :bad_request
        else
          case params[:type]
          when "categories"
            export_csv(@category_stats, "Danh mục", "bao_cao_danh_muc.csv")
          when "monthly"
            export_csv(@monthly_stats, "Tháng", "bao_cao_thang.csv")
          when "yearly"
            export_csv(@yearly_stats, "Năm", "bao_cao_nam.csv")
          else
            render plain: "Loại báo cáo không hợp lệ. Vui lòng chọn một trong các loại: categories, monthly, yearly.", status: :bad_request
          end
        end
      end
    end
  end

  private

  def export_csv(data, label, filename)
    bom = "\xEF\xBB\xBF" # UTF-8 BOM
    csv_data = CSV.generate(headers: true) do |csv|
      csv << [ "Loại thống kê", label, "Số tiền" ]
      data.each do |key, amount|
        csv << [ label, key, amount ]
      end
    end
    send_data bom + csv_data, filename: filename, type: "text/csv; charset=utf-8", disposition: "attachment"
  end
end
