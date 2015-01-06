define(['vendor','./searchModel'], function (Vendor, Model) {
    "use strict";
    var Class = Vendor.utils.Class,
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
                    $(self).trigger("success");
                } else {
                    throw new Error('Server error, check your connection ' + code);
                }
            });
            /**
             * Check that google API send response
             * @type {number}
             */
            $(this).on("success",function(){
                self._createCollection(result);
                result = null;
            });
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
                self = this;
            /**
             * Delete previous founded cities
             */
            self.collection = [];

            _(arr).forEach(function(el){
                tmp = {
                    city: _(el.terms).first().value,
                    country: _(el.terms).last().value,
                    id: el.reference
                };
                /**
                 * Creating Model's items that contain city and country as value
                 */
                self.collection.push( new Model(tmp));
            });
            /**
             * Trigger event , when collection have been created
             */
            $(this).trigger('haveBeenChanged', this.collection);
        }
    });
    collection = new SearchCollection();
    return collection;
});