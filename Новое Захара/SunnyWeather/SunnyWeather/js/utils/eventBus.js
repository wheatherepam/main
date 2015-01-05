define("evenbus",['utils'],function (utils) {
    var eventBus = new utils.EventEmitter();

    return eventBus;
});