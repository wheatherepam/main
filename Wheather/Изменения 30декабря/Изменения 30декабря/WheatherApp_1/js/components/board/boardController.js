define('components/board/boardController',[
       'boardView',
       'vendor'],function(BoardView,Vendor){

        var $=Vendor.$;
        var _=Vendor._;

        var Class=Vendor.utils.Class();

        var Board=Class.extend({

            defaultOptions:{},

            constructor:function(options){
                this.options= _.extend({},this.defaultOptions,options);
                this.initialize();
            },

            initialize:function(){

               this.view=new BoardView({rootHolder: this.options.rootHolder})
            }
        })

        return Board();

})