module CardsHelpers
  require 'lib/cards'

  def render_card(resource)
    return Cards.card_for_resource(sitemap.app, resource).render
  end

  def render_cards(cards, sort_by = :date)

    if config[:environment] != :development
      # Modifying in-place like this is bad form, but oh well
      cards.reject!{|c| c.class == Cards::Unknown}
    end

    case sort_by
    when :date
      cards.sort_by{|c| c.context[:date]}.collect{|c| c.render}.reverse.join.html_safe
    else
      cards.each{|c| c.render}
    end
  end

  def cards_for_resources(resources = [])
    resources.map{|r| Cards.card_for_resource(sitemap.app, r)}
  end

  def cards_for_author(query = '')
    resources = sitemap.resources.select{|r| r.data.author == query}
    cards_for_resources(resources)
  end

  def all_the_cards()
    resources = sitemap.resources.select{|r| page?(r)}
    cards_for_resources(resources)
  end

private

  def page?(resource)
    resource.path.end_with?('.html') && !resource.binary? && !resource.is_a?(Middleman::Sitemap::Extensions::RedirectResource) && !resource.data.noindex == true && !resource.data.nofeed == true
  end

end
