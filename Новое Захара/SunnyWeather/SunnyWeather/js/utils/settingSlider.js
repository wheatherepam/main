define(['vendor'], function (e) {
	/**
	 * The data measure that saving it in local storage
	 * @param measure string
	 * Slider configuration
	 * @param config object
	 */
    jQuery.fn.settingsSlider = function(measure, config){
		var val = localStorage.getItem(measure);
            val == null ? val = 1 : false;
	   $(this).slider({
	        range: "min",
	        value: val || 1,
	        min: config.min || 0,
	        max: config.max || 777,
	        step: config.step || 1,
	        slide: function( event, ui ) {
	            localStorage.setItem(measure, ui.value);
	            $(config.indicator).text( ui.value + ' ' + measure );
	        }
    	});
    	$(config.indicator).text( val + ' ' + measure );
    };
});
