require 'mustache'

require 'padrino-helpers'
include Padrino::Helpers::FormatHelpers
include Padrino::Helpers::TagHelpers

require 'helpers/people_helpers'
include PeopleHelpers

module Cards
class Cocktail < Mustache

  TEMPLATE_PATH = 'templates/_cocktail_card.mustache'

  def initialize(app, resource = nil)
    if resource.data.cocktail.nil?
      throw Exception.new("Can't init card for #{resource.path}, no cocktail data found.")
    end
    @app = app
    self.template_file = "source/#{TEMPLATE_PATH}"

    context[:date] = resource.data.cocktail.date.iso8601
    context[:author] = person_name(resource.data.cocktail.author)
    context[:glass_url] = "/cocktails/images/glass/#{resource.data.cocktail.glass}.png"
    context[:contents_url] = "/cocktails/images/contents/#{resource.data.cocktail.contents}.gif"
  end

  def values_hash
    hash = {}
    [ :date,
      :author,
      :glass_url,
      :contents_url
    ].each{|key| hash[key] = context[key]}
    return hash
  end

end
end
