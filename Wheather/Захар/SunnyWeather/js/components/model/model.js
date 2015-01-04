define(['vendor'], function (Vendor) {
    "use strict";
    var Class = Vendor.utils.Class,
        _ = Vendor._,
        Model;

    Model = Class.extend({
        defaultOptions: {
            APIKEY : '2294241a4a509e5c7aabcffe6f5ed44c'
        },
        
        constructor: function(id, city){
            this.options = _.extend({}, this.defaultOptions, {id:id, city:city});
            this.city = null;
            this.cord = null;
            this.forecast = null;
            this.initialize(id, city);
        },

        initialize: function(id, city){
            this.city = city;

            //Получение координат по гугловскому айдишники
            this._getDetails(id);
        },
        _getDetails: function(id){
            var service,
                self = this,
                map = $('<div/>').get(0),
                options = {
                    reference: id
                };

            /*using google api*/
           service = new google.maps.places.PlacesService(map);
           service.getDetails(options, function(det, code){
               if(code == "OK"){
                   //Присваем объект после гугловского запроса

                   self.cord = det.geometry.location;
                   // get data from forecast api
                   self._getForecast(self);
               } else {
                   throw new Error('Server error, check your connection ' + code);
               }
           })
        },
        _getForecast: function(self){

            // Обезательно дописать '?callback=?';5
            var url = 'https://api.forecast.io/forecast/' + this.options.APIKEY + '/' +
                    + this.cord.D + ',' + this.cord.k + '?callback=?';

            $.getJSON(url, function(data, status){
                self.forecast = data;
                console.log( status + " second success" );
            })
                .fail(function(data, status) {
                    console.log( status + " error" );
                })
        }
    });
    return Model;
});