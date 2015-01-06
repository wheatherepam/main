define('vendor/core',[
    'jquery',
    'lodash',
    'moment',
    'moment_tz'],function($,_,moment,moment_tz){
        'use strict';

    debugger;
        return{
            '$':$,
            '_':_,
            'moment':moment,
            'moment_tz':moment_tz
        };
});