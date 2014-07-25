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

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# activate :livereload

# Methods defined in the helpers block are available in templates
helpers do
    def nav_link(link_text, url, options = {})  
      options[:class] ||= ""
      options[:class] << " current" if current_resource.url.start_with?(url)
      link_to(link_text, url, options)
    end
end

set :css_dir, 'styles'

set :js_dir, 'scripts'

set :images_dir, 'images'

Time.zone = "Amsterdam"

activate :blog do |blog|
  blog.prefix = ""
  blog.sources = "/blog/{year}-{month}-{day}-{title}.html"
  blog.permalink = "/blog/{year}/{month}/{day}/{title}.html"
  blog.layout = "blog-article"
  blog.default_extension = ".md"
  blog.summary_separator = /READMORE/
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
  activate :minify_javascript
  activate :gzip
  default_caching_policy public: true, must_revalidate: true
end

  # we need to enable asset hashing so we can set assets to cache for a long time
  # google performance tools might want the Expires header, explicitly


# sync to S3 with middleman-s3_sync
activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = 'theartificial.nl'
  s3_sync.region                     = 'eu-west-1'
  # see .s3_sync for credentials
  s3_sync.delete                     = true
  s3_sync.after_build                = false
  s3_sync.prefer_gzip                = true
  s3_sync.path_style                 = true
  s3_sync.reduced_redundancy_storage = false
  s3_sync.acl                        = 'public-read'
  s3_sync.encryption                 = false
end
