define(['vendor',
    'text!./Templates/tmp_structure.html',
    'text!./Templates/tmp_city.html',
    'utils/perHoursSlider'], function(Vendor, tmp_structure, tmp_city){
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
             * Adding slider and buttons event listeners
             */
            this.btn_init();
        },
        render: function(data){
            var $wrapper = $('#wrapper');
            /**
             * Create the layout's structure
             * @type {Function|string}
             */
            $wrapper.find('#content').remove();

            template = _.template(tmp_structure);
            $wrapper.append(template({}));
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
                $('#content-wrap').append(template(dataObj));
            });
        },
        btn_init: function(){
            var self = this;
            /**
             * scrollbar init
             */
            _($(".w-slider")).forEach(function(elem){
                $(elem).scrollbarInit(self.options.K);
            });
            /**
             * Slider with weather per hours init
             */
            _($(".hours-holder ul")).forEach(function(elem){
                $(elem).hoursSlider(self.options.K);
            });
        }
    });
    return View;
});