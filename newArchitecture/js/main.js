require.config({
    baseUrl: 'js',
    paths: {
        'Apikey':'app/Appikey',
        'jquery': 'libs/jquery.min',
        'jqueryUI':'libs/jquery-ui.min',
        'lodash': 'libs/lodash',
        'text': 'libs/text',
        'dateConvertor':'utils/Convertor/dateConvertor',
        'slider':'utils/Slider/jQueryUislider',
        'bxSlider':'libs/bxslider',
        'touchPunch':'libs/jquery.ui.touch-punch.min',
        'hammer':'libs/hammer'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'bxSlider': {
            exports: "$",
            deps: ['jquery']
        },

        'jqueryUI': {
            deps: ['jquery']
        },

        'hammer':{
            deps: ['jquery',
                'jqueryUI']
        },
        'touchPunch':{
            deps: ['jquery',
                'jqueryUI']
        },

        'lodash': {
            export: '_'
        }
    },
    packages: [
        'Vendor'
    ]
});

define('main', [
    'Vendor',
    'app/app'
], function (Vendor, App) {
    'use strict';
    Vendor.$(function () {
        new App();
    });
});