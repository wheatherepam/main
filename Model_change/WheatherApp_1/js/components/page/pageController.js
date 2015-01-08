define('components/page/pageController',[
    './pageView',
    'Vendor'],function(PageView,Vendor){
    'use strict';

    var $=Vendor.$,
        _=Vendor._,
        Class=Vendor.util.Class,
        Page;



     Page=Class.extend({

        defaultOptions:{},

        constructor:function(options){
            this.options= _.extend({},this.defaultOptions,options);
            this.initialize();
        },

        initialize:function(){

            this.view=new PageView({rootHolder: this.options.rootHolder})
        }
    });

    return Page;

});