class AddAttachmentAvatarBannerToHeroes < ActiveRecord::Migration
  def self.up
    change_table :heroes do |t|
      t.attachment :avatar
      t.attachment :banner
    end
  end

  def self.down
    remove_attachment :heroes, :avatar
    remove_attachment :heroes, :banner
  end
end
