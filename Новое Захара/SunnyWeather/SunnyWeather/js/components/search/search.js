define(['vendor','./searchView','./searchCollection'],function(Vendor, View, collection) {
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
            this.initialize();
            this.btn_Init();
        },
        initialize: function(){
            this.renderView(window.d);
        },
        renderView: function(data){
            var filteredData = [],
                temp;
            _(data).forEach(function(o){
                temp = {};
                    temp.city = o.city;
                    temp.summary = o.forecast.currently.summary;
                    temp.temp = o.forecast.currently.temperature^0;
                    temp.icon = o.forecast.currently.icon;
                filteredData.push(temp);
            });
            this._searchView = new View(filteredData);
        },
        searchStart: function(str){
            var self = this;
            collection.sendResponse(str);

            $(collection).on('changeCollection',function(){

                var atr = collection.getData();
                self._searchView.searchResult(atr);
            });
        },
        btn_Init:function(){
            var self = this;
            var search = $("#search-form");
            
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
                if(search.css('display') == 'none'){
                    $(this).css("color","red");
                    search.css("display","inline-block");
                } else {
                    search.css("display","none");
                    $(this).css("color","#fff");
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
                    search.find("input").val("");
                    self.renderView(window.d);
                }
            });
            /**
             * Init search by keyup event
             */
            search.on("keyup", "input", function(){
                self.searchStart($(this).val());
            });
        }
    });
    return Search;
});