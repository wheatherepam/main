define(['Vendor','./Forecast'],function(Vendor,Forecast){
    'use strict'

    var _=Vendor._,
        Class=Vendor.util.Class,
        Forecast=Forecast;
        Model;

    Model= Class.extend({
            defaultOptions:{},

            constructor:function(Forecast){
                this.options= _.extend({},this.defaultOptions,Forecast);
                this.initialize();
            },

            initialize:function(){
                var self=this;
            }
        }

    );

    return Model;

});