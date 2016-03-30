FactoryGirl.define do
  factory :user do
    username { Faker::Name.name }
    email { Faker::Internet.email }
    password { Faker::Internet.password(12) }
  end
end
