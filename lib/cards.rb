require_relative 'cards/blog'

module Cards
  def self.card_for_resource(app, resource)
    path = resource.path
    path_split = path.split('/',2)
    type = path_split.first
    Mustache.view_namespace = Cards
    card_class = Mustache.view_class(type)
    warn "🚨 can't find card for type #{type}" if (card_class == Mustache)
    return card_class.new(app, resource)
  end
end
