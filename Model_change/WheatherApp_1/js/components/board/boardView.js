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

            this.tmpl = _.template(boardTemplate);

            this.initialize();

        },

        initialize: function () {
            //Определяем что вставлять
            this.$holder = $(this.options.rootHolder);
            //Вставляем теиплейт в холдер
            this.$holder.append(this.tmpl({}));
        }


    });



    return BoardView;
});