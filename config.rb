###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

ANSI_COLOR_RED = "\e[31m"
ANSI_COLOR_RESET = "\e[0m"
ANSI_BOLD_ON = "\e[1m"
ANSI_BOLD_OFF = "\e[22m"

helpers do
  def nav_link(link_text, url, options = {})
    options[:class] ||= ""
    options[:class] << " current" if current_resource.url.start_with?(url)
    link_to(link_text, url, options)
  end

  def person_name(username)
    if username.kind_of?(Array)
      return username.map{|u| person_name u }.join(', ')
    elsif person_page = sitemap.find_resource_by_path("/people/#{username}.html")
      return person_page.data.title
    else
      puts "#{ANSI_COLOR_RED}Unknown person '#{username}'#{ANSI_COLOR_RESET}"
      return "<span class=\"error\">#{username}</span>"
    end
  end


  def link_to_person(username, options = {})
    if username.kind_of?(Array)
      return username.map{|u| link_to_person u }.join(', ')
    elsif person_page = sitemap.find_resource_by_path("/people/#{username}.html")
      return link_to(person_page.data.title, person_page, options)
    elsif username.include? ' '
      return "<span>#{username}</span>"
    else
      puts "#{ANSI_COLOR_RED}Unknown person '#{username}'#{ANSI_COLOR_RESET}"
      return "<span>#{username}</span>"
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

  # this overrides the built-in helper
  # see https://github.com/middleman/middleman/issues/145
  def extra_page_classes
    path_classes = page_classes.split(' ')

    blog_classes = []
    if current_page.data.tags
      blog_classes << current_page.data.tags.split(',').map{|t| "tag-#{t.strip.gsub(/\s+/, '-')}"}
    end
    if current_page.data.category
      blog_classes << "category-#{current_page.data.category.strip.gsub(/\s+/, '-')}"
    end
    classes = path_classes + blog_classes

    return classes.join(' ')
  end

  def artifact_icon(artifact_name)
    path = "work/images/artifact_#{artifact_name}.svg"
    if resource = sitemap.find_resource_by_path(path)
      file = File.open(resource.source_file, 'r')
      return file.read
    else
      puts "#{ANSI_COLOR_RED}Unknown artifact icon #{artifact_name} in #{current_resource.path}#{ANSI_COLOR_RESET}"
      # empty roundrect
      return '<svg title="unknown artifact" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 64 64">
      <path  d="M60,4c1.103,0,2,0.897,2,2v51.9c0,1.103-0.897,2-2,2H4c-1.103,0-2-0.897-2-2V6c0-1.103,0.897-2,2-2H60 M60,3	H4C2.343,3,1,4.343,1,6v51.9c0,1.657,1.343,3,3,3h56c1.657,0,3-1.343,3-3V6C63,4.343,61.657,3,60,3L60,3z"/>'
    end
  end

end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

Time.zone = "Amsterdam"

# serve as HTML by default so we can use the live dev server
# apparently a blog permalink ending with .html isn't obvious enough
::Rack::Mime::MIME_TYPES[''] = 'text/html'

# Blog
activate :blog do |blog|
  blog.prefix = "blog"
  blog.sources = "{year}/{month}-{day}-{title}.html"
  blog.permalink = "{year}/{month}/{day}/{title}.html"
  blog.layout = "blog_layout"
  blog.default_extension = ".md"
  blog.summary_separator = /READMORE/
  blog.paginate = true
#  blog.custom_collections = {
#    author: {
#      link: '/people/{author}.html',
#      template: '/people/template.html'
#    }
#  }
end

helpers do
  # Middleman 4.1.14 is leaving the seperator in the summary
  def proper_blog_summary(article, length=180)
    text = Nokogiri::HTML(article.summary(length, '…')).css('p').text
    return text.split(blog.options.summary_separator).first
  end
end

page "blog/feed.xml", layout: false

set :markdown_engine, :redcarpet
set :markdown,  fenced_code_blocks: true,
                tables: true,
                autolink: true,
                smartypants: true,
                footnotes: true

# Cocktails

data.cocktails.each do |c|
  proxy "/cocktails/#{c.slug}.html", "/cocktails/template.html", locals: { cocktail: c }, ignore: true
end

# Build-specific configuration
configure :development do
  require "better_errors"
  use BetterErrors::Middleware
  BetterErrors.application_root = __dir__
end
configure :build do
  activate :minify_css
  activate :minify_javascript, ignore: 'jquery.artificial.logo.js'
  activate :gzip
  # default_caching_policy public: true, must_revalidate: true

  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

class Projects < Middleman::Extension
  option :directory, 'projects', "Which directory to promote"

  def initialize(app, options_hash={}, &block)
    puts "Initializing projects..."
    super
  end

  def manipulate_resource_list(resources)
    # projects = resources.select{ |r| r.path =~ /^#{options.directory}\// }
    projects = resources.select{ |r| r.path =~ /^projects\// }
    projects.each do |r|
      project_name = r.path.match(/projects\/([^\/]*)\/.*/)[1]
      # puts "Moving #{project_name}: #{r.path}"
      r.destination_path.gsub!(/^projects\//, "")
      if r.ext == '.html'
        r.add_metadata project: project_name
        r.add_metadata options: { layout: 'project_layout' }
      end
    end
    return resources
  end

end
::Middleman::Extensions.register(:projects, Projects)

# Projects
# page "/projects/*", layout: "project_layout"
# page "/projects/*/stylesheets/*", layout: false
activate :projects
