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


	
	  maskchild = svgpanel.rect(0,0,$width,$height).attr({'id':'maskchild', 'display':'none'});
	
	  //add text
	  data.annotations.forEach(function(an, idx){
	  	var $text = $(document.createElement('div'))
	  		.html(an.text)
	  		.addClass('tatr-text')
	  		.attr('id','text'+idx);

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
			
			circle.attr({
				class:'tatr-shapes',
				id:'shape'+idx,
				'data-index':idx
			})

			// $('#shape'+idx).on('mouseenter',function(){
			// 	removeMasks();
			// 	applyMasks([this]);
			// });

			// $('#shape'+idx).on('mouseleave',function(){
			// 	removeMasks();
			// 	$('#tatr-box').mouseenter();
			// });

			$('#shape'+idx).on('click',socialShareView);
	   	}
	});
	  $('#tatr-box').on('mouseenter', function(){
	  		applyMasks($('.tatr-shapes'));
	  		$('.tatr-text').addClass('active');
	  });
	  $('#tatr-box').on('mouseleave',removeMasks);
	  //applyMasks($('.tatr-shapes'));
	});
});

function socialShareView(){
	console.log('social');
	
	removeMasks();
	applyMasks([this]);
	var text = $('#text'+$(this).data('index'))[0].innerHTML;

	$('.social').innerHTML(text);

	//calculate text position
	var $heightpc= $(this).attr('top')/$height;

	if($heightpc<0.5){
		$('.social').innerHTML(text)
		.css('top',$height*.8+'px')
		.css('left', '10%');
	}
	else{
		$('.social').innerHTML(text)
		.css('top',$height*.3+'px')
		.css('left', '10%');
	}
}
function removeMasks(){
	$('#maskchild').css('display','none');
	$('.tatr-text').removeClass('active');
}
function applyMasks(objList){
				maskparent = svgpanel.rect(0,0,$width,$height);
				$('#maskchild').css('display','block');

				var group = svgpanel.group();
				group.append(maskparent);

				for(var i=0;i<objList.length;i++){
					var shape = svgpanel.circle(
						$(objList[i]).attr('cx'), 
						$(objList[i]).attr('cy'),
						$(objList[i]).attr('r')
					).appendTo(group);

					$('#text'+$(objList[i]).data('index')).addClass('active');
				}

				//var masks = svgpanel.group(maskparent, shape);
				
				var filter= svgpanel.filter(Snap.filter.blur(30));
				maskchild.attr({
					fill:'#fff'
				});

	 			maskparent.attr({
	 				display:'block',
	 				fill:'#fff',
	 				'fill-opacity': 0.5
	 			});

				maskchild.attr({
					'filter':filter,
				    'mask': group
				});

	 			//$('.tatr-shapes').css('visibility','hidden');
	  		}