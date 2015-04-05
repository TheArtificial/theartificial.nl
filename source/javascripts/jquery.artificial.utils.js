// Living dangerously outside the jQuery namespace.
// Sniffs out presence of touch and/or pointer inputs
function detectInputs() {
  // first assume event handlers mean we have touch input
  window.have_touch = !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
  // then bluntly assume only one input method
  window.have_pointer = !window.have_touch;
  // but react to reality
  if (!window.have_pointer) {
    $(window).one('mousemove', function(e) {
      window.have_pointer = true;
      $(window).trigger('foundpointer');
    });
  }
  if (!window.have_touch) {
    $(window).one('touchstart', function(e) {
      window.have_touch = true;
      $(window).trigger('foundtouch');
    });
  }
}

// always detect inputs
$(document).ready(function(e) {
  detectInputs();
});

(function( $ ) {
  // someday maybe we have some others, here.
}( jQuery ));
