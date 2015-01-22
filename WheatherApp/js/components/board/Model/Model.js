define(['Vendor',
    './Forecast',
    'dateConvertor'
], function (Vendor, Forecast, Convertor) {
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

        constructor: function (id) {
            this.options = _.extend({}, this.defaultOptions, {id: id});
            this.promise = $.Deferred();
            this.filterData = null;
            this.initialize(id);
        },

        initialize: function (id) {

            this.render(id);
        },

        render: function (id) {
            var selfRender = this;
            getForecast2();

            function getForecast2() {
                var data = new Forecast(id);

                $.when(data.promise).done(function () {
                    selfRender.promiseResponse(data);
                })
            }
        },

        promiseResponse: function (data) {
            var container = [],
                main = data.forecast,
                offset = main.offset-1,

                cur = data.forecast.currently,
                hourly = data.forecast.hourly,
                daily = data.forecast.daily,
                selftPrResp = this;

            //Main wheather info
            container.month = Convertor.getMonth(cur.time * 1000, offset);
            container.weekday = Convertor.getWeekDay(cur.time * 1000, offset);
            container.date = Convertor.getDate(cur.time * 1000, offset);

            container.moonPhase = (function (moonparam) {
                var str;
                var moonState = ['none-moon', 'young-moon', 'grow-moon', 'almost-full', 'full-moon', 'almost-old-moon', 'old-moon'];
                var phse = [0, 0.14, 0.28, 0.48, 0.56, 0.7, 0.84];
                for (var i = 0; i <= phse.length; i++) {
                    if (moonparam <= phse[i]) {
                        str = moonState[i];
                        break;
                    }
                    if (moonparam >= phse[6]) {
                        str = moonState[phse.length - 1];
                    }
                }
                    return str;
            })(data.forecast.daily.data[0].moonPhase);

            container.sunriseTime = Convertor.getHours(daily.data[0].sunriseTime*1000,offset) + ' : ' + Convertor.getMinutes(daily.data[0].sunriseTime*1000);
            container.sunsetTime = Convertor.getHours(daily.data[0].sunsetTime*1000,offset) + ' : ' + Convertor.getMinutes(daily.data[0].sunsetTime*1000);

            //Current wheather
            container.current = {};
            container.current.time = Convertor.getHours(cur.time * 1000, offset) + ':' + Convertor.getMinutes(cur.time * 1000, offset);
            container.current.temp = parseInt(cur.temperature);
            container.current.summary = cur.summary;
            container.current.icon = cur.icon;
            container.current.humidity = parseInt(cur.humidity * 100)  + '%';
            container.current.windSpeed = parseInt(cur.windSpeed);
            container.current.windBearing = cur.windBearing;

            //hourlu wheather
            container.hourly = [];
            for (var i = 0; i <= 24; i++) {
                container.hourly[i] = {};
                //container.hourly[i].time=hourly.data[i].time;
                container.hourly[i].time = Convertor.getHours(hourly.data[i].time * 1000, offset) + ' : 00';
                container.hourly[i].icon = hourly.data[i].icon;
                container.hourly[i].temp = parseInt(hourly.data[i].temperature);
            }

            //Dayli wheather
            container.week = [];
            for (var i = 0; i <daily.data.length; i++) {
                container.week[i-1] = {};
                container.week[i-1].weekday = (Convertor.getWeekDay(daily.data[i].time * 1000, offset)).slice(0, 3);
                container.week[i-1].icon = daily.data[i].icon;
                container.week[i-1].maxTemp = parseInt(daily.data[i].temperatureMax);
                container.week[i-1].minTemp = parseInt(daily.data[i].temperatureMin);
            }
            selftPrResp.filterData = container;
            selftPrResp.promise.resolve();
        }
    });

    return Model;
});