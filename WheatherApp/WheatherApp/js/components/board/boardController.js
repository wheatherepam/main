define('components/board/boardController',[
       './boardView',
       'Vendor',
       'components/collection'
],function(BoardView,Vendor,Collection){

        var $=Vendor.$,
            _=Vendor._,
            Class=Vendor.Class,
            EventBus=Vendor.util.EventBus,
            exSlider=Vendor.util.
            Board;

         Class=Vendor.util.Class;

         Board=Class.extend({

            defaultOptions:{},

            constructor:function(options){

                this.options= _.extend({},this.defaultOptions,options);
                this.collection = new Collection();
                this.initialize();
            },

            initialize:function(){

               var selfInit=this;
               this.view = new BoardView({rootHolder: this.options.rootHolder});

               //col.addItems([{id:'CjQwAAAADu00FCzvsJWyoO-OrxJFhKvBpLTysNuEBIwcRJ6Wh8jO_FwvekK_xmPMQjC27rbPEhBd7tkyN18sFNIb1Eniqc56GhQXcQn2H8yzeYZHi8w0abtCm0qO_w', city:'aaaa'},{id:'CjQwAAAADu00FCzvsJWyoO-OrxJFhKvBpLTysNuEBIwcRJ6Wh8jO_FwvekK_xmPMQjC27rbPEhBd7tkyN18sFNIb1Eniqc56GhQXcQn2H8yzeYZHi8w0abtCm0qO_w', city:'aaaa'}]);

                //getSites from dashboard
                EventBus.on('add', selfInit.collection.addItems, selfInit.collection);
                EventBus.on('ololo', function() {
                    selfInit.view.render(selfInit.collection.getItems());
                });

                $.when(selfInit.collection.ready).done(function(){
                });


            },

            render:function(){

            }
        });

  return Board;
});