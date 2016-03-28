module ApplicationHelper

  def html_newlines(text)
    text.gsub(/(\r)?\n/, "<br/>")
  end

end
