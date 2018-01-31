/** 
 * ===================================================================
 * Main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/* --------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {
      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      }); 
  	})


  	/* --------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */  
  	setTimeout(function() {

   	$('.main-content h1').fitText(.8, { minFontSize: '42px', maxFontSize: '74px' });

  	}, 100);


  	/* --------------------------------------------------- */
	/* lettering js
	------------------------------------------------------ */
	$(".kern-this").lettering(); 


	

   /* --------------------------------------------------- */
	/*  Particle JS
	------------------------------------------------------ */
	$('.main-particulas').particleground({
	    dotColor: '#fff',
	    lineColor: '#555555',
	    particleRadius: 8,
	    curveLines: true,
	    density: 5000,
	    proximity: 150
	});  	
 

})(jQuery);