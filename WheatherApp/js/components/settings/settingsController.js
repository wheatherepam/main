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
            this.changeGraduse();
            this.initialize();

        },

        initialize:function(){
            this.view=new SettingsView({rootHolder: this.options.rootHolder});
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
                    var fareggeit = document.getElementsByClassName('degree-val');

                    for (var i = 0; i < fareggeit.length; i++) {
                        var curkelvin = parseInt(fareggeit[i].innerHTML);
                        var curkcelje = (curkelvin - 1.8)+32;
                        fareggeit[i].innerHTML = curkcelje;
                        $('#change-f').addClass('checked-unit');
                        $('#change-c').removeClass('checked-unit');
                        $('.degree').removeClass('celje-val');
                    }
                }
            });

            $('#change-c').click(function () {
                if (!flag&&(celsiyConter==0)) {
                    fargenteiCounter=0;
                    celsiyConter++;

                    $(this).addClass('checked-unit');
                    $('#change-c').removeClass('checked-unit');
                    var celje = document.getElementsByClassName('degree-val');

                    for (var i = 0; i < celje.length; i++) {
                        var curcelje = parseInt(celje[i].innerHTML);
                        var curkelvin = parseInt((curcelje - 32)*1.8);
                        celje[i].innerHTML = curkelvin;
                        $('#change-c').addClass('checked-unit');
                        $('#change-f').removeClass('checked-unit');
                        $('.degree').removeClass('kelvin-val')
                    }

                }
            })
        }
    });

    return Settings;

});