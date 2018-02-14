require "helpers/people_helpers"
# "include" rather than "helpers" so we can use person_name in search prep
include PeopleHelpers

require "helpers/blog_helpers"
require "helpers/image_helpers"
# in this case, we need image_for_blog_article during search indexing
include BlogHelpers
include ImageHelpers

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

ANSI_COLOR_RED = "\e[31m"
ANSI_COLOR_RESET = "\e[0m"

helpers do
  def nav_link(link_text, url, options = {})
    options[:class] ||= ""
    options[:class] << " current" if current_resource.url.start_with?(url)
    link_to(link_text, url, options)
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

  def mustache(path, locals)
		Mustache.render(mustache_template(path), locals)
	end

  def mustache_template(path)
		return File.open("source/#{path}") { |f| f.read }
	end

end

set :site_url, 'https://theartificial.com/'

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

Time.zone = "Amsterdam"

# serve as HTML by default so we can use the live dev server
# apparently a blog permalink ending with .html isn't obvious enough
::Rack::Mime::MIME_TYPES[''] = 'text/html'

# Cocktails
data.cocktails.each do |c|
  metadata = { cocktail: c, title: c.name, author: c.author } # used for locals and for data (for search)
  proxy "/cocktails/#{c.slug}.html", "/cocktails/template.html", locals: metadata, data: metadata, ignore: true, title: "just for search"
end

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

page "blog/feed.xml", layout: false

set :markdown_engine, :redcarpet
set :markdown,  fenced_code_blocks: true,
                tables: true,
                autolink: true,
                smartypants: true,
                footnotes: true

activate :search do |search|

  require 'padrino-helpers'
  include Padrino::Helpers::FormatHelpers
  include Padrino::Helpers::TagHelpers

  search.resources = ['blog/20', 'cocktails/', 'work/', 'ftfy/']
  search.index_path = 'search/index.json'
  search.fields = {
    title:    {boost: 100, store: true, required: true},
    path:     {index: false, store: true},
    tags:     {boost: 100},
    author:   {boost: 10},
    username: {boost: 10},
    date:     {index: false, store: true},
    content:  {boost: 75},
    url:      {index: false, store: true, required: true}
  }

  blog_date = /(?'YYYY'\d{4})[\/-](?'MM'\d{2})[\/-](?'DD'\d{2})/

  search.before_index = Proc.new do |to_index, to_store, resource|
    # discern type by path
    path = resource.path
    to_store[:path] = path
    path_split = path.split('/',2)
    type = path_split.first

    puts("Indexing: #{path}")

    if type == 'blog'
      to_store[:type] = type

      card = Cards.card_for_resource(sitemap.app, resource)
      to_store.merge! card.values_hash

      to_index[:username] = resource.data.author
      to_index[:author] = person_name(resource.data.author)
    elsif type == 'cocktails'
      to_store[:type] = 'cocktail'
      if resource.data.cocktail.nil?
        puts "Not indexing #{resource.path}, no cocktail data found."
        throw(:skip)
      end
      to_store[:date] = resource.data.cocktail.date.iso8601
      to_index[:username] = resource.data.cocktail.author
      to_store[:author] = to_index[:author] = person_name(resource.data.cocktail.author)
      to_store[:glass] = "/cocktails/images/glass/#{resource.data.cocktail.glass}.png"
      to_store[:contents] = "/cocktails/images/contents/#{resource.data.cocktail.contents}.gif"
    elsif type == 'work'
      to_store[:type] = 'work'
      if resource.data.date.nil?
        puts "Not indexing #{resource.path}, no date found."
        throw(:skip)
      end
      to_store[:date] = resource.data.date.iso8601
      to_store[:snippet] = resource.data.snippet
      to_store[:color] = resource.data.color
      to_store[:thumbnail] = "/work/images/#{resource.data.thumbnail}"
    elsif type == 'ftfy'
      to_store[:type] = 'ftfy'
      if resource.data.date
        to_store[:date] = resource.data.date.iso8601
      end
      to_index[:username] = resource.data.author
      to_store[:author] = to_index[:author] = person_name(resource.data.author)
      to_store[:image] = "/ftfy/images#{path[/\/.*(?=\..+$)/]}/#{resource.data.thumbnail}"
    end
  end
end

# Redirects
# note https://github.com/middleman/middleman/issues/2011
# and make sure to set up the host to send 301: http://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-page-redirect.html

redirect "3dsystems.html", to: "/work/3DSystems-consumer.html"
redirect "designfordeath.html", to: "/laboratory/futureofdeath.html"
redirect "travelguide/index.html", to: "/cityguide/"

configure :build do
  activate :minify_css
  activate :minify_javascript, ignore: 'jquery.artificial.logo.js'
  # activate :gzip
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
