 namespace :git do
  namespace :commits do
    def update_date(commit_hashes, new_time)
      # http://stackoverflow.com/a/454750
      conditions = Array(commit_hashes).map do |commit_hash|
        "[ $GIT_COMMIT = #{commit_hash} ]"
      end.join(" || ")

      command = %Q(
        git filter-branch --env-filter \
          'if #{conditions}
           then
             export GIT_AUTHOR_DATE="#{git_time_format(new_time)}"
             export GIT_COMMITTER_DATE="#{git_time_format(new_time)}"
           fi')

      system(command)
    end

    # http://stackoverflow.com/questions/2016901/viewing-unpushed-git-commits
    #
    # @return [Array]
    # @example
    #   %w[
    #     b9651ead92b79b3165e45e970f54aaa0da1ee1f4
    #     a5c36720db30cb102ef77c5c579a3ac4e1dd4126
    #     j48g9hnw98hg428972hqg8972b4g87iubg478gh4
    #     b3498fh249824g8oh429g824hg2o4ig8h429go82
    #   ]
    def unpushed_commit_hashes
      commit_hashes_separated_by_newlines = `git log @{u}.. --format='%H'`
      commit_hashes_separated_by_newlines.each_line.map(&:strip)
    end

    def valid_commit_hash?(commit_hash)
      true # TODO
    end

    def git_time_format(time)
      time.rfc2822
    end

    desc "Change the GIT_AUTHOR_DATE and GIT_COMMITTER_DATE for a commit"
    task :update_date, [:commit_hash, :new_time] do |_t, args|
      abort("Must specify a commit hash.") if (commit_hash = args[:commit_hash]).empty?
      abort("Must specify a valid time.") unless new_time = args[:new_time].to_time rescue nil
      abort("Invalid commit hash: #{commit_hash.inspect}") unless valid_commit_hash?(commit_hash)

      puts "Updating #{commit_hash.inspect} to #{new_time.inspect} ..."

      if update_date(commit_hash, new_time)
        puts "Success."
      else
        abort("Failed.")
      end
    end

    desc "Change the GIT_AUTHOR_DATE and GIT_COMMITTER_DATE for all local commits that are not on origin"
    task :update_dates_of_all_unpushed, [:new_time] do |_t, args|
      abort("Must specify a valid time.") unless new_time = args[:new_time].to_time rescue nil

      commit_hashes = unpushed_commit_hashes

      puts "Updating #{commit_hashes.count} commits to #{new_time.inspect} ..."

      if update_date(commit_hashes, new_time)
        puts "Success."
      else
        abort("Failed.")
      end
    end
  end
end
