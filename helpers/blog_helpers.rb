require 'memoist'

module BlogHelpers
  extend Memoist

  # because BlogData.convert_to_article is private
  def blog_article_for(resource)
    return resource if resource.is_a?( ::Middleman::Blog::BlogArticle )
    resource.extend ::Middleman::Blog::BlogArticle
    # resource.blog_controller = controller
    return resource
  end

  def blog_preview_paths(resource)
    if resource.data.preview
      if resource.data.preview != 'none'
        return paths(resource, resource.data.preview)
      end
    elsif resource.data.masthead
      return paths(resource, resource.data.masthead)
    end
  end

  def blog_preview_url(resource)
    if image_paths = blog_preview_paths(resource)
      return image_paths[:url]
    else
      return nil
    end
  end

  def blog_masthead_url(resource)
    if resource.data.masthead
      base_build_path = attachments_location(resource.destination_path)
      return base_build_path + resource.data.masthead
    else
      return nil
    end
  end

private

  def paths(resource, filename)
    paths = {path: nil, built_path: nil, url: nil}
    base_path = attachments_location('/' + resource.path)
    base_build_path = attachments_location(resource.destination_path)
    paths[:path] = base_path + filename
    paths[:build_path] = base_build_path + filename
    paths[:url] = URI.join(app.config[:site_url], base_build_path + filename).to_s
    return paths
  end
  memoize :paths

  def attachments_location(location)
    last_dot = location.rindex('.')
    return location[0...last_dot] + '/'
  end

end
