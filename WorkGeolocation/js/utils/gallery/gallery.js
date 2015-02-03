define(
    [
        'Vendor',
        'bxSlider'
    ],
    function (Vendor) {
        var $ = Vendor.$;
        'use strict';
        var Gallery = function () {};

        Gallery.prototype =  {
            init: function () {
                $(document).ready(function () {
                    var slider = $('.bxslider').bxSlider({controls: false});
                });
            }
        };
        return Gallery;
    }
);