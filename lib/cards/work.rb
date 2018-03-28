require 'mustache'

require 'padrino-helpers'
include Padrino::Helpers::FormatHelpers
include Padrino::Helpers::TagHelpers

require 'helpers/people_helpers'
include PeopleHelpers

module Cards
class Work < Mustache

  TEMPLATE_PATH = 'templates/_work_card.mustache'

  def initialize(app, resource = nil)
    if resource.data.date.nil?
      throw Exception.new("Can't init card for #{resource.path}, no date found.")
    end
    @app = app
    self.template_file = "source/#{TEMPLATE_PATH}"

    context[:url] = resource.url
    context[:title] = resource.data.title
    context[:date] = resource.data.date.iso8601
    context[:human_date] = resource.data.date.strftime('%B %e, %Y')
    context[:snippet] = resource.data.snippet
    context[:color] = resource.data.color
    context[:thumbnail_url] = "/work/images/#{resource.data.thumbnail}"
  end

  def values_hash
    hash = {}
    [ :title,
      :date,
      :snippet,
      :color,
      :thumbnail_url
    ].each{|key| hash[key] = context[key]}
    return hash
  end

  def unpublished?
    false
  end

end
end
