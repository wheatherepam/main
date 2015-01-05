requirejs.config({
   baseUrl: "js",
   paths: {
     jquery: "libs/jquery-2.1.1.min",
     jqueryUi: "libs/jquery-ui.min",
	 jqueryUiTouch: "libs/jquery.ui.touch-punch.min",
     hammer: "libs/hammer",
     text: 'libs/text',
     lodash: "libs/lodash",
     moment: 'libs/moment',
     moment_tz: 'libs/moment-timezone',
     utils: "utils"
   },
   shim:{
     "jqueryUiTouch": ["jquery","jqueryUi"]
   },
    packages:[
        'vendor'
    ]
});
require(['app/app','vendor'], function( App, Vendor){
});
