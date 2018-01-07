module BlogHelpers

  # Middleman 4.1.14 is leaving the seperator in the summary
  def proper_blog_summary(article, length=180)
    text = Nokogiri::HTML(article.summary(length, '…')).css('p').text
    return text.split(blog.options.summary_separator).first
  end

  def image_url_for_blog_article(article)

    last_dot = article.url.rindex('.')
    base_path = article.url[0...last_dot] + '/'
    if article.data.preview
      if article.data.preview != 'none'
        return base_path + article.data.preview
      end
    elsif article.data.masthead
      return base_path + article.data.masthead
    end
    return nil
  end
end
