define(['vendor'], function (Vendor) {
    "use strict";
    var Class = Vendor.utils.Class,
        _ = Vendor._,
        Model;

    Model = Class.extend({
        defaultOptions: {},

        constructor: function(opt){
            this.options = _.extend({}, this.defaultOptions, opt);
            this.initialize(opt);
        },

        initialize: function(opt){
            _.extend(this, opt);
        }
    });
    return Model;
});