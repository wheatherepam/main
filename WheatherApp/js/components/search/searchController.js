define('components/search/searchController',[
    './searchView',
    'Vendor',
    './Model/Model'
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
            this.view=new SearchView({rootHolder: this.options.rootHolder});
            this.attachEvens();
        },

        attachEvens:function(){
            this.searchCites();
            this.checkCites();
            this.addCites();
            this.getUpdateCites();
            this.updateCites();
            this.getAddingCites();
        },

       /*
        *Get cites from Autocomplete
        **/
        searchCites:function(){
           $('#town-weather').remove();

           var selfSearchCites=this;

           $('#search').on('keyup',function(){

               var str=$(this).val();
               var places=new Model(str);
               $.when(places.promise).done(function(){

                  selfSearchCites.view.render(places);
              });

           });
       },

       /*
        * Select cites
        * */
       checkCites:function(){
           //Check adding cites
           $('.wrap-check-box :checkbox').change(function () {
               $('.remove-place').removeClass('icon-delete').addClass('icon-check').css({color:'grey'});
           });
       },

       /*
        *Add cites to the board Collection
        **/
       addCites: function () {

           $('.add-place').click(function () {

               $(this).css({'color': 'green'});

               var sendArray = [];

               if($('.wrap-check-box input:checked')){

                   $('.wrap-check-box input:checked').each(function () {
                       var temp = {};
                       temp.id = $(this).next().html();
                       temp.city = $(this).parent().prev().children('.town-name').html();
                       sendArray.push(temp);
                   });
               }

               //Work with dom elements
               $(this).css({'color':'red'});

               $('#search').val('');

               //Sent cites to dashboard
               EventBus.trigger('add', sendArray,'add');
           });
       },

       /*
        *Get cites from the board Collection
        **/
       getAddingCites:function(){

           var selfSavingCites=this;

           EventBus.on('getdata',function(data){

               var filterData=[];
               _.forEach(data,function(item){
                   var temp={};
                   temp.id=item.id;
                   temp.city=item.city;
                   temp.icon=item.model.filterData.current.icon;
                   temp.temp=item.model.filterData.current.temp;
                   filterData.push(temp);
               });
            selfSavingCites.view.renderAddedCites(filterData);
           });
       },


       /*
        *Update  cites in the board Collection
        **/
       updateCites:function(){

           $('.remove-place').click(function(){

               var sendArray = [];

               $('.wrap-check-box input:checked').each(function () {
                   //$('.town-weather').remove();
                   $('gallery-item').remove();
                   var id = $(this).next().html();
                   sendArray.push(id);
               });

               EventBus.trigger('update',sendArray,'update');
           });
       },
       //Print updated cites in Collection
       getUpdateCites:function(){
           var selfUpdate=this;

           EventBus.on('updatedata',function(data){

               var filterData=[];
               _.forEach(data,function(item){
                   var temp={};
                   temp.id=item.id;
                   temp.city=item.city;
                   temp.icon=item.model.filterData.current.icon;
                   temp.temp=item.model.filterData.current.temp;
                   filterData.push(temp);
               });

               selfUpdate.view.renderAddedCites(filterData);
           });
       }
    });

  return Search;
});