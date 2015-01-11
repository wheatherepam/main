define('components/search/searchView', [
    'Vendor',
    'text!./Templates/searchCityTemplate.html',
    'sidebar'

], function (Vendor,cityTemplate, side) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        Class =Vendor.util.Class,
        SearchView;

   SearchView = Class.extend({

        defaultOptions: {},

        constructor: function (options) {

            this.options = _.extend({}, this.defaultOptions, options);
            this.initialize();

        },

        initialize: function () {
           this.render()

        },

        render:function(places){

            this.$holder = $(this.options.rootHolder);
            var selfRender=this;
            this.citeTeml;
            this.$holder;

            $('.town-weather').remove();

            _(places).forEach(function(key){
                selfRender.citeTeml= _.template(cityTemplate);
                selfRender.$holder.append(selfRender.citeTeml(key));
            });


            side();

            this.addcites();
            this.removeCites()
        },
        
        addcites:function(){
            $('.changed-places input:checkbox').click(function(){
                $('.add-place').removeClass('icon-add').addClass('icon-check').css({'color':'green'});
                $('#search').val('');
            })
        },

        removeCites:function(){
            $('.hide-menu').click(function(){
                  function delay(){
                      $('#search').val('').addClass('hide');
                      $('.add-place').removeClass('icon-check').addClass('icon-add').css({'color':'white'});
                      $('.town-weather').remove();
                  }
                 setTimeout(delay,2000);

            })
        }


    });

    return SearchView;

});