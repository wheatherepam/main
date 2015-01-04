define(['Vendor', 'Api'], function (Vendor, Api) {
    'use strict'

    var _ = Vendor._,
        $ = Vendor.$,
        Class = Vendor.util.Class,
        Model;

    Model = Class.extend({
            defaultOptions: {},

            constructor: function (id, city) {
                this.options = _.extend({}, this.defaultOptions, {id: id, city: city});
                this.city=city;
                this.cord = null;
                this.forecast=null;
                this.initialize(id,city);
            },

            initialize:function(id){
                this._getData(id);
            },

            /**
            **Get data from Api
            */
            _getData: function () {

                var self = this,
                    dataRepository = $('</div>').get(0),
                    service,
                    options = {
                        reference: id
                    };

                service = new google.maps.places.PlacesService(dataRepository);
                service.getDedails(options, function (place, status) {
                    if (status == 'OK') {
                        //Get longitude and latitude of city
                        self.cord = place.geometry.location;
                        /*Using  longitude and latitude of city for getting
                         wheather information*/
                        self._getForecast(self);
                    }
                })
            },

            //get info from google Forecast
            _getForecast: function (self) {

                //get city url
                var url = Api.Appikey + this.cord.D + ',' + this.cord.k + Api.callback;

                //connection to outer source
                $.getJSON(url, function (data, status) {
                    self.forecast = data;
                    console.log(status + " second success");
                })
                    .fail(function (data, status) {
                        console.log(status + " error");
                    })
            }
    });

    return Model;

});