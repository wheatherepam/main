define(['Vendor','./Model'],function(Vendor,Model){

    var Class=Vendor.util.Class,
        EventBus=Vendor.util.EventBus,
        $=Vendor.$;


    var Collection=Class.extend({
       constructor:function(){
           this.ready= $.Deferred();
           this._colRep=[];
           //this.addItems(obj);
           //this.removeItems();
           this.showItems();
       },

        addItems:function(obj){
            var selfAdd=this,
                promiseArr=[];

            _(obj).forEach(function(o){
                var temp={};
                temp.id= o.id;
                temp.city=o.city;
                temp.model=new Model(o.id, o.city);
                selfAdd._colRep.push(temp);
                promiseArr.push(temp.model.promise);

            });

            $.when.apply($,promiseArr).done(function(){

                selfAdd.ready.resolve();
            })
        },

       // removeItems:function(){
       //     var selfRemove=this;
       //
       //     for(var i=0;i<obj.length;i++){
       //         if(obj[i].id==self.colRep[i].id){
       //             selfRemove.colRep.splice(i,1);
       //         }
       //     }
       //},

        showItems:function(){
         return this._colRep;
        }

});

 return Collection;

});