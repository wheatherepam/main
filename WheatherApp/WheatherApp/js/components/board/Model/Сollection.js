define(['Vendor','./Model'],function(Vendor,Model){

    var Class=Vendor.util.Class,
        $=Vendor.$;


    var Collection=Class.extend({
       constructor:function(){
           this.ready= $.Deferred();
           this._colRep=[];
           this.addItems();
           //this.removeItems();
           this.showItems();
       },

        addItems:function(obj){
            var selfAdd=this;
              var  promiseArr=[];


            _(obj).forEach(function(o){
                var temp={};
                temp.id= o.id;
                temp.country=o.country;
                temp.model=new Model(o.id, o.city);
                selfAdd._colRep.push(temp);
                promiseArr.push('true')
            });




            $.when(promiseArr.every(function(num){return num==true})).done(function(){
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

   /* Collection=function(){
            var self=this;
            this.colRep=[];

            this.addItems=function(obj){
                _(obj).forEach(function(o){
                    var temp={};
                    temp.id= o.id;
                    temp.country=o.country;
                    temp.model=new Model(o.id, o.city);
                    self.colRep.push(temp);
                })
            };

            this.removeItems=function(obj){
                for(var i=0;i<obj.length;i++){
                    if(obj[i].id==self.colRep[i].id){
                        self.colRep.splice(i,1);
                    }
                }
            };

            this.showItems=function(){
                return self.colRep;
            }
    };*/

 return Collection;

});