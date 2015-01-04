define('components/page/pageController',[
    'pageView',
    'vendor'],function(PageView,vendor){
    'use strict';

    var $=vendor.$,
     _=vendor._,
     Class,
     Page ;

     Class=vendor.utils.Class();

     Page=Class.extend({

        defaultOptions:{},

        constructor:function(options){
            this.options= _.extend({},this.defaultOptions,options);
            this.initialize();
        },

        initialize:function(){

            this.view=new PageView({rootHolder: this.options.rootHolder})
        }
    })

    return Page();

})