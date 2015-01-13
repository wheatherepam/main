define("utils/util", [
    'vendor/core'
], function (core) {
    'use strict';

    var _ = core._;

    /**
     * Extend class
     * @param protoProps
     * @param staticProps
     * @returns {*}
     */
    var extend = function(protoProps, staticProps) {
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ return parent.apply(this, arguments); };
        }

        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) {
            _.extend(child.prototype, protoProps);
        }

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };

    var Class = function () {};

    Class.extend = extend;

    /**
     *
     * @constructor
     */
    var EventEmitter = function() {
        this._listeners = {};
    };

    EventEmitter.prototype.trigger = function(name) {
        var argumentsArr = Array.prototype.slice.call(arguments, 1);

        if(!(name in this._listeners)) {
            throw new Error('This name does not exist');
        }

        this._listeners[name].forEach(function(obj) {
            obj.callback.apply(obj.ctx, argumentsArr);
        });
    };

    EventEmitter.prototype.off = function(name) {
        delete this._listeners[name];
    };

    EventEmitter.prototype.on = function(name, callback, ctx) {
        ctx = ctx || {};

        var events = this._listeners[name] || (this._listeners[name] = []);

        events.push({
            callback:callback,
            ctx:ctx
        });
    };

    var EventBus=new EventEmitter();

    return {
        'Class': Class,
        'EventBus': EventBus
    };
});