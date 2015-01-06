define(['./settingView','vendor','eventbus'], function (View, Vendor, eventbus) {
    var $ = Vendor.$,
        _ = Vendor._,
        Class = Vendor.utils.Class,
        Setting;
    Setting = Class.extend({
        defaultOptions:{
            $sliderDays: null,
            $sliderUpdate: null
        },
        constructor:function(opt){
            this.options = _.extend({},this.defaultOptions, opt);
            eventbus.on('ready', this.initialize, this);
        },
        initialize: function() {
            new View();
            this.collectElements();
            this.sliderInit();
        },
        collectElements: function(){
            this.options.$sliderDays = $("#weather-for-days");
            this.options.$sliderUpdate = $("#update-time");
        },
        sliderInit: function(){
            this.options.$sliderDays.find(".slider-box").settingsSlider("days",{
                min: 1,
                max: 7,
                step: 1,
                indicator: this.options.$sliderDays.find(".value")
            });
            this.options.$sliderUpdate.find(".slider-box").settingsSlider("min",{
                min: 0,
                max: 60,
                step: 15,
                indicator: this.options.$sliderUpdate.find(".value")
            });
        }
    });
    return Setting;
});