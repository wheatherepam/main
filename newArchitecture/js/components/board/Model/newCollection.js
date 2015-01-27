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


        refresh:function(){
            var selfRef=this,
                promiseArr=[];


            this._colRep.length=0;
            this.updateData.forEach(function(item){

                var temp={};
                temp.id= item.id;
                temp.city=item.city;
                temp.model= new Model(temp.id, temp.city);
                selfRef._colRep.push(temp);
                promiseArr.push(temp.model.promise);
            }.bind(this));

            $.when.apply($, promiseArr).done(function(){

                selfRef.rd.resolve();

                EventBus.trigger('getdata',selfRef._colRep);

            });

        }
    });

    return  Collection;

});