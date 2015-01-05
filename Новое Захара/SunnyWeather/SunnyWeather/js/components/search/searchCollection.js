define(['vendor','./searchModel'], function (Vendor, Model) {
    "use strict";
    var Class = Vendor.utils.Class,
        _ = Vendor._,
        SearchCollection,
        collection;

    SearchCollection = Class.extend({
        defaultOptions: {},

        constructor: function(opt){
            this.options = _.extend({}, this.defaultOptions, opt);
            this.collection = [];
            this.initialize();
        },
        initialize: function(){},

        sendResponse: function(str){
            var result = [],
                self = this,
                interval,
                autocomplete,
                options = {
                    types: ['(cities)'],
                    input: str
                };
            /**
             * Send request to google API
             * str - String , entered user's value in the search field
             */
            autocomplete = new google.maps.places.AutocompleteService();
            autocomplete.getPlacePredictions( options, function(resp, code){
                if(code == "OK"){
                    result = resp;
                } else {
                    throw new Error('Server error, check your connection ' + code);
                }
            });
            /**
             * Check that google API send response
             * @type {number}
             */
            interval = setInterval(function(){
                if(result.length){
                    self._createCollection(result);
                    result = null;
                    clearInterval(interval);
                }
            }, 10, self);
        },
        getData: function(){
            return  this.collection;
        },
        /**
         *
         * @param array of objects with data for searched city
         * @private
         */
        _createCollection: function(arr) {
            var tmp = null,
                t_arr = [];

            _(arr).forEach(function(el){
                tmp = {
                    city: _(el.terms).first().value,
                    country: _(el.terms).last().value,
                    id: el.reference
                };
                /**
                 * Creating an Model's items that contain city and country as value
                 */
                t_arr.push( new Model(tmp));
            });
            /**
             * create models collection
             * @type {Array}
             */
            this.collection = t_arr;
            $(this).trigger('changeCollection', this.collection);
        }
    });
    collection = new SearchCollection();
    return collection;
});