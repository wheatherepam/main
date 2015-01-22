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
        'bxSlider':'libs/bxslider'
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