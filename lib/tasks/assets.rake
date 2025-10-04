# Override the default assets:precompile task
Rake::Task["assets:precompile"].clear if Rake::Task.task_defined?("assets:precompile")

namespace :assets do
  desc "Precompile assets without running css:build"
  task precompile: :environment do
    # Skip the CSS bundling task but still include the assets that were already built
    puts "==> Running custom assets:precompile without CSS bundling"

    # Run the Rails assets:precompile:primary task which compiles assets using sprockets
    Rake::Task["assets:environment"].invoke
    Rake::Task["assets:precompile:primary"].invoke
  end
end
