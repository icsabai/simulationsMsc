(function($) {

	"use strict";

	var fullHeight = function() {
		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function() {
			$('.js-fullheight').css('height', $(window).height());
		});
	};
	fullHeight();

	// navbar background once the hero is scrolled past
	var scrollWindow = function() {
		$(window).scroll(function() {
			var st = $(this).scrollTop(),
					navbar = $('.ftco_navbar');

			if (st > 150) {
				if (!navbar.hasClass('scrolled')) {
					navbar.addClass('scrolled');
				}
			} else {
				if (navbar.hasClass('scrolled')) {
					navbar.removeClass('scrolled');
				}
			}
		});
	};
	scrollWindow();

	// fade sections in as they scroll into view
	var contentWayPoint = function() {
		$('.ftco-animate').waypoint(function(direction) {
			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
				var el = $(this.element);
				el.addClass('item-animate');
				setTimeout(function() {
					var effect = el.data('animate-effect');
					if (effect === 'fadeIn') {
						el.addClass('fadeIn ftco-animated');
					} else if (effect === 'fadeInLeft') {
						el.addClass('fadeInLeft ftco-animated');
					} else if (effect === 'fadeInRight') {
						el.addClass('fadeInRight ftco-animated');
					} else {
						el.addClass('fadeInUp ftco-animated');
					}
					el.removeClass('item-animate');
				}, 50);
			}
		}, { offset: '95%' });
	};
	contentWayPoint();

	// smooth in-page scrolling
	var OnePageNav = function() {
		$("#ftco-nav ul li a[href^='#']").on('click', function(e) {
			e.preventDefault();
			var hash = this.hash,
					navToggler = $('.navbar-toggler');

			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 700, 'easeInOutExpo', function() {
				window.location.hash = hash;
			});

			if (navToggler.is(':visible')) {
				navToggler.click();
			}
		});
	};
	OnePageNav();

})(jQuery);
