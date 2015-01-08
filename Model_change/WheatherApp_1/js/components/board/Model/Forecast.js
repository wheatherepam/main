define(['Vendor',
    'app/Appikey'], function (Vendor, Api) {

    'use strict';

    var _ = Vendor._,
        $ = Vendor.$,
        Class = Vendor.util.Class,
        Model;

    Model = Class.extend({

            defaultOptions: {
                APIKEY : '2294241a4a509e5c7aabcffe6f5ed44c'
            },

            constructor: function (id, city) {
                this.options = _.extend({}, this.defaultOptions, {id: id, city: city});
                this.city=null;
                this.cord = null;
                this.forecast=null;
                // 8888888888888
                this.promise = $.Deferred();
                /// промис
                this.initialize(id,city);
            },

            initialize:function(id,city){
                var selfinit=this;
                this.city=city;

                //Make promise
                //var deffert= $.Deferred(this._getData(id));
                //deffert.done(
                //    selfinit._getData(id)
                //);
                this._getData(id)

            },

            /**
            **Get data from Api
            */
            _getData: function (id) {

                var self = this,
                    map = $('<div>').get(0),
                    service,
                    options = {
                        reference: id
                    };


                service = new google.maps.places.PlacesService(map);

                service.getDetails(options, function (place, status) {

                    if (status == 'OK') {

                        //Get longitude and latitude of city
                        self.cord = place.geometry.location;

                        /*Using  longitude and latitude of city for getting
                         wheather information*/
                        self._getForecast(self);
                    }else {
                        throw new Error('Server error, check your connection ' + status);
                    }
                })
            },

            //get info from google Forecast
            _getForecast: function (self) {

                //get city url
                var url = Api.Appikey + this.cord.D + ',' + this.cord.k + Api.callback;

                $.getJSON(url, function (data, status) {
                    self.forecast = data;
                    //88888888888
                    self.promise.resolve();
                    // если все ок то мы его "срабатываем" 

                })
                    .fail(function (data, status) {
                        console.log(status + " error");
                });
            }
    });


    return Model;

});