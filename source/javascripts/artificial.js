// here we watch the scrolling panels and smoothly update colors
function scrollspy(selector, heightOffset, callback) {
	var	scrollTicking = false;
	var scrollItems = $(selector);

	// Do all the things
	function scrollUpdate() {
		// Get container scroll position
		var fromTop = $(this).scrollTop();

		// Test every scroll item to see if it's in view
		var onScreen = scrollItems.map(function(){
			if ($(this).offset().top <= (fromTop + heightOffset))
				return this;
		});

		// Treat the last one as current
		var current = onScreen[onScreen.length-1];

		if (current && (callback != 'undefined')) {
				var	currentElement = $(current),
						offset = 0;
				if (currentElement.offset()) {
						offset = Math.min((fromTop - currentElement.offset().top) / (currentElement.height()),1.0);
				}
				callback(currentElement, offset);
		}

			scrollTicking = false;
	}

	// For a good explanation of this, see http://www.html5rocks.com/en/tutorials/speed/animations/
	function debounceScroll() {
		if(!scrollTicking) {
				requestAnimationFrame(scrollUpdate);
		}
		scrollTicking = true;
	}

	$(window).scroll(debounceScroll);

}

// this brings up search by typing
function eversearch() {
	// Detect keystroke and present search
	var $searchField = $("#oncall .search .searchbox");

	function hideSearch(skipblur) {
		$("#oncall").css("display","none");
		if (!skipblur) {
			$searchField.blur();
		}
	}

	function showSearch() {
		$("#oncall").css("display","block");
		$searchField.focus();
	}

	$(window).keypress(function(e) {
		if ($(e.target).is('input, textarea')) {
			return;
		}

		var code = e.charCode || e.which;

		switch (code) {
			case 8:
			case 27:
				// do nothing
				break;
			default:
				showSearch();
		}
	});

	$searchField.keydown(function(e) {
		var code = e.charCode || e.which;

		// exit upon esc
		if (code == 27) {
	 		hideSearch();
		}
		// exit upon delete
		if ((code == 8) && !$searchField.val()) {
			hideSearch();
		}
	});

	$searchField.blur(function(e) {
		$searchField.val("");
		hideSearch(true);
	});
}
