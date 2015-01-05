define(['vendor','text!./Templates/tmp_structure.html','text!./Templates/tmp_city.html','utils/perHoursSlider'], function(Vendor, tmp_structure, tmp_city){
    "use strict";
    var $ = Vendor.$,
        _ = Vendor._,
        Class = Vendor.utils.Class,
        View,
        template;

    View = Class.extend({
        defaultOptions:{
            /**
             * Coefficient of relation scrollbar handler width to per hours weather slider width
             * @type {number}
             */
            K : 6.1504
        },
        constructor:function(opt){
            this.options = _.extend({},this.defaultOptions,opt);
            this.initialize(opt);
        },
        initialize: function(opt){
            /**
             * Template initiation
             */
            this.render(opt);
            /**
             * scrollbar init
             */
            $(".w-slider").scrollbarInit(this.options.K);
            /**
             * Slider with weather per hours init
             */
            $(".hours-holder ul").hoursSlider(this.options.K);
            /**
             * Rotate update button buy tap on it
             */
            $(".icon-refresh").on("click",function(){
                $(this).addClass("rotate");
                setTimeout(function() {
                    $(".icon-refresh").removeClass("rotate");
                },500);
            });
        },
        render: function(data){
            var $content = $('#content-wrap');
            /**
             * Create the layout's structure
             * @type {Function|string}
             */
            template = _.template(tmp_structure);
            $('#wrapper').append(template({}));
            /**
             * Template for city's forecast
             * @type {Function|string}
             */
            _.templateSettings.variable = "obj";
            template = _.template(tmp_city);
            /**
             * iterate input data and create elements with weather forecast
             * for each city
             * @type {Function|string}
             */
            _(data).forEach(function(dataObj){
                console.log(dataObj);
                $('#content-wrap').append(template(dataObj));
            });
        }
    });
    return View;
});