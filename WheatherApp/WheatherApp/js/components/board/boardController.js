define('components/board/boardController',[
       './boardView',
       'Vendor',
       './Model/Сollection'

],function(BoardView,Vendor,Collection){

        var $=Vendor.$;
        var _=Vendor._;

        var Class=Vendor.util.Class;

        var Board=Class.extend({

            defaultOptions:{},

            constructor:function(options){

                this.options= _.extend({},this.defaultOptions,options);
                this.initialize();
            },

            initialize:function(){

                var selfInit=this;

               this.view=new BoardView({rootHolder: this.options.rootHolder});

               var col=new Collection();

               col.addItems([{id:'CjQwAAAADu00FCzvsJWyoO-OrxJFhKvBpLTysNuEBIwcRJ6Wh8jO_FwvekK_xmPMQjC27rbPEhBd7tkyN18sFNIb1Eniqc56GhQXcQn2H8yzeYZHi8w0abtCm0qO_w', city:'aaaa',country:'qqq'}]);
               col.addItems([{id:'CjQwAAAADu00FCzvsJWyoO-OrxJFhKvBpLTysNuEBIwcRJ6Wh8jO_FwvekK_xmPMQjC27rbPEhBd7tkyN18sFNIb1Eniqc56GhQXcQn2H8yzeYZHi8w0abtCm0qO_w', city:'aaaa',country:'qqq'}]);

               selfInit.view.render(col);

            }
        });

  return Board;
});