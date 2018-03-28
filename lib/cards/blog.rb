require 'mustache'

require 'padrino-helpers'
include Padrino::Helpers::FormatHelpers
include Padrino::Helpers::TagHelpers

require 'helpers/people_helpers'
include PeopleHelpers

module Cards
class Blog < Mustache

  TEMPLATE_PATH = 'templates/_blog_card.mustache'

  def initialize(app, resource = nil)
    @app = app
    self.template_file = "source/#{TEMPLATE_PATH}"

    @article = resource if resource.is_a?( ::Middleman::Blog::BlogArticle )
    resource.extend ::Middleman::Blog::BlogArticle
    @article = resource

    @preview_image_name = resource.data.preview || resource.data.masthead
    if @preview_image_name
      context[:has_image?] = true
      context[:image_url] = image_url()
    else
      context[:has_image?] = false
    end

    @unpublished = resource.data.published ? false : true

    context[:url] = @article.url
    context[:category] = @article.data.category
    context[:title] = @article.title
    context[:username] = @article.data.author
    context[:author] = person_name(@article.data.author, @app.sitemap)
    context[:date] = @article.date.iso8601
    context[:human_date] = @article.date.strftime('%B %e, %Y')
    context[:summary] = simple_format(strip_tags(@article.summary(180)))

    self.template_file = "source/#{TEMPLATE_PATH}"
  end

  def values_hash
    hash = {}
    [ :has_image?,
      :image_url,
      :url,
      :category,
      :title,
      :username,
      :author,
      :date,
      :summary
    ].each{|key| hash[key] = context[key]}
    return hash
  end

  def unpublished?
    @unpublished
  end

private

  def image_url
    url = @article.url
    last_dot = url.rindex('.')
    return url[0...last_dot] + '/' + @preview_image_name
  end

end
end
