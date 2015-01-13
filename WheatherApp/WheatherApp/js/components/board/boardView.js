define('components/board/boardView', [
    'Vendor',
    'text!./boardTmpl.html',
    './boardController',
    'sidebar'

], function (Vendor, boardTemplate) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        Class = Vendor.util.Class,
        BoardView;


    BoardView = Class.extend({

        defaultOptions: {},

        constructor: function (options) {

            this.options = _.extend({}, this.defaultOptions, options);
            this.initialize();

        },

        initialize: function () {

        },

        render:function(col){


            var selfRender=this;
            this.$holder = $(selfRender.options.rootHolder);

                _(col).forEach(function(item,i){
                    selfRender.boardTempl = _.template(boardTemplate);
                    selfRender.$holder.append(selfRender.boardTempl(item));
                    console.log(item)
                });


        }
    });

  return BoardView;

});
