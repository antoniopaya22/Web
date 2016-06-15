(function($) {
	"use strict";
	
	window.onload = function(){
		
		// Variables
		var leftSection			= $("#leftSection");
		var rightSection		= $("#rightSection");
		var loadingPage			= $("#loading_page");
		var options				= $('#style_selector');
		var bio					= $("#bio");
		var social				= $("#social");
		var top					= $("#top");
		var nav					= $("#nav");
		var page				= $("#page");
		var copyright			= $("#copyright");
		var timeFade			= 600;
		
		// Change Menu / Load a new page
		var open = 'no';
		function Menu(newmenu) {
			if (open == 'no') {
				open = 'yes';
				var actMenu = nav.find('li a.active');
				var idMenu = actMenu.attr('href');
				if (newmenu != 0 ) { 
					// Remove all active classes from menu (block other clicks)
					nav.find('li a').removeClass('menu').removeClass('active');
					idMenu = newmenu;
					// If page post (inside blog page)
					if ( newmenu.indexOf("#post-") != -1 ) { newmenu = '#blog'; }
					// Add active class for the selected menu
					$(newmenu).addClass('active');
					// Hide page w/ fadeOut effect
					page.find('.content').fadeOut( timeFade );
				}			
				// Reset page functions
				resetFunctions();			
				// Wait (page is hidden)
				setTimeout( function() {
					// Show selected page w/ fadeIn effect
					page.find(idMenu+'-page').fadeIn( timeFade );					
					// Wait some seconds and load all page functions
					setTimeout(function() { loadFunctions(); }, timeFade);
					// Set open = 'no' again
					open = 'no';
				}, timeFade);
			} else {
				//alert('Ops, wait a moment! Other page is loading right now. Sorry! =)');
			}
		}
		
		// Control the page scroll
		function scrollto( horizontal, vertical ) {
			var pane = $('.scroll-pane');
			var api = pane.data('jsp');
			api.scrollTo( parseInt(horizontal), parseInt(vertical) );
			$('html, body').animate({
				scrollTop: 0
			}, timeFade);
			return false;
		}

		// Reset all functions before change pages
		function resetFunctions() {
			setTimeout( function() {
				// Profile Page - Progress Bars
				$('.progress span').css('width', '0px').removeClass('paddingProgress');

				// Portfolio Page - Categories
				$('#portfolio-page .groups').removeClass('active');
				$('#portfolio-page #allgroups').addClass('active');
				$('#portfolio-thumbs li').fadeIn(100);
				$('#lightbox').remove();

				// Blog Page - Empty Error Div
				$('#errordiv').html('');
			}, timeFade);
		}

		// Load all functions after change pages
		var functionsReady = 0;
		function loadFunctions() {
			// Add class "menu" for menu items (after load the new page)
			// menu items without "menu" class, can't load pages
			nav.find('li a').addClass('menu');

			// Profile Page - Progress Bar
			$('.progress span').each(function() {
				var sizeProgress = $(this).attr('data-size');
				$(this).css('width', sizeProgress);
				$(this).addClass('paddingProgress');
			});

			// Portfolio Page - Lightbox
			// Create lightbox for "All Groups"
			$('#portfolio-thumbs a.group').lightbox();
			
			// Portfolio Page - Choose Categories
			$('#portfolio-page .groups').click(function(){
				var idButton = $(this).attr('id');
				$('#portfolio-page .groups').removeClass('active');
				$(this).addClass('active');
				$('#portfolio-thumbs li').fadeOut(timeFade/4);
				setTimeout(function(){
					$('#portfolio-thumbs li a').each(function(){
						var elemGroup = $(this).attr('data-group');
						var buttonGroup = idButton;
						if ( idButton != 'allgroups' ) {
							if ( buttonGroup == elemGroup ) {
								$(this).parent().fadeIn(timeFade);
							}
						} else {
							$(this).parent().fadeIn(timeFade);
						}
					});
				}, timeFade);					
				// Close lightbox to open again (with the category selected or all)
				$('#lightbox').remove();
				// Dinamic Group
				if ( idButton == 'allgroups' ) {
					// Create lightbox for "All Groups"
					$('#portfolio-thumbs a.group').lightbox();
				} else {
					// Create lightbox for "Selected Group"
					$('#portfolio-thumbs a.'+idButton+'').lightbox();
				}					
			});

			// Scroll Pane - jQuery Plugin
			var pane = $('.scroll-pane');
			pane.jScrollPane({
				// showArrows: true,
				autoReinitialise: true,
				mouseWheelSpeed: 60,
				animateScroll: true,
				maintainPosition: false
			});
			
			if ( functionsReady == 0 ) {
				// Profile Page - Basic jQuery Slider
				var divWidth = $('#image-rotator').width();
				$('#image-rotator').bjqs({
					// w + h to enforce consistency
					width:			divWidth,	// image width
					height:			450,		// image height
					// transition valuess
					animtype:		'fade',		// accepts 'fade' or 'slide'
					animduration:	900,		// length of transition
					animspeed:		7000,		// delay between transitions
					automatic:		true,		// enable/disable automatic slide rotation
					// control and marker configuration
					showcontrols:	true,		// enable/disable next + previous UI elements
					centercontrols:	true,		// vertically center controls
					nexttext:		'<i class="icon-arrow-right"></i>',		// text/html inside next UI element
					prevtext:		'<i class="icon-arrow-left"></i>',		// text/html inside previous UI element
					showmarkers:	false,		// enable/disable individual slide UI markers
					centermarkers:	true,		// horizontally center markers
					// interaction values
					keyboardnav:	true,		// enable/disable keyboard navigation
					hoverpause:		true,		// enable/disable pause slides on hover
					// presentational options
					usecaptions:	true,		// enable/disable captions using img title attribute
					randomstart:	false,		// start from a random slide
					responsive:		true		// enable responsive behaviour
				});
			}
			functionsReady = 1;
		}

		// Pages transition
		$('.menu, article a').click(function(){
			var pagina = $(this).attr('href');
			// If href is diferent than #, there is a link to other page
			if ( pagina != "#" ) { Menu( pagina ); }
		});

		// Height Settings
		var windowWidth		= $(window).width();
		var windowHeight	= $(window).height();
		var defaultPadding	= 30;
		
		// Left Section
		leftSection.animate({ height: windowHeight }, 300, function(){
			loadingPage.fadeOut(timeFade);
			$('.style-toggle.open').trigger('click');

			// Right Section
			rightSection.animate({ height: windowHeight }, 300, function() {
				top.find('.content').fadeIn( timeFade );
				if ( windowWidth < 960 ) { defaultPadding = 20; }
				var contentHeight	= (windowHeight - top.height() - (defaultPadding*2) );
				
				// Page height and fadeIn()
				page.css('height', ''+contentHeight+'px');
				setTimeout(function(){
					page.fadeIn(timeFade*2);
					copyright.animate({ opacity: 1 }, timeFade);
				}, timeFade);
				
				// Main Menu
				var sizeMenu = nav.find('ul li').size();
				var xMenu = 0;
				while (xMenu < sizeMenu) {
					nav.find('ul li a').eq( xMenu ).addClass('marginTop');
					xMenu++;
				}
				Menu(0); // 0 - Initial menu / 1 - Change Menu
			});
			
			// Left Section
			leftSection.find('.content').fadeIn(timeFade, function(){
				social.animate({ opacity: 1 }, timeFade).addClass('bottom');
			});
		});

		// When Resize Window
		var resizing = 'no';
		function resizeWindow(){
			if (resizing == 'no') {
				if ( windowWidth >= 768 ) {
					page.css('height', '360px');
				}

				resizing = 'yes';
				setTimeout(function(){
					// Size Settings
					var WidthWindow		= $(window).width();
					var HeightWindow	= $(window).height();
					if ( WidthWindow < 960 ) { defaultPadding = 20; } else { defaultPadding = 30; }
					var HeightPage		= (HeightWindow - top.height() - (defaultPadding*2) );
					
					if ( $(window).width() >= 768 ) {
						leftSection.css('height', HeightWindow);
						page.css('height', HeightPage);
						rightSection.css('height', HeightWindow);
					} else {
						page.css('height', 'auto');
						rightSection.css('height', 'auto');
					}
					setTimeout(function(){
						resizing = 'no';
					}, timeFade);
				}, timeFade);

			} else {
				console.log('resizing. wait!');
			}
		}
		
		// Contact Page - jQuery Validate (Form)
		// validate signup form on keyup and submit
		$("#contactForm").validate({
			rules: {
				name: {
					required: true,
					minlength: 3
				},
				email: {
					required: true,
					email: true
				},
				subject: "required",
				message: "required"
			},
			messages: {
				name: {
					required: "Please enter your name",
					minlength: "Please enter 3 or more characters"
				},
				email: "Please enter a valid email address",
				subject: "Please enter a valid subject",
				message: "Please enter your message"
			},
			errorPlacement: function(error, element) {
				error.appendTo('#errordiv');
			}
		});

		// Go to top
		$('.to-top').click(function() {
			scrollto(0, 0);
		});

		// Style Selector
		$('.style-toggle.open').click(function(){
			options.removeClass('hideChooser');
			$(this).css('display', 'none');
			$('.style-toggle.close').css('display', 'block');
		});
		$('.style-toggle.close').click(function(){
			options.addClass('hideChooser');
			$(this).css('display', 'none');
			$('.style-toggle.open').css('display', 'block');
		});

		// Change Patterns Style
		$('#style_selector .patterns a').click(function(){
			var pattern = $(this).children('span').attr('class');
			$('body').attr('class', ''+pattern+'');
		});

		// Change Colors Style
		$('#style_selector .colors a').click(function(){
			var color = $(this).children('span').attr('class');
			$('#color').attr('href', 'css/colors/'+color+'.css');
		});

		// Replace the non-retina images to retina images
		if (window.devicePixelRatio > 1) {
			var lowresImages = $('img');
			images.each(function(i) {
				var lowres = $(this).attr('src');
				var highres = lowres.replace(".", "@2X.");
				$(this).attr('src', highres);
			});
		}

		// When resize page
		$(window).resize(function() {
			resizeWindow();
		});
	
	}
})(jQuery);