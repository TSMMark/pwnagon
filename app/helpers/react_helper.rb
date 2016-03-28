module ReactHelper

  def react_truncate(text, options = {}, &block)
    options[:escape] ||= false
    truncate(text, options, &block)
  end

end
