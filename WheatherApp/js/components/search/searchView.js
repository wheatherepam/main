define('components/search/searchView', [
    'Vendor',
    'text!./Templates/searchWrapperTemplate.html',
    'sidebar'

], function (Vendor, mainModuleTemplate, side) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        Class =Vendor.util.Class,
        SearchView;

   SearchView = Class.extend({

        defaultOptions: {},

        constructor: function (options) {

            this.options = _.extend({}, this.defaultOptions, options);

            this.tmpl = _.template(mainModuleTemplate);

            this.initialize();

        },

        initialize: function () {
           this.render()

        },

        render:function(data){
           
            this.$holder = $(this.options.rootHolder);

            this.$holder.append(this.tmpl({}));
            side();
        }
    });

    return SearchView;

});