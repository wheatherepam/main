define(['vendor',
    'text!./templates/tmp_sideStructure.html',
    'text!./templates/tmp_searchItem.html',
    'text!./templates/tmp_favoriteCities.html',
    'utils/settingSlider']
    , function (Vendor, tmp_str, tmp_res, tmp_cities) {
    "use strict";
    var $ = Vendor.$,
        Class = Vendor.utils.Class,
        View,
        template;
    View = Class.extend({
        defaultOptions:{
        },
        constructor:function(opt){
            this.options = _.extend({},this.defaultOptions, opt);
            this.initialize(opt);
        },
        initialize: function(opt) {
            if( $('#sidebar').length == 0 ) {
                this.structure();
            }
            this.render(opt);
            this.dlt_btn();
        },
        render: function(data, search) {
            var holder = $('.cities-box');
                holder.empty();
            /**
             * render the searching result if function have been called with second argument
             */
            if(search && data){
                _(data).forEach(function(o){
                    template = _.template(tmp_res);
                    holder.append(template(o));
                });
            } else {
                _(data).forEach(function(o){
                    template = _.template(tmp_cities);
                    holder.append(template(o));
                });
            }
            this.add_btn();
        },
        structure: function() {
            template = _.template(tmp_str);
            $('#wrapper').append(template({}));
        },
        add_btn: function() {
            var $addCand = $('.add'),
                $add_btn = $('.add-btn');
            $addCand.on('click',function(){
                if( $(this).is(':checked') ) {
                    $add_btn.addClass('icon-check');
                    $add_btn.css('color','green');
                } else {
                    if(!$addCand.is(':checked')){
                        $add_btn.css('color','red');
                        $add_btn.removeClass('icon-check');
                    }
                }
            });
        },
        dlt_btn: function(){
            var $deleteCand = $('.city-picker'),
                $delete_btn = $(".delete-btn");
            /**
             * Hightlight remove elements button
             */
            $deleteCand.on('click',function(){
                if( $(this).is(':checked') ) {
                    $delete_btn.css('color','red');
                } else {
                    if(!$deleteCand.is(':checked')){
                        $delete_btn.css('color','');
                    }
                }
            });
        }
    });
    return View;
});