module PeopleHelpers

  ANSI_COLOR_RED = "\e[31m"
  ANSI_COLOR_RESET = "\e[0m"
  ANSI_BOLD_ON = "\e[1m"
  ANSI_BOLD_OFF = "\e[22m"

  def person_name(username, with_sitemap = sitemap)
    if username.kind_of?(Array)
      return username.map{|u| person_name(u, with_sitemap) }.join(', ')
    elsif person_page = with_sitemap.find_resource_by_path("/people/#{username}.html")
      return person_page.data.title
    else
      puts "#{ANSI_COLOR_RED}Unknown person '#{username}'#{ANSI_COLOR_RESET}"
      return "<span class=\"error\">#{username}</span>"
    end
  end

  def link_to_person(username, options = {})
    if username.kind_of?(Array)
      return username.map{|u| link_to_person(u, options) }.join(', ')
    elsif person_page = sitemap.find_resource_by_path("/people/#{username}.html")
      return link_to(person_page.data.title, person_page, options)
    elsif username.include? ' '
      # not really a username, but we'll forgive it for guest authors
      return "<span>#{username}</span>"
    else
      puts "#{ANSI_COLOR_RED}Unknown person '#{username}'#{ANSI_COLOR_RESET}"
      return "<span>#{username.capitalize}</span>"
    end
  end

  def link_to_person_logo(username, options = {})
    if person_page = sitemap.find_resource_by_path("/people/#{username}.html")
      return link_to(get_logo_svg(username), person_page, options)
    else
      puts "#{ANSI_COLOR_RED}Unknown person '#{username}'#{ANSI_COLOR_RESET}"
      return "<span class=\"error\">#{username}</span>"
    end
  end

  def get_logo_svg(name)
    path = "images/logo-#{name}.svg"
    if resource = sitemap.find_resource_by_path(path)
      file = File.open(resource.source_file, 'r')
      return file.read
    else
      return ''
    end
  end

end
