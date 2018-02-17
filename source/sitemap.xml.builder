xml.instruct!
xml.urlset 'xmlns' => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  site_url = app.config[:site_url]
  sitemap.resources.select { |page| page.source_file && page.destination_path =~ /\.html/ && page.data.published != false && !page.data.noindex == true }.each do |page|
    xml.url do
      xml.loc URI.join(site_url, page.destination_path)
      xml.lastmod File.mtime(page.source_file).to_time.iso8601
      xml.changefreq page.data.changefreq || "monthly"
      xml.priority page.data.priority || "0.5"
    end
  end
end
