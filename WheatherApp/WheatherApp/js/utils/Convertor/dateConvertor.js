define([], function () {
    'use strict';

    var Convertor = function () {

    };

    Convertor.getMinutes = function (ms, offset) {
        this.offset = offset || 0;
        var localTime = new Date(ms);
        return new Date(localTime.getUTCFullYear(), localTime.getUTCMonth(), localTime.getUTCDate(), (localTime.getUTCHours() + this.offset), localTime.getUTCMinutes()).getMinutes();
    };

    Convertor.getHours = function (ms, offset) {
        this.offset = offset || 0;
        var localTime = new Date(ms);
        return new Date(localTime.getUTCFullYear(), localTime.getUTCMonth(), localTime.getUTCDate(), (localTime.getUTCHours() + this.offset), localTime.getUTCMinutes()).getHours();
    };

    Convertor.getDate=function(ms,offset){
        this.offset = offset || 0;
        var localTime = new Date(ms);
        return  new Date (localTime.getUTCFullYear(), localTime.getUTCMonth(), localTime.getUTCDate(), (localTime.getUTCHours() + this.offset),  localTime.getUTCMinutes()).getDate();
    };

    Convertor.getWeekDay = function (ms, offset) {
        this.offset = offset || 0;
        var localTime = new Date(ms);
        var param = new Date (localTime.getUTCFullYear(), localTime.getUTCMonth(), localTime.getUTCDate(), (localTime.getUTCHours() + this.offset),  localTime.getUTCMinutes()).getDay();
        var Week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return Week[param];
    };

    Convertor.getMonth = function (ms, offset) {
        this.offset = offset || 0;
        var localTime = new Date(ms);
        var param = (new Date(localTime.getUTCFullYear(), localTime.getUTCMonth(), localTime.getUTCDate(), (localTime.getUTCHours() + this.offset), localTime.getUTCMinutes())).getMonth();
        var Mounth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return Mounth[param];
    };

    return Convertor;
});