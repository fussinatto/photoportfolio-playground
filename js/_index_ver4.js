// INDEX Slides functionality
(function() {

	// Get DOM Objects
	var slides			= $('.project-slide'),
		titles 			= $('.title-nav li'),
		titleWrapper	= $('.title-anim-wrapper'),
		navButtons		= $('button.project-nav');

	// Constants
	var IS_ACTIVE		= 'is-active',
		ON_STAGE		= 'on-stage',
		CURR_GOING_UP	= 'current-going-up',
		CURR_GOING_DOWN	= 'current-going-down',
		PREV_GOING_UP	= 'prev-going-up',
		PREV_GOING_DOWN	= 'prev-going-down',
		ANIM_EASE		= [.75,0,.25,1];
		ANIM_TIME		= 1000,
		TITLE_HEIGHT	= $('.title-nav').height();

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
			
				(currSlideIndex < slides.length - 1) ? currSlideIndex++ : currSlideIndex = 0;
			
			} else {
				
				(currSlideIndex > 0) ? currSlideIndex-- : currSlideIndex = slides.length - 1;
			}

			
			prevSlide = currSlide;
			currSlide = slides.eq(currSlideIndex);
			_animateSlides(directionNext);


			prevTitle = currTitle;
			currTitle = titles.eq(currSlideIndex);
			_animateTitles(directionNext)

		}
	}	

	 // $element.velocity(propertyMap [, duration] [, easing] [, complete])

	function _animateSlides(directionNext) {

		// // Previous slide function
		prevSlide
			.velocity(
			{ 
				translateY: ( directionNext ? -vh : vh )*0.6,
			},
			ANIM_TIME,
			ANIM_EASE, 
			function () { 
				prevSlide.removeClass(ON_STAGE).removeClass(IS_ACTIVE).css('transform', '');
			});


		// Current(incoming) slide function
		currSlide
			.velocity(
			{ 
				translateY: ( directionNext ? vh : -vh ),

			}, 0 )
			.addClass(IS_ACTIVE)
			.velocity({ 
				translateY: 0,
			}, 
			ANIM_TIME, 
			ANIM_EASE, 
			function (el) {

				pauseScroll = false;				
				currSlide.addClass(ON_STAGE).removeClass(IS_ACTIVE);

			});
	}

	function _animateTitles (directionNext) {
		
		prevTitle.removeClass(IS_ACTIVE);
		currTitle.addClass(IS_ACTIVE);

		// titleWrapper.css('top', -currSlideIndex*TITLE_HEIGHT+'px')

	}

	function _handleScroll(e) {

		if( !pauseScroll ){

			//Animate slides - play next (directionNext = true) if scrolling is downwards
			_changeSlides(e.originalEvent.wheelDelta < 0)
			pauseScroll = true;
		}
	}

	function _handleSwipe(event, direction, distance, duration, fingerCount, fingerData) {

		if ( direction === 'down' ) {

			scrollDirectionDown = false;

		} else if ( direction === 'up' ){

			scrollDirectionDown = true;

		} else {
			return false;
		}

		if( !pauseScroll ){
			_changeSlides(scrollDirectionDown);
			pauseScroll = true;
		}

	}


	function _init() {

		if (slides.length) {

			currSlideIndex = 0;
			currSlide = slides.eq(currSlideIndex).addClass(IS_ACTIVE);
			currTitle = titles.eq(currSlideIndex).addClass(IS_ACTIVE);

		}

		// Event Listeners

		navButtons.bind('click', function() {
			_changeSlides($(this).hasClass('next'))
		});

		//TODO: debounce it
		$(window).bind('resize',function () {
			vh = $(window).height();
		})
		$(window).bind('mousewheel', _handleScroll);
		$(window).swipe({ swipe: _handleSwipe });


	}


	// Initial call
	_init();


})();



// TITLE NAV
(function () {
	
})();