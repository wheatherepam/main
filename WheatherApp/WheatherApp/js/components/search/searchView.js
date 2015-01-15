define('components/search/searchView', [
    'Vendor',
    'text!./Templates/searchCityTemplate.html',
    'text!./Templates/changeCityTemplate.html',
    'components/collection',
    'sidebar'

], function (Vendor, cityTemplate, chekedCityTempl, Collection, side) {
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
            this.render();
            this.sendQuery();

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

            side();

            this.startSearch();
            this.checkCity();
        },


        startSearch: function () {
            $('.add-place').click(function () {
                $('#search').removeClass('hide');
                $(this).css({'color': 'red'})
            })
        },


        checkCity: function () {
            $('.wrap-check-box :checkbox').change(function () {
                $('.remove-place').removeClass('icon-delete').addClass('icon-check');
            })
        },

        sendQuery: function () {
            $('.remove-place').click(function () {

                $(this).css({'color': 'green'});

                var sendArray = [];

                $('.wrap-check-box input:checked').each(function () {
                    var temp = {};
                    temp.id = $(this).next().html();
                    temp.city = $(this).parent().prev().children('.town-name').html();
                    sendArray.push(temp);
                });

                //Work with dom elements
                $(this).removeClass('icon-check').addClass('icon-delete');
                $('.town-weather').remove();
                $('#search').addClass('hide');
                $('#search').val('');
                $('.add-place').css({'color': 'white'});
                //Sent cites to dashboard
                EventBus.trigger('add', sendArray);
            });
        }
    });

    return SearchView;

});