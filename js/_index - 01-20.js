(function() {

	// Get DOM Objects
	var slides			= $('.project-slide'),
		navButtons		= $('button.project-nav');

	// Constants
	var IS_ACTIVE		= 'is-active',
		CURR_GOING_UP	= 'current-going-up',
		CURR_GOING_DOWN	= 'current-going-down',
		PREV_GOING_UP	= 'prev-going-up',
		PREV_GOING_DOWN	= 'prev-going-down',
		ANIM_EASE		= [.75,.02,.33,.99];
		ANIM_TIME		= 1000;

	// Variables
	var currSlideIndex,
		currSlide,
		prevSlide,
		vh = $(window).height();

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

		}
	}	

	 // $element.velocity(propertyMap [, duration] [, easing] [, complete])

	function _animateSlides(directionNext) {

		// Previous slide function
		prevSlide.velocity(
			{ 
				translateY: ( directionNext ? -vh : vh )*2,
				translateZ: -vh
			},
			ANIM_TIME,
			ANIM_EASE, 
			function () { 
				$(this[0]).removeClass(IS_ACTIVE).css('transform', ''); 
			}
		);

		// Current(incoming) slide function
		currSlide
			.velocity({ 
				opacity:0,
				translateY: ( directionNext ? vh : -vh ),
				translateZ: vh
			}, 0 )
			.addClass(IS_ACTIVE)
			.velocity({ opacity:1, translateY: 0, translateZ: 0 }, ANIM_TIME, ANIM_EASE  );
	}


	function _init() {

		if (slides.length) {

			currSlideIndex = 0;
			currSlide = slides.eq(currSlideIndex).addClass(IS_ACTIVE);
		}

		// Add Event Listeners
		navButtons.bind('click', function() {
			_changeSlides($(this).hasClass('next'))
		});
	}


	// Initial call
	_init();


})();
