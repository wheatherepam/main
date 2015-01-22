define([
    'Vendor',
    'text!./boardTmpl.html',
    'bxSlider'
], function (Vendor, boardTemplate) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        Class = Vendor.util.Class,
        EventBus=Vendor.util.EventBus,
        BoardView;

    BoardView = Class.extend({

        defaultOptions: {},

        constructor: function (options) {
            this.options = _.extend({}, this.defaultOptions, options);
        },
        initGallery: function () {
            this.sliderr = $('.bxslider').bxSlider({
                controls: false,
                adaptiveHeight: true
            });
        },
        reloadGallery: function () {
            this.sliderr.reloadSlider();
        },
        render:function(col){
            var selfRender=this;
            this.$holder = $(selfRender.options.rootHolder);
            this.$holder.empty();
            _(col).forEach(function(item){
                selfRender.boardTempl = _.template(boardTemplate);
                selfRender.$holder.append(selfRender.boardTempl(item));
            });
            this.reloadGallery();
        }
    });

  return BoardView;

});
