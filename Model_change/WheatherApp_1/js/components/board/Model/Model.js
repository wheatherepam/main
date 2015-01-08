define(['Vendor',
    './Forecast'
   ],function(Vendor,Forecast){

    'use strict';

/**
 * get data from Forecast and make model using in View
**/

    var _=Vendor._,
        $= Vendor.$,
        Class=Vendor.util.Class,
        Model;

    Model= Class.extend({
            defaultOptions:{},

            constructor:function(id,city){
                this.options= _.extend({},this.defaultOptions,{id:id,city:city});
                this.initialize(id,city);
            },

            initialize:function(id,city){
                this.filterData=null;
                this.render(id,city);

            },

            render:function(id,city) {
                var selfRender=this;

                var data=null;

                //var deffer= $.Deferred();
                //
                //deffer.done(promiseResponse());

                getForecast2();

                 function getForecast2(){
                       data=new Forecast(id,city);
                     // в обьекте форекаст я создал промис , и вхен будет ждать когда сработает промис с форекаста
                     // ну а он сработает когда придут данные с форекаста
                     $.when(data.promise).done(function(){
                         selfRender.promiseResponse(data);
                     })
                 }
            },
        // я вынес объявление функции в прототип что бы я ее смог вызвать на 44 строке
        promiseResponse: function (data){

        _(data).forEach(function (key) {

            var container = [],
                cur = key.currently,
                daily = key.daily;


            container.city = key.city;
            container.time;//=dateConvertor.time(key.forecast.timezone);
            container.day;//=daydateConvertor.day(key.forecast.timezone);
            container.month;//=dateConvertor.month(key.forecast.timezone);
            container.moonPhase;
            container.sunriseTime;
            container.sunsetTime

            container.current = {};
            //container.current.time = cur.time;
            //container.current.temp = cur.time;
            // container.current.summary = cur.summary;
            // container.current.icon = cur.icon;
            container.current.humid = cur.humidity;
            container.current.windSpeed = cur.windSpeed;
            container.current.windBearing = cur.windBearing;

            container.week = [
                {

                    maxTemp: parseInt(daily.data[0].temperatureMax),
                    minTemp: parseInt(daily.data[0].temperatureMin)
                },
                {
                    maxTemp: parseInt(daily.data[1].temperatureMax),
                    minTemp: parseInt(daily.data[1].temperatureMin)
                },
                {
                    maxTemp: parseInt(daily.data[2].temperatureMax),
                    minTemp: parseInt(daily.data[2].temperatureMin)
                },
                {
                    maxTemp: parseInt(daily.data[3].temperatureMax),
                    minTemp: parseInt(daily.data[3].temperatureMin)
                },
                {
                    maxTemp: parseInt(daily.data[4].temperatureMax),
                    minTemp: parseInt(daily.data[4].temperatureMin)
                },
                {
                    maxTemp: parseInt(daily.data[5].temperatureMax),
                    minTemp: parseInt(daily.data[5].temperatureMin)
                },
                {
                    maxTemp: parseInt(daily.data[6].temperatureMax),
                    minTemp: parseInt(daily.data[6].temperatureMin)
                }
            ];

            selfRender.filterData.push(container);
        })
    }


               

    });

    return Model;

});