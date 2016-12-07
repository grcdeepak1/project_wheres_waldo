class RenameHighScoreCol < ActiveRecord::Migration[5.0]
  def change
    rename_column :scores, :score, :high_score
  end
end
