define('components/page/pageView', [
    'vendor',
    'text!./pageTmpl.html'
], function (Vendor, boardTemplate) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        Class = Vendor.util.Class,
        PageView;


   PageView = Class.extend({

        defaultOptions: {},

        constructor: function (options) {

            this.options = _.extend({}, this.defaultOptions, options);

            this.tmpl = _.template(boardTemplate);

            this.initialize();

        },

        initialize: function () {
           this.render();

        },

       render:function(){

           this.$holder = $(this.options.rootHolder);

           this.$holder.append(this.tmpl({}));
       }


    });
    return PageView;
});