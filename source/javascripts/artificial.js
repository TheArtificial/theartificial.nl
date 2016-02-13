// this binds navigation items to items within the body
// thanks https://jsfiddle.net/mekwall/up4nu/
function scrollspy(selector, heightOffset, callback) {
	var	scrollTicking = false;
	var lastId,
	    menu = $(selector),
	    menuItems = menu.find("a"),
	    scrollItems = menuItems.map(function(){
	      var item = $($(this).attr("href"));
	      if (item.length) { return item; }
	    });

	// Bind click handler to menu items so we can get a fancy scroll animation
	menuItems.click(function(e){
	  var href = $(this).attr("href"),
				target = $(href),
	      offsetTop = href === "#" ? 0 : target.offset().top+1;
    $("html, body").stop().animate({
      scrollTop: (offsetTop - heightOffset)
    }, 600);
    e.preventDefault();
	});

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
	  var id = current && current.length ? current[0].id : "";
		// var id = current[0].id;

		if (id && (callback != 'undefined')) {
			var	currentElement = $('#'+id),
					offset = 0;
			if (currentElement.offset()) {
				offset = Math.min((fromTop + heightOffset - currentElement.offset().top) / (currentElement.height()),1.0);
			}
			callback(currentElement, offset);
		}

		// update menu
	  if (lastId !== id) {
			menuItems.parent().removeClass("active");
      lastId = id;
			// find the item that is not .prev or .next and has the right href target
			var currentMenuItem = menuItems.filter('a:not(.next,.prev)[href=#'+id+']');
			currentMenuItem.parent().addClass('active');
			var prevMenuItem = currentMenuItem.parent().prev().find('a:not(.prev)');
			if (prevMenuItem.length > 0) {
				menuItems.filter('.prev').attr('href',prevMenuItem.attr('href')).parent().removeClass('disabled');
			} else {
				console.log("nothing prev", id);
				menuItems.filter('.prev').parent().addClass('disabled');
			}
			var nextMenuItem = currentMenuItem.parent().next().find('a:not(.next)');
			if (nextMenuItem.length > 0) {
				menuItems.filter('.next').attr('href',nextMenuItem.attr('href')).parent().removeClass('disabled');
			} else {
				console.log("nothing next", id);
				menuItems.filter('.next').parent().addClass('disabled');
			}
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

// this filters items
function listfilter() {
	$("select.filter").change(function() {
		var selectedFilters = $.map($("select.filter").toArray(), function(e){
        return $(e).val();
		});
		var filteredFilters = selectedFilters.filter(function(filterItem) {
    	if (filterItem == "all") {
				return false;
			}
			else {
				return true;
			}
    });
		filteredFilters.unshift("div");
		var filterSelector = filteredFilters.join(".");

		$("div#animal-list .col-3").find("div").addClass("filter-off");
    $("div#animal-list .col-3").find(filterSelector).removeClass("filter-off");
	});
}
