(function () {

	function onNavHover () {

		$(this).prev().toggleClass('is-hovering');
	}

	var navA = $('.nav-main a').hover(onNavHover)

})();