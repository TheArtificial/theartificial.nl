require_relative 'cards/blog'
require_relative 'cards/cocktail'
require_relative 'cards/ftfy'
require_relative 'cards/work'
require_relative 'cards/person'
require_relative 'cards/unknown'

module Cards

  def self.card_for_resource(app, resource)
    path = resource.path
    path_split = path.split('/',2)
    type = path_split.first

    type = 'cocktail' if type == 'cocktails'
    type = 'person' if type == 'people'

    Mustache.view_namespace = Cards
    card_class = Mustache.view_class(type)
    if (card_class == Mustache)
      warn "🚨 can't find card for type '#{type}'"
      card_class = Cards::Unknown
    end
    return card_class.new(app, resource)
  end

  def self.template_for_type(type)
    Mustache.view_namespace = Cards
    card_class = Mustache.view_class(type)
    if (card_class == Mustache)
      warn "🚨 can't find card for type #{type}" if (card_class == Mustache)
      card_class = Cards::Unknown
    end
    template_path = card_class::TEMPLATE_PATH
    return File.open("source/#{template_path}") { |f| f.read }
  end

end
