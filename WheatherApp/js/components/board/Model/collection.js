define(['Vendor','./Model'],function(Vendor,Model){
    var Class=Vendor.util.Class,
        EventBus=Vendor.util.EventBus,
        $=Vendor.$;
        _=Vendor._;


    var Collection=Class.extend({
        constructor:function(){
            this._colRep=[];
            this.updateData=[];
        },


        ready:function(obj,param){

            this.rd= $.Deferred();

            if(param==='add'){
                this.addItems(obj);

            } else{
                this.updateItems(obj);
            }
        },

        addItems:function(obj){
            console.log("addItems",obj)
            var selfAdd=this,
                promiseArr=[];

            obj.forEach(function(o){

                var self=this;
                //Save wheather
                var temp={};
                temp.id= o.id;
                temp.city=o.city;
                temp.model= new Model(temp.id, temp.city);
                selfAdd._colRep.push(temp);

                //Save info for update
                var updatetemp={};
                updatetemp.id= o.id;
                updatetemp.city=o.city;
                this.updateData.push(updatetemp);

                promiseArr.push(temp.model.promise);

            }.bind(this));

            $.when.apply($, promiseArr).done(function(){

                selfAdd.rd.resolve();

                EventBus.trigger('getdata',selfAdd._colRep);

            });
        },

        updateItems:function(id){

            var selfUpdate=this;

            var result=_.reject(selfUpdate._colRep,(function(item){
                return _.contains(id,item.id);
            }));

            selfUpdate._colRep=result;

            EventBus.trigger('getdata',result);
        },

        refresh:function(){
             var selfRef=this,
                 promiseArr=[];


             this._colRep.length=0;
            console.log(this.updateData);

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