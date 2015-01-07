define(['Vendor',
    './Forecast'
], function (Vendor, Forecast) {

    'use strict';

    /**
     * get data from Forecast and make model using in View
     **/

    var _ = Vendor._,
        $ = Vendor.$,
        Class = Vendor.util.Class,
        Model;

    Model = Class.extend({
        defaultOptions: {},

        constructor: function (id, city) {
            this.options = _.extend({}, this.defaultOptions, {id: id, city: city});
            this.initialize(id, city);
        },

        initialize: function (id, city) {
            this.filterData = null;
            this.render(id, city);

        },

        render: function (id, city) {
            var selfRender = this;
            getForecast2();

            function getForecast2() {
                var data = new Forecast(id, city);
                // в обьекте форекаст я создал промис , и вхен будет ждать когда сработает промис с форекаста
                // ну а он сработает когда придут данные с форекаста
                $.when(data.promise).done(function () {
                    selfRender.promiseResponse(data,city);
                })
            }
        },

        // я вынес объявление функции в прототип что бы я ее смог вызвать на 44 строке
        promiseResponse: function (data,city) {

            var container = [],
                main = data.forecast,
                cur = data.forecast.currently,
                daily = data.forecast.daily,
                selftPrResp=this;


            //Main wheather info
            container.city = city;
            container.time;//=dateConvertor.time(key.forecast.timezone);
            container.day;//=daydateConvertor.day(key.forecast.timezone);
            container.month;//=dateConvertor.month(key.forecast.timezone);
            container.moonPhase;
            container.sunriseTime = daily.data[0].sunriseTime;
            container.sunsetTime = daily.data[0].sunsetTime;

            //Current wheather
            container.current = {};
            container.current.time = cur.time;
            container.current.temp = cur.time;
            container.current.temp = cur.temperature;
            container.current.summary = cur.summary;
            container.current.icon = cur.icon;
            container.current.humidity = cur.humidity;
            container.current.windSpeed = cur.windSpeed;
            container.current.windBearing = cur.windBearing;

            //Dayli wheather
            container.week = [];
            for (var i = 0; i <= 6; i++) {
                container.week[i] = {};
                container.week[i].maxTemp = parseInt(daily.data[0].temperatureMax);
                container.week[i].minTemp = parseInt(daily.data[0].temperatureMin);
            }
            selftPrResp.filterData=container;
        }
    });

    return Model;

});