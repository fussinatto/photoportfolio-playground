(function() {

	// Get DOM Objects
	var slides			= $('.project-slide'),
		navButtons		= $('button.project-nav');

	// Constants
	var IS_ACTIVE		= 'is-active',
		CURR_GOING_UP	= 'current-going-up',
		CURR_GOING_DOWN	= 'current-going-down',
		PREV_GOING_UP	= 'prev-going-up',
		PREV_GOING_DOWN	= 'prev-going-down';

	// Variables
	var currSlideIndex,
		currSlide,
		prevSlide;


	// Functions
	function _changeSlides(directionNext) {

		if (slides.length && slides.length > 1) {

			slides.attr('data-role',''); 

			var prevClass;
			var currentClass;

			prevSlide = currSlide;

			if (directionNext) {

				prevClass = PREV_GOING_UP;
				currentClass = CURR_GOING_UP;
				(currSlideIndex < slides.length - 1) ? currSlideIndex++ : currSlideIndex = 0;
			
			} else {

				prevClass = PREV_GOING_DOWN;
				currentClass = CURR_GOING_DOWN;
				(currSlideIndex > 0) ? currSlideIndex-- : currSlideIndex = slides.length - 1;
			}

			prevSlide.attr('data-role',prevClass); 
			currSlide = slides.eq(currSlideIndex).attr('data-role',currentClass);

		}
	}


	function init() {

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
	init();


})();
