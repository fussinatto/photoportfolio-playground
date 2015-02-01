// INDEX Slides functionality
(function() {

	// Get DOM Objects
	var	singleSlide	= $('.single-slide'),
	 	slide 			= $('img',singleSlide),
		infoButton		= $('button.info');

	// CONSTANS
	var INFO_CLASS		= 'info-mode',
		WW				= $(window).width(),
		WH				= $(window).height();

	// VARIABLES
	var slideW,
		slideH;

	function handleMousemove (e) {
		
	}

	slide.load(function (e) {

		slideH = e.currentTarget.clientWidth;
		slideW = e.currentTarget.clientHeight;
		console.log(slideH,slideW);

	});

	function _init() {

		infoButton.bind('click', function() {
			console.log();
			singleSlide.toggleClass(INFO_CLASS);
		});

		$(window).bind('mousemove',handleMousemove)
	}


	_init();


})();


