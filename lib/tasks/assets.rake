# Khi deploy trên Render, không cần ghi đè task assets:precompile

# Đảm bảo các assets được build trước khi precompile
if Rake::Task.task_defined?("assets:precompile")
  Rake::Task["assets:precompile"].enhance do
    puts "==> Running custom enhancement for assets:precompile"

    # Chạy yarn build để build JS
    if system("yarn build")
      puts "==> Successfully built JavaScript assets"
    else
      puts "==> Failed to build JavaScript assets"
    end

    # Chạy build:css để compile SCSS
    if system("yarn build:css")
      puts "==> Successfully built CSS assets"
    else
      puts "==> Failed to build CSS assets"
    end
  end
end
