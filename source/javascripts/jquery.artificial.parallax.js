(function( $ ) {

  // Makes things scroll funny
  //
  // Usage: $('.parallax').artificialParallax();
  //
  // Options:
  //   background: selector (default: '.parallax-background')
  //   foreground: selector (default: '.parallax-foreground')
  //   friction: slowdown factor (defailt: 10)
  //
  // If foreground element is not found, first non-background child will be used
  // The main element's height will be set to match the foreground

  $.fn.artificialParallax = function( options ) {
    var settings = $.extend({
      background: ".parallax-background",
      foreground: ".parallax-foreground",
      friction: 10
    }, options );

    // Get the viewport dimensions
    var viewportHeight = $(window).height(),
        parallaxItems = [],
        isScrolling = false,
        scrollingTimer = 0;

    this.each(function() {
        var $this = $(this);
        var $background = $this.find(settings.background);
        var $foreground = $this.find(settings.foreground);
        if (! $foreground.length) {
          $foreground = $this.children().not(settings.background).first();
        }
        // images get turned into divs with backgrounds, so we can use "cover"
        if ($background.is('img')) {
          var $backgroundPanel = $(document.createElement('div'));
          $backgroundPanel.css('background-image','url('+$background.attr('src')+')');
          $backgroundPanel.css('background-size','cover');
          $backgroundPanel.css('background-position','center');
          $backgroundPanel.css('background-repeat','no-repeat');
          $this.prepend($backgroundPanel);
          $background.remove();
          $background = $backgroundPanel;
        }

        var height = $foreground.height();
        if (! height) {
          height = $this.height();
        } else {
          $this.height(height);
        }

        $this.css('position', 'relative');
        $this.css('overflow', 'hidden');
        $foreground.css('position', 'relative').css('top',0);
        $background.css('position', 'absolute');
        $background.width('100%');
        var slack = Math.floor((viewportHeight-height)/viewportHeight * settings.friction * 10);
        $background.height(height + slack);
        var parallaxItem = {
            $element: $this,
            element: $this.get(0),
            $background: $background,
            height: height,
            slack: slack
        }

        transformParallaxItem(0, parallaxItem);

        parallaxItems.push(parallaxItem);
    });

    function onScrollEnd() {
        isScrolling = false;
    }

    $(window).on('scroll', function() {
        if( !isScrolling ) {
            isScrolling = true;
            animateParallaxItems();
        }
        clearTimeout(scrollingTimer);
        scrollingTimer = setTimeout(onScrollEnd, 100);
    });

    function transformParallaxItem(index, parallaxItem) {
      var boundingTop = parallaxItem.element.getBoundingClientRect().top;

      var
        height = parallaxItem.height,
        slack = parallaxItem.slack,
        pos = (boundingTop) / (viewportHeight-height), // 0 aligned to top, 1 aligned to bottom
        offset = (pos * slack) << 0; // faster Math.floor

      parallaxItem.$background.css({
          'transform': 'translate3d(0,' + -offset + 'px,0)'
      });
    // hmmm http://blog.tumult.com/2013/02/28/transform-translate-vs-top-left/
    // parallaxItem.$background.css('top',newTop);
    }

    function animateParallaxItems() {
        $.each(parallaxItems, transformParallaxItem);
        if (isScrolling) {
            window.requestAnimationFrame(animateParallaxItems);
        }
    }

    $(window).resize(function(e) {
        viewportHeight = $(window).height();
        animateParallaxItems();
    });

  }

}( jQuery ));
