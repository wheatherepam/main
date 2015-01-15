define('components/search/searchController',[
    './searchView',
    'Vendor',
    './Model/Model',
    ],function(SearchView,Vendor,Model){
    'use strict';

    var $=Vendor.$,
        _=Vendor._,
        Class=Vendor.util.Class,
        EventBus=Vendor.util.EventBus,
        Search;



   Search=Class.extend({

        defaultOptions:{},

        constructor:function(options){
            this.options= _.extend({},this.defaultOptions,options);
            this.initialize();
        },

        initialize:function(){
            this.render();
        },

        render:function(){
            this.view=new SearchView({rootHolder: this.options.rootHolder});
            this.searchCites();
            this.startSearch();
        },

       startSearch:function(){
           $('.add-place').click(function(){
               $('#search').removeClass('hide');
           })
       },

       searchCites:function(){
           var selfSearchCites=this;
           $('#search').on('keyup',function(){
               var str=$(this).val();
               var places=new Model(str);
               $.when(places.promise).done(function(){
                  selfSearchCites.view.render(places);
              });
          });
       },

       checkCity:function(){
           $('.wrap-check-box input:checkbox').each(function(){
               $('.remove-place').removeClass('icon-delete')
           })
       }

    });

  return Search;
});