require.config({
    baseUrl: 'js',
    paths: {
        'jquery': 'libs/jquery-1.11.2',
        'lodash': 'libs/lodash',
        'text': 'libs/text',
        'sidebar':'utils/sidebar',
        'Apikey':'app/Appikey'
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