module CardsHelpers
  require 'lib/cards'

  def render_card(resource)
    return Cards.card_for_resource(sitemap.app, resource).render
  end

end
