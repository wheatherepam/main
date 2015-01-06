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
            this.initialize(id, city);
        },
        initialize: function(id, city){
            this.city = city;
            this.promise = $.Deferred();
            this._getDetails(id);
        },
        _getDetails: function(id){
            var service,
                self = this,
                map = $('<div/>').get(0),
                options = {
                    reference: id
                };
           service = new google.maps.places.PlacesService(map);
           service.getDetails(options, function(det){
                   self.cord = det.geometry.location;
                   self.getForecast(true);
           })
        },
        getForecast: function(flag){
            var self = this, p,
                url = 'https://api.forecast.io/forecast/' + this.options.APIKEY + '/' +
                    + this.cord.D + ',' + this.cord.k + '?callback=?';

            p = $.getJSON(url, function(data){
                self.forecast = data;
                if(flag){
                    return self.promise.resolve();
                }
            });

            return p;
        }
    });
    return Model;
});