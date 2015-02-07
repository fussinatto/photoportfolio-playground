// INDEX Slides functionality
'use strict';
(function($) {

	// 'use strict';

	// Get DOM Objects
	var slides = $('.project-slide'),
		slideIndxWrapper = $('.slide-indx-wrapper'),
		slideIndx = $('li', slideIndxWrapper),
		navButtons = $('.slide-nav-buttons button'),
		slideInfo = $('.slide-info-wrapper'),
		slideInfoBtn = $('.slide-info-btn');

	// Constants
	var IS_ACTIVE = 'is-active',
		ON_STAGE = 'on-stage',
		ANIM_EASE = [0.75, 0, 0.25, 1],
		ANIM_TIME = 1000,
		IS_HIDDEN = 'is-hidden',
		KEYS = {
			'up': 38,
			'down': 40,
			'left': 37,
			'right': 39
		};

	// Variables
	var currSlideIndex,
		currSlide,
		prevSlide,
		currTitle,
		prevTitle,
		currLink,
		scrollDirectionRight,
		infoTextOn,
		vw = $(window).width(),
		pauseScroll = false;

	// Functions
	function _changeSlides(directionNext) {

		pauseScroll = true;

		if (slides.length && slides.length > 1) {

			if (directionNext) {

				if (currSlideIndex < slides.length - 1) {

					currSlideIndex++;

				} else {

					pauseScroll = false;
					return;

				}

			} else {

				if (currSlideIndex > 0) {

					currSlideIndex--;

				} else {
					pauseScroll = false;
					return;

				}
			}

			changeSlideByIndex(currSlideIndex, directionNext);

		}
	}

	function changeSlideByIndex(index, directionNext) {

		pauseScroll = true;
		currSlideIndex = index;

		// CALL SLIDES CHANGE 
		prevSlide = currSlide;
		currSlide = slides.eq(currSlideIndex);
		_animateSlides(directionNext);

		// CALL TITLE CHANGE
		prevTitle = currTitle;
		currTitle = slideIndx.eq(currSlideIndex);
		_animateTitles();


		if (currSlideIndex === 0) {
			navButtons.eq(0).addClass(IS_HIDDEN);
		}
		if (currSlideIndex === slides.length - 1) {
			navButtons.eq(1).addClass(IS_HIDDEN);
		}
		if (currSlideIndex !== 0 && currSlideIndex !== slides.length - 1){
			navButtons.removeClass(IS_HIDDEN);
		}

	}

	// $element.velocity(propertyMap [, duration] [, easing] [, complete])

	function _animateSlides(directionNext) {

		// // Previous slide function
		prevSlide
			.velocity({
					translateX: (directionNext ? -vw : vw) * 0.2,
				},
				ANIM_TIME,
				ANIM_EASE,
				function() {
					prevSlide.removeClass(ON_STAGE).removeClass(IS_ACTIVE).css('transform', '');
				});


		// Current(incoming) slide function
		currSlide
			.velocity({
				translateX: (directionNext ? vw : -vw),

			}, 0)
			.addClass(IS_ACTIVE)
			.velocity({
					translateX: 0,
				},
				ANIM_TIME,
				ANIM_EASE,
				function() {

					pauseScroll = false;
					//prevSlide.removeClass(ON_STAGE).removeClass(IS_ACTIVE).css('transform', '');
					currSlide.addClass(ON_STAGE).removeClass(IS_ACTIVE);

				});
	}

	function _animateTitles() {

		prevTitle.removeClass(IS_ACTIVE);
		var titleY = currTitle.addClass(IS_ACTIVE).position().top;
		slideIndxWrapper.css('top', -titleY + 'px');

	}


	function _handleScroll(e) {

		if (!pauseScroll && !infoTextOn) {

			//Animate slides - play next (directionNext = true) if scrolling is downwards
			_changeSlides(e.originalEvent.wheelDelta < 0);
		}
	}

	function _handleSwipe(event, direction) {

		if (direction === 'down') {

			scrollDirectionRight = false;

		} else if (direction === 'up') {

			scrollDirectionRight = true;

		} else {
			return false;
		}

		if (!pauseScroll) {
			_changeSlides(scrollDirectionRight);
		}

	}

	function handleInfoClick () {
		if(infoTextOn){
			slideInfo.removeClass(IS_ACTIVE);
		} else {
			slideInfo.addClass(IS_ACTIVE);
		}
		infoTextOn = !infoTextOn;
		
	}

	function resizeImages() {
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


	function _init() {

		if (slides.length) {

			currSlideIndex = currLink = 0;
			currSlide = slides.eq(currSlideIndex).addClass(IS_ACTIVE);
			currTitle = slideIndx.eq(currSlideIndex).addClass(IS_ACTIVE);

			$(window).load(function() {
				$(window).resize(resizeImages).trigger('resize');
			});

		}

		// Event Listeners
		//TODO: debounce it
		$(window).bind('resize', function() {
			vw = $(window).width();
		});

		navButtons.bind('click', function() {

			if (!pauseScroll) {
				_changeSlides($(this).hasClass('btn-next'));
			};
		});


		$(window).bind('mousewheel', _handleScroll);
		$(window).swipe({
			swipe: _handleSwipe
		});

		if(slideInfoBtn.length){

			slideInfoBtn.bind('click',function () {
				handleInfoClick();
			});
		}


	}


	// Initial call
	_init();


	// })(jQuery);



	// // MAIN NAV
	// (function() {

	function handleKeyPress(e) {

		var key = e.keyCode;
		if (!pauseScroll) {

			switch (key) {
				case KEYS.up:
					_changeSlides(false);
					break;
				case KEYS.left:
					_changeSlides(false);
					break;
				case KEYS.down:
					_changeSlides(true);
					break;
				case KEYS.right:
					_changeSlides(true);
					break;
			}
		}
	}

	// MAIN NAV
	var IS_MENU_ACTIVE = 'is-menu-active';

	function toggleMainNav() {
		$('body').toggleClass(IS_MENU_ACTIVE);
	}

	$('.main-nav-toggle').bind('click', toggleMainNav);

	$(window).bind('keyup', handleKeyPress);

})(jQuery);




// SIDEBAR NAV
(function() {

	function onNavHover() {

		$(this).prev().toggleClass('is-hovering');
	}

	var navA = $('.sidebar-nav a').hover(onNavHover);

})();


//Bio Image
(function() {

	var bioImg = $('.bio-img');
	var wRatio = bioImg.width() / bioImg.height();

	var $img = bioImg.eq(0).children();
	var aspectRatio = $img.width() / $img.height();

	if (wRatio < aspectRatio) {
		$img.attr('data-scaleaxis', 'bgheight');

	} else {

		$img.attr('data-scaleaxis', 'bgwidth');
	}



})();
