define(['vendor','./searchView','./searchCollection','eventbus'],function(Vendor, View, collection, eventbus) {
    "use strict";
    var _ = Vendor._,
        $ = Vendor.$,
        Search,
        Class = Vendor.utils.Class;

    Search = Class.extend({
        defaultOptions:{},
        constructor:function(opt){
            this.options = _.extend({},this.defaultOptions, opt);
            this._searchView = null;
            this._initData = null;
            this._searchRes = null;
            eventbus.on('ready',this.initialize,this);
            eventbus.on('updated',this.renderView,this);
        },
        initialize: function(data){
            this.renderView(data);
            this.btn_Init();
        },
        renderView: function(data){
            var filteredData = [],
                temp;
            _(data).forEach(function(o){
                temp = {};
                    temp.id = arguments[1];
                    temp.city = o.city;
                    temp.summary = o.forecast.currently.summary;
                    temp.temp = o.forecast.currently.temperature^0;
                    temp.icon = o.forecast.currently.icon;
                filteredData.push(temp);
            });
            this._initData = filteredData;
            this._searchView = new View(filteredData);
        },
        searchStart: function(str){
            var self = this;
            collection.sendResponse(str);
            $(collection).on('haveBeenChanged',function(){
                self._searchRes = collection.getData();
                /**
                 * function get second flag-argument, this say that is a search result rendering
                 */
                self._searchView.render(self._searchRes, true);
            });
        },
        removeCities: function(opt){
            eventbus.trigger('delete',opt);
        },
        addCities: function(opt){
            var self = this,
                result = [];
            if(!opt.length){
                this._searchView.render(this._initData);
            } else {
                _(opt).forEach(function(i){
                    result.push({
                            'city': self._searchRes[i].city,
                            'id': self._searchRes[i].id
                    });
                });
                eventbus.trigger('addNew',result,true);
            }
        },
        btn_Init:function(){
            var self = this,
                search = $("#search-form"),
                $cities = $('.fav-place');
            $(".slide-hide").on("click",function(){
                var side = $("#sidebar");
                if($(this).hasClass("hide-btn")){
                    $(this).removeClass("hide-btn");
                    side.css("left","");
                    return;
                }
                $(this).addClass("hide-btn");
                side.css("left","100%");
            });
            /**
             * Show search input
             */
            $(".add-btn").on("click",function(){
                var result = [];
                if(search.css('display') == 'none'){
                    $(this).css("color","red");
                    search.css("display","inline-block");
                } else {
                    _($('.add')).forEach(function(o){
                        if($(o).is(':checked')){
                            result.push(arguments[1]);

                        }
                    });
                    self.addCities(result);
                    search.css("display","none");
                    search.find("input").val("");
                    $(this).css("color","#fff");
                    $(this).removeClass('icon-check');
                }
            });
            /**
             * Init search by keyup event
             */
            search.on("keyup", "input", function(){
                self.searchStart($(this).val());
            });
            /**
             * Listener for delete button
             */
            $(".delete-btn").on('click',function(){
                var result = [], temp;
                $(this).css('color','');
                _($('.city-picker')).forEach(function(o){
                   if($(o).is(':checked')){
                       temp = $(o).data('id');
                       result.push(temp);
                       $('.fav-place').eq(temp).remove();
                   }
                });
                result.length > 0 ? self.removeCities(result) : false;
            });
        }
    });
    return Search;
});