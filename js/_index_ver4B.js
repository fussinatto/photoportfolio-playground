// INDEX Slides functionality
'use strict';
(function($) {

	// 'use strict';

	// Get DOM Objects
	var slides = $('.project-slide'),
		titles = $('.title-section li'),
		titleWrapper = $('.title-anim-wrapper');

	// Constants
	var IS_ACTIVE = 'is-active',
		ON_STAGE = 'on-stage',
		ANIM_EASE = [0.75, 0, 0.25, 1],
		ANIM_TIME = 1000;

	// Variables
	var currSlideIndex,
		currSlide,
		prevSlide,
		currTitle,
		prevTitle,
		scrollDirectionDown,
		vh = $(window).height(),
		pauseScroll = false;

	// Functions
	function _changeSlides(directionNext) {

		if (slides.length && slides.length > 1) {


			if (directionNext) {

				if (currSlideIndex < slides.length - 1) {

					currSlideIndex++;

				} else {

					pauseScroll = false;
					return;

				}

				// (currSlideIndex < slides.length - 1) ?  : currSlideIndex = 0;

			} else {

				if (currSlideIndex > 0) {

					currSlideIndex--;

				} else {
					pauseScroll = false;
					return;

				}

				// (currSlideIndex > 0) ?  : currSlideIndex = slides.length - 1;
			}


			prevSlide = currSlide;
			currSlide = slides.eq(currSlideIndex);
			_animateSlides(directionNext);


			prevTitle = currTitle;
			currTitle = titles.eq(currSlideIndex);
			_animateTitles();

		}
	}

	// $element.velocity(propertyMap [, duration] [, easing] [, complete])

	function _animateSlides(directionNext) {

		// // Previous slide function
		prevSlide
			.velocity({
					translateY: (directionNext ? -vh : vh) * 0.6,
				},
				ANIM_TIME,
				ANIM_EASE,
				function() {
					prevSlide.removeClass(ON_STAGE).removeClass(IS_ACTIVE).css('transform', '');
				});


		// Current(incoming) slide function
		currSlide
			.velocity({
				translateY: (directionNext ? vh : -vh),

			}, 0)
			.addClass(IS_ACTIVE)
			.velocity({
					translateY: 0,
				},
				ANIM_TIME,
				ANIM_EASE,
				function() {

					pauseScroll = false;
					currSlide.addClass(ON_STAGE).removeClass(IS_ACTIVE);

				});
	}

	function _animateTitles() {

		prevTitle.removeClass(IS_ACTIVE);
		var titleY = currTitle.addClass(IS_ACTIVE).position().top;
		titleY += currTitle.height()*0.25; // Pauschal
		titleWrapper.css('top', -titleY  + 'px');

	}

	function _handleScroll(e) {

		if (!pauseScroll) {

			//Animate slides - play next (directionNext = true) if scrolling is downwards
			pauseScroll = true;
			_changeSlides(e.originalEvent.wheelDelta < 0);
		}
	}

	function _handleSwipe(event, direction ) {

		if (direction === 'down') {

			scrollDirectionDown = false;

		} else if (direction === 'up') {

			scrollDirectionDown = true;

		} else {
			return false;
		}

		if (!pauseScroll) {
			_changeSlides(scrollDirectionDown);
			pauseScroll = true;
		}

	}

	function resizeImages () {
		var theWindow = $(window),
			wRatio = theWindow.width() / theWindow.height(),
			aspectRatio,
			$img;

		for (var i = 0, j = slides.length; i < j; i++) {

			$img = slides.eq(i).children();

			aspectRatio = $img.width() / $img.height();

			if (wRatio < aspectRatio) {
				$img.attr('data-scaleaxis', 'bgheight');

			} else {

				$img.attr('data-scaleaxis', 'bgwidth');
			}

		}
	}
		// body...


	function _init() {

		if (slides.length) {

			currSlideIndex = 0;
			currSlide = slides.eq(currSlideIndex).addClass(IS_ACTIVE);
			currTitle = titles.eq(currSlideIndex).addClass(IS_ACTIVE);

			$(window).load(function() {
				$(window).resize(resizeImages).trigger('resize');
			});

		}

		// Event Listeners
		//TODO: debounce it
		$(window).bind('resize', function() {
			vh = $(window).height();
		});

		$(window).bind('mousewheel', _handleScroll);
		$(window).swipe({
			swipe: _handleSwipe
		});


	}


	// Initial call
	_init();


})(jQuery);



// MAIN NAV
(function() {

	function handleKeyPress(e) {

		var key = e.keyCode;
	}

	// MAIN NAV
	var IS_MENU_ACTIVE = 'is-menu-active';

	function toggleMainNav() {
		$('body').toggleClass(IS_MENU_ACTIVE);
	}

	$('.main-nav-toggle').bind('click', toggleMainNav);

	$(window).bind('keyup', handleKeyPress);
})();




// SIDEBAR NAV
(function() {

	function onNavHover() {

		$(this).prev().toggleClass('is-hovering');
	}

	var navA = $('.sidebar-nav a').hover(onNavHover);

})();
