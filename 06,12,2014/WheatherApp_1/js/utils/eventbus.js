define('eventbus',['Vendor'],function(Vendor){

    var eventBus=Vendor.util.EventEmitterer();

    return eventBus;
});