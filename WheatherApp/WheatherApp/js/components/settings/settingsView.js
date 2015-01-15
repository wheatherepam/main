define('components/settings/settingsView', [
    'Vendor',
    'text!./settingsTmpl.html',

], function (Vendor, settingsTemplate) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        Class =Vendor.util.Class,
        SettingsView;

    SettingsView = Class.extend({

        defaultOptions: {},

        constructor: function (options) {

            this.options = _.extend({}, this.defaultOptions, options);

            this.boardTempl = _.template(settingsTemplate);

            this.initialize();

        },

        initialize: function () {
            //Определяем что вставлять
            this.$holder = $(this.options.rootHolder);
            //Вставляем теиплейт в холдер
            this.$holder.append(this.boardTempl({}));
            this.changeGraduse();

        },

        changeGraduse:function(){

            var flag = $(this).hasClass('checked-unit');

            var celsiyConter=0;
            var fargenteiCounter=0;


            $('#change-f').click(function () {

                if (!flag&&(fargenteiCounter==0)) {
                    console.log('celsiyConter:',celsiyConter);
                    celsiyConter=0;
                    fargenteiCounter++;

                    $(this).addClass('checked-unit');
                    var fareggeit = document.getElementsByClassName('degree-val');

                    for (var i = 0; i < fareggeit.length; i++) {
                        var curkelvin = parseInt(fareggeit[i].innerHTML);
                        var curkcelje = parseInt((curkelvin - 32)/(5/9));
                        fareggeit[i].innerHTML = curkcelje;
                        $('#change-f').addClass('checked-unit');
                        $('#change-c').removeClass('checked-unit');
                        $('.degree').removeClass('celje-val');
                    }
                }
            });

            $('#change-c').click(function () {
                if (!flag&&(celsiyConter==0)) {
                    console.log('celsiyConter:',fargenteiCounter);
                    fargenteiCounter=0;
                    celsiyConter++;

                    $(this).addClass('checked-unit');
                    $('#change-c').removeClass('checked-unit');
                    var celje = document.getElementsByClassName('degree-val');

                    for (var i = 0; i < celje.length; i++) {
                        var curcelje = parseInt(celje[i].innerHTML);
                        var curkelvin = parseInt((curcelje + 32)*(5/9));
                        celje[i].innerHTML = curkelvin;
                        $('#change-c').addClass('checked-unit');
                        $('#change-f').removeClass('checked-unit');
                        $('.degree').removeClass('kelvin-val')
                    }

                }
            })


        }


    });


    return SettingsView;

});