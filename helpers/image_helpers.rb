module ImageHelpers

  def image_sizes(path)
    image_file_path = file_path_for_image(path)
    return image_sizes_for_file(image_file_path)
  end

  def image_sizes_for_file(file_path)
    require 'fastimage'

    result = {width: nil, height: nil}
    # copied from automatic_image_sizes

    begin
      width, height = ::FastImage.size(file_path, raise_on_failure: true)
      # Check for @2x and @3x image
      retina = file_path.match(/@(\d)x\.[a-zA-Z]{3,4}$/)
      if retina
        factor = retina[1].to_i
        width /= factor
        height /= factor
      end
      result[:width]  = width
      result[:height] = height
    rescue FastImage::UnknownImageType
      # No message, it's just not supported
    rescue
      warn "Couldn't determine dimensions for image #{path}: #{$ERROR_INFO.message}"
    end
    return result
  end

  def file_path_for_image(given_path)
    # copied from automatic_image_sizes
    real_path = given_path.dup
    real_path = File.join(app.config[:images_dir], real_path) unless real_path.start_with?('/')
    file_hash = app.files.find(:source, real_path) || app.files.find(:source, real_path.sub(/^\//, ''))
    if file_hash && file_hash[:full_path].exist?
      return file_hash[:full_path].to_s
    else
      return nil
    end
  end

end
