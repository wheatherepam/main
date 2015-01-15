define(['Vendor','./board/Model/Model'],function(Vendor,Model){
    var Class=Vendor.util.Class,
        EventBus=Vendor.util.EventBus,
        $=Vendor.$;


    var Collection=Class.extend({
        constructor:function(){
            this.ready= $.Deferred();
            this._colRep=[];

            //this.removeItems();
            //this.showItems();
        },

        addItems:function(obj){
            var selfAdd=this,
                promiseArr=[];

            var ready= $.Deferred();

            obj.forEach(function(o){
                var temp={};
                temp.id= o.id;
                temp.city=o.city;
                temp.model= new Model(temp.id, temp.city);
                selfAdd._colRep.push(temp);
                promiseArr.push(temp.model.promise);
            });

            $.when.apply($, promiseArr).done(function(){
                EventBus.trigger('ololo');
                selfAdd.ready.resolve();
            });


        },

       getItems:function(){
            return this._colRep;
        }

    });

    return Collection;

});