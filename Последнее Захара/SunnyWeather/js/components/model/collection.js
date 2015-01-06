define(['vendor','./model','eventbus'], function (Vendor, Model, eventbus) {
    "use strict";
    var Class = Vendor.utils.Class,
        _ = Vendor._,
        Collection;

        Collection = Class.extend({
            defaultOptions: {},
            constructor: function (opt) {
                this.options = _.extend({}, this.defaultOptions, opt);
                this.collection = [];
                this.initialize();
            },
            initialize: function () {
                this.create([{id:'CjQwAAAADu00FCzvsJWyoO-OrxJFhKvBpLTysNuEBIwcRJ6Wh8jO_FwvekK_xmPMQjC27rbPEhBd7tkyN18sFNIb1Eniqc56GhQXcQn2H8yzeYZHi8w0abtCm0qO_w', city:'Kiev'},
                            {id:'CjQuAAAAv2v4kxcCd7F_4btBm5skGTOltgXHclKoShHxaQSFj8HoOfs6kfDokd8jvSLYbODGEhDz22nOD_F4ptB4gBs9lI2IGhTUJpPF3i3irSTt3-HZQAECHAnUdA', city:'London'},
                            {id:'CjQnAAAAxXrN4y_4vNmn2N9sTGh_OwB-9YGV4NNOYU8tYTEKqjw97gsH0xfxwycpUChfTJnpEhAhypifwqSQR-iSLL4CSZEHGhQEguU38jP-zyYMOeQjBNX-OHNKfw', city:'Madrid'}]);
                eventbus.on('update',this.update,this);
                eventbus.on('delete',this.delete,this);
                eventbus.on('addNew',this.create,this);
            },
            create: function(data, adding) {
                var self = this,
                    promiseArr = [],
                    temp;
                _(data).forEach(function(o){
                    temp = new Model(o.id, o.city);
                    self.collection.push(temp);
                    promiseArr.push(temp.promise);
                });
                /**
                 * If this is adding operation collection trigger event update
                 * This event calling when search controller trying to add elements
                 */
                if(adding){
                    $.when.apply($, promiseArr).then(function(){
                        eventbus.trigger('updated',self.collection);
                    });
                } else {
                    /**
                     * If this is collection initialization trigger event ready
                     * Calling by first application start
                     */
                    $.when.apply($, promiseArr).then(function(){
                        eventbus.trigger('ready',self.collection);
                    });
                }
            },
            update: function(){
                var self = this, promise,
                    promiseArr = [];
                _(this.collection).forEach(function(o){
                    promise = o.getForecast();
                    promiseArr.push(promise);
                });
                $.when.apply($, promiseArr).then(function(){
                    eventbus.trigger('updated',self.collection);
                });
            },
            delete: function(opt){
                this.collection.splice(opt[0], opt.length);
                this.update();
            }
        });
    return Collection;
});