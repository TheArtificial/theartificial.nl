require 'mustache'

require 'padrino-helpers'
include Padrino::Helpers::FormatHelpers
include Padrino::Helpers::TagHelpers

require 'helpers/people_helpers'
include PeopleHelpers

module Cards
class Blog < Mustache

  def type
    @preview_image_name ? 'blog_image' : 'blog'
  end

  def initialize(app, resource = nil)
    @app = app

    @article = resource if resource.is_a?( ::Middleman::Blog::BlogArticle )
    resource.extend ::Middleman::Blog::BlogArticle
    @article = resource

    @preview_image_name = resource.data.preview || resource.data.masthead
    if @preview_image_name
      context[:image_url] = image_url()
    end

    context[:url] = @article.url
    context[:category] = @article.data.category
    context[:title] = @article.title
    context[:username] = @article.data.author
    context[:author] = person_name(@article.data.author, @app.sitemap)
    context[:date] = @article.date.strftime('%B %e, %Y')
    context[:summary] = simple_format(strip_tags(@article.summary(180)))

    @template_path = "templates/_card_#{self.type}.mustache"
    self.template_file = "source/#{@template_path}"
  end

private

  def image_url
    url = @article.url
    last_dot = url.rindex('.')
    return url[0...last_dot] + '/' + @preview_image_name
  end

end
end
