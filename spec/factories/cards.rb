FactoryGirl.define do
  factory :card do
    author { create(:user) }
    name { Faker::Commerce.product_name }
    image nil
    effects({
      energy_damage: "75.8",
      damage_bonus: "100%",
      unique_passive: "+300% Damage Vs Structures to Minions"
    })
    type "PrimeHelix"
    trigger nil
    affinity "universal"
  end
end
