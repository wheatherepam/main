define(['vendor',
    'text!./templates/tmp_sideStructure.html',
    'text!./templates/tmp_searchItem.html',
    'text!./templates/tmp_favoriteCities.html',
    'utils/settingSlider']
    , function (Vendor, tmp_str, tmp_res, tmp_cities) {
    "use strict";
    var $ = Vendor.$,
        //_ = Vendor._,
        Class = Vendor.utils.Class,
        View,
        template;

        View = Class.extend({

        defaultOptions:{},

        constructor:function(opt){
            this.options = _.extend({},this.defaultOptions, opt);
            this.initialize(opt);
        },
        initialize: function(opt) {
            this.structure();
            this.render(opt);
        },
        searchResult: function(data){
            var holder = $('.cities-box');
            if(data){
                holder.empty();
                _(data).forEach(function(x){
                    template = _.template(tmp_res);
                    holder.append(template(x));
                });
            }
        },
        render: function(data) {
            var holder = $('.cities-box');
            holder.empty();
            _(data).forEach(function(x){
                template = _.template(tmp_cities);
                holder.append(template(x));
            });

        },
        structure: function() {
            template = _.template(tmp_str);
            $('#wrapper').append(template({}));
        }
    });
    return View;
});