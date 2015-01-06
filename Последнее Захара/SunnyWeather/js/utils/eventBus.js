define(['utils/util'],function (util) {
    var EventEmitter = util.EventEmitter,
        eventBus = new EventEmitter();

    return eventBus;
});