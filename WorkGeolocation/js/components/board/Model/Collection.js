define(['Vendor','./Model'],function(Vendor,Model){
    var Class=Vendor.util.Class,
        EventBus=Vendor.util.EventBus,
        $=Vendor.$;
    _=Vendor._;


    var Collection=Class.extend({
        constructor:function(){
            this._colRep=[];
        },

        addItems:function(obj){
            this._colRep.push(obj);

        },

        clear:function(){
          this._colRep.length=0;
        },

        updateItems:function(id){

            var selfUpdate=this;

            var result=_.reject(selfUpdate._colRep,(function(item){
                return _.contains(id,item.id);
            }));

            selfUpdate._colRep=result;

        },

        getItems:function(){
            return this._colRep;
        }


    });

    return  Collection;

});