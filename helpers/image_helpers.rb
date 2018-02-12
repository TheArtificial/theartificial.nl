module ImageHelpers

  def image_sizes(file_path)
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
    # rescue
    #   warn "Couldn't determine dimensions for image #{file_path}: #{$ERROR_INFO.message}"
    end
    return result
  end

end
