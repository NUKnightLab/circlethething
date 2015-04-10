$(document).ready( function () {
	$.getJSON( "./data/annotations.json", function( data ) {

	  var $tatrbox = $('#tatr-box');
	  
	  // DOM manipulation
	  var $baseimg = $('.tatr-baseimg')
	  		.attr('src',data.imgsrc);

	  $width = $tatrbox.width();
	  $height = $tatrbox.height();

	  svgpanel = Snap('#tatr-annotations');

	  svgpanel.attr({
	  	height: $height,
	  	width: $width
	  });

	data.annotations.forEach(function(an, idx){
	  	//rectangle
	  	if(an.coords.length==4){
			var rect = svgpanel.rect($width*an.coords[0],$height*an.coords[1],$width*an.coords[2],$height*an.coords[3]);
	  		rect.attr({
	  			class : 'tatr-shapes'
	  		})
	  	}
	  	//circle
	  	else{
			var circle = svgpanel.circle($width*an.coords[0],$height*an.coords[1],$width*an.coords[2]);
	  	}
	  });

	  //add text
	  data.annotations.forEach(function(an, idx){
	  	var $text = $(document.createElement('div'))
	  		.html(an.text)
	  		.addClass('tatr-text');

	  	if(an.coords.length==4){
	  		$text
	  		.css('top',$height*an.coords[1]+$height*an.coords[3]+'px')
	  		.css('left',$width*an.coords[0]+'px');
	  	}
	  	else{
	  		$text
	  		.css('top',$height*an.coords[1]+$width*an.coords[2]+'px')
	  		.css('left',$width*an.coords[0]-$width*an.coords[2]+'px');
	  	}

	  	$('#tatr-texts').height($height).append($text);


	  	
	  });
	  
	});
});