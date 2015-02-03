define(['Vendor'],function(Vendor){
  'use strict';

    var Class=Vendor.util.Class,
        $=Vendor.$,
        _=Vendor._,
        SearchModel;

    SearchModel=Class.extend({

        /**
         * Model take string on input and returns id and description of find place
         * */
        constructor:function(str){
          this.id=null;
          this.forecast=null;
          this.options= _.extend({},str);
          this.promise= $.Deferred();
          this.sendRequest(str);
        },

        sendRequest:function(str){
            var selfsendRequest=this,
                autoComplete,
                options={
                    input:str
                };

            autoComplete = new google.maps.places.AutocompleteService(null, { types: ['cities'] } );

            autoComplete.getPlacePredictions( options, function(data, status){
                if(status == "OK"){

                    selfsendRequest.forecast=data;
                    selfsendRequest.promise.resolve();

                } else {
                    throw new Error('Server error, check your connection ' + code);
                }
            });
        }
    });

 return SearchModel;

});