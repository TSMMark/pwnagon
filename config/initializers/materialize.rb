# Disable rails wrapping form fields with error wrapper .field_with_errors
ActionView::Base.field_error_proc = Proc.new do |html_tag, _instance|
  "#{html_tag}".html_safe
end
