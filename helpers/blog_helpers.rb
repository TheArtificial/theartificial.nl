module BlogHelpers

  # require "html_truncator"

  # Just for search, which can't cast the resource to an article?
  # def blog_summary_html(resource, length=180, seperator="READMORE", ellipsis="…")
  #   doc = blog_summary_nokogiri(resource, length, seperator)
  #   # remove all anchors
  #   anchors = doc.css('a')
  #   anchors.each {|a| a.replace(a.children) }
  #   options = HTML_Truncator::DEFAULT_OPTIONS.merge(length_in_chars: true, ellipsis: ellipsis)
  #   return doc.truncate(length, options).first
  # end

  # def blog_summary(resource, length=180, seperator="READMORE")
  #   doc = blog_summary_nokogiri(resource, length, seperator)
  #   text_untrimmed = doc.inner_text
  # end

  # def blog_summary_nokogiri(resource, length, seperator)
  #   rendered = resource.render(layout: false, keep_separator: true)
  #   seperator_at = rendered.index(seperator)
  #   length = seperator_at ? seperator_at : length
  #   return Nokogiri::HTML::DocumentFragment.parse(rendered)
  # end

  # because BlogData.convert_to_article is private
  def blog_article_for(resource)
    return resource if resource.is_a?( ::Middleman::Blog::BlogArticle )
    resource.extend ::Middleman::Blog::BlogArticle
    # resource.blog_controller = controller
    return resource
  end

  def blog_preview_path(resource)
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

  def blog_masthead_path(resource)
    last_dot = resource.url.rindex('.')
    base_path = resource.url[0...last_dot] + '/'
    if resource.data.masthead
      return base_path + resource.data.masthead
    end
    return nil
  end
end
