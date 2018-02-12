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

  def blog_preview_meta(resource, use_placeholders = false)
    if resource.data.preview
      if resource.data.preview == 'none'
        return nil
      else
        return image_meta(resource, resource.data.preview)
      end
    elsif resource.data.masthead
      return image_meta(resource, resource.data.masthead)
    elsif use_placeholders
      return placeholder_meta()
    else
      return nil
    end
  end

  def blog_preview_url(resource)
    if image_paths = blog_preview_meta(resource)
      return image_paths[:absolute_url]
    else
      return nil
    end
  end

  def blog_masthead_url(resource)
    if resource.data.masthead
      base_build_path = attachments_location(resource.destination_path)
      return '/' + base_build_path + resource.data.masthead
    else
      return nil
    end
  end

private

  def placeholder_meta()
    meta = {}
    base_path = 'images/sharing/'
    # base_build_path = '/images/sharing/'

    placeholders = sitemap.resources.select{ |r| r.path[/#{base_path}.*/] }
    resource = placeholders.sample

    meta[:path] = resource.path
    meta[:build_path] = resource.path
    meta[:url] = resource.url.to_s
    meta[:absolute_url] = URI.join(app.config[:site_url], resource.url).to_s
    meta[:width] = 940
    meta[:height] = 492

    return meta
  end

  def image_meta(resource, filename)
    meta = {}
    base_path = attachments_location('source/' + resource.path)
    base_build_path = attachments_location(resource.destination_path)
    begin
      sizes = image_sizes(base_path + filename)
      meta[:path] = base_path + filename
      meta[:build_path] = base_build_path + filename
      meta[:url] = '/' + base_build_path + filename
      meta[:absolute_url] = URI.join(app.config[:site_url], base_build_path + filename).to_s
      meta[:width] = sizes[:width]
      meta[:height] = sizes[:height]
    rescue FastImage::ImageFetchFailure => e # image_sizes can't find a file
      warn "🚨 File not found '#{filename}' for #{resource.path} (looked in #{Dir.pwd}/#{base_path})"
      base_path = 'source/images/'
      base_build_path = '/images/'
      meta[:path] = base_path + filename
      meta[:build_path] = base_build_path + filename
      meta[:url] = '/' + base_build_path + filename
      meta[:absolute_url] = URI.join(app.config[:site_url], base_build_path + filename).to_s
      meta[:width] = 172
      meta[:height] = 136
    end
    return meta
  end
  memoize :image_meta

  def attachments_location(location)
    last_dot = location.rindex('.')
    return location[0...last_dot] + '/'
  end

end
