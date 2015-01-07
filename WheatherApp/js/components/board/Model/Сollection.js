define(['Vendor','./Model'],function(Vendor,Model){

    var Class=Vendor.util.Class,
        Collection;

    Collection=function(){

            this.colRep=[];

            this.addItem=function(id,city){
                var temp={};
                temp=new Model(id,city);
                this.colRep.push(temp);
            };

            this.removeItem=function(id){

            };

            this.showItems=function(){
                return this.colRep;
            }




    };

    //Collection=function(){
    //
    //    var colRep=null;
    //
    //    return function(){
    //
    //        addItem=function(id,city){
    //            var temp={};
    //            temp.id=id;
    //            temp.city=city;
    //            colRep.push(temp);
    //        };
    //
    //        removeItem=function(id){
    //
    //        };
    //
    //        showItems=function(){
    //            return colRep;
    //        }
    //
    //    }
    //};

    return Collection;

});