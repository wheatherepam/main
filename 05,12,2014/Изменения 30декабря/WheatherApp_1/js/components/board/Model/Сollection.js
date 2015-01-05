define(['Vendor','./Model'],function(Vendor,Model){

    var Class=Vendor.util.Class;
        Collection;

    Collection=Class.Extend({

        defaultOptions:{},

        constructor:function(){
            this.options= _.extend({},this.defaultOptions);
            this.items=[];
            this.addItem();
            this.removeItem();
        },

        addItem:function(id,city){

            this.items.push(new Model(id,city));
        },

        removeItem:function(){

        }
    })

});