(function( $ ) {

  // assumes the touch/pointer detection of artificial.utils
  // requires scrollsnap
  // will add pagination dots on touch devices, if no other menu is defined
  // will add prev/next buttons on mouse devices
  // (touch and mouse detection in artificial.utils)

  $.fn.theArtificialCarousel = function( options ) {
    var settings = $.extend( {}, $.fn.theArtificialCarousel.defaults, options );
    var include_ga = settings.ga;

    return this.each(function() {
      var $carousel = $( this );
      var $scrollpane = $carousel.find(settings.scrollingSelector);
      var $slides = $scrollpane.find('.scrolling-wrapper').children();
      var $overlays = $carousel.find(settings.overlaySelector);
      var $menu;

//      var carouselCurrentId = $slides.first().attr('id');
      $overlays.first().addClass('active');

      var proximity = $carousel.width() / 2;

      $scrollpane.scrollsnap({
          direction: 'x',
          snaps: '.scrolling-wrapper li',
          proximity: proximity,
          latency: 200,
          duration: 300,
          easing: 'easeInQuad'
      });

      function addMenu() {
        var $dot = $('<a style="position:relative;left:-50%;margin:0 auto;"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16"><circle cx="8" cy="8" r="4" style="stroke:none"/></svg></a>');
        var $menuList = $('<div class="pagination" style="position:absolute;bottom:4px;left:50%;"/>');
        $slides.each(function(index, slide) {
          $thisDot = $dot.clone();
          $thisDot.attr('data-slide-id', slide.id);
          $menuList.append($thisDot);
        });
        $carousel.prepend($menuList);
        // make first active
        return $menuList;
      }
      if (settings.menu) {
        $menu = $(settings.menu);
      } else if (window.have_touch) {
        $menu = addMenu();
      }

      if ($menu) {
        $menu.children().first().addClass('active');
        // TODO: make them clickable (but scrollsnap doesn't support)
       }

      function addPrevNext() {
        $carousel.prepend('<a class="prev"></a>');
        var $prev = $carousel.find('a.prev');
        $prev.on('click', function(e) {
          $scrollpane.trigger('prev');

          if (include_ga) ga('send', 'event', 'carousel', 'prev-click');
        });

        $carousel.append('<a class="next"></a>');
        var $next = $carousel.find('a.next');
        $next.on('click', function(e) {
          $scrollpane.trigger('next');

          if (include_ga) ga('send', 'event', 'carousel', 'next-click');
        });
      }
      if (window.have_pointer) {
        addPrevNext();
      }
      $(window).on('foundpointer',addPrevNext);


      // this doesn't seem to work
      $carousel.find('.scrolling-wrapper li').on('scrollstart', function() {
        $overlays.removeClass('active');
      });

      $carousel.find('.scrolling-wrapper li').on('scrollstopped', function() {
        $overlays.removeClass('active');
        var $overlay = $(this.dataset.overlay);
        $overlay.addClass('active');

        currentSlideId = this.id;

        if ($menu) {
          $menu.children().each(function(index, element){
            $el = $(element);
            if ($el.data('slideId') === currentSlideId) {
              $el.addClass('active');
            } else {
              $el.removeClass('active');
            }
          });
        }

        if (include_ga) ga('send', 'event', 'carousel', 'slide-view', currentSlideId);
      });

      if (include_ga) {
        $carousel.find(settings.overlay + ' a').on('click', function() {
          ga('send', 'event', 'carousel', 'overlay-click', this.id);
        });
      };

      if (include_ga) {
        $carousel.find(settings.menu + ' a').on('click', function() {
          ga('send', 'event', 'carousel', 'nav-click', this.id);
        });
      };

    });

  };

  $.fn.theArtificialCarousel.defaults = {
    scrollingSelector: '.scrolling',
    overlaySelector: '.overlay',
    menu: '',
    ga: false
  };

}( jQuery ));
