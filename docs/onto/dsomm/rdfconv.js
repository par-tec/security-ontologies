$(document).ready(function() {
    $('.rdf_obj .show_more').click(function() {
	var link = $(this);
	table = $(this).siblings('.full_info');
	table.slideToggle(400, function() {
	    if (table.is(':visible')) {
		link.html('Show less');
	    } else {
		link.html('Show more');
	    }
	})

    });

    $(function() {
      $('a[href*=#]:not([href=#])').click(function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	  var target = $(this.hash);
	  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	  if (target.length) {
	    $('html,body').animate({
	      scrollTop: target.offset().top
	    }, 400);

	    location.hash = this.hash
	    if (!target.children('.full_info').is(':visible')) {
		setTimeout(function() {
		    target.children('.show_more').click();
		}, 400);
	    }

	    return false;
	  }
	}
      });
    });
});
