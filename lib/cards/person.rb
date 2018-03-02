require 'mustache'

require 'padrino-helpers'
include Padrino::Helpers::FormatHelpers
include Padrino::Helpers::TagHelpers

require 'helpers/people_helpers'
include PeopleHelpers

module Cards
class Person < Mustache

  TEMPLATE_PATH = 'templates/_person_card.mustache'

  def initialize(app, resource = nil)
    if resource.data.title.nil?
      throw Exception.new("Can't init card for #{resource.path}, no name found.")
    end
    @app = app
    self.template_file = "source/#{TEMPLATE_PATH}"

    username = resource.path.split('/').last.gsub(/.html$/, '')

    context[:url] = resource.url
    context[:date] = resource.data.date.iso8601
    context[:human_date] = resource.data.date.strftime('%B %e, %Y')
    context[:title] = resource.data.title
    context[:logo_svg] = get_logo_svg(username, app.sitemap)
  end

  def values_hash
    hash = {}
    [ :date,
      :title
    ].each{|key| hash[key] = context[key]}
    return hash
  end

end
end
