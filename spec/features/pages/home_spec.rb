require "rails_helper"

feature "Homepage" do
  scenario "User visits root path" do
    visit "/"

    expect(page).to have_text("Welcome to Pwnagon")
  end
end
