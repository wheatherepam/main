require.config({
    baseUrl: 'js',
    paths: {
        'Apikey':'app/Appikey',
        'jquery': 'libs/jquery-1.11.2',
        'lodash': 'libs/lodash',
        'text': 'libs/text',
        'sidebar':'utils/sidebar',
        'dateConvertor':'utils/Convertor/dateConvertor',
        'slider':'utils/Slider/jQueryUislider'
    },

    shim: {
        'jquery': {
            exports: '$'
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