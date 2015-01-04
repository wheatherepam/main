define(['Vendor','./Forecast'],function(Vendor,Forecast){
    'use strict'
/**
 * get data from Forecast and make model using in View
**/
    var _=Vendor._,
        Class=Vendor.util.Class,
        Forecast=Forecast;
        Model;

    Model= Class.extend({
            defaultOptions:{},

            constructor:function(id,city){
                this.options= _.extend({},this.defaultOptions);
                this.initialize();
            },

            initialize:function(){
                var filterData=null;

                this.render(id,city);
            },

            render:function(id,city){

                var self=this,
                    Forecast=new Forecast(id,city),
                    data=Forecast.forecast;

                _(data).forEach(function(key){
                    self.filterData
                })
            }
    });

    return Model;

});