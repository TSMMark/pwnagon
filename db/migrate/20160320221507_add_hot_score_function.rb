class AddHotScoreFunction < ActiveRecord::Migration
  # http://inaka.net/blog/2015/03/25/hot-score-with-ruby-postgresql-and-elastic-part-1/
  def up
    execute <<-SQL
      CREATE FUNCTION
        hot_score(ups integer, downs integer, date timestamp with time zone)
        returns numeric as $$
        select round(cast(log(greatest(abs($1 - $2), 1)) * sign($1 - $2) +
          (date_part('epoch', $3) - 1134028003) / 45000.0 as numeric), 7)
      $$ language sql immutable;
    SQL
  end

  def down
    execute "DROP FUNCTION IF EXISTS hot_score(integer, integer, timestamp);"
  end
end
