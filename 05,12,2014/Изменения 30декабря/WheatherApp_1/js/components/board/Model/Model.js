define(['Vendor',
    './Forecast',
    'utils/Convertor/dateConvertor'],function(Vendor,Forecast,dateConvertor){

    'use strict';

/**
 * get data from Forecast and make model using in View
**/

    var _=Vendor._,
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


            render:function(id,city){

                var self=this;

                    var forecast=new Forecast(id,city);



                    var data=forecast.forecast;

                _(data).forEach(function(key){
                    var container=[],
                        cur=key.currently,
                        daily=key.daily;


                    container.city=key.city,
                    container.time;
                    container.day;
                    container.mounth;
                    container.moonPhase;
                    container.sunriseTime;
                    container.sunsetTime

                    container.current={};
                        container.current.time=cur.time;
                        container.current.temp= cur.time;
                        container.current.summary=cur.summary;
                        container.current.icon=cur.icon;
                        container.current.humid=cur.humidity;
                        container.current.windSpeed=cur.windSpeed;
                        container.current.windBearing=cur.windBearing;

                    container.week=[
                        {
                            //rename max and min
                            max:parseInt(daily.data[0].temperatureMax),
                            min:parseInt(daily.data[0].temperatureMin)
                        },
                        {
                            max:parseInt(daily.data[1].temperatureMax),
                            min:parseInt(daily.data[1].temperatureMin)
                        },
                        {
                            max:parseInt(daily.data[2].temperatureMax),
                            min:parseInt(daily.data[2].temperatureMin)
                        },
                        {
                            max:parseInt(daily.data[3].temperatureMax),
                            min:parseInt(daily.data[3].temperatureMin)
                        },
                        {
                            max:parseInt(daily.data[4].temperatureMax),
                            min:parseInt(daily.data[4].temperatureMin)
                        },
                        {
                            max:parseInt(daily.data[5].temperatureMax),
                            min:parseInt(daily.data[5].temperatureMin)
                        },
                        {
                            max:parseInt(daily.data[6].temperatureMax),
                            min:parseInt(daily.data[6].temperatureMin)
                        }
                    ]

                    self.filterData.push(container);
                    console.log(forecast);

                });
               
            }
    });



    return Model;

});