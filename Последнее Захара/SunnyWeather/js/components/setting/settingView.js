define(['vendor','text!./templates/tmp_settings.html','utils/settingSlider'], function (Vendor, tmp_settings) {
    var $ = Vendor.$,
        _ = Vendor._,
        jqueryUi = Vendor.UI,
        jqueryUiTouch = Vendor.UITouch,
        Class = Vendor.utils.Class,
        View,
        template;
    View = Class.extend({
        defaultOptions:{

        },
        constructor:function(opt){
            this.options = _.extend({},this.defaultOptions, opt);
            this.initialize();
        },
        initialize: function() {
            this.render();
            this.tempToggle();
        },
        render: function() {
            template = _.template(tmp_settings);
            $('#main-settings').html(template({}));
        },
        tempToggle: function() {
            $(".temp-f").on("click",function(){
                $(this).toggleClass("temp-active");
                $(".temp-c").toggleClass("temp-active");
            });
            $(".temp-c").on("click",function(){
                $(this).toggleClass("temp-active");
                $(".temp-f").toggleClass("temp-active");
            });
        }
    });
    return View;
});