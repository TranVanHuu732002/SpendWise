# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Tạo user mẫu
user = User.find_or_create_by!(email: 'demo@example.com') do |u|
  u.password = 'password'
  u.password_confirmation = 'password'
end

# Tạo danh mục mẫu
category_names = [
  'Ăn uống', 'Di chuyển', 'Giải trí', 'Mua sắm', 'Sức khỏe', 'Giáo dục', 'Du lịch', 'Gia đình', 'Bạn bè', 'Công việc'
]
categories = category_names.map do |name|
  Category.find_or_create_by!(name: name, user: user)
end

# Tạo 30 giao dịch mẫu
30.times do
  Transaction.create!(
    amount: rand(10000..500000),
    description: [
      'Ăn sáng', 'Uống cà phê', 'Mua sách', 'Đi taxi', 'Xem phim', 'Mua quà', 'Khám bệnh', 'Học phí', 'Du lịch cuối tuần', 'Tiệc gia đình', 'Gặp bạn', 'Chi phí công việc'
    ].sample,
    date: Date.today - rand(0..60),
    category: categories.sample,
    user: user
  )
end
