define(['Vendor','./Forecast'],function(Vendor,Model){

    var Class=Vendor.util.Class,
        Collection;

    Collection=function(){

        this.colRep=[];

        this.addItem=function(id,city){
            var temp={};
            temp=new Forecast(id,city);
            this.colRep.push(temp);
        };

        this.removeItem=function(id){

        };

        this.showItems=function(){
            return this.colRep;
        }




    };

    return Collection;

});