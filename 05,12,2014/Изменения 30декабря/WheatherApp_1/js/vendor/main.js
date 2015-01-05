define('Vendor',[
    'vendor/core',
    'utils/util'
    ],function(core,util){
        'use strict';
        return{
            '$':core.$,
            '_':core._,
            'util':util
        };
});