define('components/settings/settingsView', [
    'Vendor',
    'text!./settingsTmpl.html',
    'jqueryUI'



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

            this.$holder = $(this.options.rootHolder);

            this.$holder.append(this.boardTempl({}));

            this.initDaySlider();

            this.initUpdaySlider();
        },

        initDaySlider:function(){
            $(function() {
                $( "#show-every" ).slider({
                    range: "max",
                    min: 1,
                    max: 7,
                    value: 7,
                    slide: function( event, ui ) {
                        $( "#days" ).val( ui.value );
                    },

                    stop: function() {

                        var $weekForecastBlocks = $('.add-module');

                        $weekForecastBlocks.each(function() {

                            var $weekForecastItems = $(this).find('.week-day');

                            for (var i = 0; i < $weekForecastItems.size(); i++) {
                                //$weekForecastItems.eq(i).removeClass('hide-border-bottom');

                                if (i < $('#days').val()) {
                                    $weekForecastItems.eq(i).slideDown();

                                    if (i === ($('#days').val() - 1)) {
                                        $weekForecastItems.eq(i).addClass('hide-border-bottom');
                                    }
                                } else {
                                    $weekForecastItems.eq(i).slideUp();
                                }
                            }
                        });
                    }

                });
                $( "#days" ).val( $( "#show-every" ).slider( "value" ) );
            });
        },

        initUpdaySlider:function(){
            $(function() {
                $( "#update" ).slider({
                    range: "max",
                    min: 1,
                    max: 30,
                    value: 30,
                    slide: function( event, ui ) {
                        $( "#minute" ).val( ui.value );
                    }
                });
                $( "#update" ).val( $( "#minute" ).slider( "value" ) );
            });

        }

    });


    return SettingsView;

});