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





var delta = function(lastValue, newValue) {
  var deltaValue = lastValue - newValue;
  lastValue = newValue;
  return deltaValue;
};
var lastY = 0;





// the @jdart method from https://github.com/jquery/jquery-mousewheel/issues/36#issuecomment-50504818

function averageChange(arr) {
  var change_sum = 0,
    avg = null,
    i = 1;
  for (; i < arr.length; i++) {
    change_sum += (arr[i] - arr[i-1]);
  }
  avg = change_sum / arr.length;
  return avg;
}

var snaptest = function(_wait)
{
    var waitEnd = new Date(0),
        lastState = 'decel',
        deltaHistory = [],
        lastY = 0;
    return function(event) {
        var context = this,
            args = arguments,
            now = new Date(),
            deltaAverage,
            currentY = $(event.target).scrollLeft(),
            deltaY = currentY - lastY;
        lastY = currentY;

        deltaHistory.push(Math.abs(deltaY));
        deltaHistory = deltaHistory.slice(-10);
        deltaAverage = averageChange(deltaHistory);

        if (now.getTime() < waitEnd.getTime())
            return;

        if (deltaAverage > 1 && lastState !== 'accel') {
            lastState = 'accel';
            waitEnd = new Date(now.getTime() + _wait);
            snap( deltaY<0 ? 'left' : 'right' );

        } else if (deltaAverage <= 1 && lastState !== 'decel') {

            lastState = 'decel';
            waitEnd = new Date(now.getTime() + _wait);
        }
    }
};


function snap(direction) {
  console.log('snapping ' + direction);
  $scrollingEl.trigger(direction);
//  scrollsnap(null);
}









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



        $scrollingEl.css('position', 'relative');

//        $scrollingEl.scrollStopped(function(){
//          scrollsnap(null);
//        });

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






        $scrollingEl.scroll(snaptest(2000));









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



        $scrollingEl.bind('left', function(e) {
          // TODO
          console.log('animate to the prev slide');
        });
        $scrollingEl.bind('right', function(e) {
          // TODO
          console.log('animate to the next slide');
        });


    });
  };

})(jQuery);
