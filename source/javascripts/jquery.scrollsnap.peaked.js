(function ($) {

  /**
   * Underscore.js 1.5.2
   * http://underscorejs.org
   * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   * Underscore may be freely distributed under the MIT license.
   */
  function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function () {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function () {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  }

  $.fn.scrollsnap = function (options) {

    var settings = $.extend({
      'direction': 'y',
      'snaps': '*',
      'proximity': 12,
      'offset': 0,
      'duration': 200,
      'latency': 250,
      'easing': 'swing',
      'onSnapEvent': 'scrollsnap', // triggered on the snapped DOM element
      'onSnap': function ($snappedElement) {}, // callback when an element was snapped
      'onSnapWait': 50, // wait for redundant snaps before firing event / calling callback
      'onStopEvent': 'scrollstopped' // ugly hack to get end-of-scroll elements
    }, options);

    var leftOrTop = settings.direction === 'x' ? 'Left' : 'Top';

    return this.each(function () {

      var scrollingEl = this,
        $scrollingEl = $(scrollingEl);

      // basic scroll stop detection (does nothing about inertia)
      // thanks to http://stackoverflow.com/a/14035162/5610
//      $scrollingEl.scrollStopped = function(callback) {
//        var $this = $(this), self = this;
//        $this.scroll(function(){
//          if ($this.data('scrollTimeout')) {
//            clearTimeout($this.data('scrollTimeout'));
//          }
//          $this.data('scrollTimeout', setTimeout(callback, settings.latency, self));
//        });
//      };


      if (scrollingEl['scroll' + leftOrTop] !== undefined) {
        // scrollingEl is DOM element (not document)
        $scrollingEl.css('position', 'relative');

//        $scrollingEl.scrollStopped(function(){
//          scrollsnap(null);
//        });
//
//        $scrollingEl.bind('scrollStopped', {
//          latency: settings.latency
//          }, function (e) { scrollsnap(e); }
//        );

        // nice to have, but resize fires too often on iOS
        // $(window).on('resize', function(e) { scrollsnap(e); });


        var scrollsnap = function (e) {

          var matchingEl = null,
            matchingDy = settings.proximity + 1;

          $scrollingEl.find(settings.snaps).each(function () {
            var snappingEl = this,
              dy = Math.abs(snappingEl['offset' + leftOrTop] + settings.offset - scrollingEl['scroll' + leftOrTop]);

            if (dy <= settings.proximity && dy < matchingDy) {
              matchingEl = snappingEl;
              matchingDy = dy;
            }
          });

          if (matchingEl) {
            var endScroll = matchingEl['offset' + leftOrTop] + settings.offset,
              animateProp = {};
            animateProp['scroll' + leftOrTop] = endScroll;
            if ($scrollingEl['scroll' + leftOrTop]() != endScroll) {
              $scrollingEl.animate(animateProp, settings.duration, settings.easing, debounce(function () {
                var $matchingEl = $(matchingEl);

                if (settings.onSnap) {
                  settings.onSnap($matchingEl);
                }

                $matchingEl.trigger(settings.onSnapEvent);
              }, settings.onSnapWait));
            }
            // added for reliable triggering for menu update
            // fires too often, but oh well
            // also fires after prev/next events, handily enough
            debounce(function () {
              var $matchingEl = $(matchingEl);
              $(matchingEl).trigger(settings.onStopEvent);
            }, settings.onSnapWait)();
          }
        }






      // inertial sensing cribbed from https://github.com/jquery/jquery-mousewheel/issues/36#issuecomment-67648897
      var lastX  = 0,
          deltas = [null, null, null, null, null, null, null, null, null],
          timer  = null,
          lock   = 0,
          seen   = 0;

      // Search for an inertial peak
      function hasPeak() {
        if (lock > 0) {
          lock--;
          return false;
        }
        if (deltas[0] == null) return false;
        if (
          deltas[0] <  deltas[4] &&
          deltas[1] <= deltas[4] &&
          deltas[2] <= deltas[4] &&
          deltas[3] <= deltas[4] &&
          deltas[5] <= deltas[4] &&
          deltas[6] <= deltas[4] &&
          deltas[7] <= deltas[4] &&
          deltas[8] <  deltas[4]
        ) return true;
        return false;
      }

      // Handle mouse wheel events:
      $scrollingEl.on('scroll', function(e) {
        var currentX = $(this).scrollLeft();
        var delta = currentX - lastX;
        lastX = currentX;

//        console.log(currentX);


        // Check for an inertial peak. And if found, lock the peak
        // checking for 10 more events (decremented in hasPeak on
        // each new event) to prevent the sample window from registering
        // true more than once for each peak.
        if (hasPeak()) {
            lock = 10;
            seen++;
            console.log('Inertial Gesture Found! (' + seen + ' total)');
            debounce(scrollsnap());
        }

        // Otherwise, check for normal mouse wheel events by assuming
        // past and present deltas would be 120 exactly, and skip nulls.
        else if ((deltas[8] == null || deltas[8] == 120) && Math.abs(delta) == 120)
            console.log('Mouse Wheel Event Found!');

        // Shift the deltas backward and add the newest (maintaining the sample window).
        deltas.shift();
        deltas.push(Math.abs(delta));

//        // Clear the notification (demonstration purposes, only).
//        clearTimeout(timer);
//        timer = setTimeout(function() {
//            console.log('Waiting ...');
//        }, 200);
      });












        // added for prev/next buttons
        $scrollingEl.bind('next', function(e) {
          var matchingEl = null,
            matchingDy = settings.proximity + 1;

          $scrollingEl.find(settings.snaps).each(function () {
            var snappingEl = this,
              dy = Math.abs(snappingEl['offset' + leftOrTop] + settings.offset - scrollingEl['scroll' + leftOrTop]);

            if (dy <= settings.proximity && dy < matchingDy) {
              matchingEl = snappingEl;
              matchingDy = dy;
            }
          });

          if (matchingEl) {
            var $matchingEl = $(matchingEl);
            var $nextEl = $matchingEl.next(settings.snaps);
            var nextEl = $nextEl.length ? $nextEl.get(0) : $scrollingEl.find(settings.snaps).get(0);

            var endScroll = nextEl['offset' + leftOrTop] + settings.offset,
              animateProp = {};
            animateProp['scroll' + leftOrTop] = endScroll;
            if ($scrollingEl['scroll' + leftOrTop]() != endScroll) {
              $scrollingEl.animate(animateProp, settings.duration, settings.easing);
            }
          }
        });
        $scrollingEl.bind('prev', function(e) {
          var matchingEl = null,
            matchingDy = settings.proximity + 1;

          $scrollingEl.find(settings.snaps).each(function () {
            var snappingEl = this,
              dy = Math.abs(snappingEl['offset' + leftOrTop] + settings.offset - scrollingEl['scroll' + leftOrTop]);

            if (dy <= settings.proximity && dy < matchingDy) {
              matchingEl = snappingEl;
              matchingDy = dy;
            }
          });

          if (matchingEl) {
            var $matchingEl = $(matchingEl);
            var $prevEl = $matchingEl.prev(settings.snaps);
            var prevEl = $prevEl.length ? $prevEl.get(0) : $scrollingEl.find(settings.snaps).get(-1);

            var endScroll = prevEl['offset' + leftOrTop] + settings.offset,
              animateProp = {};
            animateProp['scroll' + leftOrTop] = endScroll;
            if ($scrollingEl['scroll' + leftOrTop]() != endScroll) {
              $scrollingEl.animate(animateProp, settings.duration, settings.easing);
            }
          }
        });

      }
    });
  };

})(jQuery);
