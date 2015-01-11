define('components/settings/settingsController',[
    './settingsView',
    'Vendor'],function(SettingsView,Vendor){
    'use strict';

    var $=Vendor.$,
        _=Vendor._,
        Class,
        Settings;

    Class=Vendor.util.Class;

    Settings=Class.extend({

        defaultOptions:{},

        constructor:function(options){
            this.options= _.extend({},this.defaultOptions,options);
            this.initialize();

        },

        initialize:function(){
            this.view=new SettingsView({rootHolder: this.options.rootHolder})
        }
    });

    return Settings;

});