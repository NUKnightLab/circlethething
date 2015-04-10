var ractive, tatrs;

tatrs = [
	{note: 'Macaroni salad', calories: '1,000 calories of mayonaise goodness', xpos: 26, ypos: 69, radius: 5.5, visible: 5},
	{note: 'Home Fries', calories: 'Way too many', xpos: 75, ypos: 60, radius: 5.5, visible:2},
	{note: 'Baked Beans', calories: "Don't worry. These are magical calories.", xpos: 50, ypos: 80, radius: 5.5, visible:3},
	{note: '"Red Hots" with the works.', calories: 'Enough to clog three arteries.', xpos: 65, ypos: 30, radius: 5.5, visible:4},
	{note: 'The Rochester Garbage Plate', calories: 'My heartache.', xpos: 50, ypos: 50, radius: 5.5, visible:6}
];

var ractive = new Ractive({
  el: '#tatr-box',
  template: '#template',

  // Here, we're passing in some initial data
  data: { 
  	tatr: tatrs,
  	'tatrOpacity': 1,
  	'mask': 0,
  	'visible': 1
  }

});
ractive.animate('tatrOpacity', 0, {
	easing: 'easeOut',
	duration:1000
});

ractive.on( 'masky', function ( event ) {
  if ( event.hover ) {
  	ractive.animate('tatrOpacity', 1, {
	  	easing:'easeOut'
	  });
	  ractive.animate('mask', 1, {
	  	easing:'easeOut'
	  });
	 } else {
	 	ractive.animate('tatrOpacity', 0, {
		  	easing:'easeOut'
		  });
		  ractive.animate('mask', 0, {
		  	easing:'easeOut'
		  });
	 }
});

ractive.on({
  show: function ( event, which ) {
    ractive.set( 'visible', which );
  }
});
ractive.on({
  back: function ( event ) {
    ractive.set( 'visible', 1 );
  }
});