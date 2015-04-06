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

helpers do
  def nav_link(link_text, url, options = {})  
    options[:class] ||= ""
    options[:class] << " current" if current_resource.url.start_with?(url)
    link_to(link_text, url, options)
  end
  
  def find_image(base_path)
    if found = sitemap.find_resource_by_path(base_path+'.png')
      return found
    elsif found = sitemap.find_resource_by_path(base_path+'.jpg')
      return found
    else
      return nil
    end
  end
end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

Time.zone = "Amsterdam"

activate :blog do |blog|
  blog.prefix = ""
  blog.sources = "/blog/{year}-{month}-{day}-{title}.html"
  blog.permalink = "/blog/{year}/{month}/{day}/{title}.html"
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
page "/blog/feed.xml", layout: false

set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true,
               :autolink => true, 
               :smartypants => true

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_javascript, ignore: 'jquery.artificial.logo.js'
  activate :gzip
  default_caching_policy public: true, must_revalidate: true

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
