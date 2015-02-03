define(['Vendor', './../../services/Autocomplete'], function (Vendor, Model) {

    var Class = Vendor.util.Class,
        _ = Vendor._,
        SearchModel,
        $ = Vendor.$;

    SearchModel = Class.extend({

        /**
         * Model take string on input and returns id and description of find place
         */
        constructor: function (str) {
            this.id = null;
            this.promise = $.Deferred();
            this.filterData = [];
            this.options = _.extend({}, str);
            this.initialize(str);
        },

        initialize: function (str) {

            this.filter(str);
        },

        filter: function (str) {
            var selfFilter = this;
            var inputdata = new Model(str);

            $.when(inputdata.promise).done(function () {

                _(inputdata.forecast).forEach(function (key) {

                    var temp = {};
                    var str = key.description;
                    var arr = str.split(',');

                    //defint using fields of model

                    temp.country = '//' + key.terms[key.terms.length-1].value;

                    var preCity=arr[0].split(' ');
                    temp.city =key.terms[0].value;
                    temp.id = key.reference;
                    selfFilter.filterData.push(temp);

                });

                selfFilter.promise.resolve();

            });
        }
    });

    return SearchModel;

});