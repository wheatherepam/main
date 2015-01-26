define('components/settings/settingsController',[
    './settingsView',
    'Vendor',
    'touchPunch'],function(SettingsView,Vendor){
    'use strict';

    var $=Vendor.$,
        _=Vendor._,
        EventBus=Vendor.util.EventBus,
        Class,
        Settings;

    Class=Vendor.util.Class;

    Settings=Class.extend({

        defaultOptions:{},

        constructor:function(options){
            this.options= _.extend({},this.defaultOptions,options);
            this.changeGraduse();
            this.initialize();

        },

        initialize:function(){
            this.view=new SettingsView({rootHolder: this.options.rootHolder});
            this.changeGraduse();
        },

        attachEvents:function(){
            this.changeGraduse();
        },


        changeGraduse:function(){

            var flag = $(this).hasClass('checked-unit');
            var celsiyConter=0;
            var fargenteiCounter=0;

            $('#change-f').click(function () {

                if (!flag&&(fargenteiCounter==0)) {

                    celsiyConter=0;
                    fargenteiCounter++;
                    $(this).addClass('checked-unit');
                    $('#change-c').removeClass('checked-unit');
                    EventBus.trigger('changefarengeit');


                }
            });

            $('#change-c').click(function () {
                if (!flag&&(celsiyConter==0)) {
                    fargenteiCounter=0;
                    celsiyConter++;

                    $(this).addClass('checked-unit');
                    $('#change-f').removeClass('checked-unit');
                    EventBus.trigger('changecelge');

                }
            })
        }
    });

    return Settings;

});