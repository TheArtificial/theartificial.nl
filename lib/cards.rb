require_relative 'cards/blog'

module Cards
  def self.card_for_resource(app, resource, type = '')
    if type.blank?
      path = resource.path
      path_split = path.split('/',2)
      type = path_split.first
    end
    Mustache.view_namespace = Cards
    card_class = Mustache.view_class(type)
    warn "🚨 can't find card for type '#{type}'" if (card_class == Mustache)
    return card_class.new(app, resource)
  end

  def template_for_type(type)
    Mustache.view_namespace = Cards
    card_class = Mustache.view_class(type)
    warn "🚨 can't find template for type '#{type}'" if (card_class == Mustache)

# TODO: Gah, how do we get a template for blog_image without app context?

    return card_class.template
  end
end
