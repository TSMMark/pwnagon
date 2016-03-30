FactoryGirl.define do
  factory :hero do
    name "Sevarog"
    tagline "Reap what they sow."
    role "jungler"
    type "tank"
    primary "physical-damage"
    attack_type "melee"
    affinities %w[corruption growth]
    avatar { fixture_file_upload(Rails.root.join("public", "images", "heroes", "sevarog_700x490.jpg"), "image/jpg") }
    banner { fixture_file_upload(Rails.root.join("public", "images", "heroes", "headers", "sevarog_1920x1024.jpg"), "image/jpg") }
  end
end
