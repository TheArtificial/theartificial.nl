require 'mustache'

require 'padrino-helpers'
include Padrino::Helpers::FormatHelpers
include Padrino::Helpers::TagHelpers

require 'helpers/people_helpers'
include PeopleHelpers

module Cards
class Ftfy < Mustache

  TEMPLATE_PATH = 'templates/_ftfy_card.mustache'

  def initialize(app, resource = nil)
    if resource.data.date.nil?
      throw Exception.new("Can't init card for #{resource.path}, no date found.")
    end
    @app = app
    self.template_file = "source/#{TEMPLATE_PATH}"

    context[:url] = resource.url
    context[:date] = resource.data.date.iso8601
    context[:human_date] = resource.data.date.strftime('%B %e, %Y')
    context[:username] = resource.data.author
    context[:author] = person_name(resource.data.author, @app.sitemap)
    context[:image_url] = "/ftfy/images#{resource.path[/\/.*(?=\..+$)/]}/#{resource.data.thumbnail}"
  end

  def values_hash
    hash = {}
    [ :date,
      :author,
      :image_url
    ].each{|key| hash[key] = context[key]}
    return hash
  end

  def unpublished?
    false
  end

end
end
