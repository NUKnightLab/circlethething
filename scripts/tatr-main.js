$(document).ready( function () {
	$.getJSON( "./data/annotations.json", function( data ) {

	  var $tatrbox = $('.tatr-box');
	  
	  // DOM manipulation
	  var $baseimg = $(document.createElement('img'))
	  		.addClass('tatr-baseimg')
	  		.attr('src',data.imgsrc);

	  $tatrbox.append($baseimg);

	  var $svgpanel = $(document.createElement('svg'))
	  		.addClass('tatr-annotations');

	  $tatrbox.append($svgpanel);

	  $width = $tatrbox.width();
	  $height = $tatrbox.height();

	  data.annotations.forEach(function(an, idx){
	  	//rectangle
	  	if(an.coords.length==4){
	  		var $rect = $(document.createElement('rect'))
	  			.attr('x',$width*an.coords[0])
	  			.attr('y',$height*an.coords[1])
	  			.attr('width',$width*an.coords[2])
	  			.attr('height',$height*an.coords[3])
	  			.addClass('tatr-shapes');
	  		$svgpanel.append($rect)
	  	}
	  	//circle
	  	else{
	  		var $circle = $(document.createElement('circle'))
	  			.attr('cx',$width*an.coords[0])
	  			.attr('cy',$width*an.coords[1])
	  			.attr('r',$width*an.coords[2])
	  			.addClass('tatr-shapes');

	  		$svgpanel.append($circle);
	  	}
	  });

	  //add text
	  data.annotations.forEach(function(an, idx){
	  	var $text = $(document.createElement('div'))
	  		.html(an.text)
	  		.addClass('tatr-texts');

	  	$svgpanel.append($text);
	  	
	  });
	  
	});
});