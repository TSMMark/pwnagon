module SeoHelper

  def page_title
    @page_title ||= "Discover awesome Paragon decks"
  end

  def page_description
    @page_description ||= "Paragon deck rankings and stats. Find the best paragon deck. Paragon deck builder to share and discover good Paragon decks."
  end

  # TODO: Reverse in deck show, other places.
  def reverse_meta_title!
    @reverse_meta_title = true
  end

  def reverse_meta_title?
    defined?(@reverse_meta_title) && @reverse_meta_title
  end

end
