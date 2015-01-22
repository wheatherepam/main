define('components/board/boardController',[
       './boardView',
       'Vendor',
       './Model/collection'
],function(BoardView,Vendor,Collection){

        var $=Vendor.$,
            _=Vendor._,
            Class=Vendor.util.Class,
            EventBus=Vendor.util.EventBus,
            Board;

         Board=Class.extend({

            constructor:function(options){
                this.options= options;
                this.initialize();
            },

            initialize:function(){
                this.col=new Collection();
                this.view = new BoardView({rootHolder: this.options.rootHolder});
                this.view.initGallery();
                this.getCurrentWheather();
                this.attachEvents();

                EventBus.on('add',this.col.ready, this.col);
                EventBus.on('update',this.col.ready,this.col);
                EventBus.on('getdata',this.view.render, this.view);
            },

             getCurrentWheather:function(){
               var selfCurrent=this;
              if(this.col._colRep.length===0){
                  /**
                  * Get current position using geoLocation
                  **/
                  if (navigator.geolocation) {

                     navigator.geolocation.getCurrentPosition(_getPlaceInfo);
                  } else {
                      console.log('Can not get geoLocation');

                  }

                  /**
                   * Get place info using google GeoCoder API
                   * */
                  function _getPlaceInfo(data){

                      var self,
                          pyrmont,
                          map,
                          service;

                      pyrmont = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);

                      geocoder = new google.maps.Geocoder();
                      geocoder.geocode({'latLng': pyrmont},function(data){

                         var description=(data[0].formatted_address);
                         _getAutoComplete(description);

                     });

                  }

                  /**
                   * Get place id using Autocomplete API
                   * */
                  function _getAutoComplete(str){

                      var autoComplete,
                          options={
                              input:str
                          };

                      autoComplete = new google.maps.places.AutocompleteService(null, { types: ['cities'] } );

                      autoComplete.getPlacePredictions( options, function(data, status){

                          if(status === "OK"){

                              var desciption=data[0].description.split(',');

                              var temp = {};
                              temp.city = desciption[1];
                              temp.id = data[0].reference;
                              console.log(temp);

                              selfCurrent.col.ready(new Array(temp),'add');

                          } else {
                              throw new Error('Server error, check your connection ' + code);
                          }
                      });
                  }

              }
           },

             attachEvents:function(){
                this.refresh();
             },

             refresh:function(){
                 var selfRefresh=this;
                 $('body').on('click','.ref-icon',function(){
                     $('.ref-icon').addClass('rotate')
                    selfRefresh.col.refresh();
                 });

             }
        });

  return Board;
});