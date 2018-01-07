module BlogHelpers

  require "html_truncator"

  # Middleman 4.1.14 is leaving the seperator in the truncation
  def proper_blog_summary(resource, length=180, seperator="READMORE", ellipsis="…")
    rendered = resource.render(layout: false, keep_separator: true)
    seperator_at = rendered.index(seperator)
    length = seperator_at ? seperator_at : length
    doc = Nokogiri::HTML::DocumentFragment.parse(rendered)
    anchors = doc.css('a')
    anchors.each {|a| a.replace(a.children) }
    options = HTML_Truncator::DEFAULT_OPTIONS.merge(length_in_chars: true)
    return doc.truncate(length, options).first
  end

  def image_url_for_blog_article(resource)

    last_dot = resource.url.rindex('.')
    base_path = resource.url[0...last_dot] + '/'
    if resource.data.preview
      if resource.data.preview != 'none'
        return base_path + resource.data.preview
      end
    elsif resource.data.masthead
      return base_path + resource.data.masthead
    end
    return nil
  end
end
