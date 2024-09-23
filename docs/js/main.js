 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();

	var carousel = function() {
		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

		$('.carousel-speaker').owlCarousel({
			autoplay: true,
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});


	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  $('.checkin_date, .checkout_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});


/* function makeTimer() {

		
		var endTime = new Date("17 November 2023 23:59:59 GMT+01:00");
		endTime = (Date.parse(endTime) / 1000);

		var now = new Date();
		now = (Date.parse(now) / 1000);

		var timeLeft = endTime - now;

		var days = Math.floor(timeLeft / 86400); 
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

		if (hours < "10") { hours = "0" + hours; }
		if (minutes < "10") { minutes = "0" + minutes; }
		if (seconds < "10") { seconds = "0" + seconds; }

		$("#days").html(days + "<span>Days</span>");
		$("#hours").html(hours + "<span>Hours</span>");
		$("#minutes").html(minutes + "<span>Minutes</span>");
		$("#seconds").html(seconds + "<span>Seconds</span>");		

}
*/

// var dates = ["5 December 2023 08:00:00 GMT+01:00", "12 December 2023 08:00:00 GMT+01:00"]; // Add your dates here
var dates = ["20 September 2024 23:59:59 GMT+02:00", "11 October 2024 23:59:59 GMT+02:00", "25 October 2024 23:59:59 GMT+02:00",
			"15 November 2024 23:59:59 GMT+01:00", 
			/* "18 November 2024 16:00:00 GMT+01:00" */
			"25 November 2024 16:00:00 GMT+01:00",
			"2 December 2024 16:00:00 GMT+01:00", "9 December 2024 16:00:00 GMT+01:00"];
var date_texts = ["September 20, 2024 (Friday) - Short description 1", 
				"October 11, 2024 (Friday) - Project 1",
				"October 25, 2024 (Friday) - Short description 2",
				"November 15, 2024 (Friday) - Project 2",
				"November 18, 2024 (Monday) - Presentations day 1",
				"November 25, 2024 (Monday) - Presentations day 2",
				"December 2, 2024 (Monday) - Presentations day 3"
				/* "December 9, 2024 (Monday) - Presentations day 4" */
			];

/* var dates = ["28 November 2023 21:32:00 GMT+01:00", "28 November 2023 21:33:00 GMT+01:00"]				
var date_texts = ["September 22, 2023 (Friday) - Short description 1", 
				"October 13, 2023 (Friday) - Project 1"]; */

dates.sort((a, b) => new Date(a) - new Date(b)); // Sort dates in ascending order
var currentDateIndex = 0;

/* $(document).ready(function() {
    makeTimer();
}); */

function makeTimer() {
    var now = new Date();
    now = (Date.parse(now) / 1000);
	var first_change = true;
	var first_change_last = true;

    if (currentDateIndex < dates.length) {
        var endTime = new Date(dates[currentDateIndex]);
        endTime = (Date.parse(endTime) / 1000);

        var timeLeft = endTime - now;

        if (timeLeft > 0) {
            var days = Math.floor(timeLeft / 86400); 
            var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
            var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

            if (hours < "10") { hours = "0" + hours; }
            if (minutes < "10") { minutes = "0" + minutes; }
            if (seconds < "10") { seconds = "0" + seconds; }

            $("#days").html(days + "<span>Days</span>");
            $("#hours").html(hours + "<span>Hours</span>");
            $("#minutes").html(minutes + "<span>Minutes</span>");
            $("#seconds").html(seconds + "<span>Seconds</span>");
			
			if (currentDateIndex >= 0 && first_change) {
				$("#deadline_text").html(" Until <br><span>next deadline</span>");
				$("#date_text").html(date_texts[currentDateIndex]); 
	
/* 				var element_id = "#v-pills-" + (currentDateIndex + 1) + "-tab";
				$(element_id).addClass("active");
				$(element_id).attr("aria-selected", true);
				var element_id = "#v-pills-" + (currentDateIndex + 1);
				$(element_id).addClass("show active"); */
			}
			first_change = false;
		} else {
				currentDateIndex++;
				// the time left until the current deadline is zero or negative, so we move on to the next one
				$("#deadline_text").html(" Until <br><span>next deadline</span>");
				$("#date_text").html(date_texts[currentDateIndex]); 

/* 				var element_id = "#v-pills-" + (currentDateIndex + 1) + "-tab";
				$(element_id).addClass("active");
				$(element_id).attr("aria-selected", true);
				if (currentDateIndex > 0) {
					var prev_element_id = "#v-pills-" + (currentDateIndex) + "-tab";
					$(prev_element_id).removeClass("active");
					$(prev_element_id).attr("aria-selected", false);
				}

				var element_id = "#v-pills-" + (currentDateIndex + 1);
				$(element_id).addClass("show active");
				if (currentDateIndex > 0) {
					var prev_element_id = "#v-pills-" + (currentDateIndex);
					$(prev_element_id).removeClass("show active");
				} */
				makeTimer();
        }
    } else {
         // console.log("No deadlines left in the semester");
		$("#days").html("");
		$("#hours").html("");
		$("#minutes").html("");
		$("#seconds").html(""); 
		$("#deadline_text").html("<span>No deadlines left</span>");
		$("#date_text").html("Next semester: 2025/26 Fall Term");
/* 		if (first_change_last) {
			$("#v-pills-1-tab").addClass("active");
			$("#v-pills-1-tab").attr("aria-selected", true);
			$("#v-pills-1").addClass("show active");
			var prev_element_id = "#v-pills-" + (dates.length) + "-tab";
			$(prev_element_id).attr("aria-selected", false);
			$(prev_element_id).removeClass("active");
			var prev_element_id = "#v-pills-" + (dates.length);
			$(prev_element_id).removeClass("show active");	
		} */
    }
}

setInterval(makeTimer, 1000);
/* setInterval(function() { makeTimer(); }, 1000); */

$(document).ready(function() {
    activateTabs();
});

function activateTabs() {
    var now = new Date();
    now = (Date.parse(now) / 1000);
	var first_change = true;
	var first_change_last = true;

    if (currentDateIndex < dates.length) {
        var endTime = new Date(dates[currentDateIndex]);
        endTime = (Date.parse(endTime) / 1000);

        var timeLeft = endTime - now;

        if (timeLeft > 0) {
            var days = Math.floor(timeLeft / 86400); 
            var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
            var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

            if (hours < "10") { hours = "0" + hours; }
            if (minutes < "10") { minutes = "0" + minutes; }
            if (seconds < "10") { seconds = "0" + seconds; }

/*             $("#days").html(days + "<span>Days</span>");
            $("#hours").html(hours + "<span>Hours</span>");
            $("#minutes").html(minutes + "<span>Minutes</span>");
            $("#seconds").html(seconds + "<span>Seconds</span>"); */
			
			if (currentDateIndex == 0 && first_change) {
/* 				$("#deadline_text").html(" Until <br><span>next deadline</span>");
				$("#date_text").html(date_texts[currentDateIndex]);  */
	
				var element_id = "#v-pills-" + (currentDateIndex + 1) + "-tab";
				$(element_id).addClass("active");
				$(element_id).attr("aria-selected", true);
				var element_id = "#v-pills-" + (currentDateIndex + 1);
				$(element_id).addClass("show active");
			}
			first_change = false;
		} else {
				currentDateIndex++;
				// the time left until the current deadline is zero or negative, so we move on to the next one
/* 				$("#deadline_text").html(" Until <br><span>next deadline</span>");
				$("#date_text").html(date_texts[currentDateIndex]);  */

				var element_id = "#v-pills-" + (currentDateIndex + 1) + "-tab";
				$(element_id).addClass("active");
				$(element_id).attr("aria-selected", true);
				if (currentDateIndex > 0) {
					var prev_element_id = "#v-pills-" + (currentDateIndex) + "-tab";
					$(prev_element_id).removeClass("active");
					$(prev_element_id).attr("aria-selected", false);
				}

				var element_id = "#v-pills-" + (currentDateIndex + 1);
				$(element_id).addClass("show active");
				if (currentDateIndex > 0) {
					var prev_element_id = "#v-pills-" + (currentDateIndex);
					$(prev_element_id).removeClass("show active");
				}
				makeTimer();
        }
    } else {
         // console.log("No deadlines left in the semester");
/* 		$("#days").html("");
		$("#hours").html("");
		$("#minutes").html("");
		$("#seconds").html(""); 
		$("#deadline_text").html("<span>No deadlines left</span>");
		$("#date_text").html("Next semester: 2024/25 Fall Term"); */
		if (first_change_last) {
			$("#v-pills-1-tab").addClass("active");
			$("#v-pills-1-tab").attr("aria-selected", true);
			$("#v-pills-1").addClass("show active");
			var prev_element_id = "#v-pills-" + (dates.length) + "-tab";
			$(prev_element_id).attr("aria-selected", false);
			$(prev_element_id).removeClass("active");
			var prev_element_id = "#v-pills-" + (dates.length);
			$(prev_element_id).removeClass("show active");	
		}
    }
}




})(jQuery);

