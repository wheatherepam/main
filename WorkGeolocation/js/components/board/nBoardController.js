define('components/board/nBoardController',[
    './boardView',
    'Vendor',
    './Model/Collection',
    './Model/Model',
    'touchPunch'


],function(BoardView,Vendor,Collection,Model){

    var $=Vendor.$,
        _=Vendor._,
        Class=Vendor.util.Class,
        EventBus=Vendor.util.EventBus,
        Board;

    Board=Class.extend({

        constructor:function(options){
            this.options = options;
            this.initialize();
        },

        initialize:function(){
            this.col=new Collection();
            this.view = new BoardView({rootHolder: this.options.rootHolder});
            this.view.initGallery();
            this.getCurrentWheather();
            this.attachEvents();

            EventBus.on('add',this.addCity, this);
            EventBus.on('update',this.removeCity,this);
            EventBus.on('getdata',this.view.render, this.view);
            EventBus.on('changecelge',this.changeCelge,this);
            EventBus.on('changefarengeit',this.changeFarengeit,this);
        },

        addCity:function(obj){
            var rd=$.Deferred();

            var selfAdd=this,
                promiseArr=[];


            obj.forEach(function(o){

                var self=this;
                //Save wheather
                var temp={};
                temp.id= o.id;
                temp.city=o.city;
                temp.model= new Model(temp.id, temp.city);

                $.when(temp.model.promise).done(
                    selfAdd.col.addItems(temp),
                    promiseArr.push(temp.model.promise)
                )
            }.bind(this));

            $.when.apply($, promiseArr).done(function(){

                rd.resolve();
                EventBus.trigger('getdata',selfAdd.col._colRep);

            });
        },

        removeCity:function(id){

            this.col.updateItems(id);
            EventBus.trigger('getdata',this.col._colRep);

        },

        getCurrentWheather:function(){
            var selfCurrent=this;

            if(this.col._colRep.length===0){

                /**
                 * Get current position using geoLocation
                 **/
                if (navigator.geolocation) {

                    navigator.geolocation.getCurrentPosition(_getPlaceInfo);

                } else {
                    console.log('Can not get geoLocation');

                }

                /**
                 * Get place info using google GeoCoder API
                 * */
                function _getPlaceInfo(data){

                    var self,
                        pyrmont,
                        map,
                        service;

                    pyrmont = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);

                    geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'latLng': pyrmont},function(data){

                        var description=(data[0].formatted_address);
                        _getAutoComplete(description);

                    });

                }

                /**
                 * Get place id using Autocomplete API
                 * */
                function _getAutoComplete(str){
                    var autoComplete,
                        options={
                            input:str
                        };

                    autoComplete = new google.maps.places.AutocompleteService(null, { types: ['cities'] } );

                    autoComplete.getPlacePredictions( options, function(data, status){

                        if(status === "OK"){

                            var desciption=data[0].description.split(',');
                            var temp = {};
                            temp.city = desciption[1];
                            temp.id = data[0].reference;
                            temp.model=new Model(temp.id);

                            $.when(temp.model.promise).done(function(){

                                selfCurrent.col.addItems(temp);
                                EventBus.trigger('getdata', selfCurrent.col._colRep);
                                }
                            );
                        } else {
                            throw new Error('Server error, check your connection ' + code);
                        }
                    });
                }
            }
        },

        attachEvents:function(){
            this.refresh();
            this.dayduration();
        },

        refresh:function(){
            var selfRefresh=this;
            $('body').on('click','.ref-icon',function(){
                $('.ref-icon').addClass('rotate');

                var updateArray=[],
                    promiseArr=[];

                var rd=$.Deferred();

                selfRefresh.col._colRep.forEach(function(item){
                    var temp={};
                    temp.id=item.id;
                    temp.city=item.city;
                    updateArray.push(temp);
                });

                selfRefresh.col.clear();

                updateArray.forEach(function(item){

                   var temp={};
                   temp.id=item.id;
                   temp.city=item.city;
                   temp.model=new Model(item.id,item.city);

                    $.when(temp.model.promise).done(function(){

                        selfRefresh.col.addItems(temp);
                        promiseArr.push(temp.model.promise);
                        EventBus.trigger('getdata',selfRefresh.col._colRep);

                    });
                });
            });
        },

        changeCelge:function(){
            var self=this;
            var elem=this.col.getItems();

           this.changedWheather= _.cloneDeep(this.col._colRep);
           //this.changedWheather[0].model.filterData = $.extend({},this.col._colRep[0].model.filterData);



            _(this.changedWheather).each(function(item){

                item.model.filterData.current.temp=self.celgeConversion(item.model.filterData.current.temp);

                _.forEach(item.model.filterData.hourly,function(itm){
                    itm.temp=self.celgeConversion(itm.temp);
                    //itm.temp=this.celgeConversion(itm.temp);
                });

                _.forEach(item.model.filterData.week,function(itm){
                    itm.maxTemp=self.celgeConversion(itm.maxTemp);
                    //itm.temp=this.celgeConversion(itm.temp);
                });

                _.forEach(item.model.filterData.week,function(itm){
                    itm.minTemp=self.celgeConversion(itm.minTemp);
                    //itm.temp=this.celgeConversion(itm.temp);
                });
            });




            EventBus.trigger('getdata',this.changedWheather);
        },

        changeFarengeit:function(){
            EventBus.trigger('getdata',this.col._colRep,this.col);
        },

        celgeConversion:function(param){
            return parseInt((param-32)/1.8);
        },

        dayduration:function(){

            $('body').on('click','.bx-pager-link.active',function(){
                var number=$(this).attr('data-slide-index');
                var curlayout= $('.gallery-item')[number];

                var dayDuration=$(curlayout).attr('dayDuration')+'s';

                var currentdayphaze=$(curlayout).attr('currentdayphaze')+'s';

                console.log('dayDuration',dayDuration,'currentdayphaze',currentdayphaze);


                $('#wrap').removeClass('anima');
                setTimeout(function(){

                    if(dayDuration!=currentdayphaze){
                        $('#wrap').addClass('anima');
                        $('.anima').css({'-webkit-animation-duration':dayDuration,'-webkit-animation-delay':-currentdayphaze});
                    }


                },100);

            })

        }




    });

    return Board;
});