define('components/search/searchController',[
    './searchView',
    'Vendor',
    './Model/Model',
    'sidebar'],function(SearchView,Vendor){
    'use strict';

    var $=Vendor.$,
        _=Vendor._,
        Class=Vendor.util.Class,
        Search;



   Search=Class.extend({

        defaultOptions:{},

        constructor:function(options){
            console.log('work');
            this.options= _.extend({},this.defaultOptions,options);
            this.initialize();

        },

        initialize:function(){

            this.view=new SearchView({rootHolder: this.options.rootHolder});


        }
    });

  return Search;
});