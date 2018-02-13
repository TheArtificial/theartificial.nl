module CardHelpers
  require 'lib/cards/blog_article_card'

  def render_card(resource)
    path = resource.path
    path_split = path.split('/',2)
    section = path_split.first
    Mustache.view_namespace = Cards
    case section
    when 'blog'
      card_class = Mustache.view_class('BlogArticleCard')
    when 'work'
    when 'cocktails'
    when 'ftfy'
    else
      throw "wtf"
    end
    card_class.new(sitemap.app, resource).render
  end

end
