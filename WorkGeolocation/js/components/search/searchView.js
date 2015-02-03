define('components/search/searchView', [
    'Vendor',
    'text!./Templates/searchCityTemplate.html'



], function (Vendor, cityTemplate) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        Class = Vendor.util.Class,
        EventBus = Vendor.util.EventBus,
        SearchView;

    SearchView = Class.extend({

        defaultOptions: {},

        constructor: function (options) {
            this.options = _.extend({}, this.defaultOptions, options);
            this.initialize();
        },

        initialize: function () {

            //this.render();
        },

        render: function (places) {
            this.$holder = $(this.options.rootHolder);
            var selfRender = this;
            this.citeTeml;
            this.$holder;

            $('.town-weather').remove();
            if (places) {
                var citeList = places.filterData;
                citeList.forEach(function (key) {
                    selfRender.citeTeml = _.template(cityTemplate);
                    selfRender.$holder.append(selfRender.citeTeml(key));
                });
            }
        },

        //Print added cites in search menu
        renderAddedCites: function (cites) {
            //clean wrapper
            this.$holder = $(this.options.rootHolder);
            this.$holder.empty();
            var selfSavedCites = this;
            cites.forEach(function (key) {
                selfSavedCites.citeTeml = _.template(cityTemplate);
                selfSavedCites.$holder.append(selfSavedCites.citeTeml(key));
            });
        }

        //Adding checked cites to collection





    });

    return SearchView;

});